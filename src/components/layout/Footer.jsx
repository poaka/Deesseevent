import React from 'react';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { SITE_CONFIG, NAV_ITEMS } from '@/lib/constants';
import { Link } from 'react-router-dom';

/**
 * Footer Component
 */
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary-950 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div>
                        <h3 className="font-heading text-2xl text-gold-400 mb-4">
                            {SITE_CONFIG.name}
                        </h3>
                        <p className="text-gray-300 mb-4">
                            {SITE_CONFIG.description}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Liens rapides</h4>
                        <ul className="space-y-2">
                            {NAV_ITEMS.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className="text-gray-300 hover:text-gold-400 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Contact</h4>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start gap-2">
                                <Phone size={18} className="mt-1 flex-shrink-0" />
                                <div>
                                    <div>{SITE_CONFIG.contact.phone}</div>
                                    <div>{SITE_CONFIG.contact.phoneAlt}</div>
                                </div>
                            </li>
                            <li className="flex items-start gap-2">
                                <Mail size={18} className="mt-1 flex-shrink-0" />
                                <span>{SITE_CONFIG.contact.email}</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin size={18} className="mt-1 flex-shrink-0" />
                                <span>{SITE_CONFIG.contact.address}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media & Hours */}
                    <div>
                        <h4 className="font-semibold text-lg mb-4">Suivez-nous</h4>
                        <div className="flex gap-4 mb-6">
                            {SITE_CONFIG.social.facebook && (
                                <a
                                    href={SITE_CONFIG.social.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white/10 p-2 rounded-full hover:bg-gold-500 transition-colors"
                                    aria-label="Facebook"
                                >
                                    <Facebook size={20} />
                                </a>
                            )}
                            {SITE_CONFIG.social.instagram && (
                                <a
                                    href={SITE_CONFIG.social.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white/10 p-2 rounded-full hover:bg-gold-500 transition-colors"
                                    aria-label="Instagram"
                                >
                                    <Instagram size={20} />
                                </a>
                            )}
                            {SITE_CONFIG.social.linkedin && (
                                <a
                                    href={SITE_CONFIG.social.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-white/10 p-2 rounded-full hover:bg-gold-500 transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin size={20} />
                                </a>
                            )}
                        </div>
                        <div className="text-sm text-gray-400">
                            <p className="font-semibold mb-1">Horaires</p>
                            <p>{"7 jour sur 7"}</p>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
                    <p>&copy; {currentYear} {SITE_CONFIG.name}. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
