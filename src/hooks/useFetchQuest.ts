import useSWR from 'swr';
import { BASE_URL } from '../data/api';
import fetcher from '../utils/fetcher';

export const useFetchQuest = (questId: number) => {
    const { data, error, isLoading, mutate } = useSWR(`/quests/${questId}`, fetcher);

    return {
        quest: data,
        isLoading,
        isError: error,
        mutate
    }
}
