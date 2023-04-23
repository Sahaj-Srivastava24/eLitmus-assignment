const express = require("express");
const router = express.Router();
const User = require("../User");
const sanitize = require("mongo-sanitize");

function pathseven(req, res, next) {
  if (req.user.patheight) {
    res.send("no");
    return;
  }
  if (req.user.pathnine) {
    res.send("no");
    return;
  }
  if (!req.user.pathseven) {
    User.updateOne(
      { username: req.user.username },
      { $set: { pathseven: true } },
      (e, s) => {}
    );
  }
  next();
}

function patheight(req, res, next) {
  if (req.user.pathnine) {
    res.send("no");
    return;
  }
  if (req.user.pathseven) {
    res.send("no");
    return;
  }
  if (!req.user.patheight) {
    User.updateOne(
      { username: req.user.username },
      { $set: { patheight: true } },
      (e, s) => {}
    );
  }
  next();
}

function pathnine(req, res, next) {
  if (req.user.patheight) {
    res.send("no");
    return;
  }
  if (req.user.pathseven) {
    res.send("no");
    return;
  }
  if (!req.user.pathnine) {
    User.updateOne(
      { username: req.user.username },
      { $set: { pathnine: true } },
      (e, s) => {}
    );
  }
  next();
}

router.get("/3_1", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("./uac/3_1", { team: req.user.team });
  } else {
    res.redirect("../login");
  }
});

router.get("/3_19", patheight, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallshina3_1)
      res.render("./uac/3_19", { team: req.user.team });
    else res.redirect("./3_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/3_20", pathseven, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallshina3_1)
      res.render("./uac/3_20", { team: req.user.team });
    else res.redirect("./3_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/3_21", pathnine, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallshina3_1)
      res.render("./uac/3_21", { team: req.user.team });
    else res.redirect("./3_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/3_22", pathseven, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallshina3_20)
      res.render("./uac/3_22", { team: req.user.team });
    else res.redirect("./3_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/3_26", patheight, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallshina3_25)
      res.render("./uac/3_26", { team: req.user.team });
    else res.redirect("./3_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/3_25", patheight, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallshina3_19)
      res.render("./uac/3_25", { team: req.user.team });
    else res.redirect("./3_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/3_27", patheight, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallshina3_26)
      res.render("./uac/3_27", { team: req.user.team });
    else res.redirect("./3_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/3_28", pathnine, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallshina3_21)
      res.render("./uac/3_28", { team: req.user.team });
    else res.redirect("./3_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/3_29", pathnine, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallshina3_28)
      res.render("./uac/3_29", { team: req.user.team });
    else res.redirect("./3_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/3_30", pathnine, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallshina3_29)
      res.render("./uac/3_30", { team: req.user.team });
    else res.redirect("./3_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/3_31", pathnine, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallshina3_30)
      res.render("./uac/3_31", { team: req.user.team });
    else res.redirect("./3_1");
  } else {
    res.redirect("../login");
  }
});

router.get("/3_23", pathseven, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallshina3_22)
      res.render("./uac/3_23", { team: req.user.team });
    else res.redirect("./3_1");
  } else {
    res.redirect("../login");
  }
});
router.get("/3_24", function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.wallshina3_23)
      res.render("./uac/3_24", { team: req.user.team });
    else if (req.user.wallshina3_27)
      res.render("./uac/3_24", { team: req.user.team });
    else if (req.user.wallshina3_31)
      res.render("./uac/3_24", { team: req.user.team });
    else res.redirect("./3_1");
  } else {
    res.redirect("../login");
  }
});

router.post("/3_1", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "daughter";
  const correctAnswer1 = "Daughter";
  const correctAnswer2 = "DAUGHTER";
  const submittedAnswer = sanitize(req.body.answer);
  if (
    correctAnswer == submittedAnswer ||
    correctAnswer1 == submittedAnswer ||
    correctAnswer2 == submittedAnswer
  ) {
    console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallshina3_1: true } },
      (e, s) => {}
    );
    if (!req.user.wallshina3_1) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 60 } },
        (e, s) => {}
      );
    }
    res.redirect("/dead");
  } else {
    res.redirect("/uac/3_1");
  }
});

