import Navbar from "@/components/Navbar";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";


export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const router = useRouter()

  return (
    <div className="relative h-full w-full bg-[url('/images/grocery.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <Navbar />
      <nav className="p-10 flex justify-center">
        <img src="/images/ma_list.png" alt="Ma_List_Logo" className="h-12" />
      </nav>
      <div className=" flex justify-center">
        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
          
          <button onClick={() => router.push("/createNewList")} className="bg-orange-400 py-3 text-white rounded-md w-full hover:bg-orange-500 transition">
            Créer une liste
          </button>
          <button onClick={() => router.push("/lists")} className="bg-orange-400 py-3 text-white rounded-md w-full mt-10 hover:bg-orange-500 transition">
            Voir mes anciennes listes
          </button>
        </div>
      </div>
    </div>
  );
}
