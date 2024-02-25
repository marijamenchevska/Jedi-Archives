export class ApiService {
    constructor () {
        this.url = "https://swapi.dev/api/";
    }

    // Different URL weding for searching items
    async getAPIdata (dataType, page, urlEnding = `/?page=${page}`) {
        const response = await fetch(`${this.url}${dataType}${urlEnding}`);
        const parsedReponse = response.json();
        return parsedReponse;
    }
}