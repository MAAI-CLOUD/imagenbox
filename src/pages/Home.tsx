import React, { useState } from 'react';
import { Camera, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navigation } from '../components/layout/Navigation';
import { AuthModal } from '../components/AuthModal';
import { Hero } from '../components/home/Hero';
import { Portfolio } from '../components/home/Portfolio';
import { About } from '../components/home/About';
import { Services } from '../components/home/Services';
import { Contact } from '../components/home/Contact';
import { Footer } from '../components/layout/Footer';

export function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center gap-2">
              <Camera className="h-8 w-8 text-gray-900" />
              <span className="text-xl font-semibold text-gray-900">ImagenBox</span>
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <Navigation 
              isMenuOpen={isMenuOpen} 
              onClose={() => setIsMenuOpen(false)}
              onAuthClick={() => setShowAuthModal(true)}
            />
          </div>
        </div>
      </header>

      <main>
        <Hero onAuthClick={() => setShowAuthModal(true)} />
        <Portfolio />
        <About />
        <Services />
        {/* <Contact /> */}
      </main>

      <Footer />

      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}