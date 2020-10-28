//No interface

function greet(person: any) {  alert(`Hello, ${person.firstName}`); }
const person = { firstName : "Frank" }; 
greet(person);


//Inline Interface

function greet(person: { firstName: string }) {  alert(`Hello, ${person.firstName}`); } 
const person = { name : "Frank" }; 
greet(person);


//Interface

interface IPerson {  
    firstName: string; 
}; 
//The name of the interface can be anything you wish, but I like to put a capital I in front of it like here so that I can at a glance differentiate it as an interface from, say, a class name. 
//Now, we can use that interface in the same way as when it was defined inline: 
function greet(person: IPerson) {  alert(`Hello, ${person.firstName}`); } 
function greetLouder(person: IPerson) {  alert(`HELLO, ${person.firstName}!!!!`); } 
const person = { firstName : "Frank", hairColor : "Black" };

interface IPerson {  
    firstName: string; 
    getGreeting(lastName: string): string; 
}; 
const person = {  
    firstName : "Frank",  
    getGreeting(lastName: string) {  return `Hello, ${this.firstName} ${lastName}`; } 
}; 
function greet(person: IPerson) {  alert(person.getGreeting("Zammetti")); } 
greet(person);


//Class implements Interface

interface IPerson {  
    firstName: string; 
    greet(): void; 
}; 
class Person implements IPerson { 
    firstName: string; 
    constructor(inFirstName: string) {  
        this.firstName = inFirstName; 
        }  
    greet() {  alert(`Hello, ${this.firstName}`); } 
} 
const p = new Person("Frank"); 
p.greet();


//Extending Interface

interface IPerson {  firstName: string; } 
interface INinja extends IPerson {  numberOfSwords: number; }
let ninja = {} as INinja; 
ninja.firstName = "Ryuki"; 
ninja.numberOfSwords = 2;


//Namespace

namespace MyFirstNamespace {  
    export let homeworld = "Jakku"; 
    export function sayName() { alert("Rey"); }; 
} 
//The namespace keyword , unsurprisingly, denotes a namespace definition, which you then give a name (MyFirstNamespace) 
//and then open and close the block as you would any other code block, with braces. 
//Inside the block, anything you define is only accessible within that namespace unless you export it. As you can see, 
//you can export variables and functions, both of which you can then access as follows: 
alert(MyFirstNamespace.homeworld); 
MyFirstNamespace.sayName();

namespace MyFirstNamespace {  export let homeworld = "Jakku"; } 
const homeworld = "Coruscant"; 
alert(MyFirstNamespace.homeworld); // Jakku 
alert(homeworld); // Coruscant
//While namespaces can help organize your code within a single file, they become a bit more useful when you realize that you can
// break them up into multiple files: 
// app.ts 
SomeNS.someFunc1(); 
SomeNS.someFunc2(); 
// file1.ts 
namespace SomeNS { export someFunc1() { } } 
// file2.ts 
namespace SomeNS { export someFund2() { } } 
//But, to make this work, you must import both of the resultant .js files (file1.js and file2.js) in the HTML file 
//that you execute to run your app (and, of course, you also need to import app.js). Just because they’re used 
//in app.ts (and ultimately app.js) doesn’t mean that they are automatically available for use like that. 
//Instead of having to import multiple .js files in the HTML document, you can instead have tsc bundle them for you: 
tsc --outFile main.js file1.ts file2.ts app.ts 
//This will result in a single main.js file being produced that includes the (compiled) contents of file1.ts, file2.ts, and app.ts
//When bundling like this, you must be aware that order can matter. The files are concatenated in the order you provide, 
//so if the result of that concatenation is that some code references other code that isn’t in proper source order in the 
//final output file, then you can wind up with a runtime error

//Even better than having to bundle or import separate .js files and worry about their order is to use a TypeScript-specific syntax
// for important namespaces, the /// symbol. 
//To use it, in the app.ts file, you would write 
/// <reference path="file1.ts" /> 
/// <reference path="file2.ts" /> 
//TypeScript, at compile time, will take care of bundling those files together. In this case, you only name the output file,
// not all the files that go into it, and TypeScript will take care of the rest, including that things are in the correct order. 
//Once you have the code bundled or properly imported, something else you can do is save yourself some typing by aliasing things 
//in a namespace: 
import h = MyFirstNamespace.homeworld; 
//This way, you can just do alert(h) to see “Jakku.” You can dig into nested namespaces if you need to 
//(meaning alias as many levels down in nested namespaces as you wish) or alias the entire namespace itself if you want
// a shorter/simpler/more logical name.


