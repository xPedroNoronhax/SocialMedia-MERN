import { Flex, Text, Avatar, Image } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";
import { IMessage } from "../types"; // Usando a interface atualizada

type Props = {
  ownMessage: boolean;
  message: IMessage; // Usando a interface atualizada
};

const Message = ({ ownMessage, message }: Props) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);

  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          {message.img && <Image src={message.img} maxW={"200px"} />}
          <Text p={1} maxW={"350px"} bg={"blue.400"} borderRadius={"md"}>
            {message.text}
          </Text>
          <Avatar src={user?.profilePic} w="7" h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={selectedConversation.userProfilePic} w="7" h={7} />
          <Text
            p={1}
            maxW={"350px"}
            bg={"gray.400"}
            borderRadius={"md"}
            color={"black"}
          >
            {message.text}
          </Text>
          {message.img && <Image src={message.img} maxW={"200px"} />}
        </Flex>
      )}
    </>
  );
};

export default Message;
