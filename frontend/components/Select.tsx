import React, { useEffect, useRef, useState } from "react";

interface SelectOption {
    value: string;
    label?: React.ReactNode;
    [key: string]: any;
}

interface SelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
    name?: string;
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<any>) => void;
    onValueChange?: (value: string) => void;
    renderOption?: (
        option: SelectOption,
        isSelected: boolean,
        isHighlighted: boolean
    ) => React.ReactNode;
    disabled?: boolean;
    className?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
    (
        {
            name,
            label,
            error,
            options,
            placeholder,
            value,
            defaultValue,
            onChange,
            onValueChange,
            renderOption,
            disabled = false,
            className = "",
            ...props
        },
        ref
    ) => {
        const isControlled = value !== undefined;
        const [internalValue, setInternalValue] = useState<string | "">(
            isControlled ? (value as string) : (defaultValue ?? "")
        );

        useEffect(() => {
            if (isControlled) setInternalValue(value as string);
        }, [value, isControlled]);

        const [open, setOpen] = useState(false);
        const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
        const containerRef = useRef<HTMLDivElement | null>(null);
        const wrapperRef = useRef<HTMLDivElement | null>(null);
        const optionsRef = useRef<Array<HTMLLIElement | null>>([]);

        useEffect(() => {
            function handleOutside(e: MouseEvent) {
                if (!wrapperRef.current) return;
                if (!wrapperRef.current.contains(e.target as Node)) {
                    setOpen(false);
                    setHighlightedIndex(-1);
                }
            }
            document.addEventListener("mousedown", handleOutside);
            return () => document.removeEventListener("mousedown", handleOutside);
        }, []);

        const selectOption = (opt: SelectOption) => {
            if (disabled) return;
            setInternalValue(opt.value);

            onValueChange && onValueChange(opt.value);

            if (onChange) {
                const fakeEvent = {
                    target: { name: name ?? "", value: opt.value },
                    currentTarget: { name: name ?? "", value: opt.value },
                    preventDefault: () => {},
                    stopPropagation: () => {},
                    nativeEvent: {},
                } as unknown as React.ChangeEvent<HTMLSelectElement>;
                try {
                    onChange(fakeEvent);
                } catch (err) {
                    console.warn("Select: erro ao chamar onChange custom", err);
                }
            }

            setOpen(false);
        };

        const handleToggle = () => {
            if (disabled) return;
            setOpen((s) => !s);
            if (!open) setHighlightedIndex(options.findIndex((o) => o.value === internalValue));
        };

        const handleKeyDown = (e: React.KeyboardEvent) => {
            if (disabled) return;
            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (!open) {
                    setOpen(true);
                    setHighlightedIndex(0);
                } else {
                    setHighlightedIndex((i) => Math.min(options.length - 1, i + 1));
                }
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                if (!open) {
                    setOpen(true);
                    setHighlightedIndex(options.length - 1);
                } else {
                    setHighlightedIndex((i) => Math.max(0, i - 1));
                }
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (open && highlightedIndex >= 0) {
                    selectOption(options[highlightedIndex]);
                } else {
                    setOpen(true);
                }
            } else if (e.key === "Escape") {
                setOpen(false);
                setHighlightedIndex(-1);
            }
        };

        useEffect(() => {
            if (open && highlightedIndex >= 0 && optionsRef.current[highlightedIndex]) {
                optionsRef.current[highlightedIndex]?.scrollIntoView({ block: "nearest" });
            }
        }, [highlightedIndex, open]);

        const selectedOption = options.find((o) => o.value === internalValue);

        return (
            <div className={`flex flex-col gap-1 ${className}`} {...props} ref={ref as any}>
                {label && <label className="text-sm font-medium text-gray-700">{label}</label>}

                <div className="relative" ref={wrapperRef}>
                    <div
                        ref={containerRef}
                        tabIndex={disabled ? -1 : 0}
                        onKeyDown={handleKeyDown}
                        aria-haspopup="listbox"
                        aria-expanded={open}
                        role="combobox"
                        aria-disabled={disabled}
                        className={`px-3 py-2 border rounded-md flex items-center justify-between cursor-pointer ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                            } ${error ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        onClick={handleToggle}
                    >
                        <div className={`truncate text-sm ${selectedOption ? "text-gray-900" : "text-gray-400"}`}>
                            {selectedOption
                                ? selectedOption.label
                                : internalValue
                                    ? internalValue
                                    : placeholder ?? "Selecione..."}
                        </div>

                        <div className="ml-2 text-gray-500">{/* caret */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 transform ${open ? "rotate-180" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {open && (
                        <ul
                            role="listbox"
                            aria-activedescendant={highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined}
                            className="absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white border border-gray-200 shadow-lg py-1"
                        >
                            {options.length === 0 && <li className="px-3 py-2 text-sm text-gray-500">Sem opções</li>}

                            {options.map((opt, idx) => {
                                const isSelected = opt.value === internalValue;
                                const isHighlighted = idx === highlightedIndex;
                                return (
                                    <li
                                        id={`option-${idx}`}
                                        key={opt.value}
                                        role="option"
                                        aria-selected={isSelected}
                                        ref={(el) => {
                                            optionsRef.current[idx] = el;
                                        }}
                                        onMouseEnter={() => setHighlightedIndex(idx)}
                                        onMouseLeave={() => setHighlightedIndex(-1)}
                                        onClick={() => selectOption(opt)}
                                        className={`px-3 py-2 cursor-pointer text-sm flex items-center justify-between ${isHighlighted ? "bg-blue-50 text-blue-700" : "text-gray-700"
                                            } ${isSelected ? "font-medium" : "font-normal"}`}
                                    >
                                        <div className="truncate">{renderOption ? renderOption(opt, isSelected, isHighlighted) : opt.label}</div>
                                        {isSelected && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 00-1.414-1.414L7 12.172 4.707 9.879a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l9-9z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {name && <input type="hidden" name={name} value={internalValue} />}
                </div>

                {error && <span className="text-sm text-red-500">{error}</span>}
            </div>
        );
    }
);

Select.displayName = "Select";
