import { Edit, Trash2 } from 'lucide-react';

const EventTable = ({ events }) => (
  <table className="w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {events.map((event) => (
        <tr key={event.id}>
          <td className="px-6 py-4">
            <div>
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-gray-500">{event.description}</p>
            </div>
          </td>
          <td className="px-6 py-4">
            <div>
              <p>Début: {event.startDate}</p>
              <p>Fin: {event.endDate}</p>
            </div>
          </td>
          <td className="px-6 py-4">{event.type}</td>
          <td className="px-6 py-4">
            <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
              {event.status}
            </span>
          </td>
          <td className="px-6 py-4">
            <div className="flex space-x-3">
              <button className="text-blue-600 hover:text-blue-800">
                <Edit className="w-5 h-5" />
              </button>
              <button className="text-red-600 hover:text-red-800">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default EventTable; // Exportation par défaut
