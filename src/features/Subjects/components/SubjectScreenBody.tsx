import { lazy, memo, Suspense, useEffect } from 'react';
import { PAGE_TITLES, PageTitle } from '../screens/SubjectScreen/SubjectScreen';
import Tabs from '../../../components/Tabs';

const LearningPage = lazy(
	() => import('../screens/SubjectScreen/Tabs/LearningPage')
);

const QuestsPage = lazy(
	() => import('../screens/SubjectScreen/Tabs/QuestsPage')
);

interface SubjectScreenBodyProps {
	subjectId: number;
	subjectCodeName: string;
	subjectDifficulty: number;
	subjectDescription: string;
	activeTab: PageTitle;
	setActiveTab: (pageTitle: PageTitle) => void;
	setCurrentPage: (pageComponent: React.ReactNode) => void;
}

export function SubjectScreenBody({
	subjectId,
	activeTab,
	subjectDifficulty,
	setActiveTab,
}: SubjectScreenBodyProps) {
	const CurrentPage = ({ activeTab }: { activeTab: PageTitle }) => {
		switch (activeTab) {
			case PAGE_TITLES.LEARNING:
				return (
					<Suspense fallback={<p>Loading learning page...</p>}>
						<LearningPage
							subjectId={subjectId}
							subjectDifficulty={subjectDifficulty}
						/>
					</Suspense>
				);
			case PAGE_TITLES.QUESTS:
				return (
					<Suspense fallback={<p>Loading quest page...</p>}>
						<QuestsPage subjectId={subjectId} />
					</Suspense>
				);
			default:
				return <p>404 Not Found</p>;
		}
	};

	useEffect(() => {
		setActiveTab(PAGE_TITLES.QUESTS);
	}, [subjectId]);

	return (
		<>
			<div className="flex flex-col h-full max-h-full">
				{/* Tabs stay fixed */}
				{/* <Tabs
					activeTab={activeTab}
					setActiveTab={setActiveTab}
					tabs={[
						{
							label: PAGE_TITLES.QUESTS,
							value: PAGE_TITLES.QUESTS,
						},
						{
							label: PAGE_TITLES.LEARNING,
							value: PAGE_TITLES.LEARNING,
						},
					]}
					className="my-2 text-sm"
					activeClassName="font-bold border-accent text-accent"
				/> */}

				{/* Scrollable page content */}
				<div className="flex-1 min-h-0 overflow-auto no-scrollbar">
					<CurrentPage activeTab={activeTab} />
				</div>
			</div>
		</>
	);
}

export default memo(SubjectScreenBody);
