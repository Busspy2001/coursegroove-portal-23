
import React from "react";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqData {
  [key: string]: FaqItem[];
}

interface FaqCategoriesProps {
  faqData: FaqData;
  filteredFAQs: FaqData;
  hasResults: boolean;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const FaqCategories = ({ 
  faqData, 
  filteredFAQs, 
  hasResults, 
  searchQuery, 
  setSearchQuery 
}: FaqCategoriesProps) => {
  return (
    <section className="py-10 container px-6 mx-auto mb-10">
      {hasResults ? (
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            <TabsTrigger value="general">Général</TabsTrigger>
            <TabsTrigger value="courses">Les cours</TabsTrigger>
            <TabsTrigger value="payment">Paiements</TabsTrigger>
            <TabsTrigger value="instructors">Formateurs</TabsTrigger>
            <TabsTrigger value="technical">Technique</TabsTrigger>
          </TabsList>

          {Object.keys(filteredFAQs).map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
                <Accordion type="single" collapsible className="w-full">
                  {filteredFAQs[category].map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <div className="text-center py-16">
          <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Aucun résultat trouvé</h3>
          <p className="text-muted-foreground mb-6">
            Nous n'avons pas trouvé de réponse correspondant à "{searchQuery}". Essayez une autre recherche ou contactez-nous.
          </p>
          <Button onClick={() => setSearchQuery("")} variant="outline">Réinitialiser la recherche</Button>
        </div>
      )}
    </section>
  );
};

export default FaqCategories;
