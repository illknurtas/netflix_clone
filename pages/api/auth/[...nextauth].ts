import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import {compare} from "bcrypt";


export default NextAuth({
    providers:[
        Credentials({
            id:"credentials",
            name:"credentials",
            credentials:{
                email:{
                    label:"Email or phone number",
                    type:"text"
                },
                password:{
                    label:"Password",
                    type:"password"
                }
            },
            async authorize(credentials){
                if (!credentials?.email){
                    throw new Error("Please enter a valid email or phone number!");
                }
                else if (!credentials?.password){
                    throw new Error("Your password must be between 4-60 characters!");
                }

                const user = await prismadb.user.findUnique({
                    where:{
                        email:credentials.email
                    }
                });

                if(!user|| !user.hashedPassword){
                    throw new Error("This user does not exist! \
                    Please control your information or create a new account!");
                }

                const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

                if (!isCorrectPassword){
                    throw new Error("Check your password!");
                }
                return user;
            }
        })
    ],
    pages:{
        signIn: '/auth/auth',
    },
    debug: process.env.NODE_ENV === 'development',
    session:{
        strategy:"jwt",
    },
    jwt:{
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET
})