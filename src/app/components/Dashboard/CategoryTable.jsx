// components/sections/Categories/CategoryTable.js
import { Edit, Trash2 } from 'lucide-react';

const CategoryTable = ({ categories }) => (
  <table className="w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Catégorie</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produits</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sous-catégories</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {categories.map((category) => (
        <tr key={category.id}>
          <td className="px-6 py-4">
            <div>
              <p className="font-medium">{category.name}</p>
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>
          </td>
          <td className="px-6 py-4">{category.productsCount}</td>
          <td className="px-6 py-4">
            <div className="flex flex-wrap gap-2">
              {category.subcategories.map((sub, index) => (
                <span key={index} className="px-2 py-1 text-sm bg-gray-100 rounded-full">
                  {sub}
                </span>
              ))}
            </div>
          </td>
          <td className="px-6 py-4">
            <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
              {category.status}
            </span>
          </td>
          <td className="px-6 py-4">
            <div className="flex space-x-3">
              <button className="text-blue-600 hover:text-blue-800">
                <Edit className="w-5 h-5" />
              </button>
              <button className="text-red-600 hover:text-red-800">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default CategoryTable;