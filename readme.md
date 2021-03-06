## Ways to Create React Component
-   createClass
-   ES class
-   Function
-   Arrow function

## createClass
```javascript
var helloWorld = React.createClass ({
    render: function(){
        return (
            <h1>Hello</h1>
        );
    }
});
```

## ES Class 
working with modern Javascript. which is most popular.
```javascript
class HelloWorld extends React.Component {
    
    constructor(props){
        super(props);
    }
    render(){
        return (
            <h1>Hello</h1>
        );
    }
}
```

## Function 
another way to declare a function component 
```javascript
function HelloWorld(props){
    return (
            <h1>Hello</h1>
    );
}
```
You can also use `arrow function` style 
```javascript
const HelloWorld = (props) => <h1>HelloWorld</h1>
```
the upper style is used for single line

if you have multiple lines cover the right side with paranthesis.
```javascript
const HelloWorld = (props) => (<h1>HelloWorld</h1>)
```
`var` keyworkd should be avoided use `const`.

## Recommend to use `Functional Component`
- Easy to Understan
- Avoid this keyword
- Avoid class easy to keep away binding
- Less Tranpiled Code for better performance
- Enhanced code completion
- Easy to Test
- Increase performance

## Container and Presentation Components
Presentation Component contains all markup. Recive data and actions via props. Doesn't know about redux. Often no state (child components).
- Read Data From Props
- Invoke call backs on props

Container Component contains => "Backend" for the frontend.
- Subscribe to Redux state
- Dispatch Redux actions

Container Component are Concerned with passing data to child component and actions. They are typically statefull. using the redux connect function at the bottom of the file. 

### Note
Here the small paranthesis is used because of the single expression.

We export this component directly but you can also write
`export default AboutPage` at the end.
```javascript
import React from 'react'
// here the small paranthesis is used because of the single expression
export const AboutPage = () => (
    <div>
        <h2>About</h2>
        <p>
            This app uses react and redux
        </p>
    </div>
)
```

## Switch
Switch in route make sure only one route can be active in a time.

## Why Redux
React context => Global data to the lowlevel components. Toplevel component behave as context

Redux Store => store data when ever component action dispacted the redux store is updated and any component can get this data. 

# Redux 3 Principles
Store cannot be changed directly only way is to emit action. 

Every action like submit form will emit an action. for example user may click the button to submit Contact Form that will hit the SUBMIT_CONTACT_FORM action. 

State changes and handled by pure functions called reducers. Reducers update the state.
Reducer is a function accept the current state in an action, and it returns a new state. 
Each action/Operation is handled by one or more reducers which update the single store. reducer recive current state and action, it contains if switch to check the action type and it return new state. after the new state is returned by reducer the store is update. React re render the component that utlizese the data.

React connect to the store via library react-redux.


### Action
must have a type property
```javascript
rateCourse(rating) {
    return { type: RATE_COURSE, rating: rating}
}

```
You can pass thing that are seralizeable to JSON. You shouldnot pass functions. rateCourse is an action creator. Used to create action

### Store
creating store 

```javascript
let store = createStore(reducer);
```
redux obey the Single Responsibility Pricipal  Store store the data and Reducer concern with change of states.
#### Store can
- store.dispatch(action)
- store.subscribe(action)
- store.getState()
- replaceReducer(nextReducer)

`The only way to change a store by dispatching an action.`

`Store cannot be changed directly.`

`Actions are handled by reducers.`

## Immutability
in place of changing state object, you need to return a new object that represent application new state.

Simply when you change {Number, string, boolean, undefined, null} these types a new copy is created.

Redux depened on immutable state to improve performance.

As example in Js 
- Object.assign
- {...myObj} - Spread Operator
- .map (Immutable friendly array methods)


Deep cloning is expensive 

## Array to avoid that mutate
Push, Pop, Reverse => Must clone array first

Map, Filter, Reduce, Concat, Spread => Prefer to Use 

State is immutable in react
### why Immutability
when state changed in react you know where the state is changed.
- clarity
- Performance
- Awsome sauce > travel in time to see where the state is changed

Where that state changed.

`If state is mutated in redux it will introduce a bug.`


