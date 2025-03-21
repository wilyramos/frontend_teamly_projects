import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authenticateUser } from "@/api/AuthAPI";
import { useState } from "react";

export default function LoginView() {

    // state loading
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    };
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: authenticateUser,

        onMutate: () => {
            setIsLoading(true);
            toast.loading('Iniciando sesión...');
        },
        onError: (error) => {
            setIsLoading(false);
            toast.dismiss();
            toast.error(error.message);
        },
        onSuccess: () => {
            setIsLoading(false);
            toast.dismiss();
            navigate('/projects');
        }
    });

    const handleLogin = (formData: UserLoginForm) => mutate(formData);

    return (
        <div className="flex items-center justify-center bg-gray-50 p-6">
            <div className="bg-white p-8 rounded-3xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Sección izquierda con información */}
                <div className="flex flex-col justify-center p-6 text-center md:text-left">
                    <h2 className="text-4xl text-gray-700 mb-4 ">
                        Bienvenido a <span className="text-blue-900 font-bold">FasTrack</span>
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Gestiona tus proyectos de manera eficiente iniciando sesión en tu cuenta.
                    </p>
                </div>
                
                {/* Sección derecha con formulario */}
                <div className="p-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-semibold text-gray-700 text-center mb-6">Iniciar Sesión</h3>
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6" noValidate>
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-2">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Ingresa tu email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
                                {...register("email", {
                                    required: "El Email es obligatorio",
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: "E-mail no válido",
                                    },
                                })}
                            />
                            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                        </div>

                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-2">Contraseña</label>
                            <input
                                type="password"
                                placeholder="Ingresa tu contraseña"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
                                {...register("password", {
                                    required: "El Password es obligatorio",
                                })}
                            />
                            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-lg transition duration-300"
                        >
                            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                    </form>
                    <nav className="mt-6 text-center space-y-3">
                        <Link to="/auth/register" className="text-sky-500 hover:underline">
                            ¿No tienes cuenta? Crea una
                        </Link>
                        <br />
                        <Link to="/auth/forgot-password" className="text-sky-500 hover:underline">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
