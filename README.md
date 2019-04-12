This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Readable

This project was made following instructions of the Udacity's course React Nanodegree Program.

The rubric spec didn't ask for login pages or security issues, so I didn't made it.

## Dependencies

The rest servers was delivered by Udacity, and can be get on git hub (https://github.com/udacity/reactnd-project-readable-starter)

## Structure

Bellow there is some comments about the application structure, some obvious things like what action _question_ does, triggers the actions for questions, so it was not described here ( =D ). 

    .
    ├── ...
    ├── src                   # Where the intelligence lives
    |   ├── actions           # All the actions responsible to trigger the updates
    |   ├── components        # Customized components 
    |       └── nav.js        # Routes's implementation, responsible for loading all components
    |   ├── middleware        # Middlewares for the app, the logger stays in here
    |   ├── reducers          # Reducers responsible for updating the state
    |   └── utils             # Place to put shared files
    |       ├── store.js      # Where the store lives
    |       └── api.js        # A facede to work with_ _data.js_, so components can be more abstractive
    |── App.js                # Where I load initial data and _navControl.js_
    └── ...

## First steps

All you need to do is run the command bellow to install all dependencies

### `npm install`

And then this other command to get things running
### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
