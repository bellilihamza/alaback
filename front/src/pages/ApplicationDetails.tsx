import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Download,
  Star,
  Users,
  Calendar,
  HardDrive,
  Monitor,
  ArrowLeft,
  Share2,
  Heart,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useApplication, useApplications } from '@/hooks/useApi';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ImageGallery } from '@/components/ImageGallery';
import { ApplicationDetailsSkeleton } from '@/components/ApplicationDetailsSkeleton';
import { LanguageSelector } from '@/components/LanguageSelector';

const ApplicationDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: application, isLoading, error } = useApplication(id!);
  const { data: relatedAppsResponse } = useApplications({
    categoryId: application?.category?.id,
    pagination: { page: 1, pageSize: 6 }
  });

  const relatedApps = relatedAppsResponse?.data?.filter(app => app.id !== application?.id) || [];

  const handleDownload = () => {
    if (application) {
      toast({
        title: "Téléchargement démarré",
        description: `${application.name} va être téléchargé depuis le store officiel.`,
      });
      window.open(application.downloadUrl, '_blank');
    }
  };

  const handleShare = async () => {
    if (navigator.share && application) {
      try {
        await navigator.share({
          title: application.name,
          text: application.description,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Lien copié",
          description: "Le lien de l'application a été copié dans le presse-papiers.",
        });
      }
    } else if (application) {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié",
        description: "Le lien de l'application a été copié dans le presse-papiers.",
      });
    }
  };

  if (isLoading) {
    return <ApplicationDetailsSkeleton />;
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{t('appNotFound')}</h2>
          <p className="text-gray-600 mb-6">{t('appNotFoundMessage')}</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('home')}
          </Button>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    ...(application.category ? [{ label: application.category.name }] : []),
    { label: application.name }
  ];

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Non spécifié';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <Link to="/" className="text-2xl font-bold text-gray-900 hover:text-gray-700">
                {t('appStore')}
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate(-1)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('back')}
              </Button>
              <LanguageSelector />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Section */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-6">
                  <img
                    src={application.logo}
                    alt={application.name}
                    className="w-24 h-24 rounded-xl object-cover shadow-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/default-app-logo.svg';
                    }}
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{application.name}</h1>
                        {application.category && (
                          <Badge variant="secondary" className="mb-3">
                            {application.category.name}
                          </Badge>
                        )}
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{application.rating || 'N/A'}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{application.downloads || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={handleShare}>
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-4">
                  <Button
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={handleDownload}
                  >
                    <Download className="w-5 h-5 mr-2" />
                    {t('download')}
                  </Button>
                  <Button variant="outline" size="lg">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('website')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>{t('description')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  {application.fullDescription ? (
                    <div dangerouslySetInnerHTML={{ __html: application.fullDescription }} />
                  ) : (
                    <p>{application.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Features */}
            {application.features && application.features.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>{t('features')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {application.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Screenshots */}
            {application.screenshots && application.screenshots.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Captures d'écran</CardTitle>
                </CardHeader>
                <CardContent>
                  <ImageGallery 
                    images={application.screenshots} 
                    alt={application.name}
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* App Information */}
            <Card>
              <CardHeader>
                <CardTitle>Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Version</span>
                  <span className="font-medium">{application.version || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Taille</span>
                  <span className="font-medium">{application.fileSize || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Dernière mise à jour</span>
                  <span className="font-medium">{formatDate(application.lastUpdated)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Téléchargements</span>
                  <span className="font-medium">{application.downloads || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Note</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{application.rating || 'N/A'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Requirements */}
            {application.systemRequirements && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Monitor className="w-5 h-5" />
                    <span>Configuration requise</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 whitespace-pre-line">
                    {application.systemRequirements}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Related Apps */}
            {relatedApps.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Applications similaires</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedApps.slice(0, 3).map((app) => (
                    <Link
                      key={app.id}
                      to={`/app/${app.documentId}`}
                      className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img
                        src={app.logo}
                        alt={app.name}
                        className="w-12 h-12 rounded-lg object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/default-app-logo.svg';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">{app.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{app.rating || 'N/A'}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
