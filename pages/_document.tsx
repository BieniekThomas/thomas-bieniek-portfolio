import Document, { Html, Main, NextScript, Head } from "next/document";
import { ICON_FONT } from "../lib/constants";
export interface IDocumentProps {}

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link href={ICON_FONT} rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
