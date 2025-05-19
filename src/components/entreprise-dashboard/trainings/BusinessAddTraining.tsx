
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useCompanyData } from "../overview/useCompanyData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { NoCompanyMessage } from "../employees/components/NoCompanyMessage";
import { PlusCircle, Clock, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const BusinessAddTraining = () => {
  const { currentUser } = useAuth();
  const { companyData, loading } = useCompanyData(currentUser);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Management",
    duration: "",
    isRequired: false
  });
  const [submitting, setSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyData?.id) {
      toast({
        title: "Erreur",
        description: "Données de l'entreprise non disponibles",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setSubmitting(true);
      
      // Simulation de l'ajout en mode démo
      if (currentUser?.is_demo) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulation de création dans Supabase pour les utilisateurs de démo
        const { error } = await supabase
          .from('company_courses')
          .insert({
            company_id: companyData.id,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            duration: formData.duration,
            is_required: formData.isRequired
          });
          
        if (error) throw error;
      }
      
      toast({
        title: "Formation ajoutée",
        description: `La formation "${formData.title}" a été ajoutée avec succès.`
      });
      
      // Redirection vers la page des formations
      navigate("/entreprise/formations");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la formation:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter cette formation. Veuillez réessayer.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3"></div>
        <div className="h-64 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }
  
  if (!companyData) {
    return <NoCompanyMessage onNavigate={navigate} isDemoUser={currentUser?.is_demo === true} />;
  }
  
  const categories = ["Management", "IT", "Finance", "Marketing", "Ressources Humaines", "Vente", "Communication", "Développement personnel"];
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Ajouter une formation</h1>
        <p className="text-muted-foreground">
          Créez une nouvelle formation pour vos collaborateurs
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Détails de la formation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la formation *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Management d'équipe"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Décrivez le contenu et les objectifs de cette formation..."
                  rows={4}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Durée estimée</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="Ex: 2h 30min"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="isRequired">Statut</Label>
                <Select
                  defaultValue={formData.isRequired ? "required" : "optional"}
                  onValueChange={(value) => handleSelectChange("isRequired", value === "required" ? "true" : "false")}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Statut de la formation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="optional">Optionnelle</SelectItem>
                    <SelectItem value="required">Obligatoire</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label>Contenu de la formation</Label>
                <div className="border-2 border-dashed rounded-md p-8 text-center">
                  <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Glissez-déposez des fichiers ou cliquez pour ajouter du contenu
                  </p>
                  <Button variant="outline" type="button">
                    Parcourir les fichiers
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Formats acceptés: PDF, DOCX, MP4, MP3
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate("/entreprise/formations")}
              >
                Annuler
              </Button>
              
              <Button 
                type="submit"
                disabled={submitting}
              >
                {submitting ? (
                  <>Création en cours...</>
                ) : (
                  <>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Créer la formation
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessAddTraining;
