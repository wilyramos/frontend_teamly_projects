import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams} from 'react-router-dom';
import TaskForm from './TaskForm';
import { useForm } from 'react-hook-form';
import { TaskFormData } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

export default function AddTaskModal() {

    const navigate = useNavigate()

    // Get the query params
    const location = useLocation()
    const queryparams = new URLSearchParams(location.search)
    const modalTask = queryparams.get('newTask')
    const show = modalTask ? true : false

    /** GET THE PROJECT ID */
     const params = useParams()
     const projectId = params.projectId!
     
    // Manage form

    const initialValues : TaskFormData = {
        name: '',
        description: '',
    }

    const { register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues})

    // para recargar la pagina
    const queryClient = useQueryClient()

    // Mutation to create a task
    const { mutate } = useMutation ({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
            toast.success(data) // show a success message
            reset() // reset the form
            navigate(location.pathname, {replace: true}) // close the modal
        }
    })

    const handleCreateTask = (formData: TaskFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
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
                                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-8">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-2xl"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="">Llena el formulario y crea  {''}
                                        <span className="text-sky-500">una tarea</span>
                                    </p>
                                    <form
                                        className='mt-4 space-y-3'
                                        onSubmit={handleSubmit(handleCreateTask)}
                                        noValidate

                                    >
                                        <TaskForm 
                                            register={register}
                                            errors={errors}
                                        />

                                        <input
                                            type='submit'
                                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg'
                                            value='Crear Tarea'

                                        >
                                        </input>
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}