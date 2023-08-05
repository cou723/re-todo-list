// node_modules/.pnpm/fp-ts@2.16.0/node_modules/fp-ts/es6/function.js
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
function identity(a) {
  return a;
}
function constant(a) {
  return function() {
    return a;
  };
}
var constTrue = constant(true);
var constFalse = constant(false);
var constNull = constant(null);
var constUndefined = constant(void 0);
function flow(ab, bc, cd, de, ef, fg, gh, hi, ij) {
  switch (arguments.length) {
    case 1:
      return ab;
    case 2:
      return function() {
        return bc(ab.apply(this, arguments));
      };
    case 3:
      return function() {
        return cd(bc(ab.apply(this, arguments)));
      };
    case 4:
      return function() {
        return de(cd(bc(ab.apply(this, arguments))));
      };
    case 5:
      return function() {
        return ef(de(cd(bc(ab.apply(this, arguments)))));
      };
    case 6:
      return function() {
        return fg(ef(de(cd(bc(ab.apply(this, arguments))))));
      };
    case 7:
      return function() {
        return gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))));
      };
    case 8:
      return function() {
        return hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments))))))));
      };
    case 9:
      return function() {
        return ij(hi(gh(fg(ef(de(cd(bc(ab.apply(this, arguments)))))))));
      };
  }
  return;
}
function pipe(a, ab, bc, cd, de, ef, fg, gh, hi) {
  switch (arguments.length) {
    case 1:
      return a;
    case 2:
      return ab(a);
    case 3:
      return bc(ab(a));
    case 4:
      return cd(bc(ab(a)));
    case 5:
      return de(cd(bc(ab(a))));
    case 6:
      return ef(de(cd(bc(ab(a)))));
    case 7:
      return fg(ef(de(cd(bc(ab(a))))));
    case 8:
      return gh(fg(ef(de(cd(bc(ab(a)))))));
    case 9:
      return hi(gh(fg(ef(de(cd(bc(ab(a))))))));
    default: {
      var ret = arguments[0];
      for (var i = 1; i < arguments.length; i++) {
        ret = arguments[i](ret);
      }
      return ret;
    }
  }
}
var dual = function(arity, body) {
  var isDataFirst = typeof arity === "number" ? function(args) {
    return args.length >= arity;
  } : arity;
  return function() {
    var args = Array.from(arguments);
    if (isDataFirst(arguments)) {
      return body.apply(this, args);
    }
    return function(self) {
      return body.apply(void 0, __spreadArray([self], args, false));
    };
  };
};

// node_modules/.pnpm/fp-ts@2.16.0/node_modules/fp-ts/es6/internal.js
var isNone = function(fa) {
  return fa._tag === "None";
};
var isLeft = function(ma) {
  return ma._tag === "Left";
};
var left = function(e) {
  return { _tag: "Left", left: e };
};
var right = function(a) {
  return { _tag: "Right", right: a };
};
var isNonEmpty = function(as3) {
  return as3.length > 0;
};
var head = function(as3) {
  return as3[0];
};
var emptyReadonlyArray = [];
var emptyRecord = {};
var liftNullable = function(F) {
  return function(f, onNullable) {
    return function() {
      var a = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
      }
      var o = f.apply(void 0, a);
      return F.fromEither(o == null ? left(onNullable.apply(void 0, a)) : right(o));
    };
  };
};
var liftOption = function(F) {
  return function(f, onNone) {
    return function() {
      var a = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
      }
      var o = f.apply(void 0, a);
      return F.fromEither(isNone(o) ? left(onNone.apply(void 0, a)) : right(o.value));
    };
  };
};
var flatMapNullable = function(F, M) {
  return dual(3, function(self, f, onNullable) {
    return M.flatMap(self, liftNullable(F)(f, onNullable));
  });
};
var flatMapOption = function(F, M) {
  return dual(3, function(self, f, onNone) {
    return M.flatMap(self, liftOption(F)(f, onNone));
  });
};

// node_modules/.pnpm/fp-ts@2.16.0/node_modules/fp-ts/es6/Apply.js
function apFirst(A) {
  return function(second) {
    return function(first) {
      return A.ap(A.map(first, function(a) {
        return function() {
          return a;
        };
      }), second);
    };
  };
}
function apSecond(A) {
  return function(second) {
    return function(first) {
      return A.ap(A.map(first, function() {
        return function(b) {
          return b;
        };
      }), second);
    };
  };
}
function apS(F) {
  return function(name, fb) {
    return function(fa) {
      return F.ap(F.map(fa, function(a) {
        return function(b) {
          var _a;
          return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
        };
      }), fb);
    };
  };
}
function getApplySemigroup(F) {
  return function(S) {
    return {
      concat: function(first, second) {
        return F.ap(F.map(first, function(x) {
          return function(y) {
            return S.concat(x, y);
          };
        }), second);
      }
    };
  };
}

// node_modules/.pnpm/fp-ts@2.16.0/node_modules/fp-ts/es6/Functor.js
function flap(F) {
  return function(a) {
    return function(fab) {
      return F.map(fab, function(f) {
        return f(a);
      });
    };
  };
}
function bindTo(F) {
  return function(name) {
    return function(fa) {
      return F.map(fa, function(a) {
        var _a;
        return _a = {}, _a[name] = a, _a;
      });
    };
  };
}
function let_(F) {
  return function(name, f) {
    return function(fa) {
      return F.map(fa, function(a) {
        var _a;
        return Object.assign({}, a, (_a = {}, _a[name] = f(a), _a));
      });
    };
  };
}
function as(F) {
  return function(self, b) {
    return F.map(self, function() {
      return b;
    });
  };
}
function asUnit(F) {
  var asM = as(F);
  return function(self) {
    return asM(self, void 0);
  };
}

// node_modules/.pnpm/fp-ts@2.16.0/node_modules/fp-ts/es6/Applicative.js
function getApplicativeMonoid(F) {
  var f = getApplySemigroup(F);
  return function(M) {
    return {
      concat: f(M).concat,
      empty: F.of(M.empty)
    };
  };
}

// node_modules/.pnpm/fp-ts@2.16.0/node_modules/fp-ts/es6/Chain.js
function tap(M) {
  return function(first, f) {
    return M.chain(first, function(a) {
      return M.map(f(a), function() {
        return a;
      });
    });
  };
}
function bind(M) {
  return function(name, f) {
    return function(ma) {
      return M.chain(ma, function(a) {
        return M.map(f(a), function(b) {
          var _a;
          return Object.assign({}, a, (_a = {}, _a[name] = b, _a));
        });
      });
    };
  };
}

