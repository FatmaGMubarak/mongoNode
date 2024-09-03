const postRouting = require("./resources/posts/routes")

module.exports = (app) => {
app.use("/posts",postRouting)
}