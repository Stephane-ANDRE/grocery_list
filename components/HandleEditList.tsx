import { useState } from "react";
import Input from "@/components/Input";
import { AiOutlineEdit } from "react-icons/ai";

const HandleEditList = ({ listName, setListName }: { listName: string; setListName: (name: string) => void }) => {
  // State to track if the list name input field is in editing mode
  const [isEditingListName, setIsEditingListName] = useState(false);
  // State to store the temporary edited value of the list name
  const [editedListName, setEditedListName] = useState(listName);

  // Log the current state values for debugging
  console.log("listName:", listName);
  console.log("isEditingListName:", isEditingListName);

  // Function to handle change in the input field
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the temporary edited value of the list name
    setEditedListName(e.target.value);
  };

  // Function to handle saving the edited list name
  const handleSave = () => {
    // Update the list name only if the edited value is not empty
    if (editedListName.trim() !== "") {
      setListName(editedListName.trim());
    }
    // Exit the editing mode
    setIsEditingListName(false);
  };

  // Function to handle key press in the input field
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // If the user presses the "Enter" key, save the edited list name
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return (
    <section className="flex flex-col gap-4 mb-4">
      <div>
        {/* Conditional rendering based on whether the list is named or not */}
        {listName ? (
          <div className="flex justify-between items-center">
            {/* Conditionally render either input field for editing or text display */}
            {isEditingListName ? (
              <Input
                type="text"
                value={editedListName}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                autoFocus // Automatically focus on the input field when in edit mode
                id={""}
                label={""}
              />
            ) : (
              <p className="text-white uppercase font-bold">{listName}</p>
            )}
            {/* Icon to toggle the edit mode of the list name */}
            <AiOutlineEdit
              className="text-blue-500 cursor-pointer"
              size={25}
              onClick={() => setIsEditingListName(true)}
            />
          </div>
        ) : (
          // Render the input field for naming the list
          <Input
            label="Nom de la liste"
            type="text"
            value={editedListName}
            onChange={handleChange}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                handleSave();
              }
            }}
            id="text"
          />
        )}
      </div>
    </section>
  );
};

export default HandleEditList;
