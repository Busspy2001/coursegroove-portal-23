
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Key } from "lucide-react";

const SecurityTab: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sécurité</CardTitle>
        <CardDescription>
          Gérez la sécurité de votre compte
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Changer le mot de passe</Label>
          <div className="space-y-2">
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="password"
                placeholder="Mot de passe actuel"
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="password"
                placeholder="Nouveau mot de passe"
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="password"
                placeholder="Confirmer le nouveau mot de passe"
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Mettre à jour le mot de passe</Button>
      </CardFooter>
    </Card>
  );
};

export default SecurityTab;
