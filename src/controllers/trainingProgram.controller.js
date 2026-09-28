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

const updateTrainingProgram = async (req, res) => {
    try {

        const { programId } = req.params;

        const {
            name,
            description,
            skill,
            durationInMonths
        } = req.body;

        const updateData = {};

        if (name !== undefined) {
            updateData.name = name;
        }

        if (description !== undefined) {
            updateData.description = description;
        }

        if (skill !== undefined) {
            updateData.skill = skill;
        }

        if (durationInMonths !== undefined) {
            updateData.durationInMonths = durationInMonths;
        }

         if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "No valid fields provided for update"
            });
        }

        const updatedProgram = await TrainingProgram.findOneAndUpdate(
            {
                _id: programId,
                provider: req.providerUser.provider
            },
            updateData,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProgram) {
            return res.status(404).json({
                message: "Training program not found or you are not authorized"
            });
        }

        return res.status(200).json({
            message: "Training program updated successfully",
            program: updatedProgram
        });

    } catch (error) {

        console.error(
            "Update training program error:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });
    }
};

const deactivateTrainingProgram = async (req, res) => {
    try {
        const { programId } = req.params;

        const updatedProgram = await TrainingProgram.findOneAndUpdate(
            {
                _id: programId,
                provider: req.providerUser.provider
            },
            {
                isActive: false
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedProgram) {
            return res.status(404).json({
                message: "Training program not found or you are not authorized"
            });
        }

        return res.status(200).json({
            message: "Training program deactivated successfully",
            program: updatedProgram
        });

    } catch (error) {

        console.error(
            "Deactivate training program error:",
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
    getTrainingProgram,
    updateTrainingProgram,
    deactivateTrainingProgram
};