
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
      
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container px-6 mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contactez-nous</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Notre équipe est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 container px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Nous sommes à votre écoute</h2>
            <p className="text-muted-foreground mb-8">
              Vous avez des questions sur nos cours, notre plateforme ou vous souhaitez devenir instructeur ? 
              N'hésitez pas à nous contacter en utilisant le formulaire ou les informations ci-dessous.
            </p>

            <div className="space-y-6">
              <Card className="p-4 flex items-start space-x-4">
                <div className="bg-schoolier-blue/10 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-schoolier-blue" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground">contact@schoolier.com</p>
                </div>
              </Card>

              <Card className="p-4 flex items-start space-x-4">
                <div className="bg-schoolier-teal/10 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-schoolier-teal" />
                </div>
                <div>
                  <h3 className="font-medium">Téléphone</h3>
                  <p className="text-muted-foreground">+33 (0)1 23 45 67 89</p>
                </div>
              </Card>

              <Card className="p-4 flex items-start space-x-4">
                <div className="bg-schoolier-green/10 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-schoolier-green" />
                </div>
                <div>
                  <h3 className="font-medium">Adresse</h3>
                  <p className="text-muted-foreground">
                    123 Avenue de l'Innovation<br />
                    75001 Paris, France
                  </p>
                </div>
              </Card>

              <Card className="p-4 flex items-start space-x-4">
                <div className="bg-schoolier-blue/10 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-schoolier-blue" />
                </div>
                <div>
                  <h3 className="font-medium">Horaires de support</h3>
                  <p className="text-muted-foreground">
                    Du lundi au vendredi<br />
                    9h00 - 18h00 CET
                  </p>
                </div>
              </Card>
            </div>
          </div>

          <div>
            <Card className="p-8 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Nom complet
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="block text-sm font-medium">
                    Sujet
                  </label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un sujet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Question générale</SelectItem>
                      <SelectItem value="courses">Cours et inscriptions</SelectItem>
                      <SelectItem value="technical">Support technique</SelectItem>
                      <SelectItem value="instructor">Devenir instructeur</SelectItem>
                      <SelectItem value="billing">Facturation</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Comment pouvons-nous vous aider ?"
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container px-6 mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Questions fréquentes</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Comment puis-je m'inscrire à un cours ?",
                answer: "L'inscription à un cours est simple. Naviguez vers la page du cours qui vous intéresse, cliquez sur le bouton 'S'inscrire' ou 'Acheter maintenant', puis suivez les instructions pour créer un compte ou vous connecter si vous en avez déjà un."
              },
              {
                question: "Puis-je accéder aux cours sur mobile ?",
                answer: "Oui, notre plateforme est entièrement responsive et optimisée pour les appareils mobiles. Vous pouvez accéder à vos cours à tout moment depuis votre smartphone ou tablette via notre site web ou notre application mobile."
              },
              {
                question: "Comment devenir instructeur sur Schoolier ?",
                answer: "Pour devenir instructeur, vous devez créer un compte, puis remplir un formulaire de candidature détaillant votre expertise et les cours que vous souhaitez proposer. Notre équipe examinera votre demande et vous contactera pour les étapes suivantes."
              },
              {
                question: "Quelle est la politique de remboursement ?",
                answer: "Nous offrons une garantie de satisfaction de 30 jours. Si vous n'êtes pas satisfait d'un cours, vous pouvez demander un remboursement complet dans les 30 jours suivant l'achat, à condition de ne pas avoir complété plus de 30% du contenu du cours."
              },
              {
                question: "Les certificats sont-ils reconnus par les entreprises ?",
                answer: "Nos certificats attestent de l'acquisition de compétences spécifiques et sont appréciés par de nombreux employeurs. Bien qu'ils ne remplacent pas les diplômes académiques, ils constituent un excellent moyen de démontrer votre engagement dans l'apprentissage continu et l'acquisition de compétences professionnelles."
              }
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 container px-6 mx-auto">
        <div className="rounded-xl overflow-hidden h-[400px] shadow-lg">
          <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <p className="text-muted-foreground">Carte interactive (Google Maps ou similaire)</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
