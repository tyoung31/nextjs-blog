import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Link from "next/link";
import Date from "../components/date";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi! I'm Travis, a web-development specialist who loves React. When I'm
          not coding I love skiing (poorly), hiking and digging into a good
          book. My biggest claim to fame is building Job Step Viewer, a
          visualization tool designed for Summit, the world's most powerful
          supercomputer.
        </p>

        <p>
          To read more about job step viewer check out
          <br />
          <a href="https://www.olcf.ornl.gov/2020/03/27/new-job-step-viewer-tool-captures-job-launching-on-summit/">
            https://www.olcf.ornl.gov/2020/03/27/new-job-step-viewer-tool-captures-job-launching-on-summit/
          </a>
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
