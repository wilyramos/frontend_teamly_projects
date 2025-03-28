import { NoteFormData } from "@/types/index"
import { useForm } from "react-hook-form"
import ErrorMessage from "../ErrorMessage"
import { createNote } from "@/api/NoteAPI"
import { toast } from "react-toastify"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useLocation, useParams } from "react-router-dom"


export default function AddNoteForm() {
    

    const params = useParams()

    const location = useLocation()

    const queryParams = new URLSearchParams(location.search)

    const projectId = params.projectId!
    const taskId= queryParams.get('viewTask')!

    const initialValues : NoteFormData = {
        content: ''
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues})
    
    const queryClient = useQueryClient()

    const { mutate } = useMutation({

        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['task', taskId]})
        },

    })


    const handleAddNote = (formData: NoteFormData) => {
        mutate({projectId, taskId, formData})
        reset()
    }

    return (

        <form
            onSubmit={handleSubmit(handleAddNote)}
            className="space-y-3"
            noValidate
        >
            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="content">Crear Nota</label>
                <input
                    id="content"
                    type="text"
                    placeholder="Contenido de la nota"
                    className="w-full p-3 border border-gray-300 rounded-xl"
                    {...register('content', { required: 'El contenido es requerido' })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>
            <input
                type="submit"
                value='Crear nota'
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >

            </input>
        </form>
    )
}
