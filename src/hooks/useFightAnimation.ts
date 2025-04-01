import { useState, useEffect } from 'react';

function useFightAnimation() {
  const [skeletonState, setSkeletonState] = useState("idle");
  const [orcState, setOrcState] = useState("idle");
  const [skeletonPosition, setSkeletonPosition] = useState(0);
  const [orcPosition, setOrcPosition] = useState(0);

  useEffect(() => {
    const fightLoop = () => {
      setSkeletonState("attack");
      setTimeout(() => {
        setOrcState("hurt");
        setOrcPosition(15);
        setTimeout(() => {
          setOrcPosition(0);
          setOrcState("attack");
          setSkeletonState("idle");
          setTimeout(() => {
            setSkeletonState("hurt");
            setSkeletonPosition(-15);
            setTimeout(() => {
              setSkeletonState("idle");
              setSkeletonPosition(0);
              setOrcState("idle");
              setTimeout(fightLoop, 1000);
            }, 600);
          }, 400);
        }, 600);
      }, 400);
    };

    fightLoop();
  }, []);

  return {
    skeletonState,
    orcState,
    skeletonPosition,
    orcPosition,
  };
}

export default useFightAnimation;