
import React from 'react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { Department } from '@/services/supabase-business-data';

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
  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher un employé..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8 w-full"
        />
      </div>
      
      <Select
        value={departmentFilter}
        onValueChange={setDepartmentFilter}
      >
        <SelectTrigger className="w-full md:w-[200px]">
          <SelectValue placeholder="Tous les départements" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Tous les départements</SelectItem>
          {departments.map((department) => (
            <SelectItem key={department.id} value={department.id}>
              {department.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
