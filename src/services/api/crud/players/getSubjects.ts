import { BASE_URL } from "../../../../data/api";
import { fetcher } from "../../fetcher";


export const getSubjects = async (player_id: number) => {
    const response = await fetcher(`${BASE_URL}/players/${player_id}/subjects`);

    console.log("GetSubects: ", response.headers);

    if (response.status !== 200) {
        throw new Error("Failed to fetch subjects");
    }
    
    return response.data;
}

export default getSubjects;