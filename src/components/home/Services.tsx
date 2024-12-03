import React from 'react';
import { Camera, Users, Heart, Building2, Mountain, Star } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Recuerdos de Bodas',
      description: 'Tus fotos de boda en un espacio seguro, donde podrás compartir y revivir cada momento especial sin complicaciones',
    },
    {
      icon: <Building2 className="h-8 w-8" />,
      title: 'Eventos Corporativos',
      description: 'Almacena y organiza fotos profesionales de tus eventos corporativos, manteniéndolas seguras y listas para compartir con tu equipo o clientes.',
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Colecciones de Retratos',
      description: 'Preserva impresionantes paisajes para uso personal o comercial, almacenados de forma segura y accesibles en cualquier momento.',
    },
    {
      icon: <Mountain className="h-8 w-8" />,
      title: 'Eventos Especiales',
      description: 'Desde cumpleaños hasta aniversarios, ImagenBox cada momento memorable, asegurando que estén protegidos y listos para compartir.',
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'Fotografía de Productos',
      description: 'Almacena fotografías de productos de alta calidad para tu negocio, listas para compartir de forma segura con clientes o utilizar en plataformas de e-commerce.',
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: 'Compartir',
      description: 'Comparte tus imágenes de forma sencilla y segura con familiares, amigos o colegas. Con ImagenBox, tus recuerdos están siempre disponibles para quienes más importan, sin comprometer la privacidad ni la seguridad.',
    },
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-4">Nuestros Servicios</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
          Ofrecemos una plataforma segura y fácil de usar para almacenar y compartir tus recuerdos más valiosos.
          Cada servicio está diseñado para garantizar que tus imágenes se mantengan protegidas y siempre accesibles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-indigo-600 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}