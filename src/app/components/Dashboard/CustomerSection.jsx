import { PlusCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import CustomerTable from './CustomerTable';

const CustomerSection = ({ customers, onAddCustomer }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium">Gestion des clients</h3>
      <div className="flex space-x-4">
        <Input
          type="text"
          placeholder="Rechercher un client..."
          className="w-64"
        />
        <Button 
          className="flex items-center bg-blue-600 hover:bg-blue-700"
          onClick={onAddCustomer}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Nouveau client
        </Button>
      </div>
    </div>

    <Card>
      <CardContent>
        <CustomerTable customers={customers} />
      </CardContent>
    </Card>
  </div>
);

export default CustomerSection;