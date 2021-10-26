const COUNTRIES = "http://www.randyconnolly.com/funwebdev/3rd/api/travel/countries.php";
const CITIES = "http://www.randyconnolly.com/funwebdev/3rd/api/travel/cities.php";
const PICTURES = "http://www.randyconnolly.com/funwebdev/3rd/api/travel/images.php";

let countryObjects;
let cityObjects;
let pictureObjects;

// apiToObjectArray(COUNTRIES, countryObjects);
// apiToObjectArray(CITIES, cityObjects);
// apiToObjectArray(PICTURES, pictureObjects);

// function apiToObjectArray(api, objectArray) {
//   fetch(api)
//   .then(countriesToJson)
//   .then(countriesToObjects);

//   function countriesToObjects(previousPromiseResult) {
//     objectsFromJson = previousPromiseResult;
//     objectArray = objectsFromJson;
//   }

//   function countriesToJson(previousPromiseResult) {
//     let response = previousPromiseResult;
//     return response.json();
//   }
// }

fetch(COUNTRIES)
.then(countriesToJson)
.then(countriesToObjects);

function countriesToObjects(previousPromiseResult) {
  objectsFromJson = previousPromiseResult;
  countryObjects = objectsFromJson;
}

function countriesToJson(previousPromiseResult) {
  let response = previousPromiseResult;
  return response.json();
}

fetch(CITIES)
.then(citiesToJson)
.then(citiesToObjects);

function citiesToObjects(previousPromiseResult) {
  objectsFromJson = previousPromiseResult;
  cityObjects = objectsFromJson;
}

function citiesToJson(previousPromiseResult) {
  let response = previousPromiseResult;
  return response.json();
}

fetch(PICTURES)
.then(photosToJson)
.then(photosToObjects);

function photosToObjects(previousPromiseResult) {
  objectsFromJson = previousPromiseResult;
  pictureObjects = objectsFromJson;
}

function photosToJson(previousPromiseResult) {
  let response = previousPromiseResult;
  return response.json();
}

document.addEventListener("DOMContentLoaded", function() {

// let i = 0;
// wait(0);

// function wait(a) {
//   while (a < 100000000) {
//     i = i + a;
//     a++;
//   }
//   console.log(a);
// }

  //Sorting function from: https://ourcodeworld.com/articles/read/764/how-to-sort-alphabetically-an-array-of-objects-by-key-in-javascript
  function sortAlphabetically(data) {
    const sortOrder =1;

    if(data[0] === "-") {
      sortOrder = -1;
      data = data.substr(1);
    }

    return function(a,b) {
      if(sortOrder == -1) {
        return b[data].localeCompare(a[data]);
      } else {
        return a[data].localeCompare(b[data]);
      }
    }
  }

  function createCountryNameList(data) {
    const list = document.createElement("ol");
    const listDiv = document.getElementById("country-list");
    listDiv.appendChild(list);
  
    for (names of data) {
      const newName = document.createElement("li");
      const countryName = names.name;
      newName.textContent = countryName;
      
      list.appendChild(newName);
    }
  }
  
  function showCountryDetails() {
    const countryNameDiv = document.querySelector("#country-list");
    countryNameDiv.addEventListener("click", function(e) {
      if(e.target.nodeName == "LI") {
        const name = document.createElement("h3");
        const countryName = e.target.textContent;
        name.textContent = countryName;

        const detailsSection = document.getElementById("details");
        detailsSection.replaceChildren();
        detailsSection.appendChild(name);

        mapPlaceholder = document.createElement("img");
        mapPlaceholder.setAttribute("src", "https://via.placeholder.com/125");
        const map = document.getElementById("maps");
        map.replaceChildren();
        map.appendChild(mapPlaceholder);
      }
    })
  }

  function addCountryImages(countryData, imgData) {
    const countryNameDiv = document.querySelector("#country-list");
    countryNameDiv.addEventListener("click", function(e) {
      if(e.target.nodeName =="LI") {
        const countryName = e.target.textContent;

        for(cData of countryData) {
          if(countryName == cData.name) {
            const countryIso = cData.iso;
            const imgDiv = document.getElementById("photos");
            let imgCount = 0;

            imgDiv.replaceChildren();
            for(imgs of imgData) {
              if(countryIso == imgs.location.iso) {                
                const picElement = document.createElement("PICTURE");
                const srcElement = document.createElement("SOURCE");
                const imgElement = document.createElement("IMG");

                srcElement.media = "(max-width:425px)";
                srcElement.srcset = `https://res.cloudinary.com/dklnd2mdy/image/upload/c_fill,h_75,w_75,x_0/v1634047107/Milestone%202/${imgs.filename}`;
                imgElement.src = `https://res.cloudinary.com/dklnd2mdy/image/upload/c_fill,h_150,w_150,x_0/v1634047107/Milestone%202/${imgs.filename}`;

                picElement.appendChild(srcElement);
                picElement.appendChild(imgElement);

                imgDiv.appendChild(picElement);
                imgCount++;
              }
            }
            if(imgCount == 0) {
              const imgDiv = document.getElementById("photos");
              const hElement = document.createElement("H3");

              hElement.textContent = "There are no images of this country";
              imgDiv.replaceChildren();
              imgDiv.appendChild(hElement);
            }
          }
        }
      }
    })
  }

  function filterByName() {
    const nameInput = document.getElementById("nameFilter");
    nameInput.addEventListener("input", function(e) {
      if (e.target.id == "nameFilter") {
        countryList = document.getElementsByTagName("li");

        for (let country of countryList) {
          if (!country.innerHTML.toLowerCase().startsWith(nameInput.value.toLowerCase())) {
            country.style.display = "none";
          }
          else {
            country.style.display = "flex";
          }
        }
      }
    })
  }

//  countryObjects.sort(sortAlphabetically("name"));
  createCountryNameList(countryObjects);
  showCountryDetails();
  addCountryImages(countryObjects, pictureObjects);
  filterByName();
})
