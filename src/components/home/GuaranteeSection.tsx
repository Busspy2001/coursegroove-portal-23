
import React from "react";
import { Shield, BarChart, Users } from "lucide-react";

const GuaranteeSection = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 font-spartan">Inscrivez-vous l'esprit tranquille ✅</h2>
          <p className="text-muted-foreground mb-8">
            Nous sommes confiants dans la qualité de nos formations et nous nous engageons à vous offrir la meilleure expérience d'apprentissage.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-schoolier-blue" />
              </div>
              <h3 className="font-semibold mb-2 font-spartan">Garantie 30 jours</h3>
              <p className="text-sm text-muted-foreground text-center">
                Satisfait ou remboursé pendant 30 jours après votre achat
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
                <BarChart className="h-8 w-8 text-schoolier-teal" />
              </div>
              <h3 className="font-semibold mb-2 font-spartan">Accès à vie</h3>
              <p className="text-sm text-muted-foreground text-center">
                Accédez à vos cours sans limite de temps et à toutes les mises à jour
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-schoolier-green" />
              </div>
              <h3 className="font-semibold mb-2 font-spartan">Support réactif</h3>
              <p className="text-sm text-muted-foreground text-center">
                Notre équipe est disponible 7j/7 pour répondre à vos questions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
