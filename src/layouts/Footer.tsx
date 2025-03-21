import { FaGithub, FaLinkedin, FaGlobe, FaEnvelope } from "react-icons/fa";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-100 py-10 px-10">
            <div className="mx-auto text-gray-700 text-sm">
                <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
                    
                    {/* Logo y descripción */}
                    <div className="flex flex-col items-center md:items-start">
                        <Link to="/" className="w-20">
                                                <Logo />
                                            </Link>
                        <p className="mt-4 max-w-xs text-gray-600">
                            Plataforma de administración de proyectos colaborativos, optimizada para equipos modernos.
                        </p>
                    </div>

                    {/* Navegación rápida */}
                    <div className="flex flex-col space-y-2">
                        <h3 className="font-semibold text-gray-800">Enlaces rápidos</h3>
                        <Link to="/" className="hover:text-gray-900">Inicio</Link>
                        {/* <a href="/about" className="hover:text-gray-900">Nosotros</a> */}
                        {/* <a href="/contact" className="hover:text-gray-900">Contacto</a> */}
                        {/* <a href="/faq" className="hover:text-gray-900">FAQ</a> */}
                        <Link to="/auth/login" className="hover:text-gray-900">Iniciar Sesión</Link>
                    </div>

                    {/* Redes sociales y contacto */}
                    <div className="flex flex-col space-y-2">
                        <h3 className="font-semibold text-gray-800">Síguenos</h3>
                        <div className="flex justify-center md:justify-start gap-4 text-gray-600">
                            <a href="https://github.com/wilyramos" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                                <FaGithub size={20} />
                            </a>
                            <a href="https://linkedin.com/in/wilyramos" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                                <FaLinkedin size={20} />
                            </a>
                            <a href="https://wilyramos.github.io/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                                <FaGlobe size={20} />
                            </a>
                        </div>
                        <p className="flex items-center justify-center md:justify-start gap-2 text-gray-600">
                            <FaEnvelope /> contacto@fasttrack.com
                        </p>
                    </div>
                </div>

                {/* Derechos de autor */}
                <div className="text-center mt-6 border-t pt-4 text-gray-500">
                    © {new Date().getFullYear()} <a href="https://wilyramos.github.io/" target="_blank" className="font-semibold hover:text-gray-900">Wily Ramos</a>. Todos los derechos reservados.
                </div>
            </div>
        </footer>
    );
}
