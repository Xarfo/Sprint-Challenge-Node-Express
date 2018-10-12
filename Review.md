# Review Questions

## What is Node.js?

Node.js is a runtime enviroment that allows javaScript to be run on the back-end. Node.js offeres consistency in both front-end and back-end development since it is written in JavaScript, Node.js is a single-threaded framwork and doesn not worry about the cost of context-switching; also asynchronous and non-blocking. All of the above makes it fast enviroment to build back-end apps in.

## What is Express?

Express is a middleware module in the Node.js ecosystem that instantiates server objects and builds RESTful web services.

## Mention two parts of Express that you learned about this week.

Custom middlewares and request/route handlers.

## What is Middleware?

Middleware is the software that connects software components with data base or with other software componenets. Node.js middlewares are an array of functions that execute the order they are presented to help handle routes.

## What is a Resource?

Resources live in the server and are passed to and fro between client and servers. Examples are users, posts; or actions and projects in this sprint.

## What can the API return to help clients know if a request was successful?

APIs can return status codes to alert the client, and in the case of success will return a 200 status code.

## How can we partition our application into sub-applications?

An app can be modularized or partioned into sub-applications as the example given below:

``` var sub1 = express();
sub1.get("/", function(req, res){
  res.json({status: "SUCCESS!!!!!!"});
});

var sub2 = express();
sub2.get("/", function(req, res){
  res.json({
    foo: "bar",
    baz: "quux"
  });
});

// main app
// --------

var app = express();

app.use("/foo", sub2);
app.use("/", sub1); ```

https://derickbailey.com/2016/02/17/using-express-sub-apps-to-keep-your-code-clean/


## What is express.json() and why do we need it?

Express.json() is a middleware that conversts returned response and request objects in json objects.
