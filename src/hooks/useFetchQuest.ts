import { useQuery, useMutation } from "@tanstack/react-query";

async function getQuests() {
    const response = await fetch("/api/quest");
    
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    return response.json();
}

export const useFetchQuest = () => {
  const questQuery = useQuery({
    queryKey: ["quests"],
    queryFn: getQuests,
  });
}