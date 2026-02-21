import "dotenv/config";
import express, {Request, Response} from "express";
import * as jwtLib  from "jsonwebtoken";
import { isAdmin } from "../router/auth.router";
import { PrismaClient } from "@prisma/client";
import { getPrisma } from "../lib/prisma";;
const router = express.Router();
router.post("/login",(req:Request,res:Response)=> {
    const body = req.body ||{};
    const email = body.email;
    const password = body.password;

    if(!email || !password){
        return res.status(400).json({message:"Missing"});
    }
    const adminMail = "admin@test.com";
    const adminPassword ="1234";

    if(!email !== !adminMail || !password !== !adminPassword ){
        return res.status(401).json({message:"login error"});
    }
    const loadToken = jwtLib.sign(
        {Payload : "admin"}, "mykey" , {expiresIn: "1h"});
    res.json({message:"WELCOME ADMIN", token : loadToken});
});
router.post("/jobs", isAdmin,async (req,res) => {
    const prisma = getPrisma();
    const{ jobTitle , jobInfo , place , jobType} = req.body;
    try{
        const createPosition = await prisma.position.create({
            data :{
                jobTitle,
                jobInfo,
                place,
                jobType,
                isActive:true
    }
    });
    res.json(createPosition);
}catch(err){
    res.status(500).json({message : "JOB CREATION UNSUCCESSFUL"});
}
});
router.patch("/jobs/:id", isAdmin,async (req, res) => {
    const prisma = getPrisma();
    const jobsId = Number(req.params.id);
    const updated = await prisma.position.update({
        where:{id:jobsId},
        data:req.body
    });
    res.json(updated);
});
router.delete("/jobs/:id", isAdmin,async (req, res) => {
    const prisma = getPrisma();
    const jobsId = Number(req.params.id);
    await prisma.position.update({
        where:{id:jobsId},
        data:{isActive:false}
    });
    res.json({message:"deleted"});
});
router.patch("/jobs/toggle/:id", isAdmin,async (req, res) => {
    const prisma = getPrisma();
    const jobsId = Number(req.params.id);
    const jobs = await prisma.position.findUnique({
        where:{id:jobsId},
    });
    const updated = await prisma.position.update({
        where:{id:jobsId},
        data:{isActive:!jobs?.isActive}
    });
    res.json(updated);
});
router.get("/jobs" , async(req,res) => {
    const prisma = getPrisma();
    const jobs = await prisma.position.findMany({
        where:{isActive:true}
    });
    res.json(jobs);
});
router.get("/dash", isAdmin , (req,res) => {
    res.json({message:"admin dash access granted"});
});
export = router;
