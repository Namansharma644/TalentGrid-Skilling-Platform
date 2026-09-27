const ProviderUser = require("../models/providerUser.model");

const providerOwnership = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        const providerUser = await ProviderUser
            .findOne({ user: userId });

        if (!providerUser) {
            return res.status(403).json({
                message: "You are not associated with any provider"
            });
        }

        req.providerUser = providerUser;

        next();

    } catch (error) {

        console.error(
            "Provider ownership middleware error:",
            error
        );

        return res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = providerOwnership;