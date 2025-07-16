import React, { memo } from 'react';
import {
	PageTitle,
	PAGE_TITLES,
} from '../../screens/SubjectScreen/SubjectScreen';
import PageTab from './PageTab';

interface PageTabsProps {
	activeTab: PageTitle;
	setActiveTab: (pageTitle: PageTitle) => void;
	setCurrentPage: (pageComponent: React.ReactNode) => void;
	onPageChange: (pageTitle: PageTitle) => void;
}

export function PageTabs({ activeTab, onPageChange }: PageTabsProps) {
	return (
		<div className="flex justify-between items-center bg-danger/0 py-3 text-sm">
			{Object.entries(PAGE_TITLES).map(([key, value]) => (
				<PageTab
					key={key}
					isActive={activeTab === key}
					label={value}
					handlePageChange={onPageChange}
				/>
			))}
		</div>
	);
}

export default memo(PageTabs);
