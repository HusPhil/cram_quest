import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import colors from '../../data/colors';

export default function LoadingSkeleton(props: SkeletonProps) {
	return (
		<Skeleton
			baseColor={colors.secondary} // background color (matches background)
			highlightColor={colors.background} // shimmer highlight
			{...props}
		/>
	);
}