router.post("/3_19", function (req, res) {
  const correctAnswer = "cyberpunk2077dumdum";
  const submittedAnswer = sanitize(req.body.answer);
  // console.log(req.user);
  if (correctAnswer == submittedAnswer) {
    console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallshina3_19: true } },
      (e, s) => {}
    );
    if (!req.user.wallshina3_19) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 100 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/uac/3_25");
  } else {
    // console.log("try again1");
    res.redirect("/uac/3_19");
  }
});

router.post("/3_20", function (req, res) {
  const correctAnswer = "centaurustheconstellation";
  let score = req.user.score;
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallshina3_20: true } },
      (e, s) => {}
    );
    if (!req.user.wallshina3_20) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 150 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/uac/3_22");
  } else {
    // console.log("try again1");
    res.redirect("/uac/3_20");
  }
});

router.post("/3_21", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "jackiewelles";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallshina3_21: true } },
      (e, s) => {}
    );
    if (!req.user.wallshina3_21) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 80 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/uac/3_28");
  } else {
    // console.log("try again1");
    // res.redirect("/levelone");
    res.redirect("/uac/3_21");
  }
});

router.post("/3_22", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "jackiewelles";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallshina3_22: true } },
      (e, s) => {}
    );
    if (!req.user.wallshina3_22) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 150 } },
        (e, s) => {}
      );
    }
    res.redirect("/uac/3_23");
  } else {
    // console.log("try again1");
    res.redirect("/uac/3_22");
  }
});

router.post("/3_23", function (req, res) {
  const correctAnswer = "proudofyou";
  let score = req.user.score;
  const submittedAnswer = sanitize(req.body.answer);
  // console.log(req.user);
  if (correctAnswer == submittedAnswer) {
    console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallshina3_23: true } },
      (e, s) => {}
    );
    if (!req.user.wallshina3_23) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 150 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/uac/3_24");
  } else {
    // console.log("try again1");
    res.redirect("/uac/3_23");
  }
});

router.post("/3_25", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "joshuaandthecrucifixion";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallshina3_25: true } },
      (e, s) => {}
    );
    if (!req.user.wallshina3_25) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 100 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/uac/3_26");
  } else {
    // console.log("try again1");
    res.redirect("/uac/3_25");
  }
});

router.post("/3_26", function (req, res) {
  const correctAnswer = "49532292281436021581591346";
  let score = req.user.score;
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallshina3_26: true } },
      (e, s) => {}
    );
    if (!req.user.wallshina3_26) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 100 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/uac/3_27");
  } else {
    // console.log("try again1");
    res.redirect("/uac/3_26");
  }
});

router.post("/3_27", function (req, res) {
  const correctAnswer = "hassanisabbah";
  const correctAnswer2 = "hassansabbah";
  let score = req.user.score;
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer || correctAnswer2 == submittedAnswer) {
    // console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallshina3_27: true } },
      (e, s) => {}
    );
    if (!req.user.wallshina3_27) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 100 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/uac/3_24");
  } else {
    // console.log("try again1");
    res.redirect("/uac/3_27");
  }
});

router.post("/3_28", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "centaurustheconstellation";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallshina3_28: true } },
      (e, s) => {}
    );
    if (!req.user.wallshina3_28) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 80 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/uac/3_29");
  } else {
    // console.log("try again1");
    res.redirect("/uac/3_28");
  }
});

router.post("/3_29", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "proudofyou";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallshina3_29: true } },
      (e, s) => {}
    );
    if (!req.user.wallshina3_29) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 80 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/uac/3_30");
  } else {
    // console.log("try again1");
    res.redirect("/uac/3_29");
  }
});

router.post("/3_30", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "181443";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallshina3_30: true } },
      (e, s) => {}
    );
    if (!req.user.wallshina3_30) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 80 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/uac/3_31");
  } else {
    // console.log("try again1");
    res.redirect("/uac/3_30");
  }
});

router.post("/3_31", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "cyberpunk2077dumdum";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallshina3_31: true } },
      (e, s) => {}
    );
    if (!req.user.wallshina3_31) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 80 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/uac/3_24");
  } else {
    // console.log("try again1");
    res.redirect("/uac/3_31");
  }
});
router.post("/3_24", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "theycalledmeafailure";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { wallshina3_24: true } },
      (e, s) => {}
    );
    if (!req.user.wallshina3_24) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 300 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("../start");
  } else {
    // console.log("try again1");
    res.redirect("/uac/3_24");
  }
});
module.exports = router;
