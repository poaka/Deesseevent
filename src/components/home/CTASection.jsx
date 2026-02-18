import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';
import ctaBackground from '@/assets/images/photo_2_2026-02-17_15-07-47.jpg';

/**
 * CTA (Call to Action) Section for Home Page
 */
const CTASection = () => {
    return (
        <section 
            className="py-20 relative overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${ctaBackground})` }}
        >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-primary-950/85" />

            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }} />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-heading text-white mb-6">
                        Prêt à créer votre événement parfait?
                    </h2>
                    <p className="text-xl text-gray-200 mb-10">
                        Contactez-nous dès aujourd'hui pour discuter de votre projet et obtenir un devis personnalisé
                    </p>
                    <Link to="/contact">
                        <Button size="lg" className="shadow-2xl">
                            Demander un devis gratuit
                        </Button>
                    </Link>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-gold-400/30 rounded-full" />
            <div className="absolute bottom-10 right-10 w-32 h-32 border-2 border-gold-400/20 rounded-full" />
        </section>
    );
};

export default CTASection;
