// components/sections/Products/ProductTable.js
import { MapPin, Image, Edit, Trash2 } from 'lucide-react';

const ProductTable = ({ products }) => (
  <table className="w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">État</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Localisation</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Images</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {products.map((product) => (
        <tr key={product.id}>
          {/* ... Product row content ... */}
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProductTable;