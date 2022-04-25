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
  cursorText && setText(cursorText);
  return (
    <span
      className={`material-icons-sharp`}
      onMouseEnter={() =>
        hoverAnimation && setSize(cursorText ? "withText" : "big")
      }
      onMouseLeave={() => hoverAnimation && setSize("small")}
    >
      {iconName}
    </span>
  );
}
