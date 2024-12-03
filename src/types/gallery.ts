export interface CreateGalleryData {
  nombreGaleria: string;
  descripcionGaleria: string;
  correoGaleria: string;
  privado: boolean;
  portadaGaleria?: File;
}

export interface GalleryResponse {
  id: number;
  documentId: string;
  nombreGaleria: string;
  privado: boolean;
  correoGaleria: string;
  descripcionGaleria: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  portadaGaleria: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail?: {
        url: string;
      };
      small?: {
        url: string;
      };
    };
    url: string;
  } | null;
  fotos: any[];
}