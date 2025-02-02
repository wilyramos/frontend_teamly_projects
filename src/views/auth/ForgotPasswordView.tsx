import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { forgotPassword } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordView() {
    const initialValues: ForgotPasswordForm = {
        email: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const navigate = useNavigate()

    const { mutate } = useMutation({
        mutationFn: forgotPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate('/auth/confirm-account')
        }
    })

    const handleForgotPassword = (formData: ForgotPasswordForm) => { mutate(formData) }

    return (
        <div className="grid gap-2 md:grid-cols-2 md:grid-rows-1 p-10">
            <h1 className="text-2xl font-black">Reestablecer contraseña</h1>
            <p className="text-2xl font-light text-gray-600 mt-5">
                ¿Olvidates tu contraseña? ingresa tu email {''}
                <span className=" text-sky-500 font-bold"> y reestablece tu contraseña</span>
            </p>
            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-8 p-10  bg-white border rounded-2xl border-r-4"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border-r-4 rounded-xl"
                        {...register("email", {
                            required: "El Email de registro es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Enviar Instrucciones'
                    className="bg-sky-400 hover:bg-sky-500 p-2  text-white   cursor-pointer border font-black w-full uppercase border-b-4 rounded-xl"
                />
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/login'
                    className="text-center text-gray-600 font-normal"
                >
                    ¿Ya tienes cuenta? Iniciar Sesión
                </Link>

                <Link
                    to='/auth/register'
                    className="text-center text-gray-600 font-normal"
                >
                    ¿No tienes cuenta? Crea una
                </Link>
            </nav>
        </div>
    )
}