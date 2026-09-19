import mongoose from "mongoose";

const providerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        registrationNumber: {
            type: String,
            unique: true
        },

        district: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "District",
            required: true
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

const Provider=mongoose.model("Provider",providerSchema);
export default Provider;