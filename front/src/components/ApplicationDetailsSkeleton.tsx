import React from 'react';

export function ApplicationDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-lg animate-pulse"></div>
              <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
          <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start space-x-6">
                <div className="w-24 h-24 bg-gray-300 rounded-xl animate-pulse"></div>
                <div className="flex-1 space-y-3">
                  <div className="w-48 h-8 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-24 h-6 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div className="w-full h-12 bg-gray-300 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="w-32 h-6 bg-gray-300 rounded animate-pulse mb-4"></div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Screenshots */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="w-32 h-6 bg-gray-300 rounded animate-pulse mb-4"></div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-video bg-gray-300 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* App Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="w-32 h-6 bg-gray-300 rounded animate-pulse mb-4"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Apps */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="w-40 h-6 bg-gray-300 rounded animate-pulse mb-4"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
                      <div className="w-16 h-3 bg-gray-300 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
