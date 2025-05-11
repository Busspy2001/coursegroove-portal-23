
import React from "react";
import { motion } from "framer-motion";

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  delay: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="mb-4 relative mx-auto">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-schoolier-blue text-white text-xs py-1 px-3 rounded-full">
          {role}
        </div>
      </div>
      <h3 className="font-bold text-lg">{name}</h3>
    </motion.div>
  );
};

export const TeamSection = () => {
  const team = [
    {
      name: "Marie Laurent",
      role: "Fondatrice & CEO",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
      name: "Thomas Dupont",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
      name: "Sophie Moreau",
      role: "Directrice Pédagogique",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300"
    },
    {
      name: "Alexandre Martin",
      role: "Directeur Marketing",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Notre équipe</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Rencontrez les personnes passionnées qui travaillent à rendre l'éducation accessible à tous.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <TeamMember 
              key={index} 
              name={member.name} 
              role={member.role} 
              image={member.image}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
