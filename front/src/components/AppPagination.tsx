import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { PaginationInfo } from '@/types/api';

interface AppPaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  className?: string;
}

export function AppPagination({ pagination, onPageChange, className = '' }: AppPaginationProps) {
  const { page, pageCount, total, pageSize } = pagination;

  // Calculer les pages à afficher
  const getVisiblePages = () => {
    const delta = 2; // Nombre de pages à afficher de chaque côté de la page actuelle
    const range = [];
    const rangeWithDots = [];

    // Si on a peu de pages, on les affiche toutes
    if (pageCount <= 7) {
      for (let i = 1; i <= pageCount; i++) {
        range.push(i);
      }
      return range;
    }

    // Sinon, on utilise la logique avec des points de suspension
    for (let i = Math.max(2, page - delta); i <= Math.min(pageCount - 1, page + delta); i++) {
      range.push(i);
    }

    if (page - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (page + delta < pageCount - 1) {
      rangeWithDots.push('...', pageCount);
    } else if (pageCount > 1) {
      rangeWithDots.push(pageCount);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  if (pageCount <= 1) return null;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Informations sur les résultats */}
      <div className="text-sm text-gray-600 text-center">
        Affichage de {((page - 1) * pageSize) + 1} à {Math.min(page * pageSize, total)} sur {total} applications
      </div>

      {/* Navigation pagination */}
      <Pagination>
        <PaginationContent>
          {/* Bouton Précédent */}
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => page > 1 && onPageChange(page - 1)}
              className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>

          {/* Numéros de pages */}
          {visiblePages.map((pageNum, index) => (
            <PaginationItem key={index}>
              {pageNum === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  onClick={() => onPageChange(pageNum as number)}
                  isActive={pageNum === page}
                  className="cursor-pointer"
                >
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Bouton Suivant */}
          <PaginationItem>
            <PaginationNext 
              onClick={() => page < pageCount && onPageChange(page + 1)}
              className={page >= pageCount ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

// Composant pour sélectionner la taille de page
interface PageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
  options?: number[];
  className?: string;
}

export function PageSizeSelector({ 
  pageSize, 
  onPageSizeChange, 
  options = [6, 12, 24],
  className = '' 
}: PageSizeSelectorProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm text-gray-600">Afficher :</span>
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        {options.map((size) => (
          <option key={size} value={size}>
            {size} par page
          </option>
        ))}
      </select>
    </div>
  );
}
