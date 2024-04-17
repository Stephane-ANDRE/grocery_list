
import { useCallback, useState } from "react";
import { BsChevronCompactDown} from "react-icons/bs";



//import React icone
import AccountMenu from "./AccountMenu";



// NavBar component
const NavBar = () => {
const [showAccountMenu, setShowAccountMenu] = useState(false)

const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current)
}, [])

      // Render NavBar component
    return (
        // Navigation bar container
        <nav className="w-full fixed z-40">
            <div
            className={`
            px-4
            md:px-16
            py-6
            flex
            flex-row
            items-center
            transition
            duration-500
            `}
            >
            <div className="
            flex-row
            ml-8
            gap-7
            hidden
            lg:flex
            "
            >
            </div>

            <div onClick={toggleAccountMenu} className=" flex flex-row ml-auto gap-7 items-center">
                {/*Account menu component */}
                <div className="flex flex-row items-center gap-2 cursor-pointer relative">
                     <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                        <img src="/images/avartar.png" alt="profile" />
                    </div>
                        <BsChevronCompactDown className= {`text-black stroke-2 transition ${showAccountMenu ? "rotate-180": "rotate-0"} `} />
                        <AccountMenu visible={showAccountMenu} />
                </div>

            </div>
            </div>
        </nav>
    )
};

export default NavBar;