const District=require("../models/district.model");

const createDistrict = async (req, res) => {
    try {
        const { name, state, code } = req.body;

        if (!name || !state || !code) {
            return res.status(400).json({
                message: "Name, state and code are required"
            });
        }

        const existingDistrict = await District.findOne({
            code: code.toUpperCase()
        });

        if (existingDistrict) {
            return res.status(409).json({
                message: "District already exists"
            });
        }

        const district = await District.create({
            name,
            state,
            code: code.toUpperCase()
        });

        return res.status(201).json({
            message: "District created successfully",
            district
        });

    } catch (error) {

        console.error("Create district error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createDistrict
};