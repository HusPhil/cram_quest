import { useState, useEffect } from 'react';
import { IconType } from 'react-icons';

// Updated interface to support custom display names
interface IconLibraryConfig {
	icons: Record<string, IconType>;
	displayName: string; // Display name for the category
}

interface IconPickerProps {
	onSelect: (iconName: string) => void;
	iconLibraries: Record<string, Record<string, IconType> | IconLibraryConfig>;
	maxIconsToShow?: number;
	initialSelectedIcon?: string;
}

export const IconPicker = ({
	onSelect,
	iconLibraries = {},
	maxIconsToShow = 100,
	initialSelectedIcon = '',
}: IconPickerProps) => {
	const [search, setSearch] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [selectedIcon, setSelectedIcon] = useState(initialSelectedIcon);
	const [showTooltip, setShowTooltip] = useState(false);

	// Process the iconLibraries to normalize structure
	const normalizedLibraries = Object.entries(iconLibraries).reduce(
		(acc, [libId, value]) => {
			// Check if the value has a displayName property (is an IconLibraryConfig)
			if (
				value &&
				typeof value === 'object' &&
				'icons' in value &&
				'displayName' in value
			) {
				// It's already in the correct format
				acc[libId] = {
					icons: typeof value.icons === 'object' ? value.icons : {},
					displayName: value.displayName as string,
				};
			} else {
				// It's the old format, use the libId as the displayName
				// but replace "Icons" suffix with nothing for better display
				acc[libId] = {
					icons: value as Record<string, IconType>,
					displayName: libId.replace(/Icons$/, ''),
				};
			}
			return acc;
		},
		{} as Record<
			string,
			{ icons: Record<string, IconType>; displayName: string }
		>
	);

	// Process all icons from provided libraries
	const iconsByLibrary = Object.entries(normalizedLibraries).reduce(
		(acc, [libId, { icons }]) => {
			acc[libId] = Object.entries(icons).map(([name, Icon]) => ({
				name,
				Icon,
				libId,
			}));
			return acc;
		},
		{} as Record<
			string,
			Array<{ name: string; Icon: IconType; libId: string }>
		>
	);

	// Get all available categories (library IDs)
	const categories = ['all', ...Object.keys(normalizedLibraries)];

	// Map of library id to display name for UI
	const categoryDisplayNames: Record<string, string> = {
		all: 'All Categories',
		...Object.entries(normalizedLibraries).reduce(
			(acc, [libId, { displayName }]) => {
				acc[libId] = displayName;
				return acc;
			},
			{} as Record<string, string>
		),
	};

	// Get filtered icons based on search and category
	const filteredIcons = Object.entries(iconsByLibrary).flatMap(
		([libId, icons]) => {
			if (selectedCategory !== 'all' && selectedCategory !== libId) {
				return [];
			}

			return icons.filter(({ name }) =>
				name.toLowerCase().includes(search.toLowerCase())
			);
		}
	);

	// Handle icon selection
	const handleIconSelect = (name: string) => {
		setSelectedIcon(name);
		onSelect(name);

		// Show confirmation tooltip briefly
		setShowTooltip(true);
		setTimeout(() => setShowTooltip(false), 1500);
	};

	// Reset search when category changes
	useEffect(() => {
		setSearch('');
	}, [selectedCategory]);

	return (
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
			{/* Search and filters bar */}
			<div className="p-4 border-b border-gray-200 dark:border-gray-700">
				<div className="flex flex-col md:flex-row gap-3">
					{/* Search input */}
					<div className="relative flex-grow">
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<svg
								className="w-4 h-4 text-gray-500 dark:text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								></path>
							</svg>
						</div>
						<input
							type="text"
							className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white"
							placeholder="Search icons..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							aria-label="Search icons"
						/>
						{search && (
							<button
								onClick={() => setSearch('')}
								className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
								aria-label="Clear search"
							>
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									></path>
								</svg>
							</button>
						)}
					</div>

					{/* Category selector */}
					<div className="flex-shrink-0 w-full md:w-40">
						<select
							className="w-full py-2 px-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:text-white"
							value={selectedCategory}
							onChange={(e) =>
								setSelectedCategory(e.target.value)
							}
							aria-label="Filter by icon category"
						>
							{categories.map((category) => (
								<option key={category} value={category}>
									{categoryDisplayNames[category]}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>

			{/* Icons display area */}
			<div className="relative">
				{/* No results message */}
				{filteredIcons.length === 0 && (
					<div className="p-8 text-center text-gray-500 dark:text-gray-400">
						No icons found. Try a different search term or category.
					</div>
				)}

				{/* Icons grid */}
				<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 p-4 max-h-64 overflow-y-auto">
					{filteredIcons
						.slice(0, maxIconsToShow)
						.map(({ name, Icon, libId }) => {
							// Get the display name for the icon's library
							const libraryName =
								normalizedLibraries[libId]?.displayName ||
								libId;

							return (
								<button
									key={`${libId}-${name}`}
									onClick={() => handleIconSelect(name)}
									className={`flex flex-col items-center justify-center p-3 rounded-lg transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
										selectedIcon === name
											? 'bg-blue-100 dark:bg-blue-900 ring-2 ring-blue-500'
											: 'bg-white dark:bg-gray-800'
									}`}
									title={`${name} (${libraryName})`}
									aria-label={`Select icon: ${name} from ${libraryName}`}
									aria-pressed={selectedIcon === name}
								>
									<div className="w-8 h-8 flex items-center justify-center mb-2">
										<Icon
											className={`w-full h-full ${
												selectedIcon === name
													? 'text-blue-600 dark:text-blue-400'
													: 'text-gray-700 dark:text-gray-300'
											}`}
										/>
									</div>
									<span className="text-xs text-center truncate w-full max-w-full">
										{name.replace(/^(Fa|Gi)/, '')}
									</span>
									<span className="text-xs text-gray-500 dark:text-gray-400 truncate w-full max-w-full">
										{libraryName}
									</span>
								</button>
							);
						})}
				</div>

				{/* Results count */}
				<div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
					Showing {Math.min(filteredIcons.length, maxIconsToShow)} of{' '}
					{filteredIcons.length} icons
				</div>

				{/* Selection tooltip */}
				{showTooltip && selectedIcon && (
					<div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow-lg text-sm">
						{selectedIcon.replace(/^(Fa|Gi)/, '')}
					</div>
				)}
			</div>
		</div>
	);
};
