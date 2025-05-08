import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Move, Trash, Edit, Check, X, Video, FileText, HelpCircle } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

const sectionSchema = z.object({
  title: z.string().min(2, "Le titre doit contenir au moins 2 caractères").max(100),
  description: z.string().optional(),
});

interface CourseSectionManagerProps {
  courseId: string;
  onSectionsChange?: (sections: CourseSection[]) => void;
}

interface CourseSection {
  id: string;
  title: string;
  description?: string;
  position: number;
}

const CourseSectionManager: React.FC<CourseSectionManagerProps> = ({ courseId, onSectionsChange }) => {
  const [sections, setSections] = useState<CourseSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof sectionSchema>>({
    resolver: zodResolver(sectionSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  // Mock data fetching from Supabase until types are updated
  useEffect(() => {
    const fetchSections = async () => {
      if (!courseId) return;
      
      try {
        setLoading(true);
        
        // Using mock data instead of Supabase query
        // This will be replaced with actual Supabase query once types are updated
        const mockData: CourseSection[] = [
          {
            id: "section-1",
            title: "Introduction au cours",
            description: "Présentation générale et objectifs",
            position: 1,
          },
          {
            id: "section-2",
            title: "Les bases",
            description: "Concepts fondamentaux",
            position: 2,
          }
        ];

        // Simulate API delay for realism
        setTimeout(() => {
          setSections(mockData);
          
          if (onSectionsChange) {
            onSectionsChange(mockData);
          }
          
          setLoading(false);
        }, 500);
        
      } catch (error: any) {
        console.error('Error fetching course sections:', error);
        toast({
          title: 'Erreur',
          description: 'Impossible de récupérer les sections du cours.',
          variant: 'destructive',
        });
        setLoading(false);
      }
    };

    fetchSections();
  }, [courseId, onSectionsChange]);

  // Reset form when dialog closes or section changes
  useEffect(() => {
    if (!dialogOpen) {
      form.reset({
        title: "",
        description: "",
      });
      setEditingSectionId(null);
    }
  }, [dialogOpen, form]);

  // Load section data when editing
  useEffect(() => {
    if (editingSectionId) {
      const section = sections.find(s => s.id === editingSectionId);
      if (section) {
        form.reset({
          title: section.title,
          description: section.description,
        });
      }
    }
  }, [editingSectionId, sections, form]);

  const handleAddSection = async (values: z.infer<typeof sectionSchema>) => {
    try {
      const newPosition = sections.length > 0 
        ? Math.max(...sections.map(s => s.position)) + 1 
        : 1;

      let result;
      
      if (editingSectionId) {
        // Update existing section - mocked
        const updatedSection = {
          ...sections.find(s => s.id === editingSectionId)!,
          title: values.title,
          description: values.description,
        };
        
        result = updatedSection;
        
        toast({
          title: 'Section mise à jour',
          description: 'La section a été mise à jour avec succès.',
        });
      } else {
        // Create new section - mocked
        result = {
          id: uuidv4(),
          course_id: courseId,
          title: values.title,
          description: values.description,
          position: newPosition,
        };
        
        toast({
          title: 'Section ajoutée',
          description: 'La section a été ajoutée avec succès.',
        });
      }

      // Update sections state
      if (editingSectionId) {
        setSections(sections.map(s => s.id === editingSectionId ? result : s));
      } else {
        setSections([...sections, result]);
      }
      
      if (onSectionsChange) {
        onSectionsChange(editingSectionId 
          ? sections.map(s => s.id === editingSectionId ? result : s)
          : [...sections, result]
        );
      }

      // Close dialog and reset form
      setDialogOpen(false);
    } catch (error: any) {
      console.error('Error adding/updating section:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (sectionId: string) => {
    // Ask for confirmation
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette section ? Toutes les leçons associées seront également supprimées.")) {
      return;
    }
    
    try {
      // Mock delete operation
      // Remove section from local state
      const updatedSections = sections.filter(s => s.id !== sectionId);
      setSections(updatedSections);
      
      if (onSectionsChange) {
        onSectionsChange(updatedSections);
      }
      
      toast({
        title: 'Section supprimée',
        description: 'La section a été supprimée avec succès.',
      });
    } catch (error: any) {
      console.error('Error deleting section:', error);
      toast({
        title: 'Erreur de suppression',
        description: error.message || 'Une erreur est survenue. Veuillez réessayer.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (sectionId: string) => {
    setEditingSectionId(sectionId);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Sections du cours</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Ajouter une section
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingSectionId ? 'Modifier la section' : 'Ajouter une section'}
              </DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleAddSection)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre de la section</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Introduction au cours" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (optionnelle)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Donnez une brève description du contenu de cette section..." 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit">
                    {editingSectionId ? 'Mettre à jour' : 'Ajouter'}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary" />
        </div>
      ) : sections.length > 0 ? (
        <div className="space-y-3">
          {sections.map((section) => (
            <Card key={section.id} className="border border-muted">
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium flex items-center">
                    <Move className="h-4 w-4 mr-2 cursor-move text-muted-foreground" />
                    {section.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(section.id)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(section.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-2">
                {section.description && (
                  <p className="text-sm text-muted-foreground mb-4">{section.description}</p>
                )}
                <div className="flex justify-end">
                  <Button size="sm" variant="outline">
                    <Plus className="h-3 w-3 mr-1" />
                    Ajouter une leçon
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border border-dashed">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <div className="bg-muted rounded-full h-12 w-12 flex items-center justify-center mx-auto">
                <HelpCircle className="h-6 w-6 text-muted-foreground" />
              </div>
              <h4 className="font-medium">Aucune section</h4>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Les sections vous permettent d'organiser votre cours en chapitres ou modules. 
                Ajoutez votre première section pour commencer.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourseSectionManager;
