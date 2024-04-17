import React from "react";
import useOneList from "@/hooks/useOneList";

interface OneListProps {
    listId: string; // Add a prop for the list ID
}

const OneList: React.FC<OneListProps> = ({ listId }) => {
    // Use the useOneList hook to fetch the list data
    const { data, error, isLoading } = useOneList(listId);

    // Display a loading message if the data is still loading
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Display an error message if there's an error fetching the data
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // If data is available, display the list information
    return (
        <div>
            <h2>{data?.name}</h2>
            <h3>{data?.products}</h3>
            {/* Display other list information if needed */}
        </div>
    );
};

export default OneList;
