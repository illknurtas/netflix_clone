import NavbarItem from "./NavbarItem";
import {VscTriangleDown} from "react-icons/vsc";
import MobileMenu from "./MobileMenu";
import { useCallback, useEffect, useState } from "react";
import {HiOutlineSearch} from "react-icons/hi";
import {BsBell} from "react-icons/bs";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar =()=>{

    // Mobile Menu - Browse button
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const toggleMobileMenu = useCallback(() => {
        setShowMobileMenu((current)=>!current)
      },[]);

    // Account Icon Menu
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current)=>!current)
    },[]);

    // Dark BG of Navbar
    const [showBackground, setShowBackground] = useState(false);

    useEffect(()=>{
        const handleScroll = () =>{
            if(window.scrollY>=TOP_OFFSET){
                setShowBackground(true);
            }
            else {
                setShowBackground(false);
            }
        }
        window.addEventListener("scroll", handleScroll);
        return ()=>{
            window.removeEventListener("scroll", handleScroll);
        }
    },[]);


    return(
        <nav className="w-full fixed z-40">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500
            ${showBackground ? 'bg-zinc-900 bg-opacity-90':''}`}>
                <img src="img/logo.png" alt="Netflix Logo"
                className="h-12 lg:h-16"/>
                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label="Home"/>
                    <NavbarItem label="TV Shows"/>
                    <NavbarItem label="Movies"/>
                    <NavbarItem label="New & Popular"/>
                    <NavbarItem label="My List"/>
                    <NavbarItem label="Browse by Languages"/>
                </div>
                <div className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
                onClick={toggleMobileMenu}>
                    <p className="text-white text-sm">Browse</p>
                    <VscTriangleDown className="text-white transition"/>
                    <MobileMenu visible={showMobileMenu}/>
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <HiOutlineSearch/>
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
                        <BsBell/>
                    </div>
                    <div className="flex flex-row items-center gap-2 cursor-pointer relative"
                    onClick={toggleAccountMenu}>
                        <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/img/red_icon.png" alt="User Icon"/>
                        </div>
                        <VscTriangleDown 
                        className={`text-white transition ${showAccountMenu ? 'rotate-180':'rotate-0'}`}/>
                        <AccountMenu visible={showAccountMenu}/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;