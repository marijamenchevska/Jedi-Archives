import { ApiService } from "./apiService.js";
import { SwapiPeople, SwapiStarships, SwapiPlanets } from "./swapiObjects.js";
import { SwapiTable } from "./swapiTables.js";
import { Loader } from "./loader.js";

export class SwapiService {
    constructor () {
        this.apiService = new ApiService();
        this.swapiTable = new SwapiTable();
        this.logo = document.getElementById("star-wars-logo");
        this.personImage = document.getElementById("people");
        this.starshipImage = document.getElementById("starships");
        this.planetImage = document.getElementById("planets");
        this.inputField = document.getElementById("user-input");
        this.searchBtn = document.getElementById("search");
        this.backBtn = document.getElementById("go-back");
        this.tableField = document.getElementById("table-field");
        this.previousBtn = document.getElementById("previous");
        this.pageInfoField = document.getElementById("page-info");
        this.nextBtn = document.getElementById("next");
        this.swapiObjects = []; // Property used for storing objects from received API data
        this.totalPages = 0; 
        this.pageCounter = 1;
        this.imageClicked = ""; // Property for keeping track which choice (people, spaceships, planets) has been made - its id is used for completing the URL
        this.swapiObjectClass = ""; // Property for keeping track which choice (people, spaceships, planets) has been made - used as a class reference for creating objects from received API data
        this.tableHeader = ""; // Property for taking a different table header from the swapiTables class, dependent on the previosly made choice (people, spaceships, planets)
    }

    emptyPage () {
        this.tableField.innerHTML = "";
        this.pageInfoField.innerHTML = "";
        this.previousBtn.style.visibility = "hidden";
        this.nextBtn.style.visibility = "hidden";
    }

    // Loading data on clicking one of the three images
    async loadFirstData (dataType, page, swapiObjectClass, tableHeader) {
        Loader.show();
        this.emptyPage();

        try {
            let receivedData = await this.apiService.getAPIdata(dataType, page);
            if(!receivedData) throw new Error(`Page not found.`);
            this.swapiObjects = receivedData.results.map(object => new swapiObjectClass(object));
            this.swapiTable.createTable(tableHeader, this.swapiObjects, this.tableField);
            this.totalPages = Math.ceil(receivedData.count / 10);

            this.inputField.style.visibility = "visible";
            this.searchBtn.style.visibility = "visible";
            this.nextBtn.style.visibility = "visible";
            this.previousBtn.style.visibility = "hidden";
            this.pageInfoField.innerText = `Page ${page} of ${this.totalPages}`;
        }
        catch(error) {
            this.tableField.innerHTML = error;
        }
        finally {
            Loader.hide();
        }        
    }

    // Loading data on clicking the previous or the next button
    async loadNewData (dataType, page, swapiObjectClass, tableHeader) {
        Loader.show();
        this.emptyPage();

        try {
            let receivedData = await this.apiService.getAPIdata(dataType, page);
            if(!receivedData) throw new Error(`Page not found.`);
            this.swapiObjects = receivedData.results.map(object => new swapiObjectClass(object));
            this.swapiTable.createTable(tableHeader, this.swapiObjects, this.tableField);

            if(receivedData.previous === null) this.previousBtn.style.visibility = "hidden";
            else this.previousBtn.style.visibility = "visible";
            if(receivedData.next === null) this.nextBtn.style.visibility = "hidden";
            else this.nextBtn.style.visibility = "visible";
            this.pageInfoField.innerText = `Page ${page} of ${this.totalPages}`;
        }
        catch(error) {
            this.tableField.innerHTML = error;
        }
        finally {
            Loader.hide();
        }
    }

    // Loading data on clicking the search button
    async loadSearchResult (dataType, page, userInput, swapiObjectClass, tableHeader) {
        Loader.show();
        this.emptyPage();

        userInput = userInput.trim();

        if(!userInput) {
            this.tableField.innerHTML = "You didn't enter anything.";
            return;
        }

        // The input needs to be checked as it is used for completing the URL
        if(userInput.split(" ") === 1) userInput = userInput;
        else userInput.replace(" ", "+");

        try {
            let receivedData = await this.apiService.getAPIdata(dataType, page, `/?search=${userInput}`);
            if(!receivedData.count) throw new Error(`${userInput} not found.`);
            this.swapiObjects = receivedData.results.map(object => new swapiObjectClass(object));
            this.swapiTable.createTable(tableHeader, this.swapiObjects, this.tableField);
            this.backBtn.style.visibility = "visible";
        }
        catch(error) {
            this.tableField.innerHTML = error;
        }
        finally {
            Loader.hide();
        }        
    }

    async swapiEvents () {
        // Setting all the needed properties which will be passed as arguments, and apart from pageCounter, will continue to be the same for the next, previous or go back button 
        this.personImage.addEventListener("click", async (e) => {
            this.imageClicked = e.target.id;
            this.pageCounter = 1;
            this.swapiObjectClass = SwapiPeople;
            this.tableHeader = this.swapiTable.peopleHeader;
            await this.loadFirstData(this.imageClicked, this.pageCounter, this.swapiObjectClass, this.tableHeader);          
        });

        this.starshipImage.addEventListener("click", async (e) => {
            this.imageClicked = e.target.id;
            this.pageCounter = 1;
            this.swapiObjectClass = SwapiStarships;
            this.tableHeader = this.swapiTable.starshipsHeader;
            await this.loadFirstData(this.imageClicked, this.pageCounter, this.swapiObjectClass, this.tableHeader);    
        });
        
        this.planetImage.addEventListener("click", async (e) => {
            this.imageClicked = e.target.id;
            this.pageCounter = 1;
            this.swapiObjectClass = SwapiPlanets;
            this.tableHeader = this.swapiTable.planetsHeader;
            await this.loadFirstData(this.imageClicked, this.pageCounter, this.swapiObjectClass, this.tableHeader);
        });

        this.nextBtn.addEventListener("click", async () => await this.loadNewData(this.imageClicked, ++this.pageCounter, this.swapiObjectClass, this.tableHeader));

        this.previousBtn.addEventListener("click", async () => await this.loadNewData(this.imageClicked, --this.pageCounter, this.swapiObjectClass, this.tableHeader));

        // Sorting the created objects from the API, then creating a new table with them
        document.addEventListener("click", (e) => {
            if(e.target.id === "ascArrow") {
                this.swapiObjects.sort((a, b) => a.name.localeCompare(b.name));
                this.swapiTable.createTable(this.tableHeader, this.swapiObjects, this.tableField);
            }
            else if(e.target.id === "descArrow") {
                this.swapiObjects.sort((a, b) => b.name.localeCompare(a.name));
                this.swapiTable.createTable(this.tableHeader, this.swapiObjects, this.tableField);
            }
        });

        this.searchBtn.addEventListener("click", async () => {
            await this.loadSearchResult(this.imageClicked, this.pageCounter, this.inputField.value, this.swapiObjectClass, this.tableHeader);
            this.inputField.value = "";
        })

        this.backBtn.addEventListener("click", async () => {
            Loader.show();
            this.emptyPage();

            await this.loadNewData(this.imageClicked, this.pageCounter, this.swapiObjectClass, this.tableHeader);
            this.backBtn.style.visibility = "hidden";
            Loader.hide();
        })
    }
}