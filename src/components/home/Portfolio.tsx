import React from 'react';

export function Portfolio() {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1496840220025-4cbde0b9df65',
      category: 'Eventos',
    },
    {
      url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4',
      category: 'Naturaleza',
    },
    {
      url: 'https://images.unsplash.com/photo-1511407397940-d57f68e81203',
      category: 'Entornos',
    },
    // Add more images as needed
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-light text-center mb-12">Almacena y Comparte Momentos unicos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={image.url}
                alt={image.category}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-xl">{image.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}