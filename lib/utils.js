
const DELIMITER = ".";

/**
 * Join paths together.
 *
 * @param {...string} paths - The paths to join
 * @returns {string} The joined path
 */
function join(...paths) {
    let path = [];
    for ( const p of paths ) {
        path.push(...p.split(DELIMITER));
    }
    return path.filter(p => p !== "").join(DELIMITER);
}

/**
 * Get a value from an object using a path.
 *
 * @param {object} obj - The object to get the value from
 * @param {string} path - The path to the value
 * @returns {any} The value at the path, or undefined if the path does not exist
 */
function get(obj, path) {
    path = join(path); // normalize path
    let sub = obj;
    for ( const key of path.split(DELIMITER) ) {
        if ( typeof(sub) !== "object" ) return undefined;
        sub = sub[key];
    }
    return sub;
}

/**
 * Set a value in an object using a path.
 *
 * @param {object} obj - The object to set the value in
 * @param {string} path - The path to the value
 * @param {any} value - The value to set
 */
function set(obj, path, value) {
    path = join(path); // normalize path
    let sub = obj;
    let path_array = path.split(DELIMITER);
    let term = path_array.pop();
    for ( const key of path_array ) {
        if ( typeof(sub[key]) !== "object" || sub[key] == undefined ) sub[key] = {};
        sub = sub[key];
    }
    sub[term] = value;
}

module.exports = exports = {
    join,
    get,
    set,
};
