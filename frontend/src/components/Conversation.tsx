import {
  Avatar,
  Flex,
  Stack,
  useColorModeValue,
  WrapItem,
  Text,
  Image,
  AvatarBadge,
} from "@chakra-ui/react";
import { IConversation } from "../types";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";
import { selectedConversationAtom } from "../atoms/messagesAtom";

type Props = {
  conversation: IConversation;
};

const Conversation = ({ conversation }: Props) => {
  const user = conversation.participants[0] || {}; // Garante que `user` não é `undefined`
  console.log("User in Conversation component:", user);
  const currentUser = useRecoilValue(userAtom) || { _id: null }; // Define um valor padrão se `currentUser` for `null`
  const lastMessage = conversation.lastMessage || {}; // Garante que `lastMessage` não é `undefined`
  const colorMode = useColorModeValue("gray.600", "gray.dark");
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );

  // Debug logs
  console.log("selected conversation", selectedConversation);
  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={"1"}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      onClick={() =>
        setSelectedConversation({
          _id: conversation._id,
          userId: user._id,
          userProfilePic: user.profilePic,
          username: user.username,
        })
      }
      bg={selectedConversation?._id === conversation._id ? colorMode : ""}
      borderRadius={"md"}
    >
      <WrapItem>
        <Avatar
          size={{
            base: "xs",
            sm: "sm",
            md: "md",
          }}
          src={user.profilePic || "https://bit.ly/broken-link"}
        >
          <AvatarBadge boxSize={"1em"} bg={"green.500"} />
        </Avatar>
      </WrapItem>
      <Stack direction={"column"} fontSize={"sm"}>
        <Text fontWeight="700" display={"flex"} alignItems={"center"}>
          {user.username}
          <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
        <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
          {currentUser._id === lastMessage.sender?._id ? (
            <BsCheck2All size={16} />
          ) : (
            ""
          )}
          {lastMessage.text.length > 18
            ? lastMessage.text.substring(0, 18) + "..."
            : lastMessage.text}
        </Text>
      </Stack>
    </Flex>
  );
};

export default Conversation;
