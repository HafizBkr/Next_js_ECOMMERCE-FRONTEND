// components/sections/Categories/CategorySection.js
import { PlusCircle } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import CategoryTable from './CategoryTable';

const CategorySection = ({ categories, onAddCategory }) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-medium">Gestion des catégories</h3>
    </div>

    <Card>
      <CardContent>
        <CategoryTable categories={categories} />
      </CardContent>
    </Card>
  </div>
);

export default CategorySection;