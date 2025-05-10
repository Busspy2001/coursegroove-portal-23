
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, Lock } from "lucide-react";

interface Certification {
  id: string;
  title: string;
  progress: number;
  status: "in-progress" | "completed" | "locked";
}

const OngoingCertifications = () => {
  const navigate = useNavigate();
  
  const certifications: Certification[] = [
    {
      id: "cert-1",
      title: "Développement Web Frontend",
      progress: 65,
      status: "in-progress"
    },
    {
      id: "cert-2",
      title: "UX Design Fundamentals",
      progress: 100,
      status: "completed"
    },
    {
      id: "cert-3",
      title: "Advanced JavaScript",
      progress: 0,
      status: "locked"
    }
  ];

  const getStatusIcon = (status: Certification["status"]) => {
    switch (status) {
      case "in-progress":
        return <Clock className="h-5 w-5 text-schoolier-yellow" />;
      case "completed":
        return <CheckCircle className="h-5 w-5 text-schoolier-green" />;
      case "locked":
        return <Lock className="h-5 w-5 text-schoolier-gray" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: Certification["status"]) => {
    switch (status) {
      case "in-progress":
        return "En cours";
      case "completed":
        return "Terminé";
      case "locked":
        return "À débloquer";
      default:
        return "";
    }
  };

  const getStatusClassName = (status: Certification["status"]) => {
    switch (status) {
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "locked":
        return "bg-gray-100 text-gray-600";
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Certifications en cours</CardTitle>
          <Button 
            variant="ghost" 
            className="text-sm text-schoolier-blue hover:text-schoolier-dark-blue"
            onClick={() => navigate("/certifications")}
          >
            Voir tout
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {certifications.map((cert) => (
            <li 
              key={cert.id} 
              className={`flex items-center p-3 rounded-md transition-all ${cert.status === 'locked' ? 'bg-muted/30 opacity-60' : 'bg-muted/50 hover:bg-muted cursor-pointer'}`}
              onClick={() => cert.status !== 'locked' && navigate(`/certifications/${cert.id}`)}
            >
              <div className="mr-3">
                {getStatusIcon(cert.status)}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{cert.title}</h4>
                {cert.status === 'in-progress' && (
                  <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                    <div 
                      className="bg-schoolier-blue h-1.5 rounded-full"
                      style={{ width: `${cert.progress}%` }}
                    />
                  </div>
                )}
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${getStatusClassName(cert.status)}`}>
                {getStatusText(cert.status)}
              </span>
            </li>
          ))}
        </ul>
        
        <div className="mt-4 pt-3 border-t border-border flex justify-center">
          <Button 
            size="sm"
            onClick={() => navigate("/certifications")}
          >
            Explorer les certifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OngoingCertifications;
