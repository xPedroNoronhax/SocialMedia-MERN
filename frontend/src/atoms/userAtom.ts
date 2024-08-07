import { atom } from "recoil";
import { User } from "../types"; // Ajuste o caminho conforme necessário

const userAtom = atom<User | null>({
  key: "userAtom",
  default: null,
});

export default userAtom;
