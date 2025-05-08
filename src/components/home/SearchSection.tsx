
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const SearchSection = () => {
  return (
    <section className="py-16 container px-6 mx-auto -mt-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center font-spartan">Trouvez votre prochaine formation 🔎</h2>
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Que souhaitez-vous apprendre aujourd'hui ?"
            className="pl-10 py-6 text-lg"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-schoolier-blue hover:bg-schoolier-blue/90">
            Rechercher
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="outline" className="cursor-pointer hover:bg-schoolier-blue/10">Développement web</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-schoolier-blue/10">Intelligence artificielle</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-schoolier-blue/10">Marketing digital</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-schoolier-blue/10">UX/UI Design</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-schoolier-blue/10">Data Science</Badge>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
