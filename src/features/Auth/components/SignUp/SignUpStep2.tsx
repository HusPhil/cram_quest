import React, {
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import CornerDecoration from '../../../../components/CornerDecoration';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import SpriteSheet from '../../../../components/SpriteSheet';
import {
	playerAssets,
	PlayerClass,
} from '../../../Battle/configs/spritesheetConfig';

interface SignUpStep2Props {
	avatarUrlRef: RefObject<HTMLInputElement | null>;
	usernameRef: RefObject<HTMLInputElement | null>;
	setSignUpStep: (step: number) => void;
}

export default function SignUpStep2({
	setSignUpStep,
	usernameRef,
	avatarUrlRef,
}: SignUpStep2Props) {
	const [selectedSkin, setSelectedSkin] = useState<string>('default_1');
	const defaultClass: PlayerClass = 'default';

	const availableSkins: string[] = Object.keys(playerAssets[defaultClass]);

	const handleSkinChange = (direction: 'prev' | 'next') => {
		const currentIndex = availableSkins.indexOf(selectedSkin);
		const max = availableSkins.length;
		const newIndex =
			direction === 'next'
				? (currentIndex + 1) % max
				: (currentIndex - 1 + max) % max;
		setSelectedSkin(availableSkins[newIndex]);
	};

	const handleGoBack = () => {
		console.log('go back');
		setSignUpStep(1);
	};

	return (
		<>
			<div className="relative flex flex-col items-center lg:p-16">
				{/* Sprite navigation */}
				<div className="flex items-center gap-4 bg-secondary my-6 px-4 py-2 rounded-lg">
					<button
						type="button"
						onClick={() => handleSkinChange('prev')}
					>
						<FaAngleLeft className="w-7 h-7" />
					</button>
					<SpriteSheet
						src={playerAssets[defaultClass][selectedSkin]}
						frameWidth={48}
						frameHeight={48}
						frameCount={6}
						fps={8}
						scale={2.5}
						loop
						className="pixel-perfect"
					/>
					<button
						type="button"
						onClick={() => handleSkinChange('next')}
					>
						<FaAngleRight className="w-7 h-7" />
					</button>
					<input
						type="hidden"
						name="selectedSkin"
						ref={avatarUrlRef}
						value={`${defaultClass}/${selectedSkin}.png`}
					/>
				</div>

				{/* Name input */}
				<div className="w-full px-5 space-y-1 ">
					<label className="text-sm text-text/70 flex items-center gap-2">
						<span className="w-1 h-1 bg-accent/50 rounded-full" />
						Username
					</label>
					<input
						type="text"
						ref={usernameRef}
						placeholder="Enter your hero's name"
						className={`w-full px-3 py-2 rounded bg-background/50 border transition-colors text-sm
                  placeholder:text-text/30 focus:outline-none`}
					/>
				</div>

				{/* CTA */}
				<button
					className={`mt-5 w-full py-3 rounded-lg font-bold text-sm transition-all relative group `}
				>
					<span className="relative">Begin Your Adventure</span>
				</button>

				<small
					className="text-accent underline pt-2"
					onClick={handleGoBack}
				>
					Go back
				</small>
			</div>
		</>
	);
}
