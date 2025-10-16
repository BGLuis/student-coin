import React from "react";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, error, className = "", ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        ref={ref}
                        type="checkbox"
                        className={`
              w-4 h-4 text-blue-600 border-gray-300 rounded
              focus:ring-2 focus:ring-blue-500
              disabled:cursor-not-allowed
              ${className}
            `}
                        {...props}
                    />
                    {label && (
                        <span className="text-sm text-gray-700">{label}</span>
                    )}
                </label>
                {error && (
                    <span className="text-sm text-red-500">{error}</span>
                )}
            </div>
        );
    }
);

Checkbox.displayName = "Checkbox";
