
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Activity, Clock, User, BookOpen, CheckCircle2, 
  Calendar, Eye, Phone, Mail, MessageCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const UserActivity = () => {
  // Mock data for user activities
  const recentActivity = [
    {
      id: 1,
      user: "Sophie Martin",
      action: "s'est connectée",
      timestamp: "Il y a 5 minutes",
      details: "via application mobile",
      platform: "mobile",
      type: "connection"
    },
    {
      id: 2,
      user: "Thomas Dubois",
      action: "a commencé le cours",
      target: "JavaScript Avancé",
      timestamp: "Il y a 12 minutes",
      type: "course"
    },
    {
      id: 3,
      user: "Camille Bernard",
      action: "a terminé le module",
      target: "React Hooks",
      timestamp: "Il y a 23 minutes",
      type: "module"
    },
    {
      id: 4,
      user: "Lucas Petit",
      action: "a soumis un quiz",
      target: "Python: Bases",
      timestamp: "Il y a 47 minutes",
      details: "Score: 85%",
      type: "quiz"
    },
    {
      id: 5,
      user: "Emma Laurent",
      action: "a téléchargé un certificat",
      target: "Machine Learning",
      timestamp: "Il y a 1 heure",
      type: "certificate"
    },
    {
      id: 6,
      user: "Gabriel Moreau",
      action: "a contacté le support",
      timestamp: "Il y a 2 heures",
      details: "Problème de paiement",
      type: "support"
    },
    {
      id: 7,
      user: "Léa Martin",
      action: "s'est déconnectée",
      timestamp: "Il y a 3 heures",
      details: "Session: 1h 24min",
      type: "connection"
    },
    {
      id: 8,
      user: "Maxime Durand",
      action: "a laissé un avis",
      target: "UX Design Principles",
      timestamp: "Il y a 3 heures",
      details: "Note: 5/5",
      type: "review"
    }
  ];

  // Online users mock data
  const onlineUsers = [
    { 
      id: 1, 
      name: "Emma Laurent", 
      role: "student", 
      lastActivity: "Watching a course", 
      duration: "32 minutes" 
    },
    { 
      id: 2, 
      name: "Thomas Dubois", 
      role: "instructor", 
      lastActivity: "Updating course content", 
      duration: "1 hour 15 minutes" 
    },
    { 
      id: 3, 
      name: "Sophie Martin", 
      role: "student", 
      lastActivity: "Taking a quiz", 
      duration: "12 minutes" 
    },
    { 
      id: 4, 
      name: "Lucas Petit", 
      role: "admin", 
      lastActivity: "Managing users", 
      duration: "45 minutes" 
    },
    { 
      id: 5, 
      name: "Camille Bernard", 
      role: "student", 
      lastActivity: "Browsing courses", 
      duration: "8 minutes" 
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "connection":
        return <User className="h-4 w-4 text-blue-500" />;
      case "course":
        return <BookOpen className="h-4 w-4 text-indigo-500" />;
      case "module":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "quiz":
        return <Activity className="h-4 w-4 text-amber-500" />;
      case "certificate":
        return <Calendar className="h-4 w-4 text-teal-500" />;
      case "support":
        return <MessageCircle className="h-4 w-4 text-red-500" />;
      case "review":
        return <Eye className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "student":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Étudiant</Badge>;
      case "instructor":
        return <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-100">Instructeur</Badge>;
      case "admin":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Admin</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">{role}</Badge>;
    }
  };

  const getContactButtons = (user: { id: number, name: string }) => (
    <div className="flex gap-1">
      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
        <Mail className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
        <Phone className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
        <MessageCircle className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">Activité Utilisateur</h2>
      
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Activité Récente
          </TabsTrigger>
          <TabsTrigger value="online" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Utilisateurs En Ligne
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activité Récente</CardTitle>
              <CardDescription>
                Suivez les dernières actions des utilisateurs sur la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 rounded-md border p-4">
                      <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">
                          <span className="font-semibold">{activity.user}</span>{" "}
                          <span className="text-muted-foreground">{activity.action}</span>
                          {activity.target && (
                            <span> <span className="font-medium">{activity.target}</span></span>
                          )}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {activity.timestamp}
                          </span>
                          {activity.details && (
                            <Badge variant="outline" className="text-xs font-normal">
                              {activity.details}
                            </Badge>
                          )}
                          {activity.platform && (
                            <Badge variant="outline" className="text-xs font-normal">
                              {activity.platform}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="online" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Utilisateurs En Ligne</CardTitle>
              <CardDescription>
                {onlineUsers.length} utilisateurs actuellement actifs sur la plateforme
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {onlineUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between rounded-md border p-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center dark:bg-gray-800">
                          <span className="text-sm font-medium">
                            {user.name.split(' ').map(name => name[0]).join('')}
                          </span>
                        </div>
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <div className="flex items-center gap-2">
                          {getRoleBadge(user.role)}
                          <span className="text-xs text-muted-foreground">
                            {user.lastActivity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden sm:block text-right text-xs text-muted-foreground">
                        <p>En ligne depuis:</p>
                        <p className="font-medium">{user.duration}</p>
                      </div>
                      {getContactButtons(user)}
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

export default UserActivity;
