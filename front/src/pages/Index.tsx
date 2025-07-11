
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, Download, Star, Users, Gamepad2, Settings, BookOpen, MessageCircle, Briefcase, Camera, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useCategories, useApplications } from "@/hooks/useApi";
import { CategoryData, ApplicationData } from "@/types/api";
import { AppPagination, PageSizeSelector } from "@/components/AppPagination";
import { LanguageSelector } from "@/components/LanguageSelector";

// Icon mapping for categories
const iconMap: Record<string, any> = {
  Gamepad2,
  Settings,
  MessageCircle,
  BookOpen,
  Briefcase,
  Camera,
};

// Default fallback categories for when API is loading or fails
const defaultCategories = [
  { id: "games", name: "Jeux", icon: "Gamepad2", color: "bg-purple-500" },
  { id: "utilities", name: "Utilitaires", icon: "Settings", color: "bg-blue-500" },
  { id: "social", name: "Social", icon: "MessageCircle", color: "bg-green-500" },
  { id: "education", name: "Éducation", icon: "BookOpen", color: "bg-orange-500" },
  { id: "business", name: "Business", icon: "Briefcase", color: "bg-gray-500" },
  { id: "photo", name: "Photo", icon: "Camera", color: "bg-pink-500" }
];

const Index = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const { toast } = useToast();

  // API calls
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const { data: applicationsResponse, isLoading: applicationsLoading, error: applicationsError } = useApplications({
    categoryId: selectedCategory !== "all" ? parseInt(selectedCategory) : undefined,
    pagination: { page: 1, pageSize: 100 }, // Get all applications for client-side filtering
  });

  // Use API data or fallback to default categories
  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  // Extract all applications from response
  const allApplications = applicationsResponse?.data || [];

  // Client-side filtering for search and pagination (optimized with useMemo)
  const filteredApplications = useMemo(() => {
    return allApplications.filter(app => {
      const matchesSearch = !searchTerm ||
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.description.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
  }, [allApplications, searchTerm]);

  // Client-side pagination (optimized with useMemo)
  const { applications, pagination } = useMemo(() => {
    const totalFiltered = filteredApplications.length;
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedApps = filteredApplications.slice(startIndex, endIndex);

    return {
      applications: paginatedApps,
      pagination: {
        page: currentPage,
        pageSize: pageSize,
        pageCount: Math.ceil(totalFiltered / pageSize),
        total: totalFiltered
      }
    };
  }, [filteredApplications, currentPage, pageSize]);

  const handleDownload = (app: ApplicationData) => {
    toast({
      title: t('downloadStarted'),
      description: t('downloadMessage', { name: app.name }),
    });
    window.open(app.downloadUrl, '_blank');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Loading state
  if (categoriesLoading || applicationsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Chargement...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (categoriesError || applicationsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Erreur de chargement</h2>
          <p className="text-gray-600">
            {categoriesError?.message || applicationsError?.message || "Une erreur est survenue"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex-shrink-0"></div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">{t('TAKE CARE')}</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <nav className="hidden lg:flex items-center space-x-6">

              </nav>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Search Bar */}
        <div className="mb-6 sm:mb-8">
          <div className="relative max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <Input
              type="text"
              placeholder={t('search')}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-10 py-2.5 sm:py-3 text-base sm:text-lg w-full"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Effacer la recherche"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800 px-2 sm:px-0">Catégories</h2>
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-2 sm:gap-3 min-w-max px-2 sm:px-0">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => handleCategoryChange("all")}
                className="flex items-center space-x-2 whitespace-nowrap text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5"
              >
                <span>{t('allCategories')}</span>
              </Button>
              {displayCategories.map((category) => {
                const Icon = typeof category.icon === 'string'
                  ? iconMap[category.icon] || Settings
                  : category.icon || Settings;
                const categoryId = category.id.toString();

                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === categoryId ? "default" : "outline"}
                    onClick={() => handleCategoryChange(categoryId)}
                    className="flex items-center space-x-1 sm:space-x-2 whitespace-nowrap text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-2.5"
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">{category.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {searchTerm ? t('searchResults', { query: searchTerm }) : t('popularApps')}
              </h2>
              {searchTerm && (
                <p className="text-sm text-gray-600 mt-1">
                  {pagination.total} application{pagination.total > 1 ? 's' : ''} trouvée{pagination.total > 1 ? 's' : ''}
                </p>
              )}
            </div>
            <PageSizeSelector
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>

          {applications.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? t('noResults') : 'Aucune application disponible'}
              </h3>
              <p className="text-gray-600">
                {searchTerm
                  ? t('noResultsMessage', { query: searchTerm })
                  : t('noAppsInCategory')
                }
              </p>
              {searchTerm && (
                <Button
                  variant="outline"
                  onClick={() => handleSearchChange('')}
                  className="mt-4"
                >
                  {t('clearSearch')}
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {applications.map((app) => (
              <Card key={app.id} className="hover:shadow-lg transition-all duration-300 bg-white cursor-pointer hover:scale-[1.02]">
                <Link to={`/app/${app.documentId}`} className="block">
                  <CardHeader className="pb-3 p-4 sm:p-6">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      <img
                        src={app.logo}
                        alt={app.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover shadow-md flex-shrink-0"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/default-app-logo.svg';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg font-semibold text-gray-900 truncate hover:text-blue-600 transition-colors">
                          {app.name}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                          {app.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{app.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{app.downloads}</span>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 capitalize">
                        {app.category?.name || 'Non catégorisé'}
                      </span>
                    </div>
                  </CardContent>
                </Link>
                <CardContent className="pt-0 p-4 sm:p-6">
                  <Button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm sm:text-base py-2 sm:py-2.5"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDownload(app);
                    }}
                  >
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    {t('download')}
                  </Button>
                </CardContent>
              </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.pageCount > 1 && (
            <div className="mt-6 sm:mt-8 px-2 sm:px-0">
              <AppPagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center py-6 sm:py-8 text-gray-600 px-4 sm:px-6 lg:px-8">
          <p className="text-sm sm:text-base">&copy; 2024 AppStore. Découvrez les meilleures applications.</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
