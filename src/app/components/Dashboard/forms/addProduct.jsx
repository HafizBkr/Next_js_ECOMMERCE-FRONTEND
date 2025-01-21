import { useState, useRef } from 'react';
import useCategories from '../../../hooks/useCategories';

export const AddProductForm = ({ isOpen, onClose, onSubmit }) => {
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const [formData, setFormData] = useState({
    nom: '',
    prix: '',
    stock: '',
    etat: '',
    categorie_id: '',
    localisation: '',
    description: '',
    marque: '',
    modele: '',
    disponible: true
  });
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const productData = {
    nom: formData.nom,
    prix: Number(formData.prix),
    stock: Number(formData.stock),
    etat: formData.etat,
    photos: [], // On envoie d'abord un tableau vide, l'upload des images sera géré séparément
    categorie_id: formData.categorie_id,
    localisation: formData.localisation,
    description: formData.description,
    marque: formData.marque,
    modele: formData.modele,
    disponible: formData.disponible
  };

  // Log des données avant envoi
  console.log('Données à envoyer:', productData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      prix: Number(formData.prix),
      stock: Number(formData.stock),
      photos: images.map(img => img.file)
    };
    onSubmit(productData);
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
            <label htmlFor="nom" className="block text-sm font-medium">Nom du produit</label>
            <input
              id="nom"
              className="w-full border rounded-md p-2"
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              placeholder="iPhone 15 Plus 128Go"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="marque" className="block text-sm font-medium">Marque</label>
              <input
                id="marque"
                className="w-full border rounded-md p-2"
                value={formData.marque}
                onChange={(e) => setFormData({ ...formData, marque: e.target.value })}
                placeholder="Apple"
                required
              />
            </div>
            <div>
              <label htmlFor="modele" className="block text-sm font-medium">Modèle</label>
              <input
                id="modele"
                className="w-full border rounded-md p-2"
                value={formData.modele}
                onChange={(e) => setFormData({ ...formData, modele: e.target.value })}
                placeholder="iPhone 15"
                required
              />
            </div>
          </div>

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
              <label htmlFor="prix" className="block text-sm font-medium">Prix (€)</label>
              <input
                id="prix"
                type="number"
                step="0.01"
                className="w-full border rounded-md p-2"
                value={formData.prix}
                onChange={(e) => setFormData({ ...formData, prix: e.target.value })}
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
            <label htmlFor="categorie_id" className="block text-sm font-medium">Catégorie</label>
            <select
              id="categorie_id"
              className="w-full border rounded-md p-2"
              value={formData.categorie_id}
              onChange={(e) => setFormData({ ...formData, categorie_id: e.target.value })}
              required
              disabled={categoriesLoading}
            >
              <option value="">Sélectionnez une catégorie</option>
              {categories
                ?.filter(cat => cat.statut === 'active')
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.nom}
                  </option>
              ))}
            </select>
            {categoriesError && (
              <p className="text-red-500 text-sm mt-1">
                Erreur de chargement des catégories
              </p>
            )}
          </div>

          <div>
            <label htmlFor="etat" className="block text-sm font-medium">État</label>
            <select
              id="etat"
              className="w-full border rounded-md p-2"
              value={formData.etat}
              onChange={(e) => setFormData({ ...formData, etat: e.target.value })}
              required
            >
              <option value="">Sélectionnez l'état</option>
              <option value="Neuf">Neuf</option>
              <option value="Très bon état">Très bon état</option>
              <option value="Bon état">Bon état</option>
              <option value="État correct">État correct</option>
            </select>
          </div>

          <div>
            <label htmlFor="localisation" className="block text-sm font-medium">Localisation</label>
            <input
              id="localisation"
              className="w-full border rounded-md p-2"
              value={formData.localisation}
              onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
              placeholder="Paris 11ème"
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
              placeholder="Description détaillée du produit"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.disponible}
                onChange={(e) => setFormData({ ...formData, disponible: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">Produit disponible</span>
            </label>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Ajouter le produit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};