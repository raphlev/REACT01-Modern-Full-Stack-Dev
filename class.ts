class Planet1 {
[x: string]: null;
constructor() {
this.name = null;
this.mass = null;
}
}
class Planet2 {
name: string | undefined;
mass: number | undefined;
}

class Planet3 {
name: string;
mass: number;
constructor(inName: string, inMass: number) {
this.name = inName;
this.mass = inMass;
}
}
class Planet4 {
private name: string = "none";
protected mass: number;
constructor(inName: string, inMass: number) {
this.name = inName;
this.mass = inMass;
}
public printName() {
console.log(this.name);
}
public calcSuperMass(a: number | string): number {
if (typeof a === "number") {
return this.mass * a;
} else {
return this.mass * parseInt(a);
}
}
}
let i: Planet4 = new Planet4("Venus", 12);
i.printName();
class Jupiter extends Planet4 {
private colorBands: boolean = true;
constructor() {
super("Jupiter", 1234);
}
}
let j: Jupiter = new Jupiter();
j.printName();

// typescript error: Property 'name' is private and only accessible within class 'Planet4'.ts(2341)
// This would work in plain javascript : uncomment line below and execute node class.js
// console.log(j.name); 
// typescript error: Property 'mass' is protected and only accessible within class 'Planet4' and its subclasses.ts(2445)
// This would work in plain javascript : uncomment line below and execute node class.js
// console.log(j.mass); 

class Planet5 {
private _name: string = "No name set";
get name() {
return `This planet's name is '${this._name}'.`;
}
set name(inName: string) {
if (inName === "Pluto") {
this._name = "Not a planet";
} else {
this._name = inName;
}
}
}
let p: Planet5 = new Planet5();
console.log(p.name); // 'No name set'.
p.name = "Pluto";
console.log(p.name); // 'Not a planet'
p.name = "Venus";
console.log(p.name); // 'Venus'

class Planet6 {
readonly name: string = "No name set";
static theBorgLiveHere: boolean = true;
}
let q: Planet6 = new Planet6();
console.log(q.name); // Okay
// q.name = "Neptune"; // Error - Cannot assign to 'name' because it is a read-only property.ts(2540)- 
console.log(Planet6.theBorgLiveHere); // true - using static member (static method in this case)

abstract class BasePlanet {
    name: string;
    radius: number;
    constructor(inName: string, inRadius: number) {
    this.name = inName;
    this.radius = inRadius;
    }
    abstract collapseToBlackHole(inMoreMass: number): void;
    calcDiameter() {
    return this.radius * 2;
    }
}
class Earth extends BasePlanet {
collapseToBlackHole(inAdditionalMass: number) {
// Perform physics-breaking 2001-like monolith magic here
}
}
