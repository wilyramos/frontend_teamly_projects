import { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addUserToProject } from "@/api/TeamAPI"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
// import { useNavigate } from "react-router-dom"

// type SearchResultProps = {
//     user: TeamMember,
//     reset: () => void
// }

type SearchResultsProps = {
    users: TeamMember[],
    reset: () => void
}

export default function SearchResult(  { users }: SearchResultsProps ) {
    // const navigate = useNavigate() // hook to navigate to another page for close the modal
    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            // reset()
            // navigate(location.pathname, { replace: true }) // replace the current URL
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})
        }
    })

    // const handleAddUserToProject = async () => {
    //     const data = {
    //         projectId, 
    //         id: user._id
    //     }
    //     mutate(data)
    // }

    const handleAddUserToProject = async (id: TeamMember['_id']) => {
        const data = {
            projectId, 
            id
        }
        console.log(data)
        mutate(data)
    }

    

    if (!users.length) {
        return (
            <p className="mt-10 text-center font-bold px-5">No se encontraron resultados</p>
        )
    }
    
    return (
    <>
        <p className="mt-10 text-center font-bold px-5">Resultado: </p>
        <div className="flex justify-between items-center">
            <ul className="w-full">
                {users.map((user) => (
                    <li key={user._id} className="flex items-center justify-between p-3 border-b border-gray-200">
                        <div>
                            <p className="text-base font-black ">{user.name}</p>
                            <p className="text-sm font-light">{user.email}</p>
                        </div>
                        <button
                            type="button"
                            className="text-sky-500 hover:text-sky-700 font-bold py-2 px-4 rounded cursor-pointer transition-colors"
                            onClick={() => handleAddUserToProject(user._id)}
                        >Agregar
                        </button>
                    </li>
                ))}
            </ul>
            
        </div>
    </>

    )
}
