# setting up project

npm init
npm install –save-dev typescript
npx tsc -init

Update tsconfig.json file, specifically the following:
• Uncomment the "outDir" element and set its value to "./dist". We want all our compiled files to go into a dist subdirectory.
• After the "compilerOptions" element, add "include": [ "src/**/*" ]. So, the file should have this form when you’re done:
{
"compilerOptions": {
...lots of compiler options...
},
"include": [ "src/**/*" ]
}
This will ensure that tsc only tries to compile files in the src directory.
• Although not necessary, also uncomment the "sourceMap" option and ensure it’s set to true, to make debugging easier.

# Adding modules

npm install --save emailjs-imap-client
npm install --save express
npm install --save mailparser
npm install --save nedb
npm install --save nodemailer

# Adding types

npm install --save-dev @types/express
npm install --save-dev @types/mailparser
npm install --save-dev @types/nedb
npm install --save-dev @types/node
npm install --save-dev @types/nodemailer

# Adding dev monitoring

npm install --save-dev nodemon


Update package.json :
"scripts": {
"compile": "npx tsc && node ./dist/main.js",
"dev": "node ./node_modules/nodemon/bin/nodemon.js -e ts --exec \"npm run compile\""
}
the -e option. By default, nodemon watched for changes in .js, .mjs, .coffee, .litcoffee, and .json files. With -e though, we can tell it to watch other types of tiles, .ts files in this case. The --exec option is used to tell nodemon what to do when those files change, so now any time nodemon sees changes to our TypeScript source files, it will execute the compile command.

# start dev 

npm run dev

nodemon will begin monitoring our source TypeScript files. When any change, it will compile them and then start up the resultant main.js file. Now, we’ve got ourselves a nice little workflow: we can happily peck away at our source files, and then compile and restart will be automatic, making our work quicker and our life easier!
Note
If compiler errors occur, nodemon will still try to start up the app because it doesn’t know not to. That obviously isn’t going to go well, so you need to keep an eye on your console when you make changes to ensure they’re valid and running when you expect them to be.
