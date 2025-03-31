
import { Delivery } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, CheckCircle, Clock, XCircle } from "lucide-react";

interface DeliverySummaryProps {
  deliveries: Delivery[];
}

const DeliverySummary = ({ deliveries }: DeliverySummaryProps) => {
  const totalDeliveries = deliveries.length;
  const deliveredCount = deliveries.filter(d => d.status === 'delivered').length;
  const pendingCount = deliveries.filter(d => d.status === 'pending').length;
  const cancelledCount = deliveries.filter(d => d.status === 'cancelled').length;
  
  // Count unique riders
  const uniqueRiders = new Set(deliveries.map(d => d.riderId)).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Deliveries</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDeliveries}</div>
          <p className="text-xs text-muted-foreground">
            From {uniqueRiders} rider{uniqueRiders !== 1 ? 's' : ''}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Delivered</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{deliveredCount}</div>
          <p className="text-xs text-muted-foreground">
            {((deliveredCount / totalDeliveries) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending</CardTitle>
          <Clock className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingCount}</div>
          <p className="text-xs text-muted-foreground">
            {((pendingCount / totalDeliveries) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
          <XCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{cancelledCount}</div>
          <p className="text-xs text-muted-foreground">
            {((cancelledCount / totalDeliveries) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeliverySummary;
