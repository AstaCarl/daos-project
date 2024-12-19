import { useEffect, useState } from "react";
import { Feedback } from "../components/Feedback";
import FrontpageHero from "../components/FrontpageHero";
import { useGet } from "../hooks/use-get";
import { Posts } from "../routes/profile";
import PostCard from "../components/PostCard";
import { Title } from "../components/atoms/Title";

// index page, that renders the frontpage

function Index() {
  // Usestete for saving the fetched posts
  const [posts, setPosts] = useState<Posts[]>([]);

  // Fetch posts using the useGet hook
  const { data: postsData } = useGet<Posts[]>(`/posts`);

  // Set the fetched posts to the state when the data is fetched
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
        {/* Sending the posts as a prop to the card component */}
        <PostCard posts={posts} />
        </div>
      </main>
    </>
  );
}

export default Index;
