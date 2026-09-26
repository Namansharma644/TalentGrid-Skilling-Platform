const DistrictOfficer=require("../models/districtOfficer.model");
const District=require("../models/district.model");
const User=require("../models/user.model");

const createDistrictOfficer = async (req, res) => {
    try {

        const { userId, district, designation } = req.body;

      
        if (!userId || !district) {
            return res.status(400).json({
                message: "userId and district are required"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        
        if (user.role !== "district_officer") {
            return res.status(400).json({
                message: "User is not a district officer"
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

        
        const existingOfficer = await DistrictOfficer.findOne({
            user: userId
        });

        if (existingOfficer) {
            return res.status(409).json({
                message: "District officer profile already exists"
            });
        }

        
        const officer = await DistrictOfficer.create({
            user: userId,
            district,
            designation
        });

        return res.status(201).json({
            message: "District officer created successfully",
            officer
        });

    } catch (error) {

        console.error("Create district officer error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createDistrictOfficer
};
