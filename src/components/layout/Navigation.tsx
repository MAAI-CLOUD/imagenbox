import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

interface NavigationProps {
  isMenuOpen: boolean;
  onClose: () => void;
  onAuthClick: () => void;
}

export function Navigation({ isMenuOpen, onClose, onAuthClick }: NavigationProps) {
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  
  const navItems = [
    { label: t('nav.portfolio'), href: '#portfolio' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav className={`${
      isMenuOpen
        ? 'absolute top-full left-0 right-0 bg-white border-t shadow-lg'
        : 'hidden lg:flex'
    }`}>
      <ul className={`${
        isMenuOpen
          ? 'flex flex-col p-4'
          : 'flex items-center gap-8'
      }`}>
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={onClose}
              className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
        {/* <li>
          <LanguageToggle />
        </li> */}
        {isAuthenticated ? (
          <li>
            <Link
              to="/dashboard"
              className="block py-2 px-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {t('nav.galleries')}
            </Link>
          </li>
        ) : (
          <li>
            <button
              onClick={onAuthClick}
              className="block py-2 text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
            >
              {t('nav.signin')}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}