import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Check,
  Star,
  ArrowRight,
  Heart,
  Briefcase,
  Cake,
  Sparkles,
} from "lucide-react";
import Button from "@/components/common/Button";

// Import images
import marriageImg from "@/assets/images/photo_2_2026-02-17_15-07-47.jpg";
import corporateImg from "@/assets/images/photo_10_2026-02-17_15-07-47.jpg";
import familyImg from "@/assets/images/photo_1_2026-02-17_15-07-47.jpg";
import decorImg from "@/assets/images/photo_9_2026-02-17_15-07-47.jpg";

/**
 * Services Page - Comprehensive service listings
 */
const Services = () => {
  const services = [
    {
      icon: <Heart size={40} />,
      title: "Organisation de Mariage",
      image: marriageImg,
      description:
        "Transformez votre mariage en un conte de fées inoubliable. Notre équipe s'occupe de chaque détail pour créer la célébration de vos rêves.",
      features: [
        "Coordination complète du jour J",
        "Décoration personnalisée",
        "Gestion des prestataires",
        "Timeline et planning détaillé",
        "Assistance pendant toute la cérémonie",
        "Coordination des répétitions",
      ],
      packages: [
        {
          name: "Essentiel",
          description: "Coordination du jour J et services de base",
        },
        {
          name: "Premium",
          description: "Organisation complète avec décoration premium",
        },
        {
          name: "Prestige",
          description:
            "Service haut de gamme tout inclus avec options sur mesure",
        },
      ],
    },
    {
      icon: <Briefcase size={40} />,
      title: "Événements d'Entreprise",
      image: corporateImg,
      description:
        "Des événements corporate qui marquent les esprits. Séminaires, lancements de produits, galas d'entreprise - nous gérons tout avec professionnalisme.",
      features: [
        "Séminaires et conférences",
        "Lancements de produits",
        "Team building",
        "Galas d'entreprise",
        "Cocktails et réceptions",
        "Solutions audiovisuelles",
      ],
      packages: [
        {
          name: "Corporate Basic",
          
          description: "Événements d'entreprise pour 50 et plus de personnes",
        },
        {
          name: "Corporate Plus",
         
          description: "Événements d'envergure avec services premium",
        },
        {
          name: "Corporate Prestige",
          
          description: "Événements d'exception avec services sur mesure",
        },
      ],
    },
    {
      icon: <Cake size={40} />,
      title: "Événements Familiaux",
      image: familyImg,
      description:
        "Célébrez les moments précieux de la vie avec style. Anniversaires, baptêmes, fêtes familiales - chaque événement mérite d'être spécial.",
      features: [
        "Anniversaires (enfants et adultes)",
        "Baptêmes et communions",
        "Fêtes de fiançailles",
        "Baby showers",
        "Réunions familiales",
        "Anniversaires de mariage",
      ],
      packages: [
        {
          name: "Découverte",

          description: "Événements intimes pour 20-30 personnes",
        },
        {
          name: "Célébration",

          description: "Événements moyens avec décoration complète",
        },
        {
          name: "Grande Fête",

          description: "Grandes célébrations familiales tout inclus",
        },
      ],
    },
    {
      icon: <Sparkles size={40} />,
      title: "Décoration & Design",
      image: decorImg,
      description:
        "Créez l'ambiance parfaite avec nos services de décoration sur mesure. De l'élégance classique au moderne audacieux.",
      features: [
        "Concepts de décoration personnalisés",
        "Installation et démontage",
        "Éclairage d'ambiance",
        "Fleurs et arrangements floraux",
        "Mobilier et accessoires",
        "Thématiques sur mesure",
      ],
      packages: [
        {
          name: "Décor Simple",

          description: "Décoration basique pour petits événements",
        },
        {
          name: "Décor Premium",

          description: "Décoration complète avec éléments personnalisés",
        },
        {
          name: "Décor Luxe",

          description: "Créations exclusives et décoration haut de gamme",
        },
      ],
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
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className="fill-gold-400 text-gold-400"
                />
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-heading text-white mb-6">
              Nos Services Premium
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Des prestations sur mesure pour faire de chaque événement un
              moment inoubliable
            </p>
            <Link to="/contact">
              <Button size="lg" className="shadow-2xl">
                Demander un devis gratuit
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-20">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-elegant overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Image */}
                  <div
                    className={`relative h-64 lg:h-auto ${index % 2 === 1 ? "lg:order-2" : ""}`}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-950/50 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold-100 text-gold-600 mb-6">
                      {service.icon}
                    </div>

                    <h2 className="text-3xl md:text-4xl font-heading text-primary-950 mb-4">
                      {service.title}
                    </h2>

                    <p className="text-gray-600 mb-6 text-lg">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-primary-950 mb-4">
                        Ce qui est inclus :
                      </h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check
                              size={20}
                              className="text-gold-600 flex-shrink-0 mt-1"
                            />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Packages */}
                    <div>
                      <h3 className="text-xl font-semibold text-primary-950 mb-4">
                        Nos formules :
                      </h3>
                      <div className="space-y-3">
                        {service.packages.map((pkg, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                          >
                            <div>
                              <h4 className="font-semibold text-primary-950">
                                {pkg.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {pkg.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gold-600 whitespace-nowrap">
                                {pkg.price}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8">
                      <Link to="/contact">
                        <Button className="w-full md:w-auto">
                          Demander un devis
                          <ArrowRight size={18} className="ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-primary-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading text-gold-400 mb-4">
              Pourquoi choisir DEESSE EVENT ?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Une expertise reconnue et un engagement sans faille pour votre
              satisfaction
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "100+", label: "Événements Réalisés" },
              { number: "95%", label: "Clients Satisfaits" },
              { number: "5 ans", label: "D'Expérience" },
              { number: "24/7", label: "Support Client" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="text-5xl font-bold text-gold-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-heading text-primary-950 mb-6">
              Prêt à planifier votre événement ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et
              obtenir un devis personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg">Demander un devis</Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline">
                  Voir nos réalisations
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
