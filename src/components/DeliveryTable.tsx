
"use client";

import { useState } from "react";
import { Delivery } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { it } from "date-fns/locale";

interface DeliveryTableProps {
  deliveries: Delivery[];
  isLoading: boolean;
}

const DeliveryTable = ({ deliveries, isLoading }: DeliveryTableProps) => {
  const [sortBy, setSortBy] = useState<keyof Delivery>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const toggleSort = (column: keyof Delivery) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedDeliveries = [...deliveries].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a[sortBy]).getTime();
      const dateB = new Date(b[sortBy]).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    }
    
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const getStatusColor = (status: Delivery["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: Delivery["status"]) => {
    switch (status) {
      case "delivered":
        return "Consegnato";
      case "pending":
        return "In corso";
      case "cancelled":
        return "Annullato";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "d MMMM yyyy, HH:mm", { locale: it });
    } catch (error) {
      console.error("Invalid date format:", dateString);
      return dateString;
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead 
                  onClick={() => toggleSort("recipientName")}
                  className="cursor-pointer hover:bg-muted"
                >
                  Destinatario
                  {sortBy === "recipientName" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
                <TableHead 
                  onClick={() => toggleSort("deliveryAddress")}
                  className="cursor-pointer hover:bg-muted"
                >
                  Indirizzo
                  {sortBy === "deliveryAddress" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
                <TableHead 
                  onClick={() => toggleSort("date")}
                  className="cursor-pointer hover:bg-muted"
                >
                  Data
                  {sortBy === "date" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
                <TableHead 
                  onClick={() => toggleSort("status")}
                  className="cursor-pointer hover:bg-muted"
                >
                  Stato
                  {sortBy === "status" && (
                    <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
                  )}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    Caricamento...
                  </TableCell>
                </TableRow>
              ) : sortedDeliveries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-4">
                    Nessuna consegna trovata
                  </TableCell>
                </TableRow>
              ) : (
                sortedDeliveries.map((delivery) => (
                  <TableRow key={delivery.id}>
                    <TableCell className="font-medium">
                      {delivery.recipientName}
                    </TableCell>
                    <TableCell>{delivery.deliveryAddress}</TableCell>
                    <TableCell>{formatDate(delivery.date)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={getStatusColor(delivery.status)}
                      >
                        {getStatusText(delivery.status)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeliveryTable;
