const Trainee = require("../models/trainee.model");
const District = require("../models/district.model");

const createTraineeProfile = async (req, res) => {
    try {

        const {
            district,
            educationLevel,
            gender,
            dateOfBirth
        } = req.body;

        if (!district) {
            return res.status(400).json({
                message: "District is required"
            });
        }

        const existingTrainee = await Trainee.findOne({
            userId: req.user.userId
        });

        if (existingTrainee) {
            return res.status(409).json({
                message: "Trainee profile already exists"
            });
        }

        const districtExists = await District.findOne({
            _id: district,
            isActive: true
        });

        if (!districtExists) {
            return res.status(400).json({
                message: "Invalid or inactive district"
            });
        }

       
        const traineeId = `TG-${Date.now()}`;

   
        const trainee = await Trainee.create({
            userId: req.user.userId,
            traineeId,
            district,
            educationLevel,
            gender,
            dateOfBirth
        });

        return res.status(201).json({
            message: "Trainee profile created successfully",
            trainee
        });

    } catch (error) {

        console.error("Create trainee error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};



const getMyTraineeProfile = async (req, res) => {
    try {

        const trainee = await Trainee.findOne({
             userId : req.user.userId
        }).populate("district");

        if (!trainee) {
            return res.status(404).json({
                message: "Trainee profile not found"
            });
        }

        return res.status(200).json({
            message: "Trainee profile fetched successfully",
            trainee
        });

    } catch (error) {

        console.error("Get trainee profile error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createTraineeProfile,
    getMyTraineeProfile
};