
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, CheckCircle, Star, Book, Award, Users } from "lucide-react";
import CourseCard from "@/components/CourseCard";
import { featuredCourses, categories } from "@/data/courseData";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 py-20">
        <div className="container px-6 mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 flex flex-col items-start space-y-6 animate-fade-in">
            <h1 className="heading-1 text-schoolier-blue text-left">
              Développez vos compétences avec <span className="text-schoolier-teal">Schoolier</span>
            </h1>
            <p className="subheading text-left">
              Accédez à des milliers de cours en ligne dispensés par des experts. Apprenez à votre rythme et obtenez des certifications reconnues.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <Button size="lg" onClick={() => navigate("/courses")} className="bg-schoolier-blue hover:bg-schoolier-blue/90">
                Explorer les cours
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/register")} className="border-schoolier-teal text-schoolier-teal hover:bg-schoolier-teal/10">
                Rejoindre gratuitement
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-10 lg:mt-0 animate-fade-up">
            <img
              src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=2070&auto=format&fit=crop"
              alt="Étudiants apprenant en ligne"
              className="rounded-xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 container px-6 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Rechercher un cours, une compétence..."
              className="pl-10 py-6 text-lg"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Button className="absolute right-1 top-1/2 transform -translate-y-1/2">
              Rechercher
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-6 mx-auto">
          <h2 className="heading-2 text-center mb-8">Explorez par catégorie</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center card-hover shadow"
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

      {/* Featured Courses Section */}
      <section className="py-16 container px-6 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="heading-2">Cours populaires</h2>
          <Button variant="outline" onClick={() => navigate("/courses")}>
            Voir tous les cours
          </Button>
        </div>
        
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
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-6 mx-auto">
          <h2 className="heading-2 text-center mb-12">Pourquoi choisir Schoolier</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-md">
              <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
                <Book className="h-8 w-8 text-schoolier-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Contenu de qualité</h3>
              <p className="text-muted-foreground">
                Des cours créés par des experts reconnus dans leur domaine.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-md">
              <div className="w-16 h-16 mx-auto bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-schoolier-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Certifications</h3>
              <p className="text-muted-foreground">
                Obtenez des certificats reconnus pour valoriser vos compétences.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-md">
              <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-schoolier-green" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Apprentissage flexible</h3>
              <p className="text-muted-foreground">
                Apprenez à votre rythme, n'importe où et n'importe quand.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg text-center shadow-md">
              <div className="w-16 h-16 mx-auto bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Communauté active</h3>
              <p className="text-muted-foreground">
                Échangez avec d'autres apprenants et des instructeurs passionnés.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 container px-6 mx-auto">
        <h2 className="heading-2 text-center mb-12">Ce que nos étudiants disent</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Martin L.",
              avatar: "https://ui-avatars.com/api/?name=Martin+L&background=0D9488&color=fff",
              text: "Les cours de Schoolier ont complètement transformé ma carrière. J'ai pu acquérir les compétences dont j'avais besoin pour trouver un emploi dans le développement web.",
              role: "Développeur Front-end"
            },
            {
              name: "Sarah K.",
              avatar: "https://ui-avatars.com/api/?name=Sarah+K&background=0D9488&color=fff",
              text: "La qualité des cours est exceptionnelle. Les instructeurs expliquent les concepts complexes de manière simple et claire. Je recommande vivement Schoolier !",
              role: "Designer UI/UX"
            },
            {
              name: "David R.",
              avatar: "https://ui-avatars.com/api/?name=David+R&background=0D9488&color=fff",
              text: "J'ai pu lancer ma propre entreprise grâce aux connaissances acquises sur Schoolier. Le rapport qualité-prix est imbattable.",
              role: "Entrepreneur"
            }
          ].map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <div className="flex items-center space-x-4 mb-4">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">"{testimonial.text}"</p>
              <div className="flex mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-schoolier-blue text-white">
        <div className="container px-6 mx-auto text-center">
          <h2 className="heading-2 mb-6">Prêt à commencer votre parcours d'apprentissage ?</h2>
          <p className="subheading text-blue-100 max-w-3xl mx-auto mb-8">
            Rejoignez des milliers d'étudiants et transformez vos compétences avec Schoolier. L'inscription est gratuite !
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" onClick={() => navigate("/register")} className="bg-white text-schoolier-blue hover:bg-blue-50">
              S'inscrire gratuitement
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/courses")} className="border-white text-white hover:bg-white/10">
              Explorer les cours
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
