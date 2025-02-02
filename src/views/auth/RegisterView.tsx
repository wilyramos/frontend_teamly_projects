import { useForm } from "react-hook-form";
import { UserRegistrationForm } from "@/types/index";
import ErrorMessage from "@/components/ErrorMessage";
import { Link } from "react-router-dom";
import { useMutation  } from "@tanstack/react-query";
import { createAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function RegisterView() {

    const initialValues: UserRegistrationForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegistrationForm>({ defaultValues: initialValues });

    const navigate = useNavigate() // hook from react-router-dom

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            reset()
            navigate('/auth/login')
        }
    })

    const password = watch('password');

    const handleRegister = (formData: UserRegistrationForm) => { 
        mutate(formData)
    }

    return (
        <div className="grid gap-2 md:grid-cols-2 md:grid-rows-1">
            <h1 className="text-5xl font-black ">Crear Cuenta</h1>
            <p className="text-2xl font-light text-gray-600 mt-5">
                Llena el formulario para {''}
                <span className=" text-sky-500 font-bold"> crear tu cuenta</span>
            </p>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-2 p-10  bg-white mt-10 border rounded-2xl border-r-4"
                noValidate
            >
                <div className="flex flex-col gap-2">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300  border rounded-xl border-r-4"
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

                <div className="flex flex-col gap-2">
                    <label
                        className="font-normal text-2xl"
                    >Nombre</label>
                    <input
                        type="name"
                        placeholder="Nombre de Registro"
                        className="w-full p-3  border-gray-300 border rounded-xl border-r-4"
                        {...register("name", {
                            required: "El Nombre de usuario es obligatorio",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border rounded-xl border-r-4"
                        {...register("password", {
                            required: "El Password es obligatorio",
                            minLength: {
                                value: 8,
                                message: 'El Password debe ser mínimo de 8 caracteres'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-normal text-2xl"
                    >Repetir Password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repite Password de Registro"
                        className="w-full p-3  border-gray-300 border rounded-xl border-r-4"
                        {...register("password_confirmation", {
                            required: "Repetir la contraseña es obligatorio",
                            validate: value => value === password || 'Las contraseñas no son iguales'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Registrarme'
                    className="bg-sky-400 hover:bg-sky-500 p-2  text-white   cursor-pointer border font-black w-full uppercase border-b-4 rounded-xl"
                />
            </form>
            <nav className="mt-10 flex flex-col space-y-5">
                <Link
                    to="/auth/login"
                    className="text-center text-gray-600 font-normal"
                >
                    Ya tienes cuenta? Iniciar Sesión
                </Link>

                <Link
                    to="/auth/forgot-password"
                    className="text-center text-gray-600 font-normal"
                >
                    Olvidaste tu Password?
                </Link>
            </nav>
        </div>
    )
}