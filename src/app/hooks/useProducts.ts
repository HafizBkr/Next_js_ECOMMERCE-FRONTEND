import { useState, useCallback } from 'react';

interface Category {
  id: string;
  nom: string;
}

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

interface ProductFormData {
  nom: string;
  prix: number | string;
  stock: number | string;
  etat: string;
  photos: File[];
  categorie_id: string;
  localisation: string;
  description: string;
  marque: string;
  modele: string;
  disponible: boolean;
}

interface UseProductsReturn {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  createProduct: (productData: ProductFormData) => Promise<CreateProductResponse>;
  deleteProduct: (id: string) => Promise<void>;
  getProduct: (id: string) => Promise<Product>;
  getAllProducts: () => Promise<void>;
  getProductsByCategory: (categoryId: string) => Promise<void>;
  getCategories: () => Promise<void>;
  updateProduct: (id: string, updatedData: ProductFormData) => Promise<void>;
}

interface CreateProductResponse {
  success: boolean;
  productId?: string;
  error?: string;
}
const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080';

const API_BASE_URL = `${API_URL}`; // URL de base pour les appels API
const UPLOAD_API_URL = 'http://localhost:3000/api/upload'; // URL pour l'upload d'images

const useProducts = (productId: string): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiError = (error: unknown) => {
    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
    setError(errorMessage);
    console.error('Erreur détaillée:', error);
    throw new Error(errorMessage);
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      throw new Error("Token d'administration manquant");
    }
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  const fetchApi = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `${response.status} ${response.statusText}` +
            (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }
      return await response.json();
    } catch (error) {
      handleApiError(error);
      throw error; // Rejette pour une gestion explicite en dehors
    }
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('file', file));
  
    try {
      const response = await fetch(UPLOAD_API_URL, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`Upload échoué: ${response.statusText}`);
      }
      const data: { urls: string[] } = await response.json();
      console.log('URLs des fichiers téléchargés:', data.urls);  // Log pour vérifier les URLs
      return data.urls;
    } catch (error) {
      handleApiError(error);
      return [];
    }
  };
  
  
  const createProduct = async (productData: ProductFormData): Promise<CreateProductResponse> => {
    setLoading(true);
    setError(null);
    try {
      // Téléchargement des images si elles existent
      const photoUrls = productData.photos?.length ? await uploadImages(productData.photos) : [];
  
      // Réorganiser les données dans l'ordre souhaité
      const finalProductData = {
        nom: productData.nom,
        prix: Number(productData.prix),
        stock: Number(productData.stock),
        etat: productData.etat,
        photos: photoUrls, // Les photos téléchargées
        categorie_id: productData.categorie_id,
        localisation: productData.localisation,
        description: productData.description,
        marque: productData.marque,
        modele: productData.modele,
        disponible: productData.disponible,
      };
  
      // Log pour déboguer l'objet final avant l'envoi
      console.log('Data envoyée pour création de produit:', finalProductData);
  
      // Appel à l'API pour créer un produit
      const newProduct = await fetchApi<Product>('/products', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(finalProductData),
      });
  
      // Ajouter le nouveau produit à la liste
      setProducts((prev) => [...prev, newProduct]);
  
      return { success: true, productId: newProduct.id };
    } catch (error) {
      console.error("Erreur de création:", error);
      return { success: false, error: error instanceof Error ? error.message : 'Une erreur est survenue' };
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, updatedData: ProductFormData): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      // Téléchargement des nouvelles images si elles existent
      const updatedPhotos = updatedData.photos?.length ? await uploadImages(updatedData.photos) : [];
  
      // Réorganiser les données pour l'API
      const finalUpdatedData = {
        ...updatedData,
        prix: Number(updatedData.prix),
        stock: Number(updatedData.stock),
        photos: updatedPhotos,
      };
  
      console.log('Données mises à jour:', finalUpdatedData);
  
      // Appel à l'API pour mettre à jour le produit
      await fetchApi<void>(`/products/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(finalUpdatedData),
      });
  
      // Mettre à jour le produit dans l'état local
      setProducts((prev) =>
        prev.map((product) =>
          product.id === id ? { ...product, ...finalUpdatedData } : product
        )
      );
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };
  
  const deleteProduct = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await fetchApi(`/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const getProduct = async (id: string): Promise<Product> => {
    setLoading(true);
    setError(null);
    try {
      return await fetchApi<Product>(`/products/${id}`);
    } finally {
      setLoading(false);
    }
  };

  const getAllProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApi<Product[]>('/products');
      setProducts(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductsByCategory = async (categoryId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApi<Product[]>(`/products/by-category/${categoryId}`);
      setProducts(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApi<Category[]>('/categories');
      setCategories(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    categories,
    loading,
    error,
    createProduct,
    deleteProduct,
    getProduct,
    updateProduct,
    getAllProducts,
    getProductsByCategory,
    getCategories,
  };
};

export default useProducts;