import { Edit, Trash2 } from 'lucide-react';

const EventTable = ({ events }) => (
  <table className="w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Heure</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lieu</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {events && events.length > 0 ? (
        events.map((event) => (
          <tr key={event.id}>
            {/* Image de l'événement */}
            <td className="px-6 py-4">
              <img
                src={event.imageUrl}
                alt={`Image de l'événement ${event.titre}`}
                className="w-16 h-16 object-cover rounded-md"
              />
            </td>

            {/* Titre et description */}
            <td className="px-6 py-4">
              <div>
                <p className="font-medium">{event.titre}</p>
                <p className="text-sm text-gray-500">{event.description}</p>
              </div>
            </td>

            {/* Dates */}
            <td className="px-6 py-4">
              <div>
                <p>Début : {event.dateDebut}</p>
                <p>Fin : {event.dateFin}</p>
              </div>
            </td>

            {/* Heures */}
            <td className="px-6 py-4">
              <div>
                <p>Heure début : {event.heureDebut}</p>
                <p>Heure fin : {event.heureFin}</p>
              </div>
            </td>

            {/* Prix */}
            <td className="px-6 py-4">{event.prix} €</td>

            {/* Lieu */}
            <td className="px-6 py-4">
              <div>
                <p>{event.lieu}</p>
                <p className="text-sm text-gray-500">
                  Latitude : {event.latitude}, Longitude : {event.longitude}
                </p>
              </div>
            </td>

            {/* Type */}
            <td className="px-6 py-4">{event.type}</td>

            {/* Statut */}
            <td className="px-6 py-4">
              <span
                className={`px-2 py-1 text-sm rounded-full ${
                  event.statut === 'Actif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}
              >
                {event.statut}
              </span>
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
              <div className="flex space-x-3">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  aria-label="Modifier"
                  onClick={() => console.log('Modifier', event.id)}
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  aria-label="Supprimer"
                  onClick={() => console.log('Supprimer', event.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="9" className="text-center py-4">
            Aucun événement disponible.
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export default EventTable;
