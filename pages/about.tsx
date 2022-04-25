import { NextPage } from "next";
import { PageHead } from "../components/PageHead/PageHead";
import Layout from "../components/_Layout/Layout";

const AboutPage: NextPage = () => {
  return (
    <Layout>
      <PageHead site="about" />
      <div>About</div>
    </Layout>
  );
};

export default AboutPage;
