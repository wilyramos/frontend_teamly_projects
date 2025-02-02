import Logo from "@/components/Logo"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Link } from "react-router-dom"


export default function AuthLayout() {
  return (
    <>
        <div className="bg-gray-200 min-h-screen">
            <div className="py-5 lg:py-10 mx-auto">
                <Link to={'/auth/login'} className="block mx-auto w-64 h-20">
                    <Logo />
                </Link>
                <div className="mt-2">
                    <Outlet />
                </div>
            </div>            
        </div>
        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    </>
  )
}
