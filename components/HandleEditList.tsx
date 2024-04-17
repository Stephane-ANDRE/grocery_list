import { useState } from "react";
import Input from "@/components/Input";
import { AiOutlineEdit } from "react-icons/ai";

const HandleEdit = () => {
  // State to manage the list name
  const [listName, setListName] = useState("");
  // State to track if the list is named
  const [isListNamed, setIsListNamed] = useState(false);
  // State to track if the list name input field is in editing mode
  const [isEditingListName, setIsEditingListName] = useState(false);

  // Log the current state values for debugging
  console.log("listName:", listName);
  console.log("isListNamed:", isListNamed);
  console.log("isEditingListName:", isEditingListName);

  return (
    <section className="flex flex-col gap-4 mb-4">
      <div>
        {/* Conditional rendering based on whether the list is named or not */}
        {isListNamed ? (
          <div className="flex justify-between items-center">
            {/* Conditionally render either input field for editing or text display */}
            {isEditingListName ? (
              <Input
                type="text"
                value={listName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setListName(e.target.value)
                }
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") {
                    setIsEditingListName(false);
                  }
                }}
                autoFocus // Automatically focus on the input field when in edit mode
                id={""}
                label={""}
              />
            ) : (
              <p className="text-white uppercase font-bold">{listName}</p>
            )}
            {/* Icon to toggle the edit mode of the list name */}
            <AiOutlineEdit
              className="text-blue-500 cursor-pointer "
              size={25}
              onClick={() => setIsEditingListName(true)}
            />
          </div>
        ) : (
          // Render the input field for naming the list
          <Input
            label="Nom de la liste"
            type="text"
            value={listName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setListName(e.target.value)
            }
            id="text"
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                setIsListNamed(true);
              }
            }}
          />
        )}
      </div>
    </section>
  );
};

export default HandleEdit;
