import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useList = (id: string) => {
    const { data, error, isLoading } = useSWR(id ? `/api/lists/${id}` : null, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });

    console.log("Data received in useList:", data); // Ajoutez un console log pour voir les données récupérées
    console.log("Error received in useList:", error); // Ajoutez un console log pour voir les éventuelles erreurs

    return {
        data,
        error,
        isLoading
    };
}

export default useList;
