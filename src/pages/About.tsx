
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Book, Users, Award, Clock, Globe, MessageSquare } from "lucide-react";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container px-6 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">À propos de Schoolier</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            La plateforme d'apprentissage en ligne qui transforme l'éducation à travers une expérience pédagogique innovante et accessible
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 container px-6 mx-auto">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Notre mission</h2>
          <p className="text-lg text-muted-foreground mb-8 text-center">
            Chez Schoolier, nous croyons que l'éducation de qualité devrait être accessible à tous, partout dans le monde.
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
            <p className="text-lg mb-6">
              Fondée en 2023, Schoolier est née d'une vision simple mais ambitieuse : démocratiser l'accès à une éducation de qualité. Notre plateforme d'apprentissage en ligne permet à chacun de développer ses compétences à son propre rythme, avec des cours dispensés par des experts reconnus dans leur domaine.
            </p>
            <p className="text-lg">
              Nous travaillons chaque jour pour créer un écosystème éducatif où apprenants et instructeurs peuvent se connecter, partager leurs connaissances et grandir ensemble. Notre objectif est de transformer la façon dont le monde apprend, en rendant l'éducation plus interactive, personnalisée et efficace.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Users className="h-12 w-12 text-schoolier-blue mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">10K+</h3>
              <p className="text-muted-foreground">Étudiants actifs</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Book className="h-12 w-12 text-schoolier-teal mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">200+</h3>
              <p className="text-muted-foreground">Cours de qualité</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Award className="h-12 w-12 text-schoolier-green mx-auto mb-4" />
              <h3 className="text-4xl font-bold mb-2">50+</h3>
              <p className="text-muted-foreground">Instructeurs experts</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-6 mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Nos valeurs</h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
            Les principes qui guident nos actions et notre développement
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white dark:bg-gray-800 p-8 card-hover border border-gray-100 dark:border-gray-700">
              <Clock className="h-10 w-10 text-schoolier-blue mb-4" />
              <h3 className="text-xl font-semibold mb-3">Accessibilité</h3>
              <p className="text-muted-foreground">
                Nous croyons que l'éducation devrait être accessible à tous, indépendamment de la situation géographique ou financière.
              </p>
            </Card>
            <Card className="bg-white dark:bg-gray-800 p-8 card-hover border border-gray-100 dark:border-gray-700">
              <Award className="h-10 w-10 text-schoolier-teal mb-4" />
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-muted-foreground">
                Nous nous engageons à fournir des cours de la plus haute qualité, créés par des experts reconnus dans leur domaine.
              </p>
            </Card>
            <Card className="bg-white dark:bg-gray-800 p-8 card-hover border border-gray-100 dark:border-gray-700">
              <Globe className="h-10 w-10 text-schoolier-green mb-4" />
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                Nous repoussons constamment les limites de la technologie éducative pour améliorer l'expérience d'apprentissage.
              </p>
            </Card>
            <Card className="bg-white dark:bg-gray-800 p-8 card-hover border border-gray-100 dark:border-gray-700">
              <MessageSquare className="h-10 w-10 text-schoolier-blue mb-4" />
              <h3 className="text-xl font-semibold mb-3">Communauté</h3>
              <p className="text-muted-foreground">
                Nous favorisons un environnement collaboratif où apprenants et instructeurs peuvent échanger et s'entraider.
              </p>
            </Card>
            <Card className="bg-white dark:bg-gray-800 p-8 card-hover border border-gray-100 dark:border-gray-700">
              <Users className="h-10 w-10 text-schoolier-teal mb-4" />
              <h3 className="text-xl font-semibold mb-3">Inclusivité</h3>
              <p className="text-muted-foreground">
                Nous célébrons la diversité et nous nous efforçons de créer un environnement d'apprentissage inclusif pour tous.
              </p>
            </Card>
            <Card className="bg-white dark:bg-gray-800 p-8 card-hover border border-gray-100 dark:border-gray-700">
              <Book className="h-10 w-10 text-schoolier-green mb-4" />
              <h3 className="text-xl font-semibold mb-3">Apprentissage continu</h3>
              <p className="text-muted-foreground">
                Nous encourageons l'apprentissage tout au long de la vie et nous nous adaptons constamment aux besoins changeants de nos utilisateurs.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 container px-6 mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Notre équipe</h2>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-3xl mx-auto">
          Des passionnés d'éducation et de technologie déterminés à transformer l'apprentissage en ligne
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: "Marie Dubois", role: "Fondatrice & CEO", image: "https://ui-avatars.com/api/?name=Marie+Dubois&background=0D9488&color=fff&size=200" },
            { name: "Thomas Martin", role: "CTO", image: "https://ui-avatars.com/api/?name=Thomas+Martin&background=0D9488&color=fff&size=200" },
            { name: "Julie Lefebvre", role: "Directrice Pédagogique", image: "https://ui-avatars.com/api/?name=Julie+Lefebvre&background=0D9488&color=fff&size=200" },
            { name: "Alexandre Petit", role: "Responsable Marketing", image: "https://ui-avatars.com/api/?name=Alexandre+Petit&background=0D9488&color=fff&size=200" }
          ].map((member, index) => (
            <Card key={index} className="overflow-hidden card-hover">
              <div className="aspect-square">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container px-6 mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Rejoignez la communauté Schoolier</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Commencez dès aujourd'hui votre parcours d'apprentissage ou partagez vos connaissances en tant qu'instructeur
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" onClick={() => navigate("/register")} className="bg-schoolier-teal hover:bg-schoolier-teal/90">
              S'inscrire gratuitement
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/contact")} className="border-schoolier-blue text-schoolier-blue hover:bg-schoolier-blue/10">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
