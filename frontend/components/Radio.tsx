import React from "react";

interface RadioOption {
    value: string;
    label: string;
}

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    error?: string;
    options: RadioOption[];
    name: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
    ({ label, error, options, name, className = "", ...props }, ref) => {
        return (
            <div className="flex flex-col gap-2">
                {label && (
                    <label className="text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <div className="flex flex-col gap-2">
                    {options.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <input
                                ref={ref}
                                type="radio"
                                name={name}
                                value={option.value}
                                className={`
                  w-4 h-4 text-blue-600 border-gray-300
                  focus:ring-2 focus:ring-blue-500
                  disabled:cursor-not-allowed
                  ${className}
                `}
                                {...props}
                            />
                            <span className="text-sm text-gray-700">{option.label}</span>
                        </label>
                    ))}
                </div>
                {error && (
                    <span className="text-sm text-red-500">{error}</span>
                )}
            </div>
        );
    }
);

Radio.displayName = "Radio";
