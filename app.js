require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser");
// const ejs = require("ejs");
const mongoose = require("mongoose");

const session = require("express-session");
const encrypt = require("mongoose-encryption");
const passport = require("passport");
const subway = require("./function/subway.js");
const littlechina = require("./function/littlechina.js");
const uac = require("./function/uac.js");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const sanitize = require("mongo-sanitize");
const app = express();
const User = require("./User");
const CronJob = require("cron").CronJob;
const LocalStrategy = require("passport-local").Strategy;

let resultDB;
// const job = new CronJob(
//   "0 */2 * * * *",
//   function () {
//     const d = new Date();
//     console.log("Running job", d);
//     User.find()
//       .sort({ score: -1 })
//       .then(function (result) {
//         resultDB = result;
//         console.log(resultDB[0].score);
//       });
//   },
//   null,
//   true,
//   "America/Los_Angeles"
// );
//SETTING UP OPTIONS

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(express.static("public"));
app.set("view engine", "ejs");
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(limiter);
app.use(cors(corsOptions));
app.use(
  session({
    secret: "bot",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

app.use("/subway", subway);
app.use("/little-china", littlechina);
app.use("/uac", uac);

mongoose.connect(
  "mongodb://localhost:27017",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected DB");
  }
);
mongoose.set("useCreateIndex", true);

function currentTime() {
  var today = new Date();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
}

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// HOME ROUTE

app.all("/", function (req, res) {
  res.render("home");
});

app.get("/home", function (req, res) {
  res.render("home");
});
app.get("/reg", (req, res) => {
  res.render("pagenotreq");
});
// app.post("/reg", (req, res) => {
//   var user = new User(req.body);
//   user.save(function (err, res) {
//     if (err) throw err;
//     console.log("Team Reg: ", res);
//   });
//   res.redirect("/login");
// });

app.post("/reg", function (req, res) {
  User.register(
    new User({ email: req.body.email, username: req.body.username }),
    req.body.password,
    function (err, user) {
      if (err) {
        res.json({
          success: false,
          message: "Your account could not be saved. Error: " + err,
        });
      } else {
        req.login(user, (er) => {
          if (er) {
            res.json({ success: false, message: er });
          } else {
            res.json({ success: true, message: "Your account has been saved" });
          }
        });
      }
    }
  );
});

// START ROUTE
app.get("/start", function (req, res) {
  const tsubway8 = req.user?.subway8 ? "Reached" : "Not Answered";
  const twallmaria2_13 = req.user?.wallmaria2_13 ? "Reached" : "Not Answered";
  const twallshina3_24 = req.user?.wallshina3_24 ? "Reached" : "Not Answered";
  const tscore = req.user?.score;
  console.log(req.user);
  if (req.isAuthenticated()) {
    if (req.user.username === "admin@gmail.com") {
      res.redirect("/leaderboard");
    } else {
      res.render("./start/start", {
        score: tscore,
        subway8: tsubway8,
        wallmaria2_13: twallmaria2_13,
        wallshina3_24: twallshina3_24,
      });
    }
  } else {
    res.redirect("login");
  }
  // res.render('ind')
});

app.get("/start2", function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.subway1) res.render("./start/start2");
    else res.redirect("subway/1");
  } else {
    res.redirect("login");
  }
});

app.get("/start3", function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallmaria2_1) res.render("./start/start3");
    else res.redirect("little-china/2_1");
  } else {
    res.redirect("login");
  }
});

app.get("/start4", function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallshina3_1) res.render("./start/start4");
    else res.redirect("uac/3_1");
  } else {
    res.redirect("login");
  }
});

//PATH SET ROUTES

app.get("/setone", function (req, res) {
  res.status(200);
  res.redirect("/subway/1_2");
});

app.post("/settwo", function (req, res) {
  res.status(200);
  res.redirect("/subway/1_3");
});

app.post("/aviral_settwo", function (req, res) {
  res.status(200);
  score = req.user.score;
  if (!req.user.subway1) {
    User.updateOne(
      { username: req.user.username },
      { $set: { score: score + 50 } },
      (e, s) => {}
    );
  }

  res.redirect("/dead");
});

