import Document, { Html, Main, NextScript, Head } from "next/document";
import { GOOGLE_FONTS_ARRAY } from "../lib/constants";

export interface IDocumentProps {
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {GOOGLE_FONTS_ARRAY.map((fontUrl) => {
            return <link href={fontUrl} rel="stylesheet" key={fontUrl} />
          })}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}