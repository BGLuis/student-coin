"use client";

import React, { useState, useEffect } from "react";

type MaskType = "cpf" | "cnpj" | "phone";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    mask?: MaskType | ((digits: string) => string);
}

function digitsOnly(value: string) {
    return (value ?? "").toString().replace(/\D/g, "");
}

function formatCPF(d: string) {
    d = d.slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
    if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

function formatCNPJ(d: string) {
    d = d.slice(0, 14);
    if (d.length <= 2) return d;
    if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
    if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
    if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

function formatPhone(d: string) {
    d = d.slice(0, 11);
    if (d.length <= 2) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className = "", type, mask, value, onChange, ...rest }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === "password";
        const inputType = isPassword && showPassword ? "text" : type;
        const valueProp = (value ?? (rest as any).value) as string | undefined;

        const format = typeof mask === "function"
            ? mask
            : mask === "cpf"
                ? (d: string) => formatCPF(d)
                : mask === "cnpj"
                    ? (d: string) => formatCNPJ(d)
                    : mask === "phone"
                        ? (d: string) => formatPhone(d)
                        : undefined;

        const [displayValue, setDisplayValue] = useState<string>(() =>
            format ? format(digitsOnly(valueProp ?? "")) : (valueProp ?? "")
        );

        useEffect(() => {
            const next = format ? format(digitsOnly(valueProp ?? "")) : (valueProp ?? "");
            setDisplayValue(next);
        }, [valueProp, format]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const raw = e.target.value;
            if (!format) {
                if (onChange) return onChange(e);
                return;
            }

            const digits = digitsOnly(raw);
            const masked = format(digits);

            setDisplayValue(masked);

            const fakeEvent = {
                target: { name: (rest as any).name ?? "", value: masked },
                currentTarget: { name: (rest as any).name ?? "", value: masked },
                preventDefault: () => {},
                stopPropagation: () => {},
                nativeEvent: {},
            } as unknown as React.ChangeEvent<HTMLInputElement>;

            try {
                if (onChange) onChange(fakeEvent);
            } catch (err) {

                console.warn("Input: erro ao chamar onChange custom", err);
            }
        };

        return (
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    {label && (
                        <label className="text-sm font-normal text-[#666666]">
                            {label}
                        </label>
                    )}
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
                        >
                            {showPassword ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </svg>
                                    <span>Esconder</span>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span>Esconder</span>
                                </>
                            )}
                        </button>
                    )}
                </div>
                <input
                    ref={ref}
                    type={inputType}
                    className={`
                w-full px-4 py-3 border-0 rounded-lg
                focus:outline-none ring-2 ring-gray-300
                disabled:bg-gray-200 disabled:cursor-not-allowed
                placeholder:text-gray-400 text-black
                ${error ? "ring-2 ring-red-500" : ""}
                ${className}
              `}
                    {...rest}
                    value={displayValue}
                    onChange={handleChange}
                />
                {error && (
                    <span className="text-sm text-red-500">{error}</span>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";
