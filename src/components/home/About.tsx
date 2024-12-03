import React from 'react';
import { Camera, Heart, Award } from 'lucide-react';

export function About() {
  const stats = [
    { label: 'Years Experience', value: '10+' },
    { label: 'Photos Taken', value: '50K+' },
    { label: 'Happy Clients', value: '1000+' },
  ];

  return (
    <section id="about" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-light">Nosotros</h2>
            <p className="text-gray-600 leading-relaxed">
            Nos apasiona ayudar a las personas a conservar y compartir sus momentos más valiosos. Nuestra plataforma ofrece un espacio seguro y confiable para almacenar imágenes, 
            donde cada foto puede guardarse y compartirse fácilmente desde la cuenta de cada usuario. Creemos que cada recuerdo merece ser protegido, y por eso brindamos una 
            experiencia sencilla y segura, diseñada para que tus recuerdos estén siempre a salvo y accesibles cuando los necesites.
            </p>
            {/* <div className="grid grid-cols-3 gap-8 pt-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-semibold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div> */}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5"
              alt="About 1"
              className="rounded-lg w-full h-64 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e"
              alt="About 2"
              className="rounded-lg w-full h-64 object-cover mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
}