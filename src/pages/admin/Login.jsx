import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { toast } from "react-hot-toast";
import { supabase } from "@/lib/supabase";
import Button from "@/components/common/Button";
import logoImage from '@/assets/images/photo_14_2026-02-17_15-07-47.jpg';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("deesseevent237@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check admin credentials from database
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .eq("email", email)
        .single();

      if (error || !data) {
        toast.error("Email ou mot de passe incorrect");
        setLoading(false);
        return;
      }

      // Simple password check (in production, use bcrypt)
      // For now, accept the default password
      if (password === "Deesse2024!") {
        sessionStorage.setItem("admin_auth", "true");
        sessionStorage.setItem("admin_email", email);
        toast.success("Connexion réussie!");
        onLogin();
      } else {
        toast.error("Email ou mot de passe incorrect");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full mx-4"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full overflow-hidden bg-white shadow-lg mb-4">
            <img 
              src={logoImage} 
              alt="Deesse Event Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-heading text-gray-900 mb-2">
            Deesse Event
          </h1>
          <p className="text-gray-600">Tableau de Bord Administrateur</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@deesseevent.com"
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Entrez votre mot de passe"
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
              <Lock
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Connexion..." : "Se connecter"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            <Mail size={14} className="inline mr-1" />
            deesseevent237@gmail.com
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
