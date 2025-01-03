"use client"
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState } from 'react';
import billet from "../public/images/billet.png";

interface Event {
  id: string;
  name: string;
  description: string;
  location: { lat: number; lng: number };
}

const events: Event[] = [
  {
    id: '1',
    name: 'Concert à Lomé',
    description: 'Un concert incroyable pour toute la famille !',
    location: { lat: 6.1725, lng: 1.2312 },
  },
  {
    id: '2',
    name: 'Théâtre à Lomé',
    description: 'Venez découvrir une pièce captivante.',
    location: { lat: 6.1373, lng: 1.2121 },
  },
  {
    id: '3',
    name: 'Projection de film',
    description: 'Une expérience cinématographique unique !',
    location: { lat: 6.1857, lng: 1.2248 },
  },
];

const Map = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const containerStyle = {
    width: '100%',
    height: '500px',
  };

  const center = { lat: 6.1725, lng: 1.2312 };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCTaXylfQ6qZvjZmIB_SkCi62l4TF107Eg">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
        {events.map((event) => (
          <Marker
            key={event.id}
            position={event.location}
            onClick={() => setSelectedEvent(event)}
            icon={{
              url: billet.src,
              scaledSize: typeof window !== 'undefined' && window.google
                ? new window.google.maps.Size(30, 30)
                : undefined, // Vérification avant d'utiliser google.maps
            }}
          />
        ))}

        {selectedEvent && (
          <InfoWindow
            position={selectedEvent.location}
            onCloseClick={() => setSelectedEvent(null)}
          >
            <div>
              <h3 className="text-lg font-bold">{selectedEvent.name}</h3>
              <p className="text-sm">{selectedEvent.description}</p>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => alert(`Réservation confirmée pour : ${selectedEvent.name}`)}
              >
                Réserver
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
