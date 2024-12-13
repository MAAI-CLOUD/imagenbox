import React from 'react';
import { ChevronDown, Camera } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeroProps {
  onAuthClick: () => void;
}

export function Hero({ onAuthClick }: HeroProps) {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d"
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-light mb-6">Capturando Momentos</h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-8">
          Una plataforma segura para guardar y compartir tus momentos más valiosos
        </p>

        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Camera className="h-5 w-5" />
            {t('hero.manage')}
          </Link>
        ) : (
          <button
            onClick={onAuthClick}
            className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Camera className="h-5 w-5" />
            {t('hero.cta')}
          </button>
        )}
      </div>

      <a
        href="#portfolio"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}