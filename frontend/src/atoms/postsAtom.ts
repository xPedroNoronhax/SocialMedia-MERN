import { atom } from "recoil";
import { Post } from "../types";

const postsAtom = atom<Post[]>({
  key: "postsAtom",
  default: [],
});

export default postsAtom;
