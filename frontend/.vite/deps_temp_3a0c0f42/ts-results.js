// node_modules/.pnpm/ts-results@3.3.0/node_modules/ts-results/esm/utils.js
function toString(val) {
  var value = String(val);
  if (value === "[object Object]") {
    try {
      value = JSON.stringify(val);
    } catch (_a) {
    }
  }
  return value;
}

// node_modules/.pnpm/ts-results@3.3.0/node_modules/ts-results/esm/option.js
var NoneImpl = (
  /** @class */
  function() {
    function NoneImpl2() {
      this.some = false;
      this.none = true;
    }
    NoneImpl2.prototype[Symbol.iterator] = function() {
      return {
        next: function() {
          return { done: true, value: void 0 };
        }
      };
    };
    NoneImpl2.prototype.unwrapOr = function(val) {
      return val;
    };
    NoneImpl2.prototype.expect = function(msg) {
      throw new Error("" + msg);
    };
    NoneImpl2.prototype.unwrap = function() {
      throw new Error("Tried to unwrap None");
    };
    NoneImpl2.prototype.map = function(_mapper) {
      return this;
    };
    NoneImpl2.prototype.andThen = function(op) {
      return this;
    };
    NoneImpl2.prototype.toResult = function(error) {
      return Err(error);
    };
    NoneImpl2.prototype.toString = function() {
      return "None";
    };
    return NoneImpl2;
  }()
);
var None = new NoneImpl();
Object.freeze(None);
var SomeImpl = (
  /** @class */
  function() {
    function SomeImpl2(val) {
      if (!(this instanceof SomeImpl2)) {
        return new SomeImpl2(val);
      }
      this.some = true;
      this.none = false;
      this.val = val;
    }
    SomeImpl2.prototype[Symbol.iterator] = function() {
      var obj = Object(this.val);
      return Symbol.iterator in obj ? obj[Symbol.iterator]() : {
        next: function() {
          return { done: true, value: void 0 };
        }
      };
    };
    SomeImpl2.prototype.unwrapOr = function(_val) {
      return this.val;
    };
    SomeImpl2.prototype.expect = function(_msg) {
      return this.val;
    };
    SomeImpl2.prototype.unwrap = function() {
      return this.val;
    };
    SomeImpl2.prototype.map = function(mapper) {
      return Some(mapper(this.val));
    };
    SomeImpl2.prototype.andThen = function(mapper) {
      return mapper(this.val);
    };
    SomeImpl2.prototype.toResult = function(error) {
      return Ok(this.val);
    };
    SomeImpl2.prototype.safeUnwrap = function() {
      return this.val;
    };
    SomeImpl2.prototype.toString = function() {
      return "Some(" + toString(this.val) + ")";
    };
    SomeImpl2.EMPTY = new SomeImpl2(void 0);
    return SomeImpl2;
  }()
);
var Some = SomeImpl;
var Option;
(function(Option2) {
  function all() {
    var options = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      options[_i] = arguments[_i];
    }
    var someOption = [];
    for (var _a = 0, options_1 = options; _a < options_1.length; _a++) {
      var option = options_1[_a];
      if (option.some) {
        someOption.push(option.val);
      } else {
        return option;
      }
    }
    return Some(someOption);
  }
  Option2.all = all;
  function any() {
    var options = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      options[_i] = arguments[_i];
    }
    for (var _a = 0, options_2 = options; _a < options_2.length; _a++) {
      var option = options_2[_a];
      if (option.some) {
        return option;
      } else {
        return option;
      }
    }
    return None;
  }
  Option2.any = any;
  function isOption(value) {
    return value instanceof Some || value === None;
  }
  Option2.isOption = isOption;
})(Option || (Option = {}));

