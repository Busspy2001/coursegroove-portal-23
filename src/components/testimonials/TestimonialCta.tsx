
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TestimonialCta: React.FC = () => {
  return (
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
  );
};

export default TestimonialCta;
