
import React, { useEffect } from "react";
import { useAuth } from "@/contexts/auth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Users, Book, Building2, Award } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BusinessDashboard = () => {
  const { currentUser, isAuthenticated, authStateReady } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authStateReady && !isAuthenticated) {
      console.log("🚫 BusinessDashboard: Utilisateur non authentifié, redirection vers la page de connexion");
      navigate("/login", { state: { returnUrl: "/entreprise" } });
      return;
    }
    
    if (authStateReady && isAuthenticated && currentUser?.role !== "business_admin") {
      console.log(`⚠️ BusinessDashboard: Rôle utilisateur incorrect: ${currentUser?.role}`);
      toast({
        title: "Accès non autorisé",
        description: "Vous n'avez pas les autorisations nécessaires pour accéder au tableau de bord entreprise.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [isAuthenticated, currentUser, navigate, authStateReady]);

  const stats = [
    { title: "Employés actifs", value: "28", icon: <Users className="h-4 w-4 text-muted-foreground" /> },
    { title: "Formations en cours", value: "12", icon: <Book className="h-4 w-4 text-muted-foreground" /> },
    { title: "Départements", value: "6", icon: <Building2 className="h-4 w-4 text-muted-foreground" /> },
    { title: "Certifications obtenues", value: "45", icon: <Award className="h-4 w-4 text-muted-foreground" /> }
  ];

  // Don't render anything while we redirect unauthenticated users
  if (!isAuthenticated || !currentUser) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue sur votre espace entreprise, {currentUser?.name || ""}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Les activités récentes de votre équipe apparaîtront ici.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessDashboard;
