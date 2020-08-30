const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../.env"),
})
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressHbs = require("express-handlebars");
const ifEquality = require("./views/helpers/ifEquality");
const loginRouter = require("./routes/loginRouter");
const {
  theatrerouter,
  getAllTheatres
} = require("./routes/theatreRouter");
const auth = require("./middleware/auth");
const passiveAuth = require("./middleware/passiveAuth");

const app = express();

// create handlebars engine
const hbs = expressHbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers: {
    ifEquality
  }
});

//express to use handlebars
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//api's
app.get("/", passiveAuth, (request, response) => {
  response.status(200).render("home", {
    layout: "hero",
    title: "Home",
    isAdmin: request.jwt ? request.jwt.sub === "admin" : false
  });
});

app.get("/theatreDetails", auth, async (req, res) => {
  try {
    res.status(200).render("theatre", {
      layout: "navigation",
      title: "theatre Details",
      data: await getAllTheatres()
    });
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server error");
  }
});



app.get("/add-theatre", auth, (req, res) => {
  res.status(200).render("addTheatres", {
    layout: "navigation",
    title: "Add Theatre",
    action: "/api/theatres/addTheatre",
    method: "POST"
  });
});

app.get("/login", (request, response) => {
    response.status(200).render("adminLogin.hbs", {
      layout: "login",
      title: "Admin",
      submitTarget: "/api/login",
      submitMethod: "POST",
      formTitle: "Login"
    });
  });

  app.get("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/");
  });

  app.use("/api/login", loginRouter);

  app.use("/api/theatres", theatrerouter);



// port setup
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}

app.listen((port), () => {
  console.log("server running");
});