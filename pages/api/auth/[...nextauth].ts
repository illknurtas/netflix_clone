import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import {compare} from "bcrypt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";


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
                if (!credentials?.email ||!credentials?.password ){
                    throw new Error("Please control your email or phone number and password!");
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
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID||"",
            clientSecret: process.env.GITHUB_SECRET||""
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID||"",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET||""
        })
    ],
    pages:{
        signIn: '/auth/auth',
    },
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    session:{
        strategy:"jwt",
    },
    jwt:{
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },
    secret: process.env.NEXTAUTH_SECRET
})