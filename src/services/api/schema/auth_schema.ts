export interface SignInSchema {
	username: string;
	password: string;
}

export interface SignUpSchema {
	username: string;
	email: string;
	password: string;
	avatar_url: string;
}
