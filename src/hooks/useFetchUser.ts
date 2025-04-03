import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { BASE_URL } from "../data/api";


export const useFetchUser = (userId: number) => {
    const { data, error, isLoading, mutate } = useSWR(`/users/${userId}`, fetcher);    

    return {
        user: data,
        isLoading,
        isError: error,
        mutate
    }
}

export default useFetchUser