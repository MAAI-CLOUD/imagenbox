import { useState, useEffect } from 'react';
import { fetchUserGalleries } from '../services/api';
import { GalleryResponse } from '../types/gallery';
import { useAuth } from '../components/AuthContext';
import { toast } from 'react-hot-toast';

export const useGalleries = () => {
  const [galleries, setGalleries] = useState<GalleryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchGalleries = async () => {
    if (!user?.email) return;
    
    try {
      setLoading(true);
      const fetchedGalleries = await fetchUserGalleries(user.email);
      setGalleries(fetchedGalleries);
    } catch (error: any) {
      toast.error('Failed to fetch galleries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, [user?.email]);

  return {
    galleries,
    loading,
    refreshGalleries: fetchGalleries
  };
};