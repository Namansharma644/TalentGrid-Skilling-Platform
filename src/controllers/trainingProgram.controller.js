const TrainingProgram = require("../models/trainingProgram.model");

const createTrainingProgram = async (req, res) => {
    try {
        const {
            name,
            description,
            skill,
            durationInMonths
        } = req.body;

        if (!name || !skill || !durationInMonths) {
            return res.status(400).json({
                message: "Name, skill and durationInMonths are required"
            });
        }

        const providerId = req.providerUser.provider;

        const trainingProgram = await TrainingProgram.create({
            provider: providerId,
            name,
            description,
            skill,
            durationInMonths
        });

        return res.status(201).json({
            message: "Training program created successfully",
            trainingProgram
        });

    } catch (error) {

        console.error(
            "Create training program error:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });
    }
};

const getMyTrainingPrograms = async (req, res) => {
    try {

        const providerId = req.providerUser.provider;

        const programs = await TrainingProgram.find({
            provider: providerId
        });

        return res.status(200).json({
            message: "Training programs fetched successfully",
            programs
        });

    } catch (error) {

        console.error(
            "Get training programs error:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });
    }
};

const getTrainingProgram = async (req, res) => {
    try {
        const { programId } = req.params;

        const program = await TrainingProgram.findById(programId);

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
                message: "You are not authorized to access this program"
            });
        }

        return res.status(200).json({
            message: "Training program fetched successfully",
            program
        });

    } catch (error) {
        console.error(
            "Get training program error:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createTrainingProgram,
    getMyTrainingPrograms,
    getTrainingProgram
};