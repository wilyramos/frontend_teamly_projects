import { Link, Outlet, Navigate } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu'
import { useAuth } from '@/hooks/useAuth'
import { useQueryClient } from '@tanstack/react-query'
import Footer from './Footer'


export default function AppLayout() {

    // For the logout function

    const queryClient = useQueryClient()
    const logout = () => {
      localStorage.removeItem('AUTH_TOKEN')
      queryClient.invalidateQueries({queryKey: ['user']}) // invalidates the query for the user and redirects to the login page
    }

    const { data, isError, isLoading } = useAuth()
    if(isLoading) return 'Cargando...'
    if(isError) return <Navigate to='/auth/login' />

    if(data) return (
        <>
            <header className='bg-gray-50 py-1 px-10'>
                <div className='mx-auto flex flex-col lg:flex-row justify-between items-center'>
                    <div className='w-36'>
                        <Link to={'/'}>
                            <Logo />
                        </Link>
                    </div>
                    <div className='block lg:hidden'>
                    <NavMenu                         
                         name={data.name}
                     />
                    </div>


                    <nav className='hidden lg:flex gap-4'>
                        <Link
                            to='/profile'
                            className='text-gray-600 font-semibold hover:text-gray-800'
                        >Perfil</Link>

                        <Link
                            to='/projects'
                            className='text-gray-600 font-semibold hover:text-gray-800'
                        >Mis Proyectos</Link>
                        
                        <Link
                            to={'/'}
                            onClick={logout}
                            className='text-gray-600 font-semibold hover:text-gray-800'
                        >Cerrar Sesión</Link>

                    </nav>
                </div>
            </header>


            {/* // Aquí se muestra el contenido de la página */}
            <section className='mx-auto mt-2 p-6'>
                <Outlet />
            </section>

            <Footer />

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    )
}
