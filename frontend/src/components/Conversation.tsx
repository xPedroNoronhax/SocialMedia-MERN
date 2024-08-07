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
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";

type Props = {
  conversation: IConversation;
};

const Conversation = ({ conversation }: Props) => {
  const user = conversation.participants[0] || {}; // Garante que `user` não é `undefined`
  const currentUser = useRecoilValue(userAtom) || { _id: null }; // Define um valor padrão se `currentUser` for `null`
  const lastMessage = conversation.lastMessage || {}; // Garante que `lastMessage` não é `undefined`

  // Debug logs
  console.log("Conversation data:", conversation);
  console.log("User data:", user);
  console.log("Current user:", currentUser);
  console.log("Last message:", lastMessage);

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
