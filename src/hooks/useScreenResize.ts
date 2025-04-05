import { useEffect, useState } from "react";
import { ScreenSize, SCREEN_SIZES } from "../data/screen";

type HeightSize = "SHORT" | "MEDIUM" | "TALL";

const getScreenSize = (): ScreenSize => {
    const width = window.innerWidth;
    if (width < SCREEN_SIZES.MEDIUM) return "SMALL";
    if (width < SCREEN_SIZES.LARGE) return "MEDIUM";
    return "LARGE";
};

const getHeightCategory = (): HeightSize => {
    const height = window.innerHeight;
    if (height < 600) return "SHORT";
    if (height < 900) return "MEDIUM";
    return "TALL";
};

export const useScreenResize = () => {
    const [dimensions, setDimensions] = useState({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        currentScreenSize: getScreenSize(),
        currentHeightSize: getHeightCategory(),
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
                currentScreenSize: getScreenSize(),
                currentHeightSize: getHeightCategory(),
            });
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return dimensions;
};

export default useScreenResize;
