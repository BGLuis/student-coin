"use client";

import { MultiStepForm } from "@/components/MultiStepForm";
import { Input, Select } from "@/components";
import { useState } from "react";

export default function EnterpriseRegister() {
    const [currentStep, setCurrentStep] = useState(0);
    const [validatedSteps, setValidatedSteps] = useState<number[]>([]);
    const [formData, setFormData] = useState({
        tipoCadastro: "",
        // Aluno - Dados Pessoais
        nome: "",
        cpf: "",
        rg: "",
        email: "",
        telefone: "",
        // Aluno - Endereço
        endereco: "",
        // Aluno - Acadêmico
        curso: "",
        instituicao: "",
        // Empresa
        cnpj: "",
        // Senha
        senha: "",
        confirmarSenha: "",
    });

    const getSteps = () => {
        const baseSteps = [{ label: "Tipo de Cadastro", description: "" }];
        if (formData.tipoCadastro === "aluno") {
            return [
                ...baseSteps,
                { label: "Informações Pessoais", description: "" },
                { label: "Informações de Endereço", description: "" },
                { label: "Informações Acadêmicas", description: "" },
                { label: "Crie sua Senha", description: "" }
            ];
        } else if (formData.tipoCadastro === "empresa") {
            return [
                ...baseSteps,
                { label: "Dados da Empresa", description: "" },
                { label: "Crie sua Senha", description: "" }
            ];
        }
        return [...baseSteps, { label: "Informações", description: "" }, { label: "Crie sua Senha", description: "" }];
    };

    const steps = getSteps();

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            if (!validatedSteps.includes(currentStep)) {
                setValidatedSteps([...validatedSteps, currentStep]);
            }
            setCurrentStep(currentStep + 1);
        } else {
            console.log("Dados do formulário:", formData);
            alert("Formulário enviado com sucesso!");
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleStepClick = (stepIndex: number) => {
        setCurrentStep(stepIndex);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (name === "tipoCadastro" && value !== formData.tipoCadastro) {
            setValidatedSteps([0]);
            setCurrentStep(1);
        }
    };

    const renderPasswordStep = () => (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-[#333333]">Crie sua Senha</h2>
            <Input type="password" name="senha" label="Senha" placeholder="Digite sua senha" value={formData.senha} onChange={handleInputChange} required />
            <Input type="password" name="confirmarSenha" label="Confirmar Senha" placeholder="Digite sua senha novamente" value={formData.confirmarSenha} onChange={handleInputChange} required />
            {formData.senha && formData.confirmarSenha && formData.senha !== formData.confirmarSenha && (
                <p className="text-red-500 text-sm">As senhas não coincidem</p>
            )}
        </div>
    );

    const renderStepContent = () => {
        if (currentStep === 0) {
            return (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4 text-[#333333]">Qual seu perfil no Sistema de Moedas Parceiras?</h2>
                    <Select name="tipoCadastro" value={formData.tipoCadastro} onChange={handleInputChange} placeholder="Selecione uma opção" options={[{ value: "aluno", label: "Aluno" }, { value: "empresa", label: "Empresa Parceira" }]} required />
                </div>
            );
        }
        if (formData.tipoCadastro === "aluno") {
            switch (currentStep) {
                case 1:
                    return (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold mb-4 text-[#333333]">Informações Pessoais</h2>
                            <Input type="text" name="nome" label="Nome Completo" placeholder="Digite seu nome completo" value={formData.nome} onChange={handleInputChange} required />
                            <Input type="email" name="email" label="Email" placeholder="Digite seu email" value={formData.email} onChange={handleInputChange} required />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input type="text" name="cpf" label="CPF" placeholder="000.000.000-00" value={formData.cpf} onChange={handleInputChange} required />
                                <Input type="text" name="rg" label="RG" placeholder="00.000.000-0" value={formData.rg} onChange={handleInputChange} required />
                            </div>
                        </div>
                    );
                case 2:
                    return (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold mb-4 text-[#333333]">Informações de Endereço</h2>
                            <Input type="text" name="endereco" label="Endereço" placeholder="Rua, número, bairro, cidade, estado" value={formData.endereco} onChange={handleInputChange} required />
                        </div>
                    );
                case 3:
                    return (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold mb-4 text-[#333333]">Informações Acadêmicas</h2>
                            <Input type="text" name="curso" label="Curso" placeholder="Digite o nome do curso" value={formData.curso} onChange={handleInputChange} required />
                            <Input type="text" name="instituicao" label="Instituição de Ensino" placeholder="Digite o nome da instituição" value={formData.instituicao} onChange={handleInputChange} required />
                        </div>
                    );
                case 4:
                    return renderPasswordStep();
                default:
                    return null;
            }
        }
        if (formData.tipoCadastro === "empresa") {
            switch (currentStep) {
                case 1:
                    return (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold mb-4 text-[#333333]">Dados da Empresa</h2>
                            <Input type="text" name="nome" label="Nome da Empresa/Razão Social" placeholder="Digite o nome da empresa" value={formData.nome} onChange={handleInputChange} required />
                            <Input type="email" name="email" label="Email" placeholder="Digite o email da empresa" value={formData.email} onChange={handleInputChange} required />
                            <Input type="text" name="cnpj" label="CNPJ" placeholder="00.000.000/0000-00" value={formData.cnpj} onChange={handleInputChange} required />
                        </div>
                    );
                case 2:
                    return renderPasswordStep();
                default:
                    return null;
            }
        }
        return null;
    };

    const isStepValid = () => {
        if (currentStep === 0) {
            return formData.tipoCadastro !== "";
        }
        if (formData.tipoCadastro === "aluno") {
            switch (currentStep) {
                case 1: // Informações Pessoais
                    return formData.nome !== "" &&
                        formData.email !== "" &&
                        formData.cpf !== "" &&
                        formData.rg !== "";
                case 2: // Informações de Endereço
                    return formData.endereco !== "";
                case 3:
                    return formData.curso !== "" && formData.instituicao !== "";
                case 4:
                    return formData.senha !== "" &&
                        formData.confirmarSenha !== "" &&
                        formData.senha === formData.confirmarSenha;
                default:
                    return false;
            }
        }
        if (formData.tipoCadastro === "empresa") {
            switch (currentStep) {
                case 1:
                    return formData.nome !== "" && formData.email !== "" && formData.cnpj !== "";
                case 2:
                    return formData.senha !== "" && formData.confirmarSenha !== "" && formData.senha === formData.confirmarSenha;
                default:
                    return false;
            }
        }
        return false;
    };

    return (
        <div className="flex items-center justify-center flex-col gap-6 w-full lg:w-3/4">
            <MultiStepForm
                title="Crie sua Conta"
                steps={steps}
                currentStep={currentStep}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onStepClick={handleStepClick}
                validatedSteps={validatedSteps}
                isFirstStep={currentStep === 0}
                isLastStep={currentStep === steps.length - 1}
                disableNext={!isStepValid()}
            >
                {renderStepContent()}
            </MultiStepForm>
        </div>
    );
}
