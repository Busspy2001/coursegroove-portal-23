
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
      <div className="flex rounded-md border">
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 rounded-none rounded-l-md ${view === 'list' ? 'bg-muted' : ''}`}
          onClick={() => toggleView('list')}
        >
          <LayoutList className="h-4 w-4" />
          <span className="sr-only">Vue liste</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`h-8 rounded-none rounded-r-md ${view === 'grid' ? 'bg-muted' : ''}`}
          onClick={() => toggleView('grid')}
        >
          <LayoutGrid className="h-4 w-4" />
          <span className="sr-only">Vue grille</span>
        </Button>
      </div>
    );
  }
  
  return (
    <TooltipProvider>
      <div className="flex rounded-md border">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`px-3 h-9 rounded-none rounded-l-md ${view === 'list' ? 'bg-muted' : ''}`}
              onClick={() => toggleView('list')}
            >
              <LayoutList className="h-4 w-4 mr-2" />
              Liste
            </Button>
          </TooltipTrigger>
          <TooltipContent>Vue liste</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`px-3 h-9 rounded-none rounded-r-md ${view === 'grid' ? 'bg-muted' : ''}`}
              onClick={() => toggleView('grid')}
            >
              <LayoutGrid className="h-4 w-4 mr-2" />
              Grille
            </Button>
          </TooltipTrigger>
          <TooltipContent>Vue grille</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
