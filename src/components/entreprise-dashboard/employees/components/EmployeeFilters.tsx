
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import { Department } from '@/services/supabase-business-data';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

interface EmployeeFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (filter: string) => void;
  departments: Department[];
}

export const EmployeeFilters = ({
  searchQuery,
  setSearchQuery,
  departmentFilter,
  setDepartmentFilter,
  departments
}: EmployeeFiltersProps) => {
  const isMobile = useIsMobile();
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  
  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(debouncedSearch);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [debouncedSearch, setSearchQuery]);

  const hasActiveFilters = departmentFilter !== 'all' || statusFilter !== 'all' || searchQuery !== '';

  const clearFilters = () => {
    setDebouncedSearch('');
    setSearchQuery('');
    setDepartmentFilter('all');
    setStatusFilter('all');
  };

  const filterCount = [
    departmentFilter !== 'all', 
    statusFilter !== 'all', 
    searchQuery !== ''
  ].filter(Boolean).length;

  return (
    <motion.div 
      className="space-y-4 mb-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un employé..."
            value={debouncedSearch}
            onChange={(e) => setDebouncedSearch(e.target.value)}
            className="pl-8 w-full transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {debouncedSearch && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-8 w-8"
              onClick={() => {
                setDebouncedSearch('');
                setSearchQuery('');
              }}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Effacer la recherche</span>
            </Button>
          )}
        </div>
        
        <div className="flex gap-3">
          <Select
            value={departmentFilter}
            onValueChange={setDepartmentFilter}
          >
            <SelectTrigger className="w-full md:w-[180px] transition-all focus:border-primary focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="Tous les départements" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto z-50">
              <SelectItem value="all">Tous les départements</SelectItem>
              {departments.map((department) => (
                <SelectItem key={department.id} value={department.id}>
                  {department.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Popover open={isAdvancedFilterOpen} onOpenChange={setIsAdvancedFilterOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 relative transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
                size={isMobile ? "icon" : "default"}
              >
                {isMobile ? (
                  <SlidersHorizontal className="h-4 w-4" />
                ) : (
                  <>
                    <Filter className="h-4 w-4" />
                    <span>Filtres</span>
                  </>
                )}
                
                {filterCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                    {filterCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 z-50" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filtres avancés</h4>
                  
                  {hasActiveFilters && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters} 
                      className="h-7 text-xs"
                    >
                      Réinitialiser
                    </Button>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Statut</label>
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les statuts" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Trier par</label>
                  <Select
                    value={sortBy}
                    onValueChange={setSortBy}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Nom</SelectItem>
                      <SelectItem value="department">Département</SelectItem>
                      <SelectItem value="date">Date d'ajout</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end pt-2">
                  <Button 
                    size="sm"
                    onClick={() => setIsAdvancedFilterOpen(false)}
                    className="transition-all"
                  >
                    Appliquer
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      {hasActiveFilters && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-wrap gap-2"
        >
          {searchQuery && (
            <Badge variant="outline" className="flex items-center gap-1 group hover:bg-muted transition-colors">
              <span>Recherche: {searchQuery}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0 opacity-60 group-hover:opacity-100" 
                onClick={() => {
                  setDebouncedSearch('');
                  setSearchQuery('');
                }}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Supprimer le filtre</span>
              </Button>
            </Badge>
          )}
          
          {departmentFilter !== 'all' && (
            <Badge variant="outline" className="flex items-center gap-1 group hover:bg-muted transition-colors">
              <span>Département: {departments.find(d => d.id === departmentFilter)?.name || ''}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0 opacity-60 group-hover:opacity-100" 
                onClick={() => setDepartmentFilter('all')}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Supprimer le filtre</span>
              </Button>
            </Badge>
          )}
          
          {statusFilter !== 'all' && (
            <Badge variant="outline" className="flex items-center gap-1 group hover:bg-muted transition-colors">
              <span>Statut: {statusFilter === 'active' ? 'Actif' : 'Inactif'}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 ml-1 p-0 opacity-60 group-hover:opacity-100" 
                onClick={() => setStatusFilter('all')}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Supprimer le filtre</span>
              </Button>
            </Badge>
          )}
          
          {(filterCount > 1) && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-7 hover:bg-muted transition-all" 
              onClick={clearFilters}
            >
              Effacer tous les filtres
            </Button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};
