
"use client";

import { useMemo } from "react";
import { Delivery } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Package, CheckCircle, Clock, XCircle } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  className?: string;
}

const SummaryCard = ({ title, value, icon, className }: SummaryCardProps) => (
  <Card className={className}>
    <CardContent className="flex items-center p-6">
      <div className="mr-4">{icon}</div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </CardContent>
  </Card>
);

interface DeliverySummaryProps {
  deliveries: Delivery[];
}

const DeliverySummary = ({ deliveries }: DeliverySummaryProps) => {
  const stats = useMemo(() => {
    const total = deliveries.length;
    const delivered = deliveries.filter(d => d.status === "delivered").length;
    const pending = deliveries.filter(d => d.status === "pending").length;
    const cancelled = deliveries.filter(d => d.status === "cancelled").length;
    
    return { total, delivered, pending, cancelled };
  }, [deliveries]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <SummaryCard
        title="Consegne totali"
        value={stats.total}
        icon={<Package className="h-8 w-8 text-blue-500" />}
        className="bg-blue-50"
      />
      <SummaryCard
        title="Consegnati"
        value={stats.delivered}
        icon={<CheckCircle className="h-8 w-8 text-green-500" />}
        className="bg-green-50"
      />
      <SummaryCard
        title="In corso"
        value={stats.pending}
        icon={<Clock className="h-8 w-8 text-yellow-500" />}
        className="bg-yellow-50"
      />
      <SummaryCard
        title="Annullati"
        value={stats.cancelled}
        icon={<XCircle className="h-8 w-8 text-red-500" />}
        className="bg-red-50"
      />
    </div>
  );
};

export default DeliverySummary;
