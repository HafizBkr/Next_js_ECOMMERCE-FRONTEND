import { useState, useEffect } from 'react';
import { MapPin, Image, Edit, Trash2 } from 'lucide-react';
import { AddProductForm } from './forms/addProduct'; // Formulaire pour ajouter ou modifier un produit
import useProducts from '../../hooks/useProducts';

const ProductTable = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // Produit en cours d'édition
  const [selectedCategory, setSelectedCategory] = useState(''); // Catégorie sélectionnée pour le filtre
  const { 
    products, 
    categories,  // Récupérer les catégories dynamiquement
    loading, 
    error, 
    deleteProduct, 
    createProduct, 
    updateProduct, 
    getAllProducts 
  } = useProducts();

  // Charger les produits et catégories au montage du composant
  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  // Gérer la suppression d'un produit
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      try {
        await deleteProduct(id);
        await getAllProducts(); // Rafraîchir la liste des produits après suppression
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
      }
    }
  };

  // Gérer l'ajout ou la modification d'un produit
  const handleSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, formData);
      } else {
        await createProduct(formData);
      }
      await getAllProducts();
      setIsAddModalOpen(false);
      setEditingProduct(null);
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
    }
  };

  // Filtrer les produits par catégorie
  const filteredProducts = selectedCategory
    ? products.filter(product => product.categorie_nom === selectedCategory)
    : products;

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Produits</h1>
        <button
          onClick={() => {
            setEditingProduct(null); // Pas de produit en édition
            setIsAddModalOpen(true); // Ouvrir le modal d'ajout
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Ajouter un produit
        </button>
      </div>

      {/* Filtre par catégorie */}
      <div className="mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Toutes les catégories</option>
          {categories && categories.length > 0 ? (
            categories.map(category => (
              <option key={category.id} value={category.nom}>
                {category.nom}
              </option>
            ))
          ) : (
            <option>Aucune catégorie disponible</option>
          )}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">État</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Localisation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Images</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium">{product.nom}</span>
                    <span className="text-sm text-gray-500">
                      {product.marque} - {product.modele}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">{product.prix} €</td>
                <td className="px-6 py-4">{product.etat}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">{product.localisation}</td>
                <td className="px-6 py-4">{product.categorie_nom}</td>
                <td className="px-6 py-4">
                  {product.photos.length > 0 && (
                    <img
                      src={product.photos[0]} // Récupère la première photo
                      alt="Photo du produit"
                      className="w-10 h-10 rounded"
                    />
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setIsAddModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAddModalOpen && (
        <AddProductForm
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingProduct(null);
          }}
          initialData={editingProduct}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default ProductTable;
