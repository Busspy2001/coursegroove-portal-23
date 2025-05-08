
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Users, Award, BookOpen, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 py-20">
        <div className="container px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 text-schoolier-blue mb-6">À propos de Schoolier</h1>
            <p className="subheading mb-8">
              Notre mission est de démocratiser l'accès à l'éducation de qualité pour tous, partout dans le monde.
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate("/register")} 
              className="bg-schoolier-teal hover:bg-schoolier-teal/90"
            >
              Rejoignez-nous
            </Button>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 container px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="heading-2 text-schoolier-blue mb-6">Notre mission</h2>
            <p className="text-lg mb-6">
              Schoolier.com est née d'une conviction : l'apprentissage devrait être accessible à tous, quelle que soit sa situation géographique ou financière.
            </p>
            <p className="text-lg mb-6">
              Nous croyons que le savoir est la clé de l'émancipation personnelle et que chaque individu devrait pouvoir se former à son rythme, selon ses besoins et ses contraintes.
            </p>
            <p className="text-lg">
              Notre plateforme connecte des apprenants passionnés à des formateurs experts, créant ainsi un écosystème d'apprentissage dynamique et bienveillant.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Équipe Schoolier"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-5 -right-5 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4">
              <p className="font-semibold">Fondé en 2022</p>
              <p className="text-schoolier-teal">Paris, France</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Values */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-6 mx-auto">
          <h2 className="heading-2 text-center mb-4">Nos valeurs</h2>
          <p className="subheading text-center mb-12 max-w-3xl mx-auto">
            Ces principes fondamentaux guident chacune de nos actions et décisions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-schoolier-blue card-hover">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-schoolier-blue" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Accessibilité</h3>
                <p className="text-muted-foreground">
                  Nous nous engageons à rendre l'éducation accessible au plus grand nombre, en proposant des options gratuites et des tarifs abordables.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-schoolier-teal card-hover">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-6">
                  <Award className="h-8 w-8 text-schoolier-teal" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  Nous maintenons des standards élevés pour nos cours, en sélectionnant soigneusement nos formateurs et en évaluant régulièrement la qualité du contenu.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-schoolier-green card-hover">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
                  <Globe className="h-8 w-8 text-schoolier-green" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Diversité</h3>
                <p className="text-muted-foreground">
                  Nous célébrons la diversité des perspectives et des expériences, avec des formateurs et des étudiants du monde entier.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 container px-6 mx-auto">
        <h2 className="heading-2 text-center mb-4">Notre équipe</h2>
        <p className="subheading text-center mb-12 max-w-3xl mx-auto">
          Des passionnés d'éducation et de technologie déterminés à transformer l'apprentissage en ligne
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Sophie Martin",
              role: "Co-fondatrice & CEO",
              image: "https://ui-avatars.com/api/?name=Sophie+Martin&background=0D9488&color=fff",
              bio: "Ancienne directrice pédagogique, passionnée par l'éducation accessible."
            },
            {
              name: "Thomas Dubois",
              role: "Co-fondateur & CTO",
              image: "https://ui-avatars.com/api/?name=Thomas+Dubois&background=0D9488&color=fff",
              bio: "Ingénieur logiciel avec 15 ans d'expérience dans les EdTech."
            },
            {
              name: "Léa Moreau",
              role: "Directrice Pédagogique",
              image: "https://ui-avatars.com/api/?name=Lea+Moreau&background=0D9488&color=fff",
              bio: "Experte en conception de programmes éducatifs innovants."
            },
            {
              name: "Marc Petit",
              role: "Directeur Marketing",
              image: "https://ui-avatars.com/api/?name=Marc+Petit&background=0D9488&color=fff",
              bio: "Spécialiste en croissance de plateformes digitales éducatives."
            }
          ].map((member, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mb-4" />
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-schoolier-teal mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-schoolier-blue text-white">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <p className="text-blue-100">Étudiants actifs</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,500+</div>
              <p className="text-blue-100">Cours disponibles</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <p className="text-blue-100">Formateurs experts</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">45+</div>
              <p className="text-blue-100">Pays représentés</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 container px-6 mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 rounded-xl p-8 md:p-12 text-center">
          <h2 className="heading-3 mb-4">Rejoignez l'aventure Schoolier</h2>
          <p className="subheading mb-8 max-w-2xl mx-auto">
            Que vous soyez étudiant en quête de nouvelles compétences ou expert souhaitant partager votre savoir, Schoolier est fait pour vous.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate("/register")} 
              className="bg-schoolier-blue hover:bg-schoolier-blue/90"
            >
              S'inscrire comme étudiant
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate("/become-instructor")}
              className="border-schoolier-teal text-schoolier-teal hover:bg-schoolier-teal/10"
            >
              Devenir formateur
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
