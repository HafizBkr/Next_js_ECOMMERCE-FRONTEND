import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import image from "./iphone.jpg"

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
        src={`/api/placeholder/192/192`}
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

  const next = () => {
    setStartIndex((current) => 
      Math.min(current + itemsToShow, products.length - itemsToShow)
    );
  };

  const prev = () => {
    setStartIndex((current) => Math.max(current - itemsToShow, 0));
  };

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div 
          className="flex gap-4 transition-transform duration-300"
          style={{ transform: `translateX(-${startIndex * (256 + 16)}px)` }}
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
      price: 59.00,
      image: "./iphone.jpg",
      colors: ["#6366f1", "#ec4899", "#8b5cf6"]
    },
    {
      id: 2,
      name: "Bracelet Sport 40mm",
      price: 49.00,
      image: "../../../public/iphone.jpg",
      colors: ["#4f46e5", "#7c3aed"]
    },
    {
      id: 3,
      name: "Bracelet Milanais",
      price: 199.00,
      image: "../../../public/iphone.jpg",
      isNew: true
    },
    {
      id: 4,
      name: "Coque Silicone MagSafe",
      price: 59.00,
      image: "../../../public/iphone.jpg",
      colors: ["#3b82f6", "#8b5cf6", "#ec4899"]
    },
    {
      id: 5,
      name: "Porte-cartes MagSafe",
      price: 69.00,
      image: "/wallet.jpg",
      colors: ["#1f2937"]
    },
    {
      id: 6,
      name: "Chargeur MagSafe",
      price: 45.00,
      image: "../../../public/iphone.jpg",
      isNew: true
    },
    {
      id: 7,
      name: "Support MagSafe",
      price: 39.00,
      image: "/stand.jpg",
      colors: ["#ffffff", "#1f2937"]
    }
  ]
};

const audioData: Section = {
  title: "Leçon de son",
  subtitle: "Un choix incroyable pour un son riche de haute qualité.",
  products: [
    {
      id: 1,
      name: "AirPods Pro 2",
      price: 279.00,
      image: "../../../public/iphone.jpg",
      badge: "Gravure gratuite"
    },
    {
      id: 2,
      name: "AirPods Max",
      price: 579.00,
      image: "../../../public/iphone.jpg",
      badge: "Gravure gratuite",
      colors: ["#6b7280", "#1f2937", "#ef4444", "#22c55e"]
    },
    {
      id: 3,
      name: "HomePod mini",
      price: 99.00,
      image: "/homepod-mini.jpg",
      colors: ["#1f2937", "#ef4444", "#22c55e"]
    },
    {
      id: 4,
      name: "AirPods 3",
      price: 199.00,
      image: "../../../public/iphone.jpg",
      badge: "Gravure gratuite"
    },
    {
      id: 5,
      name: "Beats Solo Pro",
      price: 299.00,
      image: "../../../public/iphone.jpg",
      colors: ["#1f2937", "#ef4444", "#3b82f6"]
    },
    {
      id: 6,
      name: "Beats Studio Buds",
      price: 149.00,
      image: "../../../public/iphone.jpg",
      isNew: true,
      colors: ["#1f2937", "#ef4444", "#ffffff"]
    },
    {
      id: 7,
      name: "HomePod",
      price: 299.00,
      image: "../../../public/iphone.jpg",
      colors: ["#1f2937", "#ffffff"]
    },
    {
      id: 8,
      name: "Beats Flex",
      price: 69.00,
      image: "../../../public/iphone.jpg",
      colors: ["#1f2937", "#3b82f6", "#ef4444"]
    }
  ]
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