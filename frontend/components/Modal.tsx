"use client";

import { useState } from "react";
import { Button, Input, Select } from "./index";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [activeTab, setActiveTab] = useState<"conta" | "seguranca">("conta");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/10"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4 z-10 border-[0.25px] border-gray-300 flex h-[90vh]">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Configurações</h2>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("conta")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "conta"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Informações da Conta
            </button>
            <button
              onClick={() => setActiveTab("seguranca")}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                activeTab === "seguranca"
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              Segurança e Senha
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-semibold text-gray-800">
              {activeTab === "conta" ? "Conta" : "Segurança"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Body - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "conta" ? (
              <div className="space-y-6">
                {/* Foto de Perfil */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    {/* Placeholder para foto */}
                    <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <Button variant="secondary" size="sm">
                      Alterar Foto
                    </Button>
                  </div>
                </div>

                {/* Nome */}
                <div>
                  <Input
                    label="Nome"
                    id="nome"
                    name="nome"
                    placeholder="Marcela Mendes Campos"
                  />
                </div>

                {/* Informações Pessoais */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Informações Pessoais</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="CPF"
                      id="cpf"
                      name="cpf"
                      placeholder="***.***,*** - 00"
                      disabled
                    />
                    <Input
                      label="RG"
                      id="rg"
                      name="rg"
                      placeholder="***.***,*** - 00"
                      disabled
                    />
                    <Input
                      label="Instituição de Ensino"
                      id="instituicao"
                      name="instituicao"
                      placeholder="PUC Minas"
                    />
                    <Input
                      label="Curso"
                      id="curso"
                      name="curso"
                      placeholder="Engenharia de Software"
                    />
                  </div>
                </div>

                {/* Informações de Endereço */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Informações de Endereço</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="CEP"
                      id="cep"
                      name="cep"
                      placeholder="30000000"
                    />
                    <Select
                      label="Estado"
                      id="estado"
                      name="estado"
                      options={[
                        { value: "MG", label: "Minas Gerais" },
                        { value: "SP", label: "São Paulo" },
                        { value: "RJ", label: "Rio de Janeiro" },
                      ]}
                    />
                    <Input
                      label="Cidade"
                      id="cidade"
                      name="cidade"
                      placeholder="Belo Horizonte"
                    />
                    <Input
                      label="Bairro"
                      id="bairro"
                      name="bairro"
                      placeholder="Coração Eucarístico"
                    />
                    <Input
                      label="Logradouro"
                      id="logradouro"
                      name="logradouro"
                      placeholder="Rua Feliz"
                      className="col-span-2"
                    />
                    <Input
                      label="Número"
                      id="numero"
                      name="numero"
                      placeholder="123"
                    />
                    <Input
                      label="Complemento"
                      id="complemento"
                      name="complemento"
                      placeholder="123"
                    />
                  </div>
                </div>

                {/* Botão Salvar */}
                <div className="flex justify-center pt-4">
                  <Button className="w-full max-w-2xl">
                    Salvar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <Input
                    label="Senha Atual"
                    id="senha-atual"
                    name="senha-atual"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <Input
                    label="Nova Senha"
                    id="nova-senha"
                    name="nova-senha"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <Input
                    label="Confirmar Nova Senha"
                    id="confirmar-senha"
                    name="confirmar-senha"
                    type="password"
                    placeholder="••••••••"
                  />
                </div>

                {/* Botão Salvar */}
                <div className="flex justify-center pt-4">
                  <Button className="w-full max-w-2xl">
                    Alterar Senha
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
