
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Save, ArrowLeft, Plus, Edit2, ImagePlus } from "lucide-react";
import CourseSectionManager from "@/components/CourseSectionManager";
import { useToast } from "@/hooks/use-toast";
import { useCourseEditor } from "@/hooks/use-course-editor";

// Form validation schema for specifically typed level values
const courseSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Le titre doit contenir au moins 5 caractères" })
    .max(100, { message: "Le titre ne doit pas dépasser 100 caractères" }),
  description: z
    .string()
    .min(20, { message: "La description doit contenir au moins 20 caractères" })
    .max(500, { message: "La description ne doit pas dépasser 500 caractères" }),
  price: z
    .number()
    .min(0, { message: "Le prix doit être supérieur ou égal à 0" }),
  level: z.enum(["débutant", "intermédiaire", "avancé"]),
  category: z.string().min(1, { message: "Veuillez sélectionner une catégorie" }),
});

// Extract the inferred type from the schema
type CourseFormValues = z.infer<typeof courseSchema>;

const CourseEditor = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const isEditing = !!courseId;

  const {
    loading,
    course,
    sections,
    thumbnailUrl,
    setThumbnailUrl,
    saveCourse,
    saveCourseContent,
    uploadThumbnail,
  } = useCourseEditor(courseId);

  // Form setup with proper type
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      level: "débutant",
      category: "",
    },
  });

  // Fill form with course data when available
  useEffect(() => {
    if (course) {
      form.reset({
        title: course.title,
        description: course.description,
        price: course.price,
        level: course.level as "débutant" | "intermédiaire" | "avancé",
        category: course.category,
      });
      setThumbnailUrl(course.thumbnail_url);
    }
  }, [course, form]);

  // Redirect if not authenticated or not an instructor
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (currentUser?.role !== "instructor") {
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentUser, navigate]);

  // Handle form submission with proper types
  const onSubmit = async (values: CourseFormValues) => {
    try {
      await saveCourse({
        id: course?.id,
        title: values.title,
        description: values.description,
        price: values.price,
        level: values.level,
        category: values.category,
        thumbnail_url: thumbnailUrl || undefined,
        status: course?.status || 'draft'
      });
      
      toast({
        title: isEditing ? "Cours mis à jour" : "Cours créé",
        description: isEditing 
          ? "Votre cours a été mis à jour avec succès" 
          : "Votre nouveau cours a été créé. Ajoutez maintenant du contenu.",
      });
      if (!isEditing && course?.id) {
        // If we just created a new course, navigate to edit mode
        navigate(`/instructor/courses/edit/${course.id}`);
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du cours",
        variant: "destructive",
      });
    }
  };

  // Handle thumbnail upload
  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "Fichier trop volumineux",
        description: "L'image ne doit pas dépasser 5MB",
        variant: "destructive",
      });
      return;
    }
    
    uploadThumbnail(file);
  };

  if (!isAuthenticated || currentUser?.role !== "instructor") {
    return null; // Return nothing during redirect
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-10 w-10 text-schoolier-blue animate-spin mb-4" />
            <p className="text-muted-foreground">
              {isEditing ? "Chargement du cours..." : "Préparation de l'éditeur de cours..."}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container px-6 py-8 flex-grow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/instructor")}
              className="mr-2"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Retour
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">
              {isEditing ? "Modifier le cours" : "Créer un nouveau cours"}
            </h1>
          </div>

          <Button 
            onClick={form.handleSubmit(onSubmit)} 
            className="flex items-center"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Enregistrer
          </Button>
        </div>

        <Tabs defaultValue={isEditing ? "content" : "details"} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="details">Détails du cours</TabsTrigger>
            <TabsTrigger value="content" disabled={!isEditing}>
              Contenu du cours
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations du cours</CardTitle>
                    <CardDescription>
                      Ajoutez les détails de base de votre cours
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
                                <Input placeholder="Ex: Maîtrisez JavaScript en 30 jours" {...field} />
                              </FormControl>
                              <FormDescription>
                                Un titre accrocheur qui décrit clairement votre cours
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
                                  placeholder="Décrivez ce que les étudiants vont apprendre..."
                                  className="min-h-24"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Une description claire et concise de votre cours
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
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sélectionnez une catégorie" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="programming">Développement</SelectItem>
                                    <SelectItem value="design">Design</SelectItem>
                                    <SelectItem value="marketing">Marketing</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                    <SelectItem value="personal">Développement personnel</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  La catégorie principale de votre cours
                                </FormDescription>
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
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
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
                                <FormDescription>
                                  Le niveau de difficulté de votre cours
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Prix (€)</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  {...field}
                                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                />
                              </FormControl>
                              <FormDescription>
                                Définissez le prix de votre cours (0 pour gratuit)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Image de couverture</CardTitle>
                    <CardDescription>
                      Ajoutez une image attrayante pour votre cours
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative aspect-video bg-muted rounded-md overflow-hidden">
                      {thumbnailUrl ? (
                        <img
                          src={thumbnailUrl}
                          alt="Aperçu"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-full">
                          <ImagePlus className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div>
                      <label htmlFor="thumbnail-upload" className="cursor-pointer">
                        <div className="flex items-center justify-center w-full py-3 px-4 border-2 border-dashed border-muted-foreground/25 rounded-md hover:bg-accent transition-colors">
                          <Edit2 className="h-4 w-4 mr-2" />
                          <span>Modifier l'image</span>
                          <input
                            id="thumbnail-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailUpload}
                            className="hidden"
                          />
                        </div>
                      </label>
                      <p className="text-xs text-muted-foreground mt-2">
                        Format recommandé: 16:9 (1280x720px). Taille max: 5 MB.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {isEditing && (
                  <Card className="mt-6">
                    <CardHeader>
                      <CardTitle>Statut du cours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Select defaultValue={course?.status || "draft"}>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un statut" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Brouillon</SelectItem>
                          <SelectItem value="published">Publié</SelectItem>
                          <SelectItem value="archived">Archivé</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-2">
                        Seuls les cours publiés sont visibles par les étudiants.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="content">
            {isEditing ? (
              <CourseSectionManager 
                courseId={courseId as string} 
                initialSections={sections}
                onSave={saveCourseContent}
              />
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      Enregistrez d'abord les détails du cours avant d'ajouter du contenu.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default CourseEditor;
