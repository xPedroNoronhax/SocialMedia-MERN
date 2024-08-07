import {
  Image,
  Avatar,
  Flex,
  Text,
  Box,
  Divider,
  Button,
  Spinner,
} from "@chakra-ui/react";
import Actions from "../components/Actions";
import Comment from "../components/Comment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useEffect } from "react";
import useShowToast from "../hooks/useShowToast";
import { useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import { User, Post } from "../types";
import postsAtom from "../atoms/postsAtom";

const PostPage = () => {
  const { user, loading: userLoading } = useGetUserProfile();

  const [posts, setPosts] = useRecoilState<Post[]>(postsAtom); // Especifique o tipo aqui
  const showToast = useShowToast();
  const { pid } = useParams<{ pid: string }>();
  const currentUser = useRecoilValue<User | null>(userAtom);

  const currentPost = posts.length > 0 ? posts[0] : null; // Adicione verificação para evitar undefined

  useEffect(() => {
    const getPost = async () => {
      setPosts([]);
      try {
        const res = await fetch(`/api/posts/${pid}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        console.log("API Response Data:", data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPosts([data]);
      } catch (error) {
        showToast("Error", "Error in getting the post", "error");
      }
    };
    getPost();
  }, [showToast, pid, setPosts]);

  const handleDeletePost = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) return;
      if (!currentPost) return; // Verifique se o post está definido

      const res = await fetch(`/api/posts/${currentPost._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted", "success");
      if (user) {
        console.log();
      }
    } catch (error) {
      showToast("Error", "Error in delete a post", "error");
    }
  };

  if (userLoading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"lg"} /> {/* Corrigido para um tamanho válido */}
      </Flex>
    );
  }

  if (!currentPost) return null;

  // Adicione logs para depuração
  console.log("Current Post Data:", currentPost);

  console.log("Current User Data:", currentUser);

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          {currentPost.postedBy && (
            <>
              <Avatar
                src={
                  currentPost.postedBy.profilePic || "/default-profile-pic.png"
                } // Imagem padrão caso profilePic seja undefined
                size={"md"}
                name={currentPost.postedBy.username}
              />
              <Flex>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  {currentPost.postedBy.username}
                </Text>
                <Image src="/verified.png" w={4} h={4} ml={4} />
              </Flex>
            </>
          )}
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text
            fontSize={"xs"}
            width={36}
            textAlign={"right"}
            color={"gray.light"}
          >
            {formatDistanceToNow(new Date(currentPost.createdAt))} ago
          </Text>
          {currentUser &&
            currentPost.postedBy &&
            currentUser._id === currentPost.postedBy._id && (
              <DeleteIcon
                fontSize={20}
                onClick={handleDeletePost}
                cursor={"pointer"}
              />
            )}
        </Flex>
      </Flex>

      <Text my={3}>{currentPost.text}</Text>
      {currentPost.img && (
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px solid "}
          borderColor={"gray.light"}
        >
          <Image src={currentPost.img} w={"full"} />
        </Box>
      )}

      <Flex gap={3} my={3}>
        <Actions post={currentPost} />
      </Flex>

      <Divider my={4} />

      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post </Text>
        </Flex>
        <Button>Get</Button>
      </Flex>

      <Divider my={4} />
      {currentPost.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={
            reply._id ===
            currentPost.replies[currentPost.replies.length - 1]._id
          }
        />
      ))}
    </>
  );
};

export default PostPage;
