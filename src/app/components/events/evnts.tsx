"use client"
import React, { useState, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { Ticket, Calendar, Clock, X, Users, ChevronRight } from 'lucide-react';
import Events from "@/app/public/images/event.jpg"
import ticket from "@/app/public/images/billet.png"

interface EventLocation {
  lat: number;
  lng: number;
}

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  price: string;
  coordinates: EventLocation;
  available: number;
  image: string;
}

// Composant personnalisé pour le marqueur de ticket
const TicketMarker = () => (
  <div className="relative p-2">
    <div className="absolute -top-8 -left-4 bg-blue-500 text-white p-2 rounded-lg shadow-lg transform hover:scale-110 transition-transform cursor-pointer">
      <Ticket className="w-4 h-4" />
    </div>
  </div>
);

const EventMapPage = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<Event | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const center = {
    lat: 6.1319,
    lng: 1.2228
  };

  const events: Event[] = [
    {
      id: 1,
      title: "Concert Jazz Festival",
      date: "15 Jan 2025",
      time: "20:00",
      location: "Palais des Congrès",
      price: "25,000 CFA",
      coordinates: { lat: 6.1319, lng: 1.2228 },
      available: 145,
      image: Events.src
    },
    {
      id: 2,
      title: "Festival Hip-Hop",
      date: "22 Jan 2025",
      time: "19:00",
      location: "Stade de Kégué",
      price: "15,000 CFA",
      coordinates: { lat: 6.1750, lng: 1.2083 },
      available: 280,
      image: Events.src
    }
  ];

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCTaXylfQ6qZvjZmIB_SkCi62l4TF107Eg"
  });

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{ color: "#444444" }]
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [{ color: "#f2f2f2" }]
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [{ visibility: "off" }]
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [{ color: "#c3d1e4" }]
      }
    ]
  };

  const onMarkerClick = useCallback((event: Event) => {
    setSelectedMarker(event);
  }, []);

  if (!isLoaded) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Map Section */}
      <div className="h-[50vh] relative">
        <GoogleMap
          mapContainerClassName="w-full h-full"
          center={center}
          zoom={13}
          options={mapOptions}
        >
          {events.map((event) => (
            <Marker
              key={event.id}
              position={event.coordinates}
              onClick={() => onMarkerClick(event)}
              icon={{
                url: ticket.src,
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            />
          ))}
          
          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.coordinates}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="p-3 min-w-[200px]">
                <h3 className="font-bold text-lg mb-2">{selectedMarker.title}</h3>
                <p className="text-gray-600 mb-2">{selectedMarker.date}</p>
                <p className="text-blue-600 font-bold mb-2">{selectedMarker.price}</p>
                <button 
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  onClick={() => setSelectedEvent(selectedMarker)}
                >
                  Réserver
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      {/* Events Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="bg-white rounded-xl shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6">Événements à Lomé</h1>
          
          {/* Filtres horizontaux */}
          <div className="flex gap-4 overflow-x-auto pb-4 mb-6">
            {['Tous', 'Concerts', 'Festivals', 'Sports', 'Théâtre'].map((category) => (
              <button
                key={category}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-colors ${
                  activeCategory === category.toLowerCase()
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                onClick={() => setActiveCategory(category.toLowerCase())}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Liste des événements */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div 
                key={event.id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {event.price}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-blue-500">
                    <span className="text-sm">{event.available} places restantes</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de réservation */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative animate-fade-in">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>

            <img 
              src={selectedEvent.image} 
              alt={selectedEvent.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            <h3 className="text-2xl font-bold mb-4">{selectedEvent.title}</h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>{selectedEvent.date} à {selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>{selectedEvent.available} places disponibles</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nombre de billets</label>
                <select className="border rounded-lg px-3 py-2">
                  {[1,2,3,4,5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
              <div className="text-right">
                <span className="block text-sm text-gray-600">Prix unitaire</span>
                <span className="text-xl font-bold text-blue-600">{selectedEvent.price}</span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
              Réserver maintenant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventMapPage;