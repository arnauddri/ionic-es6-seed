## Build System
We use Webpack and Ionic together for our build system.

`Webpack` does most of the heavy lifting here, it handles:
* Dependency management. Download external modules from npm, bower, or straight from github
* Dynamic transpiling from ES6 to ES5 with `Babel`
* Loading and refreshing HTML files as modules
* Loading and refreshing CSS files and appending the styles to the DOM
* Loading and refreshing any and all modules

`Ionic` is like the orchestrator, it handles:
* Starting a dev server
* Refreshing the browser on file changes
* Generate boilerplate for our cordova app
* Building a production version of our app ready for deployment

## File Structure
Outside of the traditionnal ionic project structure we structure our code the following way:
```
client
--app/
----app.js * entry file for app
----app.jade * template for app
----components/ * where most of components/states live
------components.js * entry file for components
------home/ * home component
--------home.js * home entry file
--------home.component.js * directive for home
--------home.controller.js * controller for home
--------home.less * styles for home
--------home.jade * template for home
----common/ * where common things in our app live
```

# Getting Started
## Dependencies
What you need to run this app:
* `node` and `npm`
Once you have those, you should install these globals with `npm i -g gulp webpack ionic`:


## Installing
* `npm run-script update` to install all dependencies.

## Running the app
After you have installed all dependencies you can now run the app.
Run `npm start` to build the project and watch all files. In an other terminal window, run `ionic serve` and go to the url

## Gulp tasks
We use gulp to create our scaffolding so that every component, state or service follows the same guidelines
Here's a list of possible Gulp task to run:

### Generating common components directives
Following a good practice allows us to guarantee certain things. We can take advantage of these guarantees and use a task to automate things. Because the components we make will almost always have the same structure, we can generate this boilerplate for you. Components are meant to be reusable isolated bits of UI that interact with our layout through attributes. The boilerplate includes

* Component folder
* Component entry file which will `import` all of its dependencies
* Component component file, or directive file will will also `import` its dependencies
* Component template
* Component controller
* Component css

To generate a component, we must use the `gulp component --name newComponent` task.

The `--name` flag is the name of the component you want to create. Be **sure** to be unique, or it will override an existing component.

The component will be created by default on the root of `client/app/common`.
We can change this by passing in the `--parent` flag.
You can pass in a path relative to `client/app/components/` and your component will be made there.
So running `gulp component --name signup --parent auth` will create a `signup` component at `client/app/components/auth/signup`.
Running `gulp component --name footer --parent ../common` will create a `footer` component at `client/app/common/footer`.
Because `--name` is used to create folder name too, use only snake_case for your name. It will be converted in camelCase where necessary.

## Registering
Once your component is created, you can register it in component.js or common.js:

```javascript
import angular from 'angular';
import Home from './home/home';
import NewComponent from './newComponent/newComponent';

let componentModule = angular.module('app.components', [
  Home.name,
  NewComponent.name
]);

export default componentModule;
```

### Generating services
Finally `gulp state --name newService` creates a service in the common folder. You can use the `--parent flag to put it elsewhere



#Annex: Writing in ES6/ES2015

## How and Why ES6/ES2015 ?

ES6 is feature complete and is being implemented into browers feature by feature. There will continue to be a development of more features and proposals yearly, so hence the ES2015.
There are many helpful new features that have been needed in JS for years. Some are entirelly new concepts, some are standard implementations of community projects.
One thing is for sure, ES2015 is a step forward and makes development a little bit less difficult and more fun if you were getting bored!
However, all the new candy that is ES2015 is fully implemented in all environments just yet so we must transpile it, like CoffeScript.

There are two transpilers that have emerged as the goto's for this task, we'll use [Babel](https://babeljs.io/).

## Javascript guidelines

Currently, there are no ES6 styleguide, the following ones are a merge from several open source repositories that use ES6 + Angular 1.4+. The main repo that was used as base is https://github.com/angular-class/NG6-starter/tree/jspm.

Please read speakingJS's code style (10min) for general ES5 guidelines: http://speakingjs.com/es5/ch26.html, and john papa's styleguide for angular related conventions https://github.com/johnpapa/angular-styleguide (15min).

## Better Variables

`var` used to be the only way to define variables. There are some gotchas with this though around scoping and hoisting.
ES2015 introduces two new ways, `let` and `const`. Both have local scoping and don't hoist. `const` is immutable as well.

```javascript
let val = 1;
const nums = [1,2,3];

