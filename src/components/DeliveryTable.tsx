
import { useState } from "react";
import { Delivery } from "@/types";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Search } from "lucide-react";

interface DeliveryTableProps {
  deliveries: Delivery[];
  isLoading: boolean;
}

const DeliveryTable = ({ deliveries, isLoading }: DeliveryTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDeliveries = deliveries.filter((delivery) => 
    delivery.riderEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    delivery.deliveryAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy h:mm a");
    } catch (error) {
      return dateString;
    }
  };
  
  const getStatusBadge = (status: Delivery['status']) => {
    switch(status) {
      case 'delivered':
        return <Badge className="bg-green-500 hover:bg-green-600">Delivered</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search by rider, recipient or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rider Email</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  Loading deliveries...
                </TableCell>
              </TableRow>
            ) : filteredDeliveries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No deliveries found
                </TableCell>
              </TableRow>
            ) : (
              filteredDeliveries.map((delivery) => (
                <TableRow key={delivery.id}>
                  <TableCell className="font-medium">{delivery.riderEmail}</TableCell>
                  <TableCell>{delivery.recipientName}</TableCell>
                  <TableCell>{delivery.deliveryAddress}</TableCell>
                  <TableCell>{formatDate(delivery.date)}</TableCell>
                  <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DeliveryTable;
