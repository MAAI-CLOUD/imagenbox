import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { createGallery } from '../services/api';
import { useAuth } from './AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface CreateGalleryModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateGalleryModal({ onClose, onSuccess }: CreateGalleryModalProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombreGaleria: '',
    descripcionGaleria: '',
    privado: false
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.email) return;

    setLoading(true);
    try {
      await createGallery({
        ...formData,
        correoGaleria: user.email,
        portadaGaleria: coverImage || undefined
      });
      
      toast.success('Gallery created successfully!');
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create gallery');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-900">{t('gallery.CreateNewGallery')}</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('gallery.CoverImage')}
            </label>
            <div 
              className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg ${
                preview ? 'border-indigo-300' : 'border-gray-300'
              }`}
            >
              <div className="space-y-2 text-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="mx-auto h-32 w-auto rounded-lg"
                  />
                ) : (
                  <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('gallery.GalleryName')}
            </label>
            <input
              type="text"
              value={formData.nombreGaleria}
              onChange={(e) => setFormData({ ...formData, nombreGaleria: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('gallery.Description')}
            </label>
            <textarea
              value={formData.descripcionGaleria}
              onChange={(e) => setFormData({ ...formData, descripcionGaleria: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="private"
              checked={formData.privado}
              onChange={(e) => setFormData({ ...formData, privado: e.target.checked })}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="private" className="ml-2 block text-sm text-gray-900">
            {t('gallery.PrivateGallery')}
            </label>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {t('gallery.Cancel')}
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating...' : t('gallery.CreateGallery')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}