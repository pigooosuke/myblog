import fs from "fs";
import { Feed } from "feed";
import { Post } from "@/types/blog";
import { parseISO, getYear, getMonth, getDay } from "date-fns";

function generatedRssFeed(posts: Post[]) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const date = new Date();
  const author = {
    name: "pigooosuke",
    link: "https://pigooosuke.com",
  };

  const feed = new Feed({
    title: process.env.NEXT_PUBLIC_BASE_NAME || "",
    description: process.env.NEXT_PUBLIC_BASE_DISC,
    id: baseUrl,
    link: baseUrl,
    language: "ja",
    image: `${baseUrl}/favicons/favicon-32x32.png`,
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`,
    },
    author: author,
  });

  posts.forEach((post: Post) => {
    const url = `${baseUrl}/blog/${post.slug}`;
    const utcDate: Date = parseISO(post.created);
    feed.addItem({
      title: post.title,
      description: post.description,
      id: url,
      link: url,
      date: new Date(getYear(utcDate), getMonth(utcDate), getDay(utcDate)),
    });
  });

  fs.mkdirSync("./public/rss", { recursive: true });
  fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
  fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
  fs.writeFileSync("./public/rss/feed.json", feed.json1());
}

export default generatedRssFeed;
