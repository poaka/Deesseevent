import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  Image,
  LogOut,
  Mail,
  Phone,
  Menu,
  X,
} from "lucide-react";

const Sidebar = ({ onLogout, currentPath }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "/", icon: <LayoutDashboard size={20} />, label: "Tableau de bord" },
    { path: "/quotes", icon: <MessageSquare size={20} />, label: "Demandes" },
    { path: "/portfolio", icon: <Image size={20} />, label: "Portfolio" },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-4 md:p-6 border-b border-purple-700">
        <h1 className="text-xl md:text-2xl font-heading mb-1">Deesse Event</h1>
        <p className="text-purple-300 text-xs md:text-sm">Administration</p>
      </div>

      <nav className="flex-1 p-3 md:p-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-3 md:px-4 py-3 rounded-lg mb-2 transition-all ${
              currentPath === item.path
                ? "bg-white text-purple-900 font-medium"
                : "text-purple-100 hover:bg-purple-800"
            }`}
          >
            {item.icon}
            <span className="text-sm md:text-base">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-3 md:p-4 border-t border-purple-700">
        <div className="mb-4 text-sm text-purple-300">
          <div className="flex items-center gap-2 mb-2">
            <Mail size={16} />
            <span className="text-xs">deesseevent237@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} />
            <span className="text-xs">+237 655 772 303</span>
          </div>
        </div>
        <button
          onClick={() => {
            onLogout();
            setIsOpen(false);
          }}
          className="flex items-center gap-2 w-full px-3 md:px-4 py-3 bg-red-500 hover:bg-red-600 rounded-lg transition-colors text-sm md:text-base"
        >
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-purple-900 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-gradient-to-b from-purple-900 to-purple-800 text-white min-h-screen flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween" }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-64 bg-gradient-to-b from-purple-900 to-purple-800 text-white z-40 flex flex-col"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
