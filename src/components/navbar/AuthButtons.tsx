
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Globe, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const AuthButtons = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center space-x-2">
      {/* Language Selector with Tooltip */}
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hidden sm:flex hover:bg-schoolier-blue/10 hover:text-schoolier-blue"
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-pointer font-medium">Français</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">English</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Español</DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">Deutsch</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Changer de langue</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Chatbot Button with Tooltip */}
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => alert("Chatbot ouvert")}
              className="hidden sm:flex hover:bg-schoolier-blue/10 hover:text-schoolier-blue"
              aria-label="Assistant IA"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Assistant IA</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Shopping Cart with Tooltip */}
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/cart")}
              className="hover:bg-schoolier-blue/10 hover:text-schoolier-blue relative"
              aria-label="Panier"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 text-xs flex items-center justify-center bg-schoolier-red text-white rounded-full">
                0
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mon panier</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Auth Buttons with improved visibility */}
      <Button 
        variant="outline" 
        onClick={() => navigate("/auth")}
        className="hidden sm:flex border-2 border-schoolier-blue text-schoolier-blue hover:bg-schoolier-blue/10 font-spartan text-sm transition-all"
      >
        Se connecter
      </Button>
      <Button 
        onClick={() => navigate("/auth")}
        className="bg-schoolier-blue hover:bg-schoolier-dark-blue transition-colors font-spartan font-medium text-sm shadow-sm"
      >
        S'inscrire
      </Button>
    </div>
  );
};

export default AuthButtons;
