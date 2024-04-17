import { signOut } from "next-auth/react";
import React from "react";

interface AccountMenuProps {
    visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
    const handleSignOut = () => {
        signOut({ callbackUrl: '/auth' })    };

    if (!visible) {
        return null;
    }

    return (
        <div className="bg-orange-400 w-52 gap-3 absolute top-14 right-0 py-5 flex-col border-2 border-orange-600 flex">
            <div className="flex flex-col  ">
                <div className="px-3 group/item flex flex-row gap-8 items-center w-full ">
                    <img className="w-8 rounded-md" src="/images/avartar.png" alt="profile" />
                    <p className="text-white text-sm group-hover/item:underline " >
                        username
                    </p>               
                </div>
                <hr className="bg-orange-600 border-0 h-px my-4"/>
                <div onClick={handleSignOut} className="px-3 text-center text-white text-sm hover:underline">
                    Se déconnecter
                </div>
            </div>
        </div>
    );
};

export default AccountMenu;
