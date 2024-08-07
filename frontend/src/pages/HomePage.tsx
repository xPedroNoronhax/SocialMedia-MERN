import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import useShowToast from "../hooks/useShowToast";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([]);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        console.log("Feed Posts:", data); // Verifique os dados recebidos
        if (data.error) {
          showToast("Error", "Error in getting the feed posts", "error");
          return;
        }
        setPosts(data);
      } catch (error) {
        showToast("Error", "Error in getFeedPosts", "error");
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts();
  }, [showToast, setPosts]);
  return (
    <>
      {!loading && posts.length === 0 && (
        <h1>Follow some users to see the feed</h1>
      )}

      {loading && (
        <Flex justify={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
};

export default HomePage;
