import { useState, useEffect, useCallback } from 'react';

interface Category {
  id: string;
  nom: string;
  nombre_produits: number;
  statut: 'active' | 'inactive';
}

interface CategoryFormData {
  nom: string;
  nombre_produits: number;
  statut: 'active' | 'inactive';
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080';

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fonction pour récupérer les catégories
  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching from:", `${API_URL}/categories`);
      const response = await fetch(`${API_URL}/categories`);
  
      console.log("Response status:", response.status);
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Erreur API:", response.status, response.statusText, errorData);
        throw new Error(
          `Erreur lors de la récupération des catégories: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }
  
      const data: Category[] = await response.json();
      console.log("Données récupérées:", data);
      setCategories(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erreur inconnue');
      }
      console.error("Erreur détaillée:", err);
    } finally {
      setLoading(false);
    }
  }, []);
  

  // Ajouter une nouvelle catégorie
  const addCategory = async (categoryData: CategoryFormData) => {
    setError(null);
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setError('Token d\'administration manquant');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...categoryData,
          nombre_produits: Number(categoryData.nombre_produits)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Erreur lors de l'ajout de la catégorie: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }

      // Récupérer les catégories mises à jour après ajout
      await fetchCategories();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erreur inconnue");
      }
      console.error('Erreur détaillée:', err);
      throw err;
    }
  };

  // Modifier une catégorie
  const editCategory = async (id: string, categoryData: CategoryFormData) => {
    setError(null);
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setError('Token d\'administration manquant');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...categoryData,
          nombre_produits: Number(categoryData.nombre_produits)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Erreur lors de la modification de la catégorie: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }

      // Récupérer les catégories mises à jour après modification
      await fetchCategories();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erreur inconnue");
      }
      console.error('Erreur détaillée:', err);
      throw err;
    }
  };

  // Supprimer une catégorie
  const deleteCategory = async (id: string) => {
    setError(null);
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setError('Token d\'administration manquant');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Erreur lors de la suppression de la catégorie: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }

      // Récupérer les catégories mises à jour après suppression
      await fetchCategories();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erreur inconnue");
      }
      console.error('Erreur détaillée:', err);
      throw err;
    }
  };

  // Charger les catégories au démarrage
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    addCategory,
    editCategory,
    deleteCategory,
  };
};

export default useCategories;
