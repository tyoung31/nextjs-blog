import Layout from "../../components/layout";
import Comments from "../../components/comments";
import { getAllHikeIds, getHikeData } from "../../lib/hikes";
import Head from "next/head";

export const getStaticProps = async ({ params }) => {
  const hikeData = await getHikeData(params.id);
  return {
    props: {
      hikeData,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllHikeIds();
  return {
    paths,
    fallback: false,
  };
};

export default function Hike({ hikeData }) {
  const imageURL = "/images/" + hikeData.id + ".jpeg";
  console.log(imageURL);
  return (
    <Layout>
      <Head>
        <title>{hikeData.title}</title>
      </Head>

      <img src={imageURL}></img>
      <br />
      <div>{hikeData.title}</div>
      <p>Distance: {hikeData.distance} miles</p>

      <div dangerouslySetInnerHTML={{ __html: hikeData.contentHtml }} />
      <Comments post_id={hikeData.id}></Comments>
    </Layout>
  );
}
