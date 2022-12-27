
/**
 * Class for formatting data according to a template
 *
 * @private
 */
class Formatter {
    #template_array;
    #keys;
    #key_map;

    /**
     * Constructor
     *
     * @param {object} options
     * @param {string[]} options.template_array an array of strings and keys
     * @param {string[]} options.keys an array of keys
     * @param {Map} options.key_map a map of key index to key
     */
    constructor({ template_array, keys, key_map }={}) {
        this.#template_array = template_array;
        this.#keys = keys;
        this.#key_map = key_map;
    }

    get template() { return this.#template_array.map(v => this.keys.includes(v) ? `:${v}` : v ).join(""); }
    get keys() { return this.#keys; }

    /**
     * format
     * Format a string using the template
     *
     * @param {string} data the string to format
     * @param {object} opts data for injection
     * @returns {string} the formatted string
     */
    format(data,opts={}) {
        let params = { STRING:data, ...opts};
        return this.#template_array.reduce((agg, cur, idx) => {
            if ( this.#key_map.has(idx) ) {
                return agg + (params[this.#key_map.get(idx)] || "");    // We are a tag...if no value, don't add
            } else {
                return agg + (params[this.#key_map.get(idx)] || cur);
            }

        },"");
    }

    /**
     * New formatter
     *
     * from a template string
     *
     * @static
     * @param {string} template a template string like "this is a :STRING test"
     * @returns {Formatter} the new Formatter
     */
    static from_template(template) {
        let template_array = [];
        let keys = [];
        let key_map = new Map();
        let remainder = template || "";
        while (remainder.length) {
            let match = remainder.match(/:([a-zA-Z0-9_]+)/);
            if ( match ) {
                const key = match[1];
                const prior = remainder.slice(0,match.index);
                if ( prior.length ) template_array.push(prior);
                template_array.push(key);
                remainder = remainder.slice(match.index+match[0].length); // skip -1 for colon
                keys.push(key);
                key_map.set(template_array.length-1,key);
            } else {
                template_array.push(remainder);
                remainder = "";
            }
        }

        // Default the string onto the end
        if ( !keys.includes("STRING") ) {
            template_array.push("STRING");
            key_map.set(template_array.length-1,"STRING");
            keys.push("STRING");
        }

        return new this({ template_array, keys, key_map });
    }
}

module.exports = exports = Formatter;
