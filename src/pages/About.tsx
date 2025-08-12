export default function About() {
	return (
		<div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 py-12 text-gray-300">
			<div className="w-full max-w-4xl rounded-lg border border-gray-700 bg-secondary p-8 shadow-lg md:p-12">
				<h1 className="mb-3 text-center font-rpg text-4xl font-bold text-accent">
					Welcome to CramQuest!
				</h1>

				<p className="mb-6 text-center text-lg leading-relaxed">
					A simple app for helping you Gamify your Tasks!
				</p>
				<p className="mb-6 text-justify text-lg leading-relaxed">
					<span className="text-center text-accent">
						Please don't hesitate to reach out with any thoughts or
						bug reports!{' '}
					</span>
					This is still an early release and your feedback are vital
					to us as we work to add more features and refine the
					gameplay.
				</p>

				<div className="text-end">
					<p className="text-sm text-gray-500">
						&copy; 2025 CramQuest. All rights reserved.
					</p>
					<p className="mt-2 text-sm text-gray-500">
						Created by:{' '}
						<a
							href="https://github.com/HusPhil"
							target="_blank"
							className="font-semibold text-accent transition-colors hover:text-white"
						>
							HusPhil
						</a>
					</p>
					<p className="mt-4 text-sm text-gray-500">
						For concerns or feedbacks, please email me at{' '}
						<a
							href="mailto:mymail.com"
							className="font-semibold text-accent transition-colors hover:text-white"
						>
							cramquest0705@gmail.com
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
