import { Button } from "./atoms/Button";
import Subtitle from "./atoms/Subtitle";
import { Posts } from "../routes/profile";
import React from "react";
import { Title } from "./atoms/Title";
import Paragraf from "./atoms/Paragraf";
import Image from "./atoms/Image";

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
        <div className="flex overflow-x-auto space-x-4">
          {posts &&
            posts.map((post: Posts, index: number) => (
              <React.Fragment key={index}>
                <div className="flex flex-col min-w-[280px] space-x border  border-accent-grey w-full rounded-md">
                  <div className="flex flex-col  gap-2 border border-accent bg-gray-50 rounded-sm p-3">
                    <div className="flex w-full gap-4">
                      <Image className="aspect-square object-cover w-[15%] rounded-xl border-2 border-white shadow-md" />
                      <div>
                        <Title variant="red" title={post.ensemble.title} />
                        <div className="flex gap-4">
                          <Paragraf
                            variant="body"
                            className="font-bold"
                            paragrafText={post.ensemble.city}
                          />
                          <Paragraf
                            variant="body"
                            paragrafText={`${post.ensemble.activeUsers.length} musikkere`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col p-4 gap-3">
                    <Subtitle variant="cardTitle" subtitle={post.title} />
                    <Subtitle
                      variant="instrument"
                      subtitle={post.instrument.name}
                    />
                  </div>
                </div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </section>
  );
}
