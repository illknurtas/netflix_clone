import Input from "@/components/input";
import { useCallback, useState } from "react";

const Auth = () =>{
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[name, setName] = useState('');

    const [variant, setVariant] = useState('login');
    const toggleVar = useCallback(()=>{
        setVariant((currentVariant) => currentVariant ==="login" ? "signup" : "login" );
    },[])

    return(
        <div className="relative h-full w-full
        bg-[url('/img/bg.jpg')]
        bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="">
                    <img src="/img/logo.png" alt="" className="h-40"/>
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
                        rounded-md w-full mt-10 hover:bg-[#dc2626] transition">
                            {variant==="login" ? "Sign In" : "Register"}
                        </button>
                        
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