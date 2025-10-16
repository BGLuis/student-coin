import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, className = "", ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1">
                {label && (
                    <label className="text-sm font-medium text-gray-700">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={`
            px-3 py-2 border border-gray-300 rounded-md
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            resize-vertical
            ${error ? "border-red-500" : ""}
            ${className}
          `}
                    {...props}
                />
                {error && (
                    <span className="text-sm text-red-500">{error}</span>
                )}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";
