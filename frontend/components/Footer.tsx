import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <nav className="flex justify-center space-x-4 py-4 flex-wrap">
                <Link href="/about" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
                    Ajuda
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
                    Termos de Serviço
                </Link>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
                    Política de Privacidade
                </Link>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
                    @scoin
                </Link>
            </nav>
        </footer>
    );
}
