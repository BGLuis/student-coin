"use client";

import { Header, Footer } from "@/components";
import { useAuth } from "@/hooks";

export default function Home() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#f9f9f9' }}>
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 gap-4 px-4">

      </main>

      <Footer />
    </div>
  );
}

