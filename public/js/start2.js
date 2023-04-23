window.onload = function () {
  const btnone = document.getElementById("pathone");
  const btntwo = document.getElementById("pathtwo");
  const btnthree = document.getElementById("paththree");
  const baseURL = "http://localhost:3000/";
  btnone.addEventListener("click", async function () {
    console.log("halo");
    const waiting = await fetch(baseURL + "setone", {
      method: "POST",
    }).then(function (response) {
      console.log(response);
    });
  });

  btntwo.addEventListener("click", async function () {
    console.log("halo");
    const waiting = await fetch(baseURL + "settwo", {
      method: "POST",
    }).then(function (response) {
      console.log(response);
    });
  });

  btnthree.addEventListener("click", async function () {
    console.log("halo");
    const waiting = await fetch(baseURL + "setthree", {
      method: "POST",
    }).then(function (response) {
      console.log(response);
    });
  });
};
