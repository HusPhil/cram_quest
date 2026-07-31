import SpriteSheet from '../../../../components/SpriteSheet';

interface SpriteProps {
	characterAsset: string;
	frameCount: number;
	fps: number;
	row: number;
}

export default function BattleCalculatingLoader({
	sprite,
}: {
	sprite?: SpriteProps;
}) {
	return (
		<div className="w-full flex flex-col items-center">
			{sprite && (
				<SpriteSheet
					src={sprite.characterAsset}
					frameHeight={48}
					frameWidth={48}
					frameCount={sprite.frameCount}
					fps={sprite.fps}
					frameRow={sprite.row}
					scale={2.5}
					loop
				/>
			)}
			<p className="mt-3 opacity-50 text-white animate-pulse">
				Calculating results..
			</p>
		</div>
	);
}
