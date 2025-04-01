
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Pagina non trovata</h2>
        <p className="text-muted-foreground mb-6">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Button asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Torna alla home
          </Link>
        </Button>
      </div>
    </div>
  );
}
