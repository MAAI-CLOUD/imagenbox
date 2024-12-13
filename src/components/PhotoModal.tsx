import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { GalleryResponse } from '../types/gallery';
import { PhotoResponse } from '../types/photo';
import { uploadPhoto, fetchGalleryPhotos } from '../services/api';
import { useLanguage } from '../contexts/LanguageContext';

interface PhotoModalProps {
  gallery: GalleryResponse;
  onClose: () => void;
}

export function PhotoModal({ gallery, onClose }: PhotoModalProps) {
  const { t } = useLanguage();
  const [photos, setPhotos] = useState<PhotoResponse['data']>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      setUploading(true);
      setUploadProgress(0);

      try {
        const totalFiles = acceptedFiles.length;
        let completedFiles = 0;

        const uploadPromises = acceptedFiles.map(async (file) => {
          const result = await uploadPhoto({ foto: file, galeria: gallery.documentId });
          completedFiles++;
          setUploadProgress((completedFiles / totalFiles) * 100);
          return result;
        });

        await Promise.all(uploadPromises);
        toast.success('Fotos cargadas exitosamente!');
        fetchPhotos();
      } catch (error) {
        toast.error('No se pudieron subir fotos');
      } finally {
        setUploading(false);
        setUploadProgress(0);
      }
    }
  });

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const response = await fetchGalleryPhotos(gallery.id);
      setPhotos(response.data);
    } catch (error) {
      toast.error('No se pudieron recuperar las fotos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [gallery.id]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Fotos - {gallery.nombreGaleria}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 mb-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
            }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
          <p className="text-gray-600">
            {isDragActive
              ? 'Arrastra los archivos aquí...'
              : 'Arrastre y suelte fotos aquí, o haga clic para seleccionar'}
          </p>
          {uploading && (
            <div className="mt-4 space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600"> {t('message.uploading')} {Math.round(uploadProgress)}%</p>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Sin Fotos</h3>
            <p className="mt-1 text-sm text-gray-500">Sube algunas fotos para comenzar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={`https://api.imagenbox.cl${photo.foto.url}`}
                  alt={photo.foto.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity rounded-lg" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}