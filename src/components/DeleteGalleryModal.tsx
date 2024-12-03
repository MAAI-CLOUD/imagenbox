import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { GalleryResponse } from '../types/gallery';
import { useLanguage } from '../contexts/LanguageContext';

interface DeleteGalleryModalProps {
  gallery: GalleryResponse;
  onConfirm: () => void;
  onClose: () => void;
  isDeleting: boolean;
}

export function DeleteGalleryModal({ gallery, onConfirm, onClose, isDeleting }: DeleteGalleryModalProps) {
  const { t } = useLanguage();
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('delete.deleteGallery')}</h3>
            <p className="text-gray-600 mb-4">
            {t('delete.messageOne')} "{gallery.nombreGaleria}"{t('delete.messageTwo')}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {t('gallery.Cancel')}
              </button>
              <button
                onClick={onConfirm}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <span className="inline-block h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  t('delete.deleteGallery')
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}