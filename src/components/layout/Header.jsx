import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from '@/lib/constants';
import Button from '@/components/common/Button';

/**
 * Header Component with responsive navigation
 */
const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
                    isScrolled
                        ? 'bg-white shadow-lg py-4'
                        : 'bg-transparent py-6'
                )}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3">
                            <div className="font-heading text-2xl font-bold">
                                <span className={cn(
                                    'transition-colors',
                                    isScrolled ? 'text-primary-950' : 'text-white'
                                )}>
                                    DEESSE
                                </span>
                                <span className="text-gold-500"> EVENT</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={cn(
                                        'font-medium transition-colors relative group',
                                        location.pathname === item.path
                                            ? 'text-gold-500'
                                            : isScrolled
                                                ? 'text-gray-700 hover:text-gold-500'
                                                : 'text-white hover:text-gold-400'
                                    )}
                                >
                                    {item.label}
                                    {location.pathname === item.path && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-500"
                                        />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA Button */}
                        <div className="hidden lg:block">
                            <Link to="/contact">
                                <Button size="sm">
                                    Demander un devis
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden p-2"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className={isScrolled ? 'text-gray-700' : 'text-white'} size={24} />
                            ) : (
                                <Menu className={isScrolled ? 'text-gray-700' : 'text-white'} size={24} />
                            )}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl lg:hidden"
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between p-4 border-b">
                                <span className="font-heading text-xl font-bold text-primary-950">
                                    DEESSE <span className="text-gold-500">EVENT</span>
                                </span>
                                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="flex-1 overflow-y-auto p-6">
                                <ul className="space-y-4">
                                    {NAV_ITEMS.map((item) => (
                                        <li key={item.path}>
                                            <Link
                                                to={item.path}
                                                className={cn(
                                                    'block text-lg font-medium py-2 transition-colors',
                                                    location.pathname === item.path
                                                        ? 'text-gold-500'
                                                        : 'text-gray-700 hover:text-gold-500'
                                                )}
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <div className="p-6 border-t">
                                <Link to="/contact">
                                    <Button className="w-full">
                                        Demander un devis
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;
