# togglStat

### Features
- Time reporting statistics web site interacting with [Toggl.com](https://toggl.com/).
- Extends free version with weekly and monthly reports.
- React application interacting with the public api called "toggl-api" towards Toggl.
- [Components](./src/components) created are aimed to be generic and reusable.
- Uses a custom built npm package [@2stefant.org/alldays](https://github.com/2stefant/alldays).
- Uses the [DurationCalculator](./src/services/DurationCalculator.js) for conversion from milliseconds to other time formats. 
- Uses the [ConfigService](./src/services/ConfigService.js) for encapsulation of '.env' features and localstorage.

### Demo 
![togglStat](/shots/togglStat.gif)

### Background
- This project was created to learn React, Github, Curl, Typescript etc.
- This project was initially the [assignment](./assignment/ReactKurs_Projektbeskrivning_2020HT_StefanLindepil.pdf) for a React development course at [Chas Academy](https://chasacademy.se) in Sweden.

## Technologies
This application is written with:
- Visual Studio Code
- React
- Javascript
- Jest, JavaScript Testing Framework with Code coverage enabled as default
- Moment.js, javaScript date library for parsing, validating, manipulating and formatting dates

### Learn the Toggl API
Some details are summarized in [./src/hacks/TogglApi.md](./src/hacks/TogglApi.md)

### Learn how to create a custom npm package
Some details are summarized in [./src/hacks/NpmQuickstart.md](./src/hacks/NpmQuickstart.md)

## Preconditions - Before using the application
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

## Configure environment
  
### Setup the code with all dependencies
First you need to initialize the code.
In the project directory, you can run:

### `npm install`

### Start application
In the project directory, you can run:

### `npm start`

This will run the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) 
to view it in the browser.

## Workflow - How to use the application
Note: Example screenshots are available [here](./shots/ScreenShots.md)
1. Visit the Connect view.
   - Click Connect
     - If success, a dropdown with available **workspaces** are shown.
     - Select one workspace, copy its **workspaceId**.
       - Go to the settings page and paste the workspaceId into its input field. 
       - Save settings.
2. Visit the Home view.
   - View information about project and statistics.
   - Copy one **projectId**.
   - Go to the settings page and paste the projectId into its input field. 
    - Save settings.
3. Visit the Weeks view.
   - View weekly reported time.
4. Visit the Months view.
   - View monthly reported time.
5. Optionally enable **Debug option** in '.env' file, restart
   and visit the Settings view.
   - Select the checkbox for Debug mode.
     - Several views will show additional non-production features.

## Continue development
### Run unit tests and code coverage.
In the project directory, you can run:

### `npm test`
or
### `npm test -- --coverage`

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Update referenced npm packages to newer versions.
### `npm update`

### Build for production

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### Source code folder structure
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

### Future features
- Layout 
  - Styling
  - Pictures
  - Logo and icons

- Pdf generation for weekly/monthly reported time.

- Charting, e.g. https://www.developerdrive.com/how-to-chart-your-hours-with-apis-javascript-and-svg/
