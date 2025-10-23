"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Input } from "./index";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [activeTab, setActiveTab] = useState<"conta" | "seguranca">("conta");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  
  // Estados para os campos editáveis
  const [nome, setNome] = useState("Marcela Mendes Campos");
  const [instituicao, setInstituicao] = useState("PUC Minas");
  const [curso, setCurso] = useState("Engenharia de Software");
  const [cep, setCep] = useState("30000000");
  const [estado, setEstado] = useState("Minas Gerais");
  const [cidade, setCidade] = useState("Belo Horizonte");
  const [bairro, setBairro] = useState("Coração Eucarístico");
  const [logradouro, setLogradouro] = useState("Rua Feliz");
  const [numero, setNumero] = useState("123");
  const [complemento, setComplemento] = useState("Apto 101");

  // Estados para rastrear valores originais
  const [originalValues] = useState({
    nome: "Marcela Mendes Campos",
    instituicao: "PUC Minas",
    curso: "Engenharia de Software",
    cep: "30000000",
    estado: "Minas Gerais",
    cidade: "Belo Horizonte",
    bairro: "Coração Eucarístico",
    logradouro: "Rua Feliz",
    numero: "123",
    complemento: "Apto 101",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const hasUnsavedChanges = () => {
    return (
      nome !== originalValues.nome ||
      instituicao !== originalValues.instituicao ||
      curso !== originalValues.curso ||
      cep !== originalValues.cep ||
      estado !== originalValues.estado ||
      cidade !== originalValues.cidade ||
      bairro !== originalValues.bairro ||
      logradouro !== originalValues.logradouro ||
      numero !== originalValues.numero ||
      complemento !== originalValues.complemento
    );
  };

  const validateContaForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!instituicao.trim()) newErrors.instituicao = "Instituição é obrigatória";
    if (!curso.trim()) newErrors.curso = "Curso é obrigatório";
    if (!cep.trim()) newErrors.cep = "CEP é obrigatório";
    if (!estado.trim()) newErrors.estado = "Estado é obrigatório";
    if (!cidade.trim()) newErrors.cidade = "Cidade é obrigatória";
    if (!bairro.trim()) newErrors.bairro = "Bairro é obrigatório";
    if (!logradouro.trim()) newErrors.logradouro = "Logradouro é obrigatório";
    if (!numero.trim()) newErrors.numero = "Número é obrigatório";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (activeTab === "conta") {
      if (validateContaForm()) {
        // Salvar dados
        console.log("Dados salvos:", { nome, instituicao, curso, cep, estado, cidade, bairro, logradouro, numero, complemento });
        setShowSuccessModal(true);
      }
    } else {
      setShowSuccessModal(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseAttempt = () => {
    if (hasUnsavedChanges()) {
      setShowUnsavedModal(true);
    } else {
      onClose();
    }
  };

  const handleSaveAndClose = () => {
    if (activeTab === "conta") {
      if (validateContaForm()) {
        console.log("Dados salvos:", { nome, instituicao, curso, cep, estado, cidade, bairro, logradouro, numero, complemento });
        setShowUnsavedModal(false);
        onClose();
      }
    } else {
      setShowUnsavedModal(false);
      onClose();
    }
  };

  const handleCloseWithoutSaving = () => {
    setShowUnsavedModal(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/10"
        onClick={handleCloseAttempt}
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
              onClick={handleCloseAttempt}
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
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <Image
                      src="/avatar.svg"
                      alt="Foto de Perfil"
                      width={80}
                      height={80}
                    />
                  </div>
                  <div>
                    <Button variant="secondary" size="sm" className="rounded-lg">
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
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    error={errors.nome}
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
                      value={instituicao}
                      onChange={(e) => setInstituicao(e.target.value)}
                      error={errors.instituicao}
                    />
                    <Input
                      label="Curso"
                      id="curso"
                      name="curso"
                      value={curso}
                      onChange={(e) => setCurso(e.target.value)}
                      error={errors.curso}
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
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      error={errors.cep}
                    />
                    <Input
                      label="Estado"
                      id="estado"
                      name="estado"
                      value={estado}
                      onChange={(e) => setEstado(e.target.value)}
                      error={errors.estado}
                    />
                    <Input
                      label="Cidade"
                      id="cidade"
                      name="cidade"
                      value={cidade}
                      onChange={(e) => setCidade(e.target.value)}
                      error={errors.cidade}
                    />
                    <Input
                      label="Bairro"
                      id="bairro"
                      name="bairro"
                      value={bairro}
                      onChange={(e) => setBairro(e.target.value)}
                      error={errors.bairro}
                    />
                    <Input
                      label="Logradouro"
                      id="logradouro"
                      name="logradouro"
                      value={logradouro}
                      onChange={(e) => setLogradouro(e.target.value)}
                      error={errors.logradouro}
                      className="col-span-2"
                    />
                    <Input
                      label="Número"
                      id="numero"
                      name="numero"
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      error={errors.numero}
                    />
                    <Input
                      label="Complemento"
                      id="complemento"
                      name="complemento"
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                    />
                  </div>
                </div>

                {/* Botão Salvar */}
                <div className="flex justify-center pt-4">
                  <Button className="w-full max-w-2xl" onClick={handleSave}>
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
                  <Button className="w-full max-w-2xl" onClick={handleSave}>
                    Alterar Senha
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={handleCloseSuccessModal}
          />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 z-10 p-8">
            <button
              onClick={handleCloseSuccessModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
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
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Salvo com sucesso!
              </h3>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Alterações Não Salvas */}
      {showUnsavedModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowUnsavedModal(false)}
          />
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 z-10 p-8">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
                <svg
                  className="h-6 w-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Você tem alterações não salvas
              </h3>
              <p className="text-sm text-gray-500">
                Deseja salvar as alterações antes de sair?
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button onClick={handleSaveAndClose} className="w-full">
                Salvar Alterações
              </Button>
              <button
                onClick={handleCloseWithoutSaving}
                className="w-full px-4 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Prosseguir sem Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
