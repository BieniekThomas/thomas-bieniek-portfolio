import { GetStaticProps } from "next";
import { FC } from "react";
import Layout from "../../components/Layout";

interface IPhoto {}

export const getStaticProps: GetStaticProps = async ({}) => {
  return {
    props: {}
  }
}

const Photo: FC<IPhoto> = () => {
  return (
    <Layout>
      <div>Photo goes here</div>
    </Layout>
  )
}

export default Photo;