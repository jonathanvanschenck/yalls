
/**
 * Convert hex string to RGB array
 *
 * @param {string} hex - The hex string to convert
 * @returns {string} The RGB terminal color code
 */
function hex_to_code(hex) {
    const [r,g,b] = hex.match(/[a-fA-F0-9]{2}/g)?.map( x => parseInt(x,16) ) || [255,255,255];
    return `\x1b[38;2;${r};${g};${b}m`;
}

// Linux console colors, see https://chrisyeh96.github.io/2020/03/28/terminal-colors.html
/* eslint-disable no-irregular-whitespace */
const COLORS = {
    black :"\x1b[30m",
    red : "\x1b[31m",
    green : "\x1b[32m",
    yellow : "\x1b[33m",
    blue : "\x1b[34m",
    magenta : "\x1b[35m",
    cyan : "\x1b[36m",
    white : "\x1b[37m",
    default : "",
};

for ( const [name, r, g, b ] of [
    ["lightblue", 114, 159, 207 ],
    ["brightblue", 50, 175, 255 ],
    ["brightpurple", 129, 8, 149 ],
]) {
    COLORS[name] = `\x1b[38;2;${r};${g};${b}m`;
}
/* eslint-enable no-irregular-whitespace */

/**
 * Format a string with colors and font
 *
 * @param {string} string - The string to format
 * @param {object} [options={}]
 * @param {string} [options.color=white] - The color to use, name (e.g. 'red') or hex (e.g. '#ff0000')
 * @param {boolean} [options.bold=false] - Whether to use bold font
 * @returns {string} The formatted string
 */
function f(string, { color="white", bold=false }={}) {
    let c;
    if ( color.startsWith("#") ) {
        c = hex_to_code(color);
    } else {
        c = COLORS[color] || COLORS["default"];
    }
    return c + (bold?"\x1b[1m":"") + string +"\x1b[0m";
}

module.exports = exports = {
    COLORS : COLORS,
    f : f
};
