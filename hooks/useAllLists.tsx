import useSWR from "swr";
// Importing the fetcher function from the fetcher module
import fetcher from "@/lib/fetcher";

// Custom hook for fetching data from the movies API endpoint
const useAllLists = () => {
      // Using the useSWR hook to fetch data from the movies API endpoint
const { data, error, isLoading} = useSWR("/api/lists", fetcher, {
    // Disabling revalidation when the data is stale, on focus, or on reconnect
    revalidateIfStale: false,
    revalidateOnFocus:false,
    revalidateOnReconnect:false
});
 // Returning the fetched data, any error, and the loading state
return {
    data,
    error,
    isLoading
}
};

export default useAllLists