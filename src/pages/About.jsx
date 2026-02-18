import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Target, Users, Award, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';

// Import team image
import teamImage from '@/assets/images/photo_11_2026-02-17_15-07-47.jpg';

/**
 * About Page - Company story, mission, and team
 */
const About = () => {
    const values = [
        {
            icon: <Heart size={32} />,
            title: 'Passion',
            description: 'Nous aimons ce que nous faisons et cela se reflète dans chaque détail de nos événements.'
        },
        {
            icon: <Target size={32} />,
            title: 'Excellence',
            description: 'Nous visons toujours l\'excellence dans chaque aspect de notre travail.'
        },
        {
            icon: <Users size={32} />,
            title: 'Écoute',
            description: 'Vos besoins et vos rêves sont au cœur de notre processus de planification.'
        },
        {
            icon: <Award size={32} />,
            title: 'Qualité',
            description: 'Nous travaillons uniquement avec les meilleurs prestataires pour garantir un résultat parfait.'
        }
    ];

    const process = [
        {
            step: '01',
            title: 'Consultation Initiale',
            description: 'Rencontre pour comprendre votre vision et vos besoins'
        },
        {
            step: '02',
            title: 'Proposition Personnalisée',
            description: 'Création d\'un concept sur mesure avec devis détaillé'
        },
        {
            step: '03',
            title: 'Planification & Coordination',
            description: 'Organisation méticuleuse de tous les aspects de votre événement'
        },
        {
            step: '04',
            title: 'Jour J',
            description: 'Exécution parfaite et gestion complète de votre événement'
        }
    ];

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
                            À Propos de DEESSE EVENT
                        </h1>
                        <p className="text-xl text-gray-200">
                            Votre partenaire de confiance pour des événements inoubliables à Yaoundé
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-heading text-primary-950 mb-6">
                                Notre Histoire
                            </h2>
                            <div className="space-y-4 text-gray-700 text-lg">
                                <p>
                                    DEESSE EVENT est née d'une passion profonde pour la création de moments magiques et inoubliables.
                                     Depuis nos débuts à Yaoundé, nous nous sommes dévoués à transformer les rêves de nos clients en réalité.
                                </p>
                                <p>
                                    Notre équipe de professionnels expérimentés combine créativité,
                                     expertise et attention aux détails pour orchestrer des événements qui dépassent toutes les attentes.
                                </p>
                                <p>
                                    Chaque événement est unique, et nous croyons fermement que la personnalisation est la clé du succès.
                                     C'est pourquoi nous prenons le temps d'écouter, de comprendre et de créer des expériences sur mesure qui reflètent parfaitement votre vision.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <img
                                src={teamImage}
                                alt="DEESSE EVENT Team"
                                className="rounded-lg shadow-2xl w-full"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-gold-500 text-primary-950 p-8 rounded-lg shadow-xl">
                                <div className="text-4xl font-bold mb-1">100+</div>
                                <div className="text-sm font-semibold">Événements Réussis</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-primary-950">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center p-8"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-400 text-primary-950 mb-6">
                                <Target size={32} />
                            </div>
                            <h3 className="text-3xl font-heading text-gold-400 mb-4">
                                Notre Mission
                            </h3>
                            <p className="text-gray-300 text-lg">
                                Créer des événements exceptionnels qui laissent des souvenirs impérissables, en offrant un service personnalisé de la plus haute qualité.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-center p-8"
                        >
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-400 text-primary-950 mb-6">
                                <Award size={32} />
                            </div>
                            <h3 className="text-3xl font-heading text-gold-400 mb-4">
                                Notre Vision
                            </h3>
                            <p className="text-gray-300 text-lg">
                                Devenir la référence incontournable en organisation d\'événements au Cameroun, reconnue pour notre créativité et notre excellence.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading text-primary-950 mb-4">
                            Nos Valeurs
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Les principes qui guident notre travail au quotidien
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center p-6 rounded-lg hover:shadow-elegant transition-all duration-300"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-100 text-gold-600 mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-primary-950 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading text-primary-950 mb-4">
                            Notre Processus
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Comment nous transformons votre vision en réalité
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        {process.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative mb-12 last:mb-0"
                            >
                                <div className="flex items-start gap-6">
                                    <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center text-primary-950 font-bold text-2xl">
                                        {item.step}
                                    </div>
                                    <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                                        <h3 className="text-2xl font-heading text-primary-950 mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 text-lg">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                                {index < process.length - 1 && (
                                    <div className="absolute left-10 top-20 w-0.5 h-12 bg-gold-300" />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-purple">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-heading text-white mb-6">
                            Travaillons Ensemble
                        </h2>
                        <p className="text-xl text-gray-200 mb-8">
                            Prêt à créer un événement extraordinaire ? Contactez-nous pour démarrer la planification
                        </p>
                        <Link to="/contact">
                            <Button size="lg" className="shadow-2xl">
                                Demander un devis gratuit
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
