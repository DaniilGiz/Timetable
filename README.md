# Timetable
A small application written in React with TypeScript. This is a school schedule using react-beautiful-dnd. The idea is to create a timetable for each class.
## A more detailed description:
We have some number of classes, teachers, classrooms. And we have subjects.
Let's say on Monday first period you have to have different teachers, different classrooms, but the subjects can be repeated, because there can be more than one teacher, who teaches, let's say, Math. 
If there is an error on Monday, i.e. one teacher teaches more lessons or the same classroom is occupied by two classes at once, the subjects will be highlighted in red. If there is no error they will take the default color.

## Usage Guide:
Items can be dragged and dropped around the classroom. So the first lesson on Monday can be put last on Friday. But you cannot change lessons between classes. Also if you drag a lesson beyond the timetable boundaries, it will be deleted. So far there is no limit on deleted lessons.

## Available Scripts

In the project directory, you can run:

### `npm install`

This command installs a package and any packages that it depends on.
If there are any problems with packages try it:

### `npm update`

This command will update all the packages listed to the latest version

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

