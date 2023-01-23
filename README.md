# Y'all's Logging Library
Yet another logging library specifically for y'all's logging pleasure.

A no-nonsense, low-dependancy, simple logging tool. Your main features are:
 - Hierarchical namespacing: easily create child loggers namespaced under a parent to keep your complicated architecture's log messages organized
 - Format-able print, with sensible defaults
 - Configurable logging outputs: want standard out, a callback for remote logging, or maybe a no-op so you can integrate with a testing suite? You get it all for free!

## Installation
```bash
npm install yalls
```

## Usage
Check out the [full API](./API.md) for more details, or run the demo script:
```bash
node demo.js
```

Here's a short example too:
```js
const { Logger } = require("yalls");

// Create a parent logger
const parent = Logger.console("parent");

parent.info("Some info");
parent.error("An error!");
parent.info("Some", "delimited", "info");

// Change the log level
parent.set_log_level("warn");

parent.info("I am not printed");

parent.set_log_level("none");
parent.error("I do nothing, now");

// Better yet, just create a no-op logger from the start. Useful for unit test configurations
const no_op = Logger.noop();

// Create a child logger
const child = parent.create_child("child.1");

child.info("I am not printed, because I inherited a log level");
child.set_log_level("debug");
child.info("But now I am!");


// Change the logging format
const no_timestamp = Logger.console("no_stamp", { format:":TYPE - :NAMESPACE | :STRING" });
no_timestamp.info("Simplified!");

const no_header = Logger.console("no_header", { format:null });


// But what if I hate beautiful colors?
const eye_pain = Logger.console("eye_pain", { no_colors:true });
eye_pain.warn("IT BURNS!");
```
