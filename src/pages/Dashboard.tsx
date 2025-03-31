
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { getDeliveries } from "@/services/deliveryService";
import { Delivery } from "@/types";
import DashboardHeader from "@/components/DashboardHeader";
import DeliverySummary from "@/components/DeliverySummary";
import DeliveryTable from "@/components/DeliveryTable";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch deliveries data
  const { data: deliveries = [], isLoading } = useQuery({
    queryKey: ["deliveries"],
    queryFn: getDeliveries,
    enabled: !!user,
  });

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto p-4 lg:p-6 max-w-7xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">Delivery Overview</h2>
          <p className="text-muted-foreground">
            Track and monitor all delivery activities
          </p>
        </div>
        
        <DeliverySummary deliveries={deliveries} />
        
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Recent Deliveries</h3>
          <DeliveryTable deliveries={deliveries} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
