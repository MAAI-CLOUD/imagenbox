import React from 'react';
import Masonry from 'react-masonry-css';
import { Share2, Image as ImageIcon, Upload, Trash2, Lock, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GalleryResponse } from '../types/gallery';

interface GalleryGridProps {
  galleries: GalleryResponse[];
  loading: boolean;
  onShare: (gallery: GalleryResponse) => void;
  onUpload: (gallery: GalleryResponse) => void;
  onDelete: (gallery: GalleryResponse) => void;
}

export function GalleryGrid({ galleries, loading, onShare, onUpload, onDelete }: GalleryGridProps) {
  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!galleries || galleries.length === 0) {
    return (
      <div className="text-center py-12">
        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">Sin galerías</h3>
        <p className="mt-1 text-sm text-gray-500">Comience creando una nueva galería.</p>
      </div>
    );
  }

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className="flex -ml-4 w-auto"
      columnClassName="pl-4 bg-clip-padding"
    >
      {galleries.map((gallery) => {
        const coverImage = gallery.portadaGaleria?.url;
        const photoCount = gallery.fotos?.length || 0;

        return (
          <div key={gallery.id} className="mb-6 break-inside-avoid">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
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
                    <span className="text-sm font-medium">Privado</span>
                  </div>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {gallery.nombreGaleria}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {gallery.descripcionGaleria}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500 flex items-center gap-1.5">
                    <ImageIcon size={16} />
                    {photoCount} Fotos
                  </span>
                  <div className="flex gap-3">
                    <button
                      onClick={() => onUpload(gallery)}
                      className="flex items-center gap-1.5 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Upload size={16} />
                      <span className="text-sm font-medium"></span>
                    </button>
                    <button
                      onClick={() => onShare(gallery)}
                      className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      <Share2 size={16} />
                      <span className="text-sm font-medium"></span>
                    </button>

                    <div className="flex gap-3">
                    {!gallery.privado && (
                      <Link
                        to={`/gallery/${gallery.id}`}
                        className="flex items-center gap-1.5 text-emerald-600 hover:text-emerald-800 transition-colors"
                      >
                        <Eye size={16} />
                        <span className="text-sm font-medium">Ver</span>
                      </Link>
                    )}
                    <button
                      onClick={() => onDelete(gallery)}
                      className="flex items-center gap-1.5 text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 size={16} />
                      <span className="text-sm font-medium">Borrar</span>
                    </button>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </Masonry>
  );
}