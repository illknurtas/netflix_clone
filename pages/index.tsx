import useCurrentUser from "@/hooks/useCurrentUser";
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

  const {data: user} = useCurrentUser();

  return (
    <>
      <h1 className="text-green-500 text-4xl">
        YOU LOGGED IN!!
      </h1>
      <p className="text-3xl text-white">
        Logged in as: {user?.name}
      </p>
      <button
      onClick={()=> signOut()}
      className="h-10 text-white bg-[#e50815] rounded-md w-full transition">
        Logout
      </button>
    </>
  )
}