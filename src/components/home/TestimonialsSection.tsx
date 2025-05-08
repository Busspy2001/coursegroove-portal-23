
import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah L.",
    avatar: "https://ui-avatars.com/api/?name=Sarah+L&background=0D9488&color=fff",
    text: "Grâce à Schoolier, j'ai décroché un emploi dans mon domaine de rêve ! Les cours sont extrêmement bien structurés et les formateurs sont incroyablement compétents et disponibles.",
    role: "Data Analyst",
    company: "Tech Solutions Inc.",
    stars: 5
  },
  {
    name: "Julien M.",
    avatar: "https://ui-avatars.com/api/?name=Julien+M&background=0D9488&color=fff",
    text: "Les formations sont claires, interactives et très enrichissantes ! J'ai pu développer de nouvelles compétences en un temps record et les mettre directement en pratique dans mon travail.",
    role: "Développeur Front-end",
    company: "WebCreative",
    stars: 5
  },
  {
    name: "Marie T.",
    avatar: "https://ui-avatars.com/api/?name=Marie+T&background=0D9488&color=fff",
    text: "Le rapport qualité-prix est imbattable. J'ai pu suivre plusieurs formations pour le prix d'une seule ailleurs, et la qualité est au rendez-vous. Je recommande vivement !",
    role: "UX Designer",
    company: "DesignStudio",
    stars: 5
  }
];

const stats = [
  { value: "98%", label: "Satisfaction étudiants" },
  { value: "10,000+", label: "Étudiants actifs" },
  { value: "1,500+", label: "Cours disponibles" },
  { value: "200+", label: "Instructeurs experts" }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-6 mx-auto">
        <h2 className="heading-2 text-center mb-4 font-spartan">Ce que nos étudiants disent</h2>
        <p className="subheading text-center mb-12 max-w-3xl mx-auto">
          Des milliers d'étudiants font confiance à Schoolier pour développer leurs compétences
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 relative">
              <div className="absolute -top-5 -right-2">
                <div className="bg-schoolier-teal text-white rounded-full w-10 h-10 flex items-center justify-center">
                  "
                </div>
              </div>
              <div className="flex items-center space-x-4 mb-6">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full border-4 border-schoolier-teal/20" />
                <div>
                  <h4 className="font-bold text-lg font-spartan">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-schoolier-teal">{testimonial.company}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.text}"</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-wrap justify-center gap-8 mt-16">
          {stats.map((stat, index) => (
            <div className="text-center" key={index}>
              <h3 className="text-4xl font-bold text-schoolier-teal mb-2 font-spartan">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
