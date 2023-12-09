import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import inventoryRoutes from "./routes/inventoryRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import path from path;

const app = express();

//configure env
dotenv.config();

//connect databases
connectDB();

//middlewares
app.use(cors()); // used to connect backend and frontend port react port is 3000 and express port is 8080
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./client/build')));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/admin", adminRoutes);

//rest API
app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`.bgBlue.white);
});
