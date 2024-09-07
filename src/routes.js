const postRouting = require("./resources/posts/routes")
const userRoutes = require("./resources/users/routes")
const adsRouting = require("./resources/ads/routes")
module.exports = (app) => {
app.use("/posts",postRouting)
app.use("/users",userRoutes)
app.use("/ads",adsRouting)
}