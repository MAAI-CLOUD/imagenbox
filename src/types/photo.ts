export interface PhotoAttributes {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  foto: {
    id: number;
    documentId: string;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail?: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        path: string | null;
        width: number;
        height: number;
        size: number;
        sizeInBytes: number;
        url: string;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  galeria: {
    id: number;
    documentId: string;
    nombreGaleria: string;
    privado: boolean;
    correoGaleria: string;
    descripcionGaleria: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface PhotoResponse {
  data: PhotoAttributes[];
}

export interface PhotoUploadData {
  foto: File;
  galeria: string;
}