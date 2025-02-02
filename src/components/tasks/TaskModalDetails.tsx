import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/utils';
import { statusTranslations } from '@/locales/es';
import { TaskStatus } from '@/types/index';
import NotesPanel from '../notes/NotesPanel';

// TaskModalDetails component
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

export default function TaskModalDetails() {


    // Get the project id from the URL
    const params = useParams()
    const projectId = params.projectId!
    const navigate = useNavigate() // hook to navigate to another page, close the modal
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const taskId = queryParams.get('viewTask')!

    const show = taskId ? true : false

    const { data, isError, error } = useQuery({
        queryKey: ['task', taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId,
        retry: false
    })

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {

            toast.success(data)
            queryClient.invalidateQueries({ queryKey: ['project', projectId] })
            queryClient.invalidateQueries({ queryKey: ['task', taskId] })
        }
    })

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const status = e.target.value as TaskStatus
        const data = { projectId, taskId, status: status }
        mutate(data)
    }

    useEffect(() => {
        if (isError) {
            toast.error(error.message, { toastId: "error" }) // show an error message if the task is not found or there is an error
            return navigate(`/projects/${projectId}`)
        }
    }, [isError])

    if (data) return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-3xl bg-white text-left align-middle shadow-2xl transition-all p-8">
                                    <p className='text-xs text-gray-500 mb-2'>Agregada el: {formatDate(data.createdAt)}</p>
                                    <p className='text-xs text-gray-500 mb-4'>Última actualización: {formatDate(data.updatedAt)}</p>

                                    <Dialog.Title as="h3" className="text-4xl font-extrabold my-4 text-sky-500 hover:text-sky-600 transition-all">
                                        {data.name}
                                    </Dialog.Title>

                                    <p className='text-md text-gray-600 mb-4'>Descripción: {data.description}</p>

                                    {data.completedBy.length ? (
                                        <>
                                            <p className='font-bold text-xl text-gray-700 mb-2'>Historial de cambios:</p>
                                            <div className="relative border-l-2 border-gray-200 ml-6 space-y-2"> {/* Línea de tiempo */}
                                                {data.completedBy.map((activityLog) => (
                                                    <div key={activityLog._id} className="relative pl-10">
                                                        <span className="absolute top-0 -left-5 flex items-center justify-center h-6 w-6 rounded-full bg-white ring-8 ring-white">
                                                            {activityLog.status === 'completed' ? (
                                                                <FaCheckCircle className="text-green-500 w-6 h-6" />  // Icono para 'completed'
                                                            ) : (
                                                                <FaExclamationCircle className="text-yellow-500 w-6 h-6" />  // Icono para 'incomplete' u otros estados
                                                            )}
                                                        </span>
                                                        <div className="text-sm font-semibold text-gray-700">
                                                            {statusTranslations[activityLog.status]}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            Realizado por: {activityLog.user.name}
                                                            <span className="mx-2">|</span>
                                                            <span className="text-gray-400">{formatDate(activityLog.completedAt)}</span>
                                                        </div>                                      
                                                        
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : null}

                                    <div className='my-6 space-y-3'>
                                        <label className='block text-lg font-semibold text-gray-800'>
                                            Estado Actual: {data.status}
                                        </label>

                                        <select
                                            className='w-full p-3 bg-gray-50 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition'
                                            defaultValue={data.status}
                                            onChange={handleChange}
                                        >
                                            {Object.entries(statusTranslations).map(([key, value]) => (
                                                <option key={key} value={key}>
                                                    {value}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <NotesPanel notes={data.notes} />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}