
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Search } from "lucide-react";
import { motion } from "framer-motion";

const EmptyCourseState = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="p-8 text-center border-dashed border-2 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="mb-6 flex justify-center">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 0.5,
              delay: 0.2,
              type: "spring",
              stiffness: 100 
            }}
            className="relative"
          >
            <div className="absolute -inset-1 rounded-full bg-blue-100 dark:bg-blue-900/30 blur-sm" />
            <div className="relative bg-white dark:bg-slate-800 rounded-full p-4">
              <BookOpen className="h-12 w-12 text-schoolier-blue" />
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-2">C'est un peu vide par ici...</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Vous n'êtes inscrit à aucun cours pour le moment. Explorez notre catalogue et commencez votre parcours d'apprentissage dès aujourd'hui !
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => navigate("/courses")}
              size="lg"
              className="bg-schoolier-blue hover:bg-schoolier-blue/90"
            >
              <Search className="mr-2 h-4 w-4" />
              Découvrir les cours
            </Button>
          </div>
        </motion.div>
      </Card>
    </motion.div>
  );
};

export default EmptyCourseState;
