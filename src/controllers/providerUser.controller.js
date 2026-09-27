const User = require("../models/user.model");
const Provider = require("../models/provider.model");
const ProviderUser = require("../models/providerUser.model");

const createProviderUser = async (req, res) => {
    try {
        const {
            userId,
            providerId,
            designation
        } = req.body;

        if (!userId || !providerId) {
            return res.status(400).json({
                message: "userId and providerId are required"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.role !== "provider_user") {
            return res.status(400).json({
                message: "User does not have provider_user role"
            });
        }

        const provider = await Provider.findOne({
            _id: providerId,
            isActive: true
        });

        if (!provider) {
            return res.status(404).json({
                message: "Provider not found or inactive"
            });
        }

        const existingProviderUser = await ProviderUser.findOne({
            user: userId
        });

        if (existingProviderUser) {
            return res.status(409).json({
                message: "User is already assigned to a provider"
            });
        }

        const providerUser = await ProviderUser.create({
            user: userId,
            provider: providerId,
            designation
        });

        return res.status(201).json({
            message: "Provider user created successfully",
            providerUser
        });

    } catch (error) {

        console.error("Create provider user error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createProviderUser
};