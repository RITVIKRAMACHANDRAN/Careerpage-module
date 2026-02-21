import express, {Request, Response} from "express";
import cors from "cors";
import "dotenv/config";
import adminRoutes = require ("./routes/admin.routes");
import applicationsRoutes from "./routes/applications.routes";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/admin",adminRoutes);
app.use("/apply",applicationsRoutes);
app.post("/hello",(req:Request,res:Response)=> {
    const body = req.body;
    const email = req.body.email;
    const password = req.body.password;
    req.body.email;
    req.body.password;
    res.json({message:"Server working"});
});
app.listen(3000,()=>{
    console.log("Server running");
});
