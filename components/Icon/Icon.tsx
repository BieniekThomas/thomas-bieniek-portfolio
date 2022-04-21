import { useCursorContext } from "../Cursor/CursorManager";

export interface IIconProps {
  hoverAnimation?: boolean;
  iconName: string;
}

export function Icon({ hoverAnimation = false, iconName }: IIconProps) {
  const { setSize } = useCursorContext();
  return (
    <span
      className={`material-icons-sharp`}
      onMouseEnter={() => hoverAnimation && setSize("big")}
      onMouseLeave={() => hoverAnimation && setSize("small")}
    >
      {iconName}
    </span>
  );
}
