let personImage = document.getElementById("person-image");
let starshipImage = document.getElementById("starship-image");
let planetImage = document.getElementById("planet-image");
let tableField = document.getElementById("table-field");
let previousButton = document.getElementById("previous");
let nextButton = document.getElementById("next");
let pageInformation = document.getElementById("page-information");
let clickCounter;
let buttonClickedId;
let newData;
let totalPages;

async function getAPIdata (url) {
    let data = await fetch(url);
    let parsedData = await data.json();
    return parsedData;
}
    // fetch(url) 
    // .then (response => {
    //     if (!response.ok) {
    //         throw new Error("There's something wrong with the server or the network.");
    //     }
    //     return response.json()})
    // .then (async result => {
    //     // console.log(result);
    //     return await dataCollection(result.results);
    // })
    // .catch(error => console.log(error));

// function dynamicTable(apiData, property1, property2, property3, property4, property5, property6) {
//     // debugger;
//     let table = "<table><thead>";
//     table += `<th>Name</th>
//               <th>Height</th>
//               <th>Mass</th>
//               <th>Gender</th>
//               <th>Birth Year</th>
//               <th>Appearances</th></thead>`;

//     table += "<tbody>";
    
//     for (let i = 0; i < apiData.length; i++) {
//         table += `<tr>
//                     <td>${apiData[i][property1]}</td>
//                     <td>${apiData[i][property2]}</td>
//                     <td>${apiData[i][property3]}</td>
//                     <td>${apiData[i][property4]}</td>
//                     <td>${apiData[i][property5]}</td>
//                     <td>${apiData[i][property6].length}</td>
//                   </tr>`;
//     }

//     table += "</tbody></table>";
//     tableField.innerHTML = table;
// }

function peopleTable(personData) {
    let table = "<table><thead>";
    table += `<th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Gender</th>
              <th>Birth Year</th>
              <th>Appearances</th></thead>`;

    table += "<tbody>";
    
    for (let i = 0; i < personData.length; i++) {
        table += `<tr>
                    <td>${personData[i].name}</td>
                    <td>${personData[i].height}</td>
                    <td>${personData[i].mass}</td>
                    <td>${personData[i].gender}</td>
                    <td>${personData[i].birth_year}</td>
                    <td>${personData[i].films.length}</td>
                  </tr>`;
    }

    table += "</tbody></table>";
    tableField.innerHTML = table;
}

function starshipsTable(starshipData) {
    let table = "<table><thead>";
    table += `<th>Name</th>
              <th>Model</th>
              <th>Manufacturer</th>
              <th>Cost</th>
              <th>People capacity</th>
              <th>Class</th></thead>`;

    table += "<tbody>";
    
    for (let i = 0; i < starshipData.length; i++) {
        table += `<tr>
                    <td>${starshipData[i].name}</td>
                    <td>${starshipData[i].model}</td>
                    <td>${starshipData[i].manufacturer}</td>
                    <td>${starshipData[i].cost_in_credits}</td>
                    <td>${starshipData[i].passengers}</td>
                    <td>${starshipData[i].starship_class}</td>
                  </tr>`;
    }

    table += "</tbody></table>";
    tableField.innerHTML = table;
}

function planetsTable(planetData) {
    let table = "<table><thead>";
    table += `<th>Name</th>
              <th>Diameter</th>
              <th>Climate</th>
              <th>Terrain</th>
              <th>Population</th>`;

    table += "<tbody>";
    
    for (let i = 0; i < planetData.length; i++) {
        table += `<tr>
                    <td>${planetData[i].name}</td>
                    <td>${planetData[i].diameter}</td>
                    <td>${planetData[i].climate}</td>
                    <td>${planetData[i].terrain}</td>
                    <td>${planetData[i].population}</td>
                  </tr>`;
    }

    table += "</tbody></table>";
    tableField.innerHTML = table;
}

async function firstData (apiFunction, url, tableFunction) {
    clickCounter = 1;
    let firstData = await apiFunction(url);
    tableFunction(firstData.results);
    totalPages = Math.ceil(firstData.count/10);
    pageInformation.innerText = `Page 1 of ${totalPages}`;
    nextButton.style.visibility = "visible";
    previousButton.style.visibility = "hidden";
}


async function newDataCollection (buttonClickedId, urlPage) {
    if(buttonClickedId === "person-image") {
        newData = await getAPIdata(`https://swapi.dev/api/people/?page=${urlPage}`);
        peopleTable(newData.results);
    }
    else if(buttonClickedId === "starship-image") {
        newData = await getAPIdata(`https://swapi.dev/api/starships/?page=${urlPage}`);
        starshipsTable(newData.results);
    }
    else {
        newData = await getAPIdata(`https://swapi.dev/api/planets/?page=${urlPage}`);
        planetsTable(newData.results);
    }

    if(newData.next === null) {
        nextButton.style.visibility = "hidden";
    }

    if(newData.previous === null) {
        previousButton.style.visibility = "hidden";
    }
}

personImage.addEventListener("click", async function(e) {
    firstData(getAPIdata, "https://swapi.dev/api/people/?page=1", peopleTable);
    buttonClickedId = e.target.id;
});

starshipImage.addEventListener("click", async function(e) {
    firstData(getAPIdata, "https://swapi.dev/api/starships/?page=1", starshipsTable);
    buttonClickedId = e.target.id;
});

planetImage.addEventListener("click", async function(e) {
    firstData(getAPIdata, "https://swapi.dev/api/planets/?page=1", planetsTable);
    buttonClickedId = e.target.id;
});

// personImage.addEventListener("click", async function(e) {  
//     clickCounter = 1;
//     let firstPeople = await getAPIdata(`https://swapi.dev/api/people/?page=1`);
//     peopleTable(firstPeople.results);
//     nextButton.style.visibility = "visible";
//     previousButton.style.visibility = "hidden";
//     buttonClickedId = e.target.id;
// });

// starshipImage.addEventListener("click", async function(e) {  
//     clickCounter = 1;
//     let firstStarships = await getAPIdata("https://swapi.dev/api/starships/?page=1");
//     starshipsTable(firstStarships.results);
//     nextButton.style.visibility = "visible";
//     previousButton.style.visibility = "hidden";
//     buttonClickedId = e.target.id;
// });

// planetImage.addEventListener("click", async function(e) {
//     clickCounter = 1;
//     let firstPlanets = await getAPIdata("https://swapi.dev/api/planets/?page=1");
//     planetsTable(firstPlanets.results);
//     nextButton.style.visibility = "visible";
//     previousButton.style.visibility = "hidden";
//     buttonClickedId = e.target.id;
// })

nextButton.addEventListener("click", async function() {
    clickCounter++;

    newDataCollection(buttonClickedId, clickCounter);    

    previousButton.style.visibility = "visible"; 
    
    pageInformation.innerText = `Page ${clickCounter} of ${totalPages}`;
})

previousButton.addEventListener("click", async function() {
    clickCounter--;
    
    newDataCollection(buttonClickedId, clickCounter);

    nextButton.style.visibility = "visible";

    pageInformation.innerText = `Page ${clickCounter} of ${totalPages}`;
})