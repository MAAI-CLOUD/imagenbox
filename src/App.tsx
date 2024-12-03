import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './components/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { GalleryView } from './pages/GalleryView';
import { UploadPage } from './pages/UploadPage';

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/gallery/:id" element={<GalleryView />} />
            <Route path="/upload/:id" element={<UploadPage />} />
          </Routes>
          <Toaster position="top-right" />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;