
"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Package, LogOut } from "lucide-react";

const DashboardHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          <Link href="/dashboard" className="text-xl font-bold">
            Delivery Insight
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="text-sm text-muted-foreground hidden md:block">
                Ciao, <span className="font-medium">{user.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