// node_modules/.pnpm/ts-results@3.3.0/node_modules/ts-results/esm/result.js
var ErrImpl = (
  /** @class */
  function() {
    function ErrImpl2(val) {
      if (!(this instanceof ErrImpl2)) {
        return new ErrImpl2(val);
      }
      this.ok = false;
      this.err = true;
      this.val = val;
      var stackLines = new Error().stack.split("\n").slice(2);
      if (stackLines && stackLines.length > 0 && stackLines[0].includes("ErrImpl")) {
        stackLines.shift();
      }
      this._stack = stackLines.join("\n");
    }
    ErrImpl2.prototype[Symbol.iterator] = function() {
      return {
        next: function() {
          return { done: true, value: void 0 };
        }
      };
    };
    ErrImpl2.prototype.else = function(val) {
      return val;
    };
    ErrImpl2.prototype.unwrapOr = function(val) {
      return val;
    };
    ErrImpl2.prototype.expect = function(msg) {
      throw new Error(msg + " - Error: " + toString(this.val) + "\n" + this._stack);
    };
    ErrImpl2.prototype.unwrap = function() {
      throw new Error("Tried to unwrap Error: " + toString(this.val) + "\n" + this._stack);
    };
    ErrImpl2.prototype.map = function(_mapper) {
      return this;
    };
    ErrImpl2.prototype.andThen = function(op) {
      return this;
    };
    ErrImpl2.prototype.mapErr = function(mapper) {
      return new Err(mapper(this.val));
    };
    ErrImpl2.prototype.toOption = function() {
      return None;
    };
    ErrImpl2.prototype.toString = function() {
      return "Err(" + toString(this.val) + ")";
    };
    Object.defineProperty(ErrImpl2.prototype, "stack", {
      get: function() {
        return this + "\n" + this._stack;
      },
      enumerable: false,
      configurable: true
    });
    ErrImpl2.EMPTY = new ErrImpl2(void 0);
    return ErrImpl2;
  }()
);
var Err = ErrImpl;
var OkImpl = (
  /** @class */
  function() {
    function OkImpl2(val) {
      if (!(this instanceof OkImpl2)) {
        return new OkImpl2(val);
      }
      this.ok = true;
      this.err = false;
      this.val = val;
    }
    OkImpl2.prototype[Symbol.iterator] = function() {
      var obj = Object(this.val);
      return Symbol.iterator in obj ? obj[Symbol.iterator]() : {
        next: function() {
          return { done: true, value: void 0 };
        }
      };
    };
    OkImpl2.prototype.else = function(_val) {
      return this.val;
    };
    OkImpl2.prototype.unwrapOr = function(_val) {
      return this.val;
    };
    OkImpl2.prototype.expect = function(_msg) {
      return this.val;
    };
    OkImpl2.prototype.unwrap = function() {
      return this.val;
    };
    OkImpl2.prototype.map = function(mapper) {
      return new Ok(mapper(this.val));
    };
    OkImpl2.prototype.andThen = function(mapper) {
      return mapper(this.val);
    };
    OkImpl2.prototype.mapErr = function(_mapper) {
      return this;
    };
    OkImpl2.prototype.toOption = function() {
      return Some(this.val);
    };
    OkImpl2.prototype.safeUnwrap = function() {
      return this.val;
    };
    OkImpl2.prototype.toString = function() {
      return "Ok(" + toString(this.val) + ")";
    };
    OkImpl2.EMPTY = new OkImpl2(void 0);
    return OkImpl2;
  }()
);
var Ok = OkImpl;
var Result;
(function(Result2) {
  function all() {
    var results = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      results[_i] = arguments[_i];
    }
    var okResult = [];
    for (var _a = 0, results_1 = results; _a < results_1.length; _a++) {
      var result = results_1[_a];
      if (result.ok) {
        okResult.push(result.val);
      } else {
        return result;
      }
    }
    return new Ok(okResult);
  }
  Result2.all = all;
  function any() {
    var results = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      results[_i] = arguments[_i];
    }
    var errResult = [];
    for (var _a = 0, results_2 = results; _a < results_2.length; _a++) {
      var result = results_2[_a];
      if (result.ok) {
        return result;
      } else {
        errResult.push(result.val);
      }
    }
    return new Err(errResult);
  }
  Result2.any = any;
  function wrap(op) {
    try {
      return new Ok(op());
    } catch (e) {
      return new Err(e);
    }
  }
  Result2.wrap = wrap;
  function wrapAsync(op) {
    try {
      return op().then(function(val) {
        return new Ok(val);
      }).catch(function(e) {
        return new Err(e);
      });
    } catch (e) {
      return Promise.resolve(new Err(e));
    }
  }
  Result2.wrapAsync = wrapAsync;
  function isResult(val) {
    return val instanceof Err || val instanceof Ok;
  }
  Result2.isResult = isResult;
})(Result || (Result = {}));
export {
  Err,
  ErrImpl,
  None,
  Ok,
  OkImpl,
  Option,
  Result,
  Some
};
//# sourceMappingURL=ts-results.js.map
