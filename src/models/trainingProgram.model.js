const mongoose = require("mongoose");

const trainingProgramSchema = new mongoose.Schema(
    {
        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Provider",
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        skill: {
            type: String,
            required: true,
            trim: true
        },

        durationInMonths: {
            type: Number,
            required: true,
            min: 1
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

const TrainingProgram = mongoose.model(
    "TrainingProgram",
    trainingProgramSchema
);

module.exports = TrainingProgram;