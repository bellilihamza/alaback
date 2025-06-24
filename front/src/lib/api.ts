import axios, { AxiosInstance, AxiosError } from 'axios';
import {
  StrapiResponse,
  StrapiSingleResponse,
  Category,
  Application,
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

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: `${API_BASE_URL}/api`,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): ApiError {
    const apiError: ApiError = {
      message: 'An unexpected error occurred',
      status: error.response?.status,
      details: error.response?.data,
    };

    if (error.response) {
      // Server responded with error status
      apiError.message = error.response.data?.error?.message || 
                        error.response.statusText || 
                        `HTTP ${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      apiError.message = 'Network error - please check your connection';
    } else {
      // Something else happened
      apiError.message = error.message || 'Request failed';
    }

    console.error('API Error:', apiError);
    return apiError;
  }

  // Transform Strapi response to our format
  private transformCategory(category: Category): CategoryData {
    return {
      id: category.id,
      name: category.name,
      icon: category.icon,
      color: category.color,
    };
  }

  private transformApplication(application: Application): ApplicationData {
    // Transform relative URLs to absolute URLs
    const getImageUrl = (url?: string) => {
      if (!url) {
        return '/default-app-logo.svg';
      }
      if (url.startsWith('http')) {
        return url; // Already absolute
      }
      return `${API_BASE_URL}${url}`; // Make relative URL absolute
    };

    // Transform screenshots URLs
    const transformScreenshots = (screenshots?: StrapiMedia[]): string[] => {
      if (!screenshots || !Array.isArray(screenshots)) return [];
      return screenshots.map(screenshot => getImageUrl(screenshot.url)).filter(Boolean);
    };

    return {
      id: application.id,
      documentId: application.documentId,
      name: application.name,
      description: application.description,
      downloadUrl: application.downloadUrl,
      logo: getImageUrl(application.logo?.url),
      rating: application.rating,
      downloads: application.downloads,
      fullDescription: application.fullDescription,
      screenshots: transformScreenshots(application.screenshots),
      version: application.version,
      fileSize: application.fileSize,
      systemRequirements: application.systemRequirements,
      lastUpdated: application.lastUpdated,
      features: application.features,
      category: application.category
        ? this.transformCategory(application.category)
        : undefined,
    };
  }

  // Categories API
  async getCategories(): Promise<CategoryData[]> {
    const response = await this.client.get<StrapiResponse<Category[]>>('/categories');
    return response.data.data.map(this.transformCategory);
  }

  async getCategory(id: number): Promise<CategoryData> {
    const response = await this.client.get<{ data: Category }>(`/categories/${id}`);
    return this.transformCategory(response.data.data);
  }

  async createCategory(data: CreateCategoryData): Promise<CategoryData> {
    const response = await this.client.post<{ data: Category }>('/categories', {
      data,
    });
    return this.transformCategory(response.data.data);
  }

  async updateCategory(id: number, data: UpdateCategoryData): Promise<CategoryData> {
    const response = await this.client.put<{ data: Category }>(`/categories/${id}`, {
      data,
    });
    return this.transformCategory(response.data.data);
  }

  async deleteCategory(id: number): Promise<void> {
    await this.client.delete(`/categories/${id}`);
  }

  // Applications API
  async getApplications(params?: {
    populate?: string;
    filters?: Record<string, any>;
    pagination?: PaginationParams;
  }): Promise<{ data: ApplicationData[]; pagination: PaginationInfo }> {
    const response = await this.client.get<StrapiResponse<Application[]>>('/applications', {
      params: {
        populate: {
          category: true,
          logo: true
        },
        ...params?.filters && { filters: params.filters },
        ...params?.pagination && {
          'pagination[page]': params.pagination.page || 1,
          'pagination[pageSize]': params.pagination.pageSize || 6,
        },
      },
    });

    return {
      data: response.data.data.map(this.transformApplication.bind(this)),
      pagination: response.data.meta.pagination
    };
  }

  async getApplication(id: number | string): Promise<ApplicationData> {
    const response = await this.client.get<{ data: Application }>(`/applications/${id}`, {
      params: {
        populate: {
          category: true,
          logo: true,
          screenshots: true
        }
      }
    });
    return this.transformApplication(response.data.data);
  }

  async createApplication(data: CreateApplicationData): Promise<ApplicationData> {
    const response = await this.client.post<{ data: Application }>('/applications', {
      data,
    });
    return this.transformApplication(response.data.data);
  }

  async updateApplication(id: number, data: UpdateApplicationData): Promise<ApplicationData> {
    const response = await this.client.put<{ data: Application }>(`/applications/${id}`, {
      data,
    });
    return this.transformApplication(response.data.data);
  }

  async deleteApplication(id: number): Promise<void> {
    await this.client.delete(`/applications/${id}`);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
