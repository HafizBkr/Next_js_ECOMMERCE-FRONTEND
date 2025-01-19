import { useState, useEffect } from 'react';

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

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
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
      const data: Category[] = await response.json();
      setCategories(data);
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
  };

  const addCategory = async (categoryData: CategoryFormData) => {
    setError(null);
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setError('Token d\'administration manquant');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/categories', {
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

      const data: Category = await response.json();
      setCategories((prevCategories) => [...prevCategories, data]);
      return data;
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

  const editCategory = async (id: string, categoryData: CategoryFormData) => {
    setError(null);
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setError('Token d\'administration manquant');
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8080/categories/${id}`, {
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

      const data: Category = await response.json();
      setCategories((prevCategories) =>
        prevCategories.map((category) => (category.id === id ? data : category))
      );
      return data;
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

  const deleteCategory = async (id: string) => {
    setError(null);
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setError('Token d\'administration manquant');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/categories/${id}`, {
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

      setCategories((prevCategories) =>
        prevCategories.filter((category) => category.id !== id)
      );
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

  useEffect(() => {
    fetchCategories();
  }, []);

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