
import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

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

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
  stars: number;
  course: string;
}

const renderStars = (count: number) => {
  return Array(count).fill(0).map((_, i) => <Star key={i} className="h-5 w-5 text-schoolier-yellow" fill="currentColor" />);
};

const TestimonialsGridSection: React.FC = () => {
  // Testimonial data
  const testimonials: Testimonial[] = [{
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

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Ce que nos étudiants ont accompli</h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
          variants={staggerContainer} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md border border-gray-100" 
              variants={fadeIn}
            >
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsGridSection;
