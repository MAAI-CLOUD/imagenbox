import React, { useState } from 'react';
import { X } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { useLanguage } from '../contexts/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { t } = useLanguage();
  const [showRegister, setShowRegister] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            {showRegister ? t('auth.createAccount') : t('auth.welcome')}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {showRegister ? <RegisterForm /> : <LoginForm />}

        <div className="mt-6 text-center">
          <button
            onClick={() => setShowRegister(!showRegister)}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            {showRegister ? t('auth.haveAccount') : t('auth.noAccount')}
          </button>
        </div>
      </div>
    </div>
  );
}