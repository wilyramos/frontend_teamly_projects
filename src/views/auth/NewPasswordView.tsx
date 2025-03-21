import { Link, useNavigate } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { ConfirmToken } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { confirmAccount } from "@/api/AuthAPI";
import { toast } from "react-toastify";

export default function ConfirmAccountView() {
    const [token, setToken] = useState<ConfirmToken['token']>('');
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: confirmAccount,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data);
            navigate('/auth/login');
        }
    });

    const handleComplete = (token: ConfirmToken['token']) => mutate({ token });

    return (
        <div className="flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold text-gray-700 mb-3">Confirma tu Cuenta</h2>
                <p className="text-gray-600 text-md mb-6">Ingresa el código de 6 dígitos que recibiste por e-mail.</p>
                
                <div className="flex justify-center gap-2 mb-6">
                    <PinInput value={token} onChange={setToken} onComplete={handleComplete}>
                        {[...Array(6)].map((_, i) => (
                            <PinInputField key={i} className="w-10 h-10 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-400" />
                        ))}
                    </PinInput>
                </div>
                
                <Link to='/auth/request-code' className="text-sky-500 hover:underline">
                    Solicitar un nuevo código
                </Link>
            </div>
        </div>
    );
}
