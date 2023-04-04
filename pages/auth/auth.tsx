import Input from "@/components/input";
import { useCallback, useState } from "react";
import axios from "axios";
import {signIn} from "next-auth/react";
// import { useRouter } from "next/router";
import {FcGoogle} from "react-icons/fc";

const Auth = () =>{
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[name, setName] = useState('');

    // const router = useRouter();

    const [variant, setVariant] = useState('login');
    const toggleVar = useCallback(()=>{
        setVariant((currentVariant) => currentVariant ==="login" ? "signup" : "login" );
    },[])

    const login = useCallback(async()=>{
        try {
            await signIn("credentials",{
                email,
                password,
                // redirect : false,
                callbackUrl:"/profile"
            });
            // router.push("/");
        } catch (error) {
            console.log(error);
        }
    },[email, password]);

    const register = useCallback(async()=>{
        try{
            await axios.post("/api/register",{
                email,
                name,
                password
            });
            login();
        }catch(error){
            console.log(error);
        }
    },[email,name,password, login]);

    
    return(
        <div className="relative h-full w-full
        bg-[url('/img/bg.jpg')]
        bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="">
                    <img src="/img/logo.png" alt="" className="h-16 ml-4"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 self-center px-16 py-16  mt-2 
                    lg:w-2/5 lg:max-w-md rounded-md w-full "> 
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === "login" ? "Sign in" : "Sign Up"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === "signup" && (
                                <Input label="Username"
                                id="name" type="name" value={name}
                                onChange={(eve : any)=> setName(eve.target.value)}/>
                            )}
                            <Input label="Email or phone number"
                                id="email" type="email" value={email}
                                onChange={(eve : any)=> setEmail(eve.target.value)}/>
                            <Input label="Password"
                            id="password" type="password" value={password}
                            onChange={(eve : any)=> setPassword(eve.target.value)}/>
                        </div>
                        <button className="bg-[#e50815] py-3 text-white
                        rounded-md w-full mt-10 hover:bg-[#dc2626] transition"
                        onClick={variant === "login" ? login : register}>
                            {variant==="login" ? "Sign In" : "Register"}
                        </button>
                        <p className="text-white text-center mt-5">
                            {variant === "login" ? "- Login with Google Account -" : "- Register Faster with Google Account -"}
                        </p>
                        <div className="flex flex-row items-center gap-4 mt-4 justify-center">
                                <div className="w-10 h-10 bg-white rounded-full
                                flex items-center justify-center cursor-pointer
                                hover:opacity-80 transition"
                                onClick={()=>signIn("google",{
                                    callbackUrl:"/profile"
                                })}>
                                    <FcGoogle size={30}/>
                                </div>
                        </div>
                        <p className="text-neutral-500 mt-12 text-base">
                            {variant==="login" ? "New to Netflix?" : "Already have an account?"}
                            <span className="text-white ml-1 hover:underline cursor-pointer"
                            onClick={toggleVar}>
                                {variant==="login" ? "Sign up now!" : "Go sign in!"}
                            </span>
                        </p>
                        <p className="text-sm text-neutral-500 mt-5">
                            <span className="text-white mr-1">This application is a Netflix clone.</span> It has been developed
                            to improve personal knowledge.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Auth;