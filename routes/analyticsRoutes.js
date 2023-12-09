import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import { getBloodGroupDataController } from "../controller/anayticsContoller.js";

const router = express.Router();

router.get("/get-bloodgroupData", requireSignIn, getBloodGroupDataController);

export default router;
