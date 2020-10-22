To compile JSX
- npm install --save-dev @babel/core @babel/cli
Usage from command line: npx babel
Logical groupings of plugins that can be enabled all in one batch. 
There are several presets, but the two most used are env and react.

env--> for javascript transpiler to support previous browser or node version
react--> for jsx transpiler

- npm install --save-dev @babel/preset-env @babel/preset-react 
Other for JSX syntax
- npm install --save-dev @babel/plugin-proposal-class-properties

Note - for React "only" You only need the react preset, you don’t need the env preset, so if you’re following
along, then you can remove the env dependency from package.json. However, it does
no harm to leave it there, so it’s entirely up to you.

Compile JSX
PRE-REQUESITE (see above): npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties
- npx babel main.jsx --out-file main.js

Install typescript
- npm install typescript
Configure typescript
- tsc -init  --> generate tsconfig.json : see typescriptlang.org/play for typical ES2017 configuration of this file

tsc will compile all files in the current directory and subdirectories (if necessary) if a tsconfig.json file is present. If you know you need it to skip specific files though, you can add the exclude element, and then list the files not to compile. You can also explicitly include things with the files element. When you compile a TypeScript file with tsc, it’s really doing a transpilation. It’s “compiling” from TypeScript to JavaScript. Earlier, I said that tsc does much the same thing as Babel does, and that’s true in this regard. The implication of this is that TypeScript supports most ES6 features. It doesn’t support all of them, though, so it’s good to know which you should avoid. Fortunately, there is a handy chart you can use here: kangax.github.io/compat-table/es6.

Using input file with tsc - as below - will not use tsconfig.json
-> tsc .\calcSum.ts 
-> node .\calcSum.js

Without input file, it will compile all *.tsc of dir & subdirectories where tsconfig.json is stored
--> tsc
--> tsc --watch // tsc -w