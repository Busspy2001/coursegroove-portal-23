
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const SearchSection = () => {
  return (
    <section className="py-10 lg:py-16 container px-4 mx-auto -mt-4 md:-mt-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl p-4 md:p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center font-spartan">Trouvez votre prochaine formation 🔎</h2>
        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="Que souhaitez-vous apprendre ?"
            className="pl-10 py-5 md:py-6 text-base md:text-lg"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-schoolier-blue hover:bg-schoolier-blue/90 font-spartan">
            <span className="hidden sm:inline">Rechercher</span>
            <Search className="h-4 w-4 sm:hidden" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <Badge variant="outline" className="cursor-pointer hover:bg-schoolier-blue/10 whitespace-nowrap">Web</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-schoolier-blue/10 whitespace-nowrap">IA</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-schoolier-blue/10 whitespace-nowrap">Marketing</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-schoolier-blue/10 whitespace-nowrap">UX/UI</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-schoolier-blue/10 whitespace-nowrap">Data</Badge>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
