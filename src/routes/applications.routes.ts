const multer = require("multer");
import { Router } from "express";
import { getPrisma } from "../lib/prisma";
const router = Router();
const storage = multer.diskStorage({
    destination : (req:any, file:any , cb:any) => {
        cb(null,"resumedata/");
    },
    filename : (req:any , file:any , cb:any) => {
        cb(null,Date.now()+"-"+file.originalname);
    }
});
const upload = multer({storage});
router.post("/:jobsId" ,upload.single("resume") ,async(req,res) => {
    const prisma = getPrisma();
    const{jobsId} = req.params;
    const {applicantId , mailId , contactNo } = req.body;
    const filePath = (req as any).file?.path ||"";
    const app = await prisma.candidates.create({
        data:{
            positionId:Number(jobsId),
            applicantId,
            mailId,
            contactNo,
            filePath
        }
    });
    res.json(app);
});
router.patch("/status/:id", async (req,res) => {
    const prisma = getPrisma();
    const {id} = req.params;
    const{stage} = req.body;
    const updated = await prisma.candidates.update({
        where:{id:Number(id)},
        data:{status}
    });
    res.json(updated);
});
export = router;