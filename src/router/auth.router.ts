import {Request , Response , NextFunction} from "express";
import jwtLib from "jsonwebtoken";
export const isAdmin = (req: Request, res:Response, next:NextFunction) =>{
    const authCreator = req.headers.authorization;
    if(!authCreator){
        return res.status(401).json({message:"TOKEN MISSING"});
    }
    const piece = (authCreator as string).split(" ");
    const tokenVal = piece[1];
    try{
        jwtLib.verify(tokenVal as string,"mykey");
        next();        
    } catch{
        res.status(401).json({message:"TOKEN INVALID"});
    }

};