import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import {
  CategoryData,
  ApplicationData,
  CreateCategoryData,
  UpdateCategoryData,
  CreateApplicationData,
  UpdateApplicationData,
  ApiError,
  PaginationParams,
  PaginationInfo,
} from '@/types/api';
import { useToast } from '@/hooks/use-toast';

// Query Keys
export const queryKeys = {
  categories: ['categories'] as const,
  category: (id: number) => ['categories', id] as const,
  applications: ['applications'] as const,
  application: (id: number) => ['applications', id] as const,
  applicationsByCategory: (categoryId: number) => ['applications', 'category', categoryId] as const,
};

// Categories Hooks
export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: () => apiClient.getCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCategory(id: number) {
  return useQuery({
    queryKey: queryKeys.category(id),
    queryFn: () => apiClient.getCategory(id),
    enabled: !!id,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateCategoryData) => apiClient.createCategory(data),
    onSuccess: (newCategory) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      toast({
        title: 'Succès',
        description: `Catégorie "${newCategory.name}" créée avec succès.`,
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCategoryData }) =>
      apiClient.updateCategory(id, data),
    onSuccess: (updatedCategory) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      queryClient.invalidateQueries({ queryKey: queryKeys.category(updatedCategory.id) });
      toast({
        title: 'Succès',
        description: `Catégorie "${updatedCategory.name}" mise à jour avec succès.`,
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) => apiClient.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories });
      toast({
        title: 'Succès',
        description: 'Catégorie supprimée avec succès.',
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// Applications Hooks
export function useApplications(params?: {
  categoryId?: number;
  search?: string;
  pagination?: PaginationParams;
}) {
  const filters: Record<string, any> = {};

  if (params?.categoryId) {
    filters.category = { id: { $eq: params.categoryId } };
  }

  if (params?.search) {
    filters.$or = [
      { name: { $containsi: params.search } },
      { description: { $containsi: params.search } },
    ];
  }

  return useQuery({
    queryKey: [...queryKeys.applications, params],
    queryFn: () => apiClient.getApplications({
      populate: 'category',
      ...(Object.keys(filters).length > 0 && { filters }),
      pagination: params?.pagination || { page: 1, pageSize: 6 },
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useApplication(id: number | string) {
  return useQuery({
    queryKey: queryKeys.application(id),
    queryFn: () => apiClient.getApplication(id),
    enabled: !!id,
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: CreateApplicationData) => apiClient.createApplication(data),
    onSuccess: (newApplication) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.applications });
      toast({
        title: 'Succès',
        description: `Application "${newApplication.name}" créée avec succès.`,
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useUpdateApplication() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateApplicationData }) =>
      apiClient.updateApplication(id, data),
    onSuccess: (updatedApplication) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.applications });
      queryClient.invalidateQueries({ queryKey: queryKeys.application(updatedApplication.id) });
      toast({
        title: 'Succès',
        description: `Application "${updatedApplication.name}" mise à jour avec succès.`,
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useDeleteApplication() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: number) => apiClient.deleteApplication(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.applications });
      toast({
        title: 'Succès',
        description: 'Application supprimée avec succès.',
      });
    },
    onError: (error: ApiError) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
