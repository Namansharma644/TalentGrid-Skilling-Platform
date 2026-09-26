const Trainee = require("../models/trainee.model");

const traineeOwnership = async (req, res, next) => {
    try {

        const trainee = await Trainee.findOne({
            userId : req.user.userId
        }).populate("district");

        if (!trainee) {
            return res.status(404).json({
                message: "Trainee not found"
            });
        }

        if (trainee.userId.toString() !== req.user.userId) {
            return res.status(403).json({
                message: "You are not allowed to access this trainee"
            });
        }

        req.trainee = trainee;

        next();

    } catch (error) {

        console.error("Trainee authorization error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    traineeOwnership
};