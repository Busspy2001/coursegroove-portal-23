
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, CheckCircle, Star, Book, Award, Users, 
  Clock, Shield, Sparkles, GraduationCap, BarChart
} from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { featuredCourses, categories } from "@/data/courseData";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section - More impactful with stronger copywriting */}
      <section className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 py-20">
        <div className="container px-6 mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 flex flex-col items-start space-y-6 animate-fade-in">
            <Badge className="bg-schoolier-teal/20 text-schoolier-teal border-none px-3 py-1.5 text-sm font-medium mb-2">
              <Sparkles className="w-4 h-4 mr-1" /> Formation en ligne
            </Badge>
            <h1 className="heading-1 text-schoolier-blue text-left">
              Transformez vos <span className="text-schoolier-teal">ambitions</span> en compétences 🚀
            </h1>
            <p className="subheading text-left">
              Apprenez auprès d'experts et développez votre carrière avec des formations de qualité, 
              accessibles à tout moment, n'importe où.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <Button size="lg" onClick={() => navigate("/register")} className="bg-schoolier-teal hover:bg-schoolier-teal/90">
                Commencer gratuitement
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/courses")} className="border-schoolier-blue text-schoolier-blue hover:bg-schoolier-blue/10">
                Explorer les cours
              </Button>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400 mt-2">
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 text-schoolier-green mr-1" />
                +10 000 étudiants
              </span>
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 text-schoolier-green mr-1" />
                98% satisfaction
              </span>
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 text-schoolier-green mr-1" />
                Garantie 30j
              </span>
            </div>
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0 animate-fade-up">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=2070&auto=format&fit=crop"
                alt="Étudiants apprenant en ligne"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-5 -left-5 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 flex items-center space-x-3">
                <div className="bg-schoolier-blue/10 rounded-full p-2">
                  <GraduationCap className="h-6 w-6 text-schoolier-blue" />
                </div>
                <div>
                  <p className="text-sm font-semibold">+1500 cours</p>
                  <p className="text-xs text-muted-foreground">Par des experts certifiés</p>
                </div>
              </div>
              <div className="absolute -top-5 -right-5 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 flex items-center space-x-3">
                <div className="bg-schoolier-teal/10 rounded-full p-2">
                  <Award className="h-6 w-6 text-schoolier-teal" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Certifications</p>
                  <p className="text-xs text-muted-foreground">Reconnues par l'industrie</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Search Section */}
      <section className="py-16 container px-6 mx-auto -mt-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-center">Trouvez votre prochaine formation 🔎</h2>
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="Que souhaitez-vous apprendre aujourd'hui ?"
              className="pl-10 py-6 text-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-schoolier-blue hover:bg-schoolier-blue/90">
              Rechercher
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge variant="outline" className="cursor-pointer hover:bg-schoolier-blue/10">Développement web</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-schoolier-blue/10">Intelligence artificielle</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-schoolier-blue/10">Marketing digital</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-schoolier-blue/10">UX/UI Design</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-schoolier-blue/10">Data Science</Badge>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16 container px-6 mx-auto">
        <h2 className="heading-2 text-center mb-4">Pourquoi choisir Schoolier</h2>
        <p className="subheading text-center mb-12 max-w-3xl mx-auto">
          Notre plateforme unique vous offre tous les outils pour réussir votre parcours d'apprentissage
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center card-hover border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-schoolier-blue" />
            </div>
            <h3 className="text-xl font-semibold mb-2">🎓 Apprentissage flexible</h3>
            <p className="text-muted-foreground">
              Suivez vos cours à votre rythme, où que vous soyez et quand vous le souhaitez.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center card-hover border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 mx-auto bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-schoolier-teal" />
            </div>
            <h3 className="text-xl font-semibold mb-2">🏅 Certifications reconnues</h3>
            <p className="text-muted-foreground">
              Boostez votre CV avec des certifications reconnues par les entreprises du secteur.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center card-hover border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-schoolier-green" />
            </div>
            <h3 className="text-xl font-semibold mb-2">👩‍🏫 Formateurs experts</h3>
            <p className="text-muted-foreground">
              Apprenez avec les meilleurs professionnels du secteur et bénéficiez de leur expérience.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section - Improved visual design */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-6 mx-auto">
          <h2 className="heading-2 text-center mb-4">Explorez par catégorie</h2>
          <p className="subheading text-center mb-12 max-w-3xl mx-auto">
            Des formations adaptées à tous les domaines et tous les niveaux
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center card-hover shadow border border-gray-100 dark:border-gray-700 cursor-pointer"
                onClick={() => navigate("/courses")}
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {category.coursesCount} cours
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses Section - Enhanced with more compelling copy */}
      <section className="py-16 container px-6 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="heading-2">Nos cours les plus demandés 🔥</h2>
          <Button variant="outline" onClick={() => navigate("/courses")} className="border-schoolier-teal text-schoolier-teal hover:bg-schoolier-teal/10">
            Voir tous les cours
          </Button>
        </div>
        
        <p className="subheading mb-8">
          Rejoignez des milliers d'étudiants qui montrent en compétences aujourd'hui
        </p>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="development">Développement</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="design">Design</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        <div className="mt-12 flex justify-center">
          <Button size="lg" onClick={() => navigate("/courses")} className="bg-schoolier-blue hover:bg-schoolier-blue/90">
            Découvrir tous les cours
          </Button>
        </div>
      </section>

      {/* Testimonials Section - More visually appealing */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-6 mx-auto">
          <h2 className="heading-2 text-center mb-4">Ce que nos étudiants disent</h2>
          <p className="subheading text-center mb-12 max-w-3xl mx-auto">
            Des milliers d'étudiants font confiance à Schoolier pour développer leurs compétences
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
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
            ].map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 relative">
                <div className="absolute -top-5 -right-2">
                  <div className="bg-schoolier-teal text-white rounded-full w-10 h-10 flex items-center justify-center">
                    "
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-6">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-16 h-16 rounded-full border-4 border-schoolier-teal/20" />
                  <div>
                    <h4 className="font-bold text-lg">{testimonial.name}</h4>
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
            <div className="text-center">
              <h3 className="text-4xl font-bold text-schoolier-teal mb-2">98%</h3>
              <p className="text-muted-foreground">Satisfaction étudiants</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-schoolier-teal mb-2">10,000+</h3>
              <p className="text-muted-foreground">Étudiants actifs</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-schoolier-teal mb-2">1,500+</h3>
              <p className="text-muted-foreground">Cours disponibles</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold text-schoolier-teal mb-2">200+</h3>
              <p className="text-muted-foreground">Instructeurs experts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="py-16 container px-6 mx-auto">
        <div className="bg-schoolier-blue/10 rounded-2xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <img 
                src="https://images.unsplash.com/photo-1544531585-9847b68c8c86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Instructeur Schoolier" 
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-12">
              <Badge className="bg-schoolier-teal/20 text-schoolier-teal border-none px-3 py-1.5 text-sm font-medium mb-4">
                Pour les experts
              </Badge>
              <h2 className="text-3xl font-bold text-schoolier-blue mb-4">Monétisez votre savoir 📈</h2>
              <p className="text-lg mb-6">
                Rejoignez notre communauté d'experts et gagnez de l'argent en partageant vos connaissances avec des milliers d'étudiants passionnés.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-schoolier-green mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-semibold">Créez à votre façon</h4>
                    <p className="text-muted-foreground">Développez des cours avec notre plateforme intuitive</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-schoolier-green mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-semibold">Une audience mondiale</h4>
                    <p className="text-muted-foreground">Touchez des milliers d'étudiants du monde entier</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-schoolier-green mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-semibold">Revenus attractifs</h4>
                    <p className="text-muted-foreground">Jusqu'à 70% de commission sur chaque vente</p>
                  </div>
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={() => navigate("/become-instructor")}
                className="bg-schoolier-blue hover:bg-schoolier-blue/90"
              >
                Devenir Instructeur
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-6 mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Inscrivez-vous l'esprit tranquille ✅</h2>
            <p className="text-muted-foreground mb-8">
              Nous sommes confiants dans la qualité de nos formations et nous nous engageons à vous offrir la meilleure expérience d'apprentissage.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-schoolier-blue" />
                </div>
                <h3 className="font-semibold mb-2">Garantie 30 jours</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Satisfait ou remboursé pendant 30 jours après votre achat
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
                  <BarChart className="h-8 w-8 text-schoolier-teal" />
                </div>
                <h3 className="font-semibold mb-2">Accès à vie</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Accédez à vos cours sans limite de temps et à toutes les mises à jour
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-schoolier-green" />
                </div>
                <h3 className="font-semibold mb-2">Support réactif</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Notre équipe est disponible 7j/7 pour répondre à vos questions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-schoolier-blue text-white">
        <div className="container px-6 mx-auto text-center">
          <h2 className="heading-2 mb-6">Prêt à transformer vos ambitions en compétences ?</h2>
          <p className="subheading text-blue-100 max-w-3xl mx-auto mb-8">
            Rejoignez des milliers d'étudiants et commencez votre parcours d'apprentissage dès aujourd'hui avec Schoolier. L'inscription est gratuite !
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" onClick={() => navigate("/register")} className="bg-white text-schoolier-blue hover:bg-blue-50">
              S'inscrire gratuitement
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/courses")} className="border-white text-white hover:bg-white/10">
              Explorer les cours
            </Button>
          </div>
          <p className="mt-6 text-sm text-blue-100">
            Déjà plus de 10 000 étudiants nous font confiance. Rejoignez-les maintenant !
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
