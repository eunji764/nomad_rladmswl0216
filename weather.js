const weather = document.querySelector(".js-weather");

const API_KEY = "f366e51325cf95fa98ff5449b1bdc290";
const COORDS = 'coords';

function getWeater(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp,
            place = json.name;
            
        weather.innerText = `${temperature} @ ${place}`;

    });
    //데이터를 불러오는 것, fetch(`가져올데이터`)
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, //->객체변수이름과 객체key이름을 같게하는 방법(=>latitude:latitude와 같은 의미)
        longitude
    };
    saveCoords(coordsObj);
    getWeater(latitude, longitude);
}

function handleGeoError(){
    console.log('Cant access geo location');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError)
    /* geolocation.gettCurrentPosition(좌표를 처리했을 때 가져올 함수,처리못했을때 함수) : 좌표를 처리하는 객체(object)함수임 */
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeater(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();