# Review Questions

## What is Node.js?
    Node.js is a runtime environment for JavaScript that allows JS code to be executed outside the browser, and allows you to have uniform paradigms across the front and back end since you can use JS on both ends.

## What is Express?
    Express is a framework used in Node environments that adds functionality to Node and provides the ability for routing, middleware, and error handling.

## Mention two parts of Express that you learned about this week.
    Express Router and custom Express middleware

## What is Middleware?
    Middleware is a function that is invoked in between (in the middle of) an initial request and its intended final route. Middleware can add extra functionality or handle errors, and can be used either globally across the server or locally on specific request handlers.

## What is a Resource?
    Everything available to be accessed in your database is a resource, and each resource has a unique Uniform Resource Identifier (URI).

## What can the API return to help clients know if a request was successful?
    HTTP status codes.

## How can we partition our application into sub-applications?
    Using Express router.

## What is express.json() and why do we need it?
    express.json() is a body parser that acts as middleware and allows the data of the resource you are working with to be available in req.body. Without a body parser, req.body will be read as undefined.
