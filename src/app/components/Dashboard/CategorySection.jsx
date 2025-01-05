// components/sections/Categories/CategorySection.js
import { PlusCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import CategoryTable from './CategoryTable';

const CategorySection = ({ categories, onAddCategory }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium">Gestion des catégories</h3>
      <Button 
        className="flex items-center bg-blue-600 hover:bg-blue-700"
        onClick={onAddCategory}
      >
        <PlusCircle className="w-5 h-5 mr-2" />
        Nouvelle catégorie
      </Button>
    </div>

    <Card>
      <CardContent>
        <CategoryTable categories={categories} />
      </CardContent>
    </Card>
  </div>
);

export default CategorySection;