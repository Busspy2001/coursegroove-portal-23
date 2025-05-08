
import React, { Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FaqHeaderProps {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

const FaqHeader = ({ searchQuery, setSearchQuery }: FaqHeaderProps) => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 py-20">
      <div className="container px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="heading-1 text-schoolier-blue mb-6">Centre d'aide</h1>
          <p className="subheading mb-8">
            Trouvez rapidement des réponses à vos questions pour tirer le meilleur parti de votre expérience Schoolier
          </p>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Rechercher une question, un sujet..."
              className="pl-10 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqHeader;
