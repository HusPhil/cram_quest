import React, { RefObject, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import SpriteSheet from '../../../../components/SpriteSheet';
import {
	playerAssets,
	PlayerClass,
	PlayerSkin,
} from '../../../Battle/configs/spritesheetConfig';

interface SignUpStep2Props {
	avatarUrlRef: RefObject<HTMLInputElement | null>;
	setSignUpStep: (step: number) => void;
	handleSubmit: (e: React.FormEvent) => void;
	isLoading: boolean;
}

export default function SignUpStep2({
	setSignUpStep,
	avatarUrlRef,
	handleSubmit,
	isLoading,
}: SignUpStep2Props) {
	const [selectedSkin, setSelectedSkin] = useState<PlayerSkin>('default_1');
	const defaultClass: PlayerClass = 'default';

	const availableSkins: string[] = Object.keys(playerAssets[defaultClass]);

	const handleSkinChange = (direction: 'prev' | 'next') => {
		const currentIndex = availableSkins.indexOf(selectedSkin);
		const max = availableSkins.length;
		const newIndex =
			direction === 'next'
				? (currentIndex + 1) % max
				: (currentIndex - 1 + max) % max;
		setSelectedSkin(availableSkins[newIndex] as PlayerSkin);
	};

	const handleGoBack = () => {
		setSignUpStep(1);
	};

	return (
		<>
			<div className="flex flex-col items-center space-y-5">
				{/* Character Preview */}
				<div
					className="flex items-center justify-center gap-4 border border-accent/30 
							  bg-background/50 p-4 rounded-lg w-full"
				>
					<button
						type="button"
						onClick={() => handleSkinChange('prev')}
						className="	hover:bg-background/20 p-2 rounded-full transition-colors"
					>
						<FaAngleLeft className="w-6 h-6" />
					</button>

					<div className="flex-shrink-0">
						<SpriteSheet
							src={
								playerAssets[defaultClass][
									selectedSkin
								] as string
							}
							frameWidth={48}
							frameHeight={48}
							frameCount={6}
							fps={8}
							scale={2.5}
							loop
							className="pixel-perfect"
						/>
					</div>

					<button
						type="button"
						onClick={() => handleSkinChange('next')}
						className="hover:bg-background/20 p-2 rounded-full transition-colors"
					>
						<FaAngleRight className="w-6 h-6" />
					</button>

					<input
						type="hidden"
						name="selectedSkin"
						ref={avatarUrlRef}
						value={`${defaultClass}/${selectedSkin}.png`}
					/>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col items-center space-y-2 w-full ">
					<button
						type="submit"
						onClick={handleSubmit}
						disabled={isLoading}
						className="w-full bg-accent/90 hover:bg-accent text-background py-3 
                                     rounded-lg font-bold transition-all relative group 
									 disabled:opacity-50 disabled:cursor-not-allowed
                                     overflow-hidden transform hover:scale-[1.02]"
					>
						<span className="relative z-10">Begin Adventure</span>
						<div
							className="absolute inset-0 bg-gradient-to-r from-accent 
                                          via-accent/80 to-accent opacity-0 
                                          group-hover:opacity-100 transition-opacity"
						/>
					</button>

					<button
						type="button"
						onClick={handleGoBack}
						className="text-accent/80 hover:text-accent text-sm 
                                     underline transition-colors"
					>
						Go back
					</button>
				</div>
			</div>
		</>
	);
}
