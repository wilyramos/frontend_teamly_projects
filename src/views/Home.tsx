import Logo from "@/components/Logo";
import Footer from "@/layouts/Footer";
import { Link } from "react-router-dom";
import { MdBusiness, MdArrowForward } from "react-icons/md";



export default function Home() {


    // mostrar como boton proyectos en caso de que el usuario este autenticado
    
    const isLogin = localStorage.getItem('AUTH_TOKEN')

    return (
        <div className="min-h-screen justify-between">
            {/* Header */}
            <header className="bg-gray-50 shadow-md px-10 py-2">
                <div className="container mx-auto py-6 flex justify-between items-center">
                    <div className="w-36">
                        <Logo />
                    </div>
                    <nav className="">
                        {isLogin ? (
                        <Link to="/projects" className="text-gray-700 font-semibold hover:text-indigo-600 transition duration-300">
                            Mis Proyectos
                        </Link> ) : (
                        <Link to="/auth/login" className="text-gray-700 font-semibold hover:text-indigo-600 transition duration-300">
                            Login
                            </Link>
                        )}

                    </nav>


                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto px-20 lg:py-20 grid lg:grid-cols-2 gap-10 items-center bg-gray-50">
                {/* Text Section */}
                <div className="text-center lg:text-left">
                    <p className="bg-orange-500 text-white px-2 border-l-4 border-orange-700 shadow-xl w-1/3 hover:bg-orange-600 rounded-r-xl flex items-center mb-10" >
                        <MdBusiness />
                        <span className="ml-2 font-bold">Aplicacion web</span>
                    </p>
                    <h1 className="text-5xl font-bold text-blue-600 mb-6">
                        Tu administrador de {' '}
                        <span className="text-gray-500">Proyectos</span>
                        {' '}
                        Moderno
                    </h1>
                    <p className="text text-gray-600 mb-6">
                        Gestiona tus tareas con un sistema intuitivo y visual,
                        organizado en cinco estados clave:
                    </p>
                    <ul className="text-left text-sm text-gray-600 mb-4 flex flex-row items-center justify-center gap-2">
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
                    <p className=" text-gray-600 mb-6 border-2 border-indigo-200 bg-white rounded-lg shadow-md p-4">
                        * Colabora en tiempo real con tu equipo y mantén todos tus proyectos organizados de manera eficiente.
                    </p>
                    <div className="flex justify-center md:justify-end">
                        <Link to="/auth/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-500 transition duration-300 mr-4">
                            Iniciar Sesion
                            <MdArrowForward className="inline-block ml-4" />
                        </Link>
                    </div>

                </div>

                {/* Image Section */}
                <div className="flex flex-col items-center justify-center">
                    
                    <img src="/project.svg" alt="Project Management" className="" />
                    {/* <img src="/public/comentarios.gif" alt="Team Collaboration" className="w-full max-w-md object-cover rounded-lg shadow-lg" /> */}
                    <span className="text-gray-500 text-sm mt-4">Tus colaboracion y seguimiento en una misma aplicacion</span>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}
