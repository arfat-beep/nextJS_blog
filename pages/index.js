import Head from "next/head";
import Image from "next/image";
import { getPosts } from "../services";
import { PostCard, Categories, PostWidget } from "../components";
import { FeaturedPosts } from "../sections/index";
const Home = ({ posts }) => {
  return (
    <div className="container mx-auto px-10 mb-8">
      <Head>
        <link
          rel="apple-touch-icon"
          href="https://i.ibb.co/6r1vGnG/arfat-xyz-tab-logo.jpg"
        />
        <title>ArfatBlog || Home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="I'm a professional React front-end developer. I have experience working on basic HTML,CSS,JavaScript and React. I've also experience on creating WordPress website."
        />
        <meta
          property="og:image"
          content="https://i.ibb.co/stc2Ppn/arfat-xyz.jpg"
        />
        <meta
          property="og:image:secure_url"
          content="https://i.ibb.co/stc2Ppn/arfat-xyz.jpg"
        />

        <meta name="author" content="Arfatur Rahman" />
        <meta
          name="keywords"
          content="HTML, CSS, Display, personal portfolio, react,ReactJs,MERN, arafat,araftur rahman, arfat rahman, Metadata"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <FeaturedPosts />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 col-span-1">
          {posts.map((post, index) => (
            <PostCard post={post.node} key={index} />
          ))}
        </div>
        <div className="lg:col-span-4 col-span-1">
          <div className="lg:sticky relative top-8">
            <PostWidget />
            <Categories />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const posts = (await getPosts()) || [];
  return {
    props: { posts },
  };
};
