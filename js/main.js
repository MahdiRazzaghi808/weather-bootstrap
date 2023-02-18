const inputElem = document.querySelector('input')

let apiData = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: '26c4d8ad14b57209671494df9bd9fcb9'
}

function fetchData() {
    let countryValue = inputElem.value

    console.log(countryValue)
    fetch(`${apiData.url}${countryValue}&&appid=${apiData.key}&units=metricather?q=`).
        then(res => res.json())
        .then(data => {
            showData(data)
            inputElem.value=""

        })
        .catch(err => {

        })
}


const images = ["./asset/cloud-fill.svg", "./asset/cloud-fog.svg", "./asset/cloud-snow.svg", "./asset/cloud-drizzle.svg", "./asset/sun.svg", "./asset/cloud-lightning.svg", "./asset/cloud-sun.svg"]

const imagesHandler = main => {
    if (main == "Clouds") {
        return images[0]
    }
    if (main == "Mist") {
        return images[1]
    }
    if (main == "Snow") {
        return images[2]
    }
    if (main == "Rain") {
        return images[3]
    }
    if (main == "Clear") {
        return images[4]
    }
    if (main == "Thunderstorm") {
        return images[5]
    }
    if (main == "Few clouds") {
        return images[6]
    }


}



const mainWrapper = document.querySelector("#main-wrapper");


function showData(data) {

    mainWrapper.insertAdjacentHTML("beforeend",
        `
<div class="col-12 col-md-6 col-lg-4 rounded-4" id="weather-wrapper">
<div class="text-white p-2 p-md-4 ">

    <div class="row">
        <div class="col-6">
            <p class="h3"><span>${data.name}</span> <span class="h3 text-warning">${data.sys.country}</span></p>
            <p>${formattedToday}</p>
        </div>
        <div class="col-6">
            <p class="d-flex flex-column align-items-end mt-2">${day}</p>
        </div>
    </div>

    <div class="row my-5">
        <div class="col-6 h1">${`${Math.floor(data.main.temp - 273.15)}°c`}</div>
        <div class="col-6"><p class="h3 text-end">${data.weather[0].main}</p></div>
    </div>


    <div class="row mb-5">
        <div class="mx-auto" id="svg">
            <img class="w-100" src="${imagesHandler(data.weather[0].main)}" alt="weather">
        </div>

    </div>


</div>

</div>
`)


}





inputElem.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        fetchData()
    }
})

let btnSearch = document.querySelector("#get");
btnSearch.addEventListener('click', () => {
    fetchData()
})




const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();

if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;

const formattedToday = dd + '/' + mm + '/' + yyyy;

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const d = new Date();
let day = weekday[d.getDay()];

