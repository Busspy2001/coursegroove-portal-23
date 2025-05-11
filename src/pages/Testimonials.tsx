import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, Quote, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TestimonialDialog from "@/components/testimonials/TestimonialDialog";

const Testimonials = () => {
  // Animation variants
  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  const staggerContainer = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Testimonial dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Testimonial data
  const testimonials = [{
    name: "Sarah L.",
    role: "Data Analyst",
    company: "Tech Solutions Inc.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote: "Grâce à Schoolier, j'ai décroché un emploi dans mon domaine de rêve ! Les cours sont extrêmement bien structurés et les formateurs sont incroyablement compétents et disponibles.",
    stars: 5,
    course: "Data Science Bootcamp"
  }, {
    name: "Thomas M.",
    role: "Développeur Full Stack",
    company: "WebCreative",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Après avoir suivi plusieurs formations en ligne sans réel succès, j'ai enfin trouvé avec Schoolier une plateforme qui répond vraiment à mes attentes. La qualité pédagogique est exceptionnelle.",
    stars: 5,
    course: "JavaScript Avancé"
  }, {
    name: "Marie D.",
    role: "UX Designer",
    company: "DesignStudio",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "Le rapport qualité-prix est imbattable. J'ai pu suivre plusieurs formations pour le prix d'une seule ailleurs, et la qualité est au rendez-vous. Je recommande vivement !",
    stars: 5,
    course: "Design d'Interfaces Modernes"
  }, {
    name: "Julien P.",
    role: "Chef de Projet Digital",
    company: "Innovate Agency",
    image: "https://randomuser.me/api/portraits/men/46.jpg",
    quote: "La plateforme est intuitive, les cours sont clairs et les exercices pratiques m'ont permis de mettre directement en application mes nouvelles connaissances dans mon travail quotidien.",
    stars: 5,
    course: "Gestion de Projet Agile"
  }, {
    name: "Sophie G.",
    role: "Responsable Marketing",
    company: "GrowthPartners",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    quote: "J'ai particulièrement apprécié la disponibilité des formateurs et la communauté d'entraide. Les forums de discussion sont très actifs et les réponses sont rapides et pertinentes.",
    stars: 4,
    course: "Marketing Digital Avancé"
  }, {
    name: "Antoine B.",
    role: "Entrepreneur",
    company: "StartupNow",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    quote: "En tant qu'entrepreneur, je cherchais une formation flexible et efficace. Schoolier a dépassé mes attentes avec des contenus constamment mis à jour et adaptés aux réalités du marché.",
    stars: 5,
    course: "Entrepreneuriat Digital"
  }];

  // Featured testimonials (video or highlight)
  const featuredTestimonials = [{
    name: "Léa Martin",
    role: "Développeuse Front-end Senior",
    company: "TechInnovate",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    quote: "Après 10 ans dans le développement web, j'avais besoin de me mettre à jour sur les dernières technologies. Les cours de Schoolier m'ont permis non seulement d'actualiser mes compétences, mais aussi de décrocher une promotion. L'investissement en a vraiment valu la peine !",
    video: "https://example.com/testimonial-video",
    course: "React & Next.js Masterclass"
  }, {
    name: "Marc Dubois",
    role: "Analyste Cybersécurité",
    company: "SecureNet",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    quote: "La formation en cybersécurité était exactement ce dont j'avais besoin pour évoluer dans ma carrière. Le contenu était à jour avec les dernières menaces et techniques, et les instructeurs étaient des professionnels du secteur. Je me sens maintenant beaucoup plus confiant dans mon travail quotidien.",
    video: "https://example.com/testimonial-video2",
    course: "Cybersécurité Avancée"
  }];

  // Companies using Schoolier
  const companies = ["Microsoft", "Google", "Amazon", "Facebook", "Apple", "IBM", "Oracle", "Salesforce"];

  // Render stars based on rating
  const renderStars = (count: number) => {
    return Array(count).fill(0).map((_, i) => <Star key={i} className="h-5 w-5 text-schoolier-yellow" fill="currentColor" />);
  };
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-schoolier-blue/10 to-schoolier-teal/10 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div className="text-center max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{
          once: true
        }} variants={fadeIn}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
              Ce que nos apprenants disent de nous
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Découvrez les expériences réelles de nos étudiants qui ont transformé leur vie professionnelle grâce à nos formations
            </p>
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="flex">
                {renderStars(5)}
              </div>
              <span className="text-lg font-bold">4.8/5</span>
              <span className="text-gray-600">(2,500+ avis)</span>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Video Testimonials */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Témoignages à la une</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {featuredTestimonials.map((testimonial, index) => <motion.div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{
            once: true
          }}>
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {/* This would be a video in production */}
                  <div className="w-full h-full flex items-center justify-center bg-schoolier-blue/10">
                    <Quote className="h-12 w-12 text-schoolier-teal opacity-50" />
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-gray-500 text-sm">{testimonial.role}, {testimonial.company}</p>
                      <p className="text-schoolier-blue text-sm mt-1">{testimonial.course}</p>
                    </div>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </section>
      
      {/* Grid of Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Ce que nos étudiants ont accompli</h2>
          
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{
          once: true
        }}>
            {testimonials.map((testimonial, index) => <motion.div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100" variants={fadeIn}>
                <div className="flex mb-4">
                  {renderStars(testimonial.stars)}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.role}, {testimonial.company}</p>
                    <p className="text-schoolier-blue text-sm mt-1">{testimonial.course}</p>
                  </div>
                </div>
              </motion.div>)}
          </motion.div>
        </div>
      </section>
      
      {/* Company Logos Section */}
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Ils font confiance à nos diplômés</h2>
          <p className="text-center text-gray-600 mb-12">Nos apprenants travaillent dans ces entreprises de renom</p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {companies.map((company, index) => <div key={index} className="text-xl font-bold text-gray-400">{company}</div>)}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-schoolier-teal to-schoolier-blue text-white">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Prêt à transformer votre carrière ?</h2>
            <p className="text-lg opacity-90 mb-8">
              Rejoignez des milliers d'apprenants satisfaits et commencez votre parcours d'apprentissage dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/courses">
                <Button size="lg" className="bg-white text-schoolier-blue hover:bg-gray-100">
                  Explorer nos cours
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg" className="border-white hover:text-schoolier-blue bg-transparent text-gray-50">
                  S'inscrire gratuitement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Submit Your Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Vous avez une histoire à partager ?</h2>
            <p className="text-gray-700 mb-8">
              Si vous êtes un apprenant de Schoolier et que vous souhaitez partager votre expérience, nous serions ravis de l'entendre !
            </p>
            <Button 
              className="bg-schoolier-blue hover:bg-schoolier-blue/90"
              onClick={() => setIsDialogOpen(true)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Partager votre témoignage
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonial Dialog */}
      <TestimonialDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
      />
      
      <Footer />
    </div>;
};
export default Testimonials;
