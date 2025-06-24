# 🚀 AppStore - Application Store Platform

A modern, full-stack application store built with **Strapi v5** backend and **React** frontend. Features a complete application management system with multilingual support, advanced search, pagination, and detailed application pages.

## ✨ Features

### 🎯 Core Functionality
- **Application Management** - Complete CRUD operations for applications
- **Category System** - Organize applications by categories
- **Advanced Search** - Real-time search with filtering
- **Pagination** - Efficient data loading with customizable page sizes
- **Application Details** - Comprehensive application information pages

### 🌐 User Experience
- **Multilingual Support** - French and English interface
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Modern UI** - Built with shadcn/ui components
- **Image Gallery** - Screenshot galleries with modal view
- **Breadcrumb Navigation** - Intuitive navigation system

### 🔧 Technical Features
- **TypeScript** - Full type safety across the stack
- **React Query** - Efficient data fetching and caching
- **i18next** - Internationalization framework
- **Strapi v5** - Headless CMS with modern API
- **Vite** - Fast development and build tool

## 🏗️ Architecture

```
ala/
├── backend/          # Strapi v5 Backend
│   ├── src/
│   │   ├── api/      # API endpoints
│   │   └── config/   # Configuration files
│   └── package.json
├── front/            # React Frontend
│   ├── src/
│   │   ├── components/  # UI Components
│   │   ├── pages/       # Page Components
│   │   ├── hooks/       # Custom Hooks
│   │   ├── lib/         # Utilities
│   │   ├── types/       # TypeScript Types
│   │   └── i18n/        # Internationalization
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Backend Setup (Strapi)
```bash
cd backend
npm install
npm run develop
```
The backend will be available at `http://localhost:1337`

### Frontend Setup (React)
```bash
cd front
npm install
npm run dev
```
The frontend will be available at `http://localhost:8081`

### Admin Panel
Access the Strapi admin panel at `http://localhost:1337/admin` to manage applications and categories.

## 📱 Application Structure

### Backend (Strapi v5)
- **Applications API** - Manage app data with rich content
- **Categories API** - Organize applications
- **Media Management** - Handle logos and screenshots
- **Content Types** - Structured data models

### Frontend (React + TypeScript)
- **Home Page** - Application listing with search and filters
- **Application Details** - Comprehensive app information
- **Admin Interface** - Content management
- **Language Selector** - Switch between French/English

## 🌟 Key Components

### Application Features
- **Rich Descriptions** - HTML content with formatting
- **Screenshots Gallery** - Multiple images with modal view
- **System Requirements** - Detailed compatibility info
- **Version Information** - Track app versions and updates
- **Download Statistics** - User engagement metrics

### User Interface
- **Search & Filter** - Find applications quickly
- **Category Navigation** - Browse by application type
- **Responsive Cards** - Modern application cards
- **Loading States** - Skeleton components for better UX

## 🔧 Technologies Used

### Backend
- **Strapi v5** - Headless CMS
- **Node.js** - Runtime environment
- **SQLite** - Database (development)
- **TypeScript** - Type safety

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **React Query** - Data fetching
- **React Router** - Navigation
- **i18next** - Internationalization

## 📄 API Endpoints

### Applications
- `GET /api/applications` - List all applications
- `GET /api/applications/:id` - Get application details
- `POST /api/applications` - Create new application
- `PUT /api/applications/:id` - Update application
- `DELETE /api/applications/:id` - Delete application

### Categories
- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get category details
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

## 🌐 Internationalization

The application supports multiple languages:
- **French (fr)** - Default language
- **English (en)** - Secondary language

Language detection is automatic based on browser settings, with manual override available.

## 🎨 UI Components

Built with modern, accessible components:
- **Cards** - Application and category displays
- **Buttons** - Various styles and states
- **Forms** - Input fields and validation
- **Navigation** - Breadcrumbs and menus
- **Modals** - Image galleries and dialogs
- **Pagination** - Data navigation
- **Dropdowns** - Language and filter selectors

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Hamza Bellili**
- GitHub: [@bellilihamza](https://github.com/bellilihamza)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/bellilihamza/ala/issues).

---

Built with ❤️ using modern web technologies
# alaback
