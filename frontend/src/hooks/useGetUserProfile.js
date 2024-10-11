import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useShowToast from "./useShowToast";

const useGetUserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();
  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        if (!res.ok) {
          // Log the error response for debugging
          console.error(`Server error: ${res.status} ${res.statusText}`);
          throw new Error(`Server error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }
        if (data.isFrozen) {
          setUser(null);
          return;
        }
        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        console.error(`Fetch error: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [username, showToast]);

  return { loading, user };
};

export default useGetUserProfile;
