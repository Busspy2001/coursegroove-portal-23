
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BookOpen, Upload, FilePlus, Edit, Save, X } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(5, "Le titre doit contenir au moins 5 caractères").max(100),
  description: z.string().min(20, "La description doit contenir au moins 20 caractères"),
  category: z.string().min(1, "Veuillez sélectionner une catégorie"),
  level: z.enum(["débutant", "intermédiaire", "avancé"]),
  price: z.coerce.number().min(0, "Le prix ne peut pas être négatif"),
  thumbnailUrl: z.string().optional(),
});

const CourseCreation = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      level: "débutant",
      price: 0,
      thumbnailUrl: "",
    },
  });

  // Redirect if not authenticated or not an instructor
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (currentUser?.role !== "instructor") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentUser, navigate]);

  const handleThumbnailUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `course-thumbnails/${fileName}`;
    
    setUploading(true);
    
    try {
      const { error: uploadError } = await supabase.storage
        .from('course-media')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage.from('course-media').getPublicUrl(filePath);
      
      if (data) {
        form.setValue("thumbnailUrl", data.publicUrl);
        toast({
          title: "Upload réussi",
          description: "L'image a été téléchargée avec succès.",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      toast({
        title: "Erreur d'upload",
        description: "Impossible de télécharger l'image. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!currentUser) return;
    
    try {
      // Insert course data into the database
      const { data: course, error } = await supabase
        .from('courses')
        .insert({
          title: values.title,
          description: values.description,
          category: values.category,
          level: values.level,
          price: values.price,
          thumbnail_url: values.thumbnailUrl || `https://ui-avatars.com/api/?name=${values.title.replace(" ", "+")}&background=0D9488&color=fff&size=400`,
          instructor_id: currentUser.id,
          duration: "0 min", // Will be updated as sections and lessons are added
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select("id")
        .single();

      if (error) throw error;

      toast({
        title: "Cours créé avec succès",
        description: "Vous pouvez maintenant ajouter des sections et des leçons.",
      });
      
      navigate(`/instructor/courses/${course.id}/edit`);
    } catch (error: any) {
      console.error("Erreur lors de la création du cours:", error);
      toast({
        title: "Erreur de création",
        description: error.message || "Impossible de créer le cours. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated || currentUser?.role !== "instructor") {
    return null; // Return nothing during redirect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-6 py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Créer un nouveau cours</h1>
            <p className="text-muted-foreground">
              Remplissez les informations ci-dessous pour créer votre cours.
            </p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="mb-6">
            <TabsTrigger value="basic">Informations de base</TabsTrigger>
            <TabsTrigger value="content" disabled={!form.formState.isValid}>
              Contenu du cours
            </TabsTrigger>
            <TabsTrigger value="pricing" disabled={!form.formState.isValid}>
              Tarification
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de base</CardTitle>
                <CardDescription>
                  Ces informations seront affichées aux étudiants lorsqu'ils parcourent les cours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre du cours</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Développement Web pour Débutants" {...field} />
                          </FormControl>
                          <FormDescription>
                            Un titre court et clair qui décrit votre cours.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Décrivez votre cours en détail..." 
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Une description détaillée qui explique ce que les étudiants vont apprendre.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Catégorie</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez une catégorie" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Programmation">Programmation</SelectItem>
                                <SelectItem value="Design">Design</SelectItem>
                                <SelectItem value="Marketing">Marketing</SelectItem>
                                <SelectItem value="Business">Business</SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                                <SelectItem value="Développement personnel">Développement personnel</SelectItem>
                                <SelectItem value="Autres">Autres</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="level"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Niveau</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez un niveau" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="débutant">Débutant</SelectItem>
                                <SelectItem value="intermédiaire">Intermédiaire</SelectItem>
                                <SelectItem value="avancé">Avancé</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="thumbnailUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image de couverture</FormLabel>
                          <div className="flex flex-col space-y-4">
                            {field.value && (
                              <div className="relative w-full max-w-[300px] aspect-video overflow-hidden rounded-md border">
                                <img 
                                  src={field.value} 
                                  alt="Aperçu" 
                                  className="object-cover w-full h-full"
                                />
                                <button
                                  type="button"
                                  onClick={() => form.setValue("thumbnailUrl", "")}
                                  className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                            
                            <div className="flex items-center">
                              <Button 
                                type="button"
                                variant="outline" 
                                className="relative"
                                disabled={uploading}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                {uploading ? 'Téléchargement...' : 'Télécharger une image'}
                                <input 
                                  type="file"
                                  accept="image/*"
                                  className="absolute inset-0 opacity-0 cursor-pointer"
                                  onChange={handleThumbnailUpload}
                                  disabled={uploading}
                                />
                              </Button>
                            </div>
                            
                            <FormDescription>
                              Format recommandé: 16:9, taille minimale 1280x720px, formats JPG ou PNG.
                            </FormDescription>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Prix (€)</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" step="0.01" {...field} />
                          </FormControl>
                          <FormDescription>
                            Définissez le prix de votre cours en euros. Entrez 0 pour un cours gratuit.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => navigate("/instructor")}>
                  Annuler
                </Button>
                <Button 
                  onClick={() => setActiveTab("content")} 
                  disabled={!form.formState.isValid}
                >
                  Continuer
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contenu du cours</CardTitle>
                <CardDescription>
                  Organisez votre cours en sections et ajoutez du contenu.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FilePlus className="h-16 w-16 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">
                    Vous pourrez ajouter du contenu après avoir créé le cours
                  </h3>
                  <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                    Après avoir créé les informations de base de votre cours, vous pourrez ajouter des sections, 
                    des leçons, des vidéos, des fichiers, des quiz et plus encore.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("basic")}>
                  Retour
                </Button>
                <Button onClick={() => setActiveTab("pricing")}>
                  Continuer
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Publication et tarification</CardTitle>
                <CardDescription>
                  Définissez les options de publication et de tarification de votre cours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Récapitulatif</h3>
                    <div className="mt-4 space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Titre:</span>
                        <span className="font-medium">{form.watch("title")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Catégorie:</span>
                        <span className="font-medium">{form.watch("category")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Niveau:</span>
                        <span className="font-medium">{form.watch("level")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Prix:</span>
                        <span className="font-medium">
                          {form.watch("price") > 0 ? `${form.watch("price")} €` : "Gratuit"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab("content")}>
                  Retour
                </Button>
                <Button onClick={form.handleSubmit(onSubmit)}>
                  <Save className="h-4 w-4 mr-2" />
                  Créer le cours
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default CourseCreation;
