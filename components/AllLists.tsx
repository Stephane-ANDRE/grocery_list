import React from "react";
import useAllLists from "@/hooks/useAllLists";

interface AllListsProps {
    name: string; 
}

const AllLists: React.FC<AllListsProps> = ({ name }) => {
    const { data, error, isLoading } = useAllLists();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data || data.length === 0) {
        return <div className="text-white">Vous n'avez pas encore créer de listes...</div>;
    }
 
    return (
        <div className="px-4 md:px-12 mt-4">
  <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">{name}</p>
  <div className="flex flex-wrap justify-between gap-4">
    {data.map((list: any) => (
      <div key={list.id} className="w-full md:w-auto">
        <p className="border border-gray-200 p-4 bg-orange-400 hover:bg-orange-500 transition text-white px-4 py-2 rounded-md">
          <span className="inline-block">{list.name}</span>
        </p>
      </div>
    ))}
  </div>
</div>



    );
};

export default AllLists;
