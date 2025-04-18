interface ProfileBase {
	avatar_url: string;
	bio: string | undefined;
	mood: string | undefined;
}

export interface ProfileRead extends ProfileBase {
	id: number;
	playerId: number;
}
