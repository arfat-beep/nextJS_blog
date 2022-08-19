import React from "react";
import { useRouter } from "next/router";

import { getCategories, getCategoryPost } from "../../services";
import { PostCard, Categories, Loader } from "../../components";
import Head from "next/head";

const CategoryPost = ({ posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          href="https://i.ibb.co/6r1vGnG/arfat-xyz-tab-logo.jpg"
        />
        <title>ArfatBlog || Categories</title>
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
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            {posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CategoryPost;

// Fetch data at build time
export async function getStaticProps({ params }) {
  const posts = await getCategoryPost(params.slug);

  return {
    props: { posts },
  };
}

// Specify dynamic routes to pre-render pages based on data.
// The HTML is generated at build time and will be reused on each request.
export async function getStaticPaths() {
  const categories = await getCategories();
  return {
    paths: categories.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
