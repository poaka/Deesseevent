import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { supabase } from "@/lib/supabase";

/**
 * Contact Page with quote request form
 */
const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Submit to Supabase
      const { error } = await supabase.from("quote_requests").insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          event_type: data.eventType,
          event_date: data.eventDate,
          guest_count: parseInt(data.guestCount),
          budget: data.budget,
          message: data.message,
          status: "new",
        },
      ]);

      if (error) throw error;

      // Send email notification (optional - requires Edge Function setup)
      try {
        await supabase.functions.invoke('send-quote-notification', {
          body: {
            name: data.name,
            email: data.email,
            phone: data.phone,
            event_type: data.eventType,
            event_date: data.eventDate,
            guest_count: parseInt(data.guestCount),
            budget: data.budget,
            message: data.message,
          }
        });
      } catch (emailError) {
        console.log('Email notification failed (non-critical):', emailError);
        // Don't throw - email is optional
      }

      toast.success(
        "Votre demande a été envoyée avec succès ! Nous vous contacterons bientôt.",
      );
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(
        "Une erreur est survenue. Veuillez réessayer ou nous contacter directement.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: "Adresse",
      content: "Kribi, Cameroun",
      link: null,
    },
    {
      icon: <Phone size={24} />,
      title: "Téléphone",
      content: "+237 655 772 303",
      link: "tel:+237655772303",
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      content: "deesseevent237@gmail.com",
      link: null,
    },
    {
      icon: <Clock size={24} />,
      title: "Horaires",
      content: "7/7",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-purple py-20 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-heading text-white mb-6">
              Contactez-Nous
            </h1>
            <p className="text-xl text-gray-200">
              Parlez-nous de votre projet et recevez un devis personnalisé
              gratuit
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold-100 text-gold-600 mb-4">
                  {info.icon}
                </div>
                <h3 className="font-semibold text-primary-950 mb-2">
                  {info.title}
                </h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-gray-600 hover:text-gold-600 transition-colors"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-600">{info.content}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-elegant p-8 md:p-12"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-heading text-primary-950 mb-4">
                  Demande de Devis
                </h2>
                <p className="text-gray-600 text-lg">
                  Remplissez ce formulaire et nous vous contacterons dans les 24
                  heures
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Nom complet"
                    {...register("name", { required: "Le nom est requis" })}
                    error={errors.name?.message}
                    required
                  />

                  <Input
                    label="Email"
                    type="email"
                    {...register("email", {
                      required: "L'email est requis",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email invalide",
                      },
                    })}
                    error={errors.email?.message}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Téléphone"
                    type="tel"
                    {...register("phone", {
                      required: "Le téléphone est requis",
                    })}
                    error={errors.phone?.message}
                    required
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type d'événement <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("eventType", {
                        required: "Le type d'événement est requis",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                    >
                      <option value="">Sélectionnez...</option>
                      <option value="mariage">Mariage</option>
                      <option value="corporate">Événement d'entreprise</option>
                      <option value="anniversaire">Anniversaire</option>
                      <option value="bapteme">Baptême / Communion</option>
                      <option value="celebration-de-vie">celebration de vie</option>
                      <option value="autre">Autre</option>
                    </select>
                    {errors.eventType && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.eventType.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Date de l'événement"
                    type="date"
                    {...register("eventDate", {
                      required: "La date est requise",
                    })}
                    error={errors.eventDate?.message}
                    required
                  />

                  <Input
                    label="Nombre d'invités (approximatif)"
                    type="number"
                    {...register("guestCount", {
                      required: "Le nombre d'invités est requis",
                      min: { value: 1, message: "Minimum 1 invité" },
                    })}
                    error={errors.guestCount?.message}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget estimé
                  </label>
                  <input
                    type="number"
                    placeholder="Entrez votre budget en FCFA"
                    {...register("budget")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                  />
                </div>
                <Textarea
                  label="Message / Détails supplémentaires"
                  rows={6}
                  {...register("message")}
                  error={errors.message?.message}
                  placeholder="Décrivez votre événement idéal, vos besoins spécifiques, vos préférences..."
                />

                <div className="text-center pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <LoadingSpinner />
                    ) : (
                      <>
                        Envoyer la demande
                        <Send size={18} className="ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
