import Link from "next/link";
import { FC, ReactElement } from "react";

interface INoScrollLink {
  url: string;
  children: ReactElement;
}

const NoScrollLink: FC<INoScrollLink> = ({ url, children }) => {
  const triggerHoverAnimation = () => {
    return;
  };

  return (
    <Link scroll={false} href={url}>
      {children}
    </Link>
  );
};

export default NoScrollLink;
