import { useForm } from "react-hook-form";
import { UserLoginForm } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/ErrorMessage";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authenticateUser } from "@/api/AuthAPI";


export default function LoginView() {

    const navigate = useNavigate()


    // verify if the user is authenticated

    
    

    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })


    const { mutate } = useMutation({
        mutationFn: authenticateUser,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            
            navigate('/projects')
        }
    })

    const handleLogin = (formData: UserLoginForm) => mutate(formData)

    return (
        <div className="grid gap-2 md:grid-cols-2 md:grid-rows-1 p-20">
        
            <p className="text-2xl font-light text-gray-600 mt-5">
                Planear proyecto con teamly {''}
                <span className=" text-sky-400 font-bold"> iniciando sesion en el formulario</span>
            </p>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-6 p-10 bg-white border rounded-xl border-r-4 "
                noValidate
            >
                <div className="flex flex-col gap-5 ">
                    <label
                        className="font-normal text-2xl "
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border-r-4 rounded-xl"
                        {...register("email", {
                            required: "El Email es obligatorio",
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

                <div className="flex flex-col gap-5 ">
                    <label
                        className="font-normal text-2xl "
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border rounded-xl  border-r-4 "
                        {...register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className=" bg-sky-400 hover:bg-sky-500 p-2  text-white   cursor-pointer border font-black w-full uppercase border-b-4 rounded-xl"
                />
            </form>
            <nav className="mt-10 flex flex-col space-y-5">
                <Link
                    to="/auth/register"
                    className="text-center text-gray-600 font-normal"
                >
                    No tienes cuenta? Crear una
                </Link>

                <Link
                    to="/auth/forgot-password"
                    className="text-center text-gray-600 font-normal"
                >
                    Olvidaste tu contraseña?
                </Link>
            </nav>

        </div>
    )
}