import React from 'react';
import { Link } from 'react-router-dom';
import { Share2, Image as ImageIcon, Upload, Lock, Eye } from 'lucide-react';
import { GalleryResponse } from '../../types/gallery';

interface GalleryCardProps {
  gallery: GalleryResponse;
  onShare: (gallery: GalleryResponse) => void;
  onUpload: (gallery: GalleryResponse) => void;
}

export function GalleryCard({ gallery, onShare, onUpload }: GalleryCardProps) {
  const coverImage = gallery.portadaGaleria?.url;
  const photoCount = gallery.fotos?.length || 0;

  return (
    <div className="mb-6 break-inside-avoid group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
        <div className="relative">
          {coverImage ? (
            <div className="relative overflow-hidden">
              <img
                src={`https://api.imagenbox.cl${coverImage}`}
                alt={gallery.nombreGaleria}
                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ) : (
            <div className="w-full h-56 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
              <ImageIcon className="h-16 w-16 text-gray-300" />
            </div>
          )}
          {gallery.privado && (
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
              <Lock size={14} className="text-white/90" />
              <span className="text-sm font-medium">Private</span>
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-xl font-semibold mb-2 text-gray-900">{gallery.nombreGaleria}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{gallery.descripcionGaleria}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
              <ImageIcon size={16} />
              {photoCount} photos
            </span>
            <div className="flex gap-3">
              <button
                onClick={() => onUpload(gallery)}
                className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Upload size={16} />
                <span className="text-sm font-medium">Upload</span>
              </button>
              <button
                onClick={() => onShare(gallery)}
                className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <Share2 size={16} />
                <span className="text-sm font-medium">Share</span>
              </button>
              {!gallery.privado && (
                <Link
                  to={`/gallery/${gallery.id}`}
                  className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-800 transition-colors"
                >
                  <Eye size={16} />
                  <span className="text-sm font-medium">View</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}