import { ButtonHTMLAttributes } from "react";

type PixelButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode;
};

const PixelButton = ({ children, className = "", ...props }: PixelButtonProps) => {
	return (
		<button
			{...props}
			className={`
                relative
                px-5 
				font-mono 
				text-white 
				bg-indigo-600
				hover:bg-indigo-500 
				active:translate-y-1 
				active:shadow-none 
				font-bold 
				py-3
				text-center 
				tracking-wide 
				border-0
				shadow-[0_4px_0_0_#4338ca] 
				[image-rendering:pixelated]
				before:absolute before:inset-0 
				before:border-2 before:border-indigo-300
				before:content-[''] 
				before:border-b-0 before:border-r-0
				after:absolute after:inset-0 
				after:border-2 after:border-indigo-900
				after:content-[''] 
				after:border-t-0 after:border-l-0
				rounded
				${className}`}
		>
			{children}
		</button>
	);
};

export default PixelButton;