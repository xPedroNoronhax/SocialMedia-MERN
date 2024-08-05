// Comment.tsx
import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { Reply } from "../types";

interface CommentProps {
  reply: Reply;
  lastReply: boolean;
}

const Comment = ({ reply, lastReply }: CommentProps) => {
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={reply.userProfilePic || ""} size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize="sm" fontWeight="bold">
              {reply.username}
            </Text>
          </Flex>
          <Text>{reply.text}</Text>
        </Flex>
      </Flex>{" "}
      {!lastReply ? <Divider /> : null}
    </>
  );
};

export default Comment;
