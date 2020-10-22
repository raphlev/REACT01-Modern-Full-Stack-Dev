declare class Planet1 {
    [x: string]: null;
    constructor();
}
declare class Planet2 {
    name: string | undefined;
    mass: number | undefined;
}
declare class Planet3 {
    name: string;
    mass: number;
    constructor(inName: string, inMass: number);
}
declare class Planet4 {
    private name;
    protected mass: number;
    constructor(inName: string, inMass: number);
    printName(): void;
    calcSuperMass(a: number | string): number;
}
declare let i: Planet4;
declare class Jupiter extends Planet4 {
    private colorBands;
    constructor();
}
declare let j: Jupiter;
declare class Planet5 {
    private _name;
    get name(): string;
    set name(inName: string);
}
declare let p: Planet5;
declare class Planet6 {
    readonly name: string;
    static theBorgLiveHere: boolean;
}
declare let q: Planet6;
declare abstract class BasePlanet {
    name: string;
    radius: number;
    constructor(inName: string, inRadius: number);
    abstract collapseToBlackHole(inMoreMass: number): void;
    calcDiameter(): number;
}
declare class Earth extends BasePlanet {
    collapseToBlackHole(inAdditionalMass: number): void;
}