app.get("/dead", function (req, res) {
  res.render("dead");
});

app.get("/congo", function (req, res) {
  res.render("congo");
});

app.get("/ind2", function (req, res) {
  res.render("ind2");
});

app.post("/setthree", function (req, res) {
  res.status(200);
  res.redirect("/subway/1_4");
});

app.post("/setfour", function (req, res) {
  res.status(200);
  res.redirect("/subway/1_2");
});

app.post("/setfive", function (req, res) {
  res.status(200);
  res.redirect("/subway/1_3");
});
app.post("/setsix", function (req, res) {
  res.status(200);
  res.redirect("/subway/1_4");
});
app.post("/setseven", function (req, res) {
  res.status(200);
  res.redirect("/subway/1_2");
});

app.post("/seteight", function (req, res) {
  res.status(200);
  res.redirect("/subway/1_3");
});
app.post("/setnine", function (req, res) {
  res.status(200);
  res.redirect("/subway/1_4");
});
// REGISTER ROUTE

// LOGIN ROUTE

app.get("/login", function (req, res) {
  if (req.isAuthenticated()) {
    // console.log(req.user);
    res.redirect("/start");
  } else {
    res.render("login");
  }
});

// app.post("/login", function (req, res) {
//   const secret = sanitize(req.body.secret);
//   // console.log(secret)
//   if (secret === "letsgobcs" || secret === "LETSGOBCS") {
//     const user = new User({
//       username: sanitize(req.body.username),
//       password: sanitize(req.body.password),
//     });
//     console.log(req.body.password);
//     req.login(user, function (err) {
//       console.log(user, err);
//       if (err) {
//         console.log(err);
//       } else {
//         // passport.authenticate("local")(req, res, function () {
//         //   console.log("loginned");
//         //   res.redirect("/start");
//         // });
//         passport.authenticate(
//           "local",
//           { failureRedirect: "/login" },
//           (req,
//           res,
//           function () {
//             console.log("loginned");
//             res.redirect("/start");
//           })
//         );
//       }
//     });
//   } else res.send("Wrong Secret - No access granted");
// });

app.post("/login", function (req, res) {
  if (!req.body.username) {
    res.json({ success: false, message: "Username was not given" });
  } else if (!req.body.password) {
    res.json({ success: false, message: "Password was not given" });
  } else {
    const user = new User({
      username: sanitize(req.body.username),
      password: sanitize(req.body.password),
    });
    req.login(user, function (err) {
      if (err) {
      } else {
        passport.authenticate("local", function (err, user, info) {
          if (err) {
            res.json({ success: false, message: err });
          } else {
            if (!user) {
              res.json({
                success: false,
                message: "username or password incorrect",
              });
            } else {
              if (
                req.body.username === "admin@gmail.com" &&
                req.body.passport === "admin"
              ) {
                res.redirect("/leaderboard");
              } else {
                res.redirect("/start");
              }
            }
          }
        })(req, res);
      }
    });
  }
});

app.get("/leaderboard", (req, res) => {
  User.find()
    .sort({ score: -1 })
    .then(function (result) {
      console.log(result);
      resultDB = result;
      console.log(resultDB[0].score);
      console.log("Connected db");
      res.render("leaderboard.ejs", {
        data1: resultDB[0],
        data2: resultDB[1],
        data3: resultDB[2],
      });
    });
});
// });
// CONGRATS PAGE
app.get("/congrats", function (req, res) {
  const levelFifteenStatus = req.user.levelfifteen;
  const teamName = req.user.team;
  if (levelFifteenStatus) {
    res.render("congrats", { team: teamName });
  } else {
    res.redirect("/levelone");
  }
});

// QUALIFICATION PAGE

app.get("/qualify", function (req, res) {
  res.render("winners");
});
app.get("/theforbiddenforest", function (req, res) {
  res.render("theforbiddenforest");
});
// EVENTS PAGEx

app.get("/events", function (req, res) {
  res.render("events");
});

// LOGOUT ROUTE

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

port = process.env.PORT || 3000;

app.listen(port, function (req, res) {
  console.log("Site is running successfully!");
  // job.start();
});
