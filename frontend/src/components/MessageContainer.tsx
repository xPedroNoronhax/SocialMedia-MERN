import {
  Avatar,
  Flex,
  useColorModeValue,
  Text,
  Image,
  Divider,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";
import Message from "./Message";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  return (
    <Flex
      flex={70}
      bg={useColorModeValue("gray.100", "gray.dark")}
      borderRadius={"md"}
      p={2}
      flexDirection={"column"}
    >
      <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
        <Avatar src="" size={"sm"} />
        <Text display={"flex"} alignItems={"center"}>
          johndoe <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
      </Flex>

      <Divider />
      <Flex
        flexDir={"column"}
        gap={4}
        my={4}
        px={2}
        height={"400px"}
        overflowY={"auto"}
      >
        {false &&
          [...Array(5)].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={"center"}
              p={1}
              borderRadius={"md"}
              alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
            >
              {i % 2 === 0 && <SkeletonCircle />}
              <Flex flexDir={"column"} gap={2}>
                <Skeleton h="8px" w="250px" />
                <Skeleton h="8px" w="250px" />
                <Skeleton h="8px" w="250px" />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle />}
            </Flex>
          ))}

        <Message ownMessage={true} />
        <Message ownMessage={false} />
        <Message ownMessage={false} />
        <Message ownMessage={true} />
        <Message ownMessage={true} />
        <Message ownMessage={true} />
        <Message ownMessage={true} />
      </Flex>

      <MessageInput />
    </Flex>
  );
};

export default MessageContainer;
