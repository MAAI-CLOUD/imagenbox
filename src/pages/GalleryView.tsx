import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download, X, Check } from 'lucide-react';
import { useGalleryPhotos } from '../hooks/useGalleryPhotos';
import { PhotoAttributes } from '../types/photo';
import JSZip from 'jszip';
import { toast } from 'react-hot-toast';

export function GalleryView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { photos, loading } = useGalleryPhotos(Number(id));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<number>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!photos.length) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white">
        <p className="text-xl mb-4">No photos in this gallery</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-white hover:text-gray-300"
        >
          <ArrowLeft /> Back to Dashboard
        </button>
      </div>
    );
  }

  const currentPhoto = photos[currentIndex];

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const previousPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const togglePhotoSelection = (photoId: number) => {
    const newSelection = new Set(selectedPhotos);
    if (newSelection.has(photoId)) {
      newSelection.delete(photoId);
    } else {
      newSelection.add(photoId);
    }
    setSelectedPhotos(newSelection);
  };

  const downloadSelectedPhotos = async () => {
    if (selectedPhotos.size === 0) return;
    setDownloading(true);
    
    try {
      const zip = new JSZip();
      const selectedPhotosList = photos.filter(photo => selectedPhotos.has(photo.id));
      
      await Promise.all(
        selectedPhotosList.map(async (photo, index) => {
          const response = await fetch(`https://api.imagenbox.cl${photo.foto.url}`);
          const blob = await response.blob();
          const extension = photo.foto.ext || '.jpg';
          zip.file(`photo-${index + 1}${extension}`, blob);
        })
      );

      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'gallery-photos.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Photos downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download photos');
    } finally {
      setDownloading(false);
    }
  };

  const downloadAllPhotos = async () => {
    setDownloading(true);
    
    try {
      const zip = new JSZip();
      
      await Promise.all(
        photos.map(async (photo, index) => {
          const response = await fetch(`https://api.imagenbox.cl${photo.foto.url}`);
          const blob = await response.blob();
          const extension = photo.foto.ext || '.jpg';
          zip.file(`photo-${index + 1}${extension}`, blob);
        })
      );

      const content = await zip.generateAsync({ type: 'blob' });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'all-gallery-photos.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('All photos downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download photos');
    } finally {
      setDownloading(false);
    }
  };

  const downloadCurrentPhoto = async () => {
    try {
      const response = await fetch(`https://api.imagenbox.cl${currentPhoto.foto.url}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `photo${currentPhoto.foto.ext || '.jpg'}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Photo downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download photo');
    }
  };

  return (
    <div className="fixed inset-0 bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex flex-wrap justify-between items-center z-10 bg-gradient-to-b from-black/70 to-transparent">
        <button
          onClick={() => navigate('/dashboard')}
          className="text-white hover:text-gray-300 flex items-center gap-2"
        >
          <ArrowLeft /> Back
        </button>
        <div className="flex flex-wrap items-center gap-4">
          {isSelectionMode ? (
            <>
              <button
                onClick={downloadSelectedPhotos}
                disabled={selectedPhotos.size === 0 || downloading}
                className={`flex items-center gap-2 px-3 py-1 text-sm rounded ${
                  selectedPhotos.size === 0 || downloading
                    ? 'bg-gray-600 text-gray-400'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                <Download size={20} />
                {downloading ? 'Downloading...' : `Download Selected (${selectedPhotos.size})`}
              </button>
              <button
                onClick={() => {
                  setIsSelectionMode(false);
                  setSelectedPhotos(new Set());
                }}
                className="text-white hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={downloadAllPhotos}
                disabled={downloading}
                className="flex items-center gap-2 px-3 py-1 text-sm rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-600 disabled:text-gray-400"
              >
                <Download size={20} />
                {downloading ? 'Downloading...' : 'Download All'}
              </button>
              <button
                onClick={downloadCurrentPhoto}
                className="flex items-center gap-2 text-sm text-white hover:text-gray-300"
              >
                <Download size={20} />
                Download Current
              </button>
              <button
                onClick={() => setIsSelectionMode(true)}
                className="text-sm text-white hover:text-gray-300"
              >
                Select Multiple
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="h-full flex flex-col items-center justify-center gap-4 px-4">
        {/* Navigation Buttons */}
        <button
          onClick={previousPhoto}
          className="absolute left-2 sm:left-4 text-white hover:text-gray-300 z-10"
        >
          <ArrowLeft size={28} />
        </button>
        <button
          onClick={nextPhoto}
          className="absolute right-2 sm:right-4 text-white hover:text-gray-300 z-10"
        >
          <ArrowRight size={28} />
        </button>

        {/* Current Photo */}
        <div className="relative max-w-full">
          <img
            src={`https://api.imagenbox.cl${currentPhoto.foto.url}`}
            alt={currentPhoto.foto.name}
            className="max-h-[70vh] max-w-full sm:max-h-[85vh] object-contain"
          />
          {isSelectionMode && (
            <button
              onClick={() => togglePhotoSelection(currentPhoto.id)}
              className={`absolute top-4 right-4 p-2 rounded-full ${
                selectedPhotos.has(currentPhoto.id)
                  ? 'bg-indigo-600 text-white'
                  : 'bg-black/50 text-white hover:bg-black/70'
              }`}
            >
              <Check size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {photos.map((photo: PhotoAttributes, index: number) => (
            <button
              key={photo.id}
              onClick={() => setCurrentIndex(index)}
              className={`relative flex-shrink-0 ${
                index === currentIndex ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              <img
                src={`https://api.imagenbox.cl${photo.foto.formats.thumbnail?.url || photo.foto.url}`}
                alt={photo.foto.name}
                className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded"
              />
              {isSelectionMode && selectedPhotos.has(photo.id) && (
                <div className="absolute inset-0 bg-indigo-600/30 flex items-center justify-center">
                  <Check className="text-white" size={20} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}