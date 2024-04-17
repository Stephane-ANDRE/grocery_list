// pages/all-lists.tsx

import { NextPage } from 'next';
import Navbar from '@/components/Navbar';
import AllLists from '@/components/AllLists';
import useAllLists from '@/hooks/useAllLists';

const AllListsPage: NextPage = () => {
  // Utilisation du hook useAllLists pour récupérer les données des listes
  const { data: lists, error, isLoading } = useAllLists();

  return (
    <div className="relative h-full w-full bg-[url('/images/grocery.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <Navbar />
      <div className="p-10 flex justify-center">
        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
          <h2 className="text-white text-xl font-semibold mb-4">Toutes les listes</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            // Affichage du composant AllLists avec les données récupérées
            <AllLists data={lists} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllListsPage;
