// src/components/common/InputFieldWithRef.tsx
import { forwardRef, InputHTMLAttributes } from 'react';

interface InputFieldWithRefProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	id: string;
	wrapperClassName?: string;
}

const InputFieldWithRef = forwardRef<HTMLInputElement, InputFieldWithRefProps>(
	({ label, id, wrapperClassName = '', className = '', ...rest }, ref) => (
		<div className={`space-y-1 ${wrapperClassName}`}>
			<label htmlFor={id} className="text-sm text-text/70">
				{label}
			</label>
			<input
				ref={ref}
				id={id}
				aria-label={label}
				className={`w-full px-4 py-3 rounded bg-background/50 border border-accent/30 
					focus:border-accent/60 focus:outline-none transition-colors 
					placeholder:text-text/30 text-sm ${className}`}
				{...rest}
			/>
		</div>
	)
);

InputFieldWithRef.displayName = 'InputFieldWithRef';
export default InputFieldWithRef;
