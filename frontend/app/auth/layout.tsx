import Footer from '@/components/Footer';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Main Content */}
            <main
                className="flex-grow flex items-center justify-center bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(/image/backgrund.webp)'
                }}
            >
                {children}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
