const makeBigger = () => {
   document.querySelector('.content').style.fontSize = "150%";
};

const makeSmaller = () => {
   document.querySelector('.content').style.fontSize = "100%";
};

document.querySelector(".a1").onclick = makeBigger;
document.querySelector(".a2").onclick = makeSmaller;
