interface UserBase {
	username: string;
	email: string;
}

export interface UserRead extends UserBase {
	id: number;
}
