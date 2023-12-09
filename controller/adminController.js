import userModels from "../models/userModels.js";

export const getDonorListController = async (req, res) => {
  try {
    const donorData = await userModels
      .find({ role: "donar" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      TotalCount: donorData.length,
      message: "Successfully fetched donorList",
      donorData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in DonorList API",
      error,
    });
  }
};
export const getHospitalListController = async (req, res) => {
  try {
    const hospitalData = await userModels
      .find({ role: "hospital" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      TotalCount: hospitalData.length,
      message: "Successfully fetched HospitalList",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in HospitalList API",
      error,
    });
  }
};
export const getOrgListController = async (req, res) => {
  try {
    const orgData = await userModels
      .find({ role: "organisation" })
      .sort({ createdAt: -1 });
    return res.status(200).send({
      success: true,
      TotalCount: orgData.length,
      message: "Successfully fetched ORGList",
      orgData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in ORGList API",
      error,
    });
  }
};

export const deleteDonorController = async (req, res) => {
  try {
    await userModels.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Donor API",
      error,
    });
  }
};

export const deleteHospitalController = async (req, res) => {
  try {
    await userModels.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting Hospital API",
      error,
    });
  }
};

export const deleteOrgController = async (req, res) => {
  try {
    await userModels.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Deleting ORG API",
      error,
    });
  }
};