if (true) {
  let val = 'heeey';
}

val === 'heeey' // false. val is still 1. same behavior with const too.

nums.push(22); // this is ok, not changing the value.

nums = []; // throws error, you can't change the value of the const
```

We will use `const` for everything unless we need to change its value (as in the referenced object, ie you can add key-value pairs to a `const` object literal or values to an `const`array), then we'll go back to `let`. Going back to `var` when we don't want the local scoping which actually leads to hard to understand code. Be aware that `const a;` is not a valid expression as it needs to be set to a value and keep that value.


## Classes

Four our components' controllers and services, we'll be using the ES2015 class feature

```javascript
class HomeController {

  /*@ngInject*/
  constructor(authService) {
    this.authService = authService;
    this.credentials = {};
  }
  getGoing (credentials) {
    this.authService.login(credentials);
  }
}

export default HomeController;
```

## Object Shortcuts, Fat arrow function and outside Context
We can take advantage of method and property shortcuts on object literals and classes.

```javascript
const enable = true;
const config = {
  // not a typo. There is an accessible var with the same
  // name as the property so we can omit the key value pair
  // and just write the key. Has to be the same name as
  // an accessible variable.
  enable,
  // about the same as doing
  // setup: function setup(){}
  setup() {
    // hey I am a function, inside me, `this` refers to `config`
  },
  someOtherProp: true
};
```

**When using method shortcuts and fat arrow function, the outside context is kept, like .bind()**

In general, always use method shortcuts and fat arrow functions, except when defining newable functions otherwise it will make
a `this` soup and loose context (this will refer to whatever was outside when the function was instanciated)

**When using method shortcuts on object literals, you must still obey the comma rule with objects, you don't with classes**

## Destructuring

A common pattern we use often is plucking properties off an object and creating accessible variables from them, usually with lodash. We have a shortcut for that now.

```javascript
const action = (options) => {
  // typical
  const enable = options.enable;
  const id = options.id;

  // instead do this, is the same as above
  const {enable, id} = options;
}
```

# Angular Guidelines

## Handling errors

_When you're in a place where an error can occur but you do not know what it could be, or have no way of recovering from it so far, throw it. This will allow raven.js to catch them and send them to Sentry : we can then be aware and investigate those errors when they happen._

_For this, use the Error() constructor, as jasmine/karma can't handle throwing strings (just like older webkit browser versions)_

```javascript
  // DON'T DO THIS
  Resource.query((response) => {

  },
  (error) => {
    throw error;        // NOT KARMA-FRIENDLY !
  });

  // DO THIS
  (error) => {
    throw new Error(error);
  }
```

## Binding

_Two-way data binding is a known performance issue in Angular. Use one time bindings wherever you're displaying static data that will not be changed by user input. Be especially careful to use them with the ng-repeat directive and always use [track by syntax](http://www.bennadel.com/blog/2556-using-track-by-with-ngrepeat-in-angularjs-1-2.htm), to improve performance_

```jade
  // DO THIS ONLY WHEN USEFUL
  {{ myBinding }}

  div(ng-repeat='binding in Bindings')
    {{ binding.title }}

  // PREFER THIS
  {{ ::myBinding }}

  div(ng-repeat='binding in ::Bindings')
    {{ ::binding.title }}
```

## Use strict

_Use strict in every file: `'use strict';`_

## Resources

_You can query resources and perform actions on their instances thanks to angular-resource's methods and methods defined in `src/common/model_resource`._ __Avoid the magical Angular notation where you assign a promise__ _and assign in the success callback instead. The magical notation will not pass unit tests as our mocks voluntarily DO NOT support it._

```javascript
  // DO NOT USE
  $scope.listings = ListingResource.query();

  // USE INSTEAD
  ListingResource.query(
    (response) => {
      // Use response
    },
    (error) => {
      // Handle error
    });
```

