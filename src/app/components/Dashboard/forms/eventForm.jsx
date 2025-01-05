import { useState, useRef } from 'react';


const AddEventForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    startTime: '',
    price: '',
    description: '',
    type: '',
    location: '',
    latitude: '',
    longitude: '',
    availableSeats: '',
    image: null,
    imagePreview: null
  });

  const fileInputRef = useRef(null);
  const mapRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          imagePreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMapClick = (e) => {
    // Cette fonction serait appelée lors d'un clic sur la carte
    const lat = e.latlng.lat;
    const lng = e.latlng.lng;
    setFormData(prev => ({
      ...prev,
      latitude: lat,
      longitude: lng
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-lg p-6 max-w-[1200px] w-full m-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Ajouter un nouvel événement</h2>
          <p className="text-gray-600">Configurez les détails de l'événement</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Colonne gauche */}
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium">Titre de l'événement</label>
                <input
                  id="title"
                  className="w-full border rounded-md p-2"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Concert Jazz Festival"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startDate" className="block text-sm font-medium">Date de début</label>
                  <input
                    id="startDate"
                    type="date"
                    className="w-full border rounded-md p-2"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="endDate" className="block text-sm font-medium">Date de fin</label>
                  <input
                    id="endDate"
                    type="date"
                    className="w-full border rounded-md p-2"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium">Heure de début</label>
                  <input
                    id="startTime"
                    type="time"
                    className="w-full border rounded-md p-2"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="price" className="block text-sm font-medium">Prix (CFA)</label>
                  <input
                    id="price"
                    type="number"
                    className="w-full border rounded-md p-2"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="25000"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium">Type d'événement</label>
                <select
                  id="type"
                  className="w-full border rounded-md p-2"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  <option value="">Sélectionnez le type</option>
                  <option value="Concerts">Concert</option>
                  <option value="Festivals">Festival</option>
                  <option value="Sports">Sport</option>
                  <option value="Théâtre">Théâtre</option>
                </select>
              </div>

              <div>
                <label htmlFor="availableSeats" className="block text-sm font-medium">Places disponibles</label>
                <input
                  id="availableSeats"
                  type="number"
                  className="w-full border rounded-md p-2"
                  value={formData.availableSeats}
                  onChange={(e) => setFormData({ ...formData, availableSeats: e.target.value })}
                  placeholder="150"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <textarea
                  id="description"
                  className="w-full border rounded-md p-2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Description de l'événement"
                  rows={4}
                />
              </div>
            </div>

            {/* Colonne droite */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Image de l'événement</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-4 text-center ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                  {formData.imagePreview ? (
                    <img
                      src={formData.imagePreview}
                      alt="Preview"
                      className="max-h-40 mx-auto"
                    />
                  ) : (
                    <div className="space-y-2 cursor-pointer">
                      <div className="text-4xl text-gray-400">🖼️</div>
                      <div className="text-gray-600">
                        Cliquez pour ajouter une image
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Localisation sur la carte</label>
                <div className="h-[300px] bg-gray-100 rounded-lg">
                  {/* Ici, vous intégrerez votre composant de carte (Google Maps, Leaflet, etc.) */}
                  <div ref={mapRef} className="w-full h-full rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <input
                      type="text"
                      placeholder="Latitude"
                      className="w-full border rounded-md p-2"
                      value={formData.latitude}
                      onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Longitude"
                      className="w-full border rounded-md p-2"
                      value={formData.longitude}
                      onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 border rounded-md"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Créer l'événement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { AddEventForm };