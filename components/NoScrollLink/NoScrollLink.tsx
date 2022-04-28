import Link from "next/link";
import { FC, ReactElement } from "react";
import { ICursorSizes, useCursorContext } from "../Cursor/CursorManager";
import styles from "./Link.module.scss";

interface INoScrollLink {
  url?: string;
  children: ReactElement | ReactElement[] | string;
  cursor?: ICursorSizes;
  cursorText?: string;
  blendMode?: boolean;
  noStyling?: boolean;
  noLink?: boolean;
  onClick?: () => void;
}

const NoScrollLink: FC<INoScrollLink> = ({
  url = "/",
  children,
  cursor = "big",
  cursorText,
  blendMode = false,
  noStyling = false,
  noLink = false,
  onClick,
}) => {
  const { setSize, setText } = useCursorContext();

  const onEnter = () => {
    setSize(cursor);
    cursorText && setText(cursorText);
  };

  const onLeave = () => {
    setSize("small");
    setText("");
  };

  const Inner = () => (
    <div
      className={`
          ${noStyling ?? styles.link} 
          ${blendMode ?? styles.blendMode}
        `}
      onMouseEnter={() => onEnter()}
      onMouseLeave={() => onLeave()}
      onClick={() => onClick?.()}
    >
      {children}
    </div>
  );

  return !noLink ? (
    <Link scroll={false} href={url} passHref>
      {Inner()}
    </Link>
  ) : (
    Inner()
  );
};

export default NoScrollLink;