## Reducers
Data changing in handle by redux using reducer. to change store we dispatch an action ultimately handled by reducer. 

A reducer is a function that takes state and an action and returns new state. => meat grinder
```javascript
function myReudcer(state, action){
    // Return new state based on action passed
}
```
Example: handle increment counter

```javascript
function myReducer(state, action){
    switch(action.type){
        case "INCREMENT_COUNTER":
            state.counter++;
            return state;
        default:
            return state;
    }
}

```

You cannot do this you are mutating state
Correct one
`creating the new object by copying the existing state. and on that new object crement the counter.` Reducers must be pure functions they must not have side effects. calling them with same set of argument always returns the values. 

```javascript
function myReducer(state, action){
    switch(action.type){
        case "INCREMENT_COUNTER":
            return {...state, counter: state.counter + 1};
        default:
            return state;
    }
}
```

### 3 things you shouldnot do in Reducers
- Mutate arguments
- Perform side effect => calling api
- Call non-pure functions => date.now or math.random


Reducers should return an updated copy of state. Redux will use that copy to update the store.

## 1 Store and Multiple Reducers
You can manage slices of state changes through multiple reducers in redux.
All reducers get called when an action is dispatched. The switch statement inside each reducer look the action type to determine if it has anything to do. this is why all reducers should return the untouched state as the default. This way no case matches the action passed, the existing state is returned. 

Forexample I have three reducers LoadStatus, Courses and Authors, only the reducer that handle the DELETE_COURSE action type will do anything. The others will simply return the state that was passed to them. Each reducers handle its slice of state. In fact, each reducer is only passed its slice of state. so it can only acces the portion of state that it manages. 

So while there is only a single store for redux, creating multiple reducers allows to handle changes to different pieces of the store  in isolation. all the reducers togather form the picture of what is in the store. 

"Write independent small reducer functions that are reach responsible for updates to a specific slice of state. We call this pattern "reducer composition". A given action could be handled by all, some, or none of them."

Each actions can be handled by multiple reducers. Each reducer can handle muliple actions. 

## React-Redux Library
It is used to connect react to the redux store to read data from the store.
Redux can be used with other javascript libraries. React redux consists of two core items

1. **Provider**: **Attaches app to the store**. Utilized at app route. It wraps entire application. It attaches your app to the redux store.
**Provider is delcared once in app entry point** (index.js in our case). It uses react context to pull this off, so **the provider makes the store avaliable to all child components without having you pass the store explicitly**. You use this once in the root component.
```javascript
// wrapping your app in provider makes the redux store accessible to every component in your app
<Provider store={this.props.store}>
    <App />
</Provider>
```

2. **Connect**: Create container components. It is a function provided by react-redux.
**Wraps our component so it is connected to the Redux Store.**

```javascript
export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage)
```
Connect function connect our react component with redux store. Function is named well we pass two arguments. `mapStateToProps` and `mapDispatchToProps` the first argument shows **What state do you want to pass to your component** on props and the second argument shows **What actions do you want to pass to your component** on props.

We donot need manually unsubscribe such in flux

#### Connect Function
It accept two parameters, `mapStateToProps` and `mapDispatchToProps`  both are optional. The first parameter **mapStateToProps** This function is useful for defining ***What Part of Redux Store you want to expose as props on your component***. **When you define this function, the component will subscribe to the Redux store updates**. Any time the store updates, mapStateToProps will be called. 


This function returns an object, Each property on the object that you define will become a property on your container component.
In summary **mapStateToProps argument determines what state is avaliable on your container component.** think of simple app with one reducer and you pass all your state 
```javascript
connect(mapStateToProps, mapDispatchToProps)(AuthorPage)


function mapStateToProps(state) {
    return {
        appState: state
    };
}
``` 
In my component i could call `this.props.appState` within my component to **access Redux store data**

If you want to expose a certain piece 

```javascript
connect(mapStateToProps, mapDispatchToProps)(AuthorPage)


function mapStateToProps(state) {
    return {
        // here
        users: state.users
    };
}
``` 
each object key will be come a prop on my component. Being more specific here increase performance. Specify here only the data the component needs.
*Keep in Mind* when ever the component is updated the function *mapStateToProps fuction is called*.

