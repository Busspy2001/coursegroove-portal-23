
import React from "react";
import { Video } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface EditorDemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditorDemoDialog: React.FC<EditorDemoDialogProps> = ({
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Démo de l'éditeur de cours</DialogTitle>
          <DialogDescription>
            Découvrez à quel point il est simple de créer des cours de qualité avec notre éditeur intuitif.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-6">
            <div className="text-center p-6">
              <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                Vidéo de démonstration de l'éditeur
                <br />
                <span className="text-sm">(La vidéo sera chargée ici dans la version finale)</span>
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Fonctionnalités principales:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Interface glisser-déposer intuitive</li>
              <li>Support pour vidéo, audio, PDF et présentations</li>
              <li>Créez facilement des quiz et des exercices interactifs</li>
              <li>Outils d'organisation et de structuration de cours</li>
              <li>Aperçu en temps réel de votre cours</li>
              <li>Programmation et publication en quelques clics</li>
            </ul>
          </div>
          
          <div className="mt-8 bg-schoolier-blue/5 dark:bg-schoolier-blue/10 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2">Besoin d'une démo personnalisée?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Notre équipe peut vous guider et répondre à toutes vos questions spécifiques.
            </p>
            <Button variant="outline">
              Programmer une démo guidée
            </Button>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row sm:justify-between">
          <Button variant="outline" onClick={() => window.open('/register?role=instructor', '_blank')}>
            Créer un compte gratuit
          </Button>
          
          <DialogClose asChild>
            <Button>
              Fermer
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditorDemoDialog;
