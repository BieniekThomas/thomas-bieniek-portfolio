import { useCursorContext } from "../Cursor/CursorManager";

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

  const onHover = () => {
    setSize(cursorText ? "withText" : "big");
    if(cursorText) setText(cursorText);
  };

  const onLeave = () => {
    setSize("small");
    setText("");
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
