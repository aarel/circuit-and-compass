# Project Overview

This repository contains the source code for the Circuit & Compass microsite, a landing page for a service that provides "side-hustle blueprints." The site is a simple, static web page built with HTML, CSS, and a small amount of JavaScript. It is designed to be lightweight and fast-loading.

The project is set up as a Node.js project, but it doesn't have any external dependencies. It uses a simple, custom-built static file server to serve the site during development.

**Technologies:**

*   **Frontend:** HTML, CSS, JavaScript
*   **Backend:** Node.js (for the development server)
*   **Testing:** Node.js built-in test runner

**Architecture:**

The project follows a simple, monolithic architecture. The entire site is contained within a single repository. The frontend code is located in the root directory, and the tests are in the `tests` directory.

# Building and Running

*   **Development:** To start the development server, run the following command:

    ```bash
    npm run dev
    ```

    This will start a local server at `http://localhost:3000`.

*   **Production:** To run the server in a production-like environment, you can use the `start` script:

    ```bash
    npm start
    ```

*   **Testing:** To run the test suite, use the `test` script:

    ```bash
    npm test
    ```

# Development Conventions

*   **Coding Style:** The code follows a modern JavaScript style, using ES modules and `async/await`. The HTML is well-structured and uses semantic tags.
*   **Testing:** The project includes a suite of tests that cover the main functionality of the site. The tests are written using Node.js's built-in test runner.
*   **Deployment:** The project includes configuration files for Netlify (`netlify.toml`) and Vercel (`vercel.json`), suggesting that it is intended to be deployed to one of these platforms.
