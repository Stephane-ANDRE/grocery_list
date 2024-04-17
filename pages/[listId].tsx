import { NextPage } from "next";
import Navbar from "@/components/Navbar";
import useList from "@/hooks/useOneList"; 
import OneList from "@/components/OneList";
import { useRouter } from "next/router";





const ListPage: NextPage = () => {
  const router = useRouter() 
  
  const {listId} = router.query;

  const {data} = useList(listId as string)
  
  
  console.log("récupération",router.query.listId);
  

return (
  <div className="relative h-full w-full bg-[url('/images/grocery.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
    <Navbar />
    <div className="p-10 flex justify-center">
      <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
        <h2 className="text-white text-xl font-semibold mb-4">la Liste</h2>
       
          <OneList listId={data && data.listId} />        
      </div>
    </div>
  </div>
);
};

export default ListPage;
