import React, { useState, useMemo, useRef } from "react";
import RpgCard from "../components/RpgCard";
import RankTitle from "../components/RankTitle";
import SpriteSheet from "../components/SpriteSheet";
import { PlayerClass, playerAssets } from "../features/Battle/configs/animations/animationConfig";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const skinDisplayNames: Record<string, string> = {
  default_1: "Adventurous Spirit",
  default_2: "Determined Scholar",
  default_3: "Mystical Wanderer",
};

export default function CharacterCreation() {
  const [characterName, setCharacterName] = useState("");
  const [selectedSkin, setSelectedSkin] = useState<string>("default_1");

  const defaultClassRef = useRef<PlayerClass>("default");

  const availableSkinsRef = useRef<string[]>(
    Object.keys(playerAssets[defaultClassRef.current])
  );

  const getSkinDisplayNameRef = useRef((skin: string) => {
    return skinDisplayNames[skin] || skin;
  });

  const handleSkinChange = (direction: "prev" | "next") => {
    const currentIndex = availableSkinsRef.current.indexOf(selectedSkin);
    const max = availableSkinsRef.current.length;
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % max
        : (currentIndex - 1 + max) % max;
    setSelectedSkin(availableSkinsRef.current[newIndex]);
  };

  const isNameValid = useMemo(() => characterName.trim().length > 0, [characterName]);

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      
      <div className="relative flex flex-col items-center p-16 ">
      
      <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-accent/20" />
      <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-accent/20" />
      <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-accent/20" />
      <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-accent/20" />
      
      <h1 className="text-xl font-bold text-accent w-full text-center">Create Your Hero!</h1>

      {/* Sprite navigation */}
      <div className="flex items-center gap-4 bg-secondary">
          <button
            onClick={() => handleSkinChange("prev")}
          >
            <FaAngleLeft className="w-7 h-7"/>
          </button>
          <div className="relative">
            <SpriteSheet
              src={playerAssets[defaultClassRef.current][selectedSkin]}
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
            onClick={() => handleSkinChange("next")}
          >
            <FaAngleRight className="w-7 h-7" />
          </button>
          
        </div>


      {/* Name input */}
      <div className="space-y-1">
        <label className="text-sm text-text/70 flex items-center gap-2">
          <span className="w-1 h-1 bg-accent/50 rounded-full" />
          Username
        </label>
        <input
          type="text"
          value={characterName}
          onChange={(e) => setCharacterName(e.target.value)}
          placeholder="Enter your hero's name"
          className="w-full px-3 py-2 rounded bg-background/50 border border-accent/30 focus:border-accent/60 focus:outline-none transition-colors placeholder:text-text/30 text-sm relative"
        />
      </div>


      {/* CTA */}
      <button
        disabled={!isNameValid}
        className={`mt-5 w-full py-3 rounded-lg font-bold text-sm transition-all relative group ${
          isNameValid
            ? "bg-accent text-background hover:bg-accent/90"
            : "bg-text/20 text-text/50 cursor-not-allowed"
        }`}
      >
        {isNameValid && (
          <div className="absolute inset-0 bg-accent/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
        <span className="relative">Begin Your Adventure</span>
      </button> 
      </div>
        
    </div>
  );
}
