import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getFullProject } from '@/api/ProjectAPI'
import AddTaskModal from '@/components/tasks/AddTaskModal'
import TaskList from '@/components/tasks/TaskList'
import EditTaskData from '@/components/tasks/EditTaskData'
import TaskModalDetails from '@/components/tasks/TaskModalDetails'
import { useAuth } from '@/hooks/useAuth'
import { isManager } from '@/utils/policies'
import { useMemo } from 'react'

export default function ProjectDetailsView() {

    // para ver si es manager o no

    const { data: user, isLoading: authLoading } = useAuth()

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getFullProject(projectId),
        retry: false
    })

    const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

    if (isLoading && authLoading) return 'Cargando...'
    if (isError) return <Navigate to="/404" />


    if (data && user) return (
        <>
            <h1 className=' max-w-3xl mx-auto text-3xl font-black text-gray-800'>{data.projectName}</h1>

            <p className=' max-w-4xl mx-auto text-xl font-extralight text-gray-500'>{data.description}</p>

            {isManager(data.manager, user._id) && (
                <nav className='my-2 flex gap-2 font-semibold'>
                    <button
                        type="button"
                        className="flex items-center gap-2 px-2 border-2 border-blue-400 text-blue-600 rounded-xl hover:border-blue-600 transition duration-300 ease-in-out"
                        onClick={() => navigate(location.pathname + `?newTask=true`)}
                    >AGREGAR TAREA
                    </button>

                    <Link
                        to={'team'}
                        className="flex items-center gap-2 px-2 border-2 border-blue-400 text-blue-600 rounded-xl hover:border-blue-600 transition duration-300 ease-in-out"
                    >
                        COLABORADORES
                    </Link>
                </nav>
            )}

            <TaskList
                tasks={data.tasks}
                canEdit={canEdit}
            />
            <AddTaskModal />
            <EditTaskData />
            <TaskModalDetails />
        </>
    )
}
