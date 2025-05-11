
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users, TrendingUp, FileText, ChartBar, Smartphone, CalendarDays, Mail, Award, Link as LinkIcon, Headphones, Star, DollarSign, HelpCircle, MessageCircle, Calendar, Video } from "lucide-react";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Business = () => {
  // Demo request function - moved to component scope
  const requestDemo = () => {
    // This would be connected to a form or calendly in a real implementation
    alert("Merci de votre intérêt ! Un conseiller Schoolier Business vous contactera sous peu.");
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-schoolier-dark">
      <Navbar />

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-schoolier-dark p-4 border-t z-50">
        <Button onClick={requestDemo} className="w-full bg-schoolier-blue hover:bg-schoolier-dark-blue">
          <MessageCircle className="mr-2 h-4 w-4" />
          Réserver une démo gratuite
        </Button>
      </div>

      <main className="flex-grow pb-24 lg:pb-0">
        {/* 1. Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-schoolier-dark py-16 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <motion.div 
                className="flex-1 space-y-6"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Formez vos équipes, développez vos talents, 
                  <span className="text-schoolier-blue"> accélérez votre croissance.</span>
                </h1>
                <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl">
                  Schoolier Business offre une plateforme clé en main pour la montée en compétence 
                  de vos employés — à votre image, à votre rythme.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button onClick={requestDemo} size="lg" className="bg-schoolier-blue hover:bg-schoolier-dark-blue text-lg px-8">
                    Demander une démo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="border-schoolier-blue text-schoolier-blue hover:bg-schoolier-blue/10 text-lg px-8">
                    Créer un compte entreprise
                  </Button>
                </div>
              </motion.div>
              <motion.div 
                className="flex-1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src="/lovable-uploads/15fccc6e-df41-4aa0-9708-c5ef28cab8cd.png" 
                  alt="Schoolier Business Dashboard" 
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. Problems Section */}
        <section className="py-16 lg:py-24 bg-white dark:bg-schoolier-dark">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Vos équipes perdent du temps avec des formations peu adaptées ?
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Les défis courants qui freinent le développement des compétences en entreprise
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Problem Cards */}
              <ProblemCard 
                icon={<FileText className="h-10 w-10 text-schoolier-red" />}
                title="Formations génériques"
                description="Des contenus standardisés qui ne correspondent pas aux besoins spécifiques de votre secteur."
              />
              <ProblemCard 
                icon={<ChartBar className="h-10 w-10 text-schoolier-red" />}
                title="Suivi impossible"
                description="Difficulté à mesurer la progression réelle et l'engagement des employés."
              />
              <ProblemCard 
                icon={<Users className="h-10 w-10 text-schoolier-red" />}
                title="Manque d'engagement"
                description="Faible motivation due à des formats inadaptés et des contenus peu personnalisés."
              />
              <ProblemCard 
                icon={<TrendingUp className="h-10 w-10 text-schoolier-red" />}
                title="ROI incertain"
                description="Absence de données concrètes sur l'impact réel des formations sur la performance."
              />
            </motion.div>
          </div>
        </section>

        {/* 3. Solution Section */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                La solution Schoolier Business
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Une plateforme complète qui transforme la formation en entreprise
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <SolutionCard 
                icon={<FileText className="h-10 w-10 text-schoolier-teal" />}
                title="Formation sur mesure"
                description="Accès à des contenus adaptés à chaque métier et niveau de compétence, personnalisables selon vos besoins spécifiques."
              />
              <SolutionCard 
                icon={<ChartBar className="h-10 w-10 text-schoolier-teal" />}
                title="Suivi et analytique"
                description="Tableaux de bord détaillés pour suivre la progression, l'engagement et les résultats en temps réel."
              />
              <SolutionCard 
                icon={<Users className="h-10 w-10 text-schoolier-teal" />}
                title="Accès multi-profils"
                description="Interfaces dédiées pour employés, formateurs internes et managers – chaque rôle dispose de ses propres outils."
              />
              <SolutionCard 
                icon={<Smartphone className="h-10 w-10 text-schoolier-teal" />}
                title="Expérience mobile"
                description="Application responsive permettant d'apprendre n'importe où, n'importe quand, même hors connexion."
              />
            </motion.div>
          </div>
        </section>

        {/* 4. Features Section */}
        <section className="py-16 lg:py-24 bg-white dark:bg-schoolier-dark">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Fonctionnalités du programme entreprise
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Des outils puissants conçus pour les besoins spécifiques des entreprises
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                className="order-2 lg:order-1"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <img 
                  src="/lovable-uploads/15fccc6e-df41-4aa0-9708-c5ef28cab8cd.png" 
                  alt="Dashboard RH Schoolier" 
                  className="w-full h-auto rounded-xl shadow-xl"
                />
              </motion.div>

              <motion.div 
                className="space-y-6 order-1 lg:order-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <FeatureItem 
                  icon={<CalendarDays />}
                  title="Dashboard RH avec suivi par département"
                  description="Visualisez les progrès par équipe, département ou individu avec des rapports personnalisables."
                />
                <FeatureItem 
                  icon={<Mail />}
                  title="Invitations et affectation automatique"
                  description="Automatisez l'attribution des parcours de formation selon les rôles et besoins identifiés."
                />
                <FeatureItem 
                  icon={<Award />}
                  title="Certificats de complétion auditables"
                  description="Certifications vérifiables et exportables pour valoriser les compétences acquises."
                />
                <FeatureItem 
                  icon={<LinkIcon />}
                  title="API d'intégration avec vos outils"
                  description="Connectez facilement Schoolier à votre écosystème existant (Slack, Notion, MS Teams, etc)."
                />
                <FeatureItem 
                  icon={<Headphones />}
                  title="Support dédié et onboarding personnalisé"
                  description="Un conseiller dédié vous accompagne dans la mise en place et l'optimisation de votre environnement."
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. Testimonials Section */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ce que nos clients disent
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Rejoignez plus de 500 entreprises qui font confiance à Schoolier Business
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8 mb-16">
              {/* Client logos would go here */}
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 h-16 w-32 rounded flex items-center justify-center">
                  <Star className="h-8 w-8 text-schoolier-gray" />
                </div>
              ))}
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <TestimonialCard 
                quote="Grâce à Schoolier, notre onboarding a gagné 40% en efficacité et nos nouveaux collaborateurs sont opérationnels plus rapidement."
                name="Marie Dupont"
                role="DRH, TechInnovate"
              />
              <TestimonialCard 
                quote="La plateforme nous a permis de créer des parcours personnalisés pour chaque département tout en gardant une vue d'ensemble cohérente."
                name="Thomas Bernard"
                role="Responsable Formation, MediaGroup"
              />
              <TestimonialCard 
                quote="Le support client est exceptionnel. L'équipe Schoolier nous a guidés à chaque étape pour maximiser notre retour sur investissement."
                name="Sophie Martin"
                role="CEO, GrowthPartners"
              />
            </motion.div>
          </div>
        </section>

        {/* 6. Pricing Section */}
        <section className="py-16 lg:py-24 bg-white dark:bg-schoolier-dark">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Plans & Tarifs
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Des solutions adaptées à toutes les tailles d'entreprise
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8 justify-center">
              <Tabs defaultValue="monthly" className="w-full max-w-4xl mx-auto">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                  <TabsTrigger value="monthly">Mensuel</TabsTrigger>
                  <TabsTrigger value="annual">Annuel (économisez 20%)</TabsTrigger>
                </TabsList>
                
                <TabsContent value="monthly" className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <PricingCard 
                      tier="Startup"
                      price="25€"
                      period="par utilisateur / mois"
                      description="Idéal pour les petites équipes"
                      features={[
                        "Jusqu'à 25 utilisateurs",
                        "Accès à 200+ cours",
                        "Rapports basiques",
                        "Support par email"
                      ]}
                      cta="Démarrer"
                      popular={false}
                    />
                    <PricingCard 
                      tier="Business"
                      price="45€"
                      period="par utilisateur / mois"
                      description="Pour les entreprises en croissance"
                      features={[
                        "Utilisateurs illimités",
                        "Accès à tous les cours",
                        "Rapports avancés",
                        "Intégrations API",
                        "Support prioritaire"
                      ]}
                      cta="Demander une démo"
                      popular={true}
                    />
                    <PricingCard 
                      tier="Enterprise"
                      price="Sur mesure"
                      period=""
                      description="Pour les grandes organisations"
                      features={[
                        "Déploiement dédié",
                        "Contenu personnalisé",
                        "SSO & sécurité avancée",
                        "Account manager dédié",
                        "SLA garanti"
                      ]}
                      cta="Contacter les ventes"
                      popular={false}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="annual" className="w-full">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <PricingCard 
                      tier="Startup"
                      price="20€"
                      period="par utilisateur / mois"
                      description="Idéal pour les petites équipes"
                      features={[
                        "Jusqu'à 25 utilisateurs",
                        "Accès à 200+ cours",
                        "Rapports basiques",
                        "Support par email"
                      ]}
                      cta="Démarrer"
                      popular={false}
                    />
                    <PricingCard 
                      tier="Business"
                      price="36€"
                      period="par utilisateur / mois"
                      description="Pour les entreprises en croissance"
                      features={[
                        "Utilisateurs illimités",
                        "Accès à tous les cours",
                        "Rapports avancés",
                        "Intégrations API",
                        "Support prioritaire"
                      ]}
                      cta="Demander une démo"
                      popular={true}
                    />
                    <PricingCard 
                      tier="Enterprise"
                      price="Sur mesure"
                      period=""
                      description="Pour les grandes organisations"
                      features={[
                        "Déploiement dédié",
                        "Contenu personnalisé",
                        "SSO & sécurité avancée",
                        "Account manager dédié",
                        "SLA garanti"
                      ]}
                      cta="Contacter les ventes"
                      popular={false}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* 7. FAQ Section */}
        <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Questions fréquentes
              </h2>
              <p className="text-xl text-gray-700 dark:text-gray-300">
                Tout ce que vous devez savoir pour prendre votre décision
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium">
                    Puis-je intégrer mes propres contenus ?
                  </AccordionTrigger>
                  <AccordionContent>
                    Oui, Schoolier Business vous permet d'uploader vos propres contenus de formation
                    (vidéos, PDF, présentations) et de les intégrer dans des parcours personnalisés.
                    Vous pouvez également mixer vos contenus avec notre bibliothèque de cours existante.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-medium">
                    Quel est l'engagement minimal ?
                  </AccordionTrigger>
                  <AccordionContent>
                    Pour les plans Startup et Business, nous proposons des engagements mensuels ou annuels.
                    Les plans annuels bénéficient d'une réduction de 20%. Pour le plan Enterprise,
                    les conditions sont personnalisées selon vos besoins.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-medium">
                    Est-ce que mes données sont sécurisées ?
                  </AccordionTrigger>
                  <AccordionContent>
                    Absolument. Nous sommes conformes RGPD et utilisons un chiffrement de bout en bout.
                    Toutes les données sont hébergées sur des serveurs sécurisés en Europe,
                    avec des sauvegardes régulières et un plan de continuité d'activité robuste.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-medium">
                    Avez-vous un programme pour les PME ?
                  </AccordionTrigger>
                  <AccordionContent>
                    Notre plan Startup est spécifiquement conçu pour les PME et les petites équipes,
                    avec des tarifs adaptés et toutes les fonctionnalités essentielles.
                    Nous proposons également un accompagnement spécifique pour les PME.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-lg font-medium">
                    Comment fonctionne l'intégration avec nos outils existants ?
                  </AccordionTrigger>
                  <AccordionContent>
                    Schoolier Business propose des API et des connecteurs prêts à l'emploi
                    pour les principaux outils d'entreprise (Slack, MS Teams, Workday, SIRH).
                    Notre équipe technique peut également développer des connecteurs sur mesure si nécessaire.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* 8. Final CTA Section */}
        <section className="py-16 lg:py-24 bg-schoolier-blue dark:bg-schoolier-dark-blue">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Prêt à transformer la formation dans votre entreprise ?
              </h2>
              <p className="text-xl text-white/80 mb-10">
                Rejoignez les entreprises qui propulsent leurs équipes vers l'excellence avec Schoolier Business
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={requestDemo}
                  size="lg" 
                  className="bg-white text-schoolier-blue hover:bg-gray-100 text-lg px-8 shadow-lg"
                >
                  Demander une démo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white/20 text-lg px-8"
                >
                  Créer un compte entreprise
                </Button>
              </div>
              
              <div className="flex items-center justify-center mt-10 text-white/80">
                <Headphones className="h-5 w-5 mr-2" />
                <span>Sans engagement – Support prioritaire inclus</span>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Helper components
const ProblemCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow"
      variants={fadeIn}
    >
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

const SolutionCard = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
      variants={fadeIn}
    >
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  );
};

const FeatureItem = ({ icon, title, description }) => {
  return (
    <motion.div 
      className="flex gap-4"
      variants={fadeIn}
    >
      <div className="mt-1 bg-schoolier-blue/10 p-2 rounded-full">
        {React.cloneElement(icon, { className: "h-6 w-6 text-schoolier-blue" })}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

const TestimonialCard = ({ quote, name, role }) => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
      variants={fadeIn}
    >
      <div className="mb-4">
        <Star className="h-6 w-6 text-schoolier-yellow" />
        <Star className="h-6 w-6 text-schoolier-yellow inline-block" />
        <Star className="h-6 w-6 text-schoolier-yellow inline-block" />
        <Star className="h-6 w-6 text-schoolier-yellow inline-block" />
        <Star className="h-6 w-6 text-schoolier-yellow inline-block" />
      </div>
      <p className="text-gray-700 dark:text-gray-300 italic mb-6">"{quote}"</p>
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </motion.div>
  );
};

const PricingCard = ({ tier, price, period, description, features, cta, popular }) => {
  return (
    <motion.div 
      className={`rounded-lg border ${popular ? 'border-schoolier-blue scale-105' : 'border-gray-200 dark:border-gray-700'} shadow-lg overflow-hidden relative`}
      variants={fadeIn}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-schoolier-blue text-white px-3 py-1 text-sm font-medium">
          Populaire
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold">{tier}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-extrabold">{price}</span>
          {period && <span className="ml-1 text-gray-500">{period}</span>}
        </div>
        <p className="mt-2 text-gray-500">{description}</p>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-6">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center">
              <ArrowRight className="h-4 w-4 text-schoolier-teal mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          className={`w-full mt-6 ${popular ? 'bg-schoolier-blue hover:bg-schoolier-dark-blue' : ''}`}
          variant={popular ? 'default' : 'outline'}
          onClick={requestDemo}
        >
          {cta}
        </Button>
      </div>
    </motion.div>
  );
};

export default Business;
