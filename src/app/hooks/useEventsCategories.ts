import { useState, useEffect } from 'react';

interface EventCategory {
  id: string;
  label: string;
}

interface EventCategoryFormData {
  label: string;
}

const useEventCategories = () => {
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEventCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/event-categories');
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
  };

  const addEventCategory = async (categoryData: EventCategoryFormData) => {
    setError(null);
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setError('Token d\'administration manquant');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/event-categories', {
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

      const data: EventCategory = await response.json();
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

  const editEventCategory = async (id: string, categoryData: EventCategoryFormData) => {
    setError(null);
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setError('Token d\'administration manquant');
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8080/event-categories/${id}`, {
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

      const data: EventCategory = await response.json();
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

  const deleteEventCategory = async (id: string) => {
    setError(null);
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setError('Token d\'administration manquant');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/event-categories/${id}`, {
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
    fetchEventCategories();
  }, []);

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