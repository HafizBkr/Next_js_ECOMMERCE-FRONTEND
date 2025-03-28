import { useState, useEffect, useCallback } from 'react';

interface EventCategory {
  id: string;
  label: string;
}

interface EventCategoryFormData {
  label: string;
}
const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8080';
const useEventCategories = () => {
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Récupération des catégories
  const fetchEventCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('${API_URL}/event-categories');
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Erreur lors de la récupération des catégories: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }
      const data: EventCategory[] = await response.json();
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
  }, []);

  const addEventCategory = async (categoryData: EventCategoryFormData) => {
    setError(null);
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setError('Token d\'administration manquant');
      return;
    }

    try {
      const response = await fetch('${API_URL}/event-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Erreur lors de l'ajout de la catégorie: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }

      // Récupérer les données actualisées après ajout
      await fetchEventCategories();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erreur inconnue");
      }
      console.error('Erreur détaillée:', err);
    }
  };

  const editEventCategory = async (id: string, categoryData: EventCategoryFormData) => {
    setError(null);
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setError('Token d\'administration manquant');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/event-categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          `Erreur lors de la modification de la catégorie: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }

      // Récupérer les données actualisées après modification
      await fetchEventCategories();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erreur inconnue");
      }
      console.error('Erreur détaillée:', err);
    }
  };

  const deleteEventCategory = async (id: string) => {
    setError(null);
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setError('Token d\'administration manquant');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/event-categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const text = await response.text();
      let errorData;
      try {
        errorData = text ? JSON.parse(text) : null;
      } catch (e) {
        errorData = text;
      }

      if (!response.ok) {
        throw new Error(
          `Erreur lors de la suppression de la catégorie: ${response.status} ${response.statusText}` +
          (errorData ? `\nDétails: ${JSON.stringify(errorData)}` : '')
        );
      }

      // Récupérer les données actualisées après suppression
      await fetchEventCategories();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Erreur lors de la suppression";
      console.error('Erreur détaillée:', err);
      setError(errorMessage);
    }
  };

  useEffect(() => {
    fetchEventCategories();
  }, [fetchEventCategories]);

  return {
    categories,
    loading,
    error,
    addEventCategory,
    editEventCategory,
    deleteEventCategory,
  };
};

export default useEventCategories;
