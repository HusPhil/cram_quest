import { useRef, useState } from 'react';
import useSignUp from '../hooks/useSignUp';
import SignUpStep1 from './SignUpSteps/SignUpStep1';
import SignUpStep2 from './SignUpSteps/SignUpStep2';
import { toast } from 'react-toastify';
import { useAuthLayoutStore } from '../store/authLayoutStore';

export default function SignUpForm() {
	const signUpMutate = useSignUp();

	const [signUpStep, setSignUpStep] = useState<number>(1);
	const setActiveTab = useAuthLayoutStore((state) => state.setActiveTab);

	const usernameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

	const avatarUrlRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (signUpStep === 1) {
			setSignUpStep(2);
			return;
		}

		if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
			toast.error('Passwords do not match!', {
				toastId: 'passwords-do-not-match',
			});
			return;
		}

		if (
			!usernameRef.current ||
			!emailRef.current ||
			!passwordRef.current ||
			!avatarUrlRef.current
		) {
			alert('Invalid inputs!');
			return;
		}

		signUpMutate.mutate(
			{
				username: usernameRef.current?.value,
				email: emailRef.current?.value,
				password: passwordRef.current?.value,
				avatar_url: avatarUrlRef.current?.value,
			},
			{
				onSuccess: () => {
					toast.success('Sign up success!', {
						toastId: 'sign-up-success',
					});
					setActiveTab('signIn');
				},
				onError: (err: any) => {
					const details = err?.response?.data?.detail;

					if (Array.isArray(details)) {
						details.forEach((issue: any, index: number) => {
							const field =
								Array.isArray(issue.loc) && issue.loc.length > 1
									? issue.loc[1]
									: 'field';
							const message = `${field}: ${issue.msg}`;

							toast.error(message, {
								toastId: `sign-up-error-${field}-${index}`,
							});
						});
					} else if (details) {
						toast.error(details, {
							toastId: 'sign-up-error-generic',
						});
					} else {
						toast.error('Failed to sign up: ' + err.message, {
							toastId: 'sign-up-error-generic',
						});
					}
				},
			}
		);
	};

	const handleNextStep = () => {
		if (
			!emailRef.current?.value.trim() ||
			!passwordRef.current?.value.trim()
		) {
			toast.error('Email and password are required!', {
				toastId: 'invalid-inputs',
			});
			return;
		}
		if (
			passwordRef.current?.value.trim() !==
			confirmPasswordRef.current?.value.trim()
		) {
			toast.error('Passwords do not match!', {
				toastId: 'passwords-do-not-match',
			});
			return;
		}
		setSignUpStep(2);
	};

	return (
		<form>
			<div
				className={`space-y-5 mt-5 ${
					signUpStep == 1 ? 'block' : 'hidden'
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
					signUpStep == 2 ? 'block' : 'hidden'
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
