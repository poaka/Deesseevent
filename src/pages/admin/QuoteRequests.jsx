import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";
import { Mail, Phone, Calendar, Users, DollarSign, MessageSquare, CheckCircle, Clock, XCircle, Trash2, AlertTriangle } from "lucide-react";
import Sidebar from "./Sidebar";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const QuoteRequests = ({ onLogout }) => {
  const location = useLocation();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [deleteModal, setDeleteModal] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from("quote_requests")
        .select("id, name, email, phone, event_type, event_date, guest_count, budget, message, status, created_at")
        .order("created_at", { ascending: false })
        .limit(100); // Limit to 100 most recent requests

      if (error) throw error;
      
      setRequests(data || []);
    } catch (error) {
      if (error.code === "42P01") {
        toast.error("Table quote_requests non créée. Exécutez le script SQL.");
      } else if (error.message) {
        toast.error("Erreur: " + error.message);
      } else {
        toast.error("Erreur lors du chargement des demandes");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from("quote_requests")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Statut mis à jour");
      // Optimistic update - update local state immediately
      setRequests(prev => prev.map(req => 
        req.id === id ? { ...req, status: newStatus } : req
      ));
    } catch (error) {
      toast.error("Erreur lors de la mise à jour");
      // Refetch on error to maintain consistency
      fetchRequests();
    }
  };

  const deleteRequest = async (id) => {
    try {
      const { error } = await supabase
        .from("quote_requests")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Demande supprimée");
      setDeleteModal(null);
      // Optimistic update - remove from local state immediately
      setRequests(prev => prev.filter(req => req.id !== id));
    } catch (error) {
      toast.error("Erreur lors de la suppression");
      // Refetch on error to maintain consistency
      fetchRequests();
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      new: { color: "bg-blue-100 text-blue-800", icon: <Clock size={14} />, label: "Nouveau" },
      contacted: { color: "bg-yellow-100 text-yellow-800", icon: <MessageSquare size={14} />, label: "Contacté" },
      completed: { color: "bg-green-100 text-green-800", icon: <CheckCircle size={14} />, label: "Complété" },
      cancelled: { color: "bg-red-100 text-red-800", icon: <XCircle size={14} />, label: "Annulé" }
    };
    
    const badge = badges[status] || badges.new;
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.icon}
        {badge.label}
      </span>
    );
  };

  const filteredRequests = filter === "all" 
    ? requests 
    : requests.filter(req => req.status === filter);

  if (loading) {
    return (
      <div className="flex">
        <Sidebar onLogout={onLogout} currentPath={location.pathname} />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar onLogout={onLogout} currentPath={location.pathname} />

      <div className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8"
        >
          <h1 className="text-2xl md:text-4xl font-heading text-gray-900 mb-2">
            Demandes de Devis
          </h1>
          <p className="text-sm md:text-base text-gray-600">Gérez toutes les demandes de vos clients</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-4 md:mb-6">
          <div className="bg-white rounded-lg p-3 md:p-6 shadow-md">
            <div className="text-xl md:text-3xl font-bold text-gray-900 mb-1">{requests.length}</div>
            <div className="text-xs md:text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-3 md:p-6 shadow-md">
            <div className="text-xl md:text-3xl font-bold text-blue-600 mb-1">
              {requests.filter(r => r.status === 'new').length}
            </div>
            <div className="text-xs md:text-sm text-gray-600">Nouveaux</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 md:p-6 shadow-md">
            <div className="text-xl md:text-3xl font-bold text-yellow-600 mb-1">
              {requests.filter(r => r.status === 'contacted').length}
            </div>
            <div className="text-xs md:text-sm text-gray-600">Contactés</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 md:p-6 shadow-md">
            <div className="text-xl md:text-3xl font-bold text-green-600 mb-1">
              {requests.filter(r => r.status === 'completed').length}
            </div>
            <div className="text-xs md:text-sm text-gray-600">Complétés</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-2">
          {["all", "new", "contacted", "completed", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                filter === status
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
              }`}
            >
              {status === "all" ? "Tous" : status === "new" ? "Nouveaux" : 
               status === "contacted" ? "Contactés" : 
               status === "completed" ? "Complétés" : "Annulés"}
              <span className="ml-2 text-sm">
                ({status === "all" ? requests.length : requests.filter(r => r.status === status).length})
              </span>
            </button>
          ))}
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center shadow-md">
              <p className="text-gray-500">Aucune demande trouvée</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {request.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Reçu le {format(new Date(request.created_at), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                        </p>
                      </div>
                      {getStatusBadge(request.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <Mail size={18} className="text-purple-600" />
                        <a href={`mailto:${request.email}`} className="hover:text-purple-600">
                          {request.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Phone size={18} className="text-purple-600" />
                        <a href={`tel:${request.phone}`} className="hover:text-purple-600">
                          {request.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={18} className="text-purple-600" />
                        <span>{format(new Date(request.event_date), "d MMMM yyyy", { locale: fr })}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <Users size={18} className="text-purple-600" />
                        <span>{request.guest_count} invités</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Type d'événement:</p>
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {request.event_type}
                      </span>
                    </div>

                    {request.budget && (
                      <div className="flex items-center gap-2 text-gray-700 mb-4">
                        <DollarSign size={18} className="text-purple-600" />
                        <span className="font-medium">{parseInt(request.budget).toLocaleString()} FCFA</span>
                      </div>
                    )}

                    {request.message && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Message:</p>
                        <p className="text-gray-600 whitespace-pre-wrap">{request.message}</p>
                      </div>
                    )}
                  </div>

                  {/* Status Actions */}
                  <div className="flex lg:flex-col gap-2">
                    <button
                      onClick={() => updateStatus(request.id, "contacted")}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={request.status === "contacted"}
                    >
                      Contacté
                    </button>
                    <button
                      onClick={() => updateStatus(request.id, "completed")}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={request.status === "completed"}
                    >
                      Complété
                    </button>
                    <button
                      onClick={() => setDeleteModal(request)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm flex items-center justify-center gap-1"
                    >
                      <Trash2 size={14} />
                      Supprimer
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertTriangle size={24} />
                <h3 className="text-lg font-semibold">Confirmer la suppression</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Êtes-vous sûr de vouloir supprimer la demande de <strong>{deleteModal.name}</strong> ? 
                Cette action est irréversible.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setDeleteModal(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={() => deleteRequest(deleteModal.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteRequests;
