import { useEffect, useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import useSignUp from '../../hooks/useSignUp';
import SignUpStep1 from './SignUpStep1';
import SignUpStep2 from './SignUpStep2';

export default function SignUpForm() {
	const signUpMutate = useSignUp();

	const [signUpStep, setSignUpStep] = useState<number>(1);

	const usernameRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

	const avatarUrlRef = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Handle sign-up logic (e.g., API call)
		// alert(
		// 	`username: ${usernameRef.current?.value}\nemail: ${emailRef.current?.value}\npassword: ${passwordRef.current?.value}\navatarUrl: ${avatarUrlRef.current?.value}`
		// );

		if (
			!usernameRef.current ||
			!emailRef.current ||
			!passwordRef.current ||
			!avatarUrlRef.current
		) {
			alert('Invalid inputs!');
			return;
		}

		signUpMutate.mutate({
			username: usernameRef.current?.value,
			email: emailRef.current?.value,
			password: passwordRef.current?.value,
			avatar_url: avatarUrlRef.current?.value,
		});
	};

	const handleNextStep = () => {
		setSignUpStep(2);
	};

	return (
		<form className="">
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
