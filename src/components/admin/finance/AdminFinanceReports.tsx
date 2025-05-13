
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileBarChart, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AdminFinanceReports = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Rapports financiers</h2>
          <p className="text-muted-foreground">Générez et téléchargez les rapports financiers</p>
        </div>
        <Button className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
          <RefreshCw className="mr-2 h-4 w-4" />
          Générer un nouveau rapport
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <FileBarChart className="mr-2 h-5 w-5 text-schoolier-blue" />
            Rapports disponibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Rapport mensuel - Avril 2025</h3>
                <p className="text-sm text-muted-foreground">Généré le 05/05/2025</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Rapport mensuel - Mars 2025</h3>
                <p className="text-sm text-muted-foreground">Généré le 03/04/2025</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Rapport trimestriel - Q1 2025</h3>
                <p className="text-sm text-muted-foreground">Généré le 05/04/2025</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Télécharger
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
