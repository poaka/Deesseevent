import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';
import { supabase } from '@/lib/supabase';

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
import img13 from '@/assets/images/photo_13_2026-02-17_15-07-47.jpg';
import img15 from '@/assets/images/photo_15_2026-02-17_15-07-47.jpg';
import img16 from '@/assets/images/photo_16_2026-02-17_15-07-47.jpg';

// Import all videos
import vid1 from '@/assets/images/video_2026-02-17_15-07-47.mp4';
import vid2 from '@/assets/images/video_2026-02-17_15-07-47 (2).mp4';
import vid3 from '@/assets/images/video_2026-02-17_15-07-47 (3).mp4';
import vid4 from '@/assets/images/video_2026-02-17_15-07-47 (4).mp4';
import vid5 from '@/assets/images/video_2026-02-17_15-07-47 (5).mp4';
import vid6 from '@/assets/images/video_2026-02-17_15-07-47 (6).mp4';
import vid7 from '@/assets/images/video_2026-02-17_15-07-47 (7).mp4';
import vid8 from '@/assets/images/video_2026-02-17_15-07-47 (8).mp4';
import vid9 from '@/assets/images/video_2026-02-17_15-07-47 (9).mp4';

/**
 * Portfolio/Gallery Page with filtering and lightbox
 */
const Portfolio = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [lightboxImage, setLightboxImage] = useState(null);
    const [supabaseItems, setSupabaseItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const defaultItems = [
        { id: 'd1', url: img1, type: 'image', title: 'Anniversaire Premium', description: 'Fête d\'anniversaire élégante' },
        { id: 'd2', url: img2, type: 'image', title: 'Mariage Royal', description: 'Cérémonie de mariage luxueuse' },
        { id: 'd3', url: img3, type: 'image', title: 'Décor Floral', description: 'Décoration florale sophistiquée' },
        { id: 'd4', url: img4, type: 'image', title: 'Gala d\'Entreprise', description: 'Événement corporate haut de gamme' },
        { id: 'd5', url: img5, type: 'image', title: 'Réception Mariage', description: 'Réception élégante et raffinée' },
        { id: 'd6', url: img6, type: 'image', title: 'Table d\'Honneur', description: 'Setup table sophistiqué' },
        { id: 'd7', url: img7, type: 'image', title: 'Cérémonie Romantique', description: 'Mariage intime et élégant' },
        { id: 'd8', url: img8, type: 'image', title: 'Décor de Salle', description: 'Aménagement de salle premium' },
        { id: 'd9', url: img9, type: 'image', title: 'Arche Florale', description: 'Arche de cérémonie magnifique' },
        { id: 'd10', url: img10, type: 'image', title: 'Séminaire', description: 'Organisation séminaire professionnel' },
        { id: 'd11', url: img11, type: 'image', title: 'Célébration Familiale', description: 'Réunion familiale festive' },
        { id: 'd13', url: img13, type: 'image', title: 'Fête d\'Anniversaire', description: 'Anniversaire mémorable' },
        { id: 'd15', url: img15, type: 'image', title: 'Préparatifs Mariage', description: 'Installation mariage' },
        { id: 'd16', url: img16, type: 'image', title: 'Lancement Produit', description: 'Événement lancement corporate' },
        { id: 'd17', url: vid1, type: 'video', title: 'Vidéo Événement 1', description: 'Captation vidéo d\'événement' },
        { id: 'd18', url: vid2, type: 'video', title: 'Vidéo Événement 2', description: 'Captation vidéo d\'événement' },
        { id: 'd19', url: vid3, type: 'video', title: 'Vidéo Événement 3', description: 'Captation vidéo d\'événement' },
        { id: 'd20', url: vid4, type: 'video', title: 'Vidéo Événement 4', description: 'Captation vidéo d\'événement' },
        { id: 'd21', url: vid5, type: 'video', title: 'Vidéo Événement 5', description: 'Captation vidéo d\'événement' },
        { id: 'd22', url: vid6, type: 'video', title: 'Vidéo Événement 6', description: 'Captation vidéo d\'événement' },
        { id: 'd23', url: vid7, type: 'video', title: 'Vidéo Événement 7', description: 'Captation vidéo d\'événement' },
        { id: 'd24', url: vid8, type: 'video', title: 'Vidéo Événement 8', description: 'Captation vidéo d\'événement' },
        { id: 'd25', url: vid9, type: 'video', title: 'Vidéo Événement 9', description: 'Captation vidéo d\'événement' },
    ];

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            const { data, error } = await supabase
                .from('portfolio_items')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setSupabaseItems(data || []);
        } catch (error) {
            // Silently handle portfolio fetch errors in production
            // Error tracking can be added here if needed
        } finally {
            setLoading(false);
        }
    };

    const portfolioItems = [...supabaseItems, ...defaultItems];

    const categories = [
        { id: 'all', label: 'Tout' },
        { id: 'image', label: 'Image' },
        { id: 'video', label: 'Vidéo' },
    ];

    const filteredItems = selectedCategory === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.type === selectedCategory);

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
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                        </div>
                    ) : (
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
                                        {item.type === 'image' ? (
                                            <img
                                                src={item.url}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        ) : (
                                            <>
                                                <video
                                                    src={item.url}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    preload="metadata"
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
                                                    <Play className="w-12 h-12 text-white opacity-80" />
                                                </div>
                                            </>
                                        )}

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
                    )}

                    {!loading && filteredItems.length === 0 && (
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
                            {lightboxImage.type === 'image' ? (
                                <img
                                    src={lightboxImage.url}
                                    alt={lightboxImage.title}
                                    className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
                                />
                            ) : (
                                <video
                                    src={lightboxImage.url}
                                    controls
                                    autoPlay
                                    className="w-full h-auto max-h-[80vh] rounded-lg shadow-2xl"
                                />
                            )}
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
