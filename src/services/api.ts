import axios from 'axios';
import { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';
import { CreateGalleryData, GalleryResponse } from '../types/gallery';
import { PhotoResponse, PhotoUploadData } from '../types/photo';

const API_URL = 'https://api.imagenbox.cl/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/local', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error?.message || 'An error occurred during login');
  }
};

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthResponse>('/auth/local/register', credentials);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error?.message || 'An error occurred during registration');
  }
};

export const createGallery = async (galleryData: CreateGalleryData): Promise<GalleryResponse> => {
  try {
    let portadaGaleriaId: number | undefined;

    // First, upload the cover image if provided
    if (galleryData.portadaGaleria) {
      const formData = new FormData();
      formData.append('files', galleryData.portadaGaleria);

      const uploadResponse = await api.post('/upload', formData);
      portadaGaleriaId = uploadResponse.data[0].id;
    }

    // Then create the gallery with the uploaded image ID
    const response = await api.post<{ data: GalleryResponse }>('/galerias', {
      data: {
        nombreGaleria: galleryData.nombreGaleria,
        descripcionGaleria: galleryData.descripcionGaleria,
        correoGaleria: galleryData.correoGaleria,
        privado: galleryData.privado,
        ...(portadaGaleriaId && { portadaGaleria: portadaGaleriaId }),
      }
    });

    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error?.message || 'Error creating gallery');
  }
};

export const fetchUserGalleries = async (email: string): Promise<GalleryResponse[]> => {
  try {
    const response = await api.get<{ data: GalleryResponse[] }>('/galerias', {
      params: {
        'populate': '*',
        'filters[correoGaleria]': email
      }
    });
    return response.data.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error?.message || 'Error fetching galleries');
  }
};

export const uploadPhoto = async (photoData: PhotoUploadData): Promise<PhotoResponse> => {
  try {
    const uploadFormData = new FormData();
    uploadFormData.append('files', photoData.foto);

    const uploadResponse = await api.post('/upload', uploadFormData);
    const fileId = uploadResponse.data[0].id;

    const photoFormData = {
      data: {
        foto: fileId,
        galeria: photoData.galeria,
      }
    };

    const response = await api.post<PhotoResponse>('/fotos', photoFormData);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error?.message || 'Error uploading photo');
  }
};

export const fetchGalleryPhotos = async (galleryId: number): Promise<PhotoResponse> => {
  try {
    const response = await api.get<PhotoResponse>('/fotos', {
      params: {
        'populate': '*',
        'filters[galeria][id]': galleryId
      }
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error?.message || 'Error fetching photos');
  }
};

export const deleteGallery = async (documentId: string): Promise<void> => {
  try {
    // First, fetch all photos in the gallery
    const response = await api.get<PhotoResponse>('/fotos', {
      params: {
        'populate': '*',
        'filters[galeria][documentId]': documentId
      }
    });
    
    // Delete all photos
    if (response.data.data) {
      await Promise.all(
        response.data.data.map(photo => api.delete(`/fotos/${photo.documentId}`))
      );
    }
    
    // Finally, delete the gallery
    await api.delete(`/galerias/${documentId}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.error?.message || 'Error deleting gallery');
  }
};