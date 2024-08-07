import { atom } from "recoil";
import { IConversation } from "../types"; // Certifique-se de ajustar o caminho conforme necessário

export const conversationsAtom = atom<IConversation[]>({
  key: "conversationsAtom",
  default: [],
});
