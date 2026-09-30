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

const getMyEnrollments = async (req, res) => {
    try {
        const providerId = req.providerUser.provider;
        //enrollment-->tp,trainee 
        //with the help of providerId 
        //provider-->tp of provider-->enrollment
        const programs = await TrainingProgram.find({
            provider: providerId
        });

        const programIds = programs.map(
            program => program._id
        );

        const enrollments = await Enrollment.find({
            trainingProgram: {
                $in: programIds
            }
        })
        .populate(
            "trainee",
            "traineeId educationLevel gender district"
        )
        .populate(
            "trainingProgram",
            "name description skill durationInMonths"
        );

        return res.status(200).json({
            message: "Enrollments fetched successfully",
            enrollments
        });

    } catch (error) {

        console.error(
            "Get enrollments error:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createEnrollment,
    getMyEnrollments
};