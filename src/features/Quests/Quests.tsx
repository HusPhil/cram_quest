import { useGetPlayerSubjects } from '../Subjects/hooks/useGetPlayerSubjects';
import { useAuth } from '../../context/AuthContext';
import { useGetUserPlayer } from '../CheckIn/hooks/useGetUserPlayer';

export default function Quests() {
	const { currentUserId } = useAuth();

	const { data: player, isLoading: playerIsLoading } = useGetUserPlayer(
		currentUserId || -1
	);

	const { data, isLoading, isError, error } = useGetPlayerSubjects(
		player?.id
	);

	const { accessToken } = useAuth();

	if (isLoading || playerIsLoading) {
		return (
			<div>
				<h1>{accessToken}</h1>
				Loading...
			</div>
		);
	}

	if (isError) {
		return <div>{`${error}`}</div>;
	}

	return (
		<>
			<div>Quests</div>

			<div className="flex flex-col gap-2">
				{data.map((subject: any) => (
					<div
						key={subject.id}
						className="p-4 bg-gray-200 rounded-md"
					>
						<p>{subject.code_name}</p>
					</div>
				))}
			</div>
		</>
	);
}
