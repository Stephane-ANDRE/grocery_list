import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useList = (listId: string) => {
    const { data, error, isLoading } = useSWR(listId ? `/api/lists/${listId}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    console.log("Data received in useList:", data);
    console.log("Error received in useList:", error);

    return {
        data,
        error,
        isLoading
    };
}

export default useList;