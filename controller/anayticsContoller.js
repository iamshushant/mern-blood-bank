import inventoryModels from "../models/inventoryModels.js";
import mongoose from "mongoose";

export const getBloodGroupDataController = async (req, res) => {
  try {
    const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"];
    const bloodGroupData = [];
    const organisation = new mongoose.Types.ObjectId(req.body.userID);

    await Promise.all(
      bloodGroups.map(async (bloodGroup) => {
        // Count IN bloodgroup
        const totalIN = await inventoryModels.aggregate([
          {
            $match: {
              inventoryType: "IN",
              bloodGroup: bloodGroup,
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        const totalOUT = await inventoryModels.aggregate([
          {
            $match: {
              inventoryType: "OUT",
              bloodGroup: bloodGroup,
              organisation,
            },
          },
          {
            $group: {
              _id: null,
              total: { $sum: "$quantity" },
            },
          },
        ]);
        // console.log(totalIN);
        // console.log(totalOUT);
        const totalAvail = (totalIN[0]?.total || 0) - (totalOUT[0]?.total || 0);
        //PUSH DATA
        bloodGroupData.push({
          bloodGroup,
          totalIn: totalIN[0]?.total || 0,
          totalOut: totalOUT[0]?.total || 0,
          totalAvail,
        });
      })
    );
    return res.status(200).send({
      success: true,
      message: "Seccessfully fetched bloodgroup data",
      bloodGroupData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Analytics Api",
      error,
    });
  }
};
