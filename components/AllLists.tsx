import React from "react";

// lodash is a JS library helping by offering
// functions to manipulate arrays, objects, strings, functions, etc.
import { isEmpty } from "lodash";

//importing Onelist component
import OneList from "./OneList";


interface AllListsProps {
   
    data: Record<string, any>[]; 
    name: string; 
}

const AllLists: React.FC<AllListsProps> = ({ data, name }) => {
    // Check if the data array is empty
    if (isEmpty(data)) {
        return null; 
    }
    
 
    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <div>
              
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                    {name}
                </p>
              
                <div className="grid grid-cols-4 gap-2">
                   
                    {data.map((list) => (
                        <OneList key={list.id} data={list} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllLists;
