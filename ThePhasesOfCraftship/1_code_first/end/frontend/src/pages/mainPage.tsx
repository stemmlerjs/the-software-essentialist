
import React, { useState } from "react";
import { Layout } from "../components/layout";
import { PostsList } from "../components/postsList";
import { PostsViewSwitcher } from "../components/postsViewSwitcher";

const createRelativeDateString = (daysAgo: number) => {
  let baseDate = new Date();
  return "2 days ago";
};

export const MainPage = () => {
  return (
    <Layout>
      <PostsViewSwitcher />
      <PostsList
        posts={[
          {
            title: "Domain Services vs. application services",
            dateCreated: createRelativeDateString(2),
            memberPostedBy: "stemmlerjs",
            totalNumComments: 3,
            voteCount: 5,
          },
          {
            title: "Domain Services vs. application services",
            dateCreated: createRelativeDateString(2),
            memberPostedBy: "stemmlerjs",
            totalNumComments: 3,
            voteCount: 5,
          },
          {
            title: "Domain Services vs. application services",
            dateCreated: createRelativeDateString(2),
            memberPostedBy: "stemmlerjs",
            totalNumComments: 3,
            voteCount: 5,
          },
        ]}
      />
    </Layout>
  );
};
