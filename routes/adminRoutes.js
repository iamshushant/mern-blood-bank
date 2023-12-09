import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  deleteDonorController,
  deleteHospitalController,
  deleteOrgController,
  getDonorListController,
  getHospitalListController,
  getOrgListController,
} from "../controller/adminController.js";

const router = express.Router();

router.get("/donorList", requireSignIn, isAdmin, getDonorListController);
router.delete(
  "/deletedonor/:id",
  requireSignIn,
  isAdmin,
  deleteDonorController
);

router.get("/hospitalList", requireSignIn, isAdmin, getHospitalListController);
router.delete(
  "/deletehospital/:id",
  requireSignIn,
  isAdmin,
  deleteHospitalController
);

router.get("/orgList", requireSignIn, isAdmin, getOrgListController);
router.delete("/deleteorg/:id", requireSignIn, isAdmin, deleteOrgController);

export default router;
