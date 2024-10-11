import { atom } from "recoil";

const postsAtom = atom({
  key: "postsAtom",
  default: [], // Initial state should be an empty array
});

export default postsAtom;
