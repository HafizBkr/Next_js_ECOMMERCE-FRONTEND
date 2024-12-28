"use client";
import React, { useState } from "react";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const AppleStore = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    { name: "Mac", image: "/api/placeholder/100/100" },
    { name: "iPhone", image: "/api/placeholder/100/100" },
    { name: "iPad", image: "/api/placeholder/100/100" },
    { name: "Apple Watch", image: "/api/placeholder/100/100" },
    { name: "Apple Vision Pro", image: "/api/placeholder/100/100" },
    { name: "AirPods", image: "/api/placeholder/100/100" },
    { name: "AirTag", image: "/api/placeholder/100/100" },
    { name: "Apple TV 4K", image: "/api/placeholder/100/100" },
    { name: "HomePod", image: "/api/placeholder/100/100" },
    { name: "Accessoires", image: "/api/placeholder/100/100" },
    { name: "Apple Gift Card", image: "/api/placeholder/100/100" },
  ];

  const newProducts = [
    {
      title: "iPhone 16 Pro",
      subtitle: "L'iPhone ultime.",
      price: "ou 1 229,00 €",
      image: "/api/placeholder/600/600",
      bgColor: "bg-black",
      textColor: "text-white",
    },
    {
      title: "Apple Watch Series 10",
      subtitle: "Encore plus fine. Toujours plus grande.",
      price: "À partir de 449 €",
      image: "/api/placeholder/600/600",
      bgColor: "bg-white",
      textColor: "text-black",
    },
    // autres produits...
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newProducts.length) % newProducts.length);
  };

  return (
    <div className="max-w-[1550px] mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-12">
        <h1 className="text-4xl font-semibold">
          Store.
          <span className="text-gray-500 font-normal ml-2">
            Pour acheter vos produits préférés, c'est ici.
          </span>
        </h1>
        {/* Aide Section */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <img
              src="/api/placeholder/32/32"
              alt="Specialist"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm">Besoin d'aide pour faire vos achats ?</p>
              <a
                href="#"
                className="text-blue-600 text-sm hover:underline"
              >
                Contacter nos Spécialistes
              </a>
            </div>
          </div>
          {/* Store Finder */}
          <div className="flex items-center gap-2">
            <MapPin className="w-6 h-6" />
            <div>
              <p className="text-sm">Se rendre dans un Apple Store</p>
              <a
                href="#"
                className="text-blue-600 text-sm hover:underline"
              >
                Trouver un magasin à proximité ›
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-11 gap-4 mb-16">
        {products.map((product, index) => (
          <a
            key={index}
            href="#"
            className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-20 object-contain"
            />
            <p className="text-xs text-center">{product.name}</p>
          </a>
        ))}
      </div>

      {/* New Products Carousel */}
      <div className="mb-12">
        <h2 className="text-3xl font-semibold mb-1">
          Les dernières nouveautés.
          <span className="text-gray-500 font-normal ml-2">
            Coup d'œil sur ce qui vient de sortir.
          </span>
        </h2>
        <div className="relative mt-8">
          <div className="flex overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {newProducts.map((product, index) => (
                <div
                  key={index}
                  className="min-w-full flex-basis-[33.333%] px-4"
                >
                  <div
                    className={`${product.bgColor} ${product.textColor} rounded-3xl p-8 h-[500px] flex flex-col justify-between`}
                  >
                    <div>
                      <h3 className="text-4xl font-semibold mb-2">{product.title}</h3>
                      <p className="text-xl mb-2">{product.subtitle}</p>
                      <p className="text-sm opacity-90">{product.price}</p>
                    </div>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-64 object-contain mt-8"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppleStore;
