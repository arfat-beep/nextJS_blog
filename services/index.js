import { request, gql } from "graphql-request";

const grahqlAPI = process?.env?.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
export const getRecentPosts = async () => {
  // if error make it MyQuery =
  const query = gql`
    query GetPostDetails() {
      posts(orderBy: createdAt_ASC, last: 2) {
        title
        featureImage {
          url
        }
        createdAt
        slug
      }
    }
  `;
  const result = await request(grahqlAPI, query);

  return result.posts;
};

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featureImage {
              url
            }
            categories {
              slug
              name
            }
          }
        }
      }
    }
  `;
  const result = await request(grahqlAPI, query);
  return result.postsConnection.edges;
};
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: { slug: $slug }) {
        title
        excerpt
        featureImage {
          url
        }
        author {
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(grahqlAPI, query, { slug });

  return result.post;
};

export const getSimilarPosts = async (categories, slug) => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]) {
      posts(
        where: {
          slug_not: $slug
          AND: { categories_some: { slug_in: $categories } }
        }
        last: 3
      ) {
        title
        featureImage {
          url
        }
        createdAt
        slug
      }
    }
  `;

  const result = await request(grahqlAPI, query, { categories, slug });
  return result.posts;
};
export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        slug
      }
    }
  `;
  const result = await request(grahqlAPI, query);
  return result.categories;
};

export const submitComment = async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
};
export const getComments = async (slug) => {
  const query = gql`
    query getComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        name
        createdAt
        comment
      }
    }
  `;
  const result = await request(grahqlAPI, query, { slug });
  return result.comments;
};
export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featureImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(grahqlAPI, query);

  return result.posts;
};
export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: { categories_some: { slug: $slug } }) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featureImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(grahqlAPI, query, { slug });

  return result.postsConnection.edges;
};
