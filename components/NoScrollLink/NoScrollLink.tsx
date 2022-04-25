import Link from "next/link";
import { FC, ReactElement } from "react";
import { ICursorSizes, useCursorContext } from "../Cursor/CursorManager";
import styles from "./Link.module.scss";

interface INoScrollLink {
  url: string;
  children: ReactElement | ReactElement[] | string;
  cursor?: ICursorSizes;
  blendMode?: boolean;
  noStyling?: boolean;
}

const NoScrollLink: FC<INoScrollLink> = ({
  url,
  children,
  cursor = "big",
  blendMode = false,
  noStyling = false,
}) => {
  const { setSize } = useCursorContext();
  return (
    <Link scroll={false} href={url} passHref>
      <div
        className={`
          ${noStyling ?? styles.link} 
          ${blendMode ?? styles.blendMode}
        `}
        onMouseEnter={() => setSize(cursor)}
        onMouseLeave={() => setSize("small")}
      >
        {children}
      </div>
    </Link>
  );
};

export default NoScrollLink;
