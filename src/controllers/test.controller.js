const profile = (req, res) => {
    res.json({
        message: "Profile accessed successfully",
        user: req.user
    });
};

const govermentDashBoard= (req,res)=>{
    res.json({
        message: "Dashboard accessed successfully",
        user: req.user
    });
}

module.exports = {
    profile,
    govermentDashBoard
};