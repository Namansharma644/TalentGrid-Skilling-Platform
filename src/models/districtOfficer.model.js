import mongoose from "mongoose";

const districtOfficerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        district: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "District",
            required: true
        },

        designation: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const districtOfficer=mongoose.model("districtOfficer",districtOfficerSchema);
export default districtOfficer;