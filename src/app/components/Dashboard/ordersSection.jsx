import React from 'react';
import { Card, CardContent } from '../ui/card';
import OrderTable from './OrderTable';

const OrderSection = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium">Gestion des commandes</h3>
    </div>

    <Card>
      <CardContent>
        <OrderTable />
      </CardContent>
    </Card>
  </div>
);

export default OrderSection;
