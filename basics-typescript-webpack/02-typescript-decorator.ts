//Decorators 

//Decorators are an interesting addition to JavaScript that is still in the proposal stage at the time of this writing, 
//but which TypeScript offers as an experimental feature. In order to use them, 
// you have to add the 
experimentalDecorators:true 
// option to your tsconfig.json file 
//(or, optionally, you can pass the --experimentalDecorators switch to tsc, which you can, in fact, do for most options in tsconfig.json
// if you would prefer not to have the config file at all but still use these sorts of options). 
//Decorators are essentially metadata that you can add to the definition of a number of code elements.
// If you’ve ever seen annotations in other languages, like Java, then you are already familiar with the basic concept. 
//Decorators are expressed in the form 
@<name>
//, where name must evaluate to a function at runtime. This function will be passed information about the element decorated. 
//For example, say we want to provide some logging in the constructor function of a class. 
//Let’s further say that for whatever reason, we don’t want to modify the code within the class 
//(maybe we didn’t write it ourselves and don’t want to mess around with code provided by someone else). 
//For this, you can use a class decorator. You can do that as follows: 
function logConstructor(inConstructor: Function) {  console.log(inConstructor); } 
@logConstructor 
class Spaceship {  
    constructor() { console.log("constructor"); }
} 
const s = new Spaceship(); 
//Here, we have a function, logConstructor() , that we decorate the Spaceship class with. 
//The class just has a simple constructor in it. If you run this in the playground and look in the console of your browser’s dev tools,
// you should see something like this: 
VM68:9 class Spaceship {  constructor() { console.log("constructor"); } } 
VM68:12 constructor 
//When the class is instantiated, the function is called. A class decorator like this is always passed just the constructor, 
//but remember that it’s the runtime constructor, which is why we get the entire Spaceship function and not the constructor 
//defined at the source level. In this example, that constructor is logged. Then, the actual constructor of the class that 
//is defined in it executes, which is where the second log output comes from. This decorator mechanism provides us 
//an opportunity to modify the class definition if we want, even potentially returning an entirely new class definition
// (though, as you might imagine, you can really muck things up by doing that if you aren’t careful). 
//Note You may see different VM values here, or you might not see any at all, or it might be on the right-hand side. 
//Any of these are okay. The VM notation is something Chrome dev tools (and some other browsers’ dev tools as well) 
//does when it can’t identify the source of some JavaScript. VM stands for virtual machine and refers to the JavaScript 
//virtual machine, which of course is ultimately the source of the code. This frequently happens when using the JavaScript
// eval( ) function, and given what the TypeScript playground does, it’s not hard to imagine that probably comes into play
// at some point to make it all work, so seeing those VM strings somewhere isn’t surprising. 
//They’re also irrelevant for what we’re doing here, but it’s good to know what it’s all about so as to avoid 
//any potential confusion about why what you may see when you run the code isn’t 100% identical to what’s printed here. 
//The other types of decorators are the following: 
//• Method – Placed just before a method declaration, the decorator function will be passed either the constructor for a 
//  static class or the prototype of the class for an instance member, the name of the decorated method, and a descriptor for the method. 
//• Accessor – Placed just before an accessor declaration, the decorator function will be passed either the constructor 
//  for a static class or the prototype of the class for an instance member, the name of the decorated accessor, 
//  and a descriptor for the accessor. 
//• Property – Placed just before a property declaration, the decorator function will be passed either the constructor for 
//  a static class or the prototype of the class for an instance property and the name of the decorated property. 
//• Parameter – Placed just before the name of the parameter in a function argument list, the decorator function will be
//  passed either the constructor for a static class or the prototype of the class for an instance member, the name of the 
//  decorated parameter, and the ordinal index of the parameter in the function’s argument list. 

// DECORATOR FACTORIES 

// Sometimes, you’ll want to be able to pass information to a decorator in order to vary what the decorator does. 
//To achieve that, you can create a decorator factory. In simplest terms, this is a function that returns a function. 
//The function returned is the actual decorator function, and the function that returns it is the decorator factory. 
//That may seem a bit confusing, so let’s see it in code: 
function logConstructorFactory(inEnabled: boolean) {
    if (inEnabled) {  
        return function(inConstructor: Function) {  console.log(inConstructor); }  
    } else {  
        return function() { }; 
    } 
}
@logConstructorFactory(true) 
class Spaceship {  
    constructor() { console.log("Spaceship constructor"); } 
} 
@logConstructorFactory(false) 
class Spacestation {  
    constructor() { console.log("Spacestation constructor"); } 
    const s = new Spaceship(); 
    const t = new Spacestation(); 
}
//The logConstructorFactory() function is the factory. It returns a function, but what function it returns depends 
//on the inEnabled argument passed in. This will give us the ability to enable or disable logging: when true, we get 
//the function that contains the console.log() call; when false, we get an empty function so that no logging will occur 
//in the latter case. 
//Then, the decorator attached to the Spaceship and Spacestation classes now pass a boolean value to it, 
//enabling logging for the Spaceship class and disabling it for Spacestation. When executed, in the console you’ll see 
VM73:11 class Spaceship {  constructor() { console.log("Spaceship constructor"); } } 
VM73:16 Spaceship constructor 
VM73:22 Spacestation constructor 
//As expected, the constructor of the Spaceship class is logged, but the constructor of Spacestation is not. 
//As with plain old decorators, you can use decorator factories for all five types of decorators, not just class decorators
