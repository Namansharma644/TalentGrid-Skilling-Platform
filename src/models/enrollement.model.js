const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
    {
        trainee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trainee",
            required: true
        },

        trainingProgram: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TrainingProgram",
            required: true
        },

        enrolledAt: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: [
                "ENROLLED",
                "ACTIVE",
                "COMPLETED",
                "DROPPED"
            ],
            default: "ENROLLED"
        },

        completedAt: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

enrollmentSchema.index(
    {
        trainee: 1,
        trainingProgram: 1
    },
    {
        unique: true
    }
);

const Enrollment = mongoose.model(
    "Enrollment",
    enrollmentSchema
);

module.exports = Enrollment;