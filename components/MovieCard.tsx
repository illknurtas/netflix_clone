import React from "react";
import {BsHandThumbsUp} from "react-icons/bs";
import {TbPlayerPlayFilled} from "react-icons/tb";
import FavButton from "./FavButton";
import { useRouter } from "next/router";
import useInfoModal from "@/hooks/useInfoModal";
import {FiChevronDown} from "react-icons/fi";


interface MovieCardProps{
    data: Record<string,any>;
}

const MovieCard:React.FC<MovieCardProps> =({data})=>{
    const router = useRouter();
    const {openModal} = useInfoModal();

    return(
        <div className="group bg-zinc-900 col-span relative h-[12vw]">
            <img src={data.thumbnailUrl} alt="Movie Poster"
            className="cursor-pointer object-cover transation duration shadow-xl
            rounded-md group-hover:opacity-90 sm:group-hover:opacity-0
            delay-300 w-full h-[12vw] "/>

            <div className="opacity-0 absolute top-0 transition
            duration-200 z-10 invisible sm:visible delay-300 w-full scale-0 
            group-hover:scale-110 group-hover:translate-y-[6vw]
            group-hover:translate-x-[2vw] group-hover:opacity-100">

                <img src={data.thumbnailUrl} alt="Thumbnail Zoom" 
                className="cursor-pointer object-cover transition duration
                shadow-xl rounded-t-md w-full h-[12vw]"/>

                <div className="z-10 bg-zinc-800 p-2 lg:p-4 
                absolute w-full transition shadow-md rounded-b-md">

                    <div className="flex flex-row items-center gap-3">

                        <div className="cursor-pointer
                         w-7 h-7 lg:w-10 lg:h-10 rounded-full flex
                         justify-center items-center transition border border-white bg-white"
                         onClick={()=>router.push(`/watch/${data?.id}`)}>
                            <TbPlayerPlayFilled size={20}/>
                         </div>
                        <FavButton movieId={data?.id}/>
                        <div className="cursor-pointer w-7
                         h-7 lg:w-10 lg:h-10 bg-[#232323] rounded-full flex
                         justify-center items-center transition 
                         border-2 border-[#919191] hover:border-white "
                         onClick={()=>{}}>
                            <BsHandThumbsUp className="text-white"/>
                         </div>
                         <div className="cursor-pointer w-7 group/item
                         h-7 lg:w-10 lg:h-10 bg-zinc-800 rounded-full flex
                         justify-center items-center transition 
                         border-2 border-[#919191] hover:border-white 
                         absolute right-0 mr-2"
                         onClick={()=>openModal(data?.id)}>
                            <FiChevronDown className="text-white group:hover/item:text-white" size={20}/>
                         </div>
                         
                    </div>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="text-green-400 font-semibold md:text-sm">New</p>
                        {/* <span className="text-white flex items-center border-2 border-[#747474] px-1 md:text-[10px]">16 +</span> */}
                        <span className="lg:text-sm text-[10px] text-white">
                            {data.duration}
                        </span>    
                        <span className="text-[9px] text-white border-2 border-[#747474] flex justify-center items-start px-1 rounded-md">
                             HD 
                        </span>
                    </div>
                    <div className="flex flex-row mt-4 gap-2 items-center">
                        <p className="md:text-sm text-white">
                            {data.genre}
                        </p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default MovieCard;