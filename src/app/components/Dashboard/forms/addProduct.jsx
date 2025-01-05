import { useState, useRef } from 'react';

const AddProductForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    stock: '',
    category: '',
    condition: '',
    location: '',
    description: ''
  });
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, images });
    onClose();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = [...e.dataTransfer.files];
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = [...e.target.files];
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const validImageFiles = files.filter(file => 
      file.type.startsWith('image/')
    );

    validImageFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages(prevImages => [...prevImages, {
          file,
          preview: e.target.result,
          id: Date.now() + Math.random()
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id) => {
    setImages(prevImages => prevImages.filter(image => image.id !== id));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto py-8">
      <div className="bg-white rounded-lg p-6 max-w-[1000px] w-full m-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Ajouter un nouveau produit</h2>
          <p className="text-gray-600">Remplissez les informations du produit ci-dessous</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Nom du produit</label>
            <input
              id="name"
              className="w-full border rounded-md p-2"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="iPhone 15 Plus 128Go"
              required
            />
          </div>

          {/* Image upload section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Photos du produit</label>
            <div
              className={`border-2 border-dashed rounded-lg p-4 text-center ${
                isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
              />
              <div className="space-y-2 cursor-pointer">
                <div className="text-4xl text-gray-400">📸</div>
                <div className="text-gray-600">
                  Glissez et déposez vos images ici ou cliquez pour sélectionner
                </div>
                <div className="text-sm text-gray-500">
                  Formats acceptés: PNG, JPG, JPEG
                </div>
              </div>
            </div>

            {/* Image previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.preview}
                      alt="Preview"
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 
                               opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium">Prix (€)</label>
              <input
                id="price"
                type="number"
                className="w-full border rounded-md p-2"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="779.00"
                required
              />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium">Stock</label>
              <input
                id="stock"
                type="number"
                className="w-full border rounded-md p-2"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="10"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="condition" className="block text-sm font-medium">État</label>
            <select
              id="condition"
              className="w-full border rounded-md p-2"
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            >
              <option value="">Sélectionnez l'état</option>
              <option value="new">Neuf</option>
              <option value="like-new">Reconditionné - Comme neuf</option>
              <option value="used">Occasion</option>
            </select>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium">Localisation</label>
            <input
              id="location"
              className="w-full border rounded-md p-2"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Paris 11ème"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium">Description</label>
            <textarea
              id="description"
              className="w-full border rounded-md p-2"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description détaillée du produit"
              rows={4}
            />
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
              Ajouter le produit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// Rest of the components remain the same
export { AddProductForm, AddEventForm, AddCategoryForm };