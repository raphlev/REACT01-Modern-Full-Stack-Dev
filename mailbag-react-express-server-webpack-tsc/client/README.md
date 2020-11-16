# Setting project


Create a client directory under the project root directory alongside the server directory.
Then, create a src directory in it.

```
npm init
```

# Adding material, react , normalize css and axios for front-end

```
npm install --save @material-ui/core
npm install --save @material-ui/icons
npm install --save axios
npm install --save normalize.css
npm install --save react
npm install --save react-dom
```

- normalize.css – A CSS reset to ensure we start with a consistent client-side environment across browsers as far as styles go
- Axios – A library for server communications (more on this later)
- Material-UI – A library providing UI widgets to build our UI with based on Google’s Material guidelines (more on this later too)

# Adding typescript

```
npm install –save-dev typescript
npx tsc -init
npm install --save-dev @types/material-ui
npm install --save-dev @types/react
```

Update tsconfig.json
```
{
  "compilerOptions" : {
    "esModuleInterop" : true,
    "sourceMap" : true,
    "noImplicitAny" : false,
    "module" : "commonjs",
    "target" : "es6",
    "lib" : [ "es2015", "es2017", "dom" ],
    "removeComments" : true,
    "jsx" : "react",
    "allowJs" : true,
    "baseUrl" : "./",
    "paths" : { "components/*" : [ "src/components/*" ] }
  }
}
```
there are some additional installation and configuration steps we must do because the client will be using Webpack. It will have been installed at this point, but we must initialize this project with Webpack too

# Adding Webpack

```
npm install --save-dev webpack
```

Webpack isn’t installed globally, we’ll have to use npx and initialize the webpack project.
Scaffold a webpack project: 

```
npx webpack init
```

That creates a default webpack.config.js file. As an aside, you also should go ahead and delete the .yo-rc.json file that’s created since it won’t be needed (you can keep the README.md file if you want though). For our purposes here, the answers you give during this step won’t matter because we’re just going to overwrite the file with the following:
```
const HtmlWebPackPlugin = require("html-webpack-plugin");
module.exports = {
  entry : "./src/code/main.tsx",
  resolve : { extensions : [ ".ts", ".tsx", ".js" ] },
  module : {
    rules : [
      { test : /\.html$/, use : { loader : "html-loader" } },
      {
        test : /\.css$/,
        use : [ "style-loader", "css-loader"] 
      },
      { test : /\.tsx?$/, loader: 'awesome-typescript-loader' }
    ]
  },
  plugins : [
    new HtmlWebPackPlugin({ template : "./src/index.html",
    filename : "./index.html" })
  ],
  performance : { hints : false },
  watch : true, devtool : "source-map"
};
```

You can see the rules defined for handling HTML, CSS, and TSX files, using the loaders installed before.
The HtmlWebPackPlugin has a particular purpose. We tell Webpack what HTML file in our source code to start with via the entry attribute, and it then modifies it as needed (including adding a proper module loader) so that our app can be launched after Webpack has transformed it. This plug is responsible for that.
The performance attribute is necessary because, by default, Webpack will produce a warning or error, depending on various factors, if the final bundle is over 250Kb. Setting performance : { hints : false } disables this behavior.
Setting watch:true serves much the same purpose as the scripts entries in the server did: Webpack will watch our source files and automatically rebuild the client if any files change. That gives us that nice, fast turnaround for changes we so liked when working with the server code, but we get it “for free” with Webpack just by adding this attribute!
Finally, devtool set to "source-map" ensures that a source map is created for the final bundle, allowing us to do some debugging when necessary.



# Other way to install webpack

```
npx webpack
```

When you do this, Webpack will request that you install the webpack-cli module, and you should say yes to allow it since you won’t get much further than this if you don’t! This is what will allow you to execute Webpack commands. You’ll only need to do this the first time you execute Webpack. You should see a warning about the mode option not being set when you execute this command. That’s okay! Webpack will default to production mode if you don’t set the mode in the configuration file or pass it on the command line as previously discussed, and this is fine for our purposes here.

When this completes, you should find that you now have a dist directory, and within it should be a main.js file. Recall from earlier that by default, Webpack looks for src/index.js as the entry point and creates dist/main.js, and that’s precisely what we see here, entirely without telling Webpack anything at all about our project.

or install manually other webpack components - if needed - bebpack init may already added some of them in package.json

```
npm install --save-dev webpack-cli
npm install --save-dev webpack-dev-server
npm install --save-dev awesome-typescript-loader
npm install --save-dev babel-plugin-syntax-dynamic-import
npm install --save-dev css-loader
npm install --save-dev html-loader
npm install --save-dev html-webpack-plugin
npm install --save-dev style-loader
npm install --save-dev ts-loader
```

# Other way How-To-Prepare-React-App

Configuring react with webpack is difficult, create-react-app a a tool that does the configuration automatically
- https://create-react-app.dev/docs/getting-started
- Don't use create-react-app:https://dev.to/nikhilkumaran/don-t-use-create-react-app-how-you-can-set-up-your-own-reactjs-boilerplate-43l0
- Use create-react-app: 
  . https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-create-react-app-fr
  . https://www.newline.co/fullstack-react/p/using-webpack-with-create-react-app/

In this project we configured react app and webpack manually

# Execute CLIENT

Use build script manually added to package.json

```
npm install
npm run build
```

Browse to http://localhost/
