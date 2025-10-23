"use client";

import { useState } from "react";
import { Button, Modal, Header, Footer } from "@/components";

export default function Home() {
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#f9f9f9' }}>
      <Header />
      
      <main className="flex flex-col items-center justify-center flex-1 gap-4 px-4">
        <h1 className="text-4xl font-bold">Página Inicial</h1>
        
        <Button onClick={() => setIsConfigOpen(true)}>
          Configurações
        </Button>

        <Modal
          isOpen={isConfigOpen}
          onClose={() => setIsConfigOpen(false)}
        />
      </main>

      <Footer />
    </div>
  );
}

