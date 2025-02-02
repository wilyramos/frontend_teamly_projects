import { Navigate, useLocation, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getTaskById } from '@/api/TaskAPI'
import EditTaskModal from './EditTaskModal'

export default function EditTaskData() {

    // Get the project id from the URL
    const params = useParams()
    const projectId = params.projectId! // Get the project id from the URL

    // Get the query parameters

    const location = useLocation()
    const queryparams = new URLSearchParams(location.search)

    const taskId = queryparams.get('editTask')!
    
    const { data, isError } = useQuery({
        queryKey: ['editTask', taskId],
        queryFn: () => getTaskById({projectId, taskId}),
        enabled: !!taskId // Only fetch the data if the taskId is present
    })

    if(isError) return <Navigate to={'/404'}/>

    if(data) return (
        <EditTaskModal data={data} taskId = {taskId}/>
    )
}
