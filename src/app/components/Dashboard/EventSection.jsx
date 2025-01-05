import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import EventTable from './EventTable';
import { AddEventForm } from './forms/eventForm';

const evenementsExemple = [
  {
    id: 1,
    titre: 'Conférence Tech',
    description: 'Une conférence sur les nouvelles technologies.',
    dateDebut: '2025-01-10',
    dateFin: '2025-01-12',
    type: 'Conférence',
    statut: 'Actif',
    prix: 300,
  },
  {
    id: 2,
    titre: 'Atelier Design',
    description: 'Un atelier pratique sur le design UI/UX.',
    dateDebut: '2025-02-15',
    dateFin: '2025-02-16',
    type: 'Atelier',
    statut: 'Inactif',
    prix: 300,
  },
];

const EventSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [events, setEvents] = useState(evenementsExemple);

  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, { id: prevEvents.length + 1, ...newEvent }]);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Gestion des événements</h3>
        <Button
          className="flex items-center bg-blue-600 hover:bg-blue-700"
          onClick={() => setIsFormOpen(true)}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Nouvel événement
        </Button>
      </div>

      <Card>
        <CardContent>
          <EventTable events={events} />
        </CardContent>
      </Card>

      <AddEventForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddEvent}
      />
    </div>
  );
};

export default EventSection;
