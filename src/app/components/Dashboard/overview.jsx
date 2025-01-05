import { ShoppingCart, Package, Users, Eye } from 'lucide-react';
import StatCard from './statscard';

const Overview = ({ stats }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard icon={ShoppingCart} title="Commandes" value={stats.totalOrders} color="blue" />
      <StatCard icon={Package} title="Produits" value={stats.totalProducts} color="green" />
      <StatCard icon={Users} title="Clients" value={stats.totalCustomers} color="purple" />
      <StatCard icon={Eye} title="Avis" value={stats.reviews} color="yellow" />
    </div>
  </div>
);

export default Overview;