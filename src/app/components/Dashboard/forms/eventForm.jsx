// components/sections/Products/ProductSection.js
import { useState } from 'react';
import { Search, PlusCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductTable from './ProductTable';
import { AddProductForm } from '../../forms/AddProductForm';

const ProductSection = ({ products, searchTerm, setSearchTerm }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddProduct = (formData) => {
    console.log('Nouveau produit:', formData);
    // Ajoutez ici la logique pour ajouter le produit
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Rechercher un produit..."
            className="pl-10 pr-4 py-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          className="flex items-center bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowAddForm(true)}
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <ProductTable products={products} />
        </CardContent>
      </Card>

      <AddProductForm
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

export default ProductSection;