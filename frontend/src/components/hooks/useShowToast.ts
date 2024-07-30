import { useToast } from "@chakra-ui/react";


type ToastStatus =
  | "info"
  | "warning"
  | "success"
  | "error"
  | "loading"
  | undefined;

const useShowToast = () => {
  const toast = useToast();
  const showToast = (
    title: string,
    description: string,
    status: ToastStatus
  ) => {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };
  return showToast;
};

export default useShowToast;
