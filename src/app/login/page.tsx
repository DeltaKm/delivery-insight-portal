
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/LoginForm";
import { Package } from "lucide-react";

export default function Login() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="flex items-center gap-2 mb-8">
        <Package className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-bold">Delivery Insight Portal</h1>
      </div>
      
      <LoginForm />
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Use the following test credentials:</p>
        <p className="font-medium">Email: admin@example.com</p>
        <p className="font-medium">Password: password</p>
      </div>
    </div>
  );
}
