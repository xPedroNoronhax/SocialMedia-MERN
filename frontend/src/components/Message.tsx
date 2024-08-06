import { Flex, Text, Avatar } from "@chakra-ui/react";

type Props = {
  ownMessage: boolean;
};

const Message = ({ ownMessage }: Props) => {
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text p={1} maxW={"350px"} bg={"blue.400"} borderRadius={"md"}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </Text>
          <Avatar src="" w="7" h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src="" w="7" h={7} />
          <Text
            p={1}
            maxW={"350px"}
            bg={"gray.400"}
            borderRadius={"md"}
            color={"black"}
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
