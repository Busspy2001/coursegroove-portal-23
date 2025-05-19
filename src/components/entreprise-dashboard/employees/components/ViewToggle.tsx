
import React from 'react';
import { LayoutGrid, LayoutList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion } from 'framer-motion';

interface ViewToggleProps {
  view: 'list' | 'grid';
  onToggleView: (view: 'list' | 'grid') => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ view, onToggleView }) => {
  const isMobile = useIsMobile();
  
  const toggleView = (newView: 'list' | 'grid') => {
    if (view !== newView) {
      onToggleView(newView);
    }
  };
  
  if (isMobile) {
    return (
      <div className="flex rounded-md border shadow-sm">
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 rounded-none rounded-l-md relative ${view === 'list' ? 'bg-muted' : ''}`}
          onClick={() => toggleView('list')}
          aria-label="Vue liste"
        >
          <LayoutList className="h-4 w-4" />
          {view === 'list' && (
            <motion.div 
              layoutId="viewIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 rounded-none rounded-r-md relative ${view === 'grid' ? 'bg-muted' : ''}`}
          onClick={() => toggleView('grid')}
          aria-label="Vue grille"
        >
          <LayoutGrid className="h-4 w-4" />
          {view === 'grid' && (
            <motion.div 
              layoutId="viewIndicator"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </Button>
      </div>
    );
  }
  
  return (
    <TooltipProvider>
      <div className="flex rounded-md border shadow-sm">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`px-3 h-9 rounded-none rounded-l-md relative ${view === 'list' ? 'bg-muted' : ''}`}
              onClick={() => toggleView('list')}
            >
              <LayoutList className="h-4 w-4 mr-2" />
              Liste
              {view === 'list' && (
                <motion.div 
                  layoutId="viewIndicatorDesktop"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Vue liste</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`px-3 h-9 rounded-none rounded-r-md relative ${view === 'grid' ? 'bg-muted' : ''}`}
              onClick={() => toggleView('grid')}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Grille
              {view === 'grid' && (
                <motion.div 
                  layoutId="viewIndicatorDesktop"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Vue grille</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
