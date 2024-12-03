import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { uploadPhoto } from '../services/api';
import { GalleryResponse } from '../types/gallery';
import { useLanguage } from '../contexts/LanguageContext';

interface PhotoUploadModalProps {
  gallery: GalleryResponse;
  onClose: () => void;
  onSuccess: () => void;
}

export function PhotoUploadModal({ gallery, onClose, onSuccess }: PhotoUploadModalProps) {
  const { t } = useLanguage();
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      setPreviewFiles(acceptedFiles);
    }
  });

  const handleUpload = async () => {
    if (previewFiles.length === 0) return;

    setUploading(true);
    setProgress(0);
    
    try {
      const totalFiles = previewFiles.length;
      let completedFiles = 0;
      
      const uploadPromises = previewFiles.map(async (file) => {
        const result = await uploadPhoto({ 
          foto: file, 
          galeria: gallery.documentId 
        });
        completedFiles++;
        setProgress((completedFiles / totalFiles) * 100);
        return result;
      });

      await Promise.all(uploadPromises);
      toast.success('Photos uploaded successfully!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Failed to upload photos');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">{t('gallery.uploadPhotos')}</h3>
            <p className="text-gray-600 mt-1">{t('gallery.addPhotoTo')} {gallery.nombreGaleria}</p>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center cursor-pointer transition-all duration-300 ${
            isDragActive 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
          <p className="text-gray-600 mb-2">
            {isDragActive
              ? 'Drop the files here...'
              : 'Drag & drop photos here, or click to select'}
          </p>
          <p className="text-sm text-gray-500">
            Supports: JPG, PNG, GIF
          </p>
        </div>

        {previewFiles.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {previewFiles.map((file, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPreviewFiles([])}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : `Upload ${previewFiles.length} Photos`}
              </button>
            </div>
          </div>
        )}

        {uploading && (
          <div className="mt-6 space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 text-center">
              Uploading... {Math.round(progress)}%
            </p>
          </div>
        )}
      </div>
    </div>
  );
}