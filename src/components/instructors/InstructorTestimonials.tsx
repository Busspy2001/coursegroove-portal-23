
import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialProps {
  text: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  instructorName: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ 
  text, name, role, avatar, rating, instructorName 
}) => {
  return (
    <Card className="h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
            />
          ))}
        </div>
        
        <div className="relative mb-6 flex-grow">
          <Quote className="h-8 w-8 text-schoolier-blue/20 absolute -left-2 -top-2 rotate-180" />
          <p className="text-gray-700 dark:text-gray-300 italic relative z-10">
            {text}
          </p>
        </div>
        
        <div className="flex items-center gap-3 mt-4">
          <img 
            src={avatar} 
            alt={name} 
            className="w-12 h-12 rounded-full object-cover" 
          />
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">
              Élève de <span className="text-schoolier-blue">{instructorName}</span>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const InstructorTestimonials = () => {
  const testimonials = [
    {
      text: "Suivre les cours de Thomas a complètement changé ma perspective sur le marketing digital. Son expertise et sa pédagogie sont exceptionnelles.",
      name: "Julien Moreau",
      role: "Entrepreneur",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      instructorName: "Thomas Martin"
    },
    {
      text: "Marie est une formatrice incroyable. Sa façon d'expliquer des concepts complexes de programmation est claire et accessible à tous.",
      name: "Laura Petit",
      role: "Étudiante en informatique",
      avatar: "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      rating: 5,
      instructorName: "Marie Dupont"
    },
    {
      text: "Les cours d'Alexandre m'ont permis d'acquérir une solide compréhension de la finance. Je recommande vivement ses formations à quiconque souhaite progresser dans ce domaine.",
      name: "Paul Dubois",
      role: "Analyste financier",
      avatar: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80",
      rating: 4,
      instructorName: "Alexandre Bernard"
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-900/70">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ce que disent nos étudiants</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Découvrez l'impact de nos formateurs sur la réussite de leurs étudiants
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
