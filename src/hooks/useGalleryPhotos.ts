import { useState, useEffect } from 'react';
import { fetchGalleryPhotos } from '../services/api';
import { PhotoAttributes } from '../types/photo';
import { toast } from 'react-hot-toast';

export const useGalleryPhotos = (galleryId: number) => {
  const [photos, setPhotos] = useState<PhotoAttributes[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        setLoading(true);
        const response = await fetchGalleryPhotos(galleryId);
        setPhotos(response.data);
      } catch (error) {
        toast.error('Failed to load photos');
      } finally {
        setLoading(false);
      }
    };

    if (galleryId) {
      loadPhotos();
    }
  }, [galleryId]);

  return { photos, loading };
};