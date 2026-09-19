import mongoose from "mongoose";

const districtSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        state: {
            type: String,
            required: true
        },

        code: {
            type: String,
            required: true,
            unique: true
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

const District = mongoose.model("District", districtSchema);

export default District;