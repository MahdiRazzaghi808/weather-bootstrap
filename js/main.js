const inputElem = document.querySelector('input')


let apiData = {
    url: 'https://api.openweathermap.org/data/2.5/weather?q=',
    key: '26c4d8ad14b57209671494df9bd9fcb9'
}

function fetchData(inputFunction) {
    let countryValue = inputElem.value ? inputElem.value : inputFunction

    fetch(`${apiData.url}${countryValue}&&appid=${apiData.key}&units=metricather?q=`).
        then(res => res.json())
        .then(data => {
            showData(data, inputFunction)
            inputElem.value = ""

        })
        .catch(err => {
            console.log(err);
        })
}


const images = ["./asset/cloud-fill.svg", "./asset/cloud-fog.svg", "./asset/cloud-snow.svg", "./asset/cloud-drizzle.svg", "./asset/sun.svg", "./asset/cloud-lightning.svg", "./asset/cloud-sun.svg","./asset/default.svg"]

const imagesHandler = main => {
    switch (main) {
        case "Clouds":
            return images[0];
        case "Mist":
            return images[1];
        case "Snow":
            return images[2];
        case "Rain":
            return images[3];
        case "Clear":
            return images[4];
        case "Thunderstorm":
            return images[5];
        case "Few clouds":
            return images[6];
        default:
            return images[7]
    }



}


const mainWrapper = document.querySelector("#main-wrapper");

function showData(data, save) {
    console.log(data.weather[0].main);

    mainWrapper.insertAdjacentHTML("afterbegin",
        `
<div class="col-12 col-md-6 col-lg-4 rounded-4 shadow" id="weather-wrapper">
<div class="text-white p-3 p-md-4 ">

<div class="row">
    <div class="col-6">
        <p class="h3"><span>${data.name}</span> <span class="text-warning">${data.sys.country}</span></p>
    </div>

</div>

<div class="row my-5">
    <div class="col-6 h1">${`${Math.floor(data.main.temp - 273.15)}°c`}</div>
    <div class="col-6">
        <p class="h3 text-end">${data.weather[0].main}</p>
    </div>
</div>


<div class="row mb-5">
    <div class="mx-auto" id="svg">
        <img  src="${imagesHandler(data.weather[0].main)}" alt="weather" style="filter: drop-shadow(1px 1px 4px #9f9e9e);width:8rem;height:8rem;">
    </div>
</div>

<div class="row">
    <div class="col-6"><img src="./asset/icon/trash.svg" alt="trash"  style="width: 1.5rem; cursor:pointer" onClick="removeHandler(event)"></div>
    <div class="col-6 d-flex justify-content-end"><img src="${save ? "./asset/icon/save.svg" : "./asset/icon/no-save.svg"}" alt="save" style="width: 1.5rem;cursor:pointer" onClick="saveHandler(event)" data-city="${data.name}"></div>
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




function removeHandler(event) {
    event.currentTarget.parentNode.parentNode.parentNode.parentNode.remove()

}





let cities = []
if (localStorage.getItem("save")) {
    cities = [...JSON.parse(localStorage.getItem("save"))]
}



const bodyLoaded = () => {
    cities.forEach(item => {
        fetchData(item)
    })
}





function saveHandler(event) {
    let name = event.currentTarget.dataset.city;
    let flag = cities.findIndex((item) => item === name)

    if (flag === -1) {
        cities.push(name)
        localStorage.setItem('save', JSON.stringify(cities));
        event.currentTarget.src = "./asset/icon/save.svg"
    } else {
        event.currentTarget.src = "./asset/icon/no-save.svg"
        cities.splice(flag, 1);
        localStorage.setItem('save', JSON.stringify(cities));

    }
}


document.querySelector("#clear-item").addEventListener("click", () => {
    mainWrapper.replaceChildren("")
})
document.querySelector("#clear-save").addEventListener("click", () => {
    localStorage.clear();
})





