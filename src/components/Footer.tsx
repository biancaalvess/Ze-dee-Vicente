import React from 'react';
import { Building } from 'lucide-react';

export function Footer() {
    return (
    <footer className="bg-white dark:bg-gray-800 mt-12 py-8 shadow-lg">
        <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
        <img src="/logo-fundo.png" alt="Logo Zé de Vicente" />
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4">
            A mais de 40 anos de tradição em materiais de construção
            </p>
            <div className="space-y-2 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Horário de Funcionamento:</p>
            <p>Segunda a Sexta: 07:00 - 17:00</p>
            <p>Sábado: 07:00 - 12:00</p>
            </div>

            <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
                © {new Date().getFullYear()} Zé de Vicente. Todos os direitos reservados. - Desenvolvido por: 
                <a href="https://biancaalvess-portifolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Bianca Alves
                </a>.
            </p>
            </div>
        </div>
        </div>
    </footer>
    );
}