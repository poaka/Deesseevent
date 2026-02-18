import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

/**
 * Testimonial Section for Home Page
 */
const TestimonialSection = () => {
    const testimonial = {
        quote: "Une expérience inoubliable pour notre mariage ! L'équipe de DEESSE EVENT a transformé nos rêves en réalité. Chaque détail était parfait, de la décoration à la coordination. Nous recommandons vivement leurs services !",
        author: "Marie & Jean Dupont",
        event: "Mariage - Décembre 2024",
        avatar: "MD",
    };

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Quote Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-100 text-gold-600 mb-8">
                        <Quote size={32} />
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className="text-2xl md:text-3xl font-heading text-gray-800 mb-8 italic leading-relaxed">
                        "{testimonial.quote}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center text-primary-950 font-bold text-xl">
                            {testimonial.avatar}
                        </div>
                        <div className="text-left">
                            <p className="font-semibold text-gray-900 text-lg">
                                {testimonial.author}
                            </p>
                            <p className="text-gray-600">
                                {testimonial.event}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialSection;
