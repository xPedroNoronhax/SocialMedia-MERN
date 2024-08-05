import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";

export type User = {
  _id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  followers: string[];
  following: string[];
  bio: string;
  createdAt: string;
  updatedAt: string;
};

type Reply = {
  userId: User;
  text: string;
  userProfilePic?: string;
  username?: string;
};

type PostType = {
  _id: string;
  postedBy: string; // ID do usuário como string
  text: string;
  img?: string;
  likes: User[];
  replies: Reply[];
  createdAt: string;
};

const UserPage = () => {
  const { user, loading } = useGetUserProfile();
  const { username } = useParams();
  const showToast = useShowToast();

  const [posts, setPosts] = useState<PostType[]>([]);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      setFetchingPosts(true);
      try {
        const res = await fetch(`/api/posts/user/${username}`);
        const data = await res.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        showToast("Error", "Impossible identify the userPost", "error");
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };

    getPosts();
  }, [username, showToast]);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size="xl" />
      </Flex>
    );
  }
  if (!user && !loading) return <h1>User not found</h1>;

  return (
    <>
      {user && <UserHeader user={user} />}
      {!fetchingPosts && posts.length === 0 && <h1>User has no posts</h1>}
      {fetchingPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
};

export default UserPage;