// node_modules/.pnpm/fp-ts@2.16.0/node_modules/fp-ts/es6/FromEither.js
function fromOption(F) {
  return function(onNone) {
    return function(ma) {
      return F.fromEither(isNone(ma) ? left(onNone()) : right(ma.value));
    };
  };
}
function fromPredicate(F) {
  return function(predicate, onFalse) {
    return function(a) {
      return F.fromEither(predicate(a) ? right(a) : left(onFalse(a)));
    };
  };
}
function fromOptionK(F) {
  var fromOptionF = fromOption(F);
  return function(onNone) {
    var from = fromOptionF(onNone);
    return function(f) {
      return flow(f, from);
    };
  };
}
function chainOptionK(F, M) {
  var fromOptionKF = fromOptionK(F);
  return function(onNone) {
    var from = fromOptionKF(onNone);
    return function(f) {
      return function(ma) {
        return M.chain(ma, from(f));
      };
    };
  };
}
function filterOrElse(F, M) {
  return function(predicate, onFalse) {
    return function(ma) {
      return M.chain(ma, function(a) {
        return F.fromEither(predicate(a) ? right(a) : left(onFalse(a)));
      });
    };
  };
}

// node_modules/.pnpm/fp-ts@2.16.0/node_modules/fp-ts/es6/Separated.js
var separated = function(left4, right4) {
  return { left: left4, right: right4 };
};
var _map = function(fa, f) {
  return pipe(fa, map(f));
};
var map = function(f) {
  return function(fa) {
    return separated(left2(fa), f(right2(fa)));
  };
};
var URI = "Separated";
var Functor = {
  URI,
  map: _map
};
var flap2 = flap(Functor);
var left2 = function(s) {
  return s.left;
};
var right2 = function(s) {
  return s.right;
};

// node_modules/.pnpm/fp-ts@2.16.0/node_modules/fp-ts/es6/Either.js
var left3 = left;
var right3 = right;
var flatMap = dual(2, function(ma, f) {
  return isLeft2(ma) ? ma : f(ma.right);
});
var _map2 = function(fa, f) {
  return pipe(fa, map2(f));
};
var _ap = function(fab, fa) {
  return pipe(fab, ap2(fa));
};
var URI2 = "Either";
var map2 = function(f) {
  return function(fa) {
    return isLeft2(fa) ? fa : right3(f(fa.right));
  };
};
var Functor2 = {
  URI: URI2,
  map: _map2
};
var as2 = dual(2, as(Functor2));
var asUnit2 = asUnit(Functor2);
var of = right3;
var apW = function(fa) {
  return function(fab) {
    return isLeft2(fab) ? fab : isLeft2(fa) ? fa : right3(fab.right(fa.right));
  };
};
var ap2 = apW;
var Apply = {
  URI: URI2,
  map: _map2,
  ap: _ap
};
var Applicative = {
  URI: URI2,
  map: _map2,
  ap: _ap,
  of
};
var Chain = {
  URI: URI2,
  map: _map2,
  ap: _ap,
  chain: flatMap
};
var extend = function(f) {
  return function(wa) {
    return isLeft2(wa) ? wa : right3(f(wa));
  };
};
var FromEither = {
  URI: URI2,
  fromEither: identity
};
var fromPredicate2 = fromPredicate(FromEither);
var fromOption2 = fromOption(FromEither);
var isLeft2 = isLeft;
var matchW = function(onLeft, onRight) {
  return function(ma) {
    return isLeft2(ma) ? onLeft(ma.left) : onRight(ma.right);
  };
};
var foldW = matchW;
var flap3 = flap(Functor2);
var apFirst2 = apFirst(Apply);
var apSecond2 = apSecond(Apply);
var tap2 = dual(2, tap(Chain));
var flattenW = flatMap(identity);
var duplicate = extend(identity);
var fromOptionK2 = fromOptionK(FromEither);
var chainOptionK2 = chainOptionK(FromEither, Chain);
var _FromEither = {
  fromEither: FromEither.fromEither
};
var liftNullable2 = liftNullable(_FromEither);
var liftOption2 = liftOption(_FromEither);
var _FlatMap = {
  flatMap
};
var flatMapNullable2 = flatMapNullable(_FromEither, _FlatMap);
var flatMapOption2 = flatMapOption(_FromEither, _FlatMap);
var filterOrElse2 = filterOrElse(FromEither, Chain);
var toUnion = foldW(identity, identity);
var Do = of(emptyRecord);
var bindTo2 = bindTo(Functor2);
var let_2 = let_(Functor2);
var bind2 = bind(Chain);
var apS2 = apS(Apply);
var ApT = of(emptyReadonlyArray);
var traverseReadonlyNonEmptyArrayWithIndex = function(f) {
  return function(as3) {
    var e = f(0, head(as3));
    if (isLeft2(e)) {
      return e;
    }
    var out = [e.right];
    for (var i = 1; i < as3.length; i++) {
      var e_1 = f(i, as3[i]);
      if (isLeft2(e_1)) {
        return e_1;
      }
      out.push(e_1.right);
    }
    return right3(out);
  };
};
var traverseReadonlyArrayWithIndex = function(f) {
  var g = traverseReadonlyNonEmptyArrayWithIndex(f);
  return function(as3) {
    return isNonEmpty(as3) ? g(as3) : ApT;
  };
};
var traverseArray = function(f) {
  return traverseReadonlyArrayWithIndex(function(_, a) {
    return f(a);
  });
};
var sequenceArray = traverseArray(identity);
var getApplySemigroup2 = getApplySemigroup(Apply);
var getApplyMonoid = getApplicativeMonoid(Applicative);

