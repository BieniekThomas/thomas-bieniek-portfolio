import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const options = {
  renderMark: {
    [MARKS.BOLD]: (text: string) => <b>{text}</b>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_: any, children: string) => <p>{children}</p>,
  },
};

const Text = ({ text }: any) => {
  return documentToReactComponents(text, options);
};

export default Text;
