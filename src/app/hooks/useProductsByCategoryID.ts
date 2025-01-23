import { useState, useEffect, useCallback } from 'react';

interface Product {
  id: string;
  nom: string;
  prix: number;
  stock: number;
  etat: string;
  photos: string[];
  categorie_id: string;
  categorie_nom: string;
  localisation: string;
  description: string;
  nombre_vues: number;
  disponible: boolean;
  marque: string;
  modele: string;
  created_at: string;
  updated_at: string;
}

const useProductsByCategoryID = (categoryId: string) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  // Charger par défaut
  const [error, setError] = useState<string | null>(null);

  const fetchProductsByCategory = useCallback(async () => {
    if (!categoryId) return; // Si l'ID de la catégorie est absent, ne rien faire
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/products/by-category/${categoryId}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Erreur lors de la récupération des produits: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erreur inconnue');
      }
      console.error('Erreur détaillée:', err);
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  useEffect(() => {
    fetchProductsByCategory();
  }, [fetchProductsByCategory]);

  return {
    products,
    loading,
    error,
  };
};

export default useProductsByCategoryID;
