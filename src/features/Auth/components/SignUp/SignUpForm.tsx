import { useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useSignUp from '../../hooks/useSignUp';
import SignUpStep1 from './SignUpStep1';
import SignUpStep2 from './SignUpStep2';

export default function SignUpForm() {
	const [emailInput, setEmailInput] = useState('');
	const [passwordInput, setPasswordInput] = useState('');
	const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

	const signUpMutate = useSignUp();

	const [signUpStep, setSignUpStep] = useState<number>(1);

	const avatarUrlRef = useRef<HTMLInputElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Handle sign-up logic (e.g., API call)
		setSignUpStep((prev) => prev + 1);
	};

	return (
		<form className="space-y-4 mt-5">
			{signUpStep === 1 && (
				<SignUpStep1
					setEmailInput={setEmailInput}
					setPasswordInput={setPasswordInput}
					setConfirmPasswordInput={setConfirmPasswordInput}
					handleSubmit={handleSubmit}
				/>
			)}

			{signUpStep == 2 && (
				<SignUpStep2
					setSignUpStep={setSignUpStep}
					avatarUrlRef={avatarUrlRef}
					usernameRef={usernameRef}
				/>
			)}
		</form>
	);
}
