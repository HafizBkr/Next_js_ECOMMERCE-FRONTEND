import React from 'react';
import useOrders from '../../hooks/useOrdres'; // Assurez-vous que le chemin est correct

const OrderTable = () => {
  const { orders, loading, error } = useOrders();

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Commandes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Numéro de commande</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Nom complet</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Montant total</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date de création</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date de mise à jour</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="px-4 py-2">{order.numero_commande}</td>
                <td className="px-4 py-2">{order.first_name} {order.last_name}</td>
                <td className="px-4 py-2">{order.email}</td>
                <td className="px-4 py-2">{order.montant_total} €</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">{new Date(order.created_at).toLocaleDateString()}</td>
                <td className="px-4 py-2">{new Date(order.updated_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
