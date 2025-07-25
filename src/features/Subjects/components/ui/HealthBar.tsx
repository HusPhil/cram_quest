import React from 'react';

export default function HealthBar({
	health,
	maxHealth,
}: {
	health: number;
	maxHealth: number;
}) {
	return (
		<div>
			{health}/{maxHealth}
		</div>
	);
}
