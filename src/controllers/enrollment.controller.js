const Enrollment = require("../models/enrollment.model");
const TrainingProgram = require("../models/trainingProgram.model");
const Trainee = require("../models/trainee.model");

const createEnrollment = async (req, res) => {
    try {
        const { trainee, trainingProgram } = req.body;

        if (!trainee || !trainingProgram) {
            return res.status(400).json({
                message: "Trainee and training program are required"
            });
        }

        const program = await TrainingProgram.findById(trainingProgram);

        if (!program) {
            return res.status(404).json({
                message: "Training program not found"
            });
        }

        if (
            program.provider.toString() !==
            req.providerUser.provider.toString()
        ) {
            return res.status(403).json({
                message: "You are not authorized to enroll trainees in this program"
            });
        }

        const traineeExists = await Trainee.findById(trainee);

        if (!traineeExists) {
            return res.status(404).json({
                message: "Trainee not found"
            });
        }

        const existingEnrollment = await Enrollment.findOne({
            trainee,
            trainingProgram
        });

        if (existingEnrollment) {
            return res.status(409).json({
                message: "Trainee is already enrolled in this program"
            });
        }

        const enrollment = await Enrollment.create({
            trainee,
            trainingProgram
        });

        return res.status(201).json({
            message: "Trainee enrolled successfully",
            enrollment
        });

    } catch (error) {

        console.error(
            "Create enrollment error:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createEnrollment
};