
const { f } = require("yaclc");
const { join } = require("./utils.js");
const Formatter = require("./Formatter.js");

/**
 * Convert type string to color string
 *
 * @private
 * @param {string} type
 * @returns {string}
 */
function type_to_color(type) {
    switch (type) {
    case "debug":
        return "yellow";
    case "info":
        return "magenta";
    case "warn":
        return "blue";
    case "error":
        return "red";
    default:
        return "white";
    }
}

const LEVELS = [
    "debug",
    "info",
    "warn",
    "error",
    "none",
];

/**
 * The y'all's logger class
 */
class Logger {
    #log;
    #namespace;
    #log_level;
    #log_index;
    #no_colors;
    #f;
    #format;
    #formatter;

    /**
     * Constructor
     *
     * @param {object} [options={}]
     * @param {object} options.log - The internal logger object (basically an object with four keys: debug, info, warn, error; functions that take a string as their only argument)
     * @param {string} [options.namespace=""] - The namespace for this logger
     * @param {string} [options.log_level="info"] - The log level for this logger
     * @param {boolean} [options.no_colors=false] - Whether to disable colors
     * @param {Function} [options.format] - A custom format function
     */
    constructor({ log, namespace="", log_level="debug", format="[:ISO] - :TYPE | :NAMESPACE | :STRING", no_colors=false }={}) {
        this.#log = log;
        this.#namespace = namespace;
        this.#no_colors = !!no_colors;
        this.#format = format;
        this.set_log_level(log_level);

        this.#f = this.colorized ? f : (s) => s;
        this.#formatter = Formatter.from_template(format);
    }

    /**
     * Check if the logger is colorized
     *
     * @type {boolean} Whether the logger is colorized
     */
    get colorized() { return !this.#no_colors; }

    /**
     * Get the log level for this logger
     *
     * @type {string} The log level
     */
    get log_level() { return this.#log_level; }

    /**
     * Set the log level for this logger
     *
     * @param {string} level - The log level
     */
    set_log_level(level) {
        if ( !(LEVELS.includes(level)) ) throw new Error("Invalid log level: "+level);
        this.#log_level = level;
        this.#log_index = LEVELS.indexOf(level);
    }


    /**
     * Create a debug log
     *
     * @param {...*} args
     */
    debug(...args) {
        this._log("debug",...args);
    }

    /**
     * Create an info log
     *
     * @param {...*} args
     */
    info(...args) {
        this._log("info",...args);
    }

    /**
     * Create a warn log
     *
     * @param {...*} args
     */
    warn(...args) {
        this._log("warn",...args);
    }

    /**
     * Create an error log
     *
     * @param {...*} args
     */
    error(...args) {
        this._log("error",...args);
    }

    /**
     * Create a log entry of a specified type
     *
     * @param {string} type - The type of log entry to create
     * @param {...*} args - the set of objects to log (usually strings)
     * @private
     */
    _log(type, ...args) {
        const idx = LEVELS.indexOf(type);
        if ( idx < this.#log_index ) return;
        const params = {};
        for ( const key of this.#formatter.keys ) {
            switch (key) {
            case "TYPE":
                params[key] = this.#f(type.length < 5 ? type+" " : type,{ color:type_to_color(type), bold:true });
                break;
            case "NAMESPACE":
                params[key] = this.#namespace;
                break;
            case "STRING":
                // Nothing to do here
                break;
            case "ISO":
                params[key] = this.#f((new Date()).toISOString(),{ color:"green" });
                break;
            default:
                params[key] = "???";
            }
        }
        this.#log[type](this.#formatter.format(args.join(" "), params));
    }

    /**
     * Create a new logger namespaced under this one
     *
     * @param {string} namespace - The namespace for the new logger (is appended onto this namespace)
     * @param {object} [opts={}] - any options to pass to the new logger's constructor (omissions are defaulted to this logger's options)
     * @returns {Logger} The new logger
     */
    create_child(namespace, opts={}) {
        if ( typeof(namespace) !== "string" ) throw new Error("Invalid namespace: "+namespace);
        return new this.constructor({
            log: this.#log,
            namespace: join(this.#namespace, namespace),
            log_level: this.#log_level,
            no_colors: this.#no_colors,
            format: this.#format,
            ...opts
        });
    }

    /**
     * Create a new logger, which does nothing
     *
     * @static
     * @returns {Logger} The new logger
     */
    static noop() {
        return new this({ log_level:"none" });
    }

    /**
     * Create a new logger that logs to the console
     *
     * @static
     * @param {string} [namespace=""] - The namespace for the new logger
     * @param {object} [opts={}] - any options to pass to the new logger's constructor
     * @returns {Logger} The new logger
     */
    static console(namespace="", opts={}) {
        return new this({
            log : {
                debug : console.log, // eslint-disable-line no-console
                info : console.log,  // eslint-disable-line no-console
                warn : console.log,  // eslint-disable-line no-console
                error : console.log, // eslint-disable-line no-console
            },
            namespace,
            ...opts
        });
    }

    /**
     * Create a new logger that logs to a callback function
     *
     * The callback function is called with the following arguments:
     * - type: the type of log entry (debug, info, warn, error)
     * - string: the log entry string
     *
     * @static
     * @param {Function} cb - The callback function
     * @param {string} [namespace=""] - The namespace for the new logger
     * @param {object} [opts={}] - any options to pass to the new logger's constructor
     * @returns {Logger} The new logger
     */
    static callback(cb, namespace="", opts={}) {
        return new this({
            log : {
                debug : (s) => cb("debug",s),
                info : (s) => cb("info",s),
                warn : (s) => cb("warn",s),
                error : (s) => cb("error",s),
            },
            namespace,
            ...opts
        });
    }
}

module.exports = exports = Logger;
