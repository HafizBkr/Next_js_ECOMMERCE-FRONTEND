import React, { useState } from 'react';
import { Edit, Trash2, Plus, AlertCircle } from 'lucide-react';
import useCategories from '../../hooks/useCategories';

interface Category {
  id: string;
  nom: string;
  nombre_produits: number;
  statut: 'active' | 'inactive';
}

const HEADERS = [
  { id: 'category', label: 'Catégorie' },
  { id: 'products', label: 'Produits' },
  { id: 'status', label: 'Statut' },
  { id: 'actions', label: 'Actions' }
] as const;

const CategoryTable: React.FC = () => {
  const {
    categories,
    loading,
    error,
    addCategory,
    editCategory,
    deleteCategory,
  } = useCategories();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const openModal = (category: Category | null = null) => {
    setEditingCategory(category);
    setFormError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const categoryData = {
        nom: String(formData.get('nom')),
        nombre_produits: Number(formData.get('nombre_produits')),
        statut: formData.get('statut') as 'active' | 'inactive'
      };

      if (editingCategory) {
        await editCategory(editingCategory.id, categoryData);
      } else {
        await addCategory(categoryData);
      }
      closeModal();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      try {
        await deleteCategory(id);
      } catch (err) {
        console.error('Erreur lors de la suppression:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Gestion des catégories</h2>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5" />
          <span>Nouvelle catégorie</span>
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
  <thead className="bg-gray-50">
    <tr>
      {HEADERS.map(header => (
        <th
          key={header.id}
          scope="col"
          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        >
          {header.label}
        </th>
      ))}
    </tr>
  </thead>
  <tbody className="divide-y divide-gray-200">
  {categories.map((category, index) => (
    <tr 
      key={`${category.id}-${index}`}  // Utilisation de l'index pour garantir l'unicité
      className="hover:bg-gray-100 transition-colors"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{category.nom}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{category.nombre_produits}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-3 py-1 inline-flex items-center rounded-full text-xs font-medium ${
            category.statut === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {category.statut === 'active' ? 'Actif' : 'Inactif'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex items-center gap-3">
          <button
            onClick={() => openModal(category)}
            className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDelete(category.id)}
            className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </td>
    </tr>
  ))}
</tbody>

        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
              </h2>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
                  Nom de la catégorie
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  defaultValue={editingCategory?.nom || ''}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="nombre_produits" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de produits
                </label>
                <input
                  type="number"
                  id="nombre_produits"
                  name="nombre_produits"
                  defaultValue={editingCategory?.nombre_produits || 0}
                  min="0"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-1">
                  Statut
                </label>
                <select
                  id="statut"
                  name="statut"
                  defaultValue={editingCategory?.statut || 'inactive'}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  disabled={submitting}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={submitting}
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      En cours...
                    </span>
                  ) : (
                    editingCategory ? 'Modifier' : 'Ajouter'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryTable;