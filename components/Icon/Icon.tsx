import { ICursorSizes, useCursorContext } from "../Cursor/CursorManager";

export interface IIconProps {
  hoverAnimation?: boolean;
  iconName: string;
  cursorText?: string;
  fallBackCursor?: ICursorSizes;
  fallBackCursorText?: string;
}

export function Icon({
  hoverAnimation = false,
  iconName,
  cursorText,
  fallBackCursor,
  fallBackCursorText,
}: IIconProps) {
  const { setSize, setText } = useCursorContext();

  const onHover = () => {
    setSize(cursorText ? "withText" : "big");
    cursorText && setText(cursorText);
  };

  const onLeave = () => {
    setSize(fallBackCursor ?? "small");
    setText(fallBackCursorText ?? "");
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
