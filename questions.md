#### 1. What is the difference between Component and PureComponent? give an example where it might break my app.

The difference comes when comparing previous props or state with new. A Component will always re-render even if the prop/state has not changed at all, for instance setting the value equal to the current one, and the Pure Component will prevent this re-render.
Since the Pure Component compares references for objects and arrays and not values, re-render may not happen, resulting on a bug.

#### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Every time the context is updated, the components connected to it re-renders that is why ShouldComponentUpdate will not work on those components

#### 3. Describe 3 ways to pass information from a component to its PARENT.

1. As a function parameter, eg:
   PARENT COMPONENT

   ```JS
   someFunc = (param) => {
       console.log(param)
   }

   render(){
       ....
       <ChildComponent someFunc={this.someFunc}>
   }
   ```

   CHILD COMPONENT

   ```JS
   render(){
       ....
       <button onClick={(e) => this.props.someFunc(e)}>
   }
   ```

2. If using an application state manager like redux, you can modify the props of a Parent Component dispatching an action from the Child Component.

3. In a similar way you can update the context used in Parent and Child components from the Child

#### 4. Give 2 ways to prevent components from re-rendering.

One way can be to identify if a Pure Component can be used in order to prevent unecessary re-renders, the other can be to use a class component and use the `shouldComponentUpdate` and compare previous props with new ones to prevent the re-render.

#### 5. What is a fragment and why do we need it? Give an example where it might break my app.

All React components need to return a single containing element for the render to be valid, but there are cases where a component returns multiple elements, for this to be possible it is needed to add all these elements in a container element (let's call it a < div >). A < div > is not always required and this is when using Fragments comes in, since it acts as the container element needed without adding any extra HTML code.

#### 6. Give 3 examples of the HOC pattern.

1. Redux connect function:

```JS
connect(mapStateToProps, mapDispatchToProps)(Component)
```

2. Simple HOC function

```JS
const NewHOCComponent = hoc(Component);

cons hoc = (Comp) => {
    return class extends React.Component {
        render(){
            return <Comp />
        }
    }
}
```

3. Pass not related props to Component

```JS
<Component {...props} />
```

#### 7. what's the difference in handling exceptions in promises, callbacks and async...await.

Callbacks can chain functions since they are passed to other functions and can call them when needed if everything is ok or an error occurred.

A promise can be chained using `then` using the returned promise of the previous block or `catch` in case of an error.

Async / Await works very similar, as long as the function is declared `async`, `await` can be used to wait till something is done before moving on.

#### 8. How many arguments does setState take and why is it async.

It is async to prevent not needed re-renders in the components tree, and can take an two arguments, the first one is an or a function that returns an object, and the second one is an optional callback

#### 9. List the steps needed to migrate a Class to Function Component.

1. Create a function
2. Pass props as parameters
3. If using state replace constructor and state with useState hook
4. Replace any class methods and lifecycle methods with functions

#### 10. List a few ways styles can be used with components.

1. Using imports of .css files
2. Inline styles

```JS
<div style={{width: 100, height: 100}} />
```

3. Using CSS inside JS

```JS
const styles = {
    container: {
        width: 100,
        height: 100
    }
}

<div style={styles.container} />
```

#### 11. How to render an HTML string coming from the server.
Using dangerouslySetInnerHTML similar to innerHTML in the DOM
