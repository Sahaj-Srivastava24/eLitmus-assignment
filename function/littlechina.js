const express = require("express");
const router = express.Router();
const User = require("../User");
const sanitize = require("mongo-sanitize");

function pathfour(req, res, next) {
  if (req.user.pathfive) {
    res.send("no");
    return;
  }
  if (req.user.pathsix) {
    res.send("no");
    return;
  }
  if (!req.user.pathfour) {
    User.updateOne(
      { username: req.user.username },
      { $set: { pathfour: true } },
      (e, s) => {}
    );
  }
  next();
}

function pathfive(req, res, next) {
  if (req.user.pathfour) {
    res.send("no");
    return;
  }
  if (req.user.pathtsix) {
    res.send("no");
    return;
  }
  if (!req.user.pathfive) {
    User.updateOne(
      { username: req.user.username },
      { $set: { pathfive: true } },
      (e, s) => {}
    );
  }
  next();
}

function pathsix(req, res, next) {
  if (req.user.pathfive) {
    res.send("no");
    return;
  }
  if (req.user.pathfour) {
    res.send("no");
    return;
  }
  if (!req.user.pathsix) {
    User.updateOne(
      { username: req.user.username },
      { $set: { pathsix: true } },
      (e, s) => {}
    );
  }
  next();
}
router.get("/2_1", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("./little-china/2_1", { team: req.user.team });
  } else {
    res.redirect("../login");
  }
});

router.get("/next2_17", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("./little-china/next2_17", { team: req.user.team });
  } else {
    res.redirect("../login");
  }
});

router.get("/2_9", pathfour, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallmaria2_1)
      res.render("./little-china/2_9", { team: req.user.team });
    else res.redirect("./little-china/2_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/2_10", pathsix, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallmaria2_1)
      res.render("./little-china/2_10", { team: req.user.team });
    else res.redirect("./little-china/2_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/2_11", pathfive, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallmaria2_1)
      res.render("./little-china/2_11", { team: req.user.team });
    else res.redirect("./2_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/2_14", pathfour, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallmaria2_9)
      res.render("./little-china/2_14", { team: req.user.team });
    else res.redirect("./2_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/2_12", pathsix, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallmaria2_10)
      res.render("./little-china/2_12", { team: req.user.team });
    else res.redirect("./2_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/2_16", pathfive, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallmaria2_11)
      res.render("./little-china/2_16", { team: req.user.team });
    else res.redirect("./2_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/2_15", pathfour, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallmaria2_14)
      res.render("./little-china/2_15", { team: req.user.team });
    else res.redirect("./2_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/2_17", pathfive, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallmaria2_16)
      res.render("./little-china/2_17", { team: req.user.team });
    else res.redirect("./2_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/2_18", pathfive, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallmaria2_17)
      res.render("./little-china/2_18", { team: req.user.team });
    else res.redirect("./2_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/2_13", function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallmaria2_15)
      res.render("./little-china/2_13", { team: req.user.team });
    else if (req.user.wallmaria2_18)
      res.render("./little-china/2_13", { team: req.user.team });
    else if (req.user.wallmaria2_12)
      res.render("./little-china/2_13", { team: req.user.team });
    else res.redirect("./2_1");
  } else {
    res.redirect("../login");
  }
});

router.post("/2_1", function (req, res) {
  const correctAnswer = "80";
  const submittedAnswer = sanitize(req.body.answer);
  let score = req.user.score;
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallmaria2_1: true } },
      (e, s) => {}
    );
    if (!req.user.wallmaria2_1) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 50 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/dead");
  } else {
    // console.log("try again1");
    res.redirect("/little-china/2_1");
  }
});

router.post("/2_9", function (req, res) {
  const correctAnswer = "kingjohnofengland";
  let score = req.user.score;
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallmaria2_9: true } },
      (e, s) => {}
    );
    if (!req.user.wallmaria2_9) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 80 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/little-china/2_14");
  } else {
    // console.log("try again1");
    res.redirect("/little-china/2_9");
  }
});

router.post("/2_11", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "ruiner";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallmaria2_11: true } },
      (e, s) => {}
    );
    if (!req.user.wallmaria2_11) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 60 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/little-china/2_16");
  } else {
    // console.log("try again1");
    res.redirect("/little-china/2_11");
  }
});


router.post("/2_14", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "ruiner";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallmaria2_14: true } },
      (e, s) => {}
    );
    if (!req.user.wallmaria2_14) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 80 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/little-china/2_15");
  } else {
    // console.log("try again1");
    res.redirect("/little-china/2_14");
  }
});

router.post("/2_15", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "cloudbank";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallmaria2_15: true } },
      (e, s) => {}
    );
    if (!req.user.wallmaria2_15) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 80 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/little-china/2_13");
  } else {
    // console.log("try again1");
    // res.redirect("/levelone");
    res.redirect("/little-china/2_15");
  }
});

router.post("/2_16", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "adolfhitler";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallmaria2_16: true } },
      (e, s) => {}
    );
    if (!req.user.wallmaria2_16) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 60 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/little-china/2_17");
  } else {
    // console.log("try again1");
    res.redirect("/little-china/2_16");
  }
});

router.post("/2_17", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "64716";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallmaria2_17: true } },
      (e, s) => {}
    );
    if (!req.user.wallmaria2_17) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 60 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/little-china/2_18");
  } else {
    // console.log("try again1");
    res.redirect("/little-china/2_17");
  }
});

router.post("/2_18", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "kingjohnofengland";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallmaria2_18: true } },
      (e, s) => {}
    );
    if (!req.user.wallmaria2_18) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 60 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/little-china/2_13");
  } else {
    // console.log("try again1");
    res.redirect("/little-china/2_18");
  }
});

router.post("/2_13", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "darrapolytechnics1pulsar";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallmaria2_13: true } },
      (e, s) => {}
    );
    if (!req.user.wallmaria2_13) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 200 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("../start");
  } else {
    // console.log("try again1");
    res.redirect("/little-china/2_13");
  }
});
module.exports = router;
