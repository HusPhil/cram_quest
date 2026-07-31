import { TbBackpack } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();
  return (
    <div className="flex w-full h-full flex-col items-center justify-center bg-background px-5 py-12 text-gray-300">
      <div className="w-full max-w-4xl max-h-[70dvh] rounded-lg border border-white/10 bg-secondary py-5 px-8 shadow-lg md:p-12 ">
        <h1 className="mb-3 text-center font-rpg text-2xl md:text-3xl font-bold text-accent">
          Welcome to CramQuest!
        </h1>
        <p className="md:mb-2 text-center leading-relaxed break-words">
          {"< Let's Gamify your Tasks >"}
        </p>{" "}
        <br />
        <p className="mb-3 leading-relaxed text-sm md:text-base">
          <span className="text-center text-accent">
            Please don't hesitate to reach out with any thoughts or bug
            reports!{" "}
          </span>
          This is still an early release and your feedbacks are important to us
          as we work to add more features and refine the gameplay.
        </p>
        <p className="mb-6 leading-relaxed text-sm md:text-base">
          Connect with us at{" "}
          <a
            href="mailto:cramquest0705@gmail.com"
            className="font-semibold text-accent transition-colors hover:text-white"
          >
            cramquest0705@gmail.com
          </a>
          {". "}
          Thank you!
        </p>
        <div className="text-end">
          <p className="mt-2 text-sm text-gray-500">
            Created by:{" "}
            <a
              href="https://github.com/HusPhil"
              target="_blank"
              className="font-semibold text-accent transition-colors hover:text-white"
            >
              HusPhil
            </a>
          </p>
          <p className="text-sm text-gray-500">
            &copy; 2025 CramQuest. All rights reserved.
          </p>
        </div>
      </div>
      <button
        type="button"
        className="flex items-center justify-center py-2 gap-3 px-5 bg-accent rounded-md mt-7 text-background animate-bounce"
        onClick={() => navigate("/home/check-in")}
      >
        <TbBackpack className="w-5 h-5" />
        <p>Start your Journey</p>
        <TbBackpack className="w-5 h-5" />
      </button>
    </div>
  );
}
