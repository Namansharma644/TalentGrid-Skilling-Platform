const Provider=require("../models/provider.model");
const District=require("../models/district.model");

const createProvider=async (req,res)=>{
    try
    {
         const {
            name,
            registrationNumber,
            district
        } = req.body;

       
        if (!name || !district) {
            return res.status(400).json({
                message: "Name and district are required"
            });
        }

        const districtExists = await District.findOne({
            _id: district,
            isActive: true
        });

        if (!districtExists) {
            return res.status(404).json({
                message: "District not found or inactive"
            });
        }

        if (registrationNumber) {

            const existingProvider = await Provider.findOne({
                registrationNumber
            });

            if (existingProvider) {
                return res.status(409).json({
                    message: "Provider with this registration number already exists"
                });
            }
        }

        const provider = await Provider.create({
            name,
            registrationNumber,
            district
        });

        return res.status(201).json({
            message: "Provider created successfully",
            provider
        });
    }
    catch(error)
    {
       console.error("Create provider error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
}
module.exports={
    createProvider
}