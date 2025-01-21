import { useState, useRef, FormEvent } from 'react';
import useEvents from '../../../hooks/useEvents';
import useEventCategories from '../../../hooks/useEventsCategories'; // Vérifiez l'importation du hook

interface AddEventFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddEventForm = ({ isOpen, onClose }: AddEventFormProps) => {
  const { createEvent, loading, error } = useEvents();
  const { categories, loading: loadingCategories, error: errorCategories } = useEventCategories(); // Modifié en fonction de la structure du hook
  const [formData, setFormData] = useState({
    title: '',
    start_date: '',
    end_date: '',
    start_time: '',
    price: '',
    description: '',
    event_type_id: '',
    latitude: '',
    longitude: '',
    available_seats: '',
    image_url: [] as File[]
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await createEvent({
        ...formData,
        price: Number(formData.price),
        available_seats: Number(formData.available_seats)
      });

      if (response.success) {
        onClose();
        setFormData({
          title: '',
          start_date: '',
          end_date: '',
          start_time: '',
          price: '',
          description: '',
          event_type_id: '',
          latitude: '',
          longitude: '',
          available_seats: '',
          image_url: []
        });
        setImagePreview(null);
      } else {
        console.error('Erreur lors de la création:', response.error);
      }
    } catch (err) {
      console.error('Erreur lors de la soumission:', err);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({
        ...prev,
        image_url: [file]
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMapClick = (lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      latitude: lat.toString(),
      longitude: lng.toString()
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-lg p-6 max-w-[1200px] w-full m-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Ajouter un nouvel événement</h2>
          <p className="text-gray-600">Configurez les détails de l'événement</p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {errorCategories && <p className="text-red-500 mt-2">{errorCategories}</p>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium">Titre de l'événement</label>
                <input
                  id="title"
                  className="w-full border rounded-md p-2"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Concert Jazz Festival"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="start_date" className="block text-sm font-medium">Date de début</label>
                  <input
                    id="start_date"
                    type="date"
                    className="w-full border rounded-md p-2"
                    value={formData.start_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="end_date" className="block text-sm font-medium">Date de fin</label>
                  <input
                    id="end_date"
                    type="date"
                    className="w-full border rounded-md p-2"
                    value={formData.end_date}
                    onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="start_time" className="block text-sm font-medium">Heure de début</label>
                  <input
                    id="start_time"
                    type="time"
                    className="w-full border rounded-md p-2"
                    value={formData.start_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
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
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="25000"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="event_type_id" className="block text-sm font-medium">Type d'événement</label>
                <select
                  id="event_type_id"
                  className="w-full border rounded-md p-2"
                  value={formData.event_type_id}
                  onChange={(e) => setFormData(prev => ({ ...prev, event_type_id: e.target.value }))}
                  required
                >
                  <option value="">Sélectionnez le type</option>
                  {loadingCategories ? (
                    <option value="">Chargement des catégories...</option>
                  ) : (
                    categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div>
                <label htmlFor="available_seats" className="block text-sm font-medium">Places disponibles</label>
                <input
                  id="available_seats"
                  type="number"
                  className="w-full border rounded-md p-2"
                  value={formData.available_seats}
                  onChange={(e) => setFormData(prev => ({ ...prev, available_seats: e.target.value }))}
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
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description de l'événement"
                  rows={4}
                />
              </div>
            </div>

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
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-40 mx-auto"
                    />
                  ) : (
                    <div className="space-y-2 cursor-pointer">
                      <div className="text-4xl text-gray-400">🖼️</div>
                      <div className="text-sm text-gray-600">Cliquez pour télécharger une image</div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Localisation de l'événement</label>
                <div
                  ref={mapRef}
                  className="w-full h-64 border border-gray-300 rounded-lg bg-gray-200"
                  onClick={() => handleMapClick(12.34, 56.78)} // Exemple de gestion de clic sur la carte
                >
                  {/* Ajouter la carte ici */}
                  <p>Carte interactive</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
          <div className="grid grid-cols-2 gap-4">
  <div>
    <label htmlFor="latitude" className="block text-sm font-medium">Latitude</label>
    <input
      id="latitude"
      type="number"
      step="any"
      className="w-full border rounded-md p-2"
      value={formData.latitude}
      onChange={(e) => setFormData(prev => ({ ...prev, latitude: e.target.value }))}
      placeholder="12.345678"
      required
    />
  </div>
  <div>
    <label htmlFor="longitude" className="block text-sm font-medium">Longitude</label>
    <input
      id="longitude"
      type="number"
      step="any"
      className="w-full border rounded-md p-2"
      value={formData.longitude}
      onChange={(e) => setFormData(prev => ({ ...prev, longitude: e.target.value }))}
      placeholder="98.765432"
      required
    />
  </div>
</div>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-sm font-semibold rounded-md"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md"
              disabled={loading || loadingCategories}
            >
              {loading ? 'Création en cours...' : 'Créer l\'événement'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};