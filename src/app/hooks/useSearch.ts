import { useState, useCallback } from 'react';

interface Product {
  id: string;
  nom: string;
  prix: number;
  photos: string[];
  description: string;
  marque: string;
  stock: number;
  etat: string;
}

interface ProductSearchHook {
  searchResults: Product[];
  loading: boolean;
  error: string | null;
  searchProducts: (query: string) => Promise<void>;
}
const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080';

const useProductSearch = (): ProductSearchHook => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const searchProducts = useCallback(async (query: string) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const url = `${API_URL}/products/search?q=${encodeURIComponent(query.trim())}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Recherche échouée: ${response.status} - ${errorBody}`);
      }

      const data = await response.json();
      // Ensure we always set an array, even if the API returns null or undefined
      setSearchResults(Array.isArray(data) ? data : []);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Erreur de recherche inattendue';
      
      setError(errorMessage);
      setSearchResults([]);
      console.error('Détails de l\'erreur:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { searchResults, loading, error, searchProducts };
};

export default useProductSearch;