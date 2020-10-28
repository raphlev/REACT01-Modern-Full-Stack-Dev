"use strict";
class Planet1 {
    constructor() {
        this.name = null;
        this.mass = null;
    }
}
class Planet2 {
}
class Planet3 {
    constructor(inName, inMass) {
        this.name = inName;
        this.mass = inMass;
    }
}
class Planet4 {
    constructor(inName, inMass) {
        this.name = "none";
        this.name = inName;
        this.mass = inMass;
    }
    printName() {
        console.log(this.name);
    }
    calcSuperMass(a) {
        if (typeof a === "number") {
            return this.mass * a;
        }
        else {
            return this.mass * parseInt(a);
        }
    }
}
let i = new Planet4("Venus", 12);
i.printName();
class Jupiter extends Planet4 {
    constructor() {
        super("Jupiter", 1234);
        this.colorBands = true;
    }
}
let j = new Jupiter();
j.printName();
// typescript error: Property 'name' is private and only accessible within class 'Planet4'.ts(2341)
// This would work in plain javascript : uncomment line below and execute node class.js
// console.log(j.name); 
// typescript error: Property 'mass' is protected and only accessible within class 'Planet4' and its subclasses.ts(2445)
// This would work in plain javascript : uncomment line below and execute node class.js
// console.log(j.mass); 
class Planet5 {
    constructor() {
        this._name = "No name set";
    }
    get name() {
        return `This planet's name is '${this._name}'.`;
    }
    set name(inName) {
        if (inName === "Pluto") {
            this._name = "Not a planet";
        }
        else {
            this._name = inName;
        }
    }
}
let p = new Planet5();
console.log(p.name); // 'No name set'.
p.name = "Pluto";
console.log(p.name); // 'Not a planet'
p.name = "Venus";
console.log(p.name); // 'Venus'
class Planet6 {
    constructor() {
        this.name = "No name set";
    }
}
Planet6.theBorgLiveHere = true;
let q = new Planet6();
console.log(q.name); // Okay
// q.name = "Neptune"; // Error - Cannot assign to 'name' because it is a read-only property.ts(2540)- 
console.log(Planet6.theBorgLiveHere); // true - using static member (static method in this case)
class BasePlanet {
    constructor(inName, inRadius) {
        this.name = inName;
        this.radius = inRadius;
    }
    calcDiameter() {
        return this.radius * 2;
    }
}
class Earth extends BasePlanet {
    collapseToBlackHole(inAdditionalMass) {
        // Perform physics-breaking 2001-like monolith magic here
    }
}
