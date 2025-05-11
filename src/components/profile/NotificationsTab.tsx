
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

const NotificationsTab: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [courseUpdates, setCourseUpdates] = useState(true);
  const [promotionalEmails, setPromotionalEmails] = useState(false);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Préférences de notifications</CardTitle>
        <CardDescription>
          Choisissez les types de notifications que vous souhaitez recevoir
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailNotif" className="font-medium">Notifications par email</Label>
              <p className="text-sm text-muted-foreground">Recevez des notifications par email</p>
            </div>
            <Switch
              id="emailNotif"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="courseUpdates" className="font-medium">Mises à jour des cours</Label>
              <p className="text-sm text-muted-foreground">Soyez informé des nouveaux contenus dans vos cours</p>
            </div>
            <Switch
              id="courseUpdates"
              checked={courseUpdates}
              onCheckedChange={setCourseUpdates}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="promoEmails" className="font-medium">Emails promotionnels</Label>
              <p className="text-sm text-muted-foreground">Recevez des promotions et offres spéciales</p>
            </div>
            <Switch
              id="promoEmails"
              checked={promotionalEmails}
              onCheckedChange={setPromotionalEmails}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Enregistrer les préférences</Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationsTab;
