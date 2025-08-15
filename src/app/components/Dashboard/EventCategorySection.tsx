import React from "react";
import EventCategoryTable from "./EventsCategoryTable";
import { Card, CardContent } from "../ui/card";

const EvCategorySection: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          Gestion des catégories d&apos;événements
        </h3>
      </div>

      <Card>
        <CardContent>
          <EventCategoryTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default EvCategorySection;
