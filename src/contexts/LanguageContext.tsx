import React, { createContext, useContext, useState } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Navigation
    'nav.portfolio': 'Portafolio',
    'nav.about': 'Nosotros',
    'nav.services': 'Servicios',
    'nav.contact': 'Contacto',
    'nav.signin': 'Iniciar Sesión',
    'nav.galleries': 'Mis Galerías',
    
    // Hero
    'hero.title': 'Capturando Momentos',
    'hero.subtitle': 'Fotografía profesional que cuenta tu historia',
    'hero.cta': 'Comenzar',
    'hero.manage': 'Administrar Galerías',
    
    // Gallery
    'gallery.create': 'Nueva Galería',
    'gallery.upload': 'Subir',
    'gallery.share': 'Compartir',
    'gallery.view': 'Ver',
    'gallery.photos': 'fotos',
    'gallery.private': 'Privada',
    'gallery.noGalleries': 'Sin galerías',
    'gallery.startCreating': 'Comienza creando una nueva galería',
    'gallery.uploadPhotos': 'Subir Fotos',
    'gallery.downloading': 'Descargando...',
    'gallery.downloadAll': 'Descargar Todo',
    'gallery.downloadSelected': 'Descargar Seleccionados',
    'gallery.selectMultiple': 'Seleccionar Múltiples',
    'gallery.shareViewQR': 'Compartir Vista URL',
    'gallery.addPhotoTo':'Agregar fotos a',
    'gallery.viewQRCode': 'Qr Vista',
    'gallery.uploadQRCode':'QR Cargar Imagenes',
    'gallery.shareUploadQR':'Compartir Carga URL',
    'gallery.CreateNewGallery': 'Crear nueava galeria',
    'gallery.CoverImage': 'Imagen de portada',
    'gallery.GalleryName': 'Nombre galeria',
    'gallery.Description': 'Descripcion',
    'gallery.PrivateGallery': 'Galeria privada',
    'gallery.Cancel': 'Cancelar',
    'gallery.CreateGallery': 'Crear galeria',
    
    // Auth
    'auth.welcome': 'Bienvenido',
    'auth.createAccount': 'Crear Cuenta',
    'auth.login': 'Iniciar Sesión',
    'auth.register': 'Registrarse',
    'auth.logout': 'Cerrar Sesión',
    'auth.email': 'Correo electrónico',
    'auth.password': 'Contraseña',
    'auth.username': 'Nombre de usuario',
    'auth.haveAccount': '¿Ya tienes una cuenta? Inicia sesión',
    'auth.noAccount': '¿No tienes una cuenta? Regístrate',
    
    // Forms
    'form.required': 'Requerido',
    'form.optional': 'Opcional',
    'form.submit': 'Enviar',
    'form.cancel': 'Cancelar',
    'form.clear': 'Limpiar',
    'form.save': 'Guardar',
    'form.name': 'Nombre',
    'form.description': 'Descripción',
    'form.coverImage': 'Imagen de portada',
    'form.uploadFile': 'Subir archivo',
    'form.dragDrop': 'Arrastra y suelta fotos aquí, o haz clic para seleccionar',
    'form.supports': 'Formatos soportados: JPG, PNG, GIF',
    
    // Messages
    'message.success': 'Operación exitosa',
    'message.error': 'Ha ocurrido un error',
    'message.loading': 'Cargando...',
    'message.uploading': 'Subiendo...',
    'message.processing': 'Procesando...',
    'message.confirmDelete': '¿Estás seguro de eliminar esto?',
    
    // Footer
    'footer.newsletter': 'Boletín de noticias',
    'footer.subscribe': 'Suscribirse',
    'footer.emailPlaceholder': 'Ingresa tu correo',
    'footer.rights': 'Todos los derechos reservados',
    'footer.connect': 'Conectar',
    
    // Services
    'services.title': 'Nuestros Servicios',
    'services.subtitle': 'Ofrecemos una amplia gama de servicios fotográficos profesionales',
    'services.wedding': 'Fotografía de Bodas',
    'services.portrait': 'Sesiones de Retratos',
    'services.event': 'Eventos Especiales',
    'services.corporate': 'Eventos Corporativos',
    'services.product': 'Fotografía de Productos',
    'services.landscape': 'Fotografía de Paisajes',
    
    // Contact
    'contact.title': 'Contáctanos',
    'contact.subtitle': '¿Tienes alguna pregunta? Escríbenos',
    'contact.name': 'Nombre',
    'contact.email': 'Correo electrónico',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar Mensaje',
    'contact.location': 'Ubicación',
    'contact.phone': 'Teléfono',

    //Delete
    'delete.deleteGallery':'Eliminar Galeria',
    'delete.messageOne':'Estás seguro de que quieres eliminar',
    'delete.messageTwo':' Esta acción no se puede deshacer y eliminará permanentemente todas las fotos de esta galería.',

  },
  en: {
    // Navigation
    'nav.portfolio': 'Portfolio',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.signin': 'Sign In',
    'nav.galleries': 'My Galleries',
    
    // Hero
    'hero.title': 'Capturing Moments',
    'hero.subtitle': 'Professional photography that tells your story',
    'hero.cta': 'Get Started',
    'hero.manage': 'Manage Galleries',
    
    // Gallery
    'gallery.create': 'New Gallery',
    'gallery.upload': 'Upload',
    'gallery.share': 'Share',
    'gallery.view': 'View',
    'gallery.photos': 'photos',
    'gallery.private': 'Private',
    'gallery.noGalleries': 'No galleries',
    'gallery.startCreating': 'Start by creating a new gallery',
    'gallery.uploadPhotos': 'Upload Photos',
    'gallery.downloading': 'Downloading...',
    'gallery.downloadAll': 'Download All',
    'gallery.downloadSelected': 'Download Selected',
    'gallery.selectMultiple': 'Select Multiple',
    'gallery.shareViewQR': 'Share View URL',
    'gallery.addPhotoTo':'Add photos to',
    'gallery.viewQRCode': 'QR View',
    'gallery.uploadQRCode':'QR Upload Images',
    'gallery.shareUploadQR':'Share Upload URL',
    'gallery.CreateNewGallery': 'Create New Gallery',
    'gallery.CoverImage': 'Cover Image',
    'gallery.GalleryName': 'Gallery Name',
    'gallery.Description': 'Description',
    'gallery.PrivateGallery': 'Private Gallery',
    'gallery.Cancel': 'Cancel',
    'gallery.CreateGallery': 'Create Gallery',
    
    // Auth
    'auth.welcome': 'Welcome Back',
    'auth.createAccount': 'Create Account',
    'auth.login': 'Sign In',
    'auth.register': 'Sign Up',
    'auth.logout': 'Logout',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.username': 'Username',
    'auth.haveAccount': 'Already have an account? Sign in',
    'auth.noAccount': "Don't have an account? Sign up",
    
    // Forms
    'form.required': 'Required',
    'form.optional': 'Optional',
    'form.submit': 'Submit',
    'form.cancel': 'Cancel',
    'form.clear': 'Clear',
    'form.save': 'Save',
    'form.name': 'Name',
    'form.description': 'Description',
    'form.coverImage': 'Cover Image',
    'form.uploadFile': 'Upload file',
    'form.dragDrop': 'Drag & drop photos here, or click to select',
    'form.supports': 'Supports: JPG, PNG, GIF',
    
    // Messages
    'message.success': 'Operation successful',
    'message.error': 'An error occurred',
    'message.loading': 'Loading...',
    'message.uploading': 'Uploading...',
    'message.processing': 'Processing...',
    'message.confirmDelete': 'Are you sure you want to delete this?',
    
    // Footer
    'footer.newsletter': 'Newsletter',
    'footer.subscribe': 'Subscribe',
    'footer.emailPlaceholder': 'Enter your email',
    'footer.rights': 'All rights reserved',
    'footer.connect': 'Connect',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'We offer a wide range of professional photography services',
    'services.wedding': 'Wedding Photography',
    'services.portrait': 'Portrait Sessions',
    'services.event': 'Special Events',
    'services.corporate': 'Corporate Events',
    'services.product': 'Product Photography',
    'services.landscape': 'Landscape Photography',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Have a question? Write to us',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.location': 'Location',
    'contact.phone': 'Phone',

    //Delete
    'delete.deleteGallery':'Delete Gallery',
    'delete.messageOne':'Are you sure you want to delete',
    'delete.messageTwo':' This action cannot be undone and will permanently delete all photos in this gallery.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}