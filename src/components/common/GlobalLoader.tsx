import { IsTrue } from "@/service/helper";
import { useState, useCallback } from "react";

// Packages
import { Hourglass } from "react-loader-spinner";

/**
 * Custom Hook for Global Loader
 * @returns {showLoader: () => void, hideLoader: () => void, Loader: () => JSX.Element}
 */
const useLoader = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showLoader = useCallback(() => {
    setIsVisible(true);
  }, []);

  const hideLoader = useCallback(() => {
    setIsVisible(false);
  }, []);

  const Loader = () => (
    <>
      {IsTrue(isVisible, false) && (
        <div className="absolute w-full flex items-start h-full z-[9999] justify-center backdrop-blur-sm">
          <Hourglass
            visible={isVisible}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass="relative top-1/2"
            colors={["black", "lightgreen"]}
          />
        </div>
      )}
    </>
  );

  return { showLoader, hideLoader, Loader };
};

export default useLoader;
