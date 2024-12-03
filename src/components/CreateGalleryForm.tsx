import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FolderPlus } from 'lucide-react';
import { createGallery } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';

interface CreateGalleryFormProps {
  onSuccess: () => void;
}

export function CreateGalleryForm({ onSuccess }: CreateGalleryFormProps) {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createGallery({ name, description });
      toast.success('Gallery created successfully!');
      setName('');
      setDescription('');
      onSuccess();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <FolderPlus className="text-indigo-600" />
        <h2 className="text-xl font-semibold">{t('gallery.CreateNewGallery')}</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('gallery.GalleryName')}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('gallery.Description')}
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-200"
        >
          {loading ? 'Creating...' : t('gallery.CreateGallery')}
        </button>
      </div>
    </form>
  );
}