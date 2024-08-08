import { useState } from "react";
import useShowToast from "./useShowToast";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { IUser } from "../types";

interface UseFollowUnfollowReturn {
  handleFollowUnfollow: () => Promise<void>;
  updating: boolean;
  following: boolean;
}

const useFollowUnfollow = (user: IUser): UseFollowUnfollowReturn => {
  const currentUser = useRecoilValue(userAtom);
  const [following, setFollowing] = useState<boolean>(
    user.followers.includes(currentUser?._id ?? "")
  );
  const [updating, setUpdating] = useState<boolean>(false);
  const showToast = useShowToast();

  const handleFollowUnfollow = async (): Promise<void> => {
    if (!currentUser) {
      showToast("Error", "Please login to follow", "error");
      return;
    }
    if (updating) return;

    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      if (following) {
        showToast("Success", `Unfollowed ${user.name}`, "success");
        user.followers = user.followers.filter((id) => id !== currentUser._id);
      } else {
        showToast("Success", `Followed ${user.name}`, "success");
        user.followers.push(currentUser._id);
      }
      setFollowing(!following);

      console.log(data);
    } catch (error) {
      showToast("Error", "error in follow/unfollow", "error");
    } finally {
      setUpdating(false);
    }
  };

  return { handleFollowUnfollow, updating, following };
};

export default useFollowUnfollow;
