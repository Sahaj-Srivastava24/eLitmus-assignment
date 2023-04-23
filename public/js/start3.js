window.onload = function () {
  const btnone = document.getElementById("pathfour");
  const btntwo = document.getElementById("pathfive");
  const btnthree = document.getElementById("pathsix");
  const baseURL = "http://localhost:3000/";
  btnone.addEventListener("click", async function () {
    console.log("halo");
    const waiting = await fetch(baseURL + "setfour", {
      method: "POST",
    }).then(function (response) {
      console.log(response);
    });
  });

  btntwo.addEventListener("click", async function () {
    console.log("halo");
    const waiting = await fetch(baseURL + "setfive", {
      method: "POST",
    }).then(function (response) {
      console.log(response);
    });
  });

  btnthree.addEventListener("click", async function () {
    console.log("halo");
    const waiting = await fetch(baseURL + "setsix", {
      method: "POST",
    }).then(function (response) {
      console.log(response);
    });
  });
};