The second argument is **mapDispatchToProps**. This function let us **specify what action we want to expose** on props.

The **mapDispatchToProps** recieve a dispatch parameter
```javascript
connect(mapStateToProps, mapDispatchToProps)(AuthorPage)


function mapDispatchToProps(dispatch) {
    return {
        action: bindActionCreator(actions, dispatch)
    };
}
```
## 4 Ways to Handle mapDispatchToProps

mapDispatchToProps is how we dispose our action to the component.
- ignore it
- wrap manually
- bindActionCreator
- Return object

#### Option 1: Use Dispatch Directly
dispatch fuction will be attacted to your container component. It has two downside 1- boilerplate, 2- Redux concerns in the child component
```javascript
// in this component
this.props.dispatch(loadCourses())
```

#### Option 2: Wrap Manually
Manully wrap your actions creators in dispatch calls. Here I am specifiying the actions that i want to expose to my component explicity. One by one i wrap each action by a dispatch call
It is a nice option for starter.

```javascript
function mapDispatchToProps(dispatch) {
    return{
        loadCourse: () => {
        dispatch(loadCourse());
        },
        createCourse: (course) => {
            dispatch(createCourse(course));
        },
        updateCourse: (course) => {
            dispatch(updateCourse(course));
        }
    };
}

// can be accessed via
// In component
this.props.loadCourse()
```
Note: Each call to my action creators in an anonymous function that calls dispatch.

#### Option 3: bindActionCreators
the option 2 is good and clear but its code is redundant. You may use `bindActionCreators` function that shipped with react. 
```javascript
function mapDispatchToProps(dispatch) {
    return{
       actions: bindActionCreators(actions, dispatch)
    };
}
```
this approch you call, bindActionCreators and it will wrap actions passed to it in a dispatch call for you. and the props created by these two examples will be slightly different. Notice that the **prop that will be exposed to component will be called actions in this case** `this.props.actions.loadCourse()` so we will approch `this.props.action.actionName`. 
```javascript
function mapDispatchToProps(dispatch) {
    return{
       actions: bindActionCreators(actions, dispatch)
    };
}
// can be accessed via
// In component
this.props.actions.loadCourse()
```

#### Option 4: mapDispatchToProps as Object
object instead of a function, assume load action is action creator
```javascript
const mapDispatchToProps = {
    loadCourses
}
```

You can access it in component `this.props.loadCourses();` 

use option 4 it is more conscise. **Return Object**

## React Redux   Chat
![React Chat](/React-Chat.png)

## Redux Initial Setup
![React Chat](/Redux-Intial-Setup.png)

## Declaring state
There are two ways to declare the states
1. In constructor
```javascript
constructor(props) {
        super(props)
        this.state = {
            course: {
                title: ''
            }
        }
    }
```
2. In the component directly
```javascript
state = {
    course: {
        title: ''
    }
}
```
**This approch require less code and we donot need to call super**

**React hook make fuction component powerful we donot need to use classes we donot need use this key word in binding, It will make the confusion less.**

## onSubmit Event
You may add a click property to the save button but that is not recommended for the usability purpose. onSubmit is prefered. With hitting enter key you can also submit the form.

## Creating Action for CreateCourse
we create a file src/redux/actions/createCoruse.js and createCourse function that take a course as a parameter. This action will return type property (* must) and the payload (our course data).
```javascript
export function createCourse(course) {
    return { type: "CREATE_COURSE", course: course };
}
```
If the left and right handside match remove the second course. This is called `object short hand syntax`.
```javascript
export function createCourse(course) {
    return { type: "CREATE_COURSE", course };
}
```
**Remember anction send a type and a copy of state to the reducer**

We need a function to handle action called reducer

## Creating Reducer for CreateCourse
In redux we handle actions in Reducer. Reducer is a function that accept state and action, return a new state. 
We should initilize state to an empty array. It store an array of courses.

```javascript
export default function courseReducer(state = [], action) {
    switch (action.type) {
        case "CREATE_COURSE":
            // donot do this it will mutate the state
            state.push(action.state)
    
        default:
            break;
    }
}

```
**WRONG APPROCH** This is wrong approch we should not mutate(change) we should return the new copy of state.
```javascript
export default function courseReducer(state = [], action) {
    switch (action.type) {
        case "CREATE_COURSE":
            // we return new copy of state and add the new course on action
            return [...state, { ...action.course }]
    
        default:
            return state
    }
}
```
**CORRECT APPROCH** We return new copy of state and add the new course on action
Notice that **What ever is returned from the reducer becomes the new state** for that particular reducer. It will update our redux store by new course on action.course.

If the reducer recieves an action that it doesnot care about, it should return the unchanged state. Maybe an action related to the author data...or others data
**To Clone state use the Spread Operator(...)**

In large dataset you can store data by id, you can make an object in place of array. Each key is the item id. It provide fast lookup [For more data check Normalizing State Shape from Redux documentation].

#### Note
**Remember Each reducer handles a "slice" of state. (a portion of the entire Redux store)**

## Root Reducer 
Root reducer Will compose of all reducers togather.

```javascript
// src/redux/reducers/index.js
import { combineReducers } from 'redux'
import courses from './courseReducer'

const rootReducer = combineReducers({
    // each property set to corresponding reducer
    // since it is object we can omit the right hand side
    courses: courses
})

export default rootReducer
```

**Since I Export the CourseReducer with default key** here in root reduce we can import it by different such as 

`import course from './courseReducer'`

## Creating Redux Store
In redux there is a single store. We will call the store in our app Entry point. It will be called when the application is stared.

Create confgureStore.js under redux directory

```javascript
import { createStore } from 'redux'
import rootReducer from './reducers'

export default function configureStore(initalState) {
    return createStore(rootReducer, initalState)
}
```
This function will return a createStore method it will take two parameters rootReducer and an initalState. This is all it takes to configure the store.

**Redux Middleware** is a way to enhance Redux's behavior.
to work with middleware
```javascript
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import reduxImmutableStateInvariant from 'redux-immutable-state-invarent'

export default function configureStore(initalState) {
    return createStore(rootReducer, initalState, applyMiddleware(reduxImmutableStateInvariant()))
}
```
**this will warn us if we accidentally mutate Redux state.**

## Configure React Dev Tools
```javascript
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers'
import reduxImmutableStateInvariant from 'redux-immutable-state-invarent'

export default function configureStore(initalState) {
    // add support for redux dev tools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose 
    return createStore(rootReducer, initalState, composeEnhancers(applyMiddleware(reduxImmutableStateInvariant())))
}
```

Now we can interact with redux dev tools in the browsers.
Provider is a higher order component that provides you redux store data to our child (*React) components.
After wraping the Router with ReduxProvider (Provider Component), Our React app can reach the redux store.

```javascript
import React from 'react'
import { render } from 'react-testing-library'
import { BrowserRouter as Router } from 'react-router-dom'
// for bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './components/App'
import './index.css'

// Redux
import configureStore from './redux/configureStore'
import { Provider as ReduxProvider } from 'react-redux'

// intial state into store here if you are server rendering or initlizing redux store from local storage
const store = configureStore();
render(
    <ReduxProvider store={store}>
        <Router>
            <App />
        </Router>
    </ReduxProvider>,
    document.getElementById('app')
)
```
Redux Configuration completed.

## Connect to Redux.js (CoursePage.js to Redux)
- Import the connect from react-redux libaray in that container component.
- Jump to bottom of component decorate component with `connect`
connect takes two parameters mapStateToProps and mapDispatchToProps

`export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)`

we take the results of this and call the CoursePage.

**Connect returns a function. That function then calls our component**
connect part can be written in a separate function too, but it is not prefered 
```js
const connectedStateAndProps = connect(mapStateToProps, mapDispatchToProps)
export default connected(connectedStateAndProps)(CoursePage)
```
**Donot use the upper code** 

**People do this on oneline as below**

```js
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)
```
and we will write a function mapStateToProps, determines what part of the state we expose to component. this func determines what state is passed to our component via props

```js
function mapStateToProps(state, ownProps) {
    // now it has only an array of course which we will return out of state here
    return {
        courses: state.courses
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)
```

**Be Specific as possible, when returning mapStateToProps** Request only the data your component needs. if you expose the entire redux store to the component, then the component will re render when any data changes in the redux store. Which is not good!!.

ownProps shows the props attached to this component.

**mapDispatchToProps** **What action we want to expose on our component.** Let us declare what actions to pass to our component on props. It is **optional** if you remove this property from export default, our component gets a dispatch prop injected automatically. so we remove here in CoursesPage.js.
#### Without mapDispatchToProps
Since we omitted the mapDispatchToProps now will fire the saving course.

To fire an action (createCourse) we need to import the action 
`import * as courseActions from '../../redux/actions/courseActions'` and we will update the handleSubmit event.
```js
handleSubmit = () => {
        // create course action
        this.props.dispatch(courseActions.createCourse(this.state.course))
}
```

**Since we did not declare mapDispatchToProps, connect automatically adds Dispatch as prop**

**Remember** you have to **dispatch an action** if you just call an action creator it won't do anything. ActionCreatorjust return an object.

Here on dispatch we may get eslint warning so we declare the proptypes

1- Import PropTypes `import PropTypes from 'prop-types'`
2- Under the Component give a proptype of what page is expecting such as:
```js
CoursesPage.prototype = {
    dispatch: PropTypes.func.isRequired
}
```
we clarified that we are expecting dispatch to be passed in, of type function and is required. It is need because connect function automatically passes dispatch in if we omit mapDispatchToProps. 

The dispatch validation warning is gone :) good to go.

## Map
Map is built-in javascript function that returns a new array.


# Debugging the Redux Code 
Place debbuger as followed bellow
- Save Course (createCourse Handler)
- Course Action (createCourse)
- Course Reducer (createCourse switch case)
- As Props will render store is updated by reducer > Course Page (mapToStateToProps)

Check Redux DevTools for Update

# Remember Redux Flow
![](https://avatars3.githubusercontent.com/u/31112269?v=4&s=100)
![](/pngs/Redux-Flow.png)

## mapDispatchToProps: Manual Mapping
This function determine what actions are avaliable on props this component.
we add mapDispatchToProp to the connect function
`export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage)` and then we implement the function.
**Remember** the action we choose to return here will be avalibe in this component via props. if you **dont wrap this with dispatch nothing will happen**. **actionCreators must be called by dispatch**. calling courseAction directly will return an object

```js
function mapDispatchToProps(dispatch){
    return {
        createCourse: course => dispatch(courseActions.createCourse(course))
    }
}

```
then we need to declare the create course will be reviced as a props to the component. we will update the handleSubmit

```js
handleSubmit = (event) => {
    // it will stop reload the App
    event.preventDefault();
    // create course action
    this.props.createCourse(this.state.course)
}
```
we can directly call the createCourse method on the props.
**Should update PropTypes**

```js
CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    createCourse: PropTypes.func.isRequired
}
```

Since we declared the mapDispatchToProps, dispatch is no longer injected. Only the actions we declared in mapDispatchToProps are passed in.

## mapDispatchToProps: bindActionCreator
Redux come with saving us from manually mapping the mapDispatchToProps this function is called bindActionCreators


- import the library `import { bindActionCreators } from 'redux'`
- update the mapDispatchToProps since there will more than one action we change the object createCourse to actions
```js
function mapDispatchToProps(dispatch){
    return {
        // for more actions in the props
        actions: bindActionCreators(courseActions, dispatch)
    }
}
```
- update the PropType actions will be object and required
```js
CoursesPage.propTypes = {
    courses: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}
```
- update the HandleSubmit
```js
handleSubmit = (event) => {
    // it will stop reload the App
    event.preventDefault();
    this.props.actions.createCourse(this.state.course)
}
```
*This will do mapDispatchToProps automatically.*

## mapDispatchToProps as an Object
When we declare mapDispatchToProps as an object, each property is automatically bound to dispatch. Each property is expect to be an action creator function that what is createCourse function.

- change the mapDispatchToProps to an object
```js
const mapDispatchToProps = {
    createCourse: courseActions.createCourse
}
```
but the bindActionCreator is prefered more.

In summary mapStateToProps and mapDispatchToProps are the two magic function used to connect to redux.