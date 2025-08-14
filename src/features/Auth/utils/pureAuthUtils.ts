import { isAxiosError } from 'axios';
import { limitChars } from '../../../utils/limitCharacters';
import { toast } from '../../../lib/toastify/charLimitedToast';

// ✅ Pure helper — safe to keep outside
export const passwordsMatch = (password: string, confirmPassword: string) =>
	password === confirmPassword;

export const hasRequiredFields = (fields: string[]) =>
	fields.every((val) => val.trim().length > 0);

export const showError = (message: string, id: string) => {
	toast.error(limitChars(message), { toastId: id });
};

export const handleMutationError = (err: Error) => {
	if (!isAxiosError(err)) {
		toast.error('An error occured', { toastId: 'sign-up-error-generic' });
		return;
	}

	const details = err?.response?.data?.detail;

	if (Array.isArray(details)) {
		details.forEach((issue: any, index: number) => {
			const field =
				Array.isArray(issue.loc) && issue.loc.length > 1
					? issue.loc[1]
					: 'field';
			const message = `${field}: ${issue.msg}`;

			showError(message, `sign-up-error-${field}-${index}`);
		});
	} else if (details) {
		showError(details, 'sign-up-error-generic');
	} else {
		showError(err.message, 'sign-up-error-generic');
	}
};
