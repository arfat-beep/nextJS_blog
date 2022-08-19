import React from "react";
import Head from "next/head";
import { getPosts, getPostDetails } from "../../services";
import {
  PostDetail,
  Categories,
  PostWidget,
  Author,
  Comments,
  CommentsForm,
  Loader,
} from "../../components";
import { useRouter } from "next/router";
const PostDetails = ({ post }) => {
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
        <title>ArfatBlog || {post.title}</title>
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
            <PostDetail post={post} />
            <Author author={post.author} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-8">
              <PostWidget
                slug={post.slug}
                categories={post.categories.map((cateroty) => cateroty.slug)}
              />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetails;

export const getStaticProps = async ({ params }) => {
  const data = await getPostDetails(params.slug);
  const posts = (await getPosts()) || [];
  return {
    props: { post: data },
  };
};
export async function getStaticPaths() {
  const posts = await getPosts();
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  };
}
