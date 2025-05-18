
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";

// Validation schema
const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Mot de passe de 6 caractères minimum"),
  rememberMe: z.boolean().optional(),
});

type ProfileType = "student" | "instructor" | "business" | "employee";

interface LoginFormProps {
  profileType?: ProfileType;
}

export function LoginForm({ profileType = "student" }: LoginFormProps) {
  const { login, isLoggingIn } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  // Form setup with React Hook Form and Zod validation
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      await login(values.email, values.password, () => {
        console.log("Connexion réussie");
      });
    } catch (error: any) {
      console.error("Erreur de connexion:", error);
    }
  };

  // Get button styles based on profile type
  const getButtonClass = () => {
    switch (profileType) {
      case "instructor":
        return "bg-schoolier-teal hover:bg-schoolier-dark-teal";
      case "business":
        return "bg-amber-500 hover:bg-amber-600";
      case "employee":
        return "bg-purple-500 hover:bg-purple-600";
      default:
        return "bg-schoolier-blue hover:bg-schoolier-dark-blue";
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <FormControl>
                  <Input placeholder="votre@email.com" className="pl-10" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <FormControl>
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    className="pl-10" 
                    {...field} 
                  />
                </FormControl>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Se souvenir de moi
                </FormLabel>
              </FormItem>
            )}
          />
          
          <Link
            to="/forgot-password"
            className="text-sm text-schoolier-blue hover:underline"
          >
            Mot de passe oublié?
          </Link>
        </div>
        
        <Button
          type="submit"
          className={`w-full ${getButtonClass()}`}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connexion en cours...
            </>
          ) : (
            "Se connecter"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
