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
  key: string;
  pageTitle: string;
  pageDescription: string;
}

export const PageHeadIndividual = ({
  key,
  pageTitle,
  pageDescription,
}: IPageHeadPropsIndividual) => {
  return (
    <Head key={key}>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
    </Head>
  );
};
