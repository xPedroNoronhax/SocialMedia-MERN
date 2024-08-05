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
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { DeleteIcon } from "@chakra-ui/icons";
import { Post, User } from "../types";

const PostPage = () => {
  const { user, loading: userLoading } = useGetUserProfile();
  const [post, setPost] = useState<Post | null>(null);
  const showToast = useShowToast();
  const { pid } = useParams<{ pid: string }>();
  const currentUser = useRecoilValue<User | null>(userAtom); // Ajuste aqui para aceitar null
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await fetch(`/api/posts/${pid}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        setPost(data);
      } catch (error) {
        showToast("Error", "Error in getting the post", "error");
      }
    };
    getPost();
  }, [showToast, pid]);

  const handleDeletePost = async () => {
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) return;
      if (!post) return; // Verifique se o post está definido

      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted", "success");
      if (user) {
        navigate(`/${user.username}`);
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

  if (!post) return null;

  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          {post.postedBy && (
            <>
              <Avatar
                src={post.postedBy.profilePic}
                size={"md"}
                name={post.postedBy.username}
              />
              <Flex>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  {post.postedBy.username}
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
            {formatDistanceToNow(new Date(post.createdAt))} ago
          </Text>
          {currentUser &&
            post.postedBy &&
            currentUser._id === post.postedBy._id && (
              <DeleteIcon
                fontSize={20}
                onClick={handleDeletePost}
                cursor={"pointer"}
              />
            )}
        </Flex>
      </Flex>

      <Text my={3}>{post.text}</Text>
      {post.img && (
        <Box
          borderRadius={6}
          overflow={"hidden"}
          border={"1px solid "}
          borderColor={"gray.light"}
        >
          <Image src={post.img} w={"full"} />
        </Box>
      )}

      <Flex gap={3} my={3}>
        <Actions post={post} />
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
      {post.replies.map((reply) => (
        <Comment
          key={reply._id}
          reply={reply}
          lastReply={reply._id === post.replies[post.replies.length - 1]._id}
        />
      ))}
    </>
  );
};

export default PostPage;
