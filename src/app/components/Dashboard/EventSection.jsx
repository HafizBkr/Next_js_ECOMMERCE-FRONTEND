// components/sections/Events/EventSection.js
import { PlusCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import EventTable from './EventTable';

const EventSection = ({ events, onAddEvent }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium">Gestion des événements</h3>
      <Button 
        className="flex items-center bg-blue-600 hover:bg-blue-700"
        onClick={onAddEvent}
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
  </div>
);

export default EventSection;