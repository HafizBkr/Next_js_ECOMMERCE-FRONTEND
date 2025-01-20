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
  categories: Category[]; // Nouvelle propriété pour les catégories
  loading: boolean;
  error: string | null;
  createProduct: (productData: ProductFormData) => Promise<void>;
  updateProduct: (id: string, productData: ProductFormData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProduct: (id: string) => Promise<Product>;
  getAllProducts: () => Promise<void>;
  getProductsByCategory: (categoryId: string) => Promise<void>;
  getCategories: () => Promise<void>; // Fonction pour récupérer les catégories
}

const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]); // État pour les catégories
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiError = (error: any) => {
    const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
    setError(errorMessage);
    console.error('Erreur détaillée:', error);
    throw error;
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      throw new Error('Token d\'administration manquant');
    }
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  };

  // Fonction pour uploader les images et obtenir leurs URLs
  const uploadImages = async (photos: File[]): Promise<string[]> => {
    // Remplacez ceci par une logique réelle pour télécharger les images
    return photos.map((_, index) => `https://example.com/photo${index + 1}.jpg`);
  };

  // Créer un nouveau produit
  const createProduct = async (productData: ProductFormData) => {
    setLoading(true);
    setError(null);

    try {
      const photoUrls = await uploadImages(productData.photos);

      const response = await fetch('http://localhost:8080/products', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...productData,
          prix: Number(productData.prix),
          stock: Number(productData.stock),
          photos: photoUrls,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Erreur lors de la création du produit: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }

      await getAllProducts();
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  // Mettre à jour un produit existant
  const updateProduct = async (id: string, productData: ProductFormData) => {
    setLoading(true);
    setError(null);

    try {
      const photoUrls = await uploadImages(productData.photos);

      const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...productData,
          prix: Number(productData.prix),
          stock: Number(productData.stock),
          photos: photoUrls,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Erreur lors de la mise à jour du produit: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }

      await getAllProducts();
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  // Supprimer un produit
  const deleteProduct = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/products/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Erreur lors de la suppression du produit: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }

      await getAllProducts();
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer un produit spécifique
  const getProduct = async (id: string): Promise<Product> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/products/${id}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Erreur lors de la récupération du produit: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }

      const product = await response.json();
      return product;
    } catch (err) {
      handleApiError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Récupérer tous les produits
  const getAllProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/products');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Erreur lors de la récupération des produits: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Récupérer les produits par catégorie
  const getProductsByCategory = async (categoryId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8080/products/by-category/${categoryId}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Erreur lors de la récupération des produits par catégorie: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  // Récupérer toutes les catégories
  const getCategories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/categories');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Erreur lors de la récupération des catégories: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }

      const data = await response.json();
      setCategories(data);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    categories, // Retourner les catégories
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProducts,
    getProductsByCategory,
    getCategories, // Ajouter la fonction getCategories
  };
};

export default useProducts;
