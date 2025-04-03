import { useEffect, useState } from "react";
import { ScreenSize, SCREEN_SIZES } from "../assets/screen/screen";

export const useScreenResize = () => {
    const getScreenSize = (): ScreenSize => {
        const width = window.innerWidth;
        if (width < SCREEN_SIZES.MEDIUM) return "SMALL";
        if (width < SCREEN_SIZES.LARGE) return "MEDIUM";
        return "LARGE";
    };

    const [currentScreenSize, setCurrentScreenSize] = useState<ScreenSize>(getScreenSize());

    useEffect(() => {
        const handleResize = () => {
            const newSize = getScreenSize();
            setCurrentScreenSize(newSize);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return currentScreenSize; // ✅ Return full value
};

export default useScreenResize;
