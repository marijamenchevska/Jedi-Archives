export class SwapiTable {
    constructor () {
        this.peopleHeader = `<thead>
                                 <th>Name&nbsp;&nbsp;&nbsp;<span id="ascArrow">&#x25B2;</span>&nbsp;<span id="descArrow">&#x25BC;</span></th>
                                 <th>Height</th>
                                 <th>Mass</th>
                                 <th>Gender</th>
                                 <th>Birth Year</th>
                                 <th>Appearances</th>
                             </thead>`;
        this.starshipsHeader = `<thead>
                                    <th>Name&nbsp;&nbsp;&nbsp;<span id="ascArrow">&#x25B2;</span>&nbsp;<span id="descArrow">&#x25BC;</span></th>
                                    <th>Model</th>
                                    <th>Manufacturer</th>
                                    <th>Cost</th>
                                    <th>People capacity</th>
                                    <th>Class</th>
                                </thead>`;
        this.planetsHeader = `<thead>
                                  <th>Name&nbsp;&nbsp;&nbsp;<span id="ascArrow">&#x25B2;</span>&nbsp;<span id="descArrow">&#x25BC;</span></th>
                                  <th>Diameter</th>
                                  <th>Climate</th>
                                  <th>Terrain</th>
                                  <th>Population</th>
                              </thead>`;
    }

    createTable (header, objectsArray, element) {      
        let tableRows = objectsArray
                        .map(object => Object.values(object)) // Get all object values for every API created object 
                        .map(values => values.reduce((acc, curr) => acc + `<td>${curr}</td>`, "")) // Make the group cells for every row using the object values
                        .map(rowCells => `<tr>${rowCells}</tr>`) // Place the groups of cells in separate rows
                        .join() // Join all rows

        element.innerHTML = `<table>` + header + `<tbody>` + tableRows + `</tbody>` + `</table>`;
    }
}

/* tableRows does the same thing as this:

    for (let i = 0; i < objectsArray.length; i++) {
        table += `<tr>
                    <td>${objectsArray[i].name}</td>
                    <td>${objectsArray[i].height}</td>
                    <td>${objectsArray[i].mass}</td>
                    <td>${objectsArray[i].gender}</td>
                    <td>${objectsArray[i].birth_year}</td>
                    <td>${objectsArray[i].films.length}</td>
                </tr>`;
    }
*/