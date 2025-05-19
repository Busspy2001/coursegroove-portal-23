
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, PlusCircle } from "lucide-react";
import { NavigateFunction } from "react-router-dom";

interface NoCompanyMessageProps {
  onNavigate: NavigateFunction;
  isDemoUser: boolean;
}

export const NoCompanyMessage: React.FC<NoCompanyMessageProps> = ({ onNavigate, isDemoUser }) => {
  const handleNavigation = () => {
    // Redirect to the dashboard for demo users
    // The dashboard will automatically create a company via useCompanyData
    onNavigate('/entreprise');
  };
  
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <CardTitle className="text-xl">No company configured</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p className="mb-4">
            {isDemoUser 
              ? "Your demo account doesn't have a company configured yet."
              : "You haven't configured your company yet. To manage your departments, you need to create a company first."}
          </p>
          
          {isDemoUser && (
            <p className="text-sm bg-amber-50 text-amber-800 p-3 rounded border border-amber-200">
              Note: Your demo account will be automatically configured with a company
              when you access the dashboard.
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full" 
            onClick={handleNavigation}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            {isDemoUser ? "Go to dashboard" : "Create my company"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
