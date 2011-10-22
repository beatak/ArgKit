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
 * => {help: true} ['--help']
 * 
 * node find.js /usr/local --name="yeah" -v=true'
 * => {'/usr/local': true, 'name': 'yeah', 'v': 'true'} ['/usr/local', '--name="yeah"', '-v=true']
 * 
 * and you can run this to serialize/deserialize values
 * var args = new ArgKit('/usr/local', '--name');
 * => {'/usr/local': true, 'name': true} ['/usr/local', '--name']
 * 
 * - handled attribute?
 * node this.js --name 
 * var myarg = new ArgKit(
 *   [
 *    {
 *      token: ['H', 'L', 'P'],
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

// ________________________________________________________

// need: type safe casting

// ________________________________________________________

var ArgKit = function () {
  var argProtos = [];
  
  var args = [];
  for (var i = 0, len = argv.length; i < len; ++i) {
    args[args.length] = new Arg(argv[i]);
  }
};

// ________________________________________________________

var ArgProto = function (param) {
  var token = param.token;
  var label = param.label;
  var isOptional = param.isOptional || false;
  var childLabel = param.child;
  var child = null;
  // token;
  this.__defineGetter__(
    'token',
    function () {
      return token;
    }
  );
  this.__defineSetter__(
    'token',
    function () {
      throw new Error('token is read-only');
    }
  );
  // label
  this.__defineGetter__(
    'label',
    function () {
      return label;
    }
  );
  this.__defineSetter__(
    'label',
    function () {
      throw new Error('label is read-onlay');
    }
  );
  // isOptional
  this.__defineGetter__(
    'isOptional',
    function () {
      return isOptional;
    }
  );
  this.__defineSetter__(
    'isOptional',
    function () {
      throw new Error('isOptional is read-only');
    }
  );
  // child 
  this.__defineGetter__(
    'child',
    function () {
      // potentially null
      return child;
    }
  );
  this.__defineSetter__(
    'child',
    function (elm) {
      if (child !== null) {
        throw new Error('you can only set child once');
      }
      else if (!(elm instanceof ArgProto)) {
        throw new Error('you can only set ArgProto instance as a child');
      }
      else if (elm.label !== childLabel) {
        console.log('set childLabel and the obj label is different');
      }
      child = elm;
    }
  );
  // serializer
  var serialize = function () {
    return {
      token: token,
      isOptional: isOptional,
      child: childLabel
    };
  };
  this.toString = serialize;
  this.valueOf = serialize;
};

// ________________________________________________________

var Arg = function (val, param) {
  this.prototype = new ArgProto(param);
  var original = '' + val;
  var value = val.replace(/\-{0,2}/, '');
  // serializer
  this.toString = function () {
    return vale;
  };
  this.valueOf = function () {
    return original;
  };
};

// ________________________________________________________

exports.ArgKit  = ArgKit;
