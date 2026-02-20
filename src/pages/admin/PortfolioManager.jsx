import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { toast } from "react-hot-toast";
import {
  Upload,
  Image as ImageIcon,
  Video,
  Trash2,
  Plus,
  X,
} from "lucide-react";
import Sidebar from "./Sidebar";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import Button from "@/components/common/Button";

const PortfolioManager = ({ onLogout }) => {
  const location = useLocation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    category: "mariage",
    type: "image",
    url: "",
  });

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      if (error.code === "42P01") {
        toast.error("Table portfolio non créée. Exécutez le script SQL d'abord.");
      } else {
        toast.error("Erreur lors du chargement du portfolio");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Le fichier est trop volumineux (max 10MB)");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload to Supabase Storage
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage.from("portfolio").getPublicUrl(filePath);

      setNewItem({ ...newItem, url: data.publicUrl });
      toast.success("Fichier uploadé avec succès!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setPreviewUrl("");
      if (error.message.includes("not found")) {
        toast.error("Le bucket 'portfolio' n'existe pas. Créez-le dans Supabase Storage.");
      } else {
        toast.error("Erreur lors de l'upload: " + error.message);
      }
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleAddItem = async () => {
    if (!newItem.title || !newItem.url) {
      toast.error("Titre et URL sont requis");
      return;
    }

    try {
      const { error } = await supabase.from("portfolio_items").insert([
        {
          title: newItem.title,
          description: newItem.description,
          category: newItem.category,
          type: newItem.type,
          url: newItem.url,
        },
      ]);

      if (error) throw error;

      toast.success("Élément ajouté au portfolio!");
      setShowAddModal(false);
      setNewItem({
        title: "",
        description: "",
        category: "mariage",
        type: "image",
        url: "",
      });
      setPreviewUrl("");
      fetchPortfolioItems();
    } catch (error) {
      console.error("Error adding item:", error);
      if (error.code === "42P01") {
        toast.error("Table portfolio_items non créée. Exécutez le script SQL.");
      } else if (error.message) {
        toast.error("Erreur: " + error.message);
      } else {
        toast.error("Erreur lors de l'ajout");
      }
    }
  };

  const handleDelete = async (id, url) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet élément?")) return;

    try {
      // Delete from database
      const { error } = await supabase
        .from("portfolio_items")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Optionally delete from storage
      if (url && url.includes("supabase")) {
        const fileName = url.split("/").pop();
        await supabase.storage.from("portfolio").remove([fileName]);
      }

      toast.success("Élément supprimé");
      fetchPortfolioItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Erreur lors de la suppression");
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

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar onLogout={onLogout} currentPath={location.pathname} />

      <div className="flex-1 p-4 md:p-8 pt-16 md:pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-4xl font-heading text-gray-900 mb-2">
              Gestion du Portfolio
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Ajoutez et gérez vos photos et vidéos
            </p>
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Ajouter un élément</span>
            <span className="sm:hidden">Ajouter</span>
          </Button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
          <div className="bg-white rounded-lg p-3 md:p-6 shadow-md">
            <div className="text-xl md:text-3xl font-bold text-gray-900 mb-1">
              {items.length}
            </div>
            <div className="text-xs md:text-sm text-gray-600">Total</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-3 md:p-6 shadow-md">
            <div className="text-xl md:text-3xl font-bold text-purple-600 mb-1">
              {items.filter((i) => i.type === "image").length}
            </div>
            <div className="text-xs md:text-sm text-gray-600">Images</div>
          </div>
          <div className="bg-gold-50 rounded-lg p-3 md:p-6 shadow-md">
            <div className="text-xl md:text-3xl font-bold text-gold-600 mb-1">
              {items.filter((i) => i.type === "video").length}
            </div>
            <div className="text-xs md:text-sm text-gray-600">Vidéos</div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden group"
            >
              <div className="relative aspect-video bg-gray-100">
                {item.type === "image" ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Video size={48} className="text-gray-400" />
                  </div>
                )}
                <button
                  onClick={() => handleDelete(item.id, item.url)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-600 mb-2">
                    {item.description}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded">
                    {item.category}
                  </span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded">
                    {item.type}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {items.length === 0 && (
            <div className="col-span-full bg-white rounded-lg p-12 text-center shadow-md">
              <ImageIcon size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">
                Aucun élément dans le portfolio
              </p>
              <Button onClick={() => setShowAddModal(true)}>
                Ajouter le premier élément
              </Button>
            </div>
          )}
        </div>

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4 md:mb-6">
                <h2 className="text-xl md:text-2xl font-heading text-gray-900">
                  Ajouter un élément
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre *
                  </label>
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) =>
                      setNewItem({ ...newItem, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Ex: Mariage de Marie et Jean"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Description de l'événement..."
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <select
                      value={newItem.category}
                      onChange={(e) =>
                        setNewItem({ ...newItem, category: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="mariage">Mariage</option>
                      <option value="corporate">Corporate</option>
                      <option value="anniversaire">Anniversaire</option>
                      <option value="bapteme">Baptême</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={newItem.type}
                      onChange={(e) =>
                        setNewItem({ ...newItem, type: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="image">Image</option>
                      <option value="video">Vidéo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fichier ou URL *
                  </label>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="flex-1 cursor-pointer">
                        <div className={`flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg transition-colors ${
                          uploading ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-500'
                        }`}>
                          <Upload size={20} />
                          <span>
                            {uploading
                              ? `Upload en cours... ${uploadProgress}%`
                              : "Uploader un fichier"}
                          </span>
                        </div>
                        <input
                          type="file"
                          accept="image/*,video/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                    </div>
                    
                    {uploading && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                    )}

                    {previewUrl && (
                      <div className="relative rounded-lg overflow-hidden border-2 border-purple-200">
                        {newItem.type === "image" ? (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-48 object-cover"
                          />
                        ) : (
                          <video
                            src={previewUrl}
                            className="w-full h-48 object-cover"
                            controls
                          />
                        )}
                      </div>
                    )}

                    <div className="text-center text-sm text-gray-500">ou</div>
                    <input
                      type="url"
                      value={newItem.url}
                      onChange={(e) =>
                        setNewItem({ ...newItem, url: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://exemple.com/image.jpg"
                    />
                  </div>
                  {newItem.url && !previewUrl && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-800">
                        ✓ URL configurée
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    onClick={handleAddItem}
                    className="flex-1 w-full"
                    disabled={!newItem.title || !newItem.url}
                  >
                    Ajouter
                  </Button>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioManager;
