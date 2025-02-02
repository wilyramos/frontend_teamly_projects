import { deleteNote } from "@/api/NoteAPI"
import { useAuth } from "@/hooks/useAuth"
import { Note } from "@/types/index"
import { formatDate } from "@/utils/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"
import { useLocation, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type NoteDetailProps = {
    note: Note
}

export default function NoteDetail({ note }: NoteDetailProps) {

    const {data, isLoading} = useAuth()

    const canDelete = useMemo(() =>  
        data?._id === note.createBy._id, [data]
    ) // Si el usuario es el creador de la nota, puede eliminarla 
    // en caso data cambie, se vuelve a ejecutar el useMemo
    const params = useParams()
    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)

    const projectId = params.projectId!
    const taskId = queryParams.get('viewTask')!

    const queryClient = useQueryClient() // invalidar el query y que el mutate aparezca en tiempo real 1

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => toast.error(error.message),
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['task', taskId]}) // INVALIDADR QUERY 2
        }
    })

    if(isLoading){
        return <p>Cargando...</p>
    }

    return (
        <div className="p-1 flex justify-between items-center">
            {/* Mostrar contenido de la nota y el autor */}
            <div>
                <p>
                    {note.content} por <span className="font-bold">{note.createBy.name}</span>
                </p>
                <p className="text-xs text-slate-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>

            {/* Mostrar botón de eliminar solo si el usuario tiene permisos */}
            {canDelete && (
                <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => mutate({ projectId, taskId, noteId: note._id })}
                >
                    Eliminar
                </button>
            )}
        </div>
    )
}