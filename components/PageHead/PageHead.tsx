import Head from "next/head";
import PageData, { pageNames } from "../../pageData";

export interface IPageHeadProps {
  site: pageNames;
}

export function PageHead({ site }: IPageHeadProps) {
  const headInfo = PageData[site];
  console.log(
    "🚀 ~ file: PageHead.tsx ~ line 10 ~ PageHead ~ headInfo",
    headInfo
  );

  return (
    <Head key={site}>
      <title>{headInfo?.pageTitle}</title>
      <meta name="description" content={headInfo?.pageDescription} />
    </Head>
  );
}
