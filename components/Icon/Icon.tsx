import { useEffect } from "react";
import { useCursorContext } from "../Cursor/CursorManager";
import { useRouter } from "next/router";

export interface IIconProps {
  hoverAnimation?: boolean;
  iconName: string;
  cursorText?: string;
}

export function Icon({
  hoverAnimation = false,
  iconName,
  cursorText,
}: IIconProps) {
  const { setSize, setText } = useCursorContext();
  const router = useRouter();

  const onLeave = () => {
    setSize("small");
    setText("");
  };

  useEffect(() => {
    onLeave()
  }, [router.asPath])

  const onHover = () => {
    setSize(cursorText ? "withText" : "big");
    if(cursorText) setText(cursorText);
  };

  

  return (
    <span
      className={`material-icons-sharp`}
      onMouseEnter={() => hoverAnimation && onHover()}
      onMouseLeave={() => hoverAnimation && onLeave()}
    >
      {iconName}
    </span>
  );
}
