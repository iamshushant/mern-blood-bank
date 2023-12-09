import mongoose from "mongoose";
import inventoryModels from "../models/inventoryModels.js";
import userModels from "../models/userModels.js";

// ADD INventory
export const createInventory = async (req, res) => {
  try {
    const { email } = req.body;
    //validate
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Donar not found",
      });
    }
    if (req.body.inventoryType === "IN" && user.role !== "donar") {
      return res.status(404).send({
        success: false,
        message: "Not a donar",
      });
    }
    if (req.body.inventoryType === "OUT" && user.role !== "hospital") {
      return res.status(404).send({
        success: false,
        message: "Not a hospital",
      });
    }

    if (req.body.inventoryType === "OUT") {
      const requestBG = req.body.bloodGroup;
      const reqQuan = req.body.quantity;
      const organisation = new mongoose.Types.ObjectId(req.body.userID);
      const totalInQuantity = await inventoryModels.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "IN",
            bloodGroup: requestBG,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);
      const totalIN = totalInQuantity[0]?.total || 0;
      // console.log(remQuan);

      const totalOutQuantity = await inventoryModels.aggregate([
        {
          $match: {
            organisation,
            inventoryType: "OUT",
            bloodGroup: requestBG,
          },
        },
        {
          $group: {
            _id: "$bloodGroup",
            total: { $sum: "$quantity" },
          },
        },
      ]);

      const totalOut = totalOutQuantity[0]?.total || 0;
      const availBlood = totalIN - totalOut;
      // console.log(availBlood);
      // console.log(reqQuan);
      if (availBlood < reqQuan) {
        return res.status(400).send({
          success: false,
          message: `Only ${availBlood} ML Blood available of ${requestBG} Bloodgroup`,
        });
      }
      req.body.hospital = user?._id;
    } else {
      req.body.donor = user?._id;
    }

    const inventory = new inventoryModels(req.body);
    await inventory.save();
    res.status(201).send({
      success: true,
      message: "New Inventory Added",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Error in creating inventory",
      error,
    });
  }
};

//get inventory
export const getInventory = async (req, res) => {
  try {
    const inventory = await inventoryModels
      .find({
        organisation: req.body.userID,
      })
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Successfully get the inventory",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting inventory",
      error,
    });
  }
};
export const getRecentInventory = async (req, res) => {
  try {
    const inventory = await inventoryModels
      .find({
        organisation: req.body.userID,
      })
      .limit(3)
      .populate("donor")
      .populate("hospital")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Successfully get the inventory",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting inventory",
      error,
    });
  }
};

//get consumer record;
export const getInventoryHospitalController = async (req, res) => {
  try {
    const inventory = await inventoryModels
      .find(req.body.filters)
      .populate("donor")
      .populate("hospital")
      .populate("organisation")
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      message: "Successfully get the consumer inventory",
      inventory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting consumer inventory",
      error,
    });
  }
};

export const getDonarController = async (req, res) => {
  try {
    const organisation = req.body.userID;
    const donorID = await inventoryModels.distinct("donor", { organisation });
    // console.log(donorID);
    const donors = await userModels.find({ _id: { $in: donorID } });
    res.status(200).send({
      success: true,
      message: "Donor fetched succesfully",
      donors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting donar",
      error,
    });
  }
};

export const getHospitalController = async (req, res) => {
  try {
    const organisation = req.body.userID;
    const hospitalID = await inventoryModels.distinct("hospital", {
      organisation,
    });
    const hospitalrecord = await userModels.find({
      _id: { $in: hospitalID },
    });
    res.status(200).send({
      success: true,
      message: "Successfully fetched hospital record",
      hospitalrecord,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in getting hospital record",
      error,
    });
  }
};

export const getOrganisationController = async (req, res) => {
  try {
    const donor = req.body.userID;
    const orgID = await inventoryModels.distinct("organisation", { donor });
    const organRecord = await userModels.find({ _id: { $in: orgID } });
    return res.status(200).send({
      success: true,
      message: "Successfully fetched organisation details",
      organRecord,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting organisation",
      error,
    });
  }
};

export const getOrganisationForHospitalController = async (req, res) => {
  try {
    const hospital = req.body.userID;
    const orgID = await inventoryModels.distinct("organisation", { hospital });
    const organRecord = await userModels.find({ _id: { $in: orgID } });
    return res.status(200).send({
      success: true,
      message: "Successfully fetched organisation details",
      organRecord,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting organisation",
      error,
    });
  }
};
