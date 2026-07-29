import { useRef } from 'react';
import { useSignIn } from '../hooks/useSignIn';
import InputFieldWithRef from '../../../components/InputFieldWithRef';
import { isAxiosError } from 'axios';
import { toast } from '../../../lib/toastify/charLimitedToast';

export default function SignInForm() {
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const { mutate, isPending } = useSignIn();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const username = usernameRef.current?.value.trim() || '';
		const password = passwordRef.current?.value || '';

		mutate(
			{ username, password },
			{
				onError: (error: Error) => {
					if (isAxiosError(error)) {
					toast.error(error.response?.data?.detail, {
							toastId: 'sign-in-user-error',
						});
					}
				},
				onSuccess: () => {
					toast.success('Login success!', {
						toastId: 'sign-in-user-success',
					});
				},
			}
		);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4 mt-5">
			<InputFieldWithRef
				ref={usernameRef}
				id="username"
				label="Username"
				type="text"
				placeholder="CramWarrior"
				autoComplete="username"
				required
			/>

			<InputFieldWithRef
				ref={passwordRef}
				id="password"
				label="Password"
				type="password"
				placeholder="sw0rdP@ssw0rd"
				required
			/>

			<button
				type="submit"
				disabled={isPending}
				className={`w-full py-3 rounded-lg font-bold transition-colors relative group overflow-hidden
					bg-accent/90 text-background hover:bg-accent
					${isPending ? 'animate-pulse' : ''}
					disabled:bg-accent/30 disabled:hover:bg-accent/30
					disabled:text-white/70 disabled:cursor-not-allowed`}
			>
				<span className="relative z-10">Begin Quest</span>
				<div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent opacity-0 group-hover:opacity-100 transition-opacity group-disabled:opacity-0" />
			</button>
		</form>
	);
}
