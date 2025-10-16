import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Header: React.FC = () => {
    return (
        <header className="w-full bg-white shadow-sm">
            <div className="container mx-auto px-6 py-4">
                <Link href="/" className="inline-block">
                    <Image
                        src="/image/logo.png"
                        alt="Student Coin Logo"
                        width={48}
                        height={48}
                        priority
                        className="hover:opacity-80 transition-opacity"
                    />
                </Link>
            </div>
        </header>
    );
};
