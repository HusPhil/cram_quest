import { PlayerRead } from './player_schema';
import { ProfileRead } from './profile_schema';
import { UserRead } from './user_schema';

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
	user_session_info: UserRead;
	player_session_info: PlayerRead;
	profile_session_info: ProfileRead;
}
