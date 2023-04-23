const express = require("express");
const router = express.Router();
const User = require("../User");
const sanitize = require("mongo-sanitize");

function pathone(req, res, next) {
  if (req.user.pathtwo) {
    res.send("no");
    return;
  }
  if (req.user.paththree) {
    res.send("no");
    return;
  }
  if (!req.user.pathone) {
    User.updateOne(
      { username: req.user.username },
      { $set: { pathone: true } },
      (e, s) => {}
    );
  }
  // console.log(req.user.pathone);
  // if (!req.user.pathone) {
  //   res.send("no");
  // } else {
  next();
  // }
}

function pathtwo(req, res, next) {
  if (req.user.pathone) {
    res.send("no");
    return;
  }
  if (req.user.paththree) {
    res.send("no");
    return;
  }
  if (!req.user.pathtwo) {
    User.updateOne(
      { username: req.user.username },
      { $set: { pathtwo: true } },
      (e, s) => {}
    );
    // console.log(req.user.pathtwo);
    // if (!req.user.pathtwo) {
    //   res.send("no");
    // } else {
  }
  next();
  // }
}

function paththree(req, res, next) {
  if (req.user.pathone) {
    res.send("no");
    return;
  }
  if (req.user.pathtwo) {
    res.send("no");
    return;
  }
  if (!req.user.paththree) {
    User.updateOne(
      { username: req.user.username },
      { $set: { paththree: true } },
      (e, s) => {}
    );
  }

  next();
}

router.get("/1", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("./subway/1", { team: req.user.team });
  } else {
    res.redirect("../login");
  }
});

router.get("/1_2", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("./subway/1_2", { team: req.user.team });
  } else {
    res.redirect("../login");
  }
});

router.get("/1_3", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("./subway/1_3", { team: req.user.team });
  } else {
    res.redirect("../login");
  }
});

router.get("/1_4", paththree, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.subway1) res.render("./subway/1_4", { team: req.user.team });
    else res.redirect("/subway/1");
  } else {
    res.redirect("../login");
  }
});

router.get("/1_5", pathtwo, function (req, res) {
  console.log("key=5,offset=6");
  if (req.isAuthenticated()) {
    if (req.user.subway3) res.render("./subway/1_5", { team: req.user.team });
    else res.redirect("/subway/1");
  } else {
    res.redirect("../login");
  }
});

router.get("/1_6", paththree, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.subway4) res.render("./subway/1_6", { team: req.user.team });
    else res.redirect("/subway/1");
  } else {
    res.redirect("../login");
  }
});

router.get("/1_7", paththree, function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.subway6) res.render("./subway/1_7", { team: req.user.team });
    else res.redirect("/subway/1");
  } else {
    res.redirect("../login");
  }
});

router.get("/1_8", function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.subway2) res.render("./subway/1_8", { team: req.user.team });
    else if (req.user.subway5)
      res.render("./subway/1_8", { team: req.user.team });
    else if (req.user.subway7)
      res.render("./subway/1_8", { team: req.user.team });
    else res.redirect("/subway/1");
  } else {
    res.redirect("../login");
  }
});

router.post("/1", function (req, res) {
  // let score = req.user.score;
  const correctAnswer = "soulkiller";
  const submittedAnswer = "soulkiller";
  console.log(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");
    // User.updateOne(
    //   { username: req.user.username },
    //   { $set: { subway1: true } },
    //   (e, s) => {}
    // );

    // if (!req.user.subway1) {
    //   User.updateOne(
    //     { username: req.user.username },
    //     { $set: { score: score + 10 } },
    //     (e, s) => {}
    //   );
    // }
    res.redirect("../start2");
  } else {
    // console.log("try again1");
    res.redirect("/subway/1");
  }
});

router.post("/1_2", function (req, res) {
  const correctAnswer = "14";
  let score = req.user.score;
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { subway2: true } },
      (e, s) => {}
    );
    if (!req.user.subway2) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 60 } },
        (e, s) => {}
      );
    }
    res.redirect("/subway/1_3");
  } else {
    console.log("try again1");
    res.redirect("/subway/1_2");
  }
});

router.post("/1_3", function (req, res) {
  const correctAnswer = "mango";
  const submittedAnswer = sanitize(req.body.answer);
  let score = req.user.score;
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { subway3: true } },
      (e, s) => {}
    );
    if (!req.user.subway3) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 30 } },
        (e, s) => {}
      );
    }
    //res.send();
    res.redirect("/congo");
  } else {
    // console.log("try again1");
    res.redirect("/subway/1_3");
  }
});

router.post("/1_4", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "12041068";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { subway4: true, score: score + 20 } },
      (e, s) => {}
    );
    if (!req.user.subway4) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 20 } },
        (e, s) => {}
      );
    }
    //res.send();
    res.redirect("/subway/1_6");
  } else {
    // console.log("try again1");
    res.redirect("/subway/1_4");
  }
});

router.post("/1_5", function (req, res) {
  console.log("key=5,offset=6");
  let score = req.user.score;
  const correctAnswer = "maptannpelen";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");

    User.updateOne(
      { username: req.user.username },
      { $set: { subway5: true } },
      (e, s) => {}
    );
    if (!req.user.subway5) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 30 } },
        (e, s) => {}
      );
    }
    // //res.send();
    res.redirect("/subway/1_8");
  } else {
    res.redirect("/subway/1_5");
    // console.log("try again1");
  }
});

router.post("/1_6", function (req, res) {
  let score = req.user.score;
  const correctAnswer = "takemura";
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { subway6: true } },
      (e, s) => {}
    );
    if (!req.user.subway6) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 20 } },
        (e, s) => {}
      );
    }
    res.redirect("/subway/1_7");
  } else {
    // console.log("try again1");
    res.redirect("/subway/1_6");
  }
});

router.post("/1_7", function (req, res) {
  const correctAnswer = "arthurjenkins";
  let score = req.user.score;
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { subway7: true } },
      (e, s) => {}
    );
    if (!req.user.subway7) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 20 } },
        (e, s) => {}
      );
    }
    res.redirect("/subway/1_8");
  } else {
    // console.log("try again1");
    // res.redirect("/levelone");
    res.redirect("/subway/1_7");
  }
});

router.post("/1_8", function (req, res) {
  const correctAnswer = "lunaterra";
  let score = req.user.score;
  const submittedAnswer = sanitize(req.body.answer);
  if (correctAnswer == submittedAnswer) {
    // console.log("correct1");
    User.updateOne(
      { username: req.user.username },
      { $set: { subway8: true } },
      (e, s) => {}
    );
    if (!req.user.subway8) {
      User.updateOne(
        { username: req.user.username },
        { $set: { score: score + 150 } },
        (e, s) => {}
      );
    }
    res.redirect("../start");
  } else {
    // console.log("try again1");
    res.redirect("/subway/1_8");
  }
});
module.exports = router;