//Modules

//At the code level, you can export anything you like from a module (assume this is in a file named Modules): 
// Variable 
export let captain = "Picard"; 
// Interface 
export interface CaptainChecker {  isGreat(inName: string): boolean; }
// Function 
export function addFirst(inLast: string): string {  return "Jean Luc " + inLast;} 
// Class 
export class Ship {  const name = "Enterprise";} 
// Type alias 
export type cap = captain; 
//To then make use of this, in another source file, you would import the things you need from the module: 
Import { addFirst } from "./MyModule" 
//After that, you can execute it like any other function: 
addFirst("Riker"); // Wrong last name, but not the point! 
//Alternatively, you could write your module like so: 
function addFirst(inLast: string): string {  return "Jean Luc " + inLast;} 
export addFirst; 
//It’s really just a matter of style choice whether you want to separate the export from the definition of what you’re exporting. 
//But, with the latter approach, you can do something else: 
export { addFirst as myAddFirstFunc } 
//Now, addFirst will not be available for import, myAddFirstFunc will be instead. 
//In this fashion, you can have a different name internal to the module as what is externally exposed. 
//Again, it’s a matter of style and little else. 
//If you want to import an entire module, there is a handy shortcut for that: 
import * as TheModule from "./MyModule" 
//Modules can also have a single default export. You simply use the keyword default after the export keyword for the
// item you want to make the default export: 
export default let captain = "Picard"; 
//What that does for you is that now your import can be this: 
import cap from "./MyModule"

//One nice thing about modules is that you never have to worry about ordering, meaning what order the various JavaScript
// files get loaded in. Modules are declarative, meaning everything is based on imports and exports. 
//The reason this can work is that modules require a loader. You see, browsers don’t know how to deal with modules on their own.
// Instead, a loader, which is just some JavaScript that knows how to load modules, takes care of it. 
//There are several competing module formats and loader mechanisms that have evolved over the years. 
//Some offer slightly different syntax for importing and exporting. Perhaps the best-known module loader, 
//and most used, is called SystemJS. To use it, you must install it first: 
npm install --save systemjs 
//Then, in the HTML file that loads your app, instead of loading, say, app.js directly, you instead load the module loader: 
<script src="./node_modules/systemjs/dist/system.js"></script> 
//Naturally, you can move that file to another location if you wish, there’s no need to leave it in node_modules. 
//But either way, after that, you add some new code to the page: 
SystemJS.config({ baseURL : "/",  packages : { "/" : { defaultExtension : "js" } } }); 
SystemJS.import("app.js"); 
//This configures the module loader, providing it the base URL from which modules are resolved, and allows you to specify
// which modules are to be loaded (here it’s just saying load whichever are present in the directory). 
//After that, you tell the loader to load your starting file, app.js, and it takes care of the rest! Any imports in app.js, 
//as well as any exports in any modules, will now be handled by the loader. 
//All the imports and exports that you wrote in your original TypeScript source files will be compiled down to 
//JavaScript that knows how to interact with the module loader, which will then take care of loading everything
// and ensuring everything is in the right order as necessary.


//Generic

// function that can accept only string variable type
function echoMe(inArg: string): string { return inArg; }
// function that can accept any variable type
function echoMe(inArg: any): any { return inArg; } 
//Typing the argument and return as any (or specifying to type and allowing TypeScript to infer any) will work, 
//but it gives up a lot of the core benefits of TypeScript in terms of type safe
//Another option is to change echoMe() to echoString() and then add a second function: 
function echoNumber(inArg: number): number { return inArg; }
// Generic type: use of a type variable T or anything else
function echoMe<T>(inArg: T): T { return inArg; }
// Interface with Generic type
interface Args<K, L>{ arg1: K, arg2: L } 
function logTypes<T, U>(inArg1: T, inArg2: U): Args<T, U> {  
    console.log(typeof(inArg1), typeof(inArg2)); 
    let args: Args<T, U> = {  arg1: inArg1, arg2: inArg2  }; 
    return args;
}
console.log(logTypes<string, number>("frank", 42));
// generic argument type can be any string value
interface Args <arg1Type, arg2Type>{  arg1: arg1Type, arg2: arg2Type }
