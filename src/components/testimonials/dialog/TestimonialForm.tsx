
import React from "react";
import { useForm } from "react-hook-form";
import { Star, Send } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  role: z.string().min(2, "Veuillez entrer votre poste actuel"),
  company: z.string().optional(),
  course: z.string().min(2, "Veuillez indiquer la formation suivie"),
  message: z.string().min(10, "Votre témoignage doit contenir au moins 10 caractères"),
  rating: z.number().min(1).max(5),
});

export type TestimonialFormData = z.infer<typeof formSchema>;

interface TestimonialFormProps {
  onSubmit: (data: TestimonialFormData) => Promise<void>;
  onCancel: () => void;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ onSubmit, onCancel }) => {
  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      company: "",
      course: "",
      message: "",
      rating: 5,
    },
  });

  const handleSubmit = async (data: TestimonialFormData) => {
    await onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Votre nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="votre.email@exemple.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poste actuel</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Développeur Web" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entreprise (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de votre entreprise" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Formation suivie</FormLabel>
              <FormControl>
                <Input placeholder="Ex: JavaScript Avancé" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Votre note</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      type="button"
                      variant="ghost"
                      size="sm"
                      className={`p-0 m-0 h-auto ${field.value >= rating ? "text-schoolier-yellow" : "text-gray-300"}`}
                      onClick={() => form.setValue("rating", rating)}
                    >
                      <Star className="h-6 w-6" fill={field.value >= rating ? "currentColor" : "none"} />
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Votre témoignage</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Partagez votre expérience avec Schoolier..."
                  className="min-h-[120px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button type="submit">
            <Send className="mr-2 h-4 w-4" />
            Envoyer
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TestimonialForm;
