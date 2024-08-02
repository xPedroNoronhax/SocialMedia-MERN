import { Avatar, Box, Flex, Text, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";

// Tipos ajustados para refletir a estrutura correta de dados
type User = {
  _id: string;
  username: string;
  profilePic?: string;
};

type Reply = {
  userId: User; // Mantenha a tipagem do usuário em Reply
  text: string;
  userProfilePic?: string;
  username?: string;
};

type PostProps = {
  post: {
    _id: string;
    postedBy: string; // ID do usuário como string
    text: string;
    img?: string;
    likes: User[];
    replies: Reply[];
    createdAt: string;
  };
};

const Post = ({ post }: PostProps) => {
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      if (!post.postedBy) {
        console.log("No postedBy ID available");
        return;
      }

      try {
        const res = await fetch(`/api/users/profile/${post.postedBy}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", "Error in fetching user profile", "error");
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", "Error in fetching user profile", "error");
        setUser(null);
      }
    };
    getUser();
  }, [post.postedBy, showToast]);

  if (!user) return null;

  return (
    <Flex gap={3} mb={4} py={5}>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Avatar size={"md"} name={user.username} src={user.profilePic} />
        <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
        <Box position={"relative"} w={"full"}>
          {post.replies.slice(0, 3).map((reply, index) => (
            <Avatar
              key={index}
              size={"xs"}
              name={reply.username}
              src={reply.userProfilePic}
              position={"absolute"}
              top={index === 0 ? "0px" : undefined}
              bottom={index > 0 ? "0px" : undefined}
              left={index === 2 ? "4px" : undefined}
              right={index === 1 ? "-5px" : undefined}
              padding={"2px"}
            />
          ))}
        </Box>
      </Flex>
      <Flex flex={1} flexDirection={"column"} gap={2}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Flex w={"full"} alignItems={"center"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.username}
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={1} />
          </Flex>
          <Flex gap={4} alignItems={"center"}>
            <Text fontSize={"sm"} color={"gray.light"}>
              {new Date(post.createdAt).toLocaleDateString()}
            </Text>
            <BsThreeDots />
          </Flex>
        </Flex>
        <Link to={`/user/${post.postedBy}/post/${post._id}`}>
          <Text fontSize={"sm"}>{post.text}</Text>
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
        </Link>
        <Flex gap={3} my={1}>
          <Actions liked={liked} setLiked={setLiked} />
        </Flex>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"} fontSize={"sml"}>
            {post.replies.length} replies
          </Text>
          <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
          <Text color={"gray.light"} fontSize={"sml"}>
            {post.likes.length + (liked ? 1 : 0)} likes
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Post;
