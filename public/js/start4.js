window.onload = function () {
  const btnone = document.getElementById("pathseven");
  const btntwo = document.getElementById("patheight");
  const btnthree = document.getElementById("pathnine");
  const baseURL = "http://localhost:3000/";
  btnone.addEventListener("click", async function () {
    console.log("halo");
    const waiting = await fetch(baseURL + "setseven", {
      method: "POST",
    }).then(function (response) {
      console.log(response);
    });
  });

  btntwo.addEventListener("click", async function () {
    console.log("halo");
    const waiting = await fetch(baseURL + "seteight", {
      method: "POST",
    }).then(function (response) {
      console.log(response);
    });
  });

  btnthree.addEventListener("click", async function () {
    console.log("halo");
    const waiting = await fetch(baseURL + "setnine", {
      method: "POST",
    }).then(function (response) {
      console.log(response);
    });
  });
};
