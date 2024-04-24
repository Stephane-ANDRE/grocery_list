import { NextPage } from "next";
import Navbar from "@/components/Navbar";
import useList from "@/hooks/useOneList"; 
import OneList from "@/components/OneList";
import { useRouter } from "next/router";

const ListPage: NextPage = () => {
  const router = useRouter() 
  
  const { listId } = router.query;
  const { data, error, isLoading } = useList(listId as string);
  
  console.log("Data from useList:", data);
  console.log("récupération",router.query.listId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="relative h-full w-full bg-[url('/images/grocery.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <Navbar />
      <div className="p-10 flex justify-center">
        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
          <OneList listId={data.id} />
          <div className="flex flex-row items-center gap-4 mt-8 justify-center">
          <button
              className=" bg-orange-400 hover:bg-orange-500 transition text-white px-4 py-2 rounded-md"
              onClick={() => router.push("/")}
            >
              Courses finies?
            </button>
            </div> 
        </div>
      </div>
    </div>
  );
};

export default ListPage;
