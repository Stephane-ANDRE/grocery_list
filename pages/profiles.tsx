import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";


export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
    // Redirecting to the authentication page if the user is not logged in
    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    // It's important to return an empty props object
    return {
        props: {},
    };
}

const Profiles = () => {
    const router = useRouter()
    const { data: user } = useCurrentUser();

    return (
        <div className="flex items-center h-full justify-center">
            <div className="flex flex-col">
                <h1 className="text-3xl md:text-6xl text-white text-center">
                    Qui est connecté(e)?
                </h1>
                <div className="flex items-center justify-center gap-8 mt-10">
                <div onClick={() => router.push("/")}>
                        <div className="group flex-row w-44 mx-auto">
                            <div
                                className="
                                    w-44
                                    h-44
                                    rounded-md
                                    flex
                                    items-center
                                    justify-center
                                    border-2
                                    border-transparent
                                    overflow-hidden
                                    transition-transform
                                    hover:scale-110
                                    cursor-pointer
                                "
                            >
                                <img src="/images/avartar.png" alt="Profile" />
                            </div>
                            <div
                                className="
                                    mt-4
                                    text-gray-400
                                    text-2xl
                                    text-center
                                    group-hover:text-white
                                "
                            >
                                {user?.name}
                            </div>
                        </div>
                        <div>
                            <h2 className="bg-orange-400 p-3 text-xl md:text-2xl text-white text-center rounded-md w-full mt-10 hover:bg-orange-500 transition">
                                Que tu sois une fille, un garçon, les deux ou autres.. tu fais
                                surement une liste de courses
                            </h2>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profiles;
