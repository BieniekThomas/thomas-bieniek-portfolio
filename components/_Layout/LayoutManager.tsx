import { createContext, FC, ReactElement, useContext } from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";

interface ContextState {
  width: number;
  height: number;
}

interface ICursorManager {
  children: ReactElement | ReactElement[];
}

export const LayoutContext = createContext<ContextState>({
  width: 1920, // set a default value
  height: 1080,
});

export const useLayoutManagerContext = () => useContext(LayoutContext);

const LayoutManager: FC<ICursorManager> = ({ children }) => {
  const { width, height } = useWindowDimensions();
  return (
    <LayoutContext.Provider
      value={{ width: width ?? 1920, height: height ?? 1080 }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutManager;
