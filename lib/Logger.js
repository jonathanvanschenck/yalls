
const COLOR = {};
COLOR.black ="\x1b[30m";
COLOR.red = "\x1b[31m";
COLOR.green = "\x1b[32m";
COLOR.yellow = "\x1b[33m";
COLOR.blue = "\x1b[34m";
COLOR.magenta = "\x1b[35m";
COLOR.cyan = "\x1b[36m";
COLOR.white = "\x1b[37m";

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

function f(string, { color="white", bold=false }={}) {
    return `${COLOR[color]}${bold?"\x1b[1m":"\x33[0m"}${string}\x1b[0m`;
}

const LEVELS = [
    "debug",
    "info",
    "warn",
    "error",
    "none",
];
class Logger {
    #log;
    #prefix;
    #log_level;
    #log_index;

    constructor({ log, prefix="", log_level="debug" }={}) {
        this.#log = log;
        this.#prefix = prefix;
        this.set_log_level(log_level);
    }

    debug(...args) {
        this._log("debug",...args);
    }
    info(...args) {
        this._log("info",...args);
    }
    warn(...args) {
        this._log("warn",...args);
    }
    error(...args) {
        this._log("error",...args);
    }

    _log(type, ...args) {
        const idx = LEVELS.indexOf(type);
        if ( idx < this.#log_index ) return;
        this.#log[type](
            `${(new Date()).toISOString()} - ${f(type.length < 5 ? type+" " : type,{ color:type_to_color(type), bold:true })} | ${this.#prefix ? this.#prefix + " |" : ". |"}`,
            ...args
        );
    }

    get log_level() { return this.#log_level; }
    set_log_level(level) {
        if ( !(LEVELS.includes(level)) ) throw new Error("Invalid log level: "+level);
        this.#log_level = level;
        this.#log_index = LEVELS.indexOf(level);
    }

    static new(log, name="", log_level) {
        return new this({ log:log, prefix:name, log_level });
    }

    static noop(name="", log_level) {
        return this.new(
            {
                debug : () => {},
                info : () => {},
                warn : () => {},
                error : () => {}
            },
            name,
            log_level
        );
    }

    static console(name="", log_level) {
        return this.new(
            {
                debug : console.log,
                info : console.log,
                warn : console.log,
                error : console.log,
            },
            name,
            log_level
        );
    }

    child(name) {
        return new this.constructor({
            log: this.#log,
            prefix: this.#prefix == "" ? name : `${this.#prefix}.${name}`,
            log_level: this.#log_level
        })
    }
}

module.exports = exports = Logger;
