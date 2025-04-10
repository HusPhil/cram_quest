import { useQuery } from "@tanstack/react-query"
import getSubjects from "../services/api/crud/players/getSubjects"


export const useFetchQuest = (player_id: number) => {
    const questQuery = useQuery({
        queryKey: ["quests"],
        queryFn: () => getSubjects(player_id),
    })

    console.log("questQuery", questQuery)

    return questQuery
    
}