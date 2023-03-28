require("colors");
const shortid = require("shortid");

shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#&"
);

const colors = [
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "gray",
  "white"
];

function parser(callback) {
  return function(strings, ...values) {
    const str = strings.reduce((total, current, index) => {
      total += current;
      if (values && values.hasOwnProperty(index)) {
        total += values[index];
      }
      return total;
    }, "");
    callback(str);
    return str;
  };
}

const write = str => process.stdout.write(str);

function out(...args) {
  parser(str => write(str))(...args);
}

function cout(color) {
  return parser(str => write(str[color || "white"]));
}

const randcolor = () => colors[Math.floor(Math.random() * (colors.length - 1))];

const uid = () => shortid.generate().toUpperCase();

function timing(task, ...args) {
  const start = new Date();
  task(...args);
  return new Date() - start;
}
const sec = ms => `${ms / 1000} s`;

const sum = arr => arr.reduce((a, n) => a + n, 0);

module.exports = { out, cout, randcolor, uid, timing, sec, sum };