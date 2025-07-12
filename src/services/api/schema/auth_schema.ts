export interface SignInRequest {
	username: string;
	password: string;
}

export interface SignUpRequest {
	username: string;
	email: string;
	password: string;
	avatar_url: string;
}

export interface RefreshTokenResponse {
	access_token: string;
	user_id: number;
	player_id: number;
}
