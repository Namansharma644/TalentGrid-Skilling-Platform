const DistrictOfficer = require("../models/districtOfficer.model");

const districtOfficerOwnership = async (req, res, next) => {
    try {

        const officer = await DistrictOfficer.findOne({
            user: req.user.userId
        }).populate("district");

        if (!officer) {
            return res.status(404).json({
                message: "District officer profile not found"
            });
        }

        req.districtOfficer = officer;

        next();

    } catch (error) {

        console.error(
            "District officer ownership error:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = districtOfficerOwnership;