
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, Mail, Upload, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { User as UserType } from "@/contexts/auth/types";

interface PersonalInfoTabProps {
  currentUser: UserType | null;
  initialName: string;
  initialBio: string;
}

const PersonalInfoTab: React.FC<PersonalInfoTabProps> = ({ currentUser, initialName, initialBio }) => {
  const [name, setName] = useState(initialName);
  const [bio, setBio] = useState(initialBio);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleUpdateProfile = () => {
    setIsUpdating(true);
    
    // Simulate profile update
    setTimeout(() => {
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été enregistrées avec succès.",
      });
      setIsUpdating(false);
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations personnelles</CardTitle>
        <CardDescription>
          Mettez à jour vos informations de profil
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nom complet</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                id="fullName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                id="email"
                value={currentUser?.email || ""}
                disabled
                className="pl-10 bg-gray-50"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Contactez le support pour changer votre adresse email
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Parlez-nous un peu de vous..."
            rows={4}
          />
        </div>
        
        <div className="space-y-2">
          <Label>Photo de profil</Label>
          <div className="flex items-center space-x-4">
            <img
              src={currentUser?.avatar || `https://ui-avatars.com/api/?name=${currentUser?.name?.replace(" ", "+") || "User"}&background=0D9488&color=fff`}
              alt={currentUser?.name || "User"}
              className="w-16 h-16 rounded-full"
            />
            <Button variant="outline" size="sm">
              <Upload className="mr-2 h-4 w-4" /> Changer la photo
            </Button>
            <Button variant="outline" size="sm">
              Supprimer
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleUpdateProfile} disabled={isUpdating}>
          {isUpdating ? (
            <>
              <Save className="mr-2 h-4 w-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Enregistrer les modifications
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PersonalInfoTab;
