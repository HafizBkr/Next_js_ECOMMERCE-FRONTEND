// components/sections/Products/ProductSection.js
import { Search, PlusCircle } from 'lucide-react';
import {Input} from "../ui/input"
import {Button} from "../ui/button"
import { Card, CardContent } from '../ui/card';
import ProductTable from './productTable';

const ProductSection = ({ products, searchTerm, setSearchTerm, onAddProduct }) => (
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
        onClick={onAddProduct}
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
  </div>
);

export default ProductSection;