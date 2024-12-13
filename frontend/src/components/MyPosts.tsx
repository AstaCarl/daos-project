import { Button } from "./atoms/Button";
import Subtitle from "./atoms/Subtitle";
import { Posts } from "../routes/profile";
import React from "react";
import { Title } from "./atoms/Title";
import Paragraf from "./atoms/Paragraf";
import Image from "./atoms/Image";
import PostCard from "./PostCard";

type Props = {
  posts: Posts[] | undefined;
  handlePostsOpen: () => void;
};

export default function MyPosts({ posts, handlePostsOpen }: Props) {
  return (
    <section className="bg-white flex flex-col gap-7 padding border-y accent-grey">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <Subtitle variant="default" subtitle="Mine opslag" />
          <div>
            <Button
              variant="secondary"
              buttonText="Tilføj"
              size="small"
              onClick={handlePostsOpen}
            />
          </div>
        </div>
        <PostCard posts={posts} />
      </div>
    </section>
  );
}
