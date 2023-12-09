import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createInventory,
  getDonarController,
  getHospitalController,
  getInventory,
  getInventoryHospitalController,
  getOrganisationController,
  getOrganisationForHospitalController,
  getRecentInventory,
} from "../controller/inventoryController.js";

const router = express.Router();

router.post("/create-inventory", requireSignIn, createInventory);

router.get("/get-inventory", requireSignIn, getInventory);

router.get("/get-recent-inventory", requireSignIn, getRecentInventory);

router.get("/get-donar", requireSignIn, getDonarController);

router.get("/get-hospital", requireSignIn, getHospitalController);

router.post(
  "/get-consumer-inventory",
  requireSignIn,
  getInventoryHospitalController
);

router.get("/get-organisation", requireSignIn, getOrganisationController);

router.get(
  "/get-organisation-for-hospital",
  requireSignIn,
  getOrganisationForHospitalController
);

export default router;
