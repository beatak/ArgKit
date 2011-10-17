/**
 * argkit is the best utility for making a command line tool for node.js.
 * It handles arguments as you think, and very much configurable.
 * 
 * as default:
 * - you can accesss argments as an array,
 * -- dash(es) will be taken cared
 * - you can accesss values like hash, if you have key-value pairs
 * -- you can also name values by configuration.
 * 
 * example:
 * ack [OPTION]... PATTERN [FILE]
 * 
 * so like:
 * node foo.js --help
 * => {help: ''} [0] == 'help'
 * 
 * node find.js /usr/local -name '
 * =>
 * 
 * and you can run this to serialize/deserialize values
 * require('argkit');
 * 
 * - handled attribute?
 * node this.js --name 
 * var myarg = argkit(
 *   [
 *    {
 *      token: [H, L, P],
 *      isOptional: true,
 *      child: 'bar'
 *    },
 *    {
 *      label: 'bar',
 *      isOptional: true,
 *    },
 *    {
 *      labal: 'path',
 *      isOptional: false,
 *       
 *    }
 *   ], process.argv
 * );
 * so each of 
 * 
 */

var argkit = function (argv) {
  if (!argv) {
    argv = process.argv;
  }

  var args = [];
  for (var i = 0, len = argv.length; i < len; ++i) {
    args[args.length] = new Arg(argv[i]);
  }
};

var Arg = function (str) {
  var original = str;
  this.toString = function () {
    // no dashes
  };

  this.__defineGetter__(
    'original', 
    function () {
      return original;
    });
  this.__defineSetter__(
    'original', 
    function (val) {
      throw new Error('original is read only property.');
    });
};

/*
// v8 doesn't do this way?
// get no syntax error, but well.
  Arg.prototype = {
    get yay() {
      return mystr;
    },
    set yay(val) {
      throw new Error('foo');
    }
  };
*/

exports.Arg = Arg;
exports.argkit = argkit;