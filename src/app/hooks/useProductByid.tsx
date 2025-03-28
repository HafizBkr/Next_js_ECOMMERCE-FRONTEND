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

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080';

const useProductByID = (productId: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/products/${productId}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Erreur lors de la récupération du produit: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }
      const data: Product = await response.json();
      setProduct(data);
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
  }, [productId]);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId, fetchProduct]);

  return {
    product,
    loading,
    error,
  };
};

export default useProductByID;
