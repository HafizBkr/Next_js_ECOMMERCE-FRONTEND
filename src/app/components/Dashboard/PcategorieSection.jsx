import React, { useState } from 'react';

const CategorySection = ({ categories, onAddCategory }) => {
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    status: 'active',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Catégorie ajoutée :', newCategory);
    setNewCategory({ name: '', description: '', status: 'active' }); // Réinitialiser le formulaire
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Catégories de Produits</h2>
      <button 
        onClick={onAddCategory}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
      >
        Ajouter une catégorie
      </button>

      {/* Liste des catégories */}
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="border-b py-2">
            <strong>{category.name}</strong> - {category.productsCount} produits - {category.status}
          </li>
        ))}
      </ul>

      {/* Formulaire d'ajout de catégorie */}
      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Nom de la catégorie</label>
          <input
            id="name"
            name="name"
            type="text"
            value={newCategory.name}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            value={newCategory.description}
            onChange={handleInputChange}
            required
            className="border p-2 w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-gray-700">Statut</label>
          <select
            id="status"
            name="status"
            value={newCategory.status}
            onChange={handleInputChange}
            className="border p-2 w-full"
          >
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>

        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default CategorySection;
