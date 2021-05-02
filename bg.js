const body = document.querySelector("body");

const IMG_Number = 6;


function paintImage(imgNumber){
    const image = new Image();
    image.src = `images/${imgNumber+1}.jpg`;
    image.classList.add("bgImage");
    body.prepend(image);
}

function genRandom(){
    /* 
        Math.random(); = 랜덤으로 숫자생성
        Math.floor(); = 숫자를 버림해줌
        Math.Ceil(); = 숫자를 올림해줌
        Math.round(); = 숫자를 반올림해줌
    */ 
    const number = Math.floor(Math.random() * IMG_Number);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
    
}

init();