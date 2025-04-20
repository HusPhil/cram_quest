// components/GiIcon.tsx
import * as GiIcons from 'react-icons/gi';
import { ComponentProps } from 'react';

type GiIconProps = {
	name: string;
} & ComponentProps<'svg'>;

const NamedGiIcon = ({ name, ...props }: GiIconProps) => {
	const iconName = 'Gi' + name.charAt(0).toUpperCase() + name.slice(1);
	const IconComponent = GiIcons[iconName as keyof typeof GiIcons];

	if (!IconComponent) {
		console.warn(`Icon "${iconName}" not found in react-icons/gi`);
		return null;
	}

	return <IconComponent {...props} />;
};

export default NamedGiIcon;
