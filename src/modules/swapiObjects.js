export { SwapiPeople, SwapiStarships, SwapiPlanets }

class SwapiPeople {
    constructor ({name, height, mass, gender, birth_year, films}) {
        this.name = name;
        this.height = height;
        this.mass = mass;
        this.gender = gender;
        this.birthYear = birth_year;
        this.appearances = films.length;
    }
}

class SwapiStarships {
    constructor ({name, model, manufacturer, cost_in_credits, passengers, starship_class}) {
        this.name = name;
        this.model = model;
        this.manufacturer = manufacturer;
        this.cost = cost_in_credits;
        this.peopleCapacity = passengers;
        this.class = starship_class;
    }
}

class SwapiPlanets {
    constructor ({name, diameter, climate, terrain, population}) {
        this.name = name;
        this.diameter = diameter;
        this.climate = climate;
        this.terrain = terrain;
        this.population = population;
    }
}