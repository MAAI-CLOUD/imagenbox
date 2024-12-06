import React, { useState } from 'react';
import { GalleryGrid } from '../components/GalleryGrid';
import { CreateGalleryModal } from '../components/CreateGalleryModal';
import { ShareModal } from '../components/ShareModal';
import { PhotoUploadModal } from '../components/PhotoUploadModal';
import { DeleteGalleryModal } from '../components/DeleteGalleryModal';
import { GalleryResponse } from '../types/gallery';
import { Plus, Images, LogOut } from 'lucide-react';
import { useAuth } from '../components/AuthContext';
import { useGalleries } from '../hooks/useGalleries';
import { Navigate } from 'react-router-dom';
import { deleteGallery } from '../services/api';
import { toast } from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageToggle } from '../components/layout/LanguageToggle';

export function Dashboard() {
  const { t } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const { galleries, loading, refreshGalleries } = useGalleries();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState<GalleryResponse | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleDeleteGallery = async () => {
    if (!selectedGallery) return;
    
    setIsDeleting(true);
    try {
      await deleteGallery(selectedGallery.documentId);
      toast.success('Gallery deleted successfully');
      refreshGalleries();
      setShowDeleteModal(false);
      setSelectedGallery(null);
    } catch (error) {
      toast.error('Failed to delete gallery');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Images className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t('nav.galleries')}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors text-sm sm:text-base"
            >
              <Plus size={20} />
              {t('gallery.create')}
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
              title="Logout"
            >
              <LogOut size={20} />
              <span>{t('auth.logout')}</span>
            </button>
            <button className="flex items-center">
              <LanguageToggle />
            </button>
          </div>
        </div>
      </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <GalleryGrid 
            galleries={galleries}
            loading={loading}
            onShare={(gallery) => {
              setSelectedGallery(gallery);
              setShowUploadModal(false);
              setShowDeleteModal(false);
            }}
            onUpload={(gallery) => {
              setSelectedGallery(gallery);
              setShowUploadModal(true);
              setShowDeleteModal(false);
            }}
            onDelete={(gallery) => {
              setSelectedGallery(gallery);
              setShowDeleteModal(true);
              setShowUploadModal(false);
            }}
          />
        </div>
      </main>

      {showCreateModal && (
        <CreateGalleryModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            refreshGalleries();
          }}
        />
      )}

      {selectedGallery && !showUploadModal && !showDeleteModal && (
        <ShareModal
          gallery={selectedGallery}
          onClose={() => setSelectedGallery(null)}
        />
      )}

      {selectedGallery && showUploadModal && (
        <PhotoUploadModal
          gallery={selectedGallery}
          onClose={() => {
            setShowUploadModal(false);
            setSelectedGallery(null);
          }}
          onSuccess={refreshGalleries}
        />
      )}

      {selectedGallery && showDeleteModal && (
        <DeleteGalleryModal
          gallery={selectedGallery}
          isDeleting={isDeleting}
          onConfirm={handleDeleteGallery}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedGallery(null);
          }}
        />
      )}
    </div>
  );
}