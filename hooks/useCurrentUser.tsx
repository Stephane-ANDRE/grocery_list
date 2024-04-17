import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// Fetch user data from the server
const useCurrentUser = () => {
  const { data, error, isLoading, mutate} = useSWR("/api/user/current", fetcher);

   // Log user data
   console.log("User data:", data);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;