
import React from "react";
import { motion } from "framer-motion";
import { Star, Award } from "lucide-react";

// Animation
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  image: string;
  stars: number;
  isTopInstructor?: boolean;
  stats?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ 
  quote, 
  name, 
  role, 
  image, 
  stars, 
  isTopInstructor = false,
  stats 
}) => {
  return (
    <motion.div 
      variants={item} 
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          {Array(stars).fill(0).map((_, i) => (
            <Star key={i} className="h-5 w-5 text-schoolier-yellow" fill="currentColor" />
          ))}
        </div>
        {isTopInstructor && (
          <div className="bg-schoolier-blue/10 text-schoolier-blue px-2 py-1 rounded-full flex items-center text-xs font-bold">
            <Award className="h-3.5 w-3.5 mr-1" />
            Top instructeur
          </div>
        )}
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic mb-6">"{quote}"</p>
      <div className="flex items-center">
        <img 
          src={image} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4" 
        />
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{role}</p>
          {stats && <p className="text-schoolier-blue font-medium text-sm mt-1">{stats}</p>}
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "En 6 mois sur Schoolier, j'ai touché plus de 300 étudiants et généré +5k€. La plateforme est incroyablement intuitive.",
      name: "Nadia B.",
      role: "Formatrice en design UX",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      stars: 5,
      isTopInstructor: true,
      stats: "300+ étudiants • +5k€ générés"
    },
    {
      quote: "Après des années sur YouTube sans vraie monétisation, Schoolier m'a permis de rentabiliser mon expertise tout en offrant une bien meilleure expérience à mes apprenants.",
      name: "Thomas L.",
      role: "Expert en développement web",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      stars: 5,
      stats: "1200+ étudiants • 12 cours"
    },
    {
      quote: "Le support technique est exceptionnel. On se sent vraiment accompagné de A à Z dans la création et la promotion des cours.",
      name: "Sarah M.",
      role: "Coach en entrepreneuriat",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      stars: 5,
      isTopInstructor: true,
      stats: "4 ans sur Schoolier"
    }
  ];

  const partners = [
    "Microsoft", "Google", "Adobe", "Figma", "Salesforce", "Stripe"
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ils enseignent et réussissent sur Schoolier</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Rejoignez une communauté d'instructeurs passionnés qui transforment leur savoir en revenus
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
        >
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              name={testimonial.name}
              role={testimonial.role}
              image={testimonial.image}
              stars={testimonial.stars}
              isTopInstructor={testimonial.isTopInstructor}
              stats={testimonial.stats}
            />
          ))}
        </motion.div>

        <div className="mt-20">
          <h3 className="text-center text-xl text-gray-500 dark:text-gray-400 mb-8">
            Nos instructeurs experts viennent de ces entreprises
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {partners.map((partner, index) => (
              <div key={index} className="text-xl font-bold text-gray-400">{partner}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
