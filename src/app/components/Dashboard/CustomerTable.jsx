// components/sections/Customers/CustomerTable.js
import { Edit, Trash2 } from 'lucide-react';

const CustomerTable = ({ customers }) => (
  <table className="w-full">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Commandes</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-gray-200">
      {customers.map((customer) => (
        <tr key={customer.id}>
          <td className="px-6 py-4">
            <div>
              <p className="font-medium">{customer.name}</p>
              <p className="text-sm text-gray-500">{customer.email}</p>
            </div>
          </td>
          <td className="px-6 py-4">{customer.points}</td>
          <td className="px-6 py-4">{customer.totalOrders}</td>
          <td className="px-6 py-4">
            <span className="px-2 py-1 text-sm rounded-full bg-green-100 text-green-800">
              {customer.status}
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

export default CustomerTable;