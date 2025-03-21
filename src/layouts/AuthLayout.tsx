import Logo from "@/components/Logo"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { Link } from "react-router-dom"
import Footer from "./Footer"


export default function AuthLayout() {
  return (
    <>
        <div className="">
            <div className="">
                <Link to={'/'} className="block mx-auto w-64 h-20">
                    <Logo />
                </Link>
                <div className="mt-2">
                    <Outlet />
                </div>
            </div>            
        </div>
        <Footer />
        <ToastContainer
            pauseOnHover={false}
            pauseOnFocusLoss={false}
        />
    </>
  )
}
