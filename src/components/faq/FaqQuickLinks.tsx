
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Book, CreditCard, HelpCircle, Mail, UserPlus, Video } from "lucide-react";

const quickLinks = [
  { icon: <HelpCircle className="h-6 w-6" />, label: "FAQ Générale" },
  { icon: <Book className="h-6 w-6" />, label: "Les cours" },
  { icon: <CreditCard className="h-6 w-6" />, label: "Paiements" },
  { icon: <UserPlus className="h-6 w-6" />, label: "Formateurs" },
  { icon: <Video className="h-6 w-6" />, label: "Technique" },
  { icon: <Mail className="h-6 w-6" />, label: "Contact" }
];

const FaqQuickLinks = () => {
  return (
    <section className="py-10 container px-6 mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {quickLinks.map((item, index) => (
          <Card key={index} className="cursor-pointer card-hover">
            <CardContent className="p-4 text-center">
              <div className="flex flex-col items-center">
                <div className="mb-2 text-schoolier-blue">{item.icon}</div>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FaqQuickLinks;
