
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign, TrendingUp, LineChart, PieChart, CalendarRange } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AdminFinanceRevenue = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
        <div>
          <h2 className="text-xl font-semibold">Revenus & Répartition</h2>
          <p className="text-muted-foreground">Analyse des revenus et de leur distribution</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <CalendarRange className="h-4 w-4 mr-2" />
            Derniers 30 jours
          </Button>
          <Button size="sm" className="bg-schoolier-teal hover:bg-schoolier-dark-teal">
            Télécharger
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenu total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold">€127,429</div>
              <div className="ml-2 text-sm text-green-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5%
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Part instructeurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <div className="text-2xl font-bold">€63,715</div>
              <div className="ml-2 text-sm text-muted-foreground">(50%)</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenu net plateforme</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€63,714</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <LineChart className="mr-2 h-5 w-5 text-schoolier-blue" />
              Évolution des revenus
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Graphique en développement</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <PieChart className="mr-2 h-5 w-5 text-schoolier-teal" />
              Répartition par catégories
            </CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>Graphique en développement</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
