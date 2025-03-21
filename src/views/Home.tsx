import { Link } from "react-router-dom";
import { MdBusiness, MdArrowForward, MdCheckCircle, MdPeople, MdWork, MdTrendingUp, MdMenu, MdClose } from "react-icons/md";
import { useState } from "react";
import Logo from "@/components/Logo";
import Footer from "@/layouts/Footer";

export default function Home() {
    const isLogin = localStorage.getItem("AUTH_TOKEN");
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="w-36">
                        <Logo />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-6">
                        <Link to="/" className="text-gray-600 font-medium hover:text-sky-500">Inicio</Link>
                        <Link to={isLogin ? "/projects" : "/auth/login"} className="text-gray-600 font-medium hover:text-sky-500">
                            {isLogin ? "Mis Proyectos" : "Login"}
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-600 text-2xl">
                        {menuOpen ? <MdClose /> : <MdMenu />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <div className="md:hidden bg-white shadow-md py-4 px-6">
                        <nav className="flex flex-col gap-4">
                            <Link to="/" className="text-gray-600 font-medium hover:text-sky-500">Inicio</Link>
                            <Link to={isLogin ? "/projects" : "/auth/login"} className="text-gray-600 font-medium hover:text-sky-500">
                                {isLogin ? "Mis Proyectos" : "Login"}
                            </Link>
                        </nav>
                    </div>
                )}
            </header>

            {/* Main Content */}
            <main className="mx-auto px-20 py-10 lg:flex lg:items-center lg:justify-between">
                {/* Text Section */}
                <div className="text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start bg-sky-500 text-white px-4 py-1 rounded-md shadow-md w-fit mx-auto lg:mx-0">
                        <MdBusiness />
                        <span className="ml-2 font-semibold">Gestión de Proyectos Colaborativos</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-sky-500 mt-6">
                        Organiza, Colabora y <span className="text-blue-900">Optimiza</span> tus Proyectos
                    </h1>

                    <p className="text-gray-600 mt-4">
                        Centraliza el trabajo de tu equipo con herramientas eficientes y una visión clara de cada proyecto.
                    </p>

                    {/* Beneficios */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-left">
                        <div className="flex items-center gap-3">
                            <MdCheckCircle className="text-sky-500 text-2xl" />
                            <span>Seguimiento en tiempo real</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MdPeople className="text-sky-500 text-2xl" />
                            <span>Colaboración entre equipos</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MdWork className="text-sky-500 text-2xl" />
                            <span>Gestión de tareas y prioridades</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <MdTrendingUp className="text-sky-500 text-2xl" />
                            <span>Optimización del rendimiento</span>
                        </div>
                    </div>


                    {/* Botón */}
                    <div className="mt-6">
                        <Link to="/auth/login" className="bg-blue-900 text-white px-6 py-3 rounded-md shadow-md hover:bg-sky-500 flex items-center justify-center w-fit mx-auto lg:mx-0">
                        Registrate <MdArrowForward className="ml-2" />
                        </Link>
                    </div>
                </div>

                {/* Estadísticas */}
                <div className="mt-10 lg:mt-0 grid grid-cols-2 gap-6 text-center">
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h3 className="text-4xl font-bold text-sky-500">+1,500</h3>
                        <p className="text-gray-600">Proyectos Gestionados</p>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h3 className="text-4xl font-bold text-sky-500">+500</h3>
                        <p className="text-gray-600">Equipos Colaborando</p>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h3 className="text-4xl font-bold text-sky-500">+10,000</h3>
                        <p className="text-gray-600">Tareas Completadas</p>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h3 className="text-4xl font-bold text-sky-500">98%</h3>
                        <p className="text-gray-600">Satisfacción del Usuario</p>
                    </div>


                </div>

            </main>
            <div className=" px-20 py-8">
                <h2 className="text-xl md:text-3xl font-extralight text-blue-900 text-center">Verifica a traves de los estados de Proyectos</h2>
                <ul className="text-left text-xs md:text-sm text-gray-600 mb-4 flex flex-row items-center justify-center gap-2 my-10 ">
                    <li className="px-2 border-t-4 border-gray-700 shadow-xl w-1/3 hover:bg-gray-600 rounded-md flex items-center justify-center">
                        Pendiente
                    </li>
                    <li className="px-2 border-t-4 border-yellow-700 shadow-xl w-1/3 hover:bg-yellow-600 rounded-md flex items-center justify-center">
                        En Espera
                    </li>
                    <li className="px-2 border-t-4 border-blue-700 shadow-xl w-1/3 hover:bg-blue-600 rounded-md flex items-center justify-center">
                        En progreso
                    </li>
                    <li className="px-2 border-t-4 border-purple-700 shadow-xl w-1/3 hover:bg-purple-600 rounded-md flex items-center justify-center">
                        Por Revisar
                    </li>
                    <li className="px-2 border-t-4 border-red-700 shadow-xl w-1/3 hover:bg-red-600 rounded-md flex items-center justify-center">
                        Completado
                    </li>
                </ul>

            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}
