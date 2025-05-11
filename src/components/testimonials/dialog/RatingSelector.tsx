
import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

interface RatingSelectorProps {
  name: string;
  label: string;
}

const RatingSelector: React.FC<RatingSelectorProps> = ({ name, label }) => {
  const form = useFormContext();
  const value = form.watch(name);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <Button
              key={rating}
              type="button"
              variant="ghost"
              size="sm"
              className={`p-0 m-0 h-auto ${value >= rating ? "text-schoolier-yellow" : "text-gray-300"}`}
              onClick={() => form.setValue(name, rating)}
            >
              <Star className="h-6 w-6" fill={value >= rating ? "currentColor" : "none"} />
            </Button>
          ))}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default RatingSelector;
