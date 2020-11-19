# togglStat

## Features
- Time reporting statistics web site interacting with [Toggl.com](https://toggl.com/).
- Extends free version with weekly and monthly reports as well as pdf generation.
- React application interacting with the public api towards Toggl.
- Components created are aimed to be generic and reusable.
 
## Background
- This project was created to learn React, Github and some other stuff.
- This project was initially the [assigment](./assignment/ReactKurs_Projektbeskrivning_2020HT_StefanLindepil.pdf) for a React development course at [Chas Academy](chasacademy.se) in Sweden.

## Learning the Toggl API
Some details are summarized in [src/hacks/TogglApi.md](/src/hacks/TogglApi.md)

## Source code folder structure
- src
  - components 
    - Reusable headers, input fields, lists, dropdowns etc.
  - hacks 
    - Exploratory parts, curl + toggl api.
  - services 
    - Context for Toggl connection, encapsulation of local storage
    and dotenv files ('.env') 
  - views
    - The different views of the application.

# Preconditions before using the application
1. Clone the '.env.example' file and rename to '.env', located in the root folder.
2. Create a free account at Toggl.com
   - Create a workspace
   - Create a project
   - Start measure some time, give the entries some descriptions
3. At Toggl.com, copy your API token at the bottom of the Profile page and paste it inside your '.env' file.
   ```  
   REACT_APP_TOGGL_API_TOKEN="YOUR-PRIVATE-TOKEN"
   ```
4. Optionally disallow **Debug option** by emptying the section
   ```  
   REACT_APP_SHOW_DEBUG_OPTION="" 
   ```

# Configure environment
  
## Setup the code with all dependencies
First you need to initialize the code.
In the project directory, you can run:

### `npm install`

## Start application
In the project directory, you can run:

### `npm start`

This will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) 
to view it in the browser.

# How to use the application - Workflow
1. Visit the Connect view.
   - Click Connect
     - If success, a dropdown with available **workspaces** are shown.
     - Select one workspace.
       - Then select one project.
2. Visit the Home view.
   - View information about project and statistics
3. Visit the Weeks view.
   - View weekly reported time.
4. Visit the Months view.
   - View monthly reported time.
5. Optionally enable **Debug option** in '.env' file, restart
   and visit the Settings view.
   - Select the checkbox for Debug mode.
     - Several views will show additional non-production features.

# Future features

- Layout 
  - Styling
  - Pictures
  - Logo and icons

- Charting, e.g. https://www.developerdrive.com/how-to-chart-your-hours-with-apis-javascript-and-svg/

- Improved documentation
  - Short video how to use the app
  

# Continue development
## Run unit tests and code coverage.
In the project directory, you can run:

### `npm test`
or
### `npm test -- --coverage`

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Build for production

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
