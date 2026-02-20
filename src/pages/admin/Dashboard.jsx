import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";
import {
  TrendingUp,
  MessageSquare,
  CheckCircle,
  Clock,
  Image as ImageIcon,
} from "lucide-react";
import Sidebar from "./Sidebar";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const Dashboard = ({ onLogout }) => {
  const location = useLocation();
  const [stats, setStats] = useState({
    totalQuotes: 0,
    newQuotes: 0,
    completedQuotes: 0,
    portfolioItems: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch quotes stats
      const { data: quotes, error: quotesError } = await supabase
        .from("quote_requests")
        .select("status");

      if (quotesError) throw quotesError;

      // Fetch portfolio stats
      const { data: portfolio, error: portfolioError } = await supabase
        .from("portfolio_items")
        .select("id");

      if (portfolioError && portfolioError.code !== "42P01") {
        // Ignore table not found error
        console.log("Portfolio table not yet created");
      }

      setStats({
        totalQuotes: quotes?.length || 0,
        newQuotes: quotes?.filter((q) => q.status === "new").length || 0,
        completedQuotes:
          quotes?.filter((q) => q.status === "completed").length || 0,
        portfolioItems: portfolio?.length || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast.error("Erreur lors du chargement des statistiques");
    } finally {
      setLoading(false);
    }
  };

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

  const statCards = [
    {
      title: "Total Demandes",
      value: stats.totalQuotes,
      icon: <MessageSquare size={32} />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Nouvelles",
      value: stats.newQuotes,
      icon: <Clock size={32} />,
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      title: "Complétées",
      value: stats.completedQuotes,
      icon: <CheckCircle size={32} />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Portfolio",
      value: stats.portfolioItems,
      icon: <ImageIcon size={32} />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

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
            Tableau de Bord
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Vue d'ensemble de votre activité
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          {statCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${card.color}`} />
              <div className="p-3 md:p-6">
                <div className="flex items-center justify-between mb-2 md:mb-4">
                  <div className={`p-2 md:p-3 rounded-lg ${card.bgColor}`}>
                    <div className={card.textColor}>{card.icon}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl md:text-3xl font-bold text-gray-900">
                      {card.value}
                    </div>
                  </div>
                </div>
                <h3 className="text-xs md:text-base text-gray-600 font-medium">{card.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Accès rapide
            </h2>
            <div className="space-y-3">
              <Link
                to="/quotes"
                className="block p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="text-purple-600" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Demandes de devis
                    </div>
                    <div className="text-sm text-gray-600">
                      {stats.newQuotes} nouvelles demandes
                    </div>
                  </div>
                </div>
              </Link>
              <Link
                to="/portfolio"
                className="block p-4 bg-gold-50 hover:bg-gold-100 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ImageIcon className="text-gold-600" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Portfolio
                    </div>
                    <div className="text-sm text-gray-600">
                      Gérer photos et vidéos
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-purple-600 to-gold-600 rounded-xl shadow-lg p-6 text-white"
          >
            <h2 className="text-xl font-semibold mb-4">Bienvenue!</h2>
            <p className="mb-4 opacity-90">
              Gérez facilement vos demandes de devis et votre portfolio depuis
              ce tableau de bord.
            </p>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm">
                💡 <strong>Astuce:</strong> Mettez régulièrement à jour votre
                portfolio pour attirer plus de clients!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
