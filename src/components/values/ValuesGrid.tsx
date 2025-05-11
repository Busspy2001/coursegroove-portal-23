
import React from "react";
import { motion } from "framer-motion";
import { Book, Heart, Users, Star, Award, Compass } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="h-full border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow duration-300">
        <CardHeader>
          <div className="bg-schoolier-blue/10 dark:bg-schoolier-blue/5 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            {React.cloneElement(icon as React.ReactElement, { className: "h-6 w-6 text-schoolier-blue" })}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const ValuesGrid = () => {
  const values = [
    {
      icon: <Book />,
      title: "Accessibilité",
      description: "Nous rendons l'éducation de qualité accessible à tous, peu importe où vous vous trouvez dans le monde.",
    },
    {
      icon: <Heart />,
      title: "Passion",
      description: "Nous croyons que l'apprentissage est alimenté par la passion, tant des formateurs que des apprenants.",
    },
    {
      icon: <Users />,
      title: "Communauté",
      description: "Nous valorisons notre communauté d'apprenants et d'instructeurs qui partagent leurs connaissances et expériences.",
    },
    {
      icon: <Star />,
      title: "Excellence",
      description: "Nous nous efforçons d'offrir des formations de la plus haute qualité et une expérience utilisateur exceptionnelle.",
    },
    {
      icon: <Award />,
      title: "Impact",
      description: "Nous mesurons notre succès par l'impact positif que nous avons sur la vie et la carrière de nos utilisateurs.",
    },
    {
      icon: <Compass />,
      title: "Innovation",
      description: "Nous innovons constamment pour améliorer notre plateforme et l'expérience d'apprentissage.",
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900/30">
      <div className="container px-4 mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos valeurs fondamentales</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ces principes guident nos décisions et façonnent l'expérience que nous créons pour nos utilisateurs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard 
              key={index} 
              icon={value.icon} 
              title={value.title} 
              description={value.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
