# SuperHeroes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

It is a project of a superhero crud using a scalable architecture and applying good practices and performance techniques.

- A feature-based directory structure was used to make it scalable and maintainable.
- Used eslint and prettier for readable and bug free code.
- Unit tests were used for each typed file that needs to be tested as components, service directives.
- Use global file with contents to keep all globals in the same file.
- i18n was used to keep all the text in global files and no harcode in the htmls files.
- The Core module was used to group all the global elements of the application such as interceptors, guards, core services, layouts, among others.
- The shared module was used to group all the components, directives, services, pipes, models, enums that will be used in different parts of the application.
- Used the json server to simulate the backend when working on draft functions.
- Used storybook to document shared components, directives.
- Used the light and dark theme per operating system so that it changes according to the user's configuration.

## Development server

Run `ng s` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Json server

To install run `npm install -g json-server` for run it server run `json-server --watch db.json` or if you configure some custom routes `json-server db.json --routes routes.json`
For more information go to [Json-server](https://github.com/typicode/json-server)

## Code scaffolding

Run `ng g component component-name` to generate a new component. You can also use `ng g directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Or run `npm run test:build` to execute production unit tests.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Structure directory

- Core folder contains all about core features like global services, interceptors, guards, etc.
- Modules folder contains all application modules. Contains all pages components also we can create a component folder with specific components for this module.
- Shared folder contains all shared components, models, enums, directives, pipes and constants (globals.ts).
- Assets folder contains globals statics files like i18n json's, imgs, also can we have fonts and icons. 

```
|-- src
    |-- app
        |-- core
            |-- interceptors
            |-- services
            |-- core.module.ts
        |-- modules
            |-- super-hero
                |-- super-hero-detail
                    |-- super-hero-detail.component.ts|html|scss|spec.ts
                |-- super-hero-grid
                    |-- super-hero-grid.component.ts|html|scss|spec.ts
                |-- shared
                    |-- super-hero.model.ts
                    |-- super-hero.resolver.ts|spec.ts
                    |-- super-hero.service.ts|spec.ts
                |-- super-hero-routing.module.ts
                |-- super-hero.module.ts
        |-- shared
            |-- components
            |-- models
            |-- enums
            |-- directives
            |-- pipes
            |-- globals.ts
        |-- app.component.ts|html|scss|spec.ts
        |-- app.module.ts
        |-- app-routing.module.ts
    |-- styles.scss
    |-- assets
        |-- i18n
        |-- imgs
    |-- enviroments
    |-- main.ts
    |-- index.html
```

## Documentation

Shared components were documented using a [storybook](https://storybook.js.org/docs/angular/get-started/introduction) and displayed in [chromatic](https://www.chromatic.com/).

Documententation live [link](https://62f4e8e7c4bcded2362c1765-mqczqbpvlu.chromatic.com/)

Run `npm run storybook` for dev documentation server. Navigate to `http://localhost:6006/`. The documentation will automatically reload if you change any of the source files.

To deploy documentation changes run `npm run chromatic`.
