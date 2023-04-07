import React from "react";
import {TbPlayerPlayFilled} from "react-icons/tb";
import { useRouter } from "next/router";

interface PlayButtonProps{
    movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> =({movieId})=>{
    const router = useRouter();

    return(
        <button className="flex flex-row
        w-auto py-1 md:py-2 px-2 md:px-4
        text-xs lg:text-lg font-semibold rounded-md justify-start hover:bg-opacity-80
        items-center transition bg-white"
        onClick={()=>router.push(`/watch/${movieId}`)}>
            <TbPlayerPlayFilled size={16}/><span className="ml-2">Play</span>
        </button>
    )
}

export default PlayButton;