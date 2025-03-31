
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, Package } from "lucide-react";

const DashboardHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Package className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">Delivery Insight Portal</h1>
      </div>
      
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm text-muted-foreground">
              Logged in as: <span className="font-medium text-foreground">{user.email}</span>
            </span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={logout}
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
