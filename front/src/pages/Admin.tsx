
import { useState } from "react";
import { Plus, Edit, Trash2, Save, X, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  useCategories,
  useApplications,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useCreateApplication,
  useUpdateApplication,
  useDeleteApplication
} from "@/hooks/useApi";
import { CategoryData, ApplicationData } from "@/types/api";



const Admin = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'categories' | 'apps'>('categories');
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingApp, setIsAddingApp] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);
  const [editingApp, setEditingApp] = useState<ApplicationData | null>(null);

  // API hooks
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const { data: applications = [], isLoading: applicationsLoading, error: applicationsError } = useApplications();

  // Mutation hooks
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();
  const createApplicationMutation = useCreateApplication();
  const updateApplicationMutation = useUpdateApplication();
  const deleteApplicationMutation = useDeleteApplication();

  const [newCategory, setNewCategory] = useState({ name: "", icon: "", color: "bg-blue-500" });
  const [newApp, setNewApp] = useState({
    name: "",
    description: "",
    category: "",
    rating: 0,
    downloads: "",
    logo: "",
    downloadUrl: ""
  });

  const handleAddCategory = async () => {
    if (!newCategory.name) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir le nom de la catégorie.",
        variant: "destructive"
      });
      return;
    }

    try {
      await createCategoryMutation.mutateAsync({
        name: newCategory.name,
        icon: newCategory.icon || undefined,
        color: newCategory.color
      });

      setNewCategory({ name: "", icon: "", color: "bg-blue-500" });
      setIsAddingCategory(false);
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  const handleAddApp = async () => {
    if (!newApp.name || !newApp.description || !newApp.downloadUrl) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    try {
      await createApplicationMutation.mutateAsync({
        name: newApp.name,
        description: newApp.description,
        downloadUrl: newApp.downloadUrl,
        logo: newApp.logo || undefined,
        rating: Number(newApp.rating) || 0,
        downloads: newApp.downloads || undefined,
        category: newApp.category ? parseInt(newApp.category) : undefined
      });

      setNewApp({
        name: "",
        description: "",
        category: "",
        rating: 0,
        downloads: "",
        logo: "",
        downloadUrl: ""
      });
      setIsAddingApp(false);
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategoryMutation.mutateAsync(id);
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  const handleDeleteApp = async (id: number) => {
    try {
      await deleteApplicationMutation.mutateAsync(id);
    } catch (error) {
      // Error is handled by the mutation hook
    }
  };

  // Loading state
  if (categoriesLoading || applicationsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => window.location.href = '/'}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <Button
              variant={activeTab === 'categories' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('categories')}
              className="rounded-md"
            >
              Catégories
            </Button>
            <Button
              variant={activeTab === 'apps' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('apps')}
              className="rounded-md"
            >
              Applications
            </Button>
          </div>
        </div>

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Gestion des Catégories</h2>
              <Button onClick={() => setIsAddingCategory(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une catégorie
              </Button>
            </div>

            {/* Add Category Form */}
            {isAddingCategory && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Nouvelle Catégorie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="categoryName">Nom de la catégorie *</Label>
                    <Input
                      id="categoryName"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                      placeholder="Ex: Jeux"
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoryIcon">Icône (nom Lucide) *</Label>
                    <Input
                      id="categoryIcon"
                      value={newCategory.icon}
                      onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                      placeholder="Ex: Gamepad2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoryColor">Couleur</Label>
                    <select 
                      id="categoryColor"
                      value={newCategory.color}
                      onChange={(e) => setNewCategory({...newCategory, color: e.target.value})}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="bg-blue-500">Bleu</option>
                      <option value="bg-green-500">Vert</option>
                      <option value="bg-purple-500">Violet</option>
                      <option value="bg-orange-500">Orange</option>
                      <option value="bg-pink-500">Rose</option>
                      <option value="bg-gray-500">Gris</option>
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddCategory}>
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingCategory(false)}>
                      <X className="w-4 h-4 mr-2" />
                      Annuler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Categories List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${category.color} rounded-lg flex items-center justify-center text-white`}>
                          {category.icon.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium">{category.name}</h3>
                          <p className="text-sm text-gray-500">{category.id}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Apps Tab */}
        {activeTab === 'apps' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Gestion des Applications</h2>
              <Button onClick={() => setIsAddingApp(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Ajouter une application
              </Button>
            </div>

            {/* Add App Form */}
            {isAddingApp && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Nouvelle Application</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="appName">Nom de l'application *</Label>
                      <Input
                        id="appName"
                        value={newApp.name}
                        onChange={(e) => setNewApp({...newApp, name: e.target.value})}
                        placeholder="Ex: PhotoMaster Pro"
                      />
                    </div>
                    <div>
                      <Label htmlFor="appCategory">Catégorie *</Label>
                      <select 
                        id="appCategory"
                        value={newApp.category}
                        onChange={(e) => setNewApp({...newApp, category: e.target.value})}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="">Sélectionner une catégorie</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id.toString()}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="appDescription">Description *</Label>
                    <Input
                      id="appDescription"
                      value={newApp.description}
                      onChange={(e) => setNewApp({...newApp, description: e.target.value})}
                      placeholder="Description courte de l'application"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="appRating">Note (0-5)</Label>
                      <Input
                        id="appRating"
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={newApp.rating}
                        onChange={(e) => setNewApp({...newApp, rating: Number(e.target.value)})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="appDownloads">Téléchargements</Label>
                      <Input
                        id="appDownloads"
                        value={newApp.downloads}
                        onChange={(e) => setNewApp({...newApp, downloads: e.target.value})}
                        placeholder="Ex: 10M+"
                      />
                    </div>
                    <div>
                      <Label htmlFor="appLogo">URL du logo</Label>
                      <Input
                        id="appLogo"
                        value={newApp.logo}
                        onChange={(e) => setNewApp({...newApp, logo: e.target.value})}
                        placeholder="URL de l'image"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="appDownloadUrl">URL de téléchargement *</Label>
                    <Input
                      id="appDownloadUrl"
                      value={newApp.downloadUrl}
                      onChange={(e) => setNewApp({...newApp, downloadUrl: e.target.value})}
                      placeholder="https://example.com/download/app"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleAddApp}>
                      <Save className="w-4 h-4 mr-2" />
                      Sauvegarder
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingApp(false)}>
                      <X className="w-4 h-4 mr-2" />
                      Annuler
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Apps List */}
            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={app.logo}
                          alt={app.name}
                          className="w-12 h-12 rounded-lg object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/default-app-logo.svg';
                          }}
                        />
                        <div>
                          <h3 className="font-medium">{app.name}</h3>
                          <p className="text-sm text-gray-500">{app.description}</p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
                            <span>Catégorie: {app.category?.name || 'Non catégorisé'}</span>
                            <span>Note: {app.rating || 0}</span>
                            <span>{app.downloads || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteApp(app.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
