import Logo from "@/components/Logo";
import Footer from "@/layouts/Footer";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex flex-col justify-between">
            {/* Header */}
            <header className="bg-white shadow-md">
                <div className="container mx-auto py-6 flex justify-between items-center">
                    <div className="w-36">
                        <Logo />
                    </div>
                    <nav className="px-4">
                        <Link to="/auth/login" className="text-gray-700 font-semibold hover:text-indigo-600 transition duration-300">
                            Login
                        </Link>

                    </nav>


                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-10 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
                {/* Text Section */}
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-blue-700 mb-6">
                        Administrador de Proyectos Moderno
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Gestiona tus tareas con un sistema intuitivo y visual,
                        organizado en cinco estados clave:
                    </p>
                    <ul className="text-left text-lg text-gray-600 mb-6">

                        <li className="flex items-center gap-2 ">
                            Pendiente
                        </li>
                        <li className="flex items-center gap-2">
                            En Espera
                        </li>

                    </ul>
                    <p className="text-lg text-gray-600 mb-6 border-4 border-l-indigo-500">
                        Colabora en tiempo real con tu equipo y mantén todos tus proyectos organizados de manera eficiente.
                    </p>
                    <Link to="/register" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-500 transition duration-300">
                        Empezar Ahora
                    </Link>
                </div>

                {/* Image Section */}
                <div className="flex flex-col items-center lg:items-end space-y-6">
                    <img src="/project.svg" alt="Project Management" className="w-full max-w-md object-cover rounded-lg shadow-lg" />
                    {/* <img src="/public/comentarios.gif" alt="Team Collaboration" className="w-full max-w-md object-cover rounded-lg shadow-lg" /> */}
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
