import React, { useState, useEffect } from 'react';

const CategoryForm = ({ category, onSubmit }) => {
  const [nom, setNom] = useState(category ? category.nom : '');
  const [nombreProduits, setNombreProduits] = useState(category ? category.nombre_produits : '');
  const [statut, setStatut] = useState(category ? category.statut : 'actif');
  const [isEditing, setIsEditing] = useState(!!category); // Vérifie si on modifie une catégorie existante

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      nom,
      nombre_produits: parseInt(nombreProduits),
      statut,
    };
    onSubmit(newCategory); // Appelle la fonction passée en props pour gérer l'ajout ou la modification
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{isEditing ? 'Modifier la catégorie' : 'Ajouter une catégorie'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
            Nom de la catégorie
          </label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="nombreProduits" className="block text-sm font-medium text-gray-700">
            Nombre de produits
          </label>
          <input
            type="number"
            id="nombreProduits"
            value={nombreProduits}
            onChange={(e) => setNombreProduits(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="statut" className="block text-sm font-medium text-gray-700">
            Statut
          </label>
          <select
            id="statut"
            value={statut}
            onChange={(e) => setStatut(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          >
            <option value="actif">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
        <button type="submit" className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-md">
          {isEditing ? 'Mettre à jour' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
