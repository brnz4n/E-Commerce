import { Linkedin, Instagram, Mail } from 'lucide-react';

export function Footer() {
return (
<footer className="bg-purple-50 dark:bg-[#0f061a] text-gray-600 dark:text-gray-300 border-t border-purple-200 dark:border-purple-900/50 transition-colors duration-300 ">

    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 md:gap-0">

        <div className="hidden md:block"></div>

            <div className="text-center md:col-span-1 text-sm leading-relaxed">
                <p className="text-gray-800 dark:text-gray-400">
                    R. Coronel Estanislau Frota, S/N, Centro, Sobral - CE
                    <br className="hidden md:block" />
                    {' '}Bloco I - Mucambinho, Gabinete 19
                </p>
        </div>

        <div className="flex justify-center md:justify-end gap-6 md:col-span-1">
            <a href="https://www.linkedin.com/company/loading-junior/?originalSubdomain=br" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                <Linkedin size={22} />
            </a>
            <a href="https://www.instagram.com/loadingjr/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                <Instagram size={22} />
            </a>
            <a href="mailto:oi.loadingjr@gmail.com" aria-label="E-mail"
                className="text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                <Mail size={22} />
            </a>
        </div>

        </div>
    </div>

    <div className="py-4 text-center text-xs text-gray-500 dark:text-gray-500 font-medium bg-white dark:bg-black/20 animate-fade-in-up">
        © Todos os direitos reservados
    </div>
</footer>
);
}