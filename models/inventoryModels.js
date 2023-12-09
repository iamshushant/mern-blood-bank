import mongoose from "mongoose";

const invertySchema = new mongoose.Schema(
  {
    inventoryType: {
      type: String,
      required: [true, "Inventory type is required"],
      enum: ["IN", "OUT"],
    },
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: ["A+", "A-", "AB+", "O+", "O-", "AB-", "B+", "B-"],
    },
    quantity: {
      type: Number,
      required: [true, "Blood qunatity is required"],
    },
    organisation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "Organisation is required"],
    },
    hospital: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inverntoryType === "OUT";
      },
    },
    donor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: function () {
        return this.inverntoryType === "IN";
      },
    },
    email: {
      type: String,
      required: function () {
        return this.inverntoryType === "IN";
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Inventory", invertySchema);
// model ka naam singular do wo usko khud plural bana deta hai

// The code you provided appears to be using Mongoose, an Object Data Modeling (ODM) library for MongoDB in Node.js. The line of code you've shared is used to create a Mongoose model for the "inventory" collection, which means it defines the structure and behavior of the documents that will be stored in the "inventory" collection in the database.

// However, it's important to note that the code you provided is only defining the model; it does not directly create the collection in the database. The actual creation of the collection happens when you save a document using this model for the first time. Mongoose will automatically create the collection in the database if it doesn't already exist.

// "inventory": The first argument is the name of the model (and also the name of the collection in MongoDB). In this case, it's "inventory."

// In Mongoose, it is a convention to use capital letters for model names. While it is not strictly required by the library, using capital letters for model names is considered good practice to distinguish them from other variables and to follow the standard JavaScript naming conventions, which typically use capital letters for classes and constructor functions.

// When you define a Mongoose model using mongoose.model(), the first argument is usually the singular name of the model, and it is expected to start with a capital letter.
