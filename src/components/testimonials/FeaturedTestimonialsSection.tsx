
import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

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

interface FeaturedTestimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  video: string;
  course: string;
}

const FeaturedTestimonialsSection: React.FC = () => {
  // Featured testimonials data
  const featuredTestimonials: FeaturedTestimonial[] = [{
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

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Témoignages à la une</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {featuredTestimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-gray-50 rounded-xl overflow-hidden shadow-lg" 
              variants={fadeIn} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }}
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTestimonialsSection;
