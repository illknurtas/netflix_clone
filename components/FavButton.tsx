import axios from "axios";
import React, {useCallback, useMemo} from "react";

import useCurrentUser from "@/hooks/useCurrentUser";
import useFavs from "@/hooks/useFav";

import {AiOutlinePlus} from "react-icons/ai";
import{BiCheck} from "react-icons/bi";


interface FavButtonProps{
    movieId:string;
}

const FavButton: React.FC<FavButtonProps> = ({movieId})=>{
    const {mutate: mutateFavs} = useFavs();
    const{data: currentUser, mutate} = useCurrentUser();
    const isFav = useMemo(()=>{
        const list = currentUser?.favoriteIds || [];
        return list.includes(movieId);
    },[currentUser, movieId]);

    const toggleFavs = useCallback(async ()=>{
        let response;
        if(isFav){
           response = await axios.delete("/api/fav", {
            data:{
               movieId 
            }});
        }
        else{
            response = await axios.post("/api/fav", {movieId});
        }
        const updatedFavIds = response?.data?.favIds;
        mutate({
            ...currentUser,
            favIds: updatedFavIds
        });
        mutateFavs();
    },[movieId, isFav, currentUser, mutate, mutateFavs]);

    const Icon = isFav ? BiCheck : AiOutlinePlus;

    return(
        <div className="cursor-pointer w-7 h-7 lg:w-10 lg:h-10 
        bg-[#232323] rounded-full group/item
        flex justify-center items-center transition 
        border-2 border-[#919191] hover:border-white "
        onClick={toggleFavs}>
            <Icon className="text-white" size={20}/>
        </div>
    )
}

export default FavButton;