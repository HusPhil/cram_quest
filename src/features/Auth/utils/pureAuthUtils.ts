import { toast } from 'react-toastify';

// ✅ Pure helper — safe to keep outside
export const passwordsMatch = (password: string, confirmPassword: string) =>
	password === confirmPassword;

export const hasRequiredFields = (fields: string[]) =>
	fields.every((val) => val.trim().length > 0);

export const showError = (message: string, id: string) => {
	toast.error(message, { toastId: id });
};

export const handleMutationError = (err: any) => {
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
		showError('Failed to sign up: ' + err.message, 'sign-up-error-generic');
	}
};
