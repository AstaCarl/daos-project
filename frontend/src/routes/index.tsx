import { useEffect, useState } from "react";
import { Feedback } from "../components/Feedback";
import FrontpageHero from "../components/FrontpageHero";
import { useGet } from "../hooks/use-get";
import { Posts } from "../routes/profile";
import PostCard from "../components/PostCard";
import { Title } from "../components/atoms/Title";

function Index() {
  const [posts, setPosts] = useState<Posts[]>([]);

  const { data: postsData } = useGet<Posts[]>(`/posts`);

  useEffect(() => {
    if (postsData) {
      setPosts(postsData);
      console.log("Get posts successful:", postsData);
    }
  }, [postsData]);

  return (
    <>
      <main className="padding space-y-20 pb-20">
        <FrontpageHero />
        <Feedback />
        <div className="space-y-4">
        <Title variant="blue" title="Opslag" />
        <PostCard posts={posts} />
        </div>
      </main>
    </>
  );
}

export default Index;
