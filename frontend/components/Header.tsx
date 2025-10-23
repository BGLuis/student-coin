import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Header: React.FC = () => {
    return (
        <header className="w-full bg-white border-b border-gray-200">
            <div className="py-4 pl-4">
                <Link href="/" className="inline-block">
                    <Image
                        src="/image/logo.png"
                        alt="Student Coin Logo"
                        width={32}
                        height={32}
                        priority
                        className="hover:opacity-80 transition-opacity"
                    />
                </Link>
            </div>
        </header>
    );
};
