

## Available Scripts

Clone the project 
run ```npm install``` || ```yarn install```

For Now mock api server support on port 3000

### NOTE

Run json-server with --no-cors:
```json-server --no-cors db.json```

to avoid CORS error in development

In the project directory, you can run:

### `yarn start` || `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn lint`

Check for lint errors in files.<br />


### `yarn lint-fix`

fix some lint errors like prettier in files.<br />

## Routing

Routing is configured in /src/App.js in Switch and Route

## Context

Application Context is also configured with custom context provider where you can fetch set context for your application to use as Context.

## Redux

Redux folder structure with actions, reducers and store with capablity to use localStorage

### Project Structure
  1. Public: All the assests like images,css.
  2. Src: All the working code having structure 
     1. Components: Contains all the reusable components that can be use
     2. Routes: Contains all the routes of our web app like home, about (components that needs to render on a particular route)
     3. Actions: All the actions responsible for redux.
     4. Reducers: Reducers for redux.
     5. Store: store of redux.
     6. localStorage: code related to localstorage
