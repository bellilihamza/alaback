import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traductions françaises
const fr = {
  translation: {
    // Navigation et Header
    appStore: 'AppStore',
    home: 'Accueil',
    admin: 'Administration',
    back: 'Retour',
    previous: 'Précédent',
    next: 'Suivant',
    
    // Recherche et Filtres
    search: 'Rechercher des applications...',
    searchResults: 'Résultats pour "{{query}}"',
    clearSearch: 'Effacer la recherche',
    allCategories: 'Toutes',
    noResults: 'Aucun résultat trouvé',
    noResultsMessage: 'Aucune application ne correspond à "{{query}}". Essayez avec d\'autres mots-clés.',
    noAppsInCategory: 'Il n\'y a pas d\'applications dans cette catégorie pour le moment.',
    
    // Applications
    popularApps: 'Applications Populaires',
    download: 'Télécharger',
    downloadStarted: 'Téléchargement démarré',
    downloadMessage: '{{name}} va être téléchargé depuis le store officiel.',
    rating: 'Note',
    downloads: 'Téléchargements',
    version: 'Version',
    size: 'Taille',
    lastUpdated: 'Dernière mise à jour',
    systemRequirements: 'Configuration requise',
    
    // Page de détails
    description: 'Description',
    features: 'Fonctionnalités principales',
    screenshots: 'Captures d\'écran',
    information: 'Informations',
    similarApps: 'Applications similaires',
    share: 'Partager',
    favorite: 'Favoris',
    website: 'Site web',
    
    // Messages
    linkCopied: 'Lien copié',
    linkCopiedMessage: 'Le lien de l\'application a été copié dans le presse-papiers.',
    appNotFound: 'Application non trouvée',
    appNotFoundMessage: 'L\'application que vous recherchez n\'existe pas ou a été supprimée.',
    
    // Pagination
    showing: 'Affichage de {{start}} à {{end}} sur {{total}} applications',
    showPerPage: 'Afficher :',
    perPage: '{{count}} par page',
    
    // Dates
    notSpecified: 'Non spécifié',
    
    // Catégories
    categories: {
      games: 'Jeux',
      utilities: 'Utilitaires',
      productivity: 'Productivité',
      education: 'Éducation',
      multimedia: 'Multimédia'
    },
    
    // Footer
    footerText: 'Découvrez et téléchargez les meilleures applications pour votre ordinateur.',
    
    // Langue
    language: 'Langue',
    french: 'Français',
    english: 'English'
  }
};

// Traductions anglaises
const en = {
  translation: {
    // Navigation et Header
    appStore: 'AppStore',
    home: 'Home',
    admin: 'Admin',
    back: 'Back',
    previous: 'Previous',
    next: 'Next',
    
    // Recherche et Filtres
    search: 'Search applications...',
    searchResults: 'Results for "{{query}}"',
    clearSearch: 'Clear search',
    allCategories: 'All',
    noResults: 'No results found',
    noResultsMessage: 'No applications match "{{query}}". Try different keywords.',
    noAppsInCategory: 'There are no applications in this category at the moment.',
    
    // Applications
    popularApps: 'Popular Applications',
    download: 'Download',
    downloadStarted: 'Download started',
    downloadMessage: '{{name}} will be downloaded from the official store.',
    rating: 'Rating',
    downloads: 'Downloads',
    version: 'Version',
    size: 'Size',
    lastUpdated: 'Last updated',
    systemRequirements: 'System Requirements',
    
    // Page de détails
    description: 'Description',
    features: 'Key Features',
    screenshots: 'Screenshots',
    information: 'Information',
    similarApps: 'Similar Apps',
    share: 'Share',
    favorite: 'Favorite',
    website: 'Website',
    
    // Messages
    linkCopied: 'Link copied',
    linkCopiedMessage: 'The application link has been copied to clipboard.',
    appNotFound: 'Application not found',
    appNotFoundMessage: 'The application you are looking for does not exist or has been removed.',
    
    // Pagination
    showing: 'Showing {{start}} to {{end}} of {{total}} applications',
    showPerPage: 'Show:',
    perPage: '{{count}} per page',
    
    // Dates
    notSpecified: 'Not specified',
    
    // Catégories
    categories: {
      games: 'Games',
      utilities: 'Utilities',
      productivity: 'Productivity',
      education: 'Education',
      multimedia: 'Multimedia'
    },
    
    // Footer
    footerText: 'Discover and download the best applications for your computer.',
    
    // Langue
    language: 'Language',
    french: 'Français',
    english: 'English'
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr,
      en
    },
    fallbackLng: 'fr',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    }
  });

export default i18n;
