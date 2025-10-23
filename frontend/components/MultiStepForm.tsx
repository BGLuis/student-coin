"use client";

import React, { ReactNode } from "react";
import { Button } from "./Button";
import Image from "next/image";
import Link from "next/link";

interface Step {
    label: string;
    description?: string;
}

interface MultiStepFormProps {
    title: string;
    steps: Step[];
    currentStep: number;
    onNext: () => void;
    onPrevious: () => void;
    onStepClick?: (stepIndex: number) => void;
    validatedSteps?: number[]; // Array com índices dos passos validados
    children: ReactNode;
    isLastStep?: boolean;
    isFirstStep?: boolean;
    nextButtonText?: string;
    previousButtonText?: string;
    disableNext?: boolean;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
    title,
    steps,
    currentStep,
    onNext,
    onPrevious,
    onStepClick,
    validatedSteps = [],
    children,
    isLastStep = false,
    isFirstStep = true,
    nextButtonText = "Próximo",
    previousButtonText = "Anterior",
    disableNext = false,
}) => {
    // Função para verificar se um passo pode ser clicado
    const canClickStep = (stepIndex: number) => {
        // Não pode clicar se não tem a função onStepClick
        if (!onStepClick) return false;

        // Pode clicar no passo atual
        if (stepIndex === currentStep) return false;

        // Pode clicar em passos anteriores que foram validados
        if (stepIndex < currentStep && validatedSteps.includes(stepIndex)) return true;

        // Não pode clicar em passos futuros
        return false;
    };

    return (
        <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Título Fixo */}
            <div className="mb-8 text-center">
                <div className="flex justify-center mb-6">
                    <Image
                        src="/image/logo.png"
                        alt="Student Coin Logo"
                        width={72}
                        height={72}
                        priority
                    />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                <p className="text-[#333333] text-center text-sm">Já possui uma conta? <Link href="/login" className="underline">Entrar</Link>.</p>
            </div>

            {/* Visualização dos Passos */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-col items-center flex-1">
                                {/* Círculo do passo */}
                                <button
                                    type="button"
                                    onClick={() => canClickStep(index) && onStepClick?.(index)}
                                    disabled={!canClickStep(index)}
                                    className={`
                                        w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                                        transition-all duration-300
                                        ${canClickStep(index) ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
                                        disabled:cursor-not-allowed
                                        ${index < currentStep
                                            ? "bg-[#33333380] text-white"
                                            : index === currentStep
                                                ? "bg-[#333333] text-white ring-4 ring-[#8ACBCC]/30"
                                                : "bg-gray-200 text-gray-500"
                                        }
                                    `}
                                >
                                    {index < currentStep ? (
                                        <svg
                                            className="w-5 h-5"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        index + 1
                                    )}
                                </button>

                                {/* Label do passo */}
                                <div className="mt-2 text-center">
                                    <p
                                        className={`
                                            text-xs font-medium
                                            ${index <= currentStep
                                                ? "text-[#333333]"
                                                : "text-[#33333380]"
                                            }
                                        `}
                                    >
                                        {step.label}
                                    </p>
                                    {step.description && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            {step.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Linha conectora */}
                            {index < steps.length - 1 && (
                                <div
                                    className={`
                                        h-1 flex-1 mx-2 rounded transition-all duration-300
                                        ${index < currentStep
                                            ? "bg-[#333333]"
                                            : "bg-gray-200"
                                        }
                                    `}
                                    style={{ marginTop: "-2.5rem" }}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Formulário */}
            <div className="mb-8 min-h-[300px]">
                {children}
            </div>

            {/* Botões de navegação */}
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                {/* <div>
                    {!isFirstStep && (
                        <Button
                            variant="outline"
                            onClick={onPrevious}
                            className="rounded-full w-full"
                        >
                            {previousButtonText}
                        </Button>
                    )}
                </div> */}

                <Button
                    variant="primary"
                    onClick={onNext}
                    disabled={disableNext}
                    className="ml-auto w-full"
                >
                    {isLastStep ? "Finalizar" : nextButtonText}
                </Button>
            </div>
        </div>
    );
};
