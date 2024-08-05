import { Avatar, Box, Flex, Text, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
// Tipos ajustados para refletir a estrutura correta de dados
type User = {
  _id: string;
  username: string;
  profilePic?: string;
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

type PostProps = {
  post: PostType;
};
const Post = ({ post }: PostProps) => {
  const [user, setUser] = useState<User | null>(null);

  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom);
  const navigate = useNavigate();

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

  const handleDeletePost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (!window.confirm("Are you sure you want to delete this post?")) return;
      const res = await fetch(`api/posts/${post._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Post deleted", "success");
    } catch (error) {
      showToast("Error", "Error in delete a post", "error");
    }
  };

  if (!user) return null;

  return (
    <Flex gap={3} mb={4} py={5}>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Link to={`/${user.username}/post/${post._id}`}>
          <Avatar
            size={"md"}
            name={user.username}
            src={user.profilePic}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user.username}`);
            }}
          />
        </Link>
        <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
        <Box position={"relative"} w={"full"}>
          {post.replies.length === 0 && <Text textAlign={"center"}>🥱</Text>}
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
          <Link to={`/${user.username}/post/${post._id}`}>
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user.username}`);
                }}
              >
                {user.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
          </Link>
          <Flex gap={4} alignItems={"center"}>
            <Text
              fontSize={"xs"}
              width={36}
              textAlign={"right"}
              color={"gray.light"}
            >
              {formatDistanceToNow(new Date(post.createdAt))} ago
            </Text>
            {currentUser?._id === user._id && (
              <DeleteIcon
                fontSize={20}
                onClick={handleDeletePost}
                cursor={"pointer"}
              />
            )}
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
          <Actions post={post} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Post;
