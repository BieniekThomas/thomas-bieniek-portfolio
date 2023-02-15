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

export interface IPageHeadPropsIndividual {
  keyName: string;
  pageTitle: string;
  pageDescription: string;
}

export const PageHeadIndividual = ({
  keyName,
  pageTitle,
  pageDescription,
}: IPageHeadPropsIndividual) => {
  return (
    <Head key={keyName}>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
    </Head>
  );
};
