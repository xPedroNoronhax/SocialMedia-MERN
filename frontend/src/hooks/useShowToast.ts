import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

// Definindo o tipo correto para ToastStatus
type ToastStatus = "info" | "warning" | "success" | "error" | "loading";

const useShowToast = () => {
  const toast = useToast();

  const showToast = useCallback(
    (title: string, description: string, status: ToastStatus) => {
      toast({
        title: title,
        description: description,
        status: status,
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );

  return showToast;
};

export default useShowToast;
