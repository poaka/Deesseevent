import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * FAQ Page with accordion sections
 */
const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqCategories = [
        {
            category: 'Général',
            questions: [
                {
                    question: 'Quels types d\'événements organisez-vous ?',
                    answer: 'Nous organisons une grande variété d\'événements incluant les mariages, événements d\'entreprise (séminaires, lancements de produits, galas), fêtes d\'anniversaire, baptêmes, communions, baby showers, et bien d\'autres célébrations. Chaque événement est personnalisé selon vos besoins spécifiques.'
                },
                {
                    question: 'Dans quelles régions intervenez-vous ?',
                    answer: 'Nous sommes basés à Yaoundé et servons principalement cette région. Cependant, nous pouvons également organiser des événements dans d\'autres villes du Cameroun selon la nature et l\'envergure du projet.'
                },
                {
                    question: 'Combien de temps à l\'avance dois-je vous contacter ?',
                    answer: 'Pour les grands événements comme les mariages, nous recommandons de nous contacter au moins 6 à 12 mois à l\'avance. Pour les événements plus petits ou corporate, un délai de 2 à 3 mois est généralement suffisant. Cependant, n\'hésitez pas à nous contacter même pour des demandes de dernière minute - nous ferons de notre mieux pour vous accommoder.'
                }
            ]
        },
        {
            category: 'Services & Tarifs',
            questions: [
                {
                    question: 'Qu\'est-ce qui est inclus dans vos forfaits ?',
                    answer: 'Nos forfaits varient selon le type d\'événement et vos besoins. Généralement, ils incluent la coordination le jour J, la gestion des prestataires, la décoration, le timeline détaillé, et l\'assistance pendant toute la durée de l\'événement. Nous proposons également des services à la carte pour plus de flexibilité.'
                },
                {
                    question: 'Comment sont calculés vos tarifs ?',
                    answer: 'Nos tarifs dépendent de plusieurs facteurs : le type d\'événement, le nombre d\'invités, la complexité de la décoration, les services demandés, et la durée de l\'événement. Après notre consultation initiale, nous vous fournirons un devis détaillé et transparent.'
                },
                {
                    question: 'Proposez-vous des facilités de paiement ?',
                    answer: 'Oui, nous proposons des plans de paiement échelonnés pour faciliter votre budgétisation. Généralement, nous demandons un acompte à la signature du contrat, suivi de paiements mensuels ou par étapes jusqu\'au jour de l\'événement.'
                },
                {
                    question: 'Puis-je personnaliser mon forfait ?',
                    answer: 'Absolument ! Nous comprenons que chaque événement est unique. Nous travaillons avec vous pour créer un forfait sur mesure qui répond parfaitement à vos besoins et à votre budget.'
                }
            ]
        },
        {
            category: 'Planification & Process',
            questions: [
                {
                    question: 'Comment se déroule la consultation initiale ?',
                    answer: 'La consultation initiale est une rencontre où nous apprenons à connaître votre vision, vos préférences, et vos besoins. C\'est également l\'occasion pour vous de nous poser toutes vos questions. Cette consultation est gratuite et sans engagement.'
                },
                {
                    question: 'Puis-je choisir mes propres prestataires ?',
                    answer: 'Oui, vous pouvez soit choisir vos propres prestataires, soit nous faire confiance pour sélectionner les meilleurs professionnels de notre réseau. Nous travaillons avec des partenaires de confiance que nous avons testés et approuvés.'
                },
                {
                    question: 'Combien de réunions aurons-nous avant l\'événement ?',
                    answer: 'Le nombre de réunions dépend de la complexité de votre événement. En général, nous prévoyons une consultation initiale, plusieurs réunions de planification (3 à 5 pour un mariage), et une répétition finale quelques jours avant le jour J.'
                },
                {
                    question: 'Que se passe-t-il le jour de l\'événement ?',
                    answer: 'Notre équipe arrive tôt pour superviser l\'installation, coordonner tous les prestataires, gérer le timing, et s\'assurer que tout se déroule parfaitement. Nous restons jusqu\'à la fin pour gérer également le démontage et nous assurons que vous n\'avez qu\'à profiter de votre événement.'
                }
            ]
        },
        {
            category: 'Décoration & Design',
            questions: [
                {
                    question: 'Proposez-vous des services de décoration uniquement ?',
                    answer: 'Oui, nous proposons des services de décoration indépendants si vous souhaitez gérer d\'autres aspects de votre événement vous-même. Nous créons des concepts personnalisés et nous occupons de l\'installation et du démontage.'
                },
                {
                    question: 'Puis-je voir des exemples de vos décorations ?',
                    answer: 'Bien sûr ! Consultez notre page Portfolio pour voir nos réalisations précédentes. Nous pouvons également vous montrer des inspirations et créer des moodboards personnalisés lors de notre consultation.'
                },
                {
                    question: 'Travaillez-vous selon un thème spécifique ?',
                    answer: 'Nous pouvons travailler avec n\'importe quel thème ou style - classique, moderne, bohème, traditionnel, minimaliste, ou même des concepts totalement uniques. Notre équipe créative transformera votre vision en réalité.'
                }
            ]
        },
        {
            category: 'Questions Pratiques',
            questions: [
                {
                    question: 'Que se passe-t-il en cas d\'annulation ?',
                    answer: 'Notre politique d\'annulation est détaillée dans notre contrat. Généralement, l\'acompte n\'est pas remboursable, mais nous sommes flexibles et compréhensifs en cas de circonstances exceptionnelles. Nous discutons toujours de la meilleure solution possible.'
                },
                {
                    question: 'Avez-vous une assurance ?',
                    answer: 'Oui, nous sommes assurés pour la responsabilité civile professionnelle. Nous recommandons également à nos clients de souscrire une assurance événement pour une tranquillité d\'esprit maximale.'
                },
                {
                    question: 'Proposez-vous des services de coordination le jour J uniquement ?',
                    answer: 'Oui, si vous avez déjà planifié la majorité de votre événement et avez juste besoin d\'une équipe pour coordonner le jour J, nous proposons ce service. Cela inclut la gestion du timeline, la coordination des prestataires, et la supervision générale.'
                },
                {
                    question: 'Comment puis-je obtenir un devis ?',
                    answer: 'Remplissez simplement notre formulaire de contact en ligne ou appelez-nous directement. Nous organiserons une consultation gratuite pour discuter de votre projet et vous fournirons ensuite un devis détaillé sous 48 heures.'
                }
            ]
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
                            Questions Fréquentes
                        </h1>
                        <p className="text-xl text-gray-200">
                            Trouvez les réponses aux questions les plus courantes sur nos services
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        {faqCategories.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="mb-12 last:mb-0">
                                <motion.h2
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="text-3xl font-heading text-primary-950 mb-6"
                                >
                                    {category.category}
                                </motion.h2>

                                <div className="space-y-4">
                                    {category.questions.map((faq, faqIndex) => {
                                        const globalIndex = `${categoryIndex}-${faqIndex}`;
                                        const isOpen = openIndex === globalIndex;

                                        return (
                                            <motion.div
                                                key={faqIndex}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: faqIndex * 0.05 }}
                                                className="bg-white rounded-lg shadow-md overflow-hidden"
                                            >
                                                <button
                                                    onClick={() => toggleFAQ(globalIndex)}
                                                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                                                >
                                                    <span className="font-semibold text-primary-950 text-lg pr-4">
                                                        {faq.question}
                                                    </span>
                                                    <ChevronDown
                                                        size={24}
                                                        className={`flex-shrink-0 text-gold-600 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''
                                                            }`}
                                                    />
                                                </button>

                                                <AnimatePresence>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="px-6 pb-5 text-gray-700 leading-relaxed">
                                                                {faq.answer}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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
                            Vous n'avez pas trouvé votre réponse ?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Notre équipe est là pour répondre à toutes vos questions
                        </p>
                        <a href="/contact">
                            <button className="bg-gold-500 hover:bg-gold-600 text-primary-950 font-semibold px-8 py-4 rounded-full shadow-gold transition-all duration-300 hover:shadow-xl">
                                Contactez-nous
                            </button>
                        </a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;
