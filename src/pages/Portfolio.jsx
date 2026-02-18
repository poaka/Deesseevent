import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Import all images
import img1 from '@/assets/images/photo_1_2026-02-17_15-07-47.jpg';
import img2 from '@/assets/images/photo_2_2026-02-17_15-07-47.jpg';
import img3 from '@/assets/images/photo_3_2026-02-17_15-07-47.jpg';
import img4 from '@/assets/images/photo_4_2026-02-17_15-07-47.jpg';
import img5 from '@/assets/images/photo_5_2026-02-17_15-07-47.jpg';
import img6 from '@/assets/images/photo_6_2026-02-17_15-07-47.jpg';
import img7 from '@/assets/images/photo_7_2026-02-17_15-07-47.jpg';
import img8 from '@/assets/images/photo_8_2026-02-17_15-07-47.jpg';
import img9 from '@/assets/images/photo_9_2026-02-17_15-07-47.jpg';
import img10 from '@/assets/images/photo_10_2026-02-17_15-07-47.jpg';
import img11 from '@/assets/images/photo_11_2026-02-17_15-07-47.jpg';
import img12 from '@/assets/images/photo_12_2026-02-17_15-07-47.jpg';
import img13 from '@/assets/images/photo_13_2026-02-17_15-07-47.jpg';
import img14 from '@/assets/images/photo_14_2026-02-17_15-07-47.jpg';
import img15 from '@/assets/images/photo_15_2026-02-17_15-07-47.jpg';
import img16 from '@/assets/images/photo_16_2026-02-17_15-07-47.jpg';

/**
 * Portfolio/Gallery Page with filtering and lightbox
 */
const Portfolio = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [lightboxImage, setLightboxImage] = useState(null);

    const categories = [
        { id: 'all', label: 'Tous' },
        { id: 'mariage', label: 'Mariages' },
        { id: 'corporate', label: 'Corporate' },
        { id: 'famille', label: 'Famille' },
        { id: 'decoration', label: 'Décoration' },
    ];

    const portfolioItems = [
        { id: 1, image: img1, category: 'famille', title: 'Anniversaire Premium', description: 'Fête d\'anniversaire élégante' },
        { id: 2, image: img2, category: 'mariage', title: 'Mariage Royal', description: 'Cérémonie de mariage luxueuse' },
        { id: 3, image: img3, category: 'decoration', title: 'Décor Floral', description: 'Décoration florale sophistiquée' },
        { id: 4, image: img4, category: 'corporate', title: 'Gala d\'Entreprise', description: 'Événement corporate haut de gamme' },
        { id: 5, image: img5, category: 'mariage', title: 'Réception Mariage', description: 'Réception élégante et raffinée' },
        { id: 6, image: img6, category: 'decoration', title: 'Table d\'Honneur', description: 'Setup table sophistiqué' },
        { id: 7, image: img7, category: 'mariage', title: 'Cérémonie Romantique', description: 'Mariage intime et élégant' },
        { id: 8, image: img8, category: 'decoration', title: 'Décor de Salle', description: 'Aménagement de salle premium' },
        { id: 9, image: img9, category: 'decoration', title: 'Arche Florale', description: 'Arche de cérémonie magnifique' },
        { id: 10, image: img10, category: 'corporate', title: 'Séminaire', description: 'Organisation séminaire professionnel' },
        { id: 11, image: img11, category: 'famille', title: 'Célébration Familiale', description: 'Réunion familiale festive' },
        { id: 12, image: img12, category: 'decoration', title: 'Détails Déco', description: 'Éléments décoratifs raffinés' },
        { id: 13, image: img13, category: 'famille', title: 'Fête d\'Anniversaire', description: 'Anniversaire mémorable' },
        { id: 14, image: img14, category: 'decoration', title: 'Accessoires', description: 'Accessoires de décoration' },
        { id: 15, image: img15, category: 'mariage', title: 'Préparatifs Mariage', description: 'Installation mariage' },
        { id: 16, image: img16, category: 'corporate', title: 'Lancement Produit', description: 'Événement lancement corporate' },
    ];

    const filteredItems = selectedCategory === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-purple py-20 md:py-32">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }} />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-heading text-white mb-6">
                            Notre Portfolio
                        </h1>
                        <p className="text-xl text-gray-200">
                            Découvrez nos plus belles réalisations et laissez-vous inspirer pour votre prochain événement
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filter Section */}
            <section className="py-12 bg-white sticky top-20 z-40 shadow-md">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${selectedCategory === category.id
                                        ? 'bg-gold-500 text-primary-950 shadow-gold'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {category.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        layout
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        <AnimatePresence>
                            {filteredItems.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.03 }}
                                    className="group relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                                    onClick={() => setLightboxImage(item)}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 via-primary-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-start justify-end p-6">
                                        <h3 className="text-white font-heading text-xl mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-200 text-sm">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredItems.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">
                                Aucune réalisation dans cette catégorie pour le moment
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                        onClick={() => setLightboxImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white hover:text-gold-400 transition-colors"
                            onClick={() => setLightboxImage(null)}
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="max-w-5xl w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={lightboxImage.image}
                                alt={lightboxImage.title}
                                className="w-full h-auto rounded-lg shadow-2xl"
                            />
                            <div className="text-center mt-6">
                                <h2 className="text-2xl font-heading text-white mb-2">
                                    {lightboxImage.title}
                                </h2>
                                <p className="text-gray-300">
                                    {lightboxImage.description}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA Section */}
            <section className="py-20 bg-primary-950">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading text-gold-400 mb-6">
                            Inspiré par nos réalisations ?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Créons ensemble l'événement de vos rêves
                        </p>
                        <a href="/contact">
                            <button className="bg-gold-500 hover:bg-gold-600 text-primary-950 font-semibold px-8 py-4 rounded-full shadow-gold transition-all duration-300 hover:shadow-xl">
                                Demander un devis
                            </button>
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Portfolio;
