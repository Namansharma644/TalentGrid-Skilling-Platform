import mongoose from "mongoose";

const traineeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        traineeId: {
            type: String,
            required: true,
            unique: true
        },

        district: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "District",
            required: true
        },

        educationLevel: String,

        gender: String,

        dateOfBirth: Date
    },
    {
        timestamps: true
    }
);

const Trainee=mongoose.model("Trainee",traineeSchema);
export default Trainee;