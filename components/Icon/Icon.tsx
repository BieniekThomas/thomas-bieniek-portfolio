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
      onMouseEnter={() => setSize("big")}
      onMouseLeave={() => setSize("small")}
    >
      {iconName}
    </span>
  );
}
