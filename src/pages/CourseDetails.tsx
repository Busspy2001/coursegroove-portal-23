
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import { Share2, Star, Clock, BarChart2, Users, Globe, CheckCircle, PlayCircle, FileText, MessageSquare, Award } from "lucide-react";
import { allCourses } from "@/data/courseData";
import { useAuth } from "@/contexts/AuthContext";

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  // Find the course with the matching ID
  const course = allCourses.find((c) => c.id === courseId);
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container px-6 py-12 flex-grow flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-bold mb-4">Cours non trouvé</h1>
          <p className="text-muted-foreground mb-6">
            Le cours que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Button onClick={() => navigate("/courses")}>
            Retour à la liste des cours
          </Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Mock course sections and lessons
  const courseSections = [
    {
      id: "1",
      title: "Introduction",
      duration: "45 min",
      lessons: [
        { id: "1-1", title: "Bienvenue au cours", duration: "5 min", type: "video" },
        { id: "1-2", title: "Comment utiliser ce cours", duration: "10 min", type: "video" },
        { id: "1-3", title: "Les bases à connaître", duration: "15 min", type: "video" },
        { id: "1-4", title: "Quiz d'introduction", duration: "15 min", type: "quiz" },
      ]
    },
    {
      id: "2",
      title: "Fondamentaux",
      duration: "2h 30min",
      lessons: [
        { id: "2-1", title: "Concepts fondamentaux", duration: "30 min", type: "video" },
        { id: "2-2", title: "Exercice pratique", duration: "45 min", type: "practice" },
        { id: "2-3", title: "Analyse de cas", duration: "30 min", type: "video" },
        { id: "2-4", title: "Ressources supplémentaires", duration: "15 min", type: "document" },
        { id: "2-5", title: "Quiz de mi-parcours", duration: "30 min", type: "quiz" },
      ]
    },
    {
      id: "3",
      title: "Techniques avancées",
      duration: "3h 15min",
      lessons: [
        { id: "3-1", title: "Méthodes avancées", duration: "45 min", type: "video" },
        { id: "3-2", title: "Étude de cas réels", duration: "60 min", type: "video" },
        { id: "3-3", title: "Exercice de groupe", duration: "45 min", type: "practice" },
        { id: "3-4", title: "Projet pratique", duration: "45 min", type: "practice" },
      ]
    },
    {
      id: "4",
      title: "Conclusion et certification",
      duration: "1h 30min",
      lessons: [
        { id: "4-1", title: "Résumé du cours", duration: "30 min", type: "video" },
        { id: "4-2", title: "Conseils pour continuer", duration: "15 min", type: "video" },
        { id: "4-3", title: "Examen final", duration: "45 min", type: "quiz" },
      ]
    },
  ];
  
  // Total course content
  const totalLessons = courseSections.reduce((total, section) => total + section.lessons.length, 0);
  const totalHours = courseSections.reduce((total, section) => {
    const durationMatch = section.duration.match(/(\d+)h\s*(\d+)min|(\d+)h|(\d+)\s*min/);
    let hours = 0;
    let minutes = 0;
    
    if (durationMatch) {
      if (durationMatch[1] && durationMatch[2]) {
        hours = parseInt(durationMatch[1]);
        minutes = parseInt(durationMatch[2]);
      } else if (durationMatch[3]) {
        hours = parseInt(durationMatch[3]);
      } else if (durationMatch[4]) {
        minutes = parseInt(durationMatch[4]);
      }
    }
    
    return total + hours + (minutes / 60);
  }, 0);
  
  // Mock reviews
  const reviews = [
    {
      id: "1",
      name: "Marie Dubois",
      avatar: "https://ui-avatars.com/api/?name=Marie+Dubois&background=0D9488&color=fff",
      date: "Il y a 2 semaines",
      rating: 5,
      comment: "Ce cours est exceptionnel ! Le contenu est très bien structuré et l'instructeur explique clairement chaque concept. J'ai beaucoup appris et je recommande vivement ce cours à tous ceux qui veulent se familiariser avec ce sujet."
    },
    {
      id: "2",
      name: "Thomas Bernard",
      avatar: "https://ui-avatars.com/api/?name=Thomas+Bernard&background=0D9488&color=fff",
      date: "Il y a 1 mois",
      rating: 4,
      comment: "Très bon cours avec des exemples pratiques pertinents. J'aurais aimé plus d'exercices, mais dans l'ensemble, c'est une excellente formation qui m'a permis d'améliorer mes compétences."
    },
    {
      id: "3",
      name: "Camille Martin",
      avatar: "https://ui-avatars.com/api/?name=Camille+Martin&background=0D9488&color=fff",
      date: "Il y a 3 mois",
      rating: 5,
      comment: "L'instructeur est passionné et cela se ressent dans sa façon d'enseigner. Les explications sont claires et les ressources fournies sont très utiles. Je me sens prêt à appliquer ces connaissances dans mon travail."
    },
  ];
  
  // Calculate average rating
  const averageRating = Math.round(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length * 10) / 10;
  
  // Handle enroll button click
  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour vous inscrire à ce cours.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }
    
    toast({
      title: "Félicitations !",
      description: "Vous êtes maintenant inscrit à ce cours.",
    });
    navigate("/dashboard");
  };
  
  // Handle share button click
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Lien copié",
      description: "Le lien du cours a été copié dans le presse-papiers.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container px-6 mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="flex items-center space-x-2 mb-4">
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  {course.category}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 capitalize">
                  {course.level}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              
              <p className="mb-6">{course.description}</p>
              
              <div className="flex items-center flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{averageRating.toFixed(1)}</span>
                  <span className="ml-1 text-blue-200">({reviews.length} avis)</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-1" />
                  <span>{course.students} étudiants</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-1" />
                  <span>{course.duration}</span>
                </div>
                
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-1" />
                  <span>Français</span>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <img
                  src={course.instructorAvatar || `https://ui-avatars.com/api/?name=${course.instructor.replace(" ", "+")}&background=0D9488&color=fff`}
                  alt={course.instructor}
                  className="h-10 w-10 rounded-full mr-3"
                />
                <span>Créé par <strong>{course.instructor}</strong></span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                <span>Dernière mise à jour : il y a 2 semaines</span>
              </div>
            </div>
            
            <div className="lg:w-1/3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Button variant="outline" className="text-white border-white hover:bg-white/20">
                      <PlayCircle className="mr-2 h-5 w-5" />
                      Aperçu du cours
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-6">
                    <div className="text-3xl font-bold">
                      {course.price === 0 ? "Gratuit" : `${course.price.toFixed(2)} €`}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <Button className="w-full text-lg py-6" onClick={handleEnroll}>
                      {course.price === 0 ? "S'inscrire gratuitement" : "Acheter maintenant"}
                    </Button>
                    
                    <Button variant="outline" className="w-full" onClick={handleShare}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Partager
                    </Button>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <h3 className="font-semibold">Ce cours inclut :</h3>
                    
                    <div className="flex items-start">
                      <PlayCircle className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <span className="font-medium">{totalHours.toFixed(1)} heures</span> de vidéo
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <FileText className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <span className="font-medium">15</span> ressources téléchargeables
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>Accès à vie</div>
                    </div>
                    
                    <div className="flex items-start">
                      <MessageSquare className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>Support de l'instructeur</div>
                    </div>
                    
                    <div className="flex items-start">
                      <Award className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>Certificat d'achèvement</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="container px-6 py-12 mx-auto">
        <Tabs defaultValue="curriculum" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="curriculum">Programme</TabsTrigger>
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="reviews">Avis ({reviews.length})</TabsTrigger>
            <TabsTrigger value="instructor">Instructeur</TabsTrigger>
          </TabsList>
          
          <TabsContent value="curriculum">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Contenu du cours</h2>
                <div className="flex items-center text-muted-foreground mb-6">
                  <div className="mr-6">{courseSections.length} sections</div>
                  <div className="mr-6">{totalLessons} leçons</div>
                  <div>{totalHours.toFixed(1)} heures au total</div>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {courseSections.map((section) => (
                    <AccordionItem key={section.id} value={section.id}>
                      <AccordionTrigger className="py-4">
                        <div className="flex flex-col md:flex-row md:items-center w-full text-left">
                          <div className="font-medium">{section.title}</div>
                          <div className="md:ml-auto text-sm text-muted-foreground">
                            {section.lessons.length} leçons • {section.duration}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          {section.lessons.map((lesson) => (
                            <li key={lesson.id} className="py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">
                              <div className="flex items-start">
                                {lesson.type === "video" && (
                                  <PlayCircle className="h-5 w-5 mr-3 mt-0.5 text-schoolier-blue" />
                                )}
                                {lesson.type === "quiz" && (
                                  <BarChart2 className="h-5 w-5 mr-3 mt-0.5 text-schoolier-teal" />
                                )}
                                {lesson.type === "document" && (
                                  <FileText className="h-5 w-5 mr-3 mt-0.5 text-orange-500" />
                                )}
                                {lesson.type === "practice" && (
                                  <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-green-500" />
                                )}
                                <div className="flex-grow">
                                  <div className="font-medium">{lesson.title}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {lesson.duration}
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" className="ml-auto">
                                  Aperçu
                                </Button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="overview">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Ce que vous allez apprendre</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                  {[
                    "Maîtriser les concepts fondamentaux du sujet",
                    "Appliquer des techniques avancées dans des cas réels",
                    "Développer des compétences pratiques valorisées par les employeurs",
                    "Résoudre des problèmes complexes avec confiance",
                    "Créer des projets professionnels de A à Z",
                    "Optimiser vos méthodes de travail et votre productivité",
                    "Collaborer efficacement en équipe sur des projets",
                    "Rester à jour avec les dernières tendances du secteur"
                  ].map((item, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-schoolier-green" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Description</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Ce cours complet vous guidera à travers tous les aspects essentiels de {course.title}. Que vous soyez débutant ou que vous ayez déjà des connaissances sur le sujet, vous trouverez ici un contenu adapté à votre niveau.
                  </p>
                  <p>
                    Chaque leçon est conçue pour être pratique et applicable immédiatement. Vous ne vous contenterez pas de théorie, mais vous mettrez en pratique vos nouvelles compétences à travers des exercices et des projets réels.
                  </p>
                  <p>
                    L'instructeur, {course.instructor}, possède une vaste expérience dans ce domaine et partage non seulement ses connaissances, mais aussi des astuces et bonnes pratiques issues de son expérience professionnelle.
                  </p>
                  <h3>Pourquoi ce cours est différent</h3>
                  <ul>
                    <li>Contenu constamment mis à jour pour refléter les dernières tendances</li>
                    <li>Approche pédagogique basée sur la pratique et des cas réels</li>
                    <li>Support personnalisé de l'instructeur</li>
                    <li>Communauté active d'apprenants pour échanger et collaborer</li>
                  </ul>
                  <p>
                    À la fin de ce cours, vous aurez acquis non seulement des connaissances théoriques solides, mais aussi la confiance nécessaire pour appliquer ces compétences dans votre carrière ou vos projets personnels.
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Prérequis</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-schoolier-teal" />
                    <span>Aucune connaissance préalable n'est nécessaire pour les débutants</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-schoolier-teal" />
                    <span>Connaissances de base en informatique recommandées</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-schoolier-teal" />
                    <span>Enthousiasme et motivation pour apprendre</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-4">Pour qui est ce cours</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-schoolier-blue" />
                    <span>Débutants souhaitant acquérir de nouvelles compétences</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-schoolier-blue" />
                    <span>Professionnels cherchant à se perfectionner</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-schoolier-blue" />
                    <span>Entrepreneurs et indépendants voulant élargir leurs compétences</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-3 mt-0.5 text-schoolier-blue" />
                    <span>Étudiants cherchant à compléter leur formation académique</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Avis des étudiants</h2>
                
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="md:w-1/3">
                    <div className="text-center">
                      <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                      <div className="flex justify-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= Math.round(averageRating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-muted-foreground">Note du cours</div>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3">
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = reviews.filter(r => r.rating === rating).length;
                        const percentage = (count / reviews.length) * 100;
                        
                        return (
                          <div key={rating} className="flex items-center">
                            <div className="w-20 text-sm flex items-center">
                              {rating} <Star className="h-3 w-3 ml-1 fill-yellow-400 text-yellow-400" />
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-400 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="w-16 text-right text-sm text-muted-foreground">
                              {percentage.toFixed(0)}%
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6">
                      <div className="flex items-start">
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="h-10 w-10 rounded-full mr-4"
                        />
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:items-center">
                            <h4 className="font-semibold">{review.name}</h4>
                            <span className="text-muted-foreground text-sm sm:ml-auto">
                              {review.date}
                            </span>
                          </div>
                          <div className="flex mt-1 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="instructor">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <img
                    src={course.instructorAvatar || `https://ui-avatars.com/api/?name=${course.instructor.replace(" ", "+")}&background=0D9488&color=fff&size=200`}
                    alt={course.instructor}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                
                <div className="md:w-3/4">
                  <h2 className="text-2xl font-semibold mb-2">{course.instructor}</h2>
                  <p className="text-muted-foreground mb-4">Expert en {course.category}</p>
                  
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>4.8 Note moyenne</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 mr-1" />
                      <span>5,842 Étudiants</span>
                    </div>
                    <div className="flex items-center">
                      <PlayCircle className="h-5 w-5 mr-1" />
                      <span>8 Cours</span>
                    </div>
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      {course.instructor} est un expert reconnu dans le domaine de {course.category} avec plus de 10 ans d'expérience professionnelle. Passionné par l'enseignement, il a formé des milliers d'étudiants à travers le monde.
                    </p>
                    <p>
                      Après avoir obtenu son diplôme à l'Université de Paris, il a travaillé pour plusieurs entreprises de renom avant de se consacrer à plein temps à la formation en ligne. Sa méthode pédagogique unique combine théorie solide et applications pratiques.
                    </p>
                    <p>
                      Ses cours se distinguent par leur clarté, leur structure et leur approche axée sur la pratique. {course.instructor} est reconnu pour sa capacité à expliquer des concepts complexes de manière simple et accessible à tous les niveaux.
                    </p>
                    <p>
                      En dehors de l'enseignement, il est consultant pour plusieurs startups et continue à se former constamment pour rester à la pointe des dernières innovations dans son domaine.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Related Courses */}
      <div className="bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container px-6 mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Cours similaires</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCourses
              .filter(c => c.id !== course.id && c.category === course.category)
              .slice(0, 3)
              .map((relatedCourse) => (
                <CourseCard key={relatedCourse.id} course={relatedCourse} />
              ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseDetails;
