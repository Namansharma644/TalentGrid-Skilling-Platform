const mongoose=require("mongoose");

const providerUserSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        },

        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Provider",
            required: true
        },

        designation: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

const providerUser=mongoose.model("providerUser",providerUserSchema);
module.exports=providerUser;