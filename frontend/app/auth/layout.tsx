import Footer from '@/components/Footer';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center bg-[#f7cac9] [background-image:radial-gradient(circle_at_60%_30%,#74c6d4,rgba(116,198,212,0)_40%),radial-gradient(circle_at_20%_80%,#e85d75,rgba(232,93,117,0)_40%),radial-gradient(circle_at_90%_70%,#f5e5c5,rgba(245,229,197,0)_35%)]">
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
