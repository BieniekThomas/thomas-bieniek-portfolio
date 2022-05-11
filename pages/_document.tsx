import Document, { Html, Main, NextScript, Head } from "next/document";
import { GOOGLE_FONTS_ARRAY } from "../lib/constants";

export interface IDocumentProps {}

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons+Sharp&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
