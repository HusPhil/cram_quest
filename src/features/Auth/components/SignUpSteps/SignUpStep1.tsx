import { RefObject, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InputFieldWithRef from '../../../../components/InputFieldWithRef';

interface SignUpStep1Props {
	usernameRef: RefObject<HTMLInputElement | null>;
	passwordRef: RefObject<HTMLInputElement | null>;
	confirmPasswordRef: RefObject<HTMLInputElement | null>;
	handleNextPage: (e: React.FormEvent) => void;
}

export default function SignUpStep1({
	usernameRef,
	passwordRef,
	confirmPasswordRef,
	handleNextPage,
}: SignUpStep1Props) {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	return (
		<>
			<div className="space-y-1  w-full">
				<div className="flex flex-1 items-center">
					<InputFieldWithRef
						label="Username"
						id="username"
						placeholder="CramWarrior"
						type="text"
						wrapperClassName="space-y-1 w-full"
						ref={usernameRef}
						required
					/>
				</div>
			</div>
			<div className="space-y-1  w-full">
				<div className="flex flex-1 items-center">
					<InputFieldWithRef
						label="Password"
						id="password"
						placeholder="sw0rdP@ssw0rd"
						type={showPassword ? 'text' : 'password'}
						wrapperClassName="space-y-1 w-full"
						ref={passwordRef}
						required
						button={
							<button
								type="button"
								tabIndex={-1}
								onClick={() => setShowPassword((prev) => !prev)}
								className="absolute top-1/2 right-3 -translate-y-1/2 text-text/50 hover:text-accent transition-colors"
							>
								{showPassword ? <FaEyeSlash /> : <FaEye />}
							</button>
						}
					/>
				</div>
			</div>

			<div className="space-y-1">
				<InputFieldWithRef
					label="Confirm Password"
					id="confirm-password"
					placeholder="sw0rdP@ssw0rd"
					type={showConfirmPassword ? 'text' : 'password'}
					wrapperClassName="space-y-1"
					ref={confirmPasswordRef}
					required
					button={
						<button
							type="button"
							tabIndex={-1}
							onClick={() =>
								setShowConfirmPassword((prev) => !prev)
							}
							className=" absolute top-1/2 right-3 -translate-y-1/2 text-text/50 hover:text-accent transition-colors"
						>
							{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
						</button>
					}
				/>
			</div>

			<button
				type="button"
				onClick={handleNextPage}
				className="w-full bg-accent/90 hover:bg-accent text-background py-3 rounded-lg font-bold transition-colors relative group overflow-hidden"
			>
				<span className="relative z-10">Create Character</span>
				<div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
			</button>
		</>
	);
}
