import { Card, CardContent } from "../ui/card";

const StatCard = ({ icon: Icon, title, value, color }) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center">
        <Icon className={`w-10 h-10 text-${color}-500`} />
        <div className="ml-4">
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold">{value}</h3>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;