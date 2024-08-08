import { atom } from "recoil";
import { User } from "../types"; // Ajuste o caminho conforme necessário

const userAtom = atom<User | null>({
  key: "userAtom",
  default: localStorage.getItem("user-threads")
    ? JSON.parse(localStorage.getItem("user-threads") as string)
    : null,
});

export default userAtom;
