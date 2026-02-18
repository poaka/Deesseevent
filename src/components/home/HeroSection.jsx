import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Users, Calendar, Award } from 'lucide-react';
import Button from '@/components/common/Button';

/**
 * Hero Section Component for Home Page
 */
const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-purple">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading text-white mb-6">
                            Transformez vos rêves en{' '}
                            <span className="text-gold-400">moments inoubliables</span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-200 mb-12 max-w-2xl mx-auto"
                    >
                        Organisation d'événements premium à Yaoundé
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link to="/contact">
                            <Button size="lg" className="shadow-2xl">
                                Demander un devis
                            </Button>
                        </Link>
                        <Link to="/portfolio">
                            <Button size="lg" variant="secondary" className="shadow-2xl">
                                Voir nos réalisations
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-gold-400 rounded-full flex items-start justify-center p-2">
                    <div className="w-1 h-3 bg-gold-400 rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    );
};

/**
 * Features Section with Stats
 */
const FeaturesSection = () => {
    const features = [
        {
            icon: <Sparkles size={32} />,
            title: 'Excellence',
            description: 'Des prestations de qualité supérieure pour des événements mémorables',
        },
        {
            icon: <Users size={32} />,
            title: 'Équipe Dévouée',
            description: 'Une équipe professionnelle à votre écoute du début à la fin',
        },
        {
            icon: <Calendar size={32} />,
            title: 'Disponibilité',
            description: 'Organisation sur mesure selon vos besoins et votre calendrier',
        },
        {
            icon: <Award size={32} />,
            title: 'Satisfaction',
            description: 'Plus de 100 événements réussis et des clients satisfaits',
        },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-100 text-gold-600 mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 text-primary-950">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { HeroSection, FeaturesSection };
