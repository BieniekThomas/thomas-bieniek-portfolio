import { createContext, FC, ReactElement, useContext } from "react";
import { useWindowSize } from "react-use";

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
  const { width, height } = useWindowSize(1920, 1080);
  console.log("from manager", width, height);
  return (
    <LayoutContext.Provider value={{ width, height }}>
      {children}
    </LayoutContext.Provider>
  );
};

export default LayoutManager;
