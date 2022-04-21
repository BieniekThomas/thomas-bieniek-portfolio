import { createContext, FC, ReactElement, useContext, useState } from "react";

export type ICursorSizes = "small" | "big";

interface ContextState {
  size: ICursorSizes;
  setSize: (c: ICursorSizes) => void;
}

interface ICursorManager {
  children: ReactElement | ReactElement[];
}

export const CursorContext = createContext<ContextState>({
  size: "small", // set a default value
  setSize: () => {},
});

export const useCursorContext = () => useContext(CursorContext);

const CursorManager: FC<ICursorManager> = ({ children }) => {
  const [size, setSize] = useState<ContextState["size"]>("small");
  return (
    <CursorContext.Provider value={{ size, setSize }}>
      {children}
    </CursorContext.Provider>
  );
};

export default CursorManager;
