import React from 'react';
import { Languages } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      title={language === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      <Languages size={20} />
      <span className="text-sm font-medium">{language.toUpperCase()}</span>
    </button>
  );
}