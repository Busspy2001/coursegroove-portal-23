
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/auth";
import { useCompanyData } from "../overview/useCompanyData";
import { NoCompanyMessage } from "../employees/components/NoCompanyMessage";
import { useNavigate } from "react-router-dom";
import { BarChart, LineChart, PieChart } from "lucide-react";

// Composant de graphique simulé
const ChartPlaceholder: React.FC<{height?: string, title: string}> = ({height = "h-64", title}) => (
  <div className={`${height} border border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center`}>
    <div className="text-muted-foreground flex items-center gap-2">
      <BarChart className="h-5 w-5" />
      <span>{title}</span>
    </div>
    <p className="text-xs text-muted-foreground mt-2">Les données du graphique s'afficheront ici</p>
  </div>
);

const BusinessStatistics: React.FC = () => {
  const { currentUser } = useAuth();
  const { companyData, loading, stats } = useCompanyData(currentUser);
  const navigate = useNavigate();
  
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Statistiques</h1>
        <p className="text-muted-foreground">
          Suivez les performances et l'évolution de vos employés
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Employés actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_employees || "0"}</div>
            <p className="text-xs text-green-500">+12% ce mois-ci</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Taux de complétion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.completion_rate || "0"}%</div>
            <p className="text-xs text-green-500">+5% ce mois-ci</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cours actifs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.active_courses || "0"}</div>
            <p className="text-xs text-muted-foreground">Total actuel</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Temps moyen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h 45min</div>
            <p className="text-xs text-muted-foreground">Par formation</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="progression">
        <TabsList className="mb-4">
          <TabsTrigger value="progression">Progression</TabsTrigger>
          <TabsTrigger value="departments">Départements</TabsTrigger>
          <TabsTrigger value="employees">Employés</TabsTrigger>
          <TabsTrigger value="courses">Formations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="progression">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Évolution du taux de complétion</CardTitle>
                <CardDescription>Progression mensuelle des formations</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartPlaceholder title="Graphique d'évolution" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Répartition par niveau</CardTitle>
                <CardDescription>Distribution des formations par niveau</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-64">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-24 bg-blue-100 rounded-full h-24 flex items-center justify-center">
                        <span className="text-blue-800 font-bold text-xl">45%</span>
                      </div>
                      <span className="mt-2 text-sm">Débutant</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-24 bg-green-100 rounded-full h-24 flex items-center justify-center">
                        <span className="text-green-800 font-bold text-xl">35%</span>
                      </div>
                      <span className="mt-2 text-sm">Intermédiaire</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-24 bg-purple-100 rounded-full h-24 flex items-center justify-center">
                        <span className="text-purple-800 font-bold text-xl">20%</span>
                      </div>
                      <span className="mt-2 text-sm">Avancé</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Performances mensuelles</CardTitle>
                <CardDescription>Évolution des indicateurs clés</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartPlaceholder title="Graphique de performances" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="departments">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Comparaison des départements</CardTitle>
              <CardDescription>Performance par département</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {['Marketing', 'IT', 'RH', 'Finance'].map((dept) => (
                  <div key={dept} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{dept}</span>
                      <span>{Math.floor(Math.random() * 30) + 70}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-schoolier-teal" 
                        style={{width: `${Math.floor(Math.random() * 30) + 70}%`}} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="employees">
          <Card>
            <CardHeader>
              <CardTitle>Top performers</CardTitle>
              <CardDescription>Employés les plus performants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['Sophie Martin', 'Thomas Dubois', 'Julie Leclerc', 'Antoine Bernard'].map((name, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <span className="font-medium">{name}</span>
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-2">{Math.floor(Math.random() * 10) + 5} formations</span>
                      <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                        {Math.floor(Math.random() * 10) + 90}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Formations populaires</CardTitle>
              <CardDescription>Les formations les plus suivies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  'Introduction à la cybersécurité',
                  'Leadership et management d\'équipe',
                  'Excel avancé pour l\'analyse financière',
                  'Communication efficace en entreprise'
                ].map((course, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                    <span className="font-medium">{course}</span>
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-2">{Math.floor(Math.random() * 50) + 20} inscrits</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs">
                        {Math.floor(Math.random() * 20) + 70}% complété
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessStatistics;
