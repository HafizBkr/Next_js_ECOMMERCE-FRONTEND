import React, { useState } from "react";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Watch from "@/app/public/images/watch.png"
import Iphone from "@/app/public/images/iphone.png"
import Imac from  "@/app/public/images/mac.png"
import Pod from  "@/app/public/images/pod.png"
import Ipad  from  "@/app/public/images/ipad.png"
import Vision from  "@/app/public/images/vision.png"
import Air from  "@/app/public/images/airtag.png"
import Cable from  "@/app/public/images/cable.png"
import Accesories from  "@/app/public/images/accessoire.png"
import Homepod from  "@/app/public/images/Homepod.png"
import Gift from  "@/app/public/images/gift.png"
import IIphone from "@/app/public/images/iphonee.png"
import Watch_ from "@/app/public/images/watch_.png"
import Femme from  "@/app/public/images/femme.png"

const AppleStore = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    { name: "Mac", image: Imac.src },
    { name: "iPhone", image: Iphone.src},
    { name: "iPad", image: Ipad.src},
    { name: "Apple Watch", image: Watch.src }, // Correct dath
    { name: "Apple Vision Pro", image: Vision.src },
    { name: "AirPods", image: Pod.src },
    { name: "AirTag", image: Air.src },
    { name: "Apple TV 4K", image: Cable.src },
    { name: "HomePod", image: Homepod.src },
    { name: "Accessoires", image:Accesories.src },
    { name: "Apple Gift Card", image:Gift.src  },
  ];

  const newProducts = [
    {
      title: "iPhone 16 Pro",
      subtitle: "L'iPhone ultime.",
      price: "ou 1 229,00 €",
      image: IIphone.src,
      bgColor: "bg-black",
      textColor: "text-white",
    },
    {
      title: "Apple Watch Series 10",
      subtitle: "Encore plus fine. Toujours plus grande.",
      price: "À partir de 449 €",
      image: Watch_.src,
      bgColor: "bg-white",
      textColor: "text-black",
    },
    
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
        <h1 className="text-2xl sm:text-4xl font-semibold">
          Store.
          <span className="text-gray-500 font-normal ml-2">
            Pour acheter vos produits préférés, c'est ici.
          </span>
        </h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mt-4 sm:mt-0">
          <div className="flex items-start sm:items-center gap-2">
            <img
              src={Femme.src}
              alt="Specialist"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="text-sm">Besoin d'aide pour faire vos achats ?</p>
              <a href="#" className="text-blue-600 text-sm hover:underline">
                Contacter nos Spécialistes
              </a>
            </div>
          </div>
          <div className="flex items-start sm:items-center gap-2">
            <MapPin className="w-6 h-6" />
            <div>
              <p className="text-sm">Se rendre dans un Apple Store</p>
              <a href="#" className="text-blue-600 text-sm hover:underline">
                Trouver un magasin à proximité ›
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="mb-16">
        <h2 className="text-xl sm:text-3xl font-semibold mb-4">
          Produits.
        </h2>
        <div className="block sm:hidden overflow-x-auto flex space-x-4 pb-4">
          {products.map((product, index) => (
            <a
              key={index}
              href="#"
              className="flex-none w-28 flex flex-col items-center gap-2 hover:scale-105 transition-transform"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-contain"
              />
              <p className="text-xs text-center">{product.name}</p>
            </a>
          ))}
        </div>
        <div className="hidden sm:grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-11 gap-4">
          {products.map((product, index) => (
            <a
              key={index}
              href="#"
              className="flex flex-col items-center gap-2 hover:scale-105 transition-transform"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              />
              <p className="text-xs text-center">{product.name}</p>
            </a>
          ))}
        </div>
      </div>

      {/* New Products Carousel */}
              <div className="mb-12">
          <h2 className="text-xl sm:text-3xl font-semibold mb-1">
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
                    className="min-w-full px-4"
                  >
                    <div
                      className={`${product.bgColor} ${product.textColor} rounded-3xl p-6 sm:p-8 h-[400px] sm:h-[500px] flex flex-col`}
                    >
                      <div className="mb-4">
                        <h3 className="text-2xl sm:text-4xl font-semibold mb-2">
                          {product.title}
                        </h3>
                        <p className="text-lg sm:text-xl mb-2">
                          {product.subtitle}
                        </p>
                        <p className="text-sm opacity-90">{product.price}</p>
                      </div>
                      <div className="flex-grow h-full relative">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-lg hover:bg-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppleStore;
