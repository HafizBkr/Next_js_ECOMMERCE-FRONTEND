import { useState, useCallback } from 'react';

interface Event {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  start_time: string;
  price: number;
  event_type_id: string;
  available_seats: number;
  image_url: string;
  latitude: number;
  longitude: number;
}

interface EventFormData {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  start_time: string;
  price: number | string;
  event_type_id: string;
  available_seats: number | string;
  image_url: File[];  // Liste des fichiers à uploader
  latitude: number | string;
  longitude: number | string;
}

interface UseEventsReturn {
  events: Event[];
  loading: boolean;
  error: string | null;
  createEvent: (eventData: EventFormData) => Promise<CreateEventResponse>;
  deleteEvent: (id: string) => Promise<void>;
  getEvent: (id: string) => Promise<Event>;
  getAllEvents: () => Promise<void>;
  getEventsByCategory: (categoryId: string) => Promise<void>;
}

interface CreateEventResponse {
  success: boolean;
  eventId?: string;
  error?: string;
}

const API_BASE_URL = 'http://localhost:8080'; // URL de base pour les appels API
const UPLOAD_API_URL = 'http://localhost:3000/api/upload'; // URL pour l'upload d'images

const useEvents = (): UseEventsReturn => {
  const [events, setEvents] = useState<Event[]>([]);
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
      throw error;
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

 const createEvent = async (eventData: EventFormData): Promise<CreateEventResponse> => {
    setLoading(true);
    setError(null);
    try {
      // Téléchargement des images si elles existent
      const imageUrls = eventData.image_url?.length ? await uploadImages(eventData.image_url) : [];
  
      const finalEventData = {
        title: eventData.title,
        description: eventData.description,
        start_date: eventData.start_date,
        end_date: eventData.end_date,
        start_time: eventData.start_time,
        price: Number(eventData.price),
        event_type_id: eventData.event_type_id,
        available_seats: Number(eventData.available_seats),
        image_url: imageUrls.length > 0 ? imageUrls[0] : "",
        latitude: Number(eventData.latitude),
        longitude: Number(eventData.longitude),
      };
  
      const newEvent = await fetchApi<Event>('/events', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(finalEventData),
      });
  
      // Mettre à jour directement le state avec le nouvel événement
      setEvents(prevEvents => [...prevEvents, newEvent]);
  
      return { success: true, eventId: newEvent.id };
    } catch (error) {
      console.error('Erreur de création:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Une erreur est survenue' };
    } finally {
      setLoading(false);
    }
};

  const deleteEvent = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await fetchApi(`/events/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      setEvents((prev) => prev.filter((event) => event.id !== id));
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const getEvent = async (id: string): Promise<Event> => {
    setLoading(true);
    setError(null);
    try {
      return await fetchApi<Event>(`/events/${id}`);
    } finally {
      setLoading(false);
    }
  };

  const getAllEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApi<Event[]>('/events');
      setEvents(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getEventsByCategory = async (categoryId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchApi<Event[]>(`/events/by-category/${categoryId}`);
      setEvents(data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading,
    error,
    createEvent,
    deleteEvent,
    getEvent,
    getAllEvents,
    getEventsByCategory,
  };
};

export default useEvents;
