
import React from "react";
import { motion } from "framer-motion";
import { InstructorCard } from "./InstructorCard";

export const FeaturedInstructors = () => {
  const featuredInstructors = [
    {
      id: 1,
      name: "Thomas Martin",
      role: "Expert en Marketing Digital",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      students: 12486,
      courses: 8,
      badge: "Top Formateur"
    },
    {
      id: 2,
      name: "Marie Dupont",
      role: "Développeuse Full-Stack",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      students: 9752,
      courses: 6,
      badge: "Meilleure Vente"
    },
    {
      id: 3,
      name: "Alexandre Bernard",
      role: "Expert en Finance",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      students: 8309,
      courses: 5,
      badge: "Populaire"
    },
    {
      id: 4,
      name: "Sophie Leclerc",
      role: "UX/UI Designer",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      students: 11205,
      courses: 7,
      badge: "Recommandé"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Formateurs à la une</h2>
          <a href="#all-instructors" className="text-schoolier-blue hover:underline">
            Voir tous
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredInstructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <InstructorCard instructor={instructor} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
