import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavs from "@/hooks/useFav";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import {getSession, signOut} from "next-auth/react";

export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);

  if(!session){
    return{
      redirect:{
        destination:"/auth/auth",
        permanent: false
      }
    }
  }
  return{
    props: {}
  }
}


export default function Home() {
  const {data: movies =[]} = useMovieList();
  const {data: favs = []} = useFavs();
  const {data: user} = useCurrentUser();

  return (
    <>
      <Navbar/>
      <Billboard/>
      <div className="pb-40">
        <MovieList title="Top 10 Shows in Türkiye Today" data={movies}/>
        <MovieList title="My List" data={favs}/>
      </div>
    </>
  )
}