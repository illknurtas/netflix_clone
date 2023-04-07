import React, { useEffect, useState } from "react";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import {BsArrowLeft} from "react-icons/bs";

const Watch =()=>{
    const router = useRouter();
    const {movieId} = router.query;
    const {data} = useMovie(movieId as string);
    const [showNav, setShowNav] = useState(true);

    useEffect(()=>{
        const hideNavTimeout = setTimeout(()=>{
            setShowNav(false);
        },5000);
        return ()=>clearTimeout(hideNavTimeout);
    },[]);

    function handleMouseMove(){
        setShowNav(true);
    }


    return(
        <div className="h-screen w-screen bg-black"
        onMouseMove={handleMouseMove}>
            <nav className={`fixed w-full p-4 z-10 flex flex-row items-center gap-8
            bg-black bg-opacity-70 transation-all duration-300 
            ${showNav ? "" : "-translate-y-full"}`}>
                <BsArrowLeft className="text-white w-8 h-auto lg:w-12 cursor-pointer" 
                onClick={()=>router.push(`/`)}/>
                <p className="text-white">
                    <span className="text-white text-1xl md:text-2xl font-bold mr-3">
                        Watching:
                    </span>
                    {data?.title}
                </p>
            </nav>
            <video 
            autoPlay controls
            src={data?.videoUrl}
            className="h-full w-full">
            </video>
        </div>
    )
}

export default Watch;