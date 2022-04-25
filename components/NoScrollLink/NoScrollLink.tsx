import Link from "next/link";
import { FC, ReactElement } from "react";
import { ICursorSizes, useCursorContext } from "../Cursor/CursorManager";

interface INoScrollLink {
  url: string;
  children: ReactElement | ReactElement[] | string;
  cursor?: ICursorSizes;
}

const NoScrollLink: FC<INoScrollLink> = ({ url, children, cursor = "big" }) => {
  const { setSize } = useCursorContext();
  return (
    <Link scroll={false} href={url} passHref>
      <div
        onMouseEnter={() => setSize(cursor)}
        onMouseLeave={() => setSize("small")}
      >
        {children}
      </div>
    </Link>
  );
};

export default NoScrollLink;
