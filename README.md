# BookShelf

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.5.

## Development server

To install node_modules

```bash
npm install
```

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing with Cypress, run:

```bash
npx cypress open
```

## BookShelf description

The aim of this web appliation is to add books to favourites. 

First you have to create an account to be able to see the books. 
If you have already an account you can use your credentials and explore the list of books.

The home page contains a table with list of books - you can Like them (add to favourites) or Dislike them (remove from favourites).
Clicking on the name of the book will redirect you to a detail page - a table with information and button to the favourites page.

From the favourites page you can see all liked books for this specific account. 
