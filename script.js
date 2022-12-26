const wrapper = document.querySelector(".wrapper"),
  inputPart = document.querySelector(".input-part"),
  infotxt = inputPart.querySelector(".info-text"),
  inputField = document.querySelector("input"),
  btn1 = document.querySelector(".btn1"),
  btn2 = document.querySelector(".btn2"),
  wImg = document.querySelector(".weather-part img"),
  arrow = wrapper.querySelector("header i");


// using geolocation fetch data
btn2.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    infotxt.innerText = "Getting Weather information.....";
    infotxt.classList.add("pending");
  } else {
    alert("Your browser not support geolocation api");
  }
});

let onSuccess = (position) => {
  const { latitude, longitude } = position.coords;
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=42636858c4de100b7af10db191c1ff71`;
  getData(api);
};
let onError = (error) => {
  infotxt.classList.replace("pending", "error");
  infotxt.innerText = error.message;
};

// on pressing get data button fetch data
btn1.addEventListener("click", () => {
  if (inputField.value != "") {
    requestApi(inputField.value);
  }
});
inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

const requestApi = (city) => {
  infotxt.innerText = "Getting Weather information.....";
  infotxt.classList.add("pending");
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=42636858c4de100b7af10db191c1ff71`;
  getData(api);
};

//getting data using api
const getData = (api) => {
  fetch(api)
    .then((response) => {
      let result = response.json();
      return result;
    })
    .then((result) => {
      weatherDetails(result);
    });
};
//displying data
const weatherDetails = (data) => {
  if (data.cod == "404") {
    infotxt.classList.replace("pending", "error");
    infotxt.innerText = `${inputField.value} is not a valid city name`;
  }else{
    inputField.value = "";
    infotxt.classList.remove("pending", "error");
    wrapper.classList.add("active");
    displayData(data);
  }
};

const displayData = (data) => {
    const city = data.name;
    const country = data.sys.country;
    const {description, id} = data.weather[0];
    const {feels_like, humidity, temp} =data.main;
    wrapper.querySelector(".temp .numb").innerText = temp;
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location span").innerText = `${city},${country}`;
    wrapper.querySelector(".fnum").innerText = feels_like;
    wrapper.querySelector(".humidity span").innerText = `${humidity}%`;
    displayPics(id);
}

const displayPics =(id)=>{
    if(id == 800){
        wImg.src = "./images/clear.svg";
    }
    else if(id >= 200 && id <=232){
        wImg.src = "./images/strom.svg";
    }
    else if(id >= 600 && id <= 622){
        wImg.src = "./images/snow.svg";
    }
    else if(id >= 701 && id <= 781){
        wImg.src = "./images/haze.svg";
    }
    else if(id >= 801 && id <= 804){
        wImg.src = "./images/cloud.svg";
    }
    else if((id >= 300 && id <= 321)|| (id >= 500 && id <= 531)){
        wImg.src = "./images/rain.svg";
    }
}

//back arrow 
arrow.addEventListener('click',()=>{
    wrapper.classList.remove("active");
});