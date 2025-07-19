import { useRef, useState } from 'react';
import useSignUp from '../hooks/useSignUp';
import SignUpStep1 from './SignUpSteps/SignUpStep1';
import SignUpStep2 from './SignUpSteps/SignUpStep2';
import { toast } from 'react-toastify';
import { useAuthStore_UI } from '../stores/authStore_UI';
import {
	passwordsMatch,
	showError,
	hasRequiredFields,
	handleMutationError,
} from '../utils/pureAuthUtils';

export default function SignUpForm() {
	const signUpMutate = useSignUp();

	const [signUpStep, setSignUpStep] = useState<number>(1);
	const setActiveTab = useAuthStore_UI((state) => state.setActiveTab);

	const usernameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);
	const avatarUrlRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const username = usernameRef.current?.value || '';
		const email = emailRef.current?.value || '';
		const password = passwordRef.current?.value || '';
		const confirmPassword = confirmPasswordRef.current?.value || '';
		const avatarUrl = avatarUrlRef.current?.value || '';

		if (signUpStep === 1) {
			setSignUpStep(2);
			return;
		}

		if (!passwordsMatch(password, confirmPassword)) {
			showError('Passwords do not match!', 'passwords-do-not-match');
			return;
		}

		if (!hasRequiredFields([username, email, password, avatarUrl])) {
			showError('Please fill in all required fields.', 'invalid-inputs');
			return;
		}

		signUpMutate.mutate(
			{
				username: username.trim(),
				email: email.trim(),
				password: password,
				avatar_url: avatarUrl.trim(),
			},
			{
				onSuccess: () => {
					toast.success('Sign up success!', {
						toastId: 'sign-up-success',
					});
					setActiveTab('signIn');
				},
				onError: handleMutationError,
			}
		);
	};

	const handleNextStep = () => {
		const email = emailRef.current?.value || '';
		const password = passwordRef.current?.value || '';
		const confirmPassword = confirmPasswordRef.current?.value || '';

		if (!hasRequiredFields([email, password])) {
			showError('Email and password are required!', 'invalid-inputs');
			return;
		}

		if (!passwordsMatch(password, confirmPassword)) {
			showError('Passwords do not match!', 'passwords-do-not-match');
			return;
		}

		setSignUpStep(2);
	};

	return (
		<form>
			<div
				className={`space-y-5 mt-5 ${
					signUpStep === 1 ? 'block' : 'hidden'
				}`}
			>
				<SignUpStep1
					emailRef={emailRef}
					passwordRef={passwordRef}
					confirmPasswordRef={confirmPasswordRef}
					handleNextPage={handleNextStep}
				/>
			</div>

			<div
				className={`space-y-5 mt-5 ${
					signUpStep === 2 ? 'block' : 'hidden'
				}`}
			>
				<SignUpStep2
					setSignUpStep={setSignUpStep}
					avatarUrlRef={avatarUrlRef}
					usernameRef={usernameRef}
					handleSubmit={handleSubmit}
				/>
			</div>
		</form>
	);
}
