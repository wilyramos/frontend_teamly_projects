import { useQuery} from '@tanstack/react-query'
import { getUser } from "@/api/AuthAPI";


// Custom hook to get the user data from the server and handle the loading and error states
export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false, // Number of retries before failing
        refetchOnWindowFocus: false
    })

    return { data, isError, isLoading }
}