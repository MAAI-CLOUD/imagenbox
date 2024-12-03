import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Upload, Eye, Download } from 'lucide-react';
import { GalleryResponse } from '../types/gallery';
import { toast } from 'react-hot-toast';
import { useLanguage } from '../contexts/LanguageContext';

interface ShareModalProps {
  gallery: GalleryResponse;
  onClose: () => void;
}

export function ShareModal({ gallery, onClose }: ShareModalProps) {
  const { t } = useLanguage();
  const uploadUrl = `${window.location.origin}/upload/${gallery.documentId}`;
  const viewUrl = `${window.location.origin}/gallery/${gallery.id}`;

  const downloadQRCode = (qrId: string, fileName: string) => {
    try {
      const svg = document.getElementById(qrId);
      if (!svg) {
        toast.error('QR code element not found');
        return;
      }

      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        toast.error('Could not create canvas context');
        return;
      }

      const img = new Image();
      img.onload = () => {
        // Set canvas size to match the SVG
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Fill white background
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw the image
        ctx.drawImage(img, 0, 0);
        
        // Convert to PNG and download
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = fileName;
        downloadLink.href = pngFile;
        downloadLink.click();
        
        toast.success('QR code downloaded successfully');
      };

      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    } catch (error) {
      console.error('Error downloading QR code:', error);
      toast.error('Failed to download QR code');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">{t('gallery.share')}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="space-y-6">
          {!gallery.privado && (
            <div className="flex flex-col items-center gap-4 pb-6 border-b">
              <div className="flex items-center gap-2 text-gray-700">
                <Eye size={20} />
                <span>{t('gallery.viewQRCode')}</span>
              </div>
              <div className="relative group">
                <QRCodeSVG 
                  id="view-qr"
                  value={viewUrl} 
                  size={200}
                  className="bg-white p-2"
                />
                <button
                  onClick={() => downloadQRCode('view-qr', `gallery-view-qr.png`)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                  title={t('gallery.downloadQR')}
                >
                  <Download size={20} className="text-gray-600" />
                </button>
              </div>
              <p className="text-center text-gray-600">
                {t('gallery.shareViewQR')}
              </p>
              <input
                type="text"
                value={viewUrl}
                readOnly
                className="w-full p-2 border rounded bg-gray-50"
                onClick={(e) => {
                  (e.target as HTMLInputElement).select();
                  navigator.clipboard.writeText(viewUrl)
                    .then(() => toast.success(t('message.urlCopied')))
                    .catch(() => toast.error(t('message.copyFailed')));
                }}
              />
            </div>
          )}

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Upload size={20} />
              <span>{t('gallery.uploadQRCode')}</span>
            </div>
            <div className="relative group">
              <QRCodeSVG 
                id="upload-qr"
                value={uploadUrl} 
                size={200}
                className="bg-white p-2"
              />
              <button
                onClick={() => downloadQRCode('upload-qr', `gallery-upload-qr.png`)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                title={t('gallery.downloadQR')}
              >
                <Download size={20} className="text-gray-600" />
              </button>
            </div>
            <p className="text-center text-gray-600">
              {t('gallery.shareUploadQR')}
            </p>
            <input
              type="text"
              value={uploadUrl}
              readOnly
              className="w-full p-2 border rounded bg-gray-50"
              onClick={(e) => {
                (e.target as HTMLInputElement).select();
                navigator.clipboard.writeText(uploadUrl)
                  .then(() => toast.success(t('message.urlCopied')))
                  .catch(() => toast.error(t('message.copyFailed')));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}