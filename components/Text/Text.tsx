import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

const options: Options = {
  renderMark: {
    [MARKS.BOLD]: (text) => <b>{text}</b>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_, children) => <p>{children}</p>,
    [INLINES.HYPERLINK]: (node, children) => {
      if (node.data.uri.includes("https://")) {
        return (
          <a target="_blank" rel="noopener noreferrer" href={node.data.uri}>
            {children}
          </a>
        );
      }

      return (
        <a target="_self" rel="noopener noreferrer" href={node.data.uri}>
          {children}
        </a>
      );
    },
  },
};
interface IText {
  text: Document | undefined;
}
const Text = ({ text }: IText) => {
  if (!text) return;
  return documentToReactComponents(text, options);
};

export default Text;
