import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

// Import images
import marriageImg from '@/assets/images/photo_1_2026-02-17_15-07-47.jpg';
import corporateImg from '@/assets/images/photo_2_2026-02-17_15-07-47.jpg';
import familyImg from '@/assets/images/photo_3_2026-02-17_15-07-47.jpg';

/**
 * Services Preview Section for Home Page
 */
const ServicesSection = () => {
    const services = [
        {
            title: 'Organisation Mariage',
            description: 'Du rêve à la réalité, nous créons votre mariage de conte de fées avec attention aux moindres détails.',
            image: marriageImg,
            badge: 'Premium',
        },
        {
            title: 'Événements d\'Entreprise',
            description: 'Séminaires, lancements de produits, galas d\'entreprise - nous gérons tout avec professionnalisme.',
            image: corporateImg,
            badge: 'Corporate',
        },
        {
            title: 'Événements Familiaux',
            description: 'Anniversaires, baptêmes, célébrations - chaque moment compte et mérite d\'être inoubliable.',
            image: familyImg,
            badge: 'Famille',
        },
    ];

    return (
        <section className="py-20 bg-primary-950">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-heading text-gold-400 mb-4">
                        Nos services étoilés
                    </h2>
                    <div className="flex justify-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} className="fill-gold-400 text-gold-400" />
                        ))}
                    </div>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Des prestations sur mesure pour faire de votre événement un moment unique
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-white rounded-lg overflow-hidden shadow-elegant hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 to-transparent z-10" />
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Badge */}
                                <div className="absolute top-4 right-4 z-20">
                                    <span className="bg-gold-500 text-primary-950 px-4 py-1 rounded-full text-sm font-semibold">
                                        {service.badge}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-2xl font-heading text-primary-950 mb-3">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {service.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-gold-600 font-semibold">
                                        {service.price}
                                    </span>
                                    <Link
                                        to="/services"
                                        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-800 font-medium group-hover:gap-3 transition-all"
                                    >
                                        En savoir plus
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 font-semibold text-lg transition-colors"
                    >
                        Découvrir tous nos services
                        <ArrowRight size={20} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;
