let kicks = 0;
window.onload = () => {
  const butt = document.getElementById("cj");
  const formbutt = document.getElementById("f");
  let btn = document.createElement("button");
  btn.innerHTML = "Submit";
  btn.type = "submit";
  btn.name = "formBtn";
  butt.addEventListener("click", () => {
    kicks = kicks + 1;
    if (kicks >= 3) {
      console.log(kicks);
      document.getElementById("phew").innerHTML =
        "Dont be afraid of trying. Be afraid of giving up.Seems like you are struck...dw...When all else fails, prayer succeeds. https://cutt.ly/xxxxxx_cyberpunk , maybe finding the replacement of those xxxxxx can be of some help.";
      formbutt.appendChild(btn);
      butt.remove();
    }
  });
};
// function updateKicks() {}
