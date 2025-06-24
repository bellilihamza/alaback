// API Response Types
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Pagination Types
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: {};
}

// Category Types - Strapi v5 format
export interface Category {
  id: number;
  documentId: string;
  name: string;
  icon?: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CategoryData {
  id: number;
  name: string;
  icon?: string;
  color?: string;
}

// Media Types
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
  formats?: any;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
}

// Application Types - Strapi v5 format
export interface Application {
  id: number;
  documentId: string;
  name: string;
  description: string;
  downloadUrl: string;
  logo?: StrapiMedia;
  rating?: number;
  downloads?: string;
  fullDescription?: string;
  screenshots?: StrapiMedia[];
  version?: string;
  fileSize?: string;
  systemRequirements?: string;
  lastUpdated?: string;
  features?: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  category?: Category;
}

export interface ApplicationData {
  id: number;
  documentId: string;
  name: string;
  description: string;
  downloadUrl: string;
  logo?: string;
  rating?: number;
  downloads?: string;
  fullDescription?: string;
  screenshots?: string[];
  version?: string;
  fileSize?: string;
  systemRequirements?: string;
  lastUpdated?: string;
  features?: string[];
  category?: CategoryData;
}

// Create/Update Types
export interface CreateCategoryData {
  name: string;
  icon?: string;
  color?: string;
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {}

export interface CreateApplicationData {
  name: string;
  description: string;
  downloadUrl: string;
  logo?: string;
  rating?: number;
  downloads?: string;
  category?: number; // Category ID
}

export interface UpdateApplicationData extends Partial<CreateApplicationData> {}

// API Error Type
export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}
