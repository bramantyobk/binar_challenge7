const { urlencoded } = require("express");
const morgan = require("morgan");
const express = require("express");
const methodOverride = require("method-override");
const app = express();
const { runInNewContext } = require("vm");
const path = require("path");
const { resourceUsage } = require("process");
const port = 4000;
const passport = require("./lib/passport");

//middleware
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.use(passport.initialize());

//NEW ROUTING
const pageRoutes = require("./routes/page.routes");
const authRoutes = require("./routes/auth.routes");
const gameRoutes = require("./routes/game.routes");
const apiRoutes = require("./routes/api.routes");

app.use(pageRoutes);
app.use(authRoutes);
app.use(gameRoutes);
app.use(apiRoutes);

// =============== ERROR HANDLING ===============
// ***************** INTERNAL ERROR *************
app.use((err, req, res, next) => {
	res.status(500).json({ message: err.message });
});
// ***************** 404 ERROR ******************
app.use((req, res, next) => {
	res.status(404).json({ message: "error 404. please check your url" });
});

app.listen(port, () => {
	console.log("listening on port " + port);
});
