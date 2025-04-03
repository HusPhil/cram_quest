import { useFetchQuest } from '../../../hooks/useFetchQuest';
import useFetchUser from '../../../hooks/useFetchUser';
import useScreenResize from '../../../hooks/useScreenResize';
import { getAuthToken } from '../../../utils/fetcher';

const mockQuestData = [
  // mock data
];

export default function Quests() {
  const currentScreenSize = useScreenResize();
  const { user, isError: userError, isLoading: userLoading, mutate } = useFetchUser(7);
  const { quest, isError: questError, isLoading: questLoading } = useFetchQuest(17);

  if (userLoading || questLoading) return <p>Loading...</p>;
  
  // Improved error handling
  if (userError) return <p>Error loading user data: {userError.message || 'Unknown error'}</p>;
  if (questError) return <p>Error loading quest data: {questError.message || 'Unknown error'}</p>;

  return (
    <div>
      <h2>Quest</h2>
      <p>{user.id}</p>
      <p>{user.username}</p>
      <p>{user.email}</p>

      {/* Display quest details if valid */}
      {!questError && quest?.id && (
        <>
          <p>{quest.id}</p>
          <p>{quest.subject_id}</p>
          <p>{quest.description}</p>
          <p>{quest.difficulty}</p>
          <p>{quest.status}</p>
          <p>{quest.created_at}</p>
        </>
      )}

      {/* Optional: render mock data */}
      {/* {mockQuestData.map(({ id, code_name, description }) => (
        <div key={id} className="border p-2 rounded-md mb-2">
          <p className="font-bold">{code_name}</p>
          <p className="text-gray-500">{description}</p>
        </div>
      ))} */}
    </div>
  );
}
