import { useFetchQuest } from '../../../hooks/useFetchQuest';
import { useAuth } from '../../../context/AuthContext';

export default function Quests() {
	const { data, isLoading, isError, error } = useFetchQuest(1);

	const { accessToken } = useAuth();

	if (isLoading) {
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
