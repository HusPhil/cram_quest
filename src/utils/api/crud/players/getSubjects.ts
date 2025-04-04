import { BASE_URL } from "../../../../data/api";
import fetcher from "../../fetcher";


export const getSubjects = async () => {
    const response = await fetcher(`${BASE_URL}/players/1/subjects`);

    console.log(response)

    if (!response.ok) {
        throw new Error("Failed to fetch subjects");
    }

    return response.json();
}

export default getSubjects;