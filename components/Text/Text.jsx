import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <b>{text}</b>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => <p>{children}</p>,
  },
};

const Text = ({ text }) => {
  return documentToReactComponents(text, options);
};

export default Text;
