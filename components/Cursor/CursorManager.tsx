import { createContext, FC, ReactElement, useContext, useState } from "react";

export type ICursorSizes = "small" | "big" | "image" | "withText" | "drag";

interface ContextState {
  size: ICursorSizes;
  text: string;
  setSize: (c: ICursorSizes) => void;
  setText: (c: string) => void;
}

interface ICursorManager {
  children: ReactElement | ReactElement[];
}

export const CursorContext = createContext<ContextState>({
  size: "small", // set a default value
  text: "",
  setSize: () => {},
  setText: () => {},
});

export const useCursorContext = () => useContext(CursorContext);

const CursorManager: FC<ICursorManager> = ({ children }) => {
  const [size, setSize] = useState<ContextState["size"]>("small");
  const [text, setText] = useState<string>("");
  return (
    <CursorContext.Provider value={{ size, text, setSize, setText }}>
      {children}
    </CursorContext.Provider>
  );
};

export default CursorManager;
