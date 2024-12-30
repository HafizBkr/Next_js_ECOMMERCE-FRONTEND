import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Iphone from "@/app/public/images/iphonee.png"
// Types
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors?: string[];
  badge?: string;
  isNew?: boolean;
}

interface Section {
  title: string;
  subtitle: string;
  products: Product[];
}

// Composant pour les points de couleur
const ColorDots = ({ colors }: { colors: string[] }) => (
  <div className="flex gap-1 mt-2">
    {colors.map((color, index) => (
      <div
        key={index}
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
    ))}
  </div>
);

// Composant pour un produit
const ProductCard = ({ product }: { product: Product }) => (
  <div className="relative p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow flex-shrink-0 w-64">
    {product.badge && (
      <span className="absolute top-2 left-2 text-xs text-orange-500">
        {product.badge}
      </span>
    )}
    {product.isNew && (
      <span className="absolute top-2 right-2 text-xs text-orange-500">
        Nouveau
      </span>
    )}
    <div className="flex justify-center mb-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-48 h-48 object-contain"
      />
    </div>
    <h3 className="font-medium text-sm mb-2">{product.name}</h3>
    <p className="text-gray-900 font-medium">
      {product.price.toFixed(2)} €
    </p>
    {product.colors && <ColorDots colors={product.colors} />}
  </div>
);

// Composant Carrousel
const ProductCarousel = ({ products }: { products: Product[] }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 4;
  const itemWidth = 256 + 16; // Largeur de l'élément + espacement

  const next = () => {
    setStartIndex((current) =>
      Math.min(current + 1, products.length - itemsToShow)
    );
  };

  const prev = () => {
    setStartIndex((current) => Math.max(current - 1, 0));
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-300"
          style={{ transform: `translateX(-${startIndex * itemWidth}px)` }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {startIndex > 0 && (
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {startIndex < products.length - itemsToShow && (
        <button
          onClick={next}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

// Composant Section
const Section = ({ section }: { section: Section }) => (
  <div className="mb-12">
    <div className="mb-6">
      <h2 className="text-2xl font-medium mb-1">{section.title}</h2>
      <p className="text-gray-600">{section.subtitle}</p>
    </div>
    <ProductCarousel products={section.products} />
  </div>
);

// Données des produits
const accessoriesData: Section = {
  title: "Accessoires",
  subtitle: "Des essentiels qui s'accordent parfaitement à vos appareils.",
  products: [
    {
      id: 1,
      name: "Coque MagSafe iPhone",
      price: 59.0,
      image: Iphone.src,
      colors: ["#6366f1", "#ec4899", "#8b5cf6"],
    },
    {
      id: 2,
      name: "Bracelet Sport 40mm",
      price: 49.0,
      image: Iphone.src,
      colors: ["#4f46e5", "#7c3aed"],
    },
    {
      id: 3,
      name: "Bracelet Milanais",
      price: 199.0,
      image: Iphone.src,
      isNew: true,
    },
    {
      id: 4,
      name: "Coque Silicone MagSafe",
      price: 59.0,
      image: Iphone.src,
      colors: ["#3b82f6", "#8b5cf6", "#ec4899"],
    },
    {
      id: 5,
      name: "Porte-cartes MagSafe",
      price: 69.0,
      image: Iphone.src,
      colors: ["#1f2937"],
    },
    {
      id: 6,
      name: "Chargeur MagSafe",
      price: 45.0,
      image: Iphone.src,
      isNew: true,
    },
    {
      id: 7,
      name: "Support MagSafe",
      price: 39.0,
      image: Iphone.src,
      colors: ["#ffffff", "#1f2937"],
    },
  ],
};

const audioData: Section = {
  title: "Leçon de son",
  subtitle: "Un choix incroyable pour un son riche de haute qualité.",
  products: [
    {
      id: 1,
      name: "AirPods Pro 2",
      price: 279.0,
      image: Iphone.src,
      badge: "Gravure gratuite",
    },
    {
      id: 2,
      name: "AirPods Max",
      price: 579.0,
      image: Iphone.src,
      badge: "Gravure gratuite",
      colors: ["#6b7280", "#1f2937", "#ef4444", "#22c55e"],
    },
    {
      id: 3,
      name: "HomePod mini",
      price: 99.0,
      image: Iphone.src,
      colors: ["#1f2937", "#ef4444", "#22c55e"],
    },
    {
        id: 4,
        name: "HomePod mini",
        price: 99.0,
        image: Iphone.src,
        colors: ["#1f2937", "#ef4444", "#22c55e"],
      },
      {
        id: 5,
        name: "HomePod mini",
        price: 99.0,
        image: Iphone.src,
        colors: ["#1f2937", "#ef4444", "#22c55e"],
      },
      {
        id: 6,
        name: "HomePod mini",
        price: 99.0,
        image: Iphone.src,
        colors: ["#1f2937", "#ef4444", "#22c55e"],
      },
  ],
};

// Composant principal
const AppleStore = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Section section={accessoriesData} />
      <Section section={audioData} />
    </div>
  );
};

export default AppleStore;
