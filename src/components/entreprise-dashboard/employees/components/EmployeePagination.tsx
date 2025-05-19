
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useIsMobile } from '@/hooks/use-mobile';

interface EmployeePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const EmployeePagination: React.FC<EmployeePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const isMobile = useIsMobile();
  
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    // On mobile, show fewer pages
    if (isMobile) {
      if (totalPages <= 3) {
        // If 3 or fewer pages, show all
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show current page and neighbors if possible
        if (currentPage > 1) {
          pages.push(currentPage - 1);
        }
        pages.push(currentPage);
        if (currentPage < totalPages) {
          pages.push(currentPage + 1);
        }
      }
    } else {
      // Desktop view - show more pages
      if (totalPages <= 5) {
        // If 5 or fewer pages, show all
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show first page, current page and neighbors, and last page
        pages.push(1);
        
        if (currentPage > 3) {
          pages.push('ellipsis');
        }
        
        // Show pages around the current page
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);
        
        for (let i = startPage; i <= endPage; i++) {
          pages.push(i);
        }
        
        if (currentPage < totalPages - 2) {
          pages.push('ellipsis');
        }
        
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }} 
            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        
        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === 'ellipsis' ? (
              <span className="flex h-9 w-9 items-center justify-center">...</span>
            ) : (
              <PaginationLink 
                href="#" 
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page as number);
                }}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }} 
            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
