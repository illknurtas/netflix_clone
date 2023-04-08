import React,{useCallback, useEffect, useState} from "react";
import {VscClose} from "react-icons/vsc";
import PlayButton from "./PlayButton";
import FavButton from "./FavButton";
import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";

interface InfoModalProps{
    visible?: boolean;
    onClose: any;
}

const InfoModal: React.FC<InfoModalProps>=({visible, onClose})=>{
    const [isVisible, setIsVisible] = useState<boolean>(!!visible);
    const {movieId} = useInfoModal();
    const {data ={}} = useMovie(movieId); 

    useEffect(()=>{
        setIsVisible(!!visible);
    },[visible]);

    const handleClose = useCallback(()=>{
        setIsVisible(false);
        setTimeout(()=>{
            onClose();
        },300);
    },[onClose]);

    if(!visible){
        return null;
    }

    return(
        <div className="z-50 transation duration-300 bg-black bg-opacity-80 
        flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
                <div className={`${isVisible ? "scale-100":"scale-0"}
                transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
                    <div className="relative h-96">
                        <video className="w-full brightness-[60%] object-cover h-full"
                        poster={data?.thumbnailUrl}
                        autoPlay muted loop 
                        src={data?.videoUrl}>

                        </video>
                        <div className="absolute top-3 right-3 rounded-full bg-black bg-opacity-70 cursor-pointer
                        flex items-center justify-center h-10 w-10 text-white"
                        onClick={handleClose}>
                            <VscClose className="text-white w-12"/>
                        </div>
                        <div className="absolute bottom-[10%]
                        left-10">
                            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl
                            font-bold mb-8">
                                {data?.title}
                            </p>
                            <div className="flex flex-row gap-4 items-center">
                                <PlayButton movieId={data?.id}/>
                                <FavButton movieId={data?.id}/>
                            </div>
                        </div>
                    </div>
                    <div className="px-12 py-8">
                        <p className="text-green-400 font-semibold text-lg">
                            New
                            
                        </p>
                        <p className="text-white pl-3">
                            {data?.duration}
                        </p>
                        <p className="text-white">
                            {data?.genre}
                        </p>
                        <p className="text-white">
                            {data?.description}
                        </p>
                    </div>
                    {/* <div className="px-12">
                        { <span className="text-white flex items-center border-2 border-[#747474] px-1 md:text-[10px]">
                            +13
                        </span> 
                        <p className="text-white text-base">
                            {data?.genre}
                        </p> 
                    </div>*/}
                </div>
            </div>
        </div>
    )
}

export default InfoModal;