
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import InstructorSidebar from "@/components/instructor/InstructorSidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Facebook, Globe, Instagram, Linkedin, Loader2, Twitter, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialLinkProps {
  platform: string;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const SocialLink = ({ platform, icon, placeholder, value, onChange }: SocialLinkProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <Label htmlFor={platform}>{platform}</Label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
          {icon}
        </div>
        <Input
          id={platform}
          placeholder={placeholder}
          className="pl-10"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

const InstructorSettings = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  
  // Form states for profile
  const [avatar, setAvatar] = React.useState<string>(currentUser?.avatar || "");
  const [name, setName] = React.useState<string>(currentUser?.name || "");
  const [email, setEmail] = React.useState<string>(currentUser?.email || "");
  const [bio, setBio] = React.useState<string>("Enseignant passionné avec plus de 10 ans d'expérience dans le développement web. Spécialiste JavaScript et technologies modernes.");
  const [expertise, setExpertise] = React.useState<string>("JavaScript, React, Node.js, Web Development");
  const [website, setWebsite] = React.useState<string>("https://example.com");
  
  // Form states for socials
  const [facebook, setFacebook] = React.useState<string>("https://facebook.com/username");
  const [twitter, setTwitter] = React.useState<string>("https://twitter.com/username");
  const [linkedin, setLinkedin] = React.useState<string>("https://linkedin.com/in/username");
  const [instagram, setInstagram] = React.useState<string>("https://instagram.com/username");
  
  // Form states for payments
  const [paymentMethod, setPaymentMethod] = React.useState<string>("bank_transfer");
  const [bankName, setBankName] = React.useState<string>("BNP Paribas");
  const [accountName, setAccountName] = React.useState<string>("Jean Dupont");
  const [iban, setIban] = React.useState<string>("FR76 3000 1234 5678 9101 1121 314");
  const [bic, setBic] = React.useState<string>("BNPAFRPPXXX");
  
  // Form states for notifications
  const [emailNewSale, setEmailNewSale] = React.useState<boolean>(true);
  const [emailNewReview, setEmailNewReview] = React.useState<boolean>(true);
  const [emailNewStudent, setEmailNewStudent] = React.useState<boolean>(true);
  const [emailPayment, setEmailPayment] = React.useState<boolean>(true);
  const [emailMarketing, setEmailMarketing] = React.useState<boolean>(false);
  const [pushNewSale, setPushNewSale] = React.useState<boolean>(true);
  const [pushNewReview, setPushNewReview] = React.useState<boolean>(true);
  const [pushNewStudent, setPushNewStudent] = React.useState<boolean>(false);
  const [pushPayment, setPushPayment] = React.useState<boolean>(true);
  
  // Form states for languages
  const [language, setLanguage] = React.useState<string>("fr");
  const [subtitlesOption, setSubtitlesOption] = React.useState<string>("auto");
  
  // Form states for privacy
  const [showProfileCard, setShowProfileCard] = React.useState<boolean>(true);
  const [showSocialLinks, setShowSocialLinks] = React.useState<boolean>(true);
  const [allowDirectMessages, setAllowDirectMessages] = React.useState<boolean>(true);
  const [showCoursesCount, setShowCoursesCount] = React.useState<boolean>(true);
  const [showStudentsCount, setShowStudentsCount] = React.useState<boolean>(false);
  const [publicProfile, setPublicProfile] = React.useState<boolean>(true);

  // Rediriger si pas authentifié ou pas un instructeur
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (currentUser?.role !== "instructor") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentUser, navigate]);

  if (!isAuthenticated || currentUser?.role !== "instructor") {
    return null;
  }

  // Function to handle avatar upload
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload the file to a server and get the URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    
    try {
      // In a real app, send the data to the server
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSavePayment = async () => {
    setSaving(true);
    
    try {
      // In a real app, send the data to the server
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Coordonnées bancaires mises à jour",
        description: "Vos informations de paiement ont été enregistrées.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    setSaving(true);
    
    try {
      // In a real app, send the data to the server
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Préférences de notifications mises à jour",
        description: "Vos préférences ont été enregistrées.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveLanguage = async () => {
    setSaving(true);
    
    try {
      // In a real app, send the data to the server
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Préférences linguistiques mises à jour",
        description: "Vos préférences ont été enregistrées.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSavePrivacy = async () => {
    setSaving(true);
    
    try {
      // In a real app, send the data to the server
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Préférences de confidentialité mises à jour",
        description: "Vos préférences ont été enregistrées.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la sauvegarde.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
            <p className="text-muted-foreground">Chargement de vos paramètres...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <InstructorSidebar />
        
        <SidebarInset>
          <Navbar />
          
          <div className="container px-6 py-8 flex-grow">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Paramètres du profil</h1>
              <p className="text-muted-foreground">
                Gérez votre profil, vos paiements et vos préférences
              </p>
            </div>
            
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="w-full md:w-auto grid grid-cols-2 md:flex md:flex-row gap-1">
                <TabsTrigger value="profile">Profil</TabsTrigger>
                <TabsTrigger value="payment">Paiements</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="language">Langue</TabsTrigger>
                <TabsTrigger value="privacy">Confidentialité</TabsTrigger>
                <TabsTrigger value="security">Sécurité</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                  <Card className="lg:col-span-3">
                    <CardHeader>
                      <CardTitle>Informations personnelles</CardTitle>
                      <CardDescription>
                        Mettez à jour vos informations personnelles et votre profil d'instructeur
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                          <Label htmlFor="avatar">Photo de profil</Label>
                          <div className="flex items-center gap-6">
                            <Avatar className="h-20 w-20">
                              <AvatarImage src={avatar} alt={name} />
                              <AvatarFallback className="bg-schoolier-teal text-white text-xl">
                                {name?.charAt(0) || "I"}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <Label 
                                htmlFor="avatar-upload" 
                                className="inline-flex items-center px-4 py-2 bg-schoolier-blue text-white rounded-md hover:bg-schoolier-blue/90 cursor-pointer"
                              >
                                <Upload className="mr-2 h-4 w-4" />
                                Changer la photo
                              </Label>
                              <Input 
                                id="avatar-upload" 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={handleAvatarUpload}
                              />
                              <p className="text-sm text-muted-foreground mt-2">
                                JPG ou PNG. 1MB maximum.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Nom complet</Label>
                            <Input 
                              id="name" 
                              value={name} 
                              onChange={(e) => setName(e.target.value)} 
                            />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                              id="email" 
                              type="email" 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)} 
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="bio">Biographie</Label>
                          <Textarea 
                            id="bio" 
                            rows={5}
                            value={bio} 
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Parlez de votre parcours, votre expérience et votre approche pédagogique..." 
                          />
                          <p className="text-sm text-muted-foreground">
                            Cette biographie sera affichée sur votre page d'instructeur.
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="expertise">Expertise (séparées par des virgules)</Label>
                          <Input 
                            id="expertise" 
                            value={expertise} 
                            onChange={(e) => setExpertise(e.target.value)}
                            placeholder="ex: JavaScript, React, Design UX/UI" 
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="website">Site web</Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                              <Globe className="h-4 w-4" />
                            </div>
                            <Input 
                              id="website" 
                              className="pl-10"
                              value={website} 
                              onChange={(e) => setWebsite(e.target.value)}
                              placeholder="https://votre-site.com" 
                            />
                          </div>
                        </div>
                        <Button 
                          onClick={handleSaveProfile}
                          disabled={saving}
                          className="w-full md:w-auto ml-auto"
                        >
                          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Enregistrer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle>Liens sociaux</CardTitle>
                      <CardDescription>
                        Connectez vos réseaux sociaux à votre profil d'instructeur
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-6">
                        <SocialLink
                          platform="Facebook"
                          icon={<Facebook className="h-4 w-4" />}
                          placeholder="https://facebook.com/username"
                          value={facebook}
                          onChange={setFacebook}
                        />
                        <SocialLink
                          platform="Twitter"
                          icon={<Twitter className="h-4 w-4" />}
                          placeholder="https://twitter.com/username"
                          value={twitter}
                          onChange={setTwitter}
                        />
                        <SocialLink
                          platform="LinkedIn"
                          icon={<Linkedin className="h-4 w-4" />}
                          placeholder="https://linkedin.com/in/username"
                          value={linkedin}
                          onChange={setLinkedin}
                        />
                        <SocialLink
                          platform="Instagram"
                          icon={<Instagram className="h-4 w-4" />}
                          placeholder="https://instagram.com/username"
                          value={instagram}
                          onChange={setInstagram}
                        />
                        <Button 
                          onClick={handleSaveProfile}
                          disabled={saving}
                          className="w-full md:w-auto ml-auto"
                        >
                          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Enregistrer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="payment" className="mt-6">
                <div className="grid grid-cols-1 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Méthode de paiement</CardTitle>
                      <CardDescription>
                        Comment souhaitez-vous recevoir vos revenus?
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                          <Label htmlFor="payment-method">Méthode de paiement</Label>
                          <Select
                            value={paymentMethod}
                            onValueChange={setPaymentMethod}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Choisir une méthode de paiement" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bank_transfer">Virement bancaire</SelectItem>
                              <SelectItem value="paypal">PayPal</SelectItem>
                              <SelectItem value="stripe">Stripe</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {paymentMethod === "bank_transfer" && (
                          <div className="border rounded-lg p-6 bg-gray-50 space-y-6">
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="bank-name">Nom de la banque</Label>
                              <Input 
                                id="bank-name" 
                                value={bankName} 
                                onChange={(e) => setBankName(e.target.value)} 
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="account-name">Nom du titulaire</Label>
                              <Input 
                                id="account-name" 
                                value={accountName} 
                                onChange={(e) => setAccountName(e.target.value)} 
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="iban">IBAN</Label>
                              <Input 
                                id="iban" 
                                value={iban} 
                                onChange={(e) => setIban(e.target.value)} 
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="bic">BIC / SWIFT</Label>
                              <Input 
                                id="bic" 
                                value={bic} 
                                onChange={(e) => setBic(e.target.value)} 
                              />
                            </div>
                          </div>
                        )}

                        {paymentMethod === "paypal" && (
                          <div className="border rounded-lg p-6 bg-gray-50 space-y-6">
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="paypal-email">Email PayPal</Label>
                              <Input 
                                id="paypal-email" 
                                type="email"
                                placeholder="votre-email@example.com" 
                              />
                            </div>
                          </div>
                        )}

                        {paymentMethod === "stripe" && (
                          <div className="border rounded-lg p-6 bg-gray-50 space-y-6">
                            <div className="flex flex-col gap-2">
                              <Label htmlFor="stripe-account">ID du compte Stripe</Label>
                              <Input 
                                id="stripe-account" 
                                placeholder="acct_..." 
                              />
                            </div>
                            <Button variant="outline">
                              Connecter un compte Stripe
                            </Button>
                          </div>
                        )}
                        
                        <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
                          <div className="text-blue-500 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
                          </div>
                          <div className="text-sm text-blue-700">
                            <p className="font-medium">Paiements mensuels</p>
                            <p>Les paiements sont effectués le 10 de chaque mois pour les revenus du mois précédent, dès que votre solde atteint 50 €.</p>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={handleSavePayment}
                          disabled={saving}
                          className="w-full md:w-auto ml-auto"
                        >
                          {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          Enregistrer
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Historique des paiements</CardTitle>
                      <CardDescription>
                        Consultez vos derniers paiements reçus
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="rounded-md border overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Méthode</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">10/04/2025</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">1019.60 €</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">Virement bancaire</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Payé</span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">10/03/2025</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">927.00 €</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">Virement bancaire</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Payé</span>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">10/02/2025</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">745.76 €</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">Virement bancaire</td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Payé</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Préférences de notification</CardTitle>
                    <CardDescription>
                      Choisissez comment vous souhaitez être informé des activités liées à vos cours
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-6">
                      <div>
                        <h3 className="text-lg font-medium">Notifications par email</h3>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="email-new-sale" className="font-medium">Nouvelles ventes</Label>
                              <p className="text-sm text-muted-foreground">
                                Recevez un email à chaque nouvelle vente de cours
                              </p>
                            </div>
                            <Switch
                              id="email-new-sale"
                              checked={emailNewSale}
                              onCheckedChange={setEmailNewSale}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="email-new-review" className="font-medium">Nouveaux avis</Label>
                              <p className="text-sm text-muted-foreground">
                                Recevez un email lorsqu'un étudiant laisse un avis
                              </p>
                            </div>
                            <Switch
                              id="email-new-review"
                              checked={emailNewReview}
                              onCheckedChange={setEmailNewReview}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="email-new-student" className="font-medium">Nouveaux étudiants</Label>
                              <p className="text-sm text-muted-foreground">
                                Recevez un email à chaque inscription à vos cours
                              </p>
                            </div>
                            <Switch
                              id="email-new-student"
                              checked={emailNewStudent}
                              onCheckedChange={setEmailNewStudent}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="email-payment" className="font-medium">Paiements</Label>
                              <p className="text-sm text-muted-foreground">
                                Recevez un email pour chaque paiement reçu
                              </p>
                            </div>
                            <Switch
                              id="email-payment"
                              checked={emailPayment}
                              onCheckedChange={setEmailPayment}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="email-marketing" className="font-medium">Marketing</Label>
                              <p className="text-sm text-muted-foreground">
                                Recevez des conseils marketing et promotionnels
                              </p>
                            </div>
                            <Switch
                              id="email-marketing"
                              checked={emailMarketing}
                              onCheckedChange={setEmailMarketing}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Notifications push</h3>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="push-new-sale" className="font-medium">Nouvelles ventes</Label>
                              <p className="text-sm text-muted-foreground">
                                Recevez une notification à chaque nouvelle vente
                              </p>
                            </div>
                            <Switch
                              id="push-new-sale"
                              checked={pushNewSale}
                              onCheckedChange={setPushNewSale}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="push-new-review" className="font-medium">Nouveaux avis</Label>
                              <p className="text-sm text-muted-foreground">
                                Recevez une notification pour les nouveaux avis
                              </p>
                            </div>
                            <Switch
                              id="push-new-review"
                              checked={pushNewReview}
                              onCheckedChange={setPushNewReview}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="push-new-student" className="font-medium">Nouveaux étudiants</Label>
                              <p className="text-sm text-muted-foreground">
                                Recevez une notification pour les nouvelles inscriptions
                              </p>
                            </div>
                            <Switch
                              id="push-new-student"
                              checked={pushNewStudent}
                              onCheckedChange={setPushNewStudent}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="push-payment" className="font-medium">Paiements</Label>
                              <p className="text-sm text-muted-foreground">
                                Recevez une notification pour chaque paiement
                              </p>
                            </div>
                            <Switch
                              id="push-payment"
                              checked={pushPayment}
                              onCheckedChange={setPushPayment}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleSaveNotifications}
                        disabled={saving}
                        className="w-full md:w-auto ml-auto"
                      >
                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Enregistrer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="language" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Préférences linguistiques</CardTitle>
                    <CardDescription>
                      Gérez la langue de l'interface et les options de sous-titres
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="interface-language">Langue de l'interface</Label>
                        <Select
                          value={language}
                          onValueChange={setLanguage}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir une langue" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="subtitles">Options de sous-titres</Label>
                        <Select
                          value={subtitlesOption}
                          onValueChange={setSubtitlesOption}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Option de sous-titres" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Afficher automatiquement</SelectItem>
                            <SelectItem value="always">Toujours afficher</SelectItem>
                            <SelectItem value="never">Jamais afficher</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-sm text-muted-foreground">
                          Cette option s'applique à votre expérience en tant qu'étudiant sur la plateforme.
                        </p>
                      </div>
                      
                      <Button 
                        onClick={handleSaveLanguage}
                        disabled={saving}
                        className="w-full md:w-auto ml-auto"
                      >
                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Enregistrer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="privacy" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Paramètres de confidentialité</CardTitle>
                    <CardDescription>
                      Gérez ce que les autres peuvent voir de votre profil
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-6">
                      <div>
                        <h3 className="text-lg font-medium">Visibilité du profil</h3>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="public-profile" className="font-medium">Profil public</Label>
                              <p className="text-sm text-muted-foreground">
                                Rendre votre profil visible par tous les utilisateurs
                              </p>
                            </div>
                            <Switch
                              id="public-profile"
                              checked={publicProfile}
                              onCheckedChange={setPublicProfile}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="show-profile-card" className="font-medium">Afficher la carte de profil</Label>
                              <p className="text-sm text-muted-foreground">
                                Afficher votre carte de profil sur la page des cours
                              </p>
                            </div>
                            <Switch
                              id="show-profile-card"
                              checked={showProfileCard}
                              onCheckedChange={setShowProfileCard}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="show-social-links" className="font-medium">Afficher les réseaux sociaux</Label>
                              <p className="text-sm text-muted-foreground">
                                Afficher vos liens sociaux sur votre profil public
                              </p>
                            </div>
                            <Switch
                              id="show-social-links"
                              checked={showSocialLinks}
                              onCheckedChange={setShowSocialLinks}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Communications</h3>
                        <Separator className="my-4" />
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="allow-direct-messages" className="font-medium">Messages directs</Label>
                            <p className="text-sm text-muted-foreground">
                              Autoriser les étudiants à vous contacter directement
                            </p>
                          </div>
                          <Switch
                            id="allow-direct-messages"
                            checked={allowDirectMessages}
                            onCheckedChange={setAllowDirectMessages}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Statistiques visibles</h3>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="show-courses-count" className="font-medium">Nombre de cours</Label>
                              <p className="text-sm text-muted-foreground">
                                Afficher le nombre total de cours que vous proposez
                              </p>
                            </div>
                            <Switch
                              id="show-courses-count"
                              checked={showCoursesCount}
                              onCheckedChange={setShowCoursesCount}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor="show-students-count" className="font-medium">Nombre d'étudiants</Label>
                              <p className="text-sm text-muted-foreground">
                                Afficher le nombre total d'étudiants inscrits à vos cours
                              </p>
                            </div>
                            <Switch
                              id="show-students-count"
                              checked={showStudentsCount}
                              onCheckedChange={setShowStudentsCount}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleSavePrivacy}
                        disabled={saving}
                        className="w-full md:w-auto ml-auto"
                      >
                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Enregistrer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="security" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Sécurité du compte</CardTitle>
                    <CardDescription>
                      Gérez la sécurité de votre compte et vos sessions actives
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-6">
                      <div>
                        <h3 className="text-lg font-medium">Mot de passe</h3>
                        <Separator className="my-4" />
                        <div className="flex flex-col gap-4">
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="current-password">Mot de passe actuel</Label>
                            <Input id="current-password" type="password" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="new-password">Nouveau mot de passe</Label>
                            <Input id="new-password" type="password" />
                          </div>
                          <div className="flex flex-col gap-2">
                            <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                            <Input id="confirm-password" type="password" />
                          </div>
                          <Button className="w-full md:w-auto">
                            Mettre à jour le mot de passe
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Sessions actives</h3>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                          <div className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <div className="bg-green-100 p-2 rounded-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-green-600"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="12" y1="18" x2="12" y2="18.01"></line></svg>
                                </div>
                                <div>
                                  <p className="font-medium">iPhone 13 Pro - Paris</p>
                                  <p className="text-sm text-muted-foreground">
                                    Session actuelle • Dernière activité: il y a quelques secondes
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <div className="bg-blue-100 p-2 rounded-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600"><rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                                </div>
                                <div>
                                  <p className="font-medium">MacBook Pro - Paris</p>
                                  <p className="text-sm text-muted-foreground">
                                    Dernière activité: il y a 2 heures
                                  </p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                Déconnecter
                              </Button>
                            </div>
                          </div>
                          <div className="p-4 border rounded-lg">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <div className="bg-purple-100 p-2 rounded-full">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-purple-600"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                                </div>
                                <div>
                                  <p className="font-medium">iPad Air - Lyon</p>
                                  <p className="text-sm text-muted-foreground">
                                    Dernière activité: hier
                                  </p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">
                                Déconnecter
                              </Button>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" className="mt-4">
                          Déconnecter toutes les autres sessions
                        </Button>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium">Actions de sécurité</h3>
                        <Separator className="my-4" />
                        <div className="space-y-4">
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="destructive">Désactiver mon compte</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  La désactivation de votre compte masquera votre profil et vos cours aux étudiants.
                                  Vous pourrez réactiver votre compte en vous connectant à nouveau.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                                  Désactiver
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <Footer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default InstructorSettings;
