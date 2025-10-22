"use client";

import { MultiStepForm } from "@/components/MultiStepForm";
import { Input, Select } from "@/components";
import { useState, useEffect } from "react";

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

    // estado para mensagens de erro por campo
    const [errors, setErrors] = useState<Record<string, string>>({});
    // campos "touched" para decidir quando mostrar erros
    const [touched, setTouched] = useState<Record<string, boolean>>({});

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
        // limpar erro do campo quando o usuário digita
        setErrors(prev => ({ ...prev, [name]: "" }));
        if (name === "tipoCadastro" && value !== formData.tipoCadastro) {
            setValidatedSteps([0]);
            setCurrentStep(1);
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const validateField = (name: string, value: any) => {
        const v = (value ?? "").toString().trim();
        switch (name) {
            case "tipoCadastro":
                return v === "" ? "Selecione um tipo de cadastro" : "";
            case "nome":
                return v === "" ? "Campo obrigatório" : "";
            case "email":
                if (v === "") return "Campo obrigatório";
                // validação simples de email
                return /\S+@\S+\.\S+/.test(v) ? "" : "Email inválido";
            case "cpf":
                if (v === "") return "Campo obrigatório";
                // aceitar apenas dígitos para checagem rápida
                return v.replace(/\D/g, "").length === 11 ? "" : "CPF inválido";
            case "rg":
                return v === "" ? "Campo obrigatório" : "";
            case "endereco":
                return v === "" ? "Campo obrigatório" : "";
            case "curso":
                return v === "" ? "Campo obrigatório" : "";
            case "instituicao":
                return v === "" ? "Campo obrigatório" : "";
            case "cnpj":
                if (v === "") return "Campo obrigatório";
                return v.replace(/\D/g, "").length === 14 ? "" : "CNPJ inválido";
            case "senha":
                if (v === "") return "Campo obrigatório";
                return v.length >= 6 ? "" : "Senha deve ter ao menos 6 caracteres";
            case "confirmarSenha":
                if (v === "") return "Campo obrigatório";
                return v === formData.senha ? "" : "Senhas não coincidem";
            default:
                return "";
        }
    };

    const renderPasswordStep = () => (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4 text-[#333333]">Crie sua Senha</h2>
            <Input
                type="password"
                name="senha"
                label="Senha"
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={touched.senha ? errors.senha : ""}
                required
            />
            <Input
                type="password"
                name="confirmarSenha"
                label="Confirmar Senha"
                placeholder="Digite sua senha novamente"
                value={formData.confirmarSenha}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={touched.confirmarSenha ? errors.confirmarSenha : ""}
                required
            />
        </div>
    );

    const renderStepContent = () => {
        if (currentStep === 0) {
            return (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4 text-[#333333]">Qual seu perfil no Sistema de Moedas Parceiras?</h2>
                    <Select name="tipoCadastro" value={formData.tipoCadastro} onChange={handleInputChange} placeholder="Selecione uma opção" options={[{ value: "aluno", label: "Aluno" }, { value: "empresa", label: "Empresa Parceira" }]} required />
                    {touched.tipoCadastro && errors.tipoCadastro && (
                        <p className="text-red-500 text-sm">{errors.tipoCadastro}</p>
                    )}
                </div>
            );
        }
        if (formData.tipoCadastro === "aluno") {
            switch (currentStep) {
                case 1:
                    return (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold mb-4 text-[#333333]">Informações Pessoais</h2>
                            <Input type="text" name="nome" label="Nome Completo" placeholder="Digite seu nome completo" value={formData.nome} onChange={handleInputChange} onBlur={handleBlur} error={touched.nome ? errors.nome : ""} required />
                            <Input type="email" name="email" label="Email" placeholder="Digite seu email" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} error={touched.email ? errors.email : ""} required />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input type="text" name="cpf" label="CPF" placeholder="000.000.000-00" value={formData.cpf} onChange={handleInputChange} onBlur={handleBlur} error={touched.cpf ? errors.cpf : ""} required />
                                <Input type="text" name="rg" label="RG" placeholder="00.000.000-0" value={formData.rg} onChange={handleInputChange} onBlur={handleBlur} error={touched.rg ? errors.rg : ""} required />
                            </div>
                        </div>
                    );
                case 2:
                    return (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold mb-4 text-[#333333]">Informações de Endereço</h2>
                            <Input type="text" name="endereco" label="Endereço" placeholder="Rua, número, bairro, cidade, estado" value={formData.endereco} onChange={handleInputChange} onBlur={handleBlur} error={touched.endereco ? errors.endereco : ""} required />
                        </div>
                    );
                case 3:
                    return (
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold mb-4 text-[#333333]">Informações Acadêmicas</h2>
                            <Input type="text" name="curso" label="Curso" placeholder="Digite o nome do curso" value={formData.curso} onChange={handleInputChange} onBlur={handleBlur} error={touched.curso ? errors.curso : ""} required />
                            <Input type="text" name="instituicao" label="Instituição de Ensino" placeholder="Digite o nome da instituição" value={formData.instituicao} onChange={handleInputChange} onBlur={handleBlur} error={touched.instituicao ? errors.instituicao : ""} required />
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
                            <Input type="text" name="nome" label="Nome da Empresa/Razão Social" placeholder="Digite o nome da empresa" value={formData.nome} onChange={handleInputChange} onBlur={handleBlur} error={touched.nome ? errors.nome : ""} required />
                            <Input type="email" name="email" label="Email" placeholder="Digite o email da empresa" value={formData.email} onChange={handleInputChange} onBlur={handleBlur} error={touched.email ? errors.email : ""} required />
                            <Input type="text" name="cnpj" label="CNPJ" placeholder="00.000.000/0000-00" value={formData.cnpj} onChange={handleInputChange} onBlur={handleBlur} error={touched.cnpj ? errors.cnpj : ""} required />
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

    // Quando o usuário tenta avançar e o passo atual não é válido, marcar os campos do passo como "touched" para exibir erros
    useEffect(() => {
        // revalidar confirmarSenha quando senha muda
        if (touched.confirmarSenha) {
            setErrors(prev => ({ ...prev, confirmarSenha: validateField("confirmarSenha", formData.confirmarSenha) }));
        }
    }, [formData.senha]);

    const touchFieldsOfStep = (stepIndex: number) => {
        const fields = getFieldsForStep(stepIndex);
        const newTouched = { ...touched };
        const newErrors = { ...errors };
        fields.forEach(f => {
            newTouched[f] = true;
            newErrors[f] = validateField(f, (formData as any)[f]);
        });
        setTouched(newTouched);
        setErrors(newErrors);
    };

    const getFieldsForStep = (stepIndex: number) => {
        if (stepIndex === 0) return ["tipoCadastro"];
        if (formData.tipoCadastro === "aluno") {
            switch (stepIndex) {
                case 1:
                    return ["nome", "email", "cpf", "rg"];
                case 2:
                    return ["endereco"];
                case 3:
                    return ["curso", "instituicao"];
                case 4:
                    return ["senha", "confirmarSenha"];
                default:
                    return [];
            }
        }
        if (formData.tipoCadastro === "empresa") {
            switch (stepIndex) {
                case 1:
                    return ["nome", "email", "cnpj"];
                case 2:
                    return ["senha", "confirmarSenha"];
                default:
                    return [];
            }
        }
        return [];
    };

    // Atualiza o comportamento do botão Next para forçar exibição de erros caso o passo seja inválido
    const handleNextWithValidation = () => {
        if (isStepValid()) {
            if (currentStep < steps.length - 1) {
                if (!validatedSteps.includes(currentStep)) {
                    setValidatedSteps([...validatedSteps, currentStep]);
                }
                setCurrentStep(currentStep + 1);
            } else {
                console.log("Dados do formulário:", formData);
                alert("Formulário enviado com sucesso!");
            }
        } else {
            // marcar campos como tocados para mostrar erros
            touchFieldsOfStep(currentStep);
        }
    };

    return (
        <div className="flex items-center justify-center flex-col gap-6 w-full lg:w-3/4">
            <MultiStepForm
                title="Crie sua Conta"
                steps={steps}
                currentStep={currentStep}
                onNext={handleNextWithValidation}
                onPrevious={handlePrevious}
                onStepClick={handleStepClick}
                validatedSteps={validatedSteps}
                isFirstStep={currentStep === 0}
                isLastStep={currentStep === steps.length - 1}
                disableNext={false}
            >
                {renderStepContent()}
            </MultiStepForm>
        </div>
    );
}
