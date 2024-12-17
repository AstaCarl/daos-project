import { Button } from "./atoms/Button";
import Subtitle from "./atoms/Subtitle";
import { Posts } from "../routes/profile";
import PostCard from "./PostCard";

// component for displaying the my posts section, with a list of posts

type Props = {
  posts: Posts[] | undefined;
  // handles the opening of the create post modal
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
        {/* sends posts as props to the postCard  */}
        <PostCard posts={posts} />
      </div>
    </section>
  );
}
