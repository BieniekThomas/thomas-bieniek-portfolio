import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const Bold = ({ children }) => <b>{children}</b>;
const NormalText = ({ children }) => <p>{children}</p>;

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <NormalText>{children}</NormalText>
    ),
  },
};

const Text = ({ text }) => {
  return documentToReactComponents(text, options);
};

export default Text;
