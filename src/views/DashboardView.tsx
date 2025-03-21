import { Link, useLocation, useNavigate } from "react-router-dom"
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { useQuery } from "@tanstack/react-query"
import { getProjects } from "@/api/ProjectAPI"
import { useAuth } from "@/hooks/useAuth"
import DeleteProjectModal from "@/components/projects/DeleteProjectModal"

import { SpinnerDiamond } from 'spinners-react'

// Importar íconos de react-icons
import { FaUserTie, FaEdit, FaTrashAlt, FaEye, FaProjectDiagram } from 'react-icons/fa'
import { BiDetail } from 'react-icons/bi'

export default function DashboardView() {

    const location = useLocation()
    const navigate = useNavigate()
    const { data: user, isLoading: authLoading } = useAuth()
    const { data, isLoading } = useQuery({
        queryKey: ['projects'], // key for the query
        queryFn: getProjects
    })


    if (isLoading && authLoading) return <SpinnerDiamond />

    if (data && user) return (
        <>
            <h1 className="text-3xl font-black text-gray-700">Mis proyectos</h1>
            <p className="text-gray-500">Listado de tus proyectos</p>

            <nav className="my-5 flex justify-end">
                <Link
                    className="bg-indigo-500 text-white font-semibold py-2 px-6 rounded-2xl hover:bg-indigo-600 transition duration-300 ease-in-out"
                    to={'/create'}
                >Nuevo Proyecto
                </Link>
            </nav>

            {isLoading ? <SpinnerDiamond /> : null}

            {data.length ? (
                <ul role="list" className="divide-y divide-gray-100 border border-gray-100 mt-2 bg-white shadow-lg rounded-xl ">
                    {data.map((project) => (
                        <li key={project._id} className="flex justify-between gap-x-2 px-5 py-1 border-b">
                            <div className="flex min-w-0 gap-x-4">
                                <div className="min-w-0 flex-auto space-y-2">
                                    <div className="flex items-center">
                                        {project.manager === user._id ?
                                            <span className="flex items-center gap-2 text-indigo-500 font-bold text-xs uppercase border-indigo-500 border rounded-lg py-1 px-5">
                                                Admin
                                            </span> :
                                            <span className="flex items-center gap-2 text-orange-600 font-bold text-xs uppercase">
                                                Colaborador
                                            </span>
                                        }
                                    </div>
                                    <Link to={`/projects/${project._id}`}
                                        className="text-sky-500 cursor-pointer font-semibold hover:text-sky-600 flex items-center gap-2"
                                    >
                                        <FaProjectDiagram /> {project.projectName}
                                    </Link>

                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <FaUserTie /> Cliente: {project.clientName}
                                    </p>

                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <BiDetail /> {project.description}
                                    </p>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-x-6">
                                <Menu as="div" className="relative flex-none">
                                    <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                        <span className="sr-only">opciones</span>
                                        <EllipsisVerticalIcon className="h-9 w-9" aria-hidden="true" />
                                    </Menu.Button>

                                    <Transition as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <Menu.Item>
                                                <Link to={`/projects/${project._id}`}
                                                    className='flex items-center gap-2 px-3 py-1 text-sm leading-6 text-gray-900'>
                                                    <FaEye /> Ver Proyecto
                                                </Link>
                                            </Menu.Item>

                                            {project.manager === user._id && (
                                                <>
                                                    <Menu.Item>
                                                        <Link to={`/projects/${project._id}/edit`}
                                                            className='flex items-center gap-2 px-3 py-1 text-sm leading-6 text-gray-900'>
                                                            <FaEdit /> Editar Proyecto
                                                        </Link>
                                                    </Menu.Item>

                                                    <Menu.Item>
                                                        <button
                                                            type='button'
                                                            className='flex items-center gap-2 px-3 py-1 text-sm leading-6 text-red-500'
                                                            onClick={() => navigate(location.pathname + `?deleteProject=${project._id}`)}
                                                        >
                                                            <FaTrashAlt /> Eliminar Proyecto
                                                        </button>
                                                    </Menu.Item>
                                                </>
                                            )}
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center py-20"> No hay proyectos {' '}
                    <Link to={'/create'} className="text-blue-500 font-semibold">Crear Proyecto</Link>
                </p>
            )}

            <DeleteProjectModal />
        </>
    )
}