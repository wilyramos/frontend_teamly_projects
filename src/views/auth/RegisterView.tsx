import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function RegisterView() {
    const initialValues: UserRegistrationForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    };

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            toast.success(data);
            reset();
            navigate('/auth/login');
        }
    });

    const password = watch('password');

    const handleRegister = (formData: UserRegistrationForm) => {
        mutate(formData);
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sección izquierda con información */}
                <div className="flex flex-col justify-center p-4 text-center md:text-left">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-3">
                        Únete a <span className="text-sky-500 font-bold">FasTrack</span>
                    </h2>
                    <p className="text-gray-600 text-md">
                        Crea tu cuenta y empieza a gestionar tus proyectos de manera eficiente.
                    </p>
                </div>

                {/* Sección derecha con formulario */}
                <div className="p-4 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">Crear Cuenta</h3>
                    <form onSubmit={handleSubmit(handleRegister)} className="space-y-4" noValidate>
                        <div>
                            <input
                                type="text"
                                placeholder="Nombre"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
                                {...register("name", { required: "El Nombre es obligatorio" })}
                            />
                            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                        </div>

                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
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
                            <input
                                type="password"
                                placeholder="Contraseña"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
                                {...register("password", {
                                    required: "El Password es obligatorio",
                                    minLength: {
                                        value: 8,
                                        message: "El Password debe tener al menos 8 caracteres",
                                    },
                                })}
                            />
                            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                        </div>

                        <div>
                            <input
                                type="password"
                                placeholder="Confirmar Contraseña"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400 focus:outline-none"
                                {...register("password_confirmation", {
                                    required: "Confirmar la contraseña es obligatorio",
                                    validate: value => value === password || "Las contraseñas no coinciden",
                                })}
                            />
                            {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 rounded-lg transition duration-300"
                        >
                            Registrarme
                        </button>
                    </form>
                    <nav className="mt-4 text-center">
                        <Link to="/auth/login" className="text-sky-500 hover:underline">
                            ¿Ya tienes cuenta? Inicia sesión
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
