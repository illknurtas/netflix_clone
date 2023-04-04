import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import { result, without } from "lodash";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        if(req.method === "POST"){
            const {currentUser} = await serverAuth(req);
            const {movieId} = req.body;
            const existingMovie = await prismadb.movie.findUnique({
                where:{
                    id:movieId
                }
            });
            if(!existingMovie){
                throw new Error("Invalid movie");
            }
            const user = await prismadb.user.update({
                where:{
                    email: currentUser.email || "",
                },
                data:{
                    favoriteIds:{
                        push: movieId
                    }
                }
            });
            return res.status(200).json(user);
        }

        if(req.method === "DELETE"){
            const {currentUser} = await serverAuth(req);
            const {movieId} = req.body;
            const existingMovie = await prismadb.movie.findUnique({
                where:{
                    id: movieId
                }
            });
            if (!existingMovie){
                throw new Error('Invalid movie!');
            }
            const updateFavouriteIds = without(currentUser.favoriteIds,movieId);
            const updateUser = await prismadb.user.update({
                where:{
                    email: currentUser.email || '',
                },
                data:{
                    favoriteIds: updateFavouriteIds
                }
            });
            return res.status(200).json(updateUser);
        }
    } catch (error) {
        console.error(error);
        return res.status(400).end();
    }
}