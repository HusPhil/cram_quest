import Auth from '../features/Auth/Auth';

export type FormValidationResult = { valid: boolean; message: string };

export default function Authentication() {
	return <Auth />;
}
