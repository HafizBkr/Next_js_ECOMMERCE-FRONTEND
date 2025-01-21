import React, { useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import useEvents from '../../hooks/useEvents';

const EventTable = () => {
  const { events, loading, error, getAllEvents, deleteEvent } = useEvents();

  // Charger tous les événements au montage du composant
  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  // Gestion des erreurs
  if (error) {
    return <p className="text-red-500">Erreur : {error}</p>;
  }

  // Loader
  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Image</th>
          <th className="border border-gray-300 p-2">Titre</th>
          <th className="border border-gray-300 p-2">Description</th>
          <th className="border border-gray-300 p-2">Date</th>
          <th className="border border-gray-300 p-2">Prix</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id} className="text-center">
            {/* Afficher l'image */}
            <td className="border border-gray-300 p-2">
              <img
                src={event.image_url}
                alt={event.title}
                className="w-16 h-16 object-cover mx-auto"
              />
            </td>
            <td className="border border-gray-300 p-2">{event.title}</td>
            <td className="border border-gray-300 p-2">{event.description}</td>
            <td className="border border-gray-300 p-2">
              {event.start_date} - {event.end_date}
            </td>
            <td className="border border-gray-300 p-2">{event.price} €</td>
            <td className="border border-gray-300 p-2">
              <button
                className="text-blue-500 hover:text-blue-700 mr-2"
                onClick={() => console.log(`Modifier l'événement ${event.id}`)}
              >
                <Edit />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => deleteEvent(event.id)}
              >
                <Trash2 />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;
