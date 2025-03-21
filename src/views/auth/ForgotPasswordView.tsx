import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = { email: '' };
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data);
            reset();
            navigate('/auth/confirm-account');
        }
    });

    const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData);

    return (
        <div className="flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sección izquierda con información */}
                <div className="flex flex-col justify-center p-4 text-center md:text-left">
                    <h2 className="text-3xl font-semibold text-gray-700 mb-3">
                        ¿Olvidaste tu contraseña?
                    </h2>
                    <p className="text-gray-600 text-md">
                        Ingresa tu email y te enviaremos instrucciones para restablecer tu contraseña.
                    </p>
                </div>

                {/* Sección derecha con formulario */}
                <div className="p-4 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-gray-700 text-center mb-4">Restablecer Contraseña</h3>
                    <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-4" noValidate>
                        <div>
                            <input
                                type="email"
                                placeholder="Email de registro"
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

                        <button
                            type="submit"
                            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 rounded-lg transition duration-300"
                        >
                            Enviar instrucciones
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