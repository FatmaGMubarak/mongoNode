const express = require("express")
const router = express.Router()

const {getAllAds,createAd,findAdByID,deleteAd,updateAd} = require("./controller")

const {checkAuth} = require("../users/middleware")

router.get("/",getAllAds)
router.get("/:id",findAdByID)
router.post("/",checkAuth,createAd)
router.delete("/:id",checkAuth,deleteAd)
router.patch("/:id",checkAuth,updateAd)
module.exports = router