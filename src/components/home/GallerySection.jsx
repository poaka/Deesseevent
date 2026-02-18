import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// Import images
import img1 from '@/assets/images/photo_3_2026-02-17_15-07-47.jpg';
import img2 from '@/assets/images/photo_4_2026-02-17_15-07-47.jpg';
import img3 from '@/assets/images/photo_5_2026-02-17_15-07-47.jpg';
import img4 from '@/assets/images/photo_6_2026-02-17_15-07-47.jpg';
import img5 from '@/assets/images/photo_7_2026-02-17_15-07-47.jpg';
import img6 from '@/assets/images/photo_8_2026-02-17_15-07-47.jpg';
import img7 from '@/assets/images/photo_9_2026-02-17_15-07-47.jpg';

/**
 * Gallery/Portfolio Preview Section for Home Page
 */
const GallerySection = () => {
    // Gallery items with real images
    const galleryItems = [
        { id: 1, image: img1, alt: 'Décoration mariage élégante' },
        { id: 2, image: img2, alt: 'Événement corporate' },
        { id: 3, image: img3, alt: 'Fête d\'anniversaire' },
        { id: 4, image: img4, alt: 'Table décorée' },
        { id: 5, image: img5, alt: 'Couple marié' },
        { id: 6, image: img6, alt: 'Setup événement' },
        { id: 7, image: img7, alt: 'Arche florale' },
    ];

    return (
        <section className="py-20 bg-primary-900">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-heading text-gold-400 mb-4">
                        Notre Galerie de Prestiges
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Découvrez quelques-unes de nos plus belles réalisations
                    </p>
                </motion.div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {galleryItems.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="group relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Image */}
                            <img
                                src={item.image}
                                alt={item.alt}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />

                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <p className="text-white font-medium">{item.alt}</p>
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
                    <Link to="/portfolio">
                        <button className="bg-gold-500 hover:bg-gold-600 text-primary-950 font-semibold px-8 py-4 rounded-full shadow-gold transition-all duration-300 hover:shadow-xl">
                            Découvrir la galerie complète
                        </button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default GallerySection;
