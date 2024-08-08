import { atom } from "recoil";
import { IConversation } from "../types"; // Certifique-se de ajustar o caminho conforme necessário

export const conversationsAtom = atom<IConversation[]>({
  key: "conversationsAtom",
  default: [],
});

export const selectedConversationAtom = atom({
  key: "selectedConversationAtom",
  default: {
    _id: "",
    userId: "",
    username: "",
    userProfilePic: "",
  },
});
