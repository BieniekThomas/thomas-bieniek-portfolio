import Head from "next/head";
import PageData, { pageNames } from "../../pageData";

export interface IPageHeadProps {
  site: pageNames;
}

export function PageHead({ site }: IPageHeadProps) {
  const headInfo = PageData[site];
  return (
    <Head key={site}>
      <title>{headInfo?.pageTitle}</title>
      <meta name="description" content={headInfo?.pageDescription} />
    </Head>
  );
}
