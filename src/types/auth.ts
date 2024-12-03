export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}

export interface AuthError {
  message: string;
}

export interface Gallery {
  id: string;
  name: string;
  description: string;
  photos: Photo[];
  shareCode: string;
}

export interface Photo {
  id: string;
  url: string;
  title: string;
  uploadedBy: string;
  createdAt: string;
}