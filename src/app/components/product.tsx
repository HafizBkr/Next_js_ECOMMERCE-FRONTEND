import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useProducts from "../hooks/useProducts";

// Types
interface Product {
  id?: string;
  nom: string;
  prix: number;
  stock: number;
  etat: string;
  photos: string[];
  categorie_id: string;
  localisation: string;
  description: string;
  marque: string;
  modele: string;
  disponible: boolean;
}

// Composant pour chaque carte produit
const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="group relative p-4 bg-white rounded-lg shadow hover:shadow-lg transition-all duration-300 flex-shrink-0 w-64">
    <div className="flex justify-center mb-4">
      <img
        src={product.photos?.[0] || "/images/default-product.png"}
        alt={product.nom}
        className="w-48 h-48 object-contain group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div className="space-y-2">
      <h3 className="font-medium text-sm line-clamp-2">{product.nom}</h3>
      <p className="text-gray-900 font-medium">{product.prix.toFixed(2)} €</p>
    </div>
  </div>
);

// Composant carrousel
const ProductCarousel: React.FC<{ products: Product[] }> = ({ products }) => {
  const [startIndex, setStartIndex] = React.useState(0);
  const itemsToShow = 4;

  const next = () =>
    setStartIndex((current) =>
      Math.min(current + 1, products.length - itemsToShow),
    );
  const prev = () => setStartIndex((current) => Math.max(current - 1, 0));

  return (
    <div className="relative px-4">
      <div className="overflow-hidden">
        <div
          className="flex gap-4 transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(-${startIndex * (256 + 16)}px)`,
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      {startIndex > 0 && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          onClick={prev}
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
      )}
      {startIndex < products.length - itemsToShow && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
          onClick={next}
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      )}
    </div>
  );
};

// Landing Page principale
const LandingPageProducts: React.FC = () => {
  const { products, getAllProducts, loading, error } = useProducts();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // Limiter les produits à 20
  const limitedProducts = products?.slice(0, 20);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        Une erreur est survenue : {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Nos Produits</h1>
        <a href="/products" className="text-blue-600 hover:underline">
          Voir tous les produits
        </a>
      </div>

      {limitedProducts?.length > 0 ? (
        <ProductCarousel products={limitedProducts} />
      ) : (
        <div className="text-center text-gray-500 py-12">
          Aucun produit disponible.
        </div>
      )}
    </div>
  );
};

export default LandingPageProducts;