// node_modules/.pnpm/io-ts@2.2.20_fp-ts@2.16.0/node_modules/io-ts/es6/index.js
var __extends = function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (Object.prototype.hasOwnProperty.call(b2, p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __spreadArray2 = function(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var failures = left3;
var failure = function(value, context, message) {
  return failures([{ value, context, message }]);
};
var success = right3;
var Type = (
  /** @class */
  function() {
    function Type2(name, is, validate, encode) {
      this.name = name;
      this.is = is;
      this.validate = validate;
      this.encode = encode;
      this.decode = this.decode.bind(this);
    }
    Type2.prototype.pipe = function(ab, name) {
      var _this = this;
      if (name === void 0) {
        name = "pipe(".concat(this.name, ", ").concat(ab.name, ")");
      }
      return new Type2(name, ab.is, function(i, c) {
        var e = _this.validate(i, c);
        if (isLeft2(e)) {
          return e;
        }
        return ab.validate(e.right, c);
      }, this.encode === identity2 && ab.encode === identity2 ? identity2 : function(b) {
        return _this.encode(ab.encode(b));
      });
    };
    Type2.prototype.asDecoder = function() {
      return this;
    };
    Type2.prototype.asEncoder = function() {
      return this;
    };
    Type2.prototype.decode = function(i) {
      return this.validate(i, [{ key: "", type: this, actual: i }]);
    };
    return Type2;
  }()
);
var identity2 = function(a) {
  return a;
};
function getFunctionName(f) {
  return f.displayName || f.name || "<function".concat(f.length, ">");
}
function getContextEntry(key, decoder) {
  return { key, type: decoder };
}
function appendContext(c, key, decoder, actual) {
  var len = c.length;
  var r = Array(len + 1);
  for (var i = 0; i < len; i++) {
    r[i] = c[i];
  }
  r[len] = { key, type: decoder, actual };
  return r;
}
function pushAll(xs, ys) {
  var l = ys.length;
  for (var i = 0; i < l; i++) {
    xs.push(ys[i]);
  }
}
var hasOwnProperty = Object.prototype.hasOwnProperty;
function getNameFromProps(props) {
  return Object.keys(props).map(function(k) {
    return "".concat(k, ": ").concat(props[k].name);
  }).join(", ");
}
function useIdentity(codecs) {
  for (var i = 0; i < codecs.length; i++) {
    if (codecs[i].encode !== identity2) {
      return false;
    }
  }
  return true;
}
function getInterfaceTypeName(props) {
  return "{ ".concat(getNameFromProps(props), " }");
}
function getPartialTypeName(inner) {
  return "Partial<".concat(inner, ">");
}
function enumerableRecord(keys, domain, codomain, name) {
  if (name === void 0) {
    name = "{ [K in ".concat(domain.name, "]: ").concat(codomain.name, " }");
  }
  var len = keys.length;
  return new DictionaryType(name, function(u) {
    return UnknownRecord.is(u) && keys.every(function(k) {
      return codomain.is(u[k]);
    });
  }, function(u, c) {
    var e = UnknownRecord.validate(u, c);
    if (isLeft2(e)) {
      return e;
    }
    var o = e.right;
    var a = {};
    var errors = [];
    var changed = false;
    for (var i = 0; i < len; i++) {
      var k = keys[i];
      var ok = o[k];
      var codomainResult = codomain.validate(ok, appendContext(c, k, codomain, ok));
      if (isLeft2(codomainResult)) {
        pushAll(errors, codomainResult.left);
      } else {
        var vok = codomainResult.right;
        changed = changed || vok !== ok;
        a[k] = vok;
      }
    }
    return errors.length > 0 ? failures(errors) : success(changed || Object.keys(o).length !== len ? a : o);
  }, codomain.encode === identity2 ? identity2 : function(a) {
    var s = {};
    for (var i = 0; i < len; i++) {
      var k = keys[i];
      s[k] = codomain.encode(a[k]);
    }
    return s;
  }, domain, codomain);
}
function getDomainKeys(domain) {
  var _a;
  if (isLiteralC(domain)) {
    var literal_1 = domain.value;
    if (string.is(literal_1)) {
      return _a = {}, _a[literal_1] = null, _a;
    }
  } else if (isKeyofC(domain)) {
    return domain.keys;
  } else if (isUnionC(domain)) {
    var keys = domain.types.map(function(type2) {
      return getDomainKeys(type2);
    });
    return keys.some(undefinedType.is) ? void 0 : Object.assign.apply(Object, __spreadArray2([{}], keys, false));
  }
  return void 0;
}
function nonEnumerableRecord(domain, codomain, name) {
  if (name === void 0) {
    name = "{ [K in ".concat(domain.name, "]: ").concat(codomain.name, " }");
  }
  return new DictionaryType(name, function(u) {
    if (UnknownRecord.is(u)) {
      return Object.keys(u).every(function(k) {
        return domain.is(k) && codomain.is(u[k]);
      });
    }
    return isAnyC(codomain) && Array.isArray(u);
  }, function(u, c) {
    if (UnknownRecord.is(u)) {
      var a = {};
      var errors = [];
      var keys = Object.keys(u);
      var len = keys.length;
      var changed = false;
      for (var i = 0; i < len; i++) {
        var k = keys[i];
        var ok = u[k];
        var domainResult = domain.validate(k, appendContext(c, k, domain, k));
        if (isLeft2(domainResult)) {
          pushAll(errors, domainResult.left);
        } else {
          var vk = domainResult.right;
          changed = changed || vk !== k;
          k = vk;
          var codomainResult = codomain.validate(ok, appendContext(c, k, codomain, ok));
          if (isLeft2(codomainResult)) {
            pushAll(errors, codomainResult.left);
          } else {
            var vok = codomainResult.right;
            changed = changed || vok !== ok;
            a[k] = vok;
          }
        }
      }
      return errors.length > 0 ? failures(errors) : success(changed ? a : u);
    }
    if (isAnyC(codomain) && Array.isArray(u)) {
      return success(u);
    }
    return failure(u, c);
  }, domain.encode === identity2 && codomain.encode === identity2 ? identity2 : function(a) {
    var s = {};
    var keys = Object.keys(a);
    var len = keys.length;
    for (var i = 0; i < len; i++) {
      var k = keys[i];
      s[String(domain.encode(k))] = codomain.encode(a[k]);
    }
    return s;
  }, domain, codomain);
}
function getUnionName(codecs) {
  return "(" + codecs.map(function(type2) {
    return type2.name;
  }).join(" | ") + ")";
}
function mergeAll(base, us) {
  var equal = true;
  var primitive = true;
  var baseIsNotADictionary = !UnknownRecord.is(base);
  for (var _i = 0, us_1 = us; _i < us_1.length; _i++) {
    var u = us_1[_i];
    if (u !== base) {
      equal = false;
    }
    if (UnknownRecord.is(u)) {
      primitive = false;
    }
  }
  if (equal) {
    return base;
  } else if (primitive) {
    return us[us.length - 1];
  }
  var r = {};
  for (var _a = 0, us_2 = us; _a < us_2.length; _a++) {
    var u = us_2[_a];
    for (var k in u) {
      if (!hasOwnProperty.call(r, k) || baseIsNotADictionary || u[k] !== base[k]) {
        r[k] = u[k];
      }
    }
  }
  return r;
}
function getProps(codec) {
  switch (codec._tag) {
    case "RefinementType":
    case "ReadonlyType":
      return getProps(codec.type);
    case "InterfaceType":
    case "StrictType":
    case "PartialType":
      return codec.props;
    case "IntersectionType":
      return codec.types.reduce(function(props, type2) {
        return Object.assign(props, getProps(type2));
      }, {});
  }
}
function stripKeys(o, props) {
  var keys = Object.getOwnPropertyNames(o);
  var shouldStrip = false;
  var r = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwnProperty.call(props, key)) {
      shouldStrip = true;
    } else {
      r[key] = o[key];
    }
  }
  return shouldStrip ? r : o;
}
function getExactTypeName(codec) {
  if (isTypeC(codec)) {
    return "{| ".concat(getNameFromProps(codec.props), " |}");
  } else if (isPartialC(codec)) {
    return getPartialTypeName("{| ".concat(getNameFromProps(codec.props), " |}"));
  }
  return "Exact<".concat(codec.name, ">");
}
function isNonEmpty2(as3) {
  return as3.length > 0;
}
var emptyTags = {};
function intersect(a, b) {
  var r = [];
  for (var _i = 0, a_1 = a; _i < a_1.length; _i++) {
    var v = a_1[_i];
    if (b.indexOf(v) !== -1) {
      r.push(v);
    }
  }
  return r;
}
function mergeTags(a, b) {
  if (a === emptyTags) {
    return b;
  }
  if (b === emptyTags) {
    return a;
  }
  var r = Object.assign({}, a);
  for (var k in b) {
    if (hasOwnProperty.call(a, k)) {
      var intersection_1 = intersect(a[k], b[k]);
      if (isNonEmpty2(intersection_1)) {
        r[k] = intersection_1;
      } else {
        r = emptyTags;
        break;
      }
    } else {
      r[k] = b[k];
    }
  }
  return r;
}
function intersectTags(a, b) {
  if (a === emptyTags || b === emptyTags) {
    return emptyTags;
  }
  var r = emptyTags;
  for (var k in a) {
    if (hasOwnProperty.call(b, k)) {
      var intersection_2 = intersect(a[k], b[k]);
      if (intersection_2.length === 0) {
        if (r === emptyTags) {
          r = {};
        }
        r[k] = a[k].concat(b[k]);
      }
    }
  }
  return r;
}
function isAnyC(codec) {
  return codec._tag === "AnyType";
}
function isLiteralC(codec) {
  return codec._tag === "LiteralType";
}
function isKeyofC(codec) {
  return codec._tag === "KeyofType";
}
function isTypeC(codec) {
  return codec._tag === "InterfaceType";
}
function isPartialC(codec) {
  return codec._tag === "PartialType";
}
function isStrictC(codec) {
  return codec._tag === "StrictType";
}
function isExactC(codec) {
  return codec._tag === "ExactType";
}
function isRefinementC(codec) {
  return codec._tag === "RefinementType";
}
function isIntersectionC(codec) {
  return codec._tag === "IntersectionType";
}
function isUnionC(codec) {
  return codec._tag === "UnionType";
}
function isRecursiveC(codec) {
  return codec._tag === "RecursiveType";
}
var lazyCodecs = [];
function getTags(codec) {
  if (lazyCodecs.indexOf(codec) !== -1) {
    return emptyTags;
  }
  if (isTypeC(codec) || isStrictC(codec)) {
    var index = emptyTags;
    for (var k in codec.props) {
      var prop = codec.props[k];
      if (isLiteralC(prop)) {
        if (index === emptyTags) {
          index = {};
        }
        index[k] = [prop.value];
      }
    }
    return index;
  } else if (isExactC(codec) || isRefinementC(codec)) {
    return getTags(codec.type);
  } else if (isIntersectionC(codec)) {
    return codec.types.reduce(function(tags2, codec2) {
      return mergeTags(tags2, getTags(codec2));
    }, emptyTags);
  } else if (isUnionC(codec)) {
    return codec.types.slice(1).reduce(function(tags2, codec2) {
      return intersectTags(tags2, getTags(codec2));
    }, getTags(codec.types[0]));
  } else if (isRecursiveC(codec)) {
    lazyCodecs.push(codec);
    var tags = getTags(codec.type);
    lazyCodecs.pop();
    return tags;
  }
  return emptyTags;
}
function getIndex(codecs) {
  var tags = getTags(codecs[0]);
  var keys = Object.keys(tags);
  var len = codecs.length;
  var _loop_1 = function(k2) {
    var all = tags[k2].slice();
    var index = [tags[k2]];
    for (var i = 1; i < len; i++) {
      var codec = codecs[i];
      var ctags = getTags(codec);
      var values = ctags[k2];
      if (values === void 0) {
        return "continue-keys";
      } else {
        if (values.some(function(v) {
          return all.indexOf(v) !== -1;
        })) {
          return "continue-keys";
        } else {
          all.push.apply(all, values);
          index.push(values);
        }
      }
    }
    return { value: [k2, index] };
  };
  keys:
    for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
      var k = keys_1[_i];
      var state_1 = _loop_1(k);
      if (typeof state_1 === "object")
        return state_1.value;
      switch (state_1) {
        case "continue-keys":
          continue keys;
      }
    }
  return void 0;
}
var NullType = (
  /** @class */
  function(_super) {
    __extends(NullType2, _super);
    function NullType2() {
      var _this = _super.call(this, "null", function(u) {
        return u === null;
      }, function(u, c) {
        return _this.is(u) ? success(u) : failure(u, c);
      }, identity2) || this;
      _this._tag = "NullType";
      return _this;
    }
    return NullType2;
  }(Type)
);
var nullType = new NullType();
var UndefinedType = (
  /** @class */
  function(_super) {
    __extends(UndefinedType2, _super);
    function UndefinedType2() {
      var _this = _super.call(this, "undefined", function(u) {
        return u === void 0;
      }, function(u, c) {
        return _this.is(u) ? success(u) : failure(u, c);
      }, identity2) || this;
      _this._tag = "UndefinedType";
      return _this;
    }
    return UndefinedType2;
  }(Type)
);
var undefinedType = new UndefinedType();
var VoidType = (
  /** @class */
  function(_super) {
    __extends(VoidType2, _super);
    function VoidType2() {
      var _this = _super.call(this, "void", undefinedType.is, undefinedType.validate, identity2) || this;
      _this._tag = "VoidType";
      return _this;
    }
    return VoidType2;
  }(Type)
);
var voidType = new VoidType();
var UnknownType = (
  /** @class */
  function(_super) {
    __extends(UnknownType2, _super);
    function UnknownType2() {
      var _this = _super.call(this, "unknown", function(_) {
        return true;
      }, success, identity2) || this;
      _this._tag = "UnknownType";
      return _this;
    }
    return UnknownType2;
  }(Type)
);
var unknown = new UnknownType();
var StringType = (
  /** @class */
  function(_super) {
    __extends(StringType2, _super);
    function StringType2() {
      var _this = _super.call(this, "string", function(u) {
        return typeof u === "string";
      }, function(u, c) {
        return _this.is(u) ? success(u) : failure(u, c);
      }, identity2) || this;
      _this._tag = "StringType";
      return _this;
    }
    return StringType2;
  }(Type)
);
var string = new StringType();
var NumberType = (
  /** @class */
  function(_super) {
    __extends(NumberType2, _super);
    function NumberType2() {
      var _this = _super.call(this, "number", function(u) {
        return typeof u === "number";
      }, function(u, c) {
        return _this.is(u) ? success(u) : failure(u, c);
      }, identity2) || this;
      _this._tag = "NumberType";
      return _this;
    }
    return NumberType2;
  }(Type)
);
var number = new NumberType();
var BigIntType = (
  /** @class */
  function(_super) {
    __extends(BigIntType2, _super);
    function BigIntType2() {
      var _this = _super.call(
        this,
        "bigint",
        // tslint:disable-next-line: valid-typeof
        function(u) {
          return typeof u === "bigint";
        },
        function(u, c) {
          return _this.is(u) ? success(u) : failure(u, c);
        },
        identity2
      ) || this;
      _this._tag = "BigIntType";
      return _this;
    }
    return BigIntType2;
  }(Type)
);
var bigint = new BigIntType();
var BooleanType = (
  /** @class */
  function(_super) {
    __extends(BooleanType2, _super);
    function BooleanType2() {
      var _this = _super.call(this, "boolean", function(u) {
        return typeof u === "boolean";
      }, function(u, c) {
        return _this.is(u) ? success(u) : failure(u, c);
      }, identity2) || this;
      _this._tag = "BooleanType";
      return _this;
    }
    return BooleanType2;
  }(Type)
);
var boolean = new BooleanType();
var AnyArrayType = (
  /** @class */
  function(_super) {
    __extends(AnyArrayType2, _super);
    function AnyArrayType2() {
      var _this = _super.call(this, "UnknownArray", Array.isArray, function(u, c) {
        return _this.is(u) ? success(u) : failure(u, c);
      }, identity2) || this;
      _this._tag = "AnyArrayType";
      return _this;
    }
    return AnyArrayType2;
  }(Type)
);
var UnknownArray = new AnyArrayType();
var AnyDictionaryType = (
  /** @class */
  function(_super) {
    __extends(AnyDictionaryType2, _super);
    function AnyDictionaryType2() {
      var _this = _super.call(this, "UnknownRecord", function(u) {
        return u !== null && typeof u === "object" && !Array.isArray(u);
      }, function(u, c) {
        return _this.is(u) ? success(u) : failure(u, c);
      }, identity2) || this;
      _this._tag = "AnyDictionaryType";
      return _this;
    }
    return AnyDictionaryType2;
  }(Type)
);
var UnknownRecord = new AnyDictionaryType();
var LiteralType = (
  /** @class */
  function(_super) {
    __extends(LiteralType2, _super);
    function LiteralType2(name, is, validate, encode, value) {
      var _this = _super.call(this, name, is, validate, encode) || this;
      _this.value = value;
      _this._tag = "LiteralType";
      return _this;
    }
    return LiteralType2;
  }(Type)
);
function literal(value, name) {
  if (name === void 0) {
    name = JSON.stringify(value);
  }
  var is = function(u) {
    return u === value;
  };
  return new LiteralType(name, is, function(u, c) {
    return is(u) ? success(value) : failure(u, c);
  }, identity2, value);
}
var KeyofType = (
  /** @class */
  function(_super) {
    __extends(KeyofType2, _super);
    function KeyofType2(name, is, validate, encode, keys) {
      var _this = _super.call(this, name, is, validate, encode) || this;
      _this.keys = keys;
      _this._tag = "KeyofType";
      return _this;
    }
    return KeyofType2;
  }(Type)
);
function keyof(keys, name) {
  if (name === void 0) {
    name = Object.keys(keys).map(function(k) {
      return JSON.stringify(k);
    }).join(" | ");
  }
  var is = function(u) {
    return string.is(u) && hasOwnProperty.call(keys, u);
  };
  return new KeyofType(name, is, function(u, c) {
    return is(u) ? success(u) : failure(u, c);
  }, identity2, keys);
}
var RefinementType = (
  /** @class */
  function(_super) {
    __extends(RefinementType2, _super);
    function RefinementType2(name, is, validate, encode, type2, predicate) {
      var _this = _super.call(this, name, is, validate, encode) || this;
      _this.type = type2;
      _this.predicate = predicate;
      _this._tag = "RefinementType";
      return _this;
    }
    return RefinementType2;
  }(Type)
);
function brand(codec, predicate, name) {
  return refinement(codec, predicate, name);
}
var Int = brand(number, function(n) {
  return Number.isInteger(n);
}, "Int");
var RecursiveType = (
  /** @class */
  function(_super) {
    __extends(RecursiveType2, _super);
    function RecursiveType2(name, is, validate, encode, runDefinition) {
      var _this = _super.call(this, name, is, validate, encode) || this;
      _this.runDefinition = runDefinition;
      _this._tag = "RecursiveType";
      return _this;
    }
    return RecursiveType2;
  }(Type)
);
Object.defineProperty(RecursiveType.prototype, "type", {
  get: function() {
    return this.runDefinition();
  },
  enumerable: true,
  configurable: true
});
function recursion(name, definition) {
  var cache;
  var runDefinition = function() {
    if (!cache) {
      cache = definition(Self);
      cache.name = name;
    }
    return cache;
  };
  var Self = new RecursiveType(name, function(u) {
    return runDefinition().is(u);
  }, function(u, c) {
    return runDefinition().validate(u, c);
  }, function(a) {
    return runDefinition().encode(a);
  }, runDefinition);
  return Self;
}
var ArrayType = (
  /** @class */
  function(_super) {
    __extends(ArrayType2, _super);
    function ArrayType2(name, is, validate, encode, type2) {
      var _this = _super.call(this, name, is, validate, encode) || this;
      _this.type = type2;
      _this._tag = "ArrayType";
      return _this;
    }
    return ArrayType2;
  }(Type)
);
function array(item, name) {
  if (name === void 0) {
    name = "Array<".concat(item.name, ">");
  }
  return new ArrayType(name, function(u) {
    return UnknownArray.is(u) && u.every(item.is);
  }, function(u, c) {
    var e = UnknownArray.validate(u, c);
    if (isLeft2(e)) {
      return e;
    }
    var us = e.right;
    var len = us.length;
    var as3 = us;
    var errors = [];
    for (var i = 0; i < len; i++) {
      var ui = us[i];
      var result = item.validate(ui, appendContext(c, String(i), item, ui));
      if (isLeft2(result)) {
        pushAll(errors, result.left);
      } else {
        var ai = result.right;
        if (ai !== ui) {
          if (as3 === us) {
            as3 = us.slice();
          }
          as3[i] = ai;
        }
      }
    }
    return errors.length > 0 ? failures(errors) : success(as3);
  }, item.encode === identity2 ? identity2 : function(a) {
    return a.map(item.encode);
  }, item);
}
var InterfaceType = (
  /** @class */
  function(_super) {
    __extends(InterfaceType2, _super);
    function InterfaceType2(name, is, validate, encode, props) {
      var _this = _super.call(this, name, is, validate, encode) || this;
      _this.props = props;
      _this._tag = "InterfaceType";
      return _this;
    }
    return InterfaceType2;
  }(Type)
);
function type(props, name) {
  if (name === void 0) {
    name = getInterfaceTypeName(props);
  }
  var keys = Object.keys(props);
  var types = keys.map(function(key) {
    return props[key];
  });
  var len = keys.length;
  return new InterfaceType(name, function(u) {
    if (UnknownRecord.is(u)) {
      for (var i = 0; i < len; i++) {
        var k = keys[i];
        var uk = u[k];
        if (uk === void 0 && !hasOwnProperty.call(u, k) || !types[i].is(uk)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }, function(u, c) {
    var e = UnknownRecord.validate(u, c);
    if (isLeft2(e)) {
      return e;
    }
    var o = e.right;
    var a = o;
    var errors = [];
    for (var i = 0; i < len; i++) {
      var k = keys[i];
      var ak = a[k];
      var type_1 = types[i];
      var result = type_1.validate(ak, appendContext(c, k, type_1, ak));
      if (isLeft2(result)) {
        pushAll(errors, result.left);
      } else {
        var vak = result.right;
        if (vak !== ak || vak === void 0 && !hasOwnProperty.call(a, k)) {
          if (a === o) {
            a = __assign({}, o);
          }
          a[k] = vak;
        }
      }
    }
    return errors.length > 0 ? failures(errors) : success(a);
  }, useIdentity(types) ? identity2 : function(a) {
    var s = __assign({}, a);
    for (var i = 0; i < len; i++) {
      var k = keys[i];
      var encode = types[i].encode;
      if (encode !== identity2) {
        s[k] = encode(a[k]);
      }
    }
    return s;
  }, props);
}
var PartialType = (
  /** @class */
  function(_super) {
    __extends(PartialType2, _super);
    function PartialType2(name, is, validate, encode, props) {
      var _this = _super.call(this, name, is, validate, encode) || this;
      _this.props = props;
      _this._tag = "PartialType";
      return _this;
    }
    return PartialType2;
  }(Type)
);
function partial(props, name) {
  if (name === void 0) {
    name = getPartialTypeName(getInterfaceTypeName(props));
  }
  var keys = Object.keys(props);
  var types = keys.map(function(key) {
    return props[key];
  });
  var len = keys.length;
  return new PartialType(name, function(u) {
    if (UnknownRecord.is(u)) {
      for (var i = 0; i < len; i++) {
        var k = keys[i];
        var uk = u[k];
        if (uk !== void 0 && !props[k].is(uk)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }, function(u, c) {
    var e = UnknownRecord.validate(u, c);
    if (isLeft2(e)) {
      return e;
    }
    var o = e.right;
    var a = o;
    var errors = [];
    for (var i = 0; i < len; i++) {
      var k = keys[i];
      var ak = a[k];
      var type_2 = props[k];
      var result = type_2.validate(ak, appendContext(c, k, type_2, ak));
      if (isLeft2(result)) {
        if (ak !== void 0) {
          pushAll(errors, result.left);
        }
      } else {
        var vak = result.right;
        if (vak !== ak) {
          if (a === o) {
            a = __assign({}, o);
          }
          a[k] = vak;
        }
      }
    }
    return errors.length > 0 ? failures(errors) : success(a);
  }, useIdentity(types) ? identity2 : function(a) {
    var s = __assign({}, a);
    for (var i = 0; i < len; i++) {
      var k = keys[i];
      var ak = a[k];
      if (ak !== void 0) {
        s[k] = types[i].encode(ak);
      }
    }
    return s;
  }, props);
}
var DictionaryType = (
  /** @class */
  function(_super) {
    __extends(DictionaryType2, _super);
    function DictionaryType2(name, is, validate, encode, domain, codomain) {
      var _this = _super.call(this, name, is, validate, encode) || this;
      _this.domain = domain;
      _this.codomain = codomain;
      _this._tag = "DictionaryType";
      return _this;
    }
    return DictionaryType2;
  }(Type)
);
function record(domain, codomain, name) {
  var keys = getDomainKeys(domain);
  return keys ? enumerableRecord(Object.keys(keys), domain, codomain, name) : nonEnumerableRecord(domain, codomain, name);
}
var UnionType = (
  /** @class */
  function(_super) {
    __extends(UnionType2, _super);
    function UnionType2(name, is, validate, encode, types) {
      var _this = _super.call(this, name, is, validate, encode) || this;
      _this.types = types;
      _this._tag = "UnionType";
      return _this;
    }
    return UnionType2;
  }(Type)
);
function union(codecs, name) {
  if (name === void 0) {
    name = getUnionName(codecs);
  }
  var index = getIndex(codecs);
  if (index !== void 0 && codecs.length > 0) {
    var tag_1 = index[0], groups_1 = index[1];
    var len_1 = groups_1.length;
    var find_1 = function(value) {
      for (var i = 0; i < len_1; i++) {
        if (groups_1[i].indexOf(value) !== -1) {
          return i;
        }
      }
      return void 0;
    };
    return new TaggedUnionType(name, function(u) {
      if (UnknownRecord.is(u)) {
        var i = find_1(u[tag_1]);
        return i !== void 0 ? codecs[i].is(u) : false;
      }
      return false;
    }, function(u, c) {
      var e = UnknownRecord.validate(u, c);
      if (isLeft2(e)) {
        return e;
      }
      var r = e.right;
      var i = find_1(r[tag_1]);
      if (i === void 0) {
        return failure(u, c);
      }
      var codec = codecs[i];
      return codec.validate(r, appendContext(c, String(i), codec, r));
    }, useIdentity(codecs) ? identity2 : function(a) {
      var i = find_1(a[tag_1]);
      if (i === void 0) {
        throw new Error("no codec found to encode value in union codec ".concat(name));
      } else {
        return codecs[i].encode(a);
      }
    }, codecs, tag_1);
  } else {
    return new UnionType(name, function(u) {
      return codecs.some(function(type2) {
        return type2.is(u);
      });
    }, function(u, c) {
      var errors = [];
      for (var i = 0; i < codecs.length; i++) {
        var codec = codecs[i];
        var result = codec.validate(u, appendContext(c, String(i), codec, u));
        if (isLeft2(result)) {
          pushAll(errors, result.left);
        } else {
          return success(result.right);
        }
      }
      return failures(errors);
    }, useIdentity(codecs) ? identity2 : function(a) {
      for (var _i = 0, codecs_1 = codecs; _i < codecs_1.length; _i++) {
        var codec = codecs_1[_i];
        if (codec.is(a)) {
          return codec.encode(a);
        }
      }
      throw new Error("no codec found to encode value in union type ".concat(name));
    }, codecs);
  }
}
var IntersectionType = (
  /** @class */
  function(_super) {
    __extends(IntersectionType2, _super);
    function IntersectionType2(name, is, validate, encode, types) {
      var _this = _super.call(this, name, is, validate, encode) || this;
      _this.types = types;
      _this._tag = "IntersectionType";
      return _this;
    }
    return IntersectionType2;
  }(Type)
);
function intersection(codecs, name) {
  if (name === void 0) {
    name = "(".concat(codecs.map(function(type2) {
      return type2.name;
    }).join(" & "), ")");
  }
  var len = codecs.length;
  return new IntersectionType(name, function(u) {
    return codecs.every(function(type2) {
      return type2.is(u);
    });
  }, codecs.length === 0 ? success : function(u, c) {
    var us = [];
    var errors = [];
    for (var i = 0; i < len; i++) {
      var codec = codecs[i];
      var result = codec.validate(u, appendContext(c, String(i), codec, u));
      if (isLeft2(result)) {
        pushAll(errors, result.left);
      } else {
        us.push(result.right);
      }
    }
    return errors.length > 0 ? failures(errors) : success(mergeAll(u, us));
  }, codecs.length === 0 ? identity2 : function(a) {
    return mergeAll(a, codecs.map(function(codec) {
      return codec.encode(a);
    }));
  }, codecs);
}
var TupleType = (
  /** @class */
  function(_super) {
    __extends(TupleType2, _super);
    function TupleType2(name, is, validate, encode, types) {
      var _this = _super.call(this, name, is, validate, encode) || this;
      _this.types = types;
      _this._tag = "TupleType";
      return _this;
    }
    return TupleType2;
  }(Type)
);
function tuple2(codecs, name) {
  if (name === void 0) {
    name = "[".concat(codecs.map(function(type2) {
      return type2.name;
    }).join(", "), "]");
  }
  var len = codecs.length;
  return new TupleType(name, function(u) {
    return UnknownArray.is(u) && u.length === len && codecs.every(function(type2, i) {
      return type2.is(u[i]);
    });
  }, function(u, c) {
    var e = UnknownArray.validate(u, c);
    if (isLeft2(e)) {
      return e;
    }
    var us = e.right;
    var as3 = us.length > len ? us.slice(0, len) : us;
    var errors = [];
    for (var i = 0; i < len; i++) {
      var a = us[i];
      var type_3 = codecs[i];
      var result = type_3.validate(a, appendContext(c, String(i), type_3, a));
      if (isLeft2(result)) {
        pushAll(errors, result.left);
      } else {
        var va = result.right;
        if (va !== a) {
          if (as3 === us) {
            as3 = us.slice();
          }
          as3[i] = va;
        }
      }
    }
    return errors.length > 0 ? failures(errors) : success(as3);
  }, useIdentity(codecs) ? identity2 : function(a) {
    return codecs.map(function(type2, i) {
      return type2.encode(a[i]);
    });
  }, codecs);
}
var ReadonlyType = (
  /** @class */
  function(_super) {
    __extends(ReadonlyType2, _super);
    function ReadonlyType2(name, is, validate, encode, type2) {
      var _this = _super.call(this, name, is, validate, encode) || this;
      _this.type = type2;
      _this._tag = "ReadonlyType";
      return _this;
    }
    return ReadonlyType2;
  }(Type)
);
function readonly(codec, name) {
  if (name === void 0) {
    name = "Readonly<".concat(codec.name, ">");
  }
  return new ReadonlyType(name, codec.is, codec.validate, codec.encode, codec);
}
var ReadonlyArrayType = (
  /** @class */
  function(_super) {
    __extends(ReadonlyArrayType2, _super);
    function ReadonlyArrayType2(name, is, validate, encode, type2) {
      var _this = _super.call(this, name, is, validate, encode) || this;
      _this.type = type2;
      _this._tag = "ReadonlyArrayType";
      return _this;
    }
    return ReadonlyArrayType2;
  }(Type)
);
function readonlyArray(item, name) {
  if (name === void 0) {
    name = "ReadonlyArray<".concat(item.name, ">");
  }
  var codec = array(item);
  return new ReadonlyArrayType(name, codec.is, codec.validate, codec.encode, item);
}
var strict = function(props, name) {
  return exact(type(props), name);
};
var ExactType = (
  /** @class */
  function(_super) {
    __extends(ExactType2, _super);
    function ExactType2(name, is, validate, encode, type2) {
      var _this = _super.call(this, name, is, validate, encode) || this;
      _this.type = type2;
      _this._tag = "ExactType";
      return _this;
    }
    return ExactType2;
  }(Type)
);
function exact(codec, name) {
  if (name === void 0) {
    name = getExactTypeName(codec);
  }
  var props = getProps(codec);
  return new ExactType(name, codec.is, function(u, c) {
    var e = UnknownRecord.validate(u, c);
    if (isLeft2(e)) {
      return e;
    }
    var ce = codec.validate(u, c);
    if (isLeft2(ce)) {
      return ce;
    }
    return right3(stripKeys(ce.right, props));
  }, function(a) {
    return codec.encode(stripKeys(a, props));
  }, codec);
}
var FunctionType = (
  /** @class */
  function(_super) {
    __extends(FunctionType2, _super);
    function FunctionType2() {
      var _this = _super.call(
        this,
        "Function",
        // tslint:disable-next-line:strict-type-predicates
        function(u) {
          return typeof u === "function";
        },
        function(u, c) {
          return _this.is(u) ? success(u) : failure(u, c);
        },
        identity2
      ) || this;
      _this._tag = "FunctionType";
      return _this;
    }
    return FunctionType2;
  }(Type)
);
var Function = new FunctionType();
var NeverType = (
  /** @class */
  function(_super) {
    __extends(NeverType2, _super);
    function NeverType2() {
      var _this = _super.call(
        this,
        "never",
        function(_) {
          return false;
        },
        function(u, c) {
          return failure(u, c);
        },
        /* istanbul ignore next */
        function() {
          throw new Error("cannot encode never");
        }
      ) || this;
      _this._tag = "NeverType";
      return _this;
    }
    return NeverType2;
  }(Type)
);
var never = new NeverType();
var AnyType = (
  /** @class */
  function(_super) {
    __extends(AnyType2, _super);
    function AnyType2() {
      var _this = _super.call(this, "any", function(_) {
        return true;
      }, success, identity2) || this;
      _this._tag = "AnyType";
      return _this;
    }
    return AnyType2;
  }(Type)
);
var any = new AnyType();
function refinement(codec, predicate, name) {
  if (name === void 0) {
    name = "(".concat(codec.name, " | ").concat(getFunctionName(predicate), ")");
  }
  return new RefinementType(name, function(u) {
    return codec.is(u) && predicate(u);
  }, function(i, c) {
    var e = codec.validate(i, c);
    if (isLeft2(e)) {
      return e;
    }
    var a = e.right;
    return predicate(a) ? success(a) : failure(a, c);
  }, codec.encode, codec, predicate);
}
var Integer = refinement(number, Number.isInteger, "Integer");
var TaggedUnionType = (
  /** @class */
  function(_super) {
    __extends(TaggedUnionType2, _super);
    function TaggedUnionType2(name, is, validate, encode, codecs, tag) {
      var _this = _super.call(this, name, is, validate, encode, codecs) || this;
      _this.tag = tag;
      return _this;
    }
    return TaggedUnionType2;
  }(UnionType)
);
var taggedUnion = function(tag, codecs, name) {
  if (name === void 0) {
    name = getUnionName(codecs);
  }
  var U = union(codecs, name);
  if (U instanceof TaggedUnionType) {
    return U;
  } else {
    console.warn("[io-ts] Cannot build a tagged union for ".concat(name, ", returning a de-optimized union"));
    return new TaggedUnionType(name, U.is, U.validate, U.encode, codecs, tag);
  }
};
var getValidationError = function(value, context) {
  return {
    value,
    context
  };
};
var getDefaultContext = function(decoder) {
  return [
    { key: "", type: decoder }
  ];
};
var Dictionary = UnknownRecord;
var ObjectType = (
  /** @class */
  function(_super) {
    __extends(ObjectType2, _super);
    function ObjectType2() {
      var _this = _super.call(this, "object", function(u) {
        return u !== null && typeof u === "object";
      }, function(u, c) {
        return _this.is(u) ? success(u) : failure(u, c);
      }, identity2) || this;
      _this._tag = "ObjectType";
      return _this;
    }
    return ObjectType2;
  }(Type)
);
var object = new ObjectType();
var dictionary = record;
var StrictType = (
  /** @class */
  function(_super) {
    __extends(StrictType2, _super);
    function StrictType2(name, is, validate, encode, props) {
      var _this = _super.call(this, name, is, validate, encode) || this;
      _this.props = props;
      _this._tag = "StrictType";
      return _this;
    }
    return StrictType2;
  }(Type)
);
function clean(codec) {
  return codec;
}
function alias(codec) {
  return function() {
    return codec;
  };
}
export {
  AnyArrayType,
  AnyDictionaryType,
  AnyType,
  UnknownArray as Array,
  ArrayType,
  BigIntType,
  BooleanType,
  Dictionary,
  DictionaryType,
  ExactType,
  Function,
  FunctionType,
  Int,
  Integer,
  InterfaceType,
  IntersectionType,
  KeyofType,
  LiteralType,
  NeverType,
  NullType,
  NumberType,
  ObjectType,
  PartialType,
  ReadonlyArrayType,
  ReadonlyType,
  RecursiveType,
  RefinementType,
  StrictType,
  StringType,
  TaggedUnionType,
  TupleType,
  Type,
  UndefinedType,
  UnionType,
  UnknownArray,
  UnknownRecord,
  UnknownType,
  VoidType,
  alias,
  any,
  appendContext,
  array,
  bigint,
  boolean,
  brand,
  clean,
  dictionary,
  emptyTags,
  exact,
  failure,
  failures,
  getContextEntry,
  getDefaultContext,
  getDomainKeys,
  getFunctionName,
  getIndex,
  getTags,
  getValidationError,
  identity2 as identity,
  type as interface,
  intersection,
  keyof,
  literal,
  mergeAll,
  never,
  nullType as null,
  nullType,
  number,
  object,
  partial,
  readonly,
  readonlyArray,
  record,
  recursion,
  refinement,
  strict,
  string,
  success,
  taggedUnion,
  tuple2 as tuple,
  type,
  undefinedType as undefined,
  union,
  unknown,
  voidType as void,
  voidType
};
//# sourceMappingURL=io-ts.js.map
