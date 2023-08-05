import {
  Dynamic,
  Portal,
  addEventListener,
  className,
  delegateEvents,
  insert,
  isServer,
  setAttribute,
  spread,
  style,
  template,
  use
} from "./chunk-THXI3NBJ.js";
import {
  $PROXY,
  $TRACK,
  For,
  Show,
  batch,
  children,
  createComponent,
  createComputed,
  createContext,
  createEffect,
  createMemo,
  createRenderEffect,
  createSelector,
  createSignal,
  getListener,
  getOwner,
  mergeProps,
  on,
  onCleanup,
  onMount,
  runWithOwner,
  splitProps,
  useContext
} from "./chunk-GDY77SN5.js";

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/enums.js
var top = "top";
var bottom = "bottom";
var right = "right";
var left = "left";
var auto = "auto";
var basePlacements = [top, bottom, right, left];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getNodeName.js
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getWindow.js
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument3 = node.ownerDocument;
    return ownerDocument3 ? ownerDocument3.defaultView || window : window;
  }
  return node;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/instanceOf.js
function isElement(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/applyStyles.js
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style4 = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style4);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style4 = styleProperties.reduce(function(style5, property) {
        style5[property] = "";
        return style5;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style4);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles_default = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getBasePlacement.js
function getBasePlacement(placement) {
  return placement.split("-")[0];
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/math.js
var max = Math.max;
var min = Math.min;
var round = Math.round;

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/userAgent.js
function getUAString() {
  var uaData = navigator.userAgentData;
  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function(item) {
      return item.brand + "/" + item.version;
    }).join(" ");
  }
  return navigator.userAgent;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js
function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test(getUAString());
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js
function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  if (includeScale && isHTMLElement(element)) {
    scaleX = element.offsetWidth > 0 ? round(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? round(clientRect.height) / element.offsetHeight || 1 : 1;
  }
  var _ref = isElement(element) ? getWindow(element) : window, visualViewport = _ref.visualViewport;
  var addVisualOffsets = !isLayoutViewport() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width,
    height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x,
    y
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width = element.offsetWidth;
  var height = element.offsetHeight;
  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }
  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width,
    height
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/contains.js
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js
function getComputedStyle2(element) {
  return getWindow(element).getComputedStyle(element);
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/isTableElement.js
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js
function getDocumentElement(element) {
  return ((isElement(element) ? element.ownerDocument : (
    // $FlowFixMe[prop-missing]
    element.document
  )) || window.document).documentElement;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getParentNode.js
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || // DOM Element detected
    (isShadowRoot(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    getDocumentElement(element)
  );
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || // https://github.com/popperjs/popper-core/issues/837
  getComputedStyle2(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = /firefox/i.test(getUAString());
  var isIE = /Trident/i.test(getUAString());
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle2(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  if (isShadowRoot(currentNode)) {
    currentNode = currentNode.host;
  }
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css = getComputedStyle2(currentNode);
    if (css.transform !== "none" || css.perspective !== "none" || css.contain === "paint" || ["transform", "perspective"].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === "filter" || isFirefox && css.filter && css.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/within.js
function within(min2, value, max2) {
  return max(min2, min(value, max2));
}
function withinMaxClamp(min2, value, max2) {
  var v = within(min2, value, max2);
  return v > max2 ? max2 : v;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getFreshSideObject.js
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/mergePaddingObject.js
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/expandToHashMap.js
function expandToHashMap(value, keys) {
  return keys.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/arrow.js
var toPaddingObject = function toPaddingObject2(padding, state) {
  padding = typeof padding === "function" ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left, right].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top : left;
  var maxProp = axis === "y" ? bottom : right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect2(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow_default = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect2,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getVariation.js
function getVariation(placement) {
  return placement.split("-")[1];
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/computeStyles.js
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x, y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round(x * dpr) / dpr || 0,
    y: round(y * dpr) / dpr || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets, isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x, x = _offsets$x === void 0 ? 0 : _offsets$x, _offsets$y = offsets.y, y = _offsets$y === void 0 ? 0 : _offsets$y;
  var _ref3 = typeof roundOffsets === "function" ? roundOffsets({
    x,
    y
  }) : {
    x,
    y
  };
  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left;
  var sideY = top;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle2(offsetParent).position !== "static" && position === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top || (placement === left || placement === right) && variation === end) {
      sideY = bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        offsetParent[heightProp]
      );
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left || (placement === top || placement === bottom) && variation === end) {
      sideX = right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        offsetParent[widthProp]
      );
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position
  }, adaptive && unsetSides);
  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x,
    y
  }, getWindow(popper2)) : {
    x,
    y
  };
  x = _ref4.x;
  y = _ref4.y;
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : "", _Object$assign2[sideX] = hasX ? x + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref5) {
  var state = _ref5.state, options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration,
    isFixed: state.options.strategy === "fixed"
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles_default = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/eventListeners.js
var passive = {
  passive: true
};
function effect3(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll2 = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll2) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll2) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners_default = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect3,
  data: {}
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getOppositePlacement.js
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js
var hash2 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash2[matched];
  });
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js
function getViewportRect(element, strategy) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = isLayoutViewport();
    if (layoutViewport || !layoutViewport && strategy === "fixed") {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x + getWindowScrollBarX(element),
    y
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y = -winScroll.scrollTop;
  if (getComputedStyle2(body || html).direction === "rtl") {
    x += max(html.clientWidth, body ? body.clientWidth : 0) - width;
  }
  return {
    width,
    height,
    x,
    y
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle2(element), overflow = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    updatedList.concat(listScrollParents(getParentNode(target)))
  );
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/rectToClientRect.js
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js
function getInnerBoundingClientRect(element, strategy) {
  var rect = getBoundingClientRect(element, false, strategy === "fixed");
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element, strategy)) : isElement(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle2(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/computeOffsets.js
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
      default:
    }
  }
  return offsets;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/detectOverflow.js
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$strategy = _options.strategy, strategy = _options$strategy === void 0 ? state.strategy : _options$strategy, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding !== "number" ? padding : expandToHashMap(padding, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right, bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top, bottom].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements2 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements2.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements2;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a, b) {
    return overflows[a] - overflows[b];
  });
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/flip.js
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = /* @__PURE__ */ new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i = 0; i < placements2.length; i++) {
    var placement = placements2[i];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top, bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? right : left : isStartVariation ? bottom : top;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip_default = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/hide.js
function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow) {
  return [top, right, bottom, left].some(function(side) {
    return overflow[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide_default = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/offset.js
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left, top].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left, right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x = _data$state$placement.x, y = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }
  state.modifiersData[name] = data;
}
var offset_default = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/popperOffsets.js
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets_default = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/getAltAxis.js
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/modifiers/preventOverflow.js
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === "number" ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis) {
    var _offsetModifierState$;
    var mainSide = mainAxis === "y" ? top : left;
    var altSide = mainAxis === "y" ? bottom : right;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min2 = offset2 + overflow[mainSide];
    var max2 = offset2 - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset2 + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset2 + maxOffset - offsetModifierValue;
    var preventedOffset = within(tether ? min(min2, tetherMin) : min2, offset2, tether ? max(max2, tetherMax) : max2);
    popperOffsets2[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset2;
  }
  if (checkAltAxis) {
    var _offsetModifierState$2;
    var _mainSide = mainAxis === "x" ? top : left;
    var _altSide = mainAxis === "x" ? bottom : right;
    var _offset = popperOffsets2[altAxis];
    var _len = altAxis === "y" ? "height" : "width";
    var _min = _offset + overflow[_mainSide];
    var _max = _offset - overflow[_altSide];
    var isOriginSide = [top, left].indexOf(basePlacement) !== -1;
    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;
    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;
    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;
    var _preventedOffset = tether && isOriginSide ? withinMaxClamp(_tetherMin, _offset, _tetherMax) : within(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);
    popperOffsets2[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }
  state.modifiersData[name] = data;
}
var preventOverflow_default = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = round(rect.width) / element.offsetWidth || 1;
  var scaleY = round(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll2 = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
    isScrollParent(documentElement)) {
      scroll2 = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll2.scrollLeft - offsets.x,
    y: rect.top + scroll2.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/orderModifiers.js
function order(modifiers) {
  var map = /* @__PURE__ */ new Map();
  var visited = /* @__PURE__ */ new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/debounce.js
function debounce(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/utils/mergeByName.js
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/createPopper.js
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers3 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions2 = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper5(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions2;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions2),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions2, state.options, options2);
        state.scrollParents = {
          reference: isElement(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers3, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m) {
          return m.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: debounce(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref) {
        var name = _ref.name, _ref$options = _ref.options, options2 = _ref$options === void 0 ? {} : _ref$options, effect4 = _ref.effect;
        if (typeof effect4 === "function") {
          var cleanupFn = effect4({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper = popperGenerator();

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/popper-lite.js
var defaultModifiers = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default];
var createPopper2 = popperGenerator({
  defaultModifiers
});

// node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/lib/popper.js
var defaultModifiers2 = [eventListeners_default, popperOffsets_default, computeStyles_default, applyStyles_default, offset_default, flip_default, preventOverflow_default, arrow_default, hide_default];
var createPopper3 = popperGenerator({
  defaultModifiers: defaultModifiers2
});

// node_modules/.pnpm/solid-react-transition@1.0.11_solid-js@1.7.6/node_modules/solid-react-transition/dist/esm/index.js
var TransitionGroupContext = createContext(null);
var TransitionGroupContext$1 = TransitionGroupContext;
function nextFrame(fn2) {
  requestAnimationFrame(() => {
    requestAnimationFrame(fn2);
  });
}
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
function noop() {
}
var defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
var Transition = (p) => {
  const [local, childProps] = splitProps(mergeProps(defaultProps, p), ["in", "children", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
  let context2 = useContext(TransitionGroupContext$1);
  let childRef;
  let appear = context2 && !context2.isMounting ? local.enter : local.appear;
  let initialStatus;
  let appearStatus = null;
  if (local.in) {
    if (appear) {
      initialStatus = EXITED;
      appearStatus = ENTERING;
    } else {
      initialStatus = ENTERED;
    }
  } else {
    if (local.unmountOnExit || local.mountOnEnter) {
      initialStatus = UNMOUNTED;
    } else {
      initialStatus = EXITED;
    }
  }
  const [status, setStatus] = createSignal(initialStatus);
  let nextCallback = null;
  const [mounted, setMounted] = createSignal(false);
  const notUnmounted = createMemo(() => status() !== UNMOUNTED);
  onMount(() => {
    updateStatus(true, appearStatus);
    setMounted(true);
  });
  const inMemo = createMemo(() => local.in);
  createComputed(on(inMemo, () => {
    if (!mounted())
      return;
    const prevStatus = status();
    if (inMemo() && prevStatus === UNMOUNTED) {
      setStatus(EXITED);
    }
    let nextStatus = null;
    if (inMemo()) {
      if (prevStatus !== ENTERING && prevStatus !== ENTERED) {
        nextStatus = ENTERING;
      }
    } else {
      if (prevStatus === ENTERING || prevStatus === ENTERED) {
        nextStatus = EXITING;
      }
    }
    updateStatus(false, nextStatus ?? EXITED);
  }));
  onCleanup(() => {
    cancelNextCallback();
  });
  function getTimeouts() {
    const {
      timeout
    } = local;
    let exit, enter, appear2;
    if (typeof timeout === "number") {
      exit = enter = appear2 = timeout;
    } else if (timeout != null) {
      exit = timeout.exit;
      enter = timeout.enter;
      appear2 = timeout.appear !== void 0 ? timeout.appear : enter;
    }
    return {
      exit,
      enter,
      appear: appear2
    };
  }
  function updateStatus(mounting = false, nextStatus) {
    if (nextStatus !== null) {
      cancelNextCallback();
      if (nextStatus === ENTERING) {
        performEnter(mounting);
      } else {
        performExit();
      }
    } else if (local.unmountOnExit && status() === EXITED) {
      setStatus(UNMOUNTED);
    }
  }
  function performEnter(mounting) {
    const {
      enter
    } = local;
    const appearing = context2 ? context2.isMounting : mounting;
    const [maybeNode, maybeAppearing] = local.nodeRef ? [appearing] : [childRef, appearing];
    const timeouts = getTimeouts();
    const enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    if (!mounting && !enter) {
      safeSetState(ENTERED, () => {
        local.onEntered(maybeNode);
      });
      return;
    }
    local.onEnter(maybeNode, maybeAppearing);
    nextFrame(() => safeSetState(ENTERING, () => {
      local.onEntering(maybeNode, maybeAppearing);
      onTransitionEnd(enterTimeout, () => {
        safeSetState(ENTERED, () => {
          local.onEntered(maybeNode, maybeAppearing);
        });
      });
    }));
  }
  function performExit() {
    const {
      exit
    } = local;
    const timeouts = getTimeouts();
    const maybeNode = local.nodeRef ? void 0 : childRef;
    if (!exit) {
      safeSetState(EXITED, () => {
        local.onExited(maybeNode);
      });
      return;
    }
    local.onExit(maybeNode);
    nextFrame(() => safeSetState(EXITING, () => {
      local.onExiting(maybeNode);
      onTransitionEnd(timeouts.exit, () => {
        safeSetState(EXITED, () => {
          local.onExited(maybeNode);
        });
        if (local.unmountOnExit) {
          nextFrame(() => {
            setStatus(UNMOUNTED);
          });
        }
      });
    }));
  }
  function cancelNextCallback() {
    if (nextCallback !== null) {
      nextCallback == null ? void 0 : nextCallback.cancel();
      nextCallback = null;
    }
  }
  function safeSetState(nextState, callback) {
    callback = setNextCallback(callback);
    setStatus(nextState);
    callback();
  }
  function setNextCallback(callback) {
    let active = true;
    nextCallback = (...args) => {
      if (active) {
        active = false;
        nextCallback = null;
        callback(...args);
      }
    };
    nextCallback.cancel = () => {
      active = false;
    };
    return nextCallback;
  }
  function onTransitionEnd(timeout, handler) {
    setNextCallback(handler);
    const node = local.nodeRef ? local.nodeRef : childRef;
    const doesNotHaveTimeoutOrListener = timeout == null && !local.addEndListener;
    if (!node || doesNotHaveTimeoutOrListener) {
      nextCallback && setTimeout(nextCallback, 0);
      return;
    }
    if (local.addEndListener) {
      const [maybeNode, maybeNextCallback] = local.nodeRef ? [nextCallback] : [node, nextCallback];
      local.addEndListener(maybeNode, maybeNextCallback);
    }
    if (timeout != null && nextCallback) {
      setTimeout(nextCallback, timeout);
    }
  }
  let resolvedChildren;
  function renderChild() {
    if (!resolvedChildren)
      resolvedChildren = children(() => local.children);
    const c = resolvedChildren();
    return typeof c === "function" ? c(status(), childProps) : c;
  }
  return createComponent(TransitionGroupContext$1.Provider, {
    value: null,
    get children() {
      return createComponent(Show, {
        get when() {
          return notUnmounted();
        },
        get children() {
          return renderChild();
        }
      });
    }
  });
};

// node_modules/.pnpm/solid-bootstrap-core@1.0.13_solid-js@1.7.6/node_modules/solid-bootstrap-core/dist/esm/index.js
function callEventHandler(h, e) {
  let isPropagationStopped = false;
  const defaultFn = e.stopPropagation;
  e.stopPropagation = () => {
    isPropagationStopped = true;
    defaultFn();
  };
  if (typeof h === "function") {
    h(e);
  } else if (Array.isArray(h)) {
    h[0](h[1], e);
  }
  e.stopPropagation = defaultFn;
  return {
    isPropagationStopped
  };
}
function resolveClasses(el, prev, now) {
  var _a, _b;
  const p = prev ? prev.split(" ") : [];
  const n = now ? now.split(" ") : [];
  (_a = el.classList) == null ? void 0 : _a.remove(...p.filter((s) => n.indexOf(s) === -1));
  (_b = el.classList) == null ? void 0 : _b.add(...n.filter((s) => p.indexOf(s) === -1));
}
function isTrivialHref$1(href) {
  return !href || href.trim() === "#";
}
var defaultOptions = {
  tabIndex: 0
};
function useButtonProps(o) {
  const options = mergeProps(defaultOptions, o);
  const tagName = createMemo(() => {
    if (!options.tagName) {
      if (options.href != null || options.target != null || options.rel != null) {
        return "a";
      } else {
        return "button";
      }
    }
    return options.tagName;
  });
  const meta = {
    get tagName() {
      return tagName();
    }
  };
  if (tagName() === "button") {
    return [{
      get type() {
        return options.type || "button";
      },
      get disabled() {
        return options.disabled;
      }
    }, meta];
  }
  const getClickHandler = createMemo(() => (event) => {
    if (options.disabled || tagName() === "a" && isTrivialHref$1(options.href)) {
      event.preventDefault();
    }
    if (options.disabled) {
      event.stopPropagation();
      return;
    }
    callEventHandler(options.onClick, event);
  });
  const getKeyDownHandler = createMemo(() => (event) => {
    if (event.key === " ") {
      event.preventDefault();
      getClickHandler()(
        event
        /*HACK calling click handler with keyboard event*/
      );
    }
  });
  const getHref = () => {
    if (tagName() === "a") {
      return options.disabled ? void 0 : options.href || "#";
    }
    return options.href;
  };
  return [{
    role: "button",
    // explicitly undefined so that it overrides the props disabled in a spread
    // e.g. <Tag {...props} {...hookProps} />
    disabled: void 0,
    get tabIndex() {
      return options.disabled ? void 0 : options.tabIndex;
    },
    get href() {
      return getHref();
    },
    get target() {
      return tagName() === "a" ? options.target : void 0;
    },
    get "aria-disabled"() {
      return !options.disabled ? void 0 : options.disabled;
    },
    get rel() {
      return tagName() === "a" ? options.rel : void 0;
    },
    get onClick() {
      return getClickHandler();
    },
    get onKeyDown() {
      return getKeyDownHandler();
    }
  }, meta];
}
var Button = (props) => {
  const [local, otherProps] = splitProps(props, ["as"]);
  props.tabIndex;
  const [buttonProps, {
    tagName
  }] = useButtonProps({
    tagName: local.as,
    ...otherProps
  });
  return createComponent(Dynamic, mergeProps(otherProps, buttonProps, {
    component: tagName
  }));
};
var Button$1 = Button;
var _tmpl$$1 = template(`<a></a>`, 2);
function isTrivialHref(href) {
  return !href || href.trim() === "#";
}
var Anchor = (props) => {
  const [local, otherProps] = splitProps(props, ["onKeyDown"]);
  const [buttonProps] = useButtonProps(mergeProps({
    tagName: "a"
  }, otherProps));
  const handleKeyDown = (e) => {
    callEventHandler(buttonProps.onKeyDown, e);
    callEventHandler(local.onKeyDown, e);
  };
  return isTrivialHref(props.href) && !props.role || props.role === "button" ? (() => {
    const _el$ = _tmpl$$1.cloneNode(true);
    spread(_el$, mergeProps(otherProps, buttonProps, {
      "onKeyDown": handleKeyDown
    }), false, false);
    return _el$;
  })() : (() => {
    const _el$2 = _tmpl$$1.cloneNode(true);
    spread(_el$2, mergeProps(otherProps, {
      get onKeyDown() {
        return local.onKeyDown;
      }
    }), false, false);
    return _el$2;
  })();
};
var Anchor$1 = Anchor;
var toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
function qsa(element, selector) {
  return toArray(element.querySelectorAll(selector));
}
var canUseDOM = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var optionsSupported = false;
var onceSupported = false;
try {
  options = {
    get passive() {
      return optionsSupported = true;
    },
    get once() {
      return onceSupported = optionsSupported = true;
    }
  };
  if (canUseDOM) {
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, true);
  }
} catch (e) {
}
var options;
function addEventListener2(node, eventName, handler, options) {
  if (options && typeof options !== "boolean" && !onceSupported) {
    var once = options.once, capture = options.capture;
    var wrappedHandler = handler;
    if (!onceSupported && once) {
      wrappedHandler = handler.__once || function onceHandler(event) {
        this.removeEventListener(eventName, onceHandler, capture);
        handler.call(this, event);
      };
      handler.__once = wrappedHandler;
    }
    node.addEventListener(eventName, wrappedHandler, optionsSupported ? options : capture);
  }
  node.addEventListener(eventName, handler, options);
}
var DropdownContext = createContext(null);
var DropdownContext$1 = DropdownContext;
var createPopper4 = popperGenerator({
  defaultModifiers: [hide_default, popperOffsets_default, computeStyles_default, eventListeners_default, offset_default, flip_default, preventOverflow_default, arrow_default]
});
var disabledApplyStylesModifier = {
  name: "applyStyles",
  enabled: false,
  phase: "afterWrite",
  fn: () => void 0
};
var ariaDescribedByModifier = {
  name: "ariaDescribedBy",
  enabled: true,
  phase: "afterWrite",
  effect: ({
    state
  }) => () => {
    const {
      reference: reference2,
      popper: popper2
    } = state.elements;
    if ("removeAttribute" in reference2) {
      const ids = (reference2.getAttribute("aria-describedby") || "").split(",").filter((id) => id.trim() !== popper2.id);
      if (!ids.length)
        reference2.removeAttribute("aria-describedby");
      else
        reference2.setAttribute("aria-describedby", ids.join(","));
    }
  },
  fn: ({
    state
  }) => {
    var _a;
    const {
      popper: popper2,
      reference: reference2
    } = state.elements;
    const role = (_a = popper2.getAttribute("role")) == null ? void 0 : _a.toLowerCase();
    if (popper2.id && role === "tooltip" && "setAttribute" in reference2) {
      const ids = reference2.getAttribute("aria-describedby");
      if (ids && ids.split(",").indexOf(popper2.id) !== -1) {
        return;
      }
      reference2.setAttribute("aria-describedby", ids ? `${ids},${popper2.id}` : popper2.id);
    }
  }
};
var EMPTY_MODIFIERS = [];
function usePopper(referenceElement, popperElement, options) {
  const [popperInstance, setPopperInstance] = createSignal();
  const enabled = createMemo(() => options.enabled ?? true);
  const update = createMemo(on(popperInstance, (popper2) => () => {
    popper2 == null ? void 0 : popper2.update();
  }));
  const forceUpdate = createMemo(on(popperInstance, (popper2) => () => {
    popper2 == null ? void 0 : popper2.forceUpdate();
  }));
  const [popperState, setPopperState] = createSignal({
    placement: options.placement ?? "bottom",
    get update() {
      return update();
    },
    get forceUpdate() {
      return forceUpdate();
    },
    attributes: {},
    styles: {
      popper: {},
      arrow: {}
    }
  });
  const updateModifier = {
    name: "updateStateModifier",
    enabled: true,
    phase: "write",
    requires: ["computeStyles"],
    fn: ({
      state
    }) => {
      const styles = {};
      const attributes = {};
      Object.keys(state.elements).forEach((element) => {
        styles[element] = state.styles[element];
        attributes[element] = state.attributes[element];
      });
      setPopperState((s) => ({
        ...s,
        state,
        styles,
        attributes,
        placement: state.placement
      }));
    }
  };
  createEffect(() => {
    const instance = popperInstance();
    if (!instance || !enabled())
      return;
    instance.setOptions({
      onFirstUpdate: options.onFirstUpdate,
      placement: options.placement ?? "bottom",
      modifiers: [...options.modifiers ?? EMPTY_MODIFIERS, ariaDescribedByModifier, updateModifier, disabledApplyStylesModifier],
      strategy: options.strategy ?? "absolute"
    });
    queueMicrotask(() => {
      update()();
    });
  });
  createEffect(() => {
    const target = referenceElement();
    const popper2 = popperElement();
    if (target && popper2 && enabled()) {
      let instance;
      instance = createPopper4(target, popper2, {});
      setPopperInstance(instance);
    } else {
      if (popperInstance()) {
        popperInstance().destroy();
        setPopperInstance(void 0);
        setPopperState((s) => ({
          ...s,
          attributes: {},
          styles: {
            popper: {}
          }
        }));
      }
    }
  });
  return popperState;
}
function contains2(context2, node) {
  if (context2.contains)
    return context2.contains(node);
  if (context2.compareDocumentPosition)
    return context2 === node || !!(context2.compareDocumentPosition(node) & 16);
}
function removeEventListener(node, eventName, handler, options) {
  var capture = options && typeof options !== "boolean" ? options.capture : options;
  node.removeEventListener(eventName, handler, capture);
  if (handler.__once) {
    node.removeEventListener(eventName, handler.__once, capture);
  }
}
function listen(node, eventName, handler, options) {
  addEventListener2(node, eventName, handler, options);
  return function() {
    removeEventListener(node, eventName, handler, options);
  };
}
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}
var noop$4 = () => {
};
function isLeftClickEvent(event) {
  return event.button === 0;
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
var getRefTarget = (ref) => ref;
function useClickOutside(ref, onClickOutside = noop$4, {
  disabled,
  clickTrigger = "click"
} = {}) {
  const [preventMouseClickOutsideRef, setPreventMouseClickOutsideRef] = createSignal(false);
  const handleMouseCapture = (e) => {
    const currentTarget = getRefTarget(ref());
    setPreventMouseClickOutsideRef(!currentTarget || isModifiedEvent(e) || !isLeftClickEvent(e) || !!contains2(currentTarget, e.target));
  };
  const handleMouse = (e) => {
    if (!preventMouseClickOutsideRef()) {
      onClickOutside(e);
    }
  };
  createEffect(() => {
    if (disabled || ref() == null)
      return void 0;
    const doc = ownerDocument(getRefTarget(ref()));
    let currentEvent = (doc.defaultView || window).event;
    const removeMouseCaptureListener = listen(doc, clickTrigger, handleMouseCapture, true);
    const removeMouseListener = listen(doc, clickTrigger, (e) => {
      if (e === currentEvent) {
        currentEvent = void 0;
        return;
      }
      handleMouse(e);
    });
    let mobileSafariHackListeners = [];
    if ("ontouchstart" in doc.documentElement) {
      mobileSafariHackListeners = [].slice.call(doc.body.children).map((el) => listen(el, "mousemove", noop$4));
    }
    onCleanup(() => {
      removeMouseCaptureListener();
      removeMouseListener();
      mobileSafariHackListeners.forEach((remove) => remove());
    });
  });
}
function toModifierMap(modifiers) {
  const result = {};
  if (!Array.isArray(modifiers)) {
    return modifiers || result;
  }
  modifiers == null ? void 0 : modifiers.forEach((m) => {
    result[m.name] = m;
  });
  return result;
}
function toModifierArray(map = {}) {
  if (Array.isArray(map))
    return map;
  return Object.keys(map).map((k) => {
    map[k].name = k;
    return map[k];
  });
}
function mergeOptionsWithPopperConfig({
  enabled,
  enableEvents,
  placement,
  flip: flip2,
  offset: offset2,
  fixed,
  containerPadding,
  arrowElement,
  popperConfig = {}
}) {
  var _a, _b, _c, _d;
  const modifiers = toModifierMap(popperConfig.modifiers);
  return {
    ...popperConfig,
    placement,
    enabled,
    strategy: fixed ? "fixed" : popperConfig.strategy,
    modifiers: toModifierArray({
      ...modifiers,
      eventListeners: {
        enabled: enableEvents
      },
      preventOverflow: {
        ...modifiers.preventOverflow,
        options: containerPadding ? {
          padding: containerPadding,
          ...(_a = modifiers.preventOverflow) == null ? void 0 : _a.options
        } : (_b = modifiers.preventOverflow) == null ? void 0 : _b.options
      },
      offset: {
        options: {
          offset: offset2,
          ...(_c = modifiers.offset) == null ? void 0 : _c.options
        }
      },
      arrow: {
        ...modifiers.arrow,
        enabled: !!arrowElement,
        options: {
          ...(_d = modifiers.arrow) == null ? void 0 : _d.options,
          element: arrowElement
        }
      },
      flip: {
        enabled: !!flip2,
        ...modifiers.flip
      }
    })
  };
}
var $RAW = Symbol("store-raw");
var $NODE = Symbol("store-node");
var $NAME = Symbol("store-name");
function wrap$1(value, name) {
  let p = value[$PROXY];
  if (!p) {
    Object.defineProperty(value, $PROXY, {
      value: p = new Proxy(value, proxyTraps$1)
    });
    if (!Array.isArray(value)) {
      const keys = Object.keys(value), desc = Object.getOwnPropertyDescriptors(value);
      for (let i = 0, l = keys.length; i < l; i++) {
        const prop = keys[i];
        if (desc[prop].get) {
          const get = desc[prop].get.bind(p);
          Object.defineProperty(value, prop, {
            enumerable: desc[prop].enumerable,
            get
          });
        }
      }
    }
  }
  return p;
}
function isWrappable(obj) {
  let proto;
  return obj != null && typeof obj === "object" && (obj[$PROXY] || !(proto = Object.getPrototypeOf(obj)) || proto === Object.prototype || Array.isArray(obj));
}
function unwrap(item, set = /* @__PURE__ */ new Set()) {
  let result, unwrapped, v, prop;
  if (result = item != null && item[$RAW])
    return result;
  if (!isWrappable(item) || set.has(item))
    return item;
  if (Array.isArray(item)) {
    if (Object.isFrozen(item))
      item = item.slice(0);
    else
      set.add(item);
    for (let i = 0, l = item.length; i < l; i++) {
      v = item[i];
      if ((unwrapped = unwrap(v, set)) !== v)
        item[i] = unwrapped;
    }
  } else {
    if (Object.isFrozen(item))
      item = Object.assign({}, item);
    else
      set.add(item);
    const keys = Object.keys(item), desc = Object.getOwnPropertyDescriptors(item);
    for (let i = 0, l = keys.length; i < l; i++) {
      prop = keys[i];
      if (desc[prop].get)
        continue;
      v = item[prop];
      if ((unwrapped = unwrap(v, set)) !== v)
        item[prop] = unwrapped;
    }
  }
  return item;
}
function getDataNodes(target) {
  let nodes = target[$NODE];
  if (!nodes)
    Object.defineProperty(target, $NODE, {
      value: nodes = {}
    });
  return nodes;
}
function getDataNode(nodes, property, value) {
  return nodes[property] || (nodes[property] = createDataNode(value));
}
function proxyDescriptor$1(target, property) {
  const desc = Reflect.getOwnPropertyDescriptor(target, property);
  if (!desc || desc.get || !desc.configurable || property === $PROXY || property === $NODE || property === $NAME)
    return desc;
  delete desc.value;
  delete desc.writable;
  desc.get = () => target[$PROXY][property];
  return desc;
}
function trackSelf(target) {
  if (getListener()) {
    const nodes = getDataNodes(target);
    (nodes._ || (nodes._ = createDataNode()))();
  }
}
function ownKeys(target) {
  trackSelf(target);
  return Reflect.ownKeys(target);
}
function createDataNode(value) {
  const [s, set] = createSignal(value, {
    equals: false,
    internal: true
  });
  s.$ = set;
  return s;
}
var proxyTraps$1 = {
  get(target, property, receiver) {
    if (property === $RAW)
      return target;
    if (property === $PROXY)
      return receiver;
    if (property === $TRACK) {
      trackSelf(target);
      return receiver;
    }
    const nodes = getDataNodes(target);
    const tracked = nodes.hasOwnProperty(property);
    let value = tracked ? nodes[property]() : target[property];
    if (property === $NODE || property === "__proto__")
      return value;
    if (!tracked) {
      const desc = Object.getOwnPropertyDescriptor(target, property);
      if (getListener() && (typeof value !== "function" || target.hasOwnProperty(property)) && !(desc && desc.get))
        value = getDataNode(nodes, property, value)();
    }
    return isWrappable(value) ? wrap$1(value) : value;
  },
  has(target, property) {
    if (property === $RAW || property === $PROXY || property === $TRACK || property === $NODE || property === "__proto__")
      return true;
    this.get(target, property, target);
    return property in target;
  },
  set() {
    return true;
  },
  deleteProperty() {
    return true;
  },
  ownKeys,
  getOwnPropertyDescriptor: proxyDescriptor$1
};
function setProperty(state, property, value, deleting = false) {
  if (!deleting && state[property] === value)
    return;
  const prev = state[property], len = state.length;
  if (value === void 0)
    delete state[property];
  else
    state[property] = value;
  let nodes = getDataNodes(state), node;
  if (node = getDataNode(nodes, property, prev))
    node.$(() => value);
  if (Array.isArray(state) && state.length !== len)
    (node = getDataNode(nodes, "length", len)) && node.$(state.length);
  (node = nodes._) && node.$();
}
function mergeStoreNode(state, value) {
  const keys = Object.keys(value);
  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    setProperty(state, key, value[key]);
  }
}
function updateArray(current, next) {
  if (typeof next === "function")
    next = next(current);
  next = unwrap(next);
  if (Array.isArray(next)) {
    if (current === next)
      return;
    let i = 0, len = next.length;
    for (; i < len; i++) {
      const value = next[i];
      if (current[i] !== value)
        setProperty(current, i, value);
    }
    setProperty(current, "length", len);
  } else
    mergeStoreNode(current, next);
}
function updatePath(current, path, traversed = []) {
  let part, prev = current;
  if (path.length > 1) {
    part = path.shift();
    const partType = typeof part, isArray = Array.isArray(current);
    if (Array.isArray(part)) {
      for (let i = 0; i < part.length; i++) {
        updatePath(current, [part[i]].concat(path), traversed);
      }
      return;
    } else if (isArray && partType === "function") {
      for (let i = 0; i < current.length; i++) {
        if (part(current[i], i))
          updatePath(current, [i].concat(path), traversed);
      }
      return;
    } else if (isArray && partType === "object") {
      const {
        from = 0,
        to = current.length - 1,
        by = 1
      } = part;
      for (let i = from; i <= to; i += by) {
        updatePath(current, [i].concat(path), traversed);
      }
      return;
    } else if (path.length > 1) {
      updatePath(current[part], path, [part].concat(traversed));
      return;
    }
    prev = current[part];
    traversed = [part].concat(traversed);
  }
  let value = path[0];
  if (typeof value === "function") {
    value = value(prev, traversed);
    if (value === prev)
      return;
  }
  if (part === void 0 && value == void 0)
    return;
  value = unwrap(value);
  if (part === void 0 || isWrappable(prev) && isWrappable(value) && !Array.isArray(value)) {
    mergeStoreNode(prev, value);
  } else
    setProperty(current, part, value);
}
function createStore(...[store, options]) {
  const unwrappedStore = unwrap(store || {});
  const isArray = Array.isArray(unwrappedStore);
  const wrappedStore = wrap$1(unwrappedStore);
  function setStore(...args) {
    batch(() => {
      isArray && args.length === 1 ? updateArray(unwrappedStore, args[0]) : updatePath(unwrappedStore, args);
    });
  }
  return [wrappedStore, setStore];
}
var $ROOT = Symbol("store-root");
function applyState(target, parent, property, merge, key) {
  const previous = parent[property];
  if (target === previous)
    return;
  if (!isWrappable(target) || !isWrappable(previous) || key && target[key] !== previous[key]) {
    if (target !== previous) {
      if (property === $ROOT)
        return target;
      setProperty(parent, property, target);
    }
    return;
  }
  if (Array.isArray(target)) {
    if (target.length && previous.length && (!merge || key && target[0][key] != null)) {
      let i, j, start2, end2, newEnd, item, newIndicesNext, keyVal;
      for (start2 = 0, end2 = Math.min(previous.length, target.length); start2 < end2 && (previous[start2] === target[start2] || key && previous[start2][key] === target[start2][key]); start2++) {
        applyState(target[start2], previous, start2, merge, key);
      }
      const temp = new Array(target.length), newIndices = /* @__PURE__ */ new Map();
      for (end2 = previous.length - 1, newEnd = target.length - 1; end2 >= start2 && newEnd >= start2 && (previous[end2] === target[newEnd] || key && previous[end2][key] === target[newEnd][key]); end2--, newEnd--) {
        temp[newEnd] = previous[end2];
      }
      if (start2 > newEnd || start2 > end2) {
        for (j = start2; j <= newEnd; j++)
          setProperty(previous, j, target[j]);
        for (; j < target.length; j++) {
          setProperty(previous, j, temp[j]);
          applyState(target[j], previous, j, merge, key);
        }
        if (previous.length > target.length)
          setProperty(previous, "length", target.length);
        return;
      }
      newIndicesNext = new Array(newEnd + 1);
      for (j = newEnd; j >= start2; j--) {
        item = target[j];
        keyVal = key ? item[key] : item;
        i = newIndices.get(keyVal);
        newIndicesNext[j] = i === void 0 ? -1 : i;
        newIndices.set(keyVal, j);
      }
      for (i = start2; i <= end2; i++) {
        item = previous[i];
        keyVal = key ? item[key] : item;
        j = newIndices.get(keyVal);
        if (j !== void 0 && j !== -1) {
          temp[j] = previous[i];
          j = newIndicesNext[j];
          newIndices.set(keyVal, j);
        }
      }
      for (j = start2; j < target.length; j++) {
        if (j in temp) {
          setProperty(previous, j, temp[j]);
          applyState(target[j], previous, j, merge, key);
        } else
          setProperty(previous, j, target[j]);
      }
    } else {
      for (let i = 0, len = target.length; i < len; i++) {
        applyState(target[i], previous, i, merge, key);
      }
    }
    if (previous.length > target.length)
      setProperty(previous, "length", target.length);
    return;
  }
  const targetKeys = Object.keys(target);
  for (let i = 0, len = targetKeys.length; i < len; i++) {
    applyState(target[targetKeys[i]], previous, targetKeys[i], merge, key);
  }
  const previousKeys = Object.keys(previous);
  for (let i = 0, len = previousKeys.length; i < len; i++) {
    if (target[previousKeys[i]] === void 0)
      setProperty(previous, previousKeys[i], void 0);
  }
}
function reconcile(value, options = {}) {
  const {
    merge,
    key = "id"
  } = options, v = unwrap(value);
  return (state) => {
    if (!isWrappable(state) || !isWrappable(v))
      return v;
    const res = applyState(v, {
      [$ROOT]: state
    }, $ROOT, merge, key);
    return res === void 0 ? state : res;
  };
}
var noop$3 = () => {
};
function useDropdownMenu(o = {}) {
  var _a;
  const context2 = useContext(DropdownContext$1);
  const [arrowElement, attachArrowRef] = createSignal();
  const [hasShownRef, setHasShownRef] = createSignal(false);
  const [popperOptions, setPopperOptions] = createStore({});
  const options = mergeProps({
    fixed: false,
    popperConfig: {},
    usePopper: !!context2
  }, o);
  const show = createMemo(() => {
    return (context2 == null ? void 0 : context2.show) == null ? !!options.show : context2.show;
  });
  createEffect(() => {
    if (show() && !hasShownRef()) {
      setHasShownRef(true);
    }
  });
  createComputed(() => {
    setPopperOptions(reconcile(mergeOptionsWithPopperConfig({
      placement: options.placement || (context2 == null ? void 0 : context2.placement) || "bottom-start",
      enabled: options.usePopper ?? !!context2,
      enableEvents: options.enableEventListeners == null ? show() : options.enableEventListeners,
      offset: options.offset,
      flip: options.flip,
      fixed: options.fixed,
      arrowElement: arrowElement(),
      popperConfig: options.popperConfig
    })));
  });
  const handleClose = (e) => {
    context2 == null ? void 0 : context2.toggle(false, e);
  };
  const popper2 = usePopper(() => context2 == null ? void 0 : context2.toggleElement, () => context2 == null ? void 0 : context2.menuElement, popperOptions);
  createEffect(() => {
    if (context2 == null ? void 0 : context2.menuElement) {
      useClickOutside(() => context2.menuElement, handleClose, {
        get clickTrigger() {
          return options.rootCloseEvent;
        },
        get disabled() {
          return !show();
        }
      });
    }
  });
  const menuProps = mergeProps({
    get ref() {
      return (context2 == null ? void 0 : context2.setMenu) || noop$3;
    },
    get style() {
      var _a2;
      return (_a2 = popper2()) == null ? void 0 : _a2.styles.popper;
    },
    get "aria-labelledby"() {
      var _a2;
      return (_a2 = context2 == null ? void 0 : context2.toggleElement) == null ? void 0 : _a2.id;
    }
  }, ((_a = popper2()) == null ? void 0 : _a.attributes.popper) ?? {});
  const metadata = {
    get show() {
      return show();
    },
    get placement() {
      return context2 == null ? void 0 : context2.placement;
    },
    get hasShown() {
      return hasShownRef();
    },
    get toggle() {
      return context2 == null ? void 0 : context2.toggle;
    },
    get popper() {
      return options.usePopper ? popper2() : null;
    },
    get arrowProps() {
      var _a2, _b;
      return options.usePopper ? {
        ref: attachArrowRef,
        ...(_a2 = popper2()) == null ? void 0 : _a2.attributes.arrow,
        style: (_b = popper2()) == null ? void 0 : _b.styles.arrow
      } : {};
    }
  };
  return [menuProps, metadata];
}
function DropdownMenu(p) {
  const [local, options] = splitProps(p, ["children"]);
  const [props, meta] = useDropdownMenu(options);
  return createMemo(() => local.children(props, meta));
}
var currentId = 0;
function useSSRSafeId(defaultId) {
  return defaultId || `solid-aria-${++currentId}`;
}
var isRoleMenu = (el) => {
  var _a;
  return ((_a = el.getAttribute("role")) == null ? void 0 : _a.toLowerCase()) === "menu";
};
var noop$2 = () => {
};
function useDropdownToggle() {
  const id = useSSRSafeId();
  const context2 = useContext(DropdownContext$1);
  const handleClick = (e) => {
    context2.toggle(!context2.show, e);
  };
  return [{
    id,
    get ref() {
      return context2.setToggle || noop$2;
    },
    onClick: handleClick,
    get "aria-expanded"() {
      return !!context2.show;
    },
    get "aria-haspopup"() {
      return context2.menuElement && isRoleMenu(context2.menuElement) ? true : void 0;
    }
  }, {
    get show() {
      return context2.show;
    },
    get toggle() {
      return context2.toggle;
    }
  }];
}
function DropdownToggle({
  children: children2
}) {
  const [props, meta] = useDropdownToggle();
  return createMemo(() => children2(props, meta));
}
var SelectableContext = createContext(null);
var makeEventKey = (eventKey, href = null) => {
  if (eventKey != null)
    return String(eventKey);
  return href || null;
};
var SelectableContext$1 = SelectableContext;
var NavContext = createContext(null);
var NavContext$1 = NavContext;
var ATTRIBUTE_PREFIX = `data-rr-ui-`;
var PROPERTY_PREFIX = `rrUi`;
function dataAttr(property) {
  return `${ATTRIBUTE_PREFIX}${property}`;
}
function dataProp(property) {
  return `${PROPERTY_PREFIX}${property}`;
}
function useDropdownItem(options) {
  const onSelectCtx = useContext(SelectableContext$1);
  const navContext = useContext(NavContext$1);
  const {
    activeKey
  } = navContext || {};
  const eventKey = makeEventKey(options.key, options.href);
  const isActive = createMemo(() => options.active == null && options.key != null ? makeEventKey(activeKey) === eventKey : options.active);
  const handleClick = (event) => {
    if (options.disabled)
      return;
    let result = callEventHandler(options.onClick, event);
    if (onSelectCtx && !result.isPropagationStopped) {
      onSelectCtx(eventKey, event);
    }
  };
  return [{
    onClick: handleClick,
    get "aria-disabled"() {
      return options.disabled || void 0;
    },
    get "aria-selected"() {
      return isActive();
    },
    [dataAttr("dropdown-item")]: ""
  }, {
    get isActive() {
      return isActive();
    }
  }];
}
var DropdownItem = (p) => {
  const [local, props] = splitProps(
    // merge in prop defaults
    mergeProps({
      as: Button$1
    }, p),
    // split off local props with rest passed to Dynamic
    ["eventKey", "disabled", "onClick", "active", "as"]
  );
  const [dropdownItemProps] = useDropdownItem({
    get key() {
      return local.eventKey;
    },
    get href() {
      return props.href;
    },
    get disabled() {
      return local.disabled;
    },
    get onClick() {
      return local.onClick;
    },
    get active() {
      return local.active;
    }
  });
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, dropdownItemProps));
};
var DropdownItem$1 = DropdownItem;
var Context = createContext(canUseDOM ? window : void 0);
Context.Provider;
function useWindow() {
  return useContext(Context);
}
function createControlledProp(propValue, defaultValue, handler) {
  const [stateValue, setState] = createSignal(defaultValue());
  const isControlled = createMemo(() => propValue() !== void 0);
  createComputed(on(isControlled, (is, was) => {
    if (!is && was && stateValue() !== defaultValue()) {
      setState(() => defaultValue());
    }
  }));
  const getValue = () => isControlled() ? propValue() : stateValue();
  const setValue = (value, ...args) => {
    if (handler)
      handler(value, ...args);
    setState(() => value);
  };
  return [getValue, setValue];
}
function Dropdown(p) {
  const props = mergeProps({
    itemSelector: `* [${dataAttr("dropdown-item")}]`,
    placement: "bottom-start"
  }, p);
  const window2 = useWindow();
  const [show, onToggle] = createControlledProp(() => props.show, () => props.defaultShow, props.onToggle);
  const [menuRef, setMenu] = createSignal();
  const [toggleRef, setToggle] = createSignal();
  const [lastSourceEvent, setLastSourceEvent] = createSignal(null);
  const onSelectCtx = useContext(SelectableContext$1);
  const focusInDropdown = () => {
    var _a;
    return (_a = menuRef()) == null ? void 0 : _a.contains(menuRef().ownerDocument.activeElement);
  };
  const toggle = (nextShow, event, source = event == null ? void 0 : event.type) => {
    onToggle(nextShow, {
      originalEvent: event,
      source
    });
  };
  const handleSelect = (key, event) => {
    let result = callEventHandler((event2) => {
      var _a;
      (_a = props.onSelect) == null ? void 0 : _a.call(props, key, event2);
      toggle(false, event2, "select");
    }, event);
    if (!result.isPropagationStopped) {
      onSelectCtx == null ? void 0 : onSelectCtx(key, event);
    }
  };
  const context2 = {
    toggle,
    setMenu,
    setToggle,
    get placement() {
      return props.placement;
    },
    get show() {
      return show();
    },
    get menuElement() {
      return menuRef();
    },
    get toggleElement() {
      return toggleRef();
    }
  };
  const focusToggle = () => {
    const ref = toggleRef();
    if (ref && ref.focus) {
      ref.focus();
    }
  };
  const maybeFocusFirst = () => {
    const type = lastSourceEvent();
    setLastSourceEvent(null);
    let focusType = props.focusFirstItemOnShow;
    if (focusType == null) {
      focusType = menuRef() && isRoleMenu(menuRef()) ? "keyboard" : false;
    }
    if (focusType === false || focusType === "keyboard" && !/^key.+$/.test(type)) {
      return;
    }
    const first = qsa(menuRef(), props.itemSelector)[0];
    if (first && first.focus)
      first.focus();
  };
  createEffect(() => {
    if (show()) {
      maybeFocusFirst();
    } else if (focusInDropdown()) {
      focusToggle();
    }
  });
  const getNextFocusedChild = (current, offset2) => {
    if (!menuRef())
      return null;
    const items = qsa(menuRef(), props.itemSelector);
    let index = items.indexOf(current) + offset2;
    index = Math.max(0, Math.min(index, items.length));
    return items[index];
  };
  const keydownHandler = (event) => {
    var _a, _b;
    const {
      key
    } = event;
    const target = event.target;
    const fromMenu = (_a = menuRef()) == null ? void 0 : _a.contains(target);
    const fromToggle = (_b = toggleRef()) == null ? void 0 : _b.contains(target);
    const isInput = /input|textarea/i.test(target.tagName);
    if (isInput && (key === " " || key !== "Escape" && fromMenu || key === "Escape" && target.type === "search")) {
      return;
    }
    if (!fromMenu && !fromToggle) {
      return;
    }
    if (key === "Tab" && (!menuRef() || !show)) {
      return;
    }
    setLastSourceEvent(event.type);
    const meta = {
      originalEvent: event,
      source: event.type
    };
    switch (key) {
      case "ArrowUp": {
        const next = getNextFocusedChild(target, -1);
        if (next && next.focus)
          next.focus();
        event.preventDefault();
        return;
      }
      case "ArrowDown":
        event.preventDefault();
        if (!show) {
          onToggle(true, meta);
        } else {
          const next = getNextFocusedChild(target, 1);
          if (next && next.focus)
            next.focus();
        }
        return;
      case "Tab":
        if (!isServer) {
          addEventListener2(target.ownerDocument, "keyup", (e) => {
            var _a2;
            if (e.key === "Tab" && !e.target || !((_a2 = menuRef()) == null ? void 0 : _a2.contains(e.target))) {
              onToggle(false, meta);
            }
          }, {
            once: true
          });
        }
        break;
      case "Escape":
        if (key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
        }
        onToggle(false, meta);
        focusToggle();
        break;
    }
  };
  if (!isServer) {
    window2.document.addEventListener("keydown", keydownHandler);
    onCleanup(() => window2.document.removeEventListener("keydown", keydownHandler));
  }
  return createComponent(SelectableContext$1.Provider, {
    value: handleSelect,
    get children() {
      return createComponent(DropdownContext$1.Provider, {
        value: context2,
        get children() {
          return props.children;
        }
      });
    }
  });
}
Dropdown.Menu = DropdownMenu;
Dropdown.Toggle = DropdownToggle;
Dropdown.Item = DropdownItem$1;
function activeElement(doc) {
  if (doc === void 0) {
    doc = ownerDocument();
  }
  try {
    var active = doc.activeElement;
    if (!active || !active.nodeName)
      return null;
    return active;
  } catch (e) {
    return doc.body;
  }
}
function ownerWindow(node) {
  var doc = ownerDocument(node);
  return doc && doc.defaultView || window;
}
function getComputedStyle3(node, psuedoElement) {
  return ownerWindow(node).getComputedStyle(node, psuedoElement);
}
var rUpper = /([A-Z])/g;
function hyphenate(string) {
  return string.replace(rUpper, "-$1").toLowerCase();
}
var msPattern = /^ms-/;
function hyphenateStyleName(string) {
  return hyphenate(string).replace(msPattern, "-ms-");
}
var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function isTransform(value) {
  return !!(value && supportedTransforms.test(value));
}
function style2(node, property) {
  var css = "";
  var transforms = "";
  if (typeof property === "string") {
    return node.style.getPropertyValue(hyphenateStyleName(property)) || getComputedStyle3(node).getPropertyValue(hyphenateStyleName(property));
  }
  Object.keys(property).forEach(function(key) {
    var value = property[key];
    if (!value && value !== 0) {
      node.style.removeProperty(hyphenateStyleName(key));
    } else if (isTransform(key)) {
      transforms += key + "(" + value + ") ";
    } else {
      css += hyphenateStyleName(key) + ": " + value + ";";
    }
  });
  if (transforms) {
    css += "transform: " + transforms + ";";
  }
  node.style.cssText += ";" + css;
}
function getBodyScrollbarWidth(ownerDocument3 = document) {
  const window2 = ownerDocument3.defaultView;
  return Math.abs(window2.innerWidth - ownerDocument3.documentElement.clientWidth);
}
var OPEN_DATA_ATTRIBUTE = dataAttr("modal-open");
var ModalManager = class {
  constructor({
    ownerDocument: ownerDocument3,
    handleContainerOverflow = true,
    isRTL = false
  } = {}) {
    this.handleContainerOverflow = handleContainerOverflow;
    this.isRTL = isRTL;
    this.modals = [];
    this.ownerDocument = ownerDocument3;
  }
  getScrollbarWidth() {
    return getBodyScrollbarWidth(this.ownerDocument);
  }
  getElement() {
    return (this.ownerDocument || document).body;
  }
  setModalAttributes(_modal) {
  }
  removeModalAttributes(_modal) {
  }
  setContainerStyle(containerState) {
    const style$1 = {
      overflow: "hidden"
    };
    const paddingProp = this.isRTL ? "paddingLeft" : "paddingRight";
    const container = this.getElement();
    containerState.style = {
      overflow: container.style.overflow,
      [paddingProp]: container.style[paddingProp]
    };
    if (containerState.scrollBarWidth) {
      style$1[paddingProp] = `${parseInt(style2(container, paddingProp) || "0", 10) + containerState.scrollBarWidth}px`;
    }
    container.setAttribute(OPEN_DATA_ATTRIBUTE, "");
    style2(container, style$1);
  }
  reset() {
    [...this.modals].forEach((m) => this.remove(m));
  }
  removeContainerStyle(containerState) {
    const container = this.getElement();
    container.removeAttribute(OPEN_DATA_ATTRIBUTE);
    Object.assign(container.style, containerState.style);
  }
  add(modal) {
    let modalIdx = this.modals.indexOf(modal);
    if (modalIdx !== -1) {
      return modalIdx;
    }
    modalIdx = this.modals.length;
    this.modals.push(modal);
    this.setModalAttributes(modal);
    if (modalIdx !== 0) {
      return modalIdx;
    }
    this.state = {
      scrollBarWidth: this.getScrollbarWidth(),
      style: {}
    };
    if (this.handleContainerOverflow) {
      this.setContainerStyle(this.state);
    }
    return modalIdx;
  }
  remove(modal) {
    const modalIdx = this.modals.indexOf(modal);
    if (modalIdx === -1) {
      return;
    }
    this.modals.splice(modalIdx, 1);
    if (!this.modals.length && this.handleContainerOverflow) {
      this.removeContainerStyle(this.state);
    }
    this.removeModalAttributes(modal);
  }
  isTopModal(modal) {
    return !!this.modals.length && this.modals[this.modals.length - 1] === modal;
  }
};
var ModalManager$1 = ModalManager;
var resolveContainerRef = (ref, document2) => {
  if (!canUseDOM)
    return null;
  if (ref == null)
    return (document2 || ownerDocument()).body;
  if (typeof ref === "function")
    ref = ref();
  if (ref == null ? void 0 : ref.nodeType)
    return ref || null;
  return null;
};
function useWaitForDOMRef(props) {
  const window2 = useWindow();
  const [resolvedRef, setRef] = createSignal(resolveContainerRef(props.ref, window2 == null ? void 0 : window2.document));
  createEffect(() => {
    if (props.onResolved && resolvedRef()) {
      props.onResolved(resolvedRef());
    }
  });
  createEffect(() => {
    const nextRef = resolveContainerRef(props.ref);
    if (nextRef !== resolvedRef()) {
      setRef(nextRef);
    }
  });
  return resolvedRef;
}
var _tmpl$ = template(`<div></div>`, 2);
var manager;
function getManager(window2) {
  if (!manager)
    manager = new ModalManager$1({
      ownerDocument: window2 == null ? void 0 : window2.document
    });
  return manager;
}
function useModalManager(provided) {
  const window2 = useWindow();
  const modalManager = provided || getManager(window2);
  const modal = {
    dialog: null,
    backdrop: null
  };
  return Object.assign(modal, {
    add: () => modalManager.add(modal),
    remove: () => modalManager.remove(modal),
    isTopModal: () => modalManager.isTopModal(modal),
    setDialogRef: (ref) => {
      modal.dialog = ref;
    },
    setBackdropRef: (ref) => {
      modal.backdrop = ref;
    }
  });
}
var defaultProps$3 = {
  show: false,
  role: "dialog",
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  renderBackdrop: (props) => (() => {
    const _el$ = _tmpl$.cloneNode(true);
    spread(_el$, props, false, false);
    return _el$;
  })(),
  onHide: () => {
  }
};
var Modal = (p) => {
  var _a;
  const [local, props] = splitProps(
    mergeProps(defaultProps$3, p),
    // split off local props with rest passed as dialogProps
    ["show", "role", "class", "style", "children", "backdrop", "keyboard", "onBackdropClick", "onEscapeKeyDown", "transition", "backdropTransition", "autoFocus", "enforceFocus", "restoreFocus", "restoreFocusOptions", "renderDialog", "renderBackdrop", "manager", "container", "onShow", "onHide", "onExit", "onExited", "onExiting", "onEnter", "onEntering", "onEntered", "ref"]
  );
  const container = useWaitForDOMRef({
    get ref() {
      return local.container;
    }
  });
  const modal = useModalManager(local.manager);
  const owner = getOwner();
  const [isMounted, setIsMounted] = createSignal(false);
  onMount(() => setIsMounted(true));
  onCleanup(() => setIsMounted(false));
  const [exited, setExited] = createSignal(!local.show);
  let lastFocusRef = null;
  (_a = local.ref) == null ? void 0 : _a.call(local, modal);
  createComputed(on(() => local.show, (show, prevShow) => {
    if (canUseDOM && !prevShow && show) {
      lastFocusRef = activeElement();
    }
  }));
  createComputed(() => {
    if (!local.transition && !local.show && !exited()) {
      setExited(true);
    } else if (local.show && exited()) {
      setExited(false);
    }
  });
  const handleShow = () => {
    modal.add();
    removeKeydownListenerRef = listen(document, "keydown", handleDocumentKeyDown);
    removeFocusListenerRef = listen(
      document,
      "focus",
      // the timeout is necessary b/c this will run before the new modal is mounted
      // and so steals focus from it
      () => setTimeout(handleEnforceFocus),
      true
    );
    if (local.onShow) {
      local.onShow();
    }
    if (local.autoFocus) {
      const currentActiveElement = activeElement(document);
      if (modal.dialog && currentActiveElement && !contains2(modal.dialog, currentActiveElement)) {
        lastFocusRef = currentActiveElement;
        modal.dialog.focus();
      }
    }
  };
  const handleHide = () => {
    var _a2;
    modal.remove();
    removeKeydownListenerRef == null ? void 0 : removeKeydownListenerRef();
    removeFocusListenerRef == null ? void 0 : removeFocusListenerRef();
    if (local.restoreFocus) {
      (_a2 = lastFocusRef == null ? void 0 : lastFocusRef.focus) == null ? void 0 : _a2.call(lastFocusRef, local.restoreFocusOptions);
      lastFocusRef = null;
    }
  };
  createEffect(() => {
    if (!local.show || !(container == null ? void 0 : container()))
      return;
    handleShow();
  });
  createEffect(on(exited, (exited2, prev) => {
    if (exited2 && !(prev ?? exited2)) {
      handleHide();
    }
  }));
  onCleanup(() => {
    handleHide();
  });
  const handleEnforceFocus = () => {
    if (!local.enforceFocus || !isMounted() || !modal.isTopModal()) {
      return;
    }
    const currentActiveElement = activeElement();
    if (modal.dialog && currentActiveElement && !contains2(modal.dialog, currentActiveElement)) {
      modal.dialog.focus();
    }
  };
  const handleBackdropClick = (e) => {
    var _a2, _b;
    if (e.target !== e.currentTarget) {
      return;
    }
    (_a2 = local.onBackdropClick) == null ? void 0 : _a2.call(local, e);
    if (local.backdrop === true) {
      (_b = local.onHide) == null ? void 0 : _b.call(local);
    }
  };
  const handleDocumentKeyDown = (e) => {
    var _a2, _b;
    if (local.keyboard && e.keyCode === 27 && modal.isTopModal()) {
      (_a2 = local.onEscapeKeyDown) == null ? void 0 : _a2.call(local, e);
      if (!e.defaultPrevented) {
        (_b = local.onHide) == null ? void 0 : _b.call(local);
      }
    }
  };
  let removeFocusListenerRef;
  let removeKeydownListenerRef;
  const handleHidden = (...args) => {
    var _a2;
    setExited(true);
    (_a2 = local.onExited) == null ? void 0 : _a2.call(local, ...args);
  };
  const dialogVisible = createMemo(() => !!(local.show || local.transition && !exited()));
  const dialogProps = mergeProps({
    get role() {
      return local.role;
    },
    get ref() {
      return modal.setDialogRef;
    },
    // apparently only works on the dialog role element
    get "aria-modal"() {
      return local.role === "dialog" ? true : void 0;
    }
  }, props, {
    get style() {
      return local.style;
    },
    get class() {
      return local.class;
    },
    tabIndex: -1
  });
  const getChildAsDocument = () => {
    var _a2, _b;
    const c = children(() => local.children);
    (_b = (_a2 = c()) == null ? void 0 : _a2.setAttribute) == null ? void 0 : _b.call(_a2, "role", "document");
    return c;
  };
  let innerDialog = () => runWithOwner(owner, () => local.renderDialog ? local.renderDialog(dialogProps) : (() => {
    const _el$2 = _tmpl$.cloneNode(true);
    spread(_el$2, dialogProps, false, true);
    insert(_el$2, getChildAsDocument);
    return _el$2;
  })());
  const Dialog = () => {
    const Transition2 = local.transition;
    return !Transition2 ? innerDialog : createComponent(Transition2, {
      appear: true,
      unmountOnExit: true,
      get ["in"]() {
        return !!local.show;
      },
      get onExit() {
        return local.onExit;
      },
      get onExiting() {
        return local.onExiting;
      },
      onExited: handleHidden,
      get onEnter() {
        return local.onEnter;
      },
      get onEntering() {
        return local.onEntering;
      },
      get onEntered() {
        return local.onEntered;
      },
      children: innerDialog
    });
  };
  const Backdrop = () => {
    let backdropElement = null;
    if (local.backdrop) {
      const BackdropTransition2 = local.backdropTransition;
      backdropElement = local.renderBackdrop({
        ref: modal.setBackdropRef,
        onClick: handleBackdropClick
      });
      if (BackdropTransition2) {
        backdropElement = createComponent(BackdropTransition2, {
          appear: true,
          get ["in"]() {
            return !!local.show;
          },
          children: backdropElement
        });
      }
    }
    return backdropElement;
  };
  return createComponent(Show, {
    get when() {
      return createMemo(() => !!container())() && dialogVisible();
    },
    get children() {
      return createComponent(Portal, {
        get mount() {
          return container();
        },
        get children() {
          return [createComponent(Backdrop, {}), createComponent(Dialog, {})];
        }
      });
    }
  });
};
var Modal$1 = Object.assign(Modal, {
  Manager: ModalManager$1
});
var TabContext = createContext(null);
var TabContext$1 = TabContext;
function useNavItem(options) {
  const parentOnSelect = useContext(SelectableContext$1);
  const navContext = useContext(NavContext$1);
  const tabContext = useContext(TabContext$1);
  const isActive = createMemo(() => options.active == null && options.key != null ? (navContext == null ? void 0 : navContext.activeKey) === options.key : options.active);
  const role = createMemo(() => navContext && !options.role && navContext.role === "tablist" ? "tab" : options.role);
  const onClick = createMemo(() => (e) => {
    if (options.disabled)
      return;
    let result = callEventHandler(options.onClick, e);
    if (options.key == null) {
      return;
    }
    if (parentOnSelect && !result.isPropagationStopped) {
      parentOnSelect(options.key, e);
    }
  });
  const props = {
    get role() {
      return role();
    },
    get [dataAttr("event-key")]() {
      return navContext ? options.key : void 0;
    },
    get id() {
      return navContext ? navContext.getControllerId(options.key) : void 0;
    },
    get tabIndex() {
      return role() === "tab" && (options.disabled || !isActive()) ? -1 : void 0;
    },
    get ["aria-controls"]() {
      return isActive() || !(tabContext == null ? void 0 : tabContext.unmountOnExit) && !(tabContext == null ? void 0 : tabContext.mountOnEnter) ? navContext ? navContext.getControlledId(options.key) : void 0 : void 0;
    },
    get ["aria-disabled"]() {
      return role() === "tab" && options.disabled ? true : void 0;
    },
    get ["aria-selected"]() {
      return role() === "tab" && isActive() ? true : void 0;
    },
    get onClick() {
      return onClick();
    }
  };
  const meta = {
    get isActive() {
      return isActive();
    }
  };
  return [props, meta];
}
var defaultProps$2 = {
  as: Button$1
};
var NavItem = (p) => {
  const [local, options] = splitProps(mergeProps(defaultProps$2, p), ["as", "active", "eventKey"]);
  const [props, meta] = useNavItem(mergeProps({
    get active() {
      return p.active;
    },
    get key() {
      return makeEventKey(p.eventKey, p.href);
    }
  }, options));
  props[dataAttr("active")] = meta.isActive;
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, options, props));
};
var NavItem$1 = NavItem;
var noop$1 = (e) => "";
var EVENT_KEY_ATTR = dataAttr("event-key");
var defaultProps$1 = {
  as: "div"
};
var Nav = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$1, p), ["as", "onSelect", "activeKey", "role", "onKeyDown"]);
  const [needsRefocusRef, setNeedsRefocusRef] = createSignal(false);
  const [listNode, setListNode] = createSignal(null);
  const parentOnSelect = useContext(SelectableContext$1);
  const tabContext = useContext(TabContext$1);
  const getNextActiveTab = (offset2) => {
    const currentListNode = listNode();
    if (!currentListNode)
      return null;
    const items = qsa(currentListNode, `[${EVENT_KEY_ATTR}]:not([aria-disabled=true])`);
    const activeChild = currentListNode.querySelector("[aria-selected=true]");
    if (!activeChild || activeChild !== document.activeElement)
      return null;
    const index = items.indexOf(activeChild);
    if (index === -1)
      return null;
    let nextIndex = index + offset2;
    if (nextIndex >= items.length)
      nextIndex = 0;
    if (nextIndex < 0)
      nextIndex = items.length - 1;
    return items[nextIndex];
  };
  const handleSelect = (key, event) => {
    var _a;
    if (key == null)
      return;
    (_a = local.onSelect) == null ? void 0 : _a.call(local, key, event);
    parentOnSelect == null ? void 0 : parentOnSelect(key, event);
  };
  const handleKeyDown = (event) => {
    callEventHandler(local.onKeyDown, event);
    if (!tabContext) {
      return;
    }
    let nextActiveChild;
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        nextActiveChild = getNextActiveTab(-1);
        break;
      case "ArrowRight":
      case "ArrowDown":
        nextActiveChild = getNextActiveTab(1);
        break;
      default:
        return;
    }
    if (!nextActiveChild)
      return;
    event.preventDefault();
    handleSelect(nextActiveChild.dataset[dataProp("EventKey")] || null, event);
    setNeedsRefocusRef(true);
  };
  createEffect(() => {
    if (listNode() && needsRefocusRef()) {
      const activeChild = listNode().querySelector(`[${EVENT_KEY_ATTR}][aria-selected=true]`);
      activeChild == null ? void 0 : activeChild.focus();
    }
    setNeedsRefocusRef(false);
  });
  const mergedRef = (r) => {
    setListNode(r);
    if (typeof props.ref === "function") {
      props.ref(r);
    }
  };
  const activeKey = () => makeEventKey((tabContext == null ? void 0 : tabContext.activeKey) ?? local.activeKey);
  const getRole = () => {
    return local.role || (tabContext ? "tablist" : void 0);
  };
  return createComponent(SelectableContext$1.Provider, {
    value: handleSelect,
    get children() {
      return createComponent(NavContext$1.Provider, {
        value: {
          get role() {
            return getRole();
          },
          // used by NavLink to determine it's role
          get activeKey() {
            return activeKey();
          },
          get getControlledId() {
            return (tabContext == null ? void 0 : tabContext.getControlledId) || noop$1;
          },
          get getControllerId() {
            return (tabContext == null ? void 0 : tabContext.getControllerId) || noop$1;
          }
        },
        get children() {
          return createComponent(Dynamic, mergeProps({
            get component() {
              return local.as;
            },
            get ["data-active-key"]() {
              return activeKey();
            }
          }, props, {
            onKeyDown: handleKeyDown,
            ref: mergedRef,
            get role() {
              return getRole();
            }
          }));
        }
      });
    }
  });
};
var Nav$1 = Object.assign(Nav, {
  Item: NavItem$1
});
var NoopTransition = (props) => {
  const resolvedChildren = children(() => props.children);
  const callChild = () => {
    const c = resolvedChildren();
    return typeof c === "function" ? c(ENTERED, {}) : c;
  };
  return createMemo(callChild);
};
var NoopTransition$1 = NoopTransition;
var escapeKeyCode = 27;
var noop2 = () => {
};
function useRootClose(ref, onRootClose, options = {}) {
  createSignal(false);
  const onClose = onRootClose || noop2;
  useClickOutside(ref, onClose, {
    get disabled() {
      return options.disabled;
    },
    get clickTrigger() {
      return options.clickTrigger;
    }
  });
  const handleKeyUp = (e) => {
    if (e.keyCode === escapeKeyCode) {
      onClose(e);
    }
  };
  createEffect(() => {
    if (options.disabled || ref() == null)
      return;
    const doc = ownerDocument(ref());
    let currentEvent = (doc.defaultView || window).event;
    const removeKeyupListener = listen(doc, "keyup", (e) => {
      if (e === currentEvent) {
        currentEvent = void 0;
        return;
      }
      handleKeyUp(e);
    });
    onCleanup(() => {
      removeKeyupListener();
    });
  });
}
var Overlay = (props) => {
  const [rootElement, attachRef] = createSignal();
  const [arrowElement, attachArrowRef] = createSignal();
  const [exited, setExited] = createSignal(!props.show);
  const container = useWaitForDOMRef({
    get ref() {
      return props.container;
    }
  });
  const [popperOptions, setPopperOptions] = createStore({});
  const popperVisible = createMemo(() => !!(props.show || props.transition && !exited()));
  createComputed(() => {
    setPopperOptions(reconcile(mergeOptionsWithPopperConfig({
      enabled: popperVisible(),
      placement: props.placement,
      enableEvents: popperVisible(),
      containerPadding: props.containerPadding || 5,
      flip: props.flip,
      offset: props.offset,
      arrowElement: arrowElement(),
      popperConfig: props.popperConfig ?? {}
    })));
  });
  const popper2 = usePopper(props.target, rootElement, popperOptions);
  createComputed(() => {
    if (props.show) {
      if (exited())
        setExited(false);
    } else if (!props.transition && !exited()) {
      setExited(true);
    }
  });
  const handleHidden = (...args) => {
    setExited(true);
    if (props.onExited) {
      props.onExited(...args);
    }
  };
  createEffect(() => {
    if (rootElement()) {
      useRootClose(rootElement, props.onHide, {
        get disabled() {
          return !props.rootClose || props.rootCloseDisabled || !props.show;
        },
        get clickTrigger() {
          return props.rootCloseEvent;
        }
      });
    }
  });
  const wrapperProps = createMemo(() => {
    var _a, _b;
    return {
      ...(_a = popper2()) == null ? void 0 : _a.attributes.popper,
      style: (_b = popper2()) == null ? void 0 : _b.styles.popper,
      ref: attachRef
    };
  });
  const arrowProps = createMemo(() => {
    var _a, _b;
    return {
      ...(_a = popper2()) == null ? void 0 : _a.attributes.arrow,
      style: (_b = popper2()) == null ? void 0 : _b.styles.arrow,
      ref: attachArrowRef
    };
  });
  const metadata = createMemo(() => ({
    popper: popper2(),
    placement: props.placement,
    show: !!props.show
  }));
  const resolvedChildren = children(() => props.children);
  const InnerChild = () => createMemo(() => resolvedChildren()(wrapperProps, arrowProps, metadata));
  let Transition2;
  return createComponent(Show, {
    get when() {
      return createMemo(() => !!container())() && popperVisible();
    },
    get children() {
      return createComponent(Portal, {
        get mount() {
          return container();
        },
        get children() {
          return createMemo(() => !!(Transition2 = props.transition))() ? createComponent(Transition2, {
            appear: true,
            get ["in"]() {
              return props.show;
            },
            get onExit() {
              return props.onExit;
            },
            get onExiting() {
              return props.onExiting;
            },
            onExited: handleHidden,
            get onEnter() {
              return props.onEnter;
            },
            get onEntering() {
              return props.onEntering;
            },
            get onEntered() {
              return props.onEntered;
            },
            get children() {
              return createComponent(InnerChild, {});
            }
          }) : createComponent(InnerChild, {});
        }
      });
    }
  });
};
var Overlay$1 = Overlay;
var defaultProps2 = {
  role: "tabpanel"
};
function useTabPanel(p) {
  const [local, props] = splitProps(mergeProps(defaultProps2, p), ["active", "eventKey", "mountOnEnter", "transition", "unmountOnExit"]);
  const context2 = useContext(TabContext$1);
  if (!context2)
    return [props, {
      get eventKey() {
        return local.eventKey;
      },
      get isActive() {
        return local.active;
      },
      get mountOnEnter() {
        return local.mountOnEnter;
      },
      get transition() {
        return local.transition;
      },
      get unmountOnExit() {
        return local.unmountOnExit;
      }
    }];
  const key = makeEventKey(local.eventKey);
  const useTabPanel2 = mergeProps(props, {
    get id() {
      return context2 == null ? void 0 : context2.getControlledId(local.eventKey);
    },
    get "aria-labelledby"() {
      return context2 == null ? void 0 : context2.getControllerId(local.eventKey);
    }
  });
  return [useTabPanel2, {
    get eventKey() {
      return local.eventKey;
    },
    get isActive() {
      return local.active == null && key != null ? makeEventKey(context2 == null ? void 0 : context2.activeKey) === key : local.active;
    },
    get transition() {
      return local.transition || (context2 == null ? void 0 : context2.transition) || NoopTransition$1;
    },
    get mountOnEnter() {
      return local.mountOnEnter != null ? local.mountOnEnter : context2 == null ? void 0 : context2.mountOnEnter;
    },
    get unmountOnExit() {
      return local.unmountOnExit != null ? local.unmountOnExit : context2 == null ? void 0 : context2.unmountOnExit;
    }
  }];
}
var TabPanel = (props) => {
  const [tabPanelProps, other] = useTabPanel(props);
  other.transition;
  return createComponent(TabContext$1.Provider, {
    value: null,
    get children() {
      return createComponent(SelectableContext$1.Provider, {
        value: null,
        get children() {
          return createComponent(Dynamic, mergeProps({
            get component() {
              return props.as ?? "div";
            }
          }, tabPanelProps, {
            role: "tabpanel",
            get hidden() {
              return !other.isActive;
            },
            get ["aria-hidden"]() {
              return !other.isActive;
            }
          }));
        }
      });
    }
  });
};
var TabPanel$1 = TabPanel;
var Tabs = (props) => {
  const [activeKey, onSelect] = createControlledProp(() => props.activeKey, () => props.defaultActiveKey, props.onSelect);
  const id = useSSRSafeId(props.id);
  const generateChildId = createMemo(() => props.generateChildId || ((key, type) => id ? `${id}-${type}-${key}` : null));
  const tabContext = {
    get onSelect() {
      return onSelect;
    },
    get activeKey() {
      return activeKey();
    },
    get transition() {
      return props.transition;
    },
    get mountOnEnter() {
      return props.mountOnEnter || false;
    },
    get unmountOnExit() {
      return props.unmountOnExit || false;
    },
    get getControlledId() {
      return (key) => generateChildId()(key, "pane");
    },
    get getControllerId() {
      return (key) => generateChildId()(key, "tab");
    }
  };
  return createComponent(TabContext$1.Provider, {
    value: tabContext,
    get children() {
      return createComponent(SelectableContext$1.Provider, {
        value: onSelect || null,
        get children() {
          return props.children;
        }
      });
    }
  });
};
Tabs.Panel = TabPanel$1;
var Tabs$1 = Tabs;

// node_modules/.pnpm/solid-bootstrap@1.0.14_solid-js@1.7.6/node_modules/solid-bootstrap/dist/esm/index.js
function toVal(mix) {
  var k, y, str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if (y = toVal(mix[k])) {
            str && (str += " ");
            str += y;
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix[k]) {
          str && (str += " ");
          str += k;
        }
      }
    }
  }
  return str;
}
function classNames(...classes) {
  var i = 0, tmp, x, str = "";
  while (i < classes.length) {
    if (tmp = classes[i++]) {
      if (x = toVal(tmp)) {
        str && (str += " ");
        str += x;
      }
    }
  }
  return str;
}
var DEFAULT_BREAKPOINTS = ["xxl", "xl", "lg", "md", "sm", "xs"];
var ThemeContext = createContext({
  prefixes: {},
  breakpoints: DEFAULT_BREAKPOINTS
});
function ThemeProvider({
  prefixes = {},
  breakpoints = DEFAULT_BREAKPOINTS,
  dir,
  children: children2
}) {
  const contextValue = createMemo(() => ({
    prefixes: {
      ...prefixes
    },
    breakpoints,
    dir
  }));
  return createComponent(ThemeContext.Provider, {
    get value() {
      return contextValue();
    },
    children: children2
  });
}
function useBootstrapPrefix(prefix, defaultPrefix) {
  const themeContext = useContext(ThemeContext);
  return prefix || themeContext.prefixes[defaultPrefix] || defaultPrefix;
}
function useBootstrapBreakpoints() {
  const ctx = useContext(ThemeContext);
  return () => ctx.breakpoints;
}
function useIsRTL() {
  const ctx = useContext(ThemeContext);
  return () => ctx.dir === "rtl";
}
function ownerDocument2(node) {
  return node && node.ownerDocument || document;
}
function ownerWindow2(node) {
  var doc = ownerDocument2(node);
  return doc && doc.defaultView || window;
}
function getComputedStyle$1(node, psuedoElement) {
  return ownerWindow2(node).getComputedStyle(node, psuedoElement);
}
var rUpper2 = /([A-Z])/g;
function hyphenate2(string) {
  return string.replace(rUpper2, "-$1").toLowerCase();
}
var msPattern2 = /^ms-/;
function hyphenateStyleName2(string) {
  return hyphenate2(string).replace(msPattern2, "-ms-");
}
var supportedTransforms2 = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
function isTransform2(value) {
  return !!(value && supportedTransforms2.test(value));
}
function style3(node, property) {
  var css = "";
  var transforms = "";
  if (typeof property === "string") {
    return node.style.getPropertyValue(hyphenateStyleName2(property)) || getComputedStyle$1(node).getPropertyValue(hyphenateStyleName2(property));
  }
  Object.keys(property).forEach(function(key) {
    var value = property[key];
    if (!value && value !== 0) {
      node.style.removeProperty(hyphenateStyleName2(key));
    } else if (isTransform2(key)) {
      transforms += key + "(" + value + ") ";
    } else {
      css += hyphenateStyleName2(key) + ": " + value + ";";
    }
  });
  if (transforms) {
    css += "transform: " + transforms + ";";
  }
  node.style.cssText += ";" + css;
}
function triggerBrowserReflow(node) {
  node.offsetHeight;
}
var canUseDOM2 = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var optionsSupported2 = false;
var onceSupported2 = false;
try {
  options = {
    get passive() {
      return optionsSupported2 = true;
    },
    get once() {
      return onceSupported2 = optionsSupported2 = true;
    }
  };
  if (canUseDOM2) {
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, true);
  }
} catch (e) {
}
var options;
function addEventListener3(node, eventName, handler, options) {
  if (options && typeof options !== "boolean" && !onceSupported2) {
    var once = options.once, capture = options.capture;
    var wrappedHandler = handler;
    if (!onceSupported2 && once) {
      wrappedHandler = handler.__once || function onceHandler(event) {
        this.removeEventListener(eventName, onceHandler, capture);
        handler.call(this, event);
      };
      handler.__once = wrappedHandler;
    }
    node.addEventListener(eventName, wrappedHandler, optionsSupported2 ? options : capture);
  }
  node.addEventListener(eventName, handler, options);
}
function removeEventListener2(node, eventName, handler, options) {
  var capture = options && typeof options !== "boolean" ? options.capture : options;
  node.removeEventListener(eventName, handler, capture);
  if (handler.__once) {
    node.removeEventListener(eventName, handler.__once, capture);
  }
}
function listen2(node, eventName, handler, options) {
  addEventListener3(node, eventName, handler, options);
  return function() {
    removeEventListener2(node, eventName, handler, options);
  };
}
function triggerEvent(node, eventName, bubbles, cancelable) {
  if (bubbles === void 0) {
    bubbles = false;
  }
  if (cancelable === void 0) {
    cancelable = true;
  }
  if (node) {
    var event = document.createEvent("HTMLEvents");
    event.initEvent(eventName, bubbles, cancelable);
    node.dispatchEvent(event);
  }
}
function parseDuration$1(node) {
  var str = style3(node, "transitionDuration") || "";
  var mult = str.indexOf("ms") === -1 ? 1e3 : 1;
  return parseFloat(str) * mult;
}
function emulateTransitionEnd(element, duration, padding) {
  if (padding === void 0) {
    padding = 5;
  }
  var called = false;
  var handle = setTimeout(function() {
    if (!called)
      triggerEvent(element, "transitionend", true);
  }, duration + padding);
  var remove = listen2(element, "transitionend", function() {
    called = true;
  }, {
    once: true
  });
  return function() {
    clearTimeout(handle);
    remove();
  };
}
function transitionEnd(element, handler, duration, padding) {
  if (duration == null)
    duration = parseDuration$1(element) || 0;
  var removeEmulate = emulateTransitionEnd(element, duration, padding);
  var remove = listen2(element, "transitionend", handler);
  return function() {
    removeEmulate();
    remove();
  };
}
function parseDuration(node, property) {
  const str = style3(node, property) || "";
  const mult = str.indexOf("ms") === -1 ? 1e3 : 1;
  return parseFloat(str) * mult;
}
function transitionEndListener(element, handler) {
  const duration = parseDuration(element, "transitionDuration");
  const delay = parseDuration(element, "transitionDelay");
  const remove = transitionEnd(element, (e) => {
    if (e.target === element) {
      remove();
      handler(e);
    }
  }, duration + delay);
}
var defaultProps$1d = {};
var TransitionWrapper = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$1d, p), ["onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "addEndListener", "children", "childRef"]);
  let [nodeRef, setNodeRef] = createSignal();
  const mergedRef = (ref) => {
    var _a;
    setNodeRef(ref);
    (_a = local.childRef) == null ? void 0 : _a.call(local, ref);
  };
  function normalize(callback) {
    return (param) => {
      if (callback && nodeRef()) {
        callback(nodeRef(), param);
      }
    };
  }
  const handlers = {
    get onEnter() {
      return normalize(local.onEnter);
    },
    get onEntering() {
      return normalize(local.onEntering);
    },
    get onEntered() {
      return normalize(local.onEntered);
    },
    get onExit() {
      return normalize(local.onExit);
    },
    get onExiting() {
      return normalize(local.onExiting);
    },
    get onExited() {
      return normalize(local.onExited);
    },
    get addEndListener() {
      return normalize(local.addEndListener);
    }
  };
  const resolvedChildren = children(() => local.children);
  function renderChild() {
    const child = resolvedChildren();
    if (typeof child === "function") {
      return (status, innerProps) => child(status, {
        ...innerProps,
        ref: mergedRef
      });
    } else {
      mergedRef(child);
      return child;
    }
  }
  return createComponent(Transition, mergeProps(props, handlers, {
    get nodeRef() {
      return nodeRef();
    },
    get children() {
      return renderChild();
    }
  }));
};
var TransitionWrapper$1 = TransitionWrapper;
var MARGINS = {
  height: ["marginTop", "marginBottom"],
  width: ["marginLeft", "marginRight"]
};
function getDefaultDimensionValue(dimension, elem) {
  const offset2 = `offset${dimension[0].toUpperCase()}${dimension.slice(1)}`;
  const value = elem[offset2];
  const margins = MARGINS[dimension];
  return value + // @ts-ignore
  parseInt(style3(elem, margins[0]), 10) + // @ts-ignore
  parseInt(style3(elem, margins[1]), 10);
}
var collapseStyles = {
  [EXITED]: "collapse",
  [EXITING]: "collapsing",
  [ENTERING]: "collapsing",
  [ENTERED]: "collapse show",
  [UNMOUNTED]: ""
};
var defaultProps$1c = {
  in: false,
  dimension: "height",
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  getDimensionValue: getDefaultDimensionValue
};
var Collapse = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$1c, p), ["onEnter", "onEntering", "onEntered", "onExit", "onExiting", "class", "children", "dimension", "getDimensionValue"]);
  const computedDimension = () => typeof local.dimension === "function" ? local.dimension() : local.dimension;
  const handleEnter = (elem) => {
    var _a;
    elem.style[computedDimension()] = "0";
    (_a = local.onEnter) == null ? void 0 : _a.call(local, elem);
  };
  const handleEntering = (elem) => {
    var _a;
    const scroll2 = `scroll${computedDimension()[0].toUpperCase()}${computedDimension().slice(1)}`;
    elem.style[computedDimension()] = `${elem[scroll2]}px`;
    (_a = local.onEntering) == null ? void 0 : _a.call(local, elem);
  };
  const handleEntered = (elem) => {
    var _a;
    elem.style[computedDimension()] = null;
    (_a = local.onEntered) == null ? void 0 : _a.call(local, elem);
  };
  const handleExit = (elem) => {
    var _a;
    elem.style[computedDimension()] = `${local.getDimensionValue(computedDimension(), elem)}px`;
    triggerBrowserReflow(elem);
    (_a = local.onExit) == null ? void 0 : _a.call(local, elem);
  };
  const handleExiting = (elem) => {
    var _a;
    elem.style[computedDimension()] = null;
    (_a = local.onExiting) == null ? void 0 : _a.call(local, elem);
  };
  const resolvedChildren = children(() => local.children);
  let prevClasses;
  return createComponent(TransitionWrapper$1, mergeProps({
    addEndListener: transitionEndListener
  }, props, {
    get ["aria-expanded"]() {
      return props.role ? props.in : null;
    },
    onEnter: handleEnter,
    onEntering: handleEntering,
    onEntered: handleEntered,
    onExit: handleExit,
    onExiting: handleExiting,
    children: (state, innerProps) => {
      const el = resolvedChildren();
      innerProps.ref(el);
      const newClasses = classNames(local.class, collapseStyles[state], computedDimension() === "width" && "collapse-horizontal");
      resolveClasses(el, prevClasses, newClasses);
      prevClasses = newClasses;
      return el;
    }
  }));
};
var Collapse$1 = Collapse;
function isAccordionItemSelected(activeEventKey, eventKey) {
  return Array.isArray(activeEventKey) ? activeEventKey.includes(eventKey) : activeEventKey === eventKey;
}
var context$4 = createContext({});
var AccordionContext = context$4;
var defaultProps$1b = {
  as: "div"
};
var AccordionCollapse = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$1b, p), ["as", "bsPrefix", "class", "children", "eventKey"]);
  const context2 = useContext(AccordionContext);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "accordion-collapse");
  return createComponent(Collapse$1, mergeProps({
    get ["in"]() {
      return isAccordionItemSelected(context2.activeEventKey, local.eventKey);
    }
  }, props, {
    get children() {
      return createComponent(Dynamic, {
        get component() {
          return local.as;
        },
        get ["class"]() {
          return classNames(local.class, bsPrefix);
        },
        get children() {
          return local.children;
        }
      });
    }
  }));
};
var AccordionCollapse$1 = AccordionCollapse;
var context$3 = createContext({
  eventKey: ""
});
var AccordionItemContext = context$3;
var defaultProps$1a = {
  as: "div"
};
var AccordionBody = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$1a, p), ["as", "bsPrefix", "class"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "accordion-body");
  const context2 = useContext(AccordionItemContext);
  return createComponent(AccordionCollapse$1, {
    get eventKey() {
      return context2.eventKey;
    },
    get children() {
      return createComponent(Dynamic, mergeProps({
        get component() {
          return local.as;
        }
      }, props, {
        get ["class"]() {
          return classNames(local.class, bsPrefix);
        }
      }));
    }
  });
};
var AccordionBody$1 = AccordionBody;
function useAccordionButton(eventKey, onClick) {
  const context2 = useContext(AccordionContext);
  return (e) => {
    var _a;
    let eventKeyPassed = eventKey === context2.activeEventKey ? null : eventKey;
    if (context2.alwaysOpen) {
      if (Array.isArray(context2.activeEventKey)) {
        if (context2.activeEventKey.includes(eventKey)) {
          eventKeyPassed = context2.activeEventKey.filter((k) => k !== eventKey);
        } else {
          eventKeyPassed = [...context2.activeEventKey, eventKey];
        }
      } else {
        eventKeyPassed = [eventKey];
      }
    }
    (_a = context2.onSelect) == null ? void 0 : _a.call(context2, eventKeyPassed, e);
    callEventHandler(onClick, e);
  };
}
var defaultProps$19 = {
  as: "button"
};
var AccordionButton = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$19, p), ["as", "bsPrefix", "class", "onClick"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "accordion-button");
  const itemContext = useContext(AccordionItemContext);
  const accordionOnClick = useAccordionButton(itemContext.eventKey, local.onClick);
  const accordionContext = useContext(AccordionContext);
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    },
    onClick: accordionOnClick
  }, props, {
    get type() {
      return local.as === "button" ? "button" : void 0;
    },
    get ["aria-expanded"]() {
      return itemContext.eventKey === accordionContext.activeEventKey;
    },
    get ["class"]() {
      return classNames(local.class, bsPrefix, !isAccordionItemSelected(accordionContext.activeEventKey, itemContext.eventKey) && "collapsed");
    }
  }));
};
var AccordionButton$1 = AccordionButton;
var defaultProps$18 = {
  as: "h2"
};
var AccordionHeader = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$18, p), ["as", "bsPrefix", "class", "children", "onClick"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "accordion-header");
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, {
    get ["class"]() {
      return classNames(local.class, bsPrefix);
    },
    get children() {
      return createComponent(AccordionButton$1, {
        get onClick() {
          return local.onClick;
        },
        get children() {
          return local.children;
        }
      });
    }
  }));
};
var AccordionHeader$1 = AccordionHeader;
var defaultProps$17 = {
  as: "div"
};
var AccordionItem = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$17, p), ["as", "bsPrefix", "class", "eventKey"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "accordion-item");
  const contextValue = {
    get eventKey() {
      return local.eventKey;
    }
  };
  return createComponent(AccordionItemContext.Provider, {
    value: contextValue,
    get children() {
      return createComponent(Dynamic, mergeProps({
        get component() {
          return local.as;
        }
      }, props, {
        get ["class"]() {
          return classNames(local.class, bsPrefix);
        }
      }));
    }
  });
};
var AccordionItem$1 = AccordionItem;
var defaultProps$16 = {
  as: "div"
};
var Accordion = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$16, p), ["as", "activeKey", "alwaysOpen", "bsPrefix", "class", "defaultActiveKey", "onSelect", "flush"]);
  const [activeKey, onSelect] = createControlledProp(() => local.activeKey, () => local.defaultActiveKey, local.onSelect);
  const prefix = useBootstrapPrefix(local.bsPrefix, "accordion");
  const contextValue = {
    get activeEventKey() {
      return activeKey();
    },
    get alwaysOpen() {
      return local.alwaysOpen;
    },
    get onSelect() {
      return onSelect;
    }
  };
  return createComponent(AccordionContext.Provider, {
    value: contextValue,
    get children() {
      return createComponent(Dynamic, mergeProps({
        get component() {
          return local.as;
        }
      }, props, {
        get ["class"]() {
          return classNames(local.class, prefix, local.flush && `${prefix}-flush`);
        }
      }));
    }
  });
};
var Accordion$1 = Object.assign(Accordion, {
  Button: AccordionButton$1,
  Collapse: AccordionCollapse$1,
  Item: AccordionItem$1,
  Header: AccordionHeader$1,
  Body: AccordionBody$1
});
var defaultProps$15 = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false
};
var fadeStyles$1 = {
  [ENTERING]: "show",
  [ENTERED]: "show"
};
var Fade = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$15, p), ["class", "children", "transitionClasses"]);
  const handleEnter = (node, isAppearing) => {
    var _a;
    triggerBrowserReflow(node);
    (_a = props.onEnter) == null ? void 0 : _a.call(props, node, isAppearing);
  };
  let resolvedChildren;
  let prevClasses;
  return createComponent(TransitionWrapper$1, mergeProps({
    addEndListener: transitionEndListener,
    onEnter: handleEnter
  }, props, {
    children: (status, innerProps) => {
      var _a;
      if (!resolvedChildren)
        resolvedChildren = children(() => local.children);
      let el = resolvedChildren();
      while (typeof el === "function")
        el = el();
      innerProps.ref(el);
      const newClasses = classNames(
        "fade",
        local.class,
        // @ts-ignore
        fadeStyles$1 == null ? void 0 : fadeStyles$1[status],
        (_a = local.transitionClasses) == null ? void 0 : _a[status]
      );
      resolveClasses(el, prevClasses, newClasses);
      prevClasses = newClasses;
      return el;
    }
  }));
};
var Fade$1 = Fade;
var _tmpl$$r = template(`<button type="button"></button>`, 2);
var defaultProps$14 = {
  "aria-label": "Close"
};
var CloseButton = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$14, p), ["class", "variant"]);
  return (() => {
    const _el$ = _tmpl$$r.cloneNode(true);
    spread(_el$, mergeProps({
      get ["class"]() {
        return classNames("btn-close", local.variant && `btn-close-${local.variant}`, local.class);
      }
    }, props), false, false);
    return _el$;
  })();
};
var CloseButton$1 = CloseButton;
var _tmpl$$q = template(`<div></div>`, 2);
var divWithClass = (c) => (p) => {
  return (() => {
    const _el$ = _tmpl$$q.cloneNode(true);
    spread(_el$, mergeProps(p, {
      get ["class"]() {
        return classNames(p.class, c);
      }
    }), false, false);
    return _el$;
  })();
};
function createWithBsPrefix(prefix, {
  Component,
  defaultProps: defaultProps4 = {}
} = {}) {
  const BsComponent = (p) => {
    const [local, props] = splitProps(mergeProps({
      as: Component
    }, defaultProps4, p), ["class", "bsPrefix", "as"]);
    const resolvedPrefix = useBootstrapPrefix(local.bsPrefix, prefix);
    return createComponent(Dynamic, mergeProps({
      get component() {
        return local.as || "div";
      },
      get ["class"]() {
        return classNames(local.class, resolvedPrefix);
      }
    }, props));
  };
  return BsComponent;
}
var _tmpl$$p = template(`<div role="alert"></div>`, 2);
var DivStyledAsH4$1 = divWithClass("h4");
var AlertHeading = createWithBsPrefix("alert-heading", {
  Component: DivStyledAsH4$1
});
var AlertLink = createWithBsPrefix("alert-link", {
  Component: Anchor$1
});
var defaultProps$13 = {
  variant: "primary",
  defaultShow: true,
  transition: Fade$1,
  closeLabel: "Close alert"
};
var Alert = (uncontrolledProps) => {
  const [local, props] = splitProps(mergeProps(defaultProps$13, uncontrolledProps), ["bsPrefix", "children", "defaultShow", "show", "closeLabel", "closeVariant", "class", "children", "variant", "onClose", "dismissible", "transition"]);
  const [show, onClose] = createControlledProp(() => local.show, () => local.defaultShow, local.onClose);
  const prefix = useBootstrapPrefix(local.bsPrefix, "alert");
  const handleClose = (e) => {
    if (onClose) {
      onClose(false, e);
    }
  };
  const Transition2 = local.transition === true ? Fade$1 : local.transition;
  const alert = () => (() => {
    const _el$ = _tmpl$$p.cloneNode(true);
    spread(_el$, mergeProps(!Transition2 ? props : {}, {
      get ["class"]() {
        return classNames(local.class, prefix, local.variant && `${prefix}-${local.variant}`, local.dismissible && `${prefix}-dismissible`);
      }
    }), false, true);
    insert(_el$, (() => {
      const _c$ = createMemo(() => !!local.dismissible);
      return () => _c$() && createComponent(CloseButton$1, {
        onClick: handleClose,
        get ["aria-label"]() {
          return local.closeLabel;
        },
        get variant() {
          return local.closeVariant;
        }
      });
    })(), null);
    insert(_el$, () => local.children, null);
    return _el$;
  })();
  return createComponent(Show, {
    when: !!Transition2,
    get fallback() {
      return local.show ? alert : null;
    },
    get children() {
      return createComponent(Transition2, mergeProps({
        unmountOnExit: true
      }, props, {
        ref(r$) {
          undefined = r$;
        },
        get ["in"]() {
          return show();
        },
        children: alert
      }));
    }
  });
};
var Alert$1 = Object.assign(Alert, {
  Link: AlertLink,
  Heading: AlertHeading
});
var defaultProps$12 = {
  as: "span",
  bg: "primary",
  pill: false
};
var Badge = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$12, p), ["as", "bsPrefix", "bg", "pill", "text", "class"]);
  const prefix = useBootstrapPrefix(local.bsPrefix, "badge");
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, {
    get ["class"]() {
      return classNames(local.class, prefix, local.pill && `rounded-pill`, local.text && `text-${local.text}`, local.bg && `bg-${local.bg}`);
    }
  }));
};
var Badge$1 = Badge;
function hasClass(element, className2) {
  if (element.classList)
    return !!className2 && element.classList.contains(className2);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className2 + " ") !== -1;
}
function addClass(element, className2) {
  if (element.classList)
    element.classList.add(className2);
  else if (!hasClass(element, className2))
    if (typeof element.className === "string")
      element.className = element.className + " " + className2;
    else
      element.setAttribute("class", (element.className && element.className.baseVal || "") + " " + className2);
}
var toArray2 = Function.prototype.bind.call(Function.prototype.call, [].slice);
function qsa2(element, selector) {
  return toArray2(element.querySelectorAll(selector));
}
function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
function removeClass(element, className2) {
  if (element.classList) {
    element.classList.remove(className2);
  } else if (typeof element.className === "string") {
    element.className = replaceClassName(element.className, className2);
  } else {
    element.setAttribute("class", replaceClassName(element.className && element.className.baseVal || "", className2));
  }
}
var Selector = {
  FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
  STICKY_CONTENT: ".sticky-top",
  NAVBAR_TOGGLER: ".navbar-toggler"
};
var BootstrapModalManager = class extends ModalManager$1 {
  adjustAndStore(prop, element, adjust) {
    const actual = element.style[prop];
    element.dataset[prop] = actual;
    style3(element, {
      [prop]: `${parseFloat(style3(element, prop)) + adjust}px`
    });
  }
  restore(prop, element) {
    const value = element.dataset[prop];
    if (value !== void 0) {
      delete element.dataset[prop];
      style3(element, {
        [prop]: value
      });
    }
  }
  setContainerStyle(containerState) {
    super.setContainerStyle(containerState);
    const container = this.getElement();
    addClass(container, "modal-open");
    if (!containerState.scrollBarWidth)
      return;
    const paddingProp = this.isRTL ? "paddingLeft" : "paddingRight";
    const marginProp = this.isRTL ? "marginLeft" : "marginRight";
    qsa2(container, Selector.FIXED_CONTENT).forEach((el) => this.adjustAndStore(paddingProp, el, containerState.scrollBarWidth));
    qsa2(container, Selector.STICKY_CONTENT).forEach((el) => this.adjustAndStore(marginProp, el, -containerState.scrollBarWidth));
    qsa2(container, Selector.NAVBAR_TOGGLER).forEach((el) => this.adjustAndStore(marginProp, el, containerState.scrollBarWidth));
  }
  removeContainerStyle(containerState) {
    super.removeContainerStyle(containerState);
    const container = this.getElement();
    removeClass(container, "modal-open");
    const paddingProp = this.isRTL ? "paddingLeft" : "paddingRight";
    const marginProp = this.isRTL ? "marginLeft" : "marginRight";
    qsa2(container, Selector.FIXED_CONTENT).forEach((el) => this.restore(paddingProp, el));
    qsa2(container, Selector.STICKY_CONTENT).forEach((el) => this.restore(marginProp, el));
    qsa2(container, Selector.NAVBAR_TOGGLER).forEach((el) => this.restore(marginProp, el));
  }
};
var sharedManager;
function getSharedManager(options) {
  if (!sharedManager)
    sharedManager = new BootstrapModalManager(options);
  return sharedManager;
}
var BootstrapModalManager$1 = BootstrapModalManager;
var defaultProps$11 = {
  as: "li",
  active: false,
  linkAs: Anchor$1,
  linkProps: {}
};
var BreadcrumbItem = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$11, p), ["bsPrefix", "active", "children", "class", "as", "linkAs", "linkProps", "href", "title", "target"]);
  const prefix = useBootstrapPrefix(local.bsPrefix, "breadcrumb-item");
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, {
    get ["class"]() {
      return classNames(prefix, local.class, {
        active: local.active
      });
    },
    get ["aria-current"]() {
      return local.active ? "page" : void 0;
    },
    get children() {
      return createMemo(() => !!local.active)() ? local.children : createComponent(Dynamic, mergeProps({
        get component() {
          return local.linkAs;
        }
      }, () => local.linkProps, {
        get href() {
          return local.href;
        },
        get title() {
          return local.title;
        },
        get target() {
          return local.target;
        },
        get children() {
          return local.children;
        }
      }));
    }
  }));
};
var BreadcrumbItem$1 = BreadcrumbItem;
var _tmpl$$o = template(`<ol></ol>`, 2);
var defaultProps$10 = {
  as: "nav",
  label: "breadcrumb",
  listProps: {}
};
var Breadcrumb = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$10, p), ["bsPrefix", "class", "listProps", "children", "label", "as"]);
  const prefix = useBootstrapPrefix(local.bsPrefix, "breadcrumb");
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    },
    get ["aria-label"]() {
      return local.label;
    },
    get ["class"]() {
      return classNames(local.class);
    }
  }, props, {
    get children() {
      const _el$ = _tmpl$$o.cloneNode(true);
      spread(_el$, mergeProps(() => local.listProps, {
        get ["class"]() {
          var _a;
          return classNames(prefix, (_a = local.listProps) == null ? void 0 : _a.class);
        }
      }), false, true);
      insert(_el$, () => local.children);
      return _el$;
    }
  }));
};
var Breadcrumb$1 = Object.assign(Breadcrumb, {
  Item: BreadcrumbItem$1
});
var defaultProps$$ = {
  variant: "primary",
  active: false,
  disabled: false
};
var Button2 = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$$, p), ["as", "bsPrefix", "children", "variant", "size", "active", "class"]);
  const prefix = useBootstrapPrefix(local.bsPrefix, "btn");
  const [buttonProps, {
    tagName
  }] = useButtonProps({
    tagName: local.as,
    ...props
  });
  return createComponent(Dynamic, mergeProps({
    component: tagName
  }, buttonProps, props, {
    get ["class"]() {
      return classNames(local.class, prefix, local.active && "active", local.variant && `${prefix}-${local.variant}`, local.size && `${prefix}-${local.size}`, props.href && props.disabled && "disabled");
    },
    get children() {
      return local.children;
    }
  }));
};
var Button$12 = Button2;
var defaultProps$_ = {
  as: "div",
  vertical: false,
  role: "group"
};
var ButtonGroup = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$_, p), ["bsPrefix", "size", "vertical", "class", "as"]);
  const prefix = useBootstrapPrefix(local.bsPrefix, "btn-group");
  let baseClass = prefix;
  if (local.vertical)
    baseClass = `${prefix}-vertical`;
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, {
    get ["class"]() {
      return classNames(local.class, baseClass, local.size && `${prefix}-${local.size}`);
    }
  }));
};
var ButtonGroup$1 = ButtonGroup;
var _tmpl$$n = template(`<div></div>`, 2);
var defaultProps$Z = {
  role: "toolbar"
};
var ButtonToolbar = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$Z, p), ["bsPrefix", "class"]);
  const prefix = useBootstrapPrefix(local.bsPrefix, "btn-toolbar");
  return (() => {
    const _el$ = _tmpl$$n.cloneNode(true);
    spread(_el$, mergeProps(props, {
      get ["class"]() {
        return classNames(local.class, prefix);
      }
    }), false, false);
    return _el$;
  })();
};
var ButtonToolbar$1 = ButtonToolbar;
var defaultProps$Y = {
  as: "img"
};
var CardImg = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$Y, p), ["as", "bsPrefix", "class", "variant"]);
  const prefix = useBootstrapPrefix(local.bsPrefix, "card-img");
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    },
    get ["class"]() {
      return classNames(local.variant ? `${prefix}-${local.variant}` : prefix, local.class);
    }
  }, props));
};
var CardImg$1 = CardImg;
var context$2 = createContext(null);
var CardHeaderContext = context$2;
var defaultProps$X = {
  as: "div"
};
var CardHeader = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$X, p), ["as", "bsPrefix", "class"]);
  const prefix = useBootstrapPrefix(local.bsPrefix, "card-header");
  const contextValue = {
    get cardHeaderBsPrefix() {
      return prefix;
    }
  };
  return createComponent(CardHeaderContext.Provider, {
    value: contextValue,
    get children() {
      return createComponent(Dynamic, mergeProps({
        get component() {
          return local.as;
        }
      }, props, {
        get ["class"]() {
          return classNames(local.class, prefix);
        }
      }));
    }
  });
};
var CardHeader$1 = CardHeader;
var DivStyledAsH5$1 = divWithClass("h5");
var DivStyledAsH6 = divWithClass("h6");
var CardBody = createWithBsPrefix("card-body");
var CardTitle = createWithBsPrefix("card-title", {
  Component: DivStyledAsH5$1
});
var CardSubtitle = createWithBsPrefix("card-subtitle", {
  Component: DivStyledAsH6
});
var CardLink = createWithBsPrefix("card-link", {
  Component: "a"
});
var CardText = createWithBsPrefix("card-text", {
  Component: "p"
});
var CardFooter = createWithBsPrefix("card-footer");
var CardImgOverlay = createWithBsPrefix("card-img-overlay");
var defaultProps$W = {
  as: "div",
  body: false
};
var Card = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$W, p), ["as", "bsPrefix", "class", "bg", "text", "border", "body", "children"]);
  const prefix = useBootstrapPrefix(local.bsPrefix, "card");
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, {
    get ["class"]() {
      return classNames(local.class, prefix, local.bg && `bg-${local.bg}`, local.text && `text-${local.text}`, local.border && `border-${local.border}`);
    },
    get children() {
      return createMemo(() => !!local.body)() ? createComponent(CardBody, {
        get children() {
          return local.children;
        }
      }) : local.children;
    }
  }));
};
var Card$1 = Object.assign(Card, {
  Img: CardImg$1,
  Title: CardTitle,
  Subtitle: CardSubtitle,
  Body: CardBody,
  Link: CardLink,
  Text: CardText,
  Header: CardHeader$1,
  Footer: CardFooter,
  ImgOverlay: CardImgOverlay
});
var CardGroup = createWithBsPrefix("card-group");
var CarouselCaption = createWithBsPrefix("carousel-caption");
var defaultProps$V = {
  as: "div"
};
var CarouselItem = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$V, p), ["as", "bsPrefix", "class", "interval"]);
  return {
    item: createComponent(Dynamic, mergeProps({
      get component() {
        return local.as;
      }
    }, props, {
      get ["class"]() {
        return classNames(local.class, useBootstrapPrefix(local.bsPrefix, "carousel-item"));
      }
    })),
    interval: local.interval
  };
};
var CarouselItem$1 = CarouselItem;
var _tmpl$$m = template(`<div></div>`, 2);
var _tmpl$2$5 = template(`<button type="button" data-bs-target=""></button>`, 2);
var _tmpl$3$1 = template(`<span aria-hidden="true" class="carousel-control-prev-icon"></span>`, 2);
var _tmpl$4 = template(`<span class="visually-hidden"></span>`, 2);
var _tmpl$5 = template(`<span aria-hidden="true" class="carousel-control-next-icon"></span>`, 2);
var SWIPE_THRESHOLD = 40;
var defaultProps$U = {
  as: "div",
  slide: true,
  fade: false,
  controls: true,
  indicators: true,
  indicatorLabels: [],
  defaultActiveIndex: 0,
  interval: 5e3,
  keyboard: true,
  pause: "hover",
  wrap: true,
  touch: true,
  prevLabel: "Previous",
  nextLabel: "Next"
};
function isVisible(element) {
  if (!element || !element.style || !element.parentNode || // @ts-ignore
  !element.parentNode.style) {
    return false;
  }
  const elementStyle = getComputedStyle(element);
  return elementStyle.display !== "none" && elementStyle.visibility !== "hidden" && getComputedStyle(element.parentNode).display !== "none";
}
var Carousel = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$U, p), ["as", "bsPrefix", "slide", "fade", "controls", "indicators", "indicatorLabels", "activeIndex", "defaultActiveIndex", "onSelect", "onSlide", "onSlid", "interval", "keyboard", "onKeyDown", "pause", "onMouseOver", "onMouseOut", "wrap", "touch", "onTouchStart", "onTouchMove", "onTouchEnd", "prevIcon", "prevLabel", "nextIcon", "nextLabel", "variant", "class", "children", "ref"]);
  const [activeIndex, onSelect] = createControlledProp(() => local.activeIndex, () => local.defaultActiveIndex, local.onSelect);
  const prefix = useBootstrapPrefix(local.bsPrefix, "carousel");
  const isRTL = useIsRTL();
  const resolvedChildren = children(() => local.children);
  const items = createMemo(() => {
    const c = resolvedChildren();
    return Array.isArray(c) ? c : [c];
  });
  const [nextDirectionRef, setNextDirectionRef] = createSignal(null);
  const [direction, setDirection] = createSignal("next");
  const [paused, setPaused] = createSignal(false);
  const [isSliding, setIsSliding] = createSignal(false);
  const [renderedActiveIndex, setRenderedActiveIndex] = createSignal(activeIndex() || 0);
  createComputed(() => batch(() => {
    if (!isSliding() && activeIndex() !== renderedActiveIndex()) {
      if (nextDirectionRef()) {
        setDirection(nextDirectionRef());
      } else {
        setDirection((activeIndex() || 0) > renderedActiveIndex() ? "next" : "prev");
      }
      if (local.slide) {
        setIsSliding(true);
      }
      setRenderedActiveIndex(activeIndex() || 0);
    }
  }));
  createEffect(() => {
    if (nextDirectionRef()) {
      setNextDirectionRef(null);
    }
  });
  const activeChildInterval = createMemo(() => {
    for (let index = 0; index < items().length; index++) {
      if (index === activeIndex()) {
        const item = items()[index];
        return item.interval;
      }
    }
    return void 0;
  });
  const prev = (event) => {
    if (isSliding()) {
      return;
    }
    let nextActiveIndex = renderedActiveIndex() - 1;
    if (nextActiveIndex < 0) {
      if (!local.wrap) {
        return;
      }
      nextActiveIndex = items().length - 1;
    }
    setNextDirectionRef("prev");
    onSelect == null ? void 0 : onSelect(nextActiveIndex, event);
  };
  const next = (event) => {
    if (isSliding()) {
      return;
    }
    let nextActiveIndex = renderedActiveIndex() + 1;
    if (nextActiveIndex >= items().length) {
      if (!local.wrap) {
        return;
      }
      nextActiveIndex = 0;
    }
    setNextDirectionRef("next");
    onSelect == null ? void 0 : onSelect(nextActiveIndex, event);
  };
  const [elementRef, setElementRef] = createSignal();
  const mergedRef = (ref) => {
    setElementRef(ref);
    if (typeof local.ref === "function") {
      local.ref({
        get element() {
          return elementRef();
        },
        prev,
        next
      });
    }
  };
  const nextWhenVisible = () => {
    if (!document.hidden && isVisible(elementRef())) {
      if (isRTL()) {
        prev();
      } else {
        next();
      }
    }
  };
  const slideDirection = createMemo(() => direction() === "next" ? "start" : "end");
  createEffect(() => {
    var _a, _b;
    if (local.slide) {
      return;
    }
    (_a = local.onSlide) == null ? void 0 : _a.call(local, renderedActiveIndex(), slideDirection());
    (_b = local.onSlid) == null ? void 0 : _b.call(local, renderedActiveIndex(), slideDirection());
  });
  const orderClass = createMemo(() => `${prefix}-item-${direction()}`);
  const directionalClass = createMemo(() => `${prefix}-item-${slideDirection()}`);
  const handleEnter = (node) => {
    var _a;
    triggerBrowserReflow(node);
    (_a = local.onSlide) == null ? void 0 : _a.call(local, renderedActiveIndex(), slideDirection());
  };
  const handleEntered = () => {
    var _a;
    setIsSliding(false);
    (_a = local.onSlid) == null ? void 0 : _a.call(local, renderedActiveIndex(), slideDirection());
  };
  const handleKeyDown = (event) => {
    if (local.keyboard && !/input|textarea/i.test(
      //@ts-ignore
      event.target.tagName
    )) {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          if (isRTL()) {
            next(event);
          } else {
            prev(event);
          }
          return;
        case "ArrowRight":
          event.preventDefault();
          if (isRTL()) {
            prev(event);
          } else {
            next(event);
          }
          return;
      }
    }
    callEventHandler(local.onKeyDown, event);
  };
  const handleMouseOver = (event) => {
    if (local.pause === "hover") {
      setPaused(true);
    }
    callEventHandler(local.onMouseOver, event);
  };
  const handleMouseOut = (event) => {
    setPaused(false);
    callEventHandler(local.onMouseOut, event);
  };
  let touchStartXRef;
  let touchDeltaXRef;
  const handleTouchStart = (event) => {
    touchStartXRef = event.touches[0].clientX;
    touchDeltaXRef = 0;
    if (local.pause === "hover") {
      setPaused(true);
    }
    callEventHandler(local.onTouchStart, event);
  };
  const handleTouchMove = (event) => {
    if (event.touches && event.touches.length > 1) {
      touchDeltaXRef = 0;
    } else {
      touchDeltaXRef = event.touches[0].clientX - touchStartXRef;
    }
    callEventHandler(local.onTouchMove, event);
  };
  const handleTouchEnd = (event) => {
    if (local.touch) {
      const touchDeltaX = touchDeltaXRef;
      if (Math.abs(touchDeltaX) > SWIPE_THRESHOLD) {
        if (touchDeltaX > 0) {
          prev(event);
        } else {
          next(event);
        }
      }
    }
    if (local.pause === "hover") {
      let touchUnpauseTimeout = window.setTimeout(() => {
        setPaused(false);
      }, local.interval);
      onCleanup(() => {
        window.clearTimeout(touchUnpauseTimeout);
      });
    }
    callEventHandler(local.onTouchEnd, event);
  };
  const shouldPlay = createMemo(() => local.interval != null && !paused() && !isSliding());
  const [intervalHandleRef, setIntervalHandleRef] = createSignal();
  createEffect(() => {
    if (!shouldPlay()) {
      return void 0;
    }
    const nextFunc = isRTL() ? prev : next;
    setIntervalHandleRef(window.setInterval(document.visibilityState ? nextWhenVisible : nextFunc, activeChildInterval() ?? local.interval ?? void 0));
    onCleanup(() => {
      if (intervalHandleRef() !== null) {
        clearInterval(intervalHandleRef());
      }
    });
  });
  const isActive = createSelector(renderedActiveIndex);
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    },
    ref: mergedRef
  }, props, {
    onKeyDown: handleKeyDown,
    onMouseOver: handleMouseOver,
    onMouseOut: handleMouseOut,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    get ["class"]() {
      return classNames(local.class, prefix, local.slide && "slide", local.fade && `${prefix}-fade`, local.variant && `${prefix}-${local.variant}`);
    },
    get children() {
      return [createMemo(() => createMemo(() => !!local.indicators)() && (() => {
        const _el$2 = _tmpl$$m.cloneNode(true);
        className(_el$2, `${prefix}-indicators`);
        insert(_el$2, createComponent(For, {
          get each() {
            return items();
          },
          children: (_, index) => (() => {
            const _el$3 = _tmpl$2$5.cloneNode(true);
            _el$3.$$click = (e) => onSelect == null ? void 0 : onSelect(index(), e);
            createRenderEffect((_p$) => {
              var _a;
              const _v$ = ((_a = local.indicatorLabels) == null ? void 0 : _a.length) ? local.indicatorLabels[index()] : `Slide ${index() + 1}`, _v$2 = isActive(index()) ? "active" : void 0, _v$3 = isActive(index());
              _v$ !== _p$._v$ && setAttribute(_el$3, "aria-label", _p$._v$ = _v$);
              _v$2 !== _p$._v$2 && className(_el$3, _p$._v$2 = _v$2);
              _v$3 !== _p$._v$3 && setAttribute(_el$3, "aria-current", _p$._v$3 = _v$3);
              return _p$;
            }, {
              _v$: void 0,
              _v$2: void 0,
              _v$3: void 0
            });
            return _el$3;
          })()
        }));
        return _el$2;
      })()), (() => {
        const _el$ = _tmpl$$m.cloneNode(true);
        className(_el$, `${prefix}-inner`);
        insert(_el$, createComponent(For, {
          get each() {
            return items();
          },
          children: (child, index) => {
            const el = typeof child.item === "function" ? child.item() : child.item;
            return local.slide ? createComponent(TransitionWrapper$1, {
              get ["in"]() {
                return isActive(index());
              },
              get onEnter() {
                return isActive(index()) ? handleEnter : void 0;
              },
              get onEntered() {
                return isActive(index()) ? handleEntered : void 0;
              },
              addEndListener: transitionEndListener,
              children: (status, innerProps) => {
                innerProps.ref(el);
                const newClasses = classNames(isActive(index()) && status !== "entered" && orderClass(), (status === "entered" || status === "exiting") && "active", (status === "entering" || status === "exiting") && directionalClass());
                resolveClasses(el, child.prevClasses, newClasses);
                child.prevClasses = newClasses;
                return el;
              }
            }) : () => {
              createEffect(() => {
                el.classList.toggle("active", isActive(index()));
              });
              return el;
            };
          }
        }));
        return _el$;
      })(), createMemo(() => createMemo(() => !!local.controls)() && [createMemo((() => {
        const _c$ = createMemo(() => !!(local.wrap || activeIndex() !== 0));
        return () => _c$() && createComponent(Anchor$1, {
          "class": `${prefix}-control-prev`,
          onClick: prev,
          get children() {
            return [createMemo(() => local.prevIcon ?? _tmpl$3$1.cloneNode(true)), createMemo(() => createMemo(() => !!local.prevLabel)() && (() => {
              const _el$5 = _tmpl$4.cloneNode(true);
              insert(_el$5, () => local.prevLabel);
              return _el$5;
            })())];
          }
        });
      })()), createMemo((() => {
        const _c$2 = createMemo(() => !!(local.wrap || activeIndex() !== items().length - 1));
        return () => _c$2() && createComponent(Anchor$1, {
          "class": `${prefix}-control-next`,
          onClick: next,
          get children() {
            return [createMemo(() => local.nextIcon ?? _tmpl$5.cloneNode(true)), createMemo(() => createMemo(() => !!local.nextLabel)() && (() => {
              const _el$7 = _tmpl$4.cloneNode(true);
              insert(_el$7, () => local.nextLabel);
              return _el$7;
            })())];
          }
        });
      })())])];
    }
  }));
};
var Carousel$1 = Object.assign(Carousel, {
  Caption: CarouselCaption,
  Item: CarouselItem$1
});
delegateEvents(["click"]);
var DEVICE_SIZES = ["xxl", "xl", "lg", "md", "sm", "xs"];
function useCol(o) {
  const [local, props] = splitProps(o, ["as", "bsPrefix", "class"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "col");
  const breakpoints = useBootstrapBreakpoints();
  const spans = [];
  const classes = [];
  breakpoints().forEach((brkPoint) => {
    const propValue = props[brkPoint];
    let span;
    let offset2;
    let order2;
    if (typeof propValue === "object" && propValue != null) {
      ({
        span,
        offset: offset2,
        order: order2
      } = propValue);
    } else {
      span = propValue;
    }
    const infix = brkPoint !== "xs" ? `-${brkPoint}` : "";
    if (span)
      spans.push(span === true ? `${bsPrefix}${infix}` : `${bsPrefix}${infix}-${span}`);
    if (order2 != null)
      classes.push(`order${infix}-${order2}`);
    if (offset2 != null)
      classes.push(`offset${infix}-${offset2}`);
  });
  const [_, cleanedProps] = splitProps(props, DEVICE_SIZES);
  return [mergeProps(cleanedProps, {
    get class() {
      return classNames(local.class, ...spans, ...classes);
    }
  }), {
    get as() {
      return local.as;
    },
    get bsPrefix() {
      return bsPrefix;
    },
    get spans() {
      return spans;
    }
  }];
}
var Col = (p) => {
  const [useProps, meta] = useCol(p);
  const [local, colProps] = splitProps(useProps, ["class"]);
  return createComponent(Dynamic, mergeProps({
    get component() {
      return meta.as ?? "div";
    }
  }, colProps, {
    get ["class"]() {
      return classNames(local.class, !meta.spans.length && meta.bsPrefix);
    }
  }));
};
var Col$1 = Col;
var defaultProps$T = {
  as: "div",
  fluid: false
};
var Container = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$T, p), ["as", "bsPrefix", "fluid", "class"]);
  const prefix = useBootstrapPrefix(local.bsPrefix, "container");
  const suffix = typeof local.fluid === "string" ? `-${local.fluid}` : "-fluid";
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, {
    get ["class"]() {
      return classNames(local.class, local.fluid ? `${prefix}${suffix}` : prefix);
    }
  }));
};
var Container$1 = Container;
var DropdownContext2 = createContext({});
var DropdownContext$12 = DropdownContext2;
var defaultProps$S = {
  as: Anchor$1,
  disabled: false
};
var DropdownItem2 = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$S, p), ["as", "bsPrefix", "class", "eventKey", "disabled", "onClick", "active"]);
  const prefix = useBootstrapPrefix(local.bsPrefix, "dropdown-item");
  const [dropdownItemProps, meta] = useDropdownItem({
    get key() {
      return local.eventKey;
    },
    get href() {
      return props.href;
    },
    get disabled() {
      return local.disabled;
    },
    get onClick() {
      return local.onClick;
    },
    get active() {
      return local.active;
    }
  });
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, dropdownItemProps, {
    get ["class"]() {
      return classNames(local.class, prefix, meta.isActive && "active", local.disabled && "disabled");
    }
  }));
};
var DropdownItem$12 = DropdownItem2;
var context$1 = createContext(null);
var InputGroupContext = context$1;
var context = createContext(null);
var NavbarContext = context;
var defaultProps$R = {
  as: "div",
  flip: true
};
function getDropdownMenuPlacement(alignEnd, dropDirection, isRTL) {
  const topStart = isRTL ? "top-end" : "top-start";
  const topEnd = isRTL ? "top-start" : "top-end";
  const bottomStart = isRTL ? "bottom-end" : "bottom-start";
  const bottomEnd = isRTL ? "bottom-start" : "bottom-end";
  const leftStart = isRTL ? "right-start" : "left-start";
  const leftEnd = isRTL ? "right-end" : "left-end";
  const rightStart = isRTL ? "left-start" : "right-start";
  const rightEnd = isRTL ? "left-end" : "right-end";
  let placement = alignEnd ? bottomEnd : bottomStart;
  if (dropDirection === "up")
    placement = alignEnd ? topEnd : topStart;
  else if (dropDirection === "end")
    placement = alignEnd ? rightEnd : rightStart;
  else if (dropDirection === "start")
    placement = alignEnd ? leftEnd : leftStart;
  return placement;
}
var DropdownMenu2 = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$R, p), ["as", "bsPrefix", "class", "align", "rootCloseEvent", "flip", "show", "renderOnMount", "popperConfig", "ref", "variant"]);
  let alignEnd = false;
  const isNavbar = useContext(NavbarContext);
  const prefix = useBootstrapPrefix(local.bsPrefix, "dropdown-menu");
  const dropdownContext = useContext(DropdownContext$12);
  const align = local.align || dropdownContext.align;
  const isInputGroup = useContext(InputGroupContext);
  const alignClasses = [];
  if (align) {
    if (typeof align === "object") {
      const keys = Object.keys(align);
      if (keys.length) {
        const brkPoint = keys[0];
        const direction = align[brkPoint];
        alignEnd = direction === "start";
        alignClasses.push(`${prefix}-${brkPoint}-${direction}`);
      }
    } else if (align === "end") {
      alignEnd = true;
    }
  }
  const [menuProps, menuMeta] = useDropdownMenu({
    get flip() {
      return local.flip;
    },
    get rootCloseEvent() {
      return local.rootCloseEvent;
    },
    get show() {
      return local.show;
    },
    get usePopper() {
      return !isNavbar && alignClasses.length === 0;
    },
    get offset() {
      return [0, 2];
    },
    get popperConfig() {
      return local.popperConfig;
    },
    get placement() {
      return getDropdownMenuPlacement(alignEnd, dropdownContext.drop, dropdownContext.isRTL);
    }
  });
  const mergedRef = (ref) => {
    var _a, _b;
    (_a = menuProps.ref) == null ? void 0 : _a.call(menuProps, ref);
    (_b = local.ref) == null ? void 0 : _b.call(local, ref);
  };
  const extendedMenuProps = mergeProps(
    menuProps,
    // For custom components provide additional, non-DOM, props;
    typeof local.as !== "string" ? {
      get show() {
        return menuMeta.show;
      },
      get close() {
        return () => {
          var _a;
          return (_a = menuMeta.toggle) == null ? void 0 : _a.call(menuMeta, false);
        };
      },
      get align() {
        return align;
      }
    } : {}
  );
  const style4 = () => {
    var _a;
    return ((_a = menuMeta.popper) == null ? void 0 : _a.placement) ? {
      ...props.style,
      ...menuProps.style
    } : props.style;
  };
  return createComponent(Show, {
    get when() {
      return menuMeta.hasShown || local.renderOnMount || isInputGroup;
    },
    get children() {
      return createComponent(Dynamic, mergeProps({
        get component() {
          return local.as;
        }
      }, props, extendedMenuProps, {
        ref: mergedRef,
        get style() {
          return style4();
        }
      }, () => alignClasses.length || isNavbar ? {
        "data-bs-popper": "static"
      } : {}, {
        get ["class"]() {
          return classNames(local.class, prefix, menuMeta.show && "show", alignEnd && `${prefix}-end`, local.variant && `${prefix}-${local.variant}`, ...alignClasses);
        }
      }));
    }
  });
};
var DropdownMenu$1 = DropdownMenu2;
var defaultProps$Q = {
  as: Button$12
};
var DropdownToggle2 = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$Q, p), ["as", "bsPrefix", "split", "class", "childBsPrefix", "ref"]);
  const prefix = useBootstrapPrefix(local.bsPrefix, "dropdown-toggle");
  const dropdownContext = useContext(DropdownContext$1);
  const isInputGroup = useContext(InputGroupContext);
  if (local.childBsPrefix !== void 0) {
    props.bsPrefix = local.childBsPrefix;
  }
  const [toggleProps] = useDropdownToggle();
  const [toggleLocal, toggleOther] = splitProps(toggleProps, ["ref"]);
  const mergedRef = (ref) => {
    var _a, _b;
    (_a = toggleLocal.ref) == null ? void 0 : _a.call(toggleLocal, ref);
    (_b = local.ref) == null ? void 0 : _b.call(local, ref);
  };
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    },
    get ["class"]() {
      return classNames(local.class, prefix, local.split && `${prefix}-split`, !!isInputGroup && (dropdownContext == null ? void 0 : dropdownContext.show) && "show");
    }
  }, toggleOther, props, {
    ref: mergedRef
  }));
};
var DropdownToggle$1 = DropdownToggle2;
var DropdownHeader = createWithBsPrefix("dropdown-header", {
  defaultProps: {
    role: "heading"
  }
});
var DropdownDivider = createWithBsPrefix("dropdown-divider", {
  Component: "hr",
  defaultProps: {
    role: "separator"
  }
});
var DropdownItemText = createWithBsPrefix("dropdown-item-text", {
  Component: "span"
});
var defaultProps$P = {
  as: "div",
  navbar: false,
  align: "start",
  autoClose: true
};
var Dropdown2 = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$P, p), ["as", "bsPrefix", "drop", "show", "defaultShow", "class", "align", "onSelect", "onToggle", "focusFirstItemOnShow", "navbar", "autoClose"]);
  const [show, onToggle] = createControlledProp(() => local.show, () => local.defaultShow, local.onToggle);
  const isInputGroup = useContext(InputGroupContext);
  const prefix = useBootstrapPrefix(local.bsPrefix, "dropdown");
  const isRTL = useIsRTL();
  const isClosingPermitted = (source) => {
    if (local.autoClose === false)
      return source === "click";
    if (local.autoClose === "inside")
      return source !== "rootClose";
    if (local.autoClose === "outside")
      return source !== "select";
    return true;
  };
  const handleToggle = (nextShow, meta) => {
    if (
      // null option below is for "bug?" in Solid returning null instead of document
      (meta.originalEvent.currentTarget === document || meta.originalEvent.currentTarget === null) && (meta.source !== "keydown" || meta.originalEvent.key === "Escape")
    ) {
      meta.source = "rootClose";
    }
    if (isClosingPermitted(meta.source))
      onToggle == null ? void 0 : onToggle(nextShow, meta);
  };
  const alignEnd = local.align === "end";
  const placement = getDropdownMenuPlacement(alignEnd, local.drop, isRTL());
  const contextValue = {
    get align() {
      return local.align;
    },
    get drop() {
      return local.drop;
    },
    get isRTL() {
      return isRTL();
    }
  };
  return createComponent(DropdownContext$12.Provider, {
    value: contextValue,
    get children() {
      return createComponent(Dropdown, {
        placement,
        get show() {
          return show();
        },
        get onSelect() {
          return local.onSelect;
        },
        onToggle: handleToggle,
        get focusFirstItemOnShow() {
          return local.focusFirstItemOnShow;
        },
        itemSelector: `.${prefix}-item:not(.disabled):not(:disabled)`,
        get children() {
          return isInputGroup ? props.children : createComponent(Dynamic, mergeProps({
            get component() {
              return local.as;
            }
          }, props, {
            get ["class"]() {
              return classNames(local.class, show() && "show", (!local.drop || local.drop === "down") && prefix, local.drop === "up" && "dropup", local.drop === "end" && "dropend", local.drop === "start" && "dropstart");
            }
          }));
        }
      });
    }
  });
};
var Dropdown$1 = Object.assign(Dropdown2, {
  Toggle: DropdownToggle$1,
  Menu: DropdownMenu$1,
  Item: DropdownItem$12,
  ItemText: DropdownItemText,
  Divider: DropdownDivider,
  Header: DropdownHeader
});
var defaultProps$O = {};
var DropdownButton = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$O, p), ["title", "children", "bsPrefix", "rootCloseEvent", "variant", "size", "menuRole", "renderMenuOnMount", "disabled", "href", "id", "menuVariant"]);
  return createComponent(Dropdown$1, mergeProps(props, {
    get children() {
      return [createComponent(DropdownToggle$1, {
        get id() {
          return local.id;
        },
        get href() {
          return local.href;
        },
        get size() {
          return local.size;
        },
        get variant() {
          return local.variant;
        },
        get disabled() {
          return local.disabled;
        },
        get childBsPrefix() {
          return local.bsPrefix;
        },
        get children() {
          return local.title;
        }
      }), createComponent(DropdownMenu$1, {
        get role() {
          return local.menuRole;
        },
        get renderOnMount() {
          return local.renderMenuOnMount;
        },
        get rootCloseEvent() {
          return local.rootCloseEvent;
        },
        get variant() {
          return local.menuVariant;
        },
        get children() {
          return local.children;
        }
      })];
    }
  }));
};
var DropdownButton$1 = DropdownButton;
var defaultProps$N = {
  as: "div",
  type: "valid",
  tooltip: false
};
var Feedback = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$N, p), ["as", "class", "type", "tooltip"]);
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, {
    get ["class"]() {
      return classNames(local.class, `${local.type}-${local.tooltip ? "tooltip" : "feedback"}`);
    }
  }));
};
var Feedback$1 = Feedback;
var _tmpl$$l = template(`<img>`, 1);
var defaultProps$M = {
  fluid: false,
  rounded: false,
  roundedCircle: false,
  thumbnail: false
};
var Image = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$M, p), ["bsPrefix", "class", "fluid", "rounded", "roundedCircle", "thumbnail"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "img");
  return (() => {
    const _el$ = _tmpl$$l.cloneNode(true);
    spread(_el$, mergeProps(props, {
      get ["class"]() {
        return classNames(local.class, local.fluid && `${bsPrefix}-fluid`, local.rounded && `rounded`, local.roundedCircle && `rounded-circle`, local.thumbnail && `${bsPrefix}-thumbnail`);
      }
    }), false, false);
    return _el$;
  })();
};
var Image$1 = Image;
var defaultProps$L = {
  fluid: true
};
var FigureImage = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$L, p), ["class"]);
  return createComponent(Image$1, mergeProps(props, {
    get ["class"]() {
      return classNames(local.class, "figure-img");
    }
  }));
};
var FigureImage$1 = FigureImage;
var FigureCaption = createWithBsPrefix("figure-caption", {
  Component: "figcaption"
});
var FigureCaption$1 = FigureCaption;
var Figure = createWithBsPrefix("figure", {
  Component: "figure"
});
var Figure$1 = Object.assign(Figure, {
  Image: FigureImage$1,
  Caption: FigureCaption$1
});
var FormContext = createContext({});
var FormContext$1 = FormContext;
var defaultProps$K = {
  as: "div"
};
var FormGroup = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$K, p), ["as", "controlId"]);
  const context2 = {
    get controlId() {
      return local.controlId;
    }
  };
  return createComponent(FormContext$1.Provider, {
    value: context2,
    get children() {
      return createComponent(Dynamic, mergeProps({
        get component() {
          return local.as;
        }
      }, props));
    }
  });
};
var FormGroup$1 = FormGroup;
var _tmpl$$k = template(`<label></label>`, 2);
var defaultProps$J = {};
var FloatingLabel = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$J, p), ["bsPrefix", "class", "children", "controlId", "label"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "form-floating");
  return createComponent(FormGroup$1, mergeProps({
    get ["class"]() {
      return classNames(local.class, bsPrefix);
    },
    get controlId() {
      return local.controlId;
    }
  }, props, {
    get children() {
      return [createMemo(() => local.children), (() => {
        const _el$ = _tmpl$$k.cloneNode(true);
        insert(_el$, () => local.label);
        createRenderEffect(() => setAttribute(_el$, "for", local.controlId));
        return _el$;
      })()];
    }
  }));
};
var FloatingLabel$1 = FloatingLabel;
var defaultProps$I = {
  as: "input",
  type: "checkbox",
  isValid: false,
  isInvalid: false
};
var FormCheckInput = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$I, p), ["as", "id", "bsPrefix", "class", "type", "isValid", "isInvalid"]);
  const formContext = useContext(FormContext$1);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "form-check-input");
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, {
    get type() {
      return local.type;
    },
    get id() {
      return local.id || formContext.controlId;
    },
    get ["class"]() {
      return classNames(local.class, bsPrefix, local.isValid && "is-valid", local.isInvalid && "is-invalid");
    }
  }));
};
var FormCheckInput$1 = FormCheckInput;
var FormCheckContext = createContext();
var FormCheckContext$1 = FormCheckContext;
var _tmpl$$j = template(`<label></label>`, 2);
var defaultProps$H = {};
var FormCheckLabel = (p) => {
  var _a;
  const [local, props] = splitProps(mergeProps(defaultProps$H, p), ["bsPrefix", "class", "for"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "form-check-label");
  const formContext = useContext(FormContext$1);
  const formCheckContext = useContext(FormCheckContext$1);
  (_a = formCheckContext == null ? void 0 : formCheckContext.setHasFormCheckLabel) == null ? void 0 : _a.call(formCheckContext, true);
  return (() => {
    const _el$ = _tmpl$$j.cloneNode(true);
    spread(_el$, mergeProps(props, {
      get ["for"]() {
        return local.for || formContext.controlId;
      },
      get ["class"]() {
        return classNames(local.class, bsPrefix);
      }
    }), false, false);
    return _el$;
  })();
};
var FormCheckLabel$1 = FormCheckLabel;
var _tmpl$$i = template(`<div></div>`, 2);
var defaultProps$G = {
  as: "input",
  title: "",
  type: "checkbox",
  inline: false,
  disabled: false,
  isValid: false,
  isInvalid: false,
  feedbackTooltip: false
};
var FormCheck = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$G, p), ["as", "id", "bsPrefix", "bsSwitchPrefix", "inline", "disabled", "isValid", "isInvalid", "feedbackTooltip", "feedback", "feedbackType", "class", "style", "title", "type", "label", "children"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "form-check");
  const bsSwitchPrefix = useBootstrapPrefix(local.bsSwitchPrefix, "form-switch");
  const [hasFormCheckLabel, setHasFormCheckLabel] = createSignal(false);
  const formContext = useContext(FormContext$1);
  const innerFormContext = {
    get controlId() {
      return local.id || formContext.controlId;
    }
  };
  const resolvedChildren = children(() => local.children);
  const hasLabel = createMemo(() => local.label != null && local.label !== false && !resolvedChildren() || hasFormCheckLabel());
  return createComponent(FormContext$1.Provider, {
    value: innerFormContext,
    get children() {
      return createComponent(FormCheckContext$1.Provider, {
        value: {
          setHasFormCheckLabel
        },
        get children() {
          const _el$ = _tmpl$$i.cloneNode(true);
          insert(_el$, () => resolvedChildren() || [createComponent(FormCheckInput$1, mergeProps(props, {
            get type() {
              return local.type === "switch" ? "checkbox" : local.type;
            },
            get isValid() {
              return local.isValid;
            },
            get isInvalid() {
              return local.isInvalid;
            },
            get disabled() {
              return local.disabled;
            },
            get as() {
              return local.as;
            }
          })), createMemo((() => {
            const _c$ = createMemo(() => !!hasLabel());
            return () => _c$() && createComponent(FormCheckLabel$1, {
              get title() {
                return local.title;
              },
              get children() {
                return local.label;
              }
            });
          })()), createMemo((() => {
            const _c$2 = createMemo(() => !!local.feedback);
            return () => _c$2() && createComponent(Feedback$1, {
              get type() {
                return local.feedbackType;
              },
              get tooltip() {
                return local.feedbackTooltip;
              },
              get children() {
                return local.feedback;
              }
            });
          })())]);
          createRenderEffect((_p$) => {
            const _v$ = local.style, _v$2 = classNames(local.class, hasLabel() && bsPrefix, local.inline && `${bsPrefix}-inline`, local.type === "switch" && bsSwitchPrefix);
            _p$._v$ = style(_el$, _v$, _p$._v$);
            _v$2 !== _p$._v$2 && className(_el$, _p$._v$2 = _v$2);
            return _p$;
          }, {
            _v$: void 0,
            _v$2: void 0
          });
          return _el$;
        }
      });
    }
  });
};
var FormCheck$1 = Object.assign(FormCheck, {
  Input: FormCheckInput$1,
  Label: FormCheckLabel$1
});
var defaultProps$F = {
  as: "input",
  isValid: false,
  isInvalid: false
};
var FormControl = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$F, p), ["as", "bsPrefix", "type", "size", "htmlSize", "id", "class", "isValid", "isInvalid", "plaintext", "readOnly"]);
  const formContext = useContext(FormContext$1);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "form-control");
  const classes = () => {
    let classes2;
    if (local.plaintext) {
      classes2 = {
        [`${bsPrefix}-plaintext`]: true
      };
    } else {
      classes2 = {
        [bsPrefix]: true,
        [`${bsPrefix}-${local.size}`]: local.size
      };
    }
    return classes2;
  };
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, {
    get type() {
      return local.type;
    },
    get size() {
      return local.htmlSize;
    },
    get readOnly() {
      return local.readOnly;
    },
    get id() {
      return local.id || formContext.controlId;
    },
    get ["class"]() {
      return classNames(classes(), local.isValid && `is-valid`, local.isInvalid && `is-invalid`, local.type === "color" && `${bsPrefix}-color`);
    }
  }));
};
var FormControl$1 = Object.assign(FormControl, {
  Feedback: Feedback$1
});
var FormFloating = createWithBsPrefix("form-floating");
var defaultProps$E = {
  as: "label",
  column: false,
  visuallyHidden: false
};
var FormLabel = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$E, p), ["as", "bsPrefix", "column", "visuallyHidden", "class", "htmlFor"]);
  const formContext = useContext(FormContext$1);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "form-label");
  let columnClass = "col-form-label";
  if (typeof local.column === "string")
    columnClass = `${columnClass} ${columnClass}-${local.column}`;
  const classes = () => classNames(local.class, bsPrefix, local.visuallyHidden && "visually-hidden", local.column && columnClass);
  return !!local.column ? createComponent(Col$1, mergeProps({
    as: "label",
    get ["class"]() {
      return classes();
    },
    get htmlFor() {
      return local.htmlFor || formContext.controlId;
    }
  }, props)) : createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    },
    get ["class"]() {
      return classes();
    },
    get htmlFor() {
      return local.htmlFor || formContext.controlId;
    }
  }, props));
};
var FormLabel$1 = FormLabel;
var _tmpl$$h = template(`<input>`, 1);
var defaultProps$D = {
  as: "img"
};
var FormRange = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$D, p), ["bsPrefix", "class", "id"]);
  const formContext = useContext(FormContext$1);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "form-range");
  return (() => {
    const _el$ = _tmpl$$h.cloneNode(true);
    spread(_el$, mergeProps(props, {
      "type": "range",
      get ["class"]() {
        return classNames(local.class, bsPrefix);
      },
      get id() {
        return local.id || formContext.controlId;
      }
    }), false, false);
    return _el$;
  })();
};
var FormRange$1 = FormRange;
var _tmpl$$g = template(`<select></select>`, 2);
var defaultProps$C = {
  isValid: false,
  isInvalid: false
};
var FormSelect = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$C, p), ["bsPrefix", "size", "htmlSize", "class", "isValid", "isInvalid", "id"]);
  const formContext = useContext(FormContext$1);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "form-select");
  return (() => {
    const _el$ = _tmpl$$g.cloneNode(true);
    spread(_el$, mergeProps(props, {
      get size() {
        return local.htmlSize;
      },
      get ["class"]() {
        return classNames(local.class, bsPrefix, local.size && `${bsPrefix}-${local.size}`, local.isValid && `is-valid`, local.isInvalid && `is-invalid`);
      },
      get id() {
        return local.id || formContext.controlId;
      }
    }), false, false);
    return _el$;
  })();
};
var FormSelect$1 = FormSelect;
var defaultProps$B = {
  as: "small"
};
var FormText = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$B, p), ["as", "bsPrefix", "class", "muted"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "form-text");
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, {
    get ["class"]() {
      return classNames(local.class, bsPrefix, local.muted && "text-muted");
    }
  }));
};
var FormText$1 = FormText;
var Switch = (props) => createComponent(FormCheck$1, mergeProps(props, {
  type: "switch"
}));
var Switch$1 = Object.assign(Switch, {
  Input: FormCheck$1.Input,
  Label: FormCheck$1.Label
});
var defaultProps$A = {
  as: "form"
};
var Form = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$A, p), ["as", "class", "validated"]);
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, {
    get ["class"]() {
      return classNames(local.class, local.validated && "was-validated");
    }
  }));
};
var Form$1 = Object.assign(Form, {
  Group: FormGroup$1,
  Control: FormControl$1,
  Floating: FormFloating,
  Check: FormCheck$1,
  Switch: Switch$1,
  Label: FormLabel$1,
  Text: FormText$1,
  Range: FormRange$1,
  Select: FormSelect$1,
  FloatingLabel: FloatingLabel$1
});
var InputGroupText = createWithBsPrefix("input-group-text", {
  Component: "span"
});
var InputGroupCheckbox = (props) => createComponent(InputGroupText, {
  get children() {
    return createComponent(FormCheckInput$1, mergeProps({
      type: "checkbox"
    }, props));
  }
});
var InputGroupRadio = (props) => createComponent(InputGroupText, {
  get children() {
    return createComponent(FormCheckInput$1, mergeProps({
      type: "radio"
    }, props));
  }
});
var defaultProps$z = {
  as: "div"
};
var InputGroup = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$z, p), ["as", "bsPrefix", "size", "hasValidation", "class"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "input-group");
  const contextValue = {};
  return createComponent(InputGroupContext.Provider, {
    value: contextValue,
    get children() {
      return createComponent(Dynamic, mergeProps({
        get component() {
          return local.as;
        }
      }, props, {
        get ["class"]() {
          return classNames(local.class, bsPrefix, local.size && `${bsPrefix}-${local.size}`, local.hasValidation && "has-validation");
        }
      }));
    }
  });
};
var InputGroup$1 = Object.assign(InputGroup, {
  Text: InputGroupText,
  Radio: InputGroupRadio,
  Checkbox: InputGroupCheckbox
});
var defaultProps$y = {};
var ListGroupItem = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$y, p), ["as", "bsPrefix", "active", "disabled", "eventKey", "class", "variant", "action"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "list-group-item");
  const [navItemProps, meta] = useNavItem(mergeProps({
    get key() {
      return makeEventKey(local.eventKey, props.href);
    },
    get active() {
      return local.active;
    }
  }, props));
  const handleClick = createMemo(() => (event) => {
    if (local.disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    navItemProps.onClick(event);
  });
  const disabledProps = () => local.disabled && props.tabIndex === void 0 ? {
    tabIndex: -1,
    ["aria-disabled"]: true
  } : {};
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as || (local.action ? props.href ? "a" : "button" : "div");
    }
  }, props, navItemProps, disabledProps, {
    get onClick() {
      return handleClick();
    },
    get ["class"]() {
      return classNames(local.class, bsPrefix, meta.isActive && "active", local.disabled && "disabled", local.variant && `${bsPrefix}-${local.variant}`, local.action && `${bsPrefix}-action`);
    }
  }));
};
var ListGroupItem$1 = ListGroupItem;
var defaultProps$x = {
  as: "div"
};
var ListGroup = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$x, p), ["as", "activeKey", "defaultActiveKey", "bsPrefix", "class", "variant", "horizontal", "numbered", "onSelect"]);
  const [activeKey, onSelect] = createControlledProp(() => local.activeKey, () => local.defaultActiveKey, local.onSelect);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "list-group");
  let horizontalVariant;
  if (local.horizontal) {
    horizontalVariant = local.horizontal === true ? "horizontal" : `horizontal-${local.horizontal}`;
  }
  return createComponent(Nav$1, mergeProps({
    get as() {
      return local.as;
    }
  }, props, {
    get activeKey() {
      return activeKey();
    },
    onSelect,
    get ["class"]() {
      return classNames(local.class, bsPrefix, local.variant && `${bsPrefix}-${local.variant}`, horizontalVariant && `${bsPrefix}-${horizontalVariant}`, local.numbered && `${bsPrefix}-numbered`);
    }
  }));
};
var ListGroup$1 = Object.assign(ListGroup, {
  Item: ListGroupItem$1
});
var size;
function scrollbarSize(recalc) {
  if (!size && size !== 0 || recalc) {
    if (canUseDOM2) {
      var scrollDiv = document.createElement("div");
      scrollDiv.style.position = "absolute";
      scrollDiv.style.top = "-9999px";
      scrollDiv.style.width = "50px";
      scrollDiv.style.height = "50px";
      scrollDiv.style.overflow = "scroll";
      document.body.appendChild(scrollDiv);
      size = scrollDiv.offsetWidth - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
    }
  }
  return size;
}
var ModalBody = createWithBsPrefix("modal-body");
var ModalContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onHide() {
  }
});
var ModalContext$1 = ModalContext;
var _tmpl$$f = template(`<div><div></div></div>`, 4);
var defaultProps$w = {};
var ModalDialog = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$w, p), ["bsPrefix", "class", "contentClass", "centered", "size", "fullscreen", "children", "scrollable"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "modal");
  const dialogClass = `${bsPrefix}-dialog`;
  const fullScreenClass = typeof local.fullscreen === "string" ? `${bsPrefix}-fullscreen-${local.fullscreen}` : `${bsPrefix}-fullscreen`;
  return (() => {
    const _el$ = _tmpl$$f.cloneNode(true), _el$2 = _el$.firstChild;
    spread(_el$, mergeProps(props, {
      get ["class"]() {
        return classNames(dialogClass, local.class, local.size && `${bsPrefix}-${local.size}`, local.centered && `${dialogClass}-centered`, local.scrollable && `${dialogClass}-scrollable`, local.fullscreen && fullScreenClass);
      }
    }), false, true);
    insert(_el$2, () => local.children);
    createRenderEffect(() => className(_el$2, classNames(`${bsPrefix}-content`, local.contentClass, local.contentClass)));
    return _el$;
  })();
};
var ModalDialog$1 = ModalDialog;
var ModalFooter = createWithBsPrefix("modal-footer");
var _tmpl$$e = template(`<div></div>`, 2);
var defaultProps$v = {
  closeLabel: "Close",
  closeButton: false
};
var AbstractModalHeader = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$v, p), ["closeLabel", "closeVariant", "closeButton", "onHide", "children"]);
  const context2 = useContext(ModalContext$1);
  const handleClick = () => {
    var _a;
    context2 == null ? void 0 : context2.onHide();
    (_a = local.onHide) == null ? void 0 : _a.call(local);
  };
  return (() => {
    const _el$ = _tmpl$$e.cloneNode(true);
    spread(_el$, props, false, true);
    insert(_el$, () => local.children, null);
    insert(_el$, (() => {
      const _c$ = createMemo(() => !!local.closeButton);
      return () => _c$() && createComponent(CloseButton$1, {
        get ["aria-label"]() {
          return local.closeLabel;
        },
        get variant() {
          return local.closeVariant;
        },
        onClick: handleClick
      });
    })(), null);
    return _el$;
  })();
};
var AbstractModalHeader$1 = AbstractModalHeader;
var defaultProps$u = {
  closeLabel: "Close",
  closeButton: false
};
var ModalHeader = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$u, p), ["bsPrefix", "class"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "modal-header");
  return createComponent(AbstractModalHeader$1, mergeProps(props, {
    get ["class"]() {
      return classNames(local.class, bsPrefix);
    }
  }));
};
var ModalHeader$1 = ModalHeader;
var DivStyledAsH4 = divWithClass("h4");
var ModalTitle = createWithBsPrefix("modal-title", {
  Component: DivStyledAsH4
});
var _tmpl$$d = template(`<div></div>`, 2);
var _tmpl$2$4 = template(`<div role="dialog"></div>`, 2);
var defaultProps$t = {
  show: false,
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  animation: true,
  dialogAs: ModalDialog$1
};
function DialogTransition$1(props) {
  return createComponent(Fade$1, mergeProps(props, {
    timeout: void 0
  }));
}
function BackdropTransition$1(props) {
  return createComponent(Fade$1, mergeProps(props, {
    timeout: void 0
  }));
}
var Modal2 = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$t, p), [
    "bsPrefix",
    "class",
    "style",
    "dialogClass",
    "contentClass",
    "children",
    "dialogAs",
    "aria-labelledby",
    /* BaseModal props */
    "show",
    "animation",
    "backdrop",
    "keyboard",
    "onEscapeKeyDown",
    "onShow",
    "onHide",
    "container",
    "autoFocus",
    "enforceFocus",
    "restoreFocus",
    "restoreFocusOptions",
    "onEntered",
    "onExit",
    "onExiting",
    "onEnter",
    "onEntering",
    "onExited",
    "backdropClass",
    "manager"
  ]);
  const [modalStyle, setStyle] = createSignal({});
  const [animateStaticModal, setAnimateStaticModal] = createSignal(false);
  let waitingForMouseUpRef = false;
  let ignoreBackdropClickRef = false;
  let removeStaticModalAnimationRef = null;
  let modal;
  const isRTL = useIsRTL();
  const mergedRef = (ref) => {
    var _a;
    modal = ref;
    (_a = props.ref) == null ? void 0 : _a.call(props, ref);
  };
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "modal");
  const modalContext = {
    get onHide() {
      return local.onHide;
    }
  };
  function getModalManager() {
    if (local.manager)
      return local.manager;
    return getSharedManager({
      isRTL: isRTL()
    });
  }
  function updateDialogStyle(node) {
    if (!canUseDOM2)
      return;
    const containerIsOverflowing = getModalManager().getScrollbarWidth() > 0;
    const modalIsOverflowing = node.scrollHeight > ownerDocument2(node).documentElement.clientHeight;
    setStyle({
      paddingRight: containerIsOverflowing && !modalIsOverflowing ? scrollbarSize() : void 0,
      paddingLeft: !containerIsOverflowing && modalIsOverflowing ? scrollbarSize() : void 0
    });
  }
  const handleWindowResize = () => {
    if (modal) {
      updateDialogStyle(modal.dialog);
    }
  };
  onCleanup(() => {
    removeEventListener2(window, "resize", handleWindowResize);
    removeStaticModalAnimationRef == null ? void 0 : removeStaticModalAnimationRef();
  });
  const handleDialogMouseDown = () => {
    waitingForMouseUpRef = true;
  };
  const handleMouseUp = (e) => {
    if (waitingForMouseUpRef && modal && e.target === modal.dialog) {
      ignoreBackdropClickRef = true;
    }
    waitingForMouseUpRef = false;
  };
  const handleStaticModalAnimation = () => {
    setAnimateStaticModal(true);
    removeStaticModalAnimationRef = transitionEnd(modal.dialog, () => {
      setAnimateStaticModal(false);
    });
  };
  const handleStaticBackdropClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    handleStaticModalAnimation();
  };
  const handleClick = (e) => {
    var _a;
    if (local.backdrop === "static") {
      handleStaticBackdropClick(e);
      return;
    }
    if (ignoreBackdropClickRef || e.target !== e.currentTarget) {
      ignoreBackdropClickRef = false;
      return;
    }
    (_a = local.onHide) == null ? void 0 : _a.call(local);
  };
  const handleEscapeKeyDown = (e) => {
    if (!local.keyboard && local.backdrop === "static") {
      e.preventDefault();
      handleStaticModalAnimation();
    } else if (local.keyboard && local.onEscapeKeyDown) {
      local.onEscapeKeyDown(e);
    }
  };
  const handleEnter = (node, ...args) => {
    var _a;
    if (node) {
      node.style.display = "block";
      updateDialogStyle(node);
    }
    (_a = local.onEnter) == null ? void 0 : _a.call(local, node, ...args);
  };
  const handleExit = (...args) => {
    var _a;
    removeStaticModalAnimationRef == null ? void 0 : removeStaticModalAnimationRef();
    (_a = local.onExit) == null ? void 0 : _a.call(local, ...args);
  };
  const handleEntering = (...args) => {
    var _a;
    (_a = local.onEntering) == null ? void 0 : _a.call(local, ...args);
    if (!isServer) {
      addEventListener3(window, "resize", handleWindowResize);
    }
  };
  const handleExited = (node) => {
    var _a;
    if (node)
      node.style.display = "";
    (_a = local.onExited) == null ? void 0 : _a.call(local, node);
    if (!isServer) {
      removeEventListener2(window, "resize", handleWindowResize);
    }
  };
  const renderBackdrop = (backdropProps) => (() => {
    const _el$ = _tmpl$$d.cloneNode(true);
    spread(_el$, mergeProps(backdropProps, {
      get ["class"]() {
        return classNames(`${bsPrefix}-backdrop`, local.backdropClass, !local.animation && "show");
      }
    }), false, false);
    return _el$;
  })();
  const baseModalStyle = () => {
    let s = {
      ...local.style,
      ...modalStyle()
    };
    if (!local.animation) {
      s.display = "block";
    }
    return s;
  };
  const renderDialog = (dialogProps) => (() => {
    const _el$2 = _tmpl$2$4.cloneNode(true);
    spread(_el$2, mergeProps(dialogProps, {
      get style() {
        return baseModalStyle();
      },
      get ["class"]() {
        return classNames(local.class, bsPrefix, animateStaticModal() && `${bsPrefix}-static`);
      },
      get onClick() {
        return local.backdrop ? handleClick : void 0;
      },
      "onMouseUp": handleMouseUp,
      get ["aria-labelledby"]() {
        return local["aria-labelledby"];
      }
    }), false, true);
    insert(_el$2, createComponent(Dynamic, mergeProps({
      get component() {
        return local.dialogAs;
      }
    }, props, {
      onMouseDown: handleDialogMouseDown,
      get ["class"]() {
        return local.dialogClass;
      },
      get contentClass() {
        return local.contentClass;
      },
      get children() {
        return local.children;
      }
    })));
    return _el$2;
  })();
  return createComponent(ModalContext$1.Provider, {
    value: modalContext,
    get children() {
      return createComponent(Modal$1, {
        get show() {
          return local.show;
        },
        ref: mergedRef,
        get backdrop() {
          return local.backdrop;
        },
        get container() {
          return local.container;
        },
        keyboard: true,
        get autoFocus() {
          return local.autoFocus;
        },
        get enforceFocus() {
          return local.enforceFocus;
        },
        get restoreFocus() {
          return local.restoreFocus;
        },
        get restoreFocusOptions() {
          return local.restoreFocusOptions;
        },
        onEscapeKeyDown: handleEscapeKeyDown,
        get onShow() {
          return local.onShow;
        },
        get onHide() {
          return local.onHide;
        },
        onEnter: handleEnter,
        onEntering: handleEntering,
        get onEntered() {
          return local.onEntered;
        },
        onExit: handleExit,
        get onExiting() {
          return local.onExiting;
        },
        onExited: handleExited,
        get manager() {
          return getModalManager();
        },
        get transition() {
          return local.animation ? DialogTransition$1 : void 0;
        },
        get backdropTransition() {
          return local.animation ? BackdropTransition$1 : void 0;
        },
        renderBackdrop,
        renderDialog
      });
    }
  });
};
var Modal$12 = Object.assign(Modal2, {
  Body: ModalBody,
  Header: ModalHeader$1,
  Title: ModalTitle,
  Footer: ModalFooter,
  Dialog: ModalDialog$1,
  TRANSITION_DURATION: 300,
  BACKDROP_TRANSITION_DURATION: 150
});
var NavItem2 = createWithBsPrefix("nav-item");
var defaultProps$s = {
  as: Anchor$1,
  disabled: false
};
var NavLink = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$s, p), ["as", "bsPrefix", "class", "active", "eventKey"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "nav-link");
  const [navItemProps, meta] = useNavItem(mergeProps({
    get key() {
      return makeEventKey(local.eventKey, props.href);
    },
    get active() {
      return local.active;
    }
  }, props));
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, navItemProps, {
    get ["class"]() {
      return classNames(local.class, bsPrefix, props.disabled && "disabled", meta.isActive && "active");
    }
  }));
};
var NavLink$1 = NavLink;
var defaultProps$r = {
  as: "div",
  justify: false,
  fill: false
};
var Nav2 = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$r, p), ["as", "activeKey", "defaultActiveKey", "bsPrefix", "variant", "fill", "justify", "navbar", "navbarScroll", "class", "onSelect"]);
  const [activeKey, onSelect] = createControlledProp(() => local.activeKey, () => local.defaultActiveKey, local.onSelect);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "nav");
  let navbarBsPrefix;
  let cardHeaderBsPrefix;
  let isNavbar = false;
  const navbarContext = useContext(NavbarContext);
  const cardHeaderContext = useContext(CardHeaderContext);
  if (navbarContext) {
    navbarBsPrefix = navbarContext.bsPrefix;
    isNavbar = local.navbar == null ? true : local.navbar;
  } else if (cardHeaderContext) {
    ({
      cardHeaderBsPrefix
    } = cardHeaderContext);
  }
  return createComponent(Nav$1, mergeProps({
    get as() {
      return local.as;
    },
    get activeKey() {
      return activeKey();
    },
    onSelect,
    get ["class"]() {
      return classNames(local.class, {
        [bsPrefix]: !isNavbar,
        [`${navbarBsPrefix}-nav`]: isNavbar,
        [`${navbarBsPrefix}-nav-scroll`]: isNavbar && local.navbarScroll,
        [`${cardHeaderBsPrefix}-${local.variant}`]: !!cardHeaderBsPrefix,
        [`${bsPrefix}-${local.variant}`]: !!local.variant,
        [`${bsPrefix}-fill`]: local.fill,
        [`${bsPrefix}-justified`]: local.justify
      });
    }
  }, props));
};
var Nav$12 = Object.assign(Nav2, {
  Item: NavItem2,
  Link: NavLink$1
});
var defaultProps$q = {};
var NavbarBrand = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$q, p), ["as", "bsPrefix", "class"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "navbar-brand");
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as || (props.href ? "a" : "span");
    }
  }, props, {
    get ["class"]() {
      return classNames(local.class, bsPrefix);
    }
  }));
};
var NavbarBrand$1 = NavbarBrand;
var _tmpl$$c = template(`<div></div>`, 2);
var defaultProps$p = {};
var NavbarCollapse = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$p, p), ["bsPrefix", "class", "children", "ref"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "navbar-collapse");
  const context2 = useContext(NavbarContext);
  return createComponent(Collapse$1, mergeProps({
    get ["in"]() {
      return !!(context2 == null ? void 0 : context2.expanded);
    }
  }, props, {
    get children() {
      const _el$ = _tmpl$$c.cloneNode(true);
      const _ref$ = local.ref;
      typeof _ref$ === "function" ? use(_ref$, _el$) : local.ref = _el$;
      insert(_el$, () => local.children);
      createRenderEffect(() => className(_el$, classNames(bsPrefix, local.class)));
      return _el$;
    }
  }));
};
var NavbarCollapse$1 = NavbarCollapse;
var _tmpl$$b = template(`<span></span>`, 2);
var defaultProps$o = {
  as: "button",
  label: "Toggle navigation"
};
var NavbarToggle = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$o, p), ["as", "bsPrefix", "class", "children", "label", "onClick"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "navbar-toggler");
  const context2 = useContext(NavbarContext);
  const handleClick = (e) => {
    var _a;
    callEventHandler(local.onClick, e);
    (_a = context2 == null ? void 0 : context2.onToggle) == null ? void 0 : _a.call(context2);
  };
  if (local.as === "button") {
    props.type = "button";
  }
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, {
    get type() {
      return local.as === "button" ? "button" : void 0;
    },
    onClick: handleClick,
    get ["aria-label"]() {
      return local.label;
    },
    get ["class"]() {
      return classNames(local.class, bsPrefix, !(context2 == null ? void 0 : context2.expanded) && "collapsed");
    },
    get children() {
      return local.children || (() => {
        const _el$ = _tmpl$$b.cloneNode(true);
        className(_el$, `${bsPrefix}-icon`);
        return _el$;
      })();
    }
  }));
};
var NavbarToggle$1 = NavbarToggle;
var OffcanvasBody = createWithBsPrefix("offcanvas-body");
var defaultProps$n = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false
};
var transitionStyles = {
  [ENTERING]: "show",
  [ENTERED]: "show"
};
var OffcanvasToggling = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$n, p), ["bsPrefix", "class", "children"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "offcanvas");
  const resolvedChildren = children(() => local.children);
  let prevClasses;
  return createComponent(TransitionWrapper$1, mergeProps({
    addEndListener: transitionEndListener
  }, props, {
    children: (status, innerProps) => {
      const el = resolvedChildren();
      innerProps.ref(el);
      const newClasses = classNames(
        local.class,
        (status === ENTERING || status === EXITING) && `${bsPrefix}-toggling`,
        // @ts-ignore
        transitionStyles[status]
      );
      resolveClasses(el, prevClasses, newClasses);
      prevClasses = newClasses;
      return el;
    }
  }));
};
var OffcanvasToggling$1 = OffcanvasToggling;
var defaultProps$m = {
  closeLabel: "Close",
  closeButton: false
};
var OffcanvasHeader = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$m, p), ["bsPrefix", "class"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "offcanvas-header");
  return createComponent(AbstractModalHeader$1, mergeProps(props, {
    get ["class"]() {
      return classNames(local.class, bsPrefix);
    }
  }));
};
var OffcanvasHeader$1 = OffcanvasHeader;
var DivStyledAsH5 = divWithClass("h5");
var OffcanvasTitle = createWithBsPrefix("offcanvas-title", {
  Component: DivStyledAsH5
});
var _tmpl$$a = template(`<div></div>`, 2);
var _tmpl$2$3 = template(`<div role="dialog"></div>`, 2);
var defaultProps$l = {
  show: false,
  backdrop: true,
  keyboard: true,
  scroll: false,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  placement: "start"
};
function DialogTransition(props) {
  return createComponent(OffcanvasToggling$1, props);
}
function BackdropTransition(props) {
  return createComponent(Fade$1, props);
}
var Offcanvas = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$l, p), [
    "bsPrefix",
    "class",
    "children",
    "aria-labelledby",
    "placement",
    /*BaseModal props */
    "show",
    "backdrop",
    "keyboard",
    "scroll",
    "onEscapeKeyDown",
    "onShow",
    "onHide",
    "container",
    "autoFocus",
    "enforceFocus",
    "restoreFocus",
    "restoreFocusOptions",
    "onEntered",
    "onExit",
    "onExiting",
    "onEnter",
    "onEntering",
    "onExited",
    "backdropClass",
    "manager",
    "ref"
  ]);
  let modalManager;
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "offcanvas");
  const navbarContext = useContext(NavbarContext);
  const handleHide = () => {
    var _a, _b;
    (_a = navbarContext == null ? void 0 : navbarContext.onToggle) == null ? void 0 : _a.call(navbarContext);
    (_b = local.onHide) == null ? void 0 : _b.call(local);
  };
  const modalContext = {
    get onHide() {
      return handleHide;
    }
  };
  function getModalManager() {
    if (local.manager)
      return local.manager;
    if (local.scroll) {
      if (!modalManager)
        modalManager = new BootstrapModalManager({
          handleContainerOverflow: false
        });
      return modalManager;
    }
    return getSharedManager();
  }
  const handleEnter = (node, ...args) => {
    var _a;
    if (node)
      node.style.visibility = "visible";
    (_a = local.onEnter) == null ? void 0 : _a.call(local, node, ...args);
  };
  const handleExited = (node, ...args) => {
    var _a;
    if (node)
      node.style.visibility = "";
    (_a = local.onExited) == null ? void 0 : _a.call(local, ...args);
  };
  const renderBackdrop = (backdropProps) => (() => {
    const _el$ = _tmpl$$a.cloneNode(true);
    spread(_el$, mergeProps(backdropProps, {
      get ["class"]() {
        return classNames(`${bsPrefix}-backdrop`, local.backdropClass);
      }
    }), false, true);
    insert(_el$, () => props.children);
    return _el$;
  })();
  const renderDialog = (dialogProps) => (() => {
    const _el$2 = _tmpl$2$3.cloneNode(true);
    spread(_el$2, mergeProps(dialogProps, props, {
      get ["class"]() {
        return classNames(local.class, bsPrefix, `${bsPrefix}-${local.placement}`);
      },
      get ["aria-labelledby"]() {
        return local["aria-labelledby"];
      }
    }), false, true);
    insert(_el$2, () => local.children);
    return _el$2;
  })();
  return createComponent(ModalContext$1.Provider, {
    value: modalContext,
    get children() {
      return createComponent(Modal$1, {
        get show() {
          return local.show;
        },
        ref(r$) {
          const _ref$ = local.ref;
          typeof _ref$ === "function" ? _ref$(r$) : local.ref = r$;
        },
        get backdrop() {
          return local.backdrop;
        },
        get container() {
          return local.container;
        },
        get keyboard() {
          return local.keyboard;
        },
        get autoFocus() {
          return local.autoFocus;
        },
        get enforceFocus() {
          return local.enforceFocus && !scroll;
        },
        get restoreFocus() {
          return local.restoreFocus;
        },
        get restoreFocusOptions() {
          return local.restoreFocusOptions;
        },
        get onEscapeKeyDown() {
          return local.onEscapeKeyDown;
        },
        get onShow() {
          return local.onShow;
        },
        onHide: handleHide,
        onEnter: handleEnter,
        get onEntering() {
          return local.onEntering;
        },
        get onEntered() {
          return local.onEntered;
        },
        get onExit() {
          return local.onExit;
        },
        get onExiting() {
          return local.onExiting;
        },
        onExited: handleExited,
        get manager() {
          return getModalManager();
        },
        transition: DialogTransition,
        backdropTransition: BackdropTransition,
        renderBackdrop,
        renderDialog
      });
    }
  });
};
var Offcanvas$1 = Object.assign(Offcanvas, {
  Body: OffcanvasBody,
  Header: OffcanvasHeader$1,
  Title: OffcanvasTitle
});
var NavbarOffcanvas = (props) => {
  const context2 = useContext(NavbarContext);
  return createComponent(Offcanvas$1, mergeProps({
    get show() {
      return !!(context2 == null ? void 0 : context2.expanded);
    }
  }, props));
};
var NavbarOffcanvas$1 = NavbarOffcanvas;
var NavbarText = createWithBsPrefix("navbar-text", {
  Component: "span"
});
var defaultProps$k = {
  as: "nav",
  expand: true,
  variant: "light",
  collapseOnSelect: false
};
var Navbar = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$k, p), ["as", "bsPrefix", "expand", "variant", "bg", "fixed", "sticky", "class", "expanded", "defaultExpanded", "onToggle", "onSelect", "collapseOnSelect"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "navbar");
  const [expanded, onToggle] = createControlledProp(() => local.expanded, () => local.defaultExpanded, local.onToggle);
  const handleCollapse = (...args) => {
    var _a;
    (_a = local.onSelect) == null ? void 0 : _a.call(local, ...args);
    if (local.collapseOnSelect && expanded()) {
      onToggle == null ? void 0 : onToggle(false);
    }
  };
  const expandClass = () => {
    let expandClass2 = `${bsPrefix}-expand`;
    if (typeof local.expand === "string")
      expandClass2 = `${expandClass2}-${local.expand}`;
    return expandClass2;
  };
  const navbarContext = {
    get onToggle() {
      return () => onToggle == null ? void 0 : onToggle(!expanded());
    },
    bsPrefix,
    get expanded() {
      return !!expanded();
    }
  };
  return createComponent(NavbarContext.Provider, {
    value: navbarContext,
    get children() {
      return createComponent(SelectableContext$1.Provider, {
        value: handleCollapse,
        get children() {
          return createComponent(Dynamic, mergeProps({
            get component() {
              return local.as;
            }
          }, props, {
            get role() {
              return (
                // will result in some false positives but that seems better
                // than false negatives. strict `undefined` check allows explicit
                // "nulling" of the role if the user really doesn't want one
                props.role === void 0 && local.as !== "nav" ? "Navigation" : props.role
              );
            },
            get ["class"]() {
              return classNames(local.class, bsPrefix, local.expand && expandClass(), local.variant && `${bsPrefix}-${local.variant}`, local.bg && `bg-${local.bg}`, local.sticky && `sticky-${local.sticky}`, local.fixed && `fixed-${local.fixed}`);
            }
          }));
        }
      });
    }
  });
};
var Navbar$1 = Object.assign(Navbar, {
  Brand: NavbarBrand$1,
  Collapse: NavbarCollapse$1,
  Offcanvas: NavbarOffcanvas$1,
  Text: NavbarText,
  Toggle: NavbarToggle$1
});
var NavContext2 = createContext(null);
var NavContext$12 = NavContext2;
var defaultProps$j = {};
var NavDropdown = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$j, p), ["id", "title", "children", "bsPrefix", "class", "rootCloseEvent", "menuRole", "disabled", "active", "renderMenuOnMount", "menuVariant"]);
  const navItemPrefix = useBootstrapPrefix(void 0, "nav-item");
  return createComponent(Dropdown$1, mergeProps(props, {
    get ["class"]() {
      return classNames(local.class, navItemPrefix);
    },
    get children() {
      return [createComponent(Dropdown$1.Toggle, {
        get id() {
          return local.id;
        },
        eventKey: null,
        get active() {
          return local.active;
        },
        get disabled() {
          return local.disabled;
        },
        get childBsPrefix() {
          return local.bsPrefix;
        },
        as: NavLink$1,
        get children() {
          return local.title;
        }
      }), createComponent(Dropdown$1.Menu, {
        get role() {
          return local.menuRole;
        },
        get renderOnMount() {
          return local.renderMenuOnMount;
        },
        get rootCloseEvent() {
          return local.rootCloseEvent;
        },
        get variant() {
          return local.menuVariant;
        },
        get children() {
          return local.children;
        }
      })];
    }
  }));
};
var NavDropdown$1 = Object.assign(NavDropdown, {
  Item: Dropdown$1.Item,
  ItemText: Dropdown$1.ItemText,
  Divider: Dropdown$1.Divider,
  Header: Dropdown$1.Header
});
var OverlayContext = createContext();
var OverlayContext$1 = OverlayContext;
var defaultProps$i = {
  transition: Fade$1,
  rootClose: false,
  show: false,
  placement: "top",
  popperConfig: {}
};
var Overlay2 = (p) => {
  const [local, outerProps] = splitProps(mergeProps(defaultProps$i, p), ["children", "transition", "popperConfig", "ref"]);
  const actualTransition = local.transition === true ? Fade$1 : local.transition || void 0;
  const [wrapperProps, setWrapperProps] = createSignal();
  const [arrowProps, setArrowProps] = createSignal();
  const [metadata, setMetadata] = createSignal();
  const overlayContext = {
    get wrapperProps() {
      var _a;
      return (_a = wrapperProps()) == null ? void 0 : _a();
    },
    get arrowProps() {
      var _a;
      return (_a = arrowProps()) == null ? void 0 : _a();
    },
    get metadata() {
      var _a;
      return (_a = metadata()) == null ? void 0 : _a();
    }
  };
  return createComponent(OverlayContext$1.Provider, {
    value: overlayContext,
    get children() {
      return createComponent(Overlay$1, mergeProps(outerProps, {
        get popperConfig() {
          return local.popperConfig;
        },
        transition: actualTransition,
        children: (wrapperProps2, arrowProps2, metadata2) => {
          batch(() => {
            setWrapperProps(() => wrapperProps2);
            setArrowProps(() => arrowProps2);
            setMetadata(() => metadata2);
          });
          return local.children;
        }
      }));
    }
  });
};
var Overlay$12 = Overlay2;
function contains3(context2, node) {
  if (context2.contains)
    return context2.contains(node);
  if (context2.compareDocumentPosition)
    return context2 === node || !!(context2.compareDocumentPosition(node) & 16);
}
function normalizeDelay(delay) {
  return delay && typeof delay === "object" ? delay : {
    show: delay,
    hide: delay
  };
}
function handleMouseOverOut(handler, args, relatedNative) {
  const [e] = args;
  const target = e.currentTarget;
  const related = e.relatedTarget;
  if ((!related || related !== target) && !contains3(target, related)) {
    handler(...args);
  }
}
var defaultProps$h = {
  defaultShow: false,
  trigger: ["hover", "focus"],
  popperConfig: {}
};
function OverlayTrigger(p) {
  const [local, props] = splitProps(mergeProps(defaultProps$h, {
    flip: p.placement && p.placement.indexOf("auto") !== -1
  }, p), ["trigger", "overlay", "children", "popperConfig", "show", "defaultShow", "onToggle", "delay", "placement", "flip"]);
  let [triggerNodeRef, setTriggerNodeRef] = createSignal();
  let timeout;
  let hoverStateRef = "";
  const [show, setShow] = createControlledProp(() => local.show, () => local.defaultShow, local.onToggle);
  const delay = normalizeDelay(local.delay);
  const handleShow = () => {
    window.clearTimeout(timeout);
    hoverStateRef = "show";
    if (!delay.show) {
      setShow(true);
      return;
    }
    timeout = window.setTimeout(() => {
      if (hoverStateRef === "show")
        setShow(true);
    }, delay.show);
  };
  const handleHide = () => {
    window.clearTimeout(timeout);
    hoverStateRef = "hide";
    if (!delay.hide) {
      setShow(false);
      return;
    }
    timeout = window.setTimeout(() => {
      if (hoverStateRef === "hide")
        setShow(false);
    }, delay.hide);
  };
  const handleFocus = (...args) => {
    handleShow();
  };
  const handleBlur = (...args) => {
    handleHide();
  };
  const handleClick = (...args) => {
    setShow(!show());
  };
  const handleMouseOver = (...args) => {
    handleMouseOverOut(handleShow, args);
  };
  const handleMouseOut = (...args) => {
    handleMouseOverOut(handleHide, args);
  };
  const addListeners = (el) => {
    const triggers = local.trigger == null ? [] : [].concat(local.trigger);
    if (triggers.indexOf("click") !== -1) {
      el.addEventListener("click", handleClick);
    }
    if (triggers.indexOf("focus") !== -1) {
      el.addEventListener("focus", handleFocus);
      el.addEventListener("blur", handleBlur);
    }
    if (triggers.indexOf("hover") !== -1) {
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("mouseout", handleMouseOut);
    }
  };
  const resolvedChildren = children(() => local.children);
  const Target = () => {
    let el = resolvedChildren();
    while (typeof el === "function")
      el = el();
    setTriggerNodeRef(el);
    if (!isServer) {
      addListeners(el);
    }
    return el;
  };
  return [createComponent(Target, {}), createComponent(Overlay$12, mergeProps(props, {
    get show() {
      return show();
    },
    onHide: handleHide,
    get flip() {
      return local.flip;
    },
    get placement() {
      return local.placement;
    },
    get popperConfig() {
      return local.popperConfig;
    },
    target: triggerNodeRef,
    get children() {
      return local.overlay;
    }
  }))];
}
var _tmpl$$9 = template(`<li></li>`, 2);
var _tmpl$2$2 = template(`<span class="visually-hidden"></span>`, 2);
var _tmpl$3 = template(`<span aria-hidden="true"></span>`, 2);
var defaultProps$g = {
  active: false,
  disabled: false,
  activeLabel: "(current)"
};
var PageItem = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$g, p), ["active", "disabled", "class", "style", "activeLabel", "children", "ref"]);
  return (() => {
    const _el$ = _tmpl$$9.cloneNode(true);
    const _ref$ = local.ref;
    typeof _ref$ === "function" ? use(_ref$, _el$) : local.ref = _el$;
    insert(_el$, createComponent(Dynamic, mergeProps({
      get component() {
        return local.active || local.disabled ? "span" : Anchor$1;
      },
      "class": "page-link",
      get disabled() {
        return local.disabled;
      }
    }, props, {
      get children() {
        return [createMemo(() => local.children), createMemo(() => createMemo(() => !!(local.active && local.activeLabel))() && (() => {
          const _el$2 = _tmpl$2$2.cloneNode(true);
          insert(_el$2, () => local.activeLabel);
          return _el$2;
        })())];
      }
    })));
    createRenderEffect((_p$) => {
      const _v$ = local.style, _v$2 = classNames(local.class, "page-item", {
        active: local.active,
        disabled: local.disabled
      });
      _p$._v$ = style(_el$, _v$, _p$._v$);
      _v$2 !== _p$._v$2 && className(_el$, _p$._v$2 = _v$2);
      return _p$;
    }, {
      _v$: void 0,
      _v$2: void 0
    });
    return _el$;
  })();
};
var PageItem$1 = PageItem;
function createButton(name, defaultValue, label = name) {
  function Button3(props) {
    const [_, rest] = splitProps(props, ["children"]);
    return createComponent(PageItem, mergeProps(rest, {
      get children() {
        return [(() => {
          const _el$3 = _tmpl$3.cloneNode(true);
          insert(_el$3, () => props.children || defaultValue);
          return _el$3;
        })(), (() => {
          const _el$4 = _tmpl$2$2.cloneNode(true);
          insert(_el$4, label);
          return _el$4;
        })()];
      }
    }));
  }
  Button3.displayName = name;
  return Button3;
}
var First = createButton("First", "«");
var Prev = createButton("Prev", "‹", "Previous");
var Ellipsis = createButton("Ellipsis", "…", "More");
var Next = createButton("Next", "›");
var Last = createButton("Last", "»");
var _tmpl$$8 = template(`<ul></ul>`, 2);
var defaultProps$f = {};
var Pagination = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$f, p), ["bsPrefix", "class", "size"]);
  const decoratedBsPrefix = useBootstrapPrefix(local.bsPrefix, "pagination");
  return (() => {
    const _el$ = _tmpl$$8.cloneNode(true);
    spread(_el$, mergeProps(props, {
      get ["class"]() {
        return classNames(local.class, decoratedBsPrefix, local.size && `${decoratedBsPrefix}-${local.size}`);
      }
    }), false, false);
    return _el$;
  })();
};
var Pagination$1 = Object.assign(Pagination, {
  First,
  Prev,
  Ellipsis,
  Item: PageItem$1,
  Next,
  Last
});
function usePlaceholder({
  animation,
  bg,
  bsPrefix,
  size: size2,
  ...props
}) {
  bsPrefix = useBootstrapPrefix(bsPrefix, "placeholder");
  const [{
    class: class_,
    ...colProps
  }] = useCol(props);
  return {
    ...colProps,
    class: classNames(class_, animation ? `${bsPrefix}-${animation}` : bsPrefix, size2 && `${bsPrefix}-${size2}`, bg && `bg-${bg}`)
  };
}
var PlaceholderButton = (props) => {
  return createComponent(Button$12, mergeProps(() => usePlaceholder(props), {
    disabled: true,
    tabIndex: -1,
    get children() {
      return props.children;
    }
  }));
};
var PlaceholderButton$1 = PlaceholderButton;
var defaultProps$e = {
  as: "span"
};
var Placeholder = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$e, p), ["as", "children"]);
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, () => usePlaceholder(props), {
    get children() {
      return local.children;
    }
  }));
};
var Placeholder$1 = Object.assign(Placeholder, {
  Button: PlaceholderButton$1
});
var PopoverHeader = createWithBsPrefix("popover-header");
var PopoverBody = createWithBsPrefix("popover-body");
var _tmpl$$7 = template(`<div role="tooltip"><div class="popover-arrow"></div></div>`, 4);
var defaultProps$d = {
  arrowProps: {},
  placement: "right"
};
var Popover = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$d, p), ["bsPrefix", "placement", "class", "style", "children", "body", "arrowProps", "popper", "show"]);
  const decoratedBsPrefix = useBootstrapPrefix(local.bsPrefix, "popover");
  const context2 = useContext(OverlayContext$1);
  const primaryPlacement = () => {
    var _a, _b, _c;
    return (_c = (_b = ((_a = context2 == null ? void 0 : context2.metadata) == null ? void 0 : _a.placement) || local.placement) == null ? void 0 : _b.split("-")) == null ? void 0 : _c[0];
  };
  return (() => {
    const _el$ = _tmpl$$7.cloneNode(true), _el$2 = _el$.firstChild;
    spread(_el$, mergeProps({
      get ["x-placement"]() {
        return primaryPlacement();
      },
      get ["class"]() {
        return classNames(local.class, decoratedBsPrefix, primaryPlacement() && `bs-popover-auto`);
      }
    }, props, () => context2 == null ? void 0 : context2.wrapperProps, {
      get style() {
        var _a;
        return Object.assign({}, local.style, (_a = context2 == null ? void 0 : context2.wrapperProps) == null ? void 0 : _a.style);
      }
    }), false, true);
    spread(_el$2, mergeProps(() => local.arrowProps, () => context2 == null ? void 0 : context2.arrowProps), false, false);
    insert(_el$, (() => {
      const _c$ = createMemo(() => !!local.body);
      return () => _c$() ? createComponent(PopoverBody, {
        get children() {
          return local.children;
        }
      }) : local.children;
    })(), null);
    return _el$;
  })();
};
var Popover$1 = Object.assign(Popover, {
  Header: PopoverHeader,
  Body: PopoverBody
});
var _tmpl$$6 = template(`<div></div>`, 2);
var _tmpl$2$1 = template(`<span class="visually-hidden"></span>`, 2);
var ProgressContext = createContext();
var ROUND_PRECISION = 1e3;
var defaultProps$c = {
  min: 0,
  max: 100,
  animated: false,
  visuallyHidden: false,
  striped: false
};
function getPercentage(now, min2, max2) {
  const percentage = (now - min2) / (max2 - min2) * 100;
  return Math.round(percentage * ROUND_PRECISION) / ROUND_PRECISION;
}
function renderProgressBar(p) {
  const [local, props] = splitProps(p, ["min", "now", "max", "label", "visuallyHidden", "striped", "animated", "class", "style", "variant", "bsPrefix"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "progress");
  return (() => {
    const _el$ = _tmpl$$6.cloneNode(true);
    spread(_el$, mergeProps(props, {
      "role": "progressbar",
      get ["class"]() {
        return classNames(local.class, `${bsPrefix}-bar`, {
          [`bg-${local.variant}`]: local.variant,
          [`${bsPrefix}-bar-animated`]: local.animated,
          [`${bsPrefix}-bar-striped`]: local.animated || local.striped
        });
      },
      get style() {
        return {
          width: `${getPercentage(local.now, local.min, local.max)}%`,
          ...local.style
        };
      },
      get ["aria-valuenow"]() {
        return local.now;
      },
      get ["aria-valuemin"]() {
        return local.min;
      },
      get ["aria-valuemax"]() {
        return local.max;
      }
    }), false, true);
    insert(_el$, (() => {
      const _c$ = createMemo(() => !!local.visuallyHidden);
      return () => _c$() ? (() => {
        const _el$2 = _tmpl$2$1.cloneNode(true);
        insert(_el$2, () => local.label);
        return _el$2;
      })() : local.label;
    })());
    return _el$;
  })();
}
var ProgressBar = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$c, p), ["children", "class", "bsPrefix"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "progress");
  const context2 = useContext(ProgressContext);
  let barProps = props;
  let wrapperProps = {};
  if (!(context2 == null ? void 0 : context2.isStacked)) {
    const [b, w] = splitProps(props, ["min", "now", "max", "label", "visuallyHidden", "striped", "animated", "variant"]);
    barProps = b;
    wrapperProps = w;
  }
  return (context2 == null ? void 0 : context2.isStacked) ? renderProgressBar(barProps) : createComponent(ProgressContext.Provider, {
    value: {
      isStacked: true
    },
    get children() {
      const _el$3 = _tmpl$$6.cloneNode(true);
      spread(_el$3, mergeProps(wrapperProps, {
        get ["class"]() {
          return classNames(local.class, bsPrefix);
        }
      }), false, true);
      insert(_el$3, () => local.children ?? renderProgressBar(barProps));
      return _el$3;
    }
  });
};
var ProgressBar$1 = ProgressBar;
var defaultProps$b = {
  as: "div"
};
var Row = (p) => {
  const breakpoints = useBootstrapBreakpoints();
  const [local, props] = splitProps(mergeProps(defaultProps$b, p), ["as", "bsPrefix", "class", ...breakpoints()]);
  const decoratedBsPrefix = useBootstrapPrefix(local.bsPrefix, "row");
  const sizePrefix = `${decoratedBsPrefix}-cols`;
  const classes = [];
  breakpoints().forEach((brkPoint) => {
    const propValue = local[brkPoint];
    let cols;
    if (propValue != null && typeof propValue === "object") {
      ({
        cols
      } = propValue);
    } else {
      cols = propValue;
    }
    const infix = brkPoint !== "xs" ? `-${brkPoint}` : "";
    if (cols != null)
      classes.push(`${sizePrefix}${infix}-${cols}`);
  });
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, {
    get ["class"]() {
      return classNames(local.class, decoratedBsPrefix, ...classes);
    }
  }));
};
var Row$1 = Row;
var defaultProps$a = {
  as: "div"
};
var Spinner = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$a, p), ["as", "bsPrefix", "variant", "animation", "size", "class"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "spinner");
  const bsSpinnerPrefix = `${bsPrefix}-${local.animation}`;
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, {
    get ["class"]() {
      return classNames(local.class, bsSpinnerPrefix, local.size && `${bsSpinnerPrefix}-${local.size}`, local.variant && `text-${local.variant}`);
    }
  }));
};
var Spinner$1 = Spinner;
var _tmpl$$5 = template(`<span class="visually-hidden"></span>`, 2);
var defaultProps$9 = {
  toggleLabel: "Toggle dropdown",
  type: "button"
};
var SplitButton = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$9, p), ["id", "bsPrefix", "size", "variant", "title", "type", "toggleLabel", "children", "onClick", "href", "target", "menuRole", "renderMenuOnMount", "rootCloseEvent"]);
  return createComponent(Dropdown$1, mergeProps(props, {
    as: ButtonGroup$1,
    get children() {
      return [createComponent(Button$12, {
        get size() {
          return local.size;
        },
        get variant() {
          return local.variant;
        },
        get disabled() {
          return props.disabled;
        },
        get bsPrefix() {
          return local.bsPrefix;
        },
        get href() {
          return local.href;
        },
        get target() {
          return local.target;
        },
        get onClick() {
          return local.onClick;
        },
        get type() {
          return local.type;
        },
        get children() {
          return local.title;
        }
      }), createComponent(Dropdown$1.Toggle, {
        split: true,
        get id() {
          return local.id;
        },
        get size() {
          return local.size;
        },
        get variant() {
          return local.variant;
        },
        get disabled() {
          return props.disabled;
        },
        get childBsPrefix() {
          return local.bsPrefix;
        },
        get children() {
          const _el$ = _tmpl$$5.cloneNode(true);
          insert(_el$, () => local.toggleLabel);
          return _el$;
        }
      }), createComponent(Dropdown$1.Menu, {
        get role() {
          return local.menuRole;
        },
        get renderOnMount() {
          return local.renderMenuOnMount;
        },
        get rootCloseEvent() {
          return local.rootCloseEvent;
        },
        get children() {
          return local.children;
        }
      })];
    }
  }));
};
var SplitButton$1 = SplitButton;
function createUtilityClass(utilityValues, breakpoints = DEFAULT_BREAKPOINTS) {
  const classes = [];
  Object.entries(utilityValues).forEach(([utilName, utilValue]) => {
    if (utilValue != null) {
      if (typeof utilValue === "object") {
        breakpoints.forEach((brkPoint) => {
          const bpValue = utilValue[brkPoint];
          if (bpValue != null) {
            const infix = brkPoint !== "xs" ? `-${brkPoint}` : "";
            classes.push(`${utilName}${infix}-${bpValue}`);
          }
        });
      } else {
        classes.push(`${utilName}-${utilValue}`);
      }
    }
  });
  return classes;
}
var defaultProps$8 = {
  as: "div"
};
var Stack = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$8, p), ["as", "bsPrefix", "class", "direction", "gap"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, local.direction === "horizontal" ? "hstack" : "vstack");
  const breakpoints = useBootstrapBreakpoints();
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, {
    get ["class"]() {
      return classNames(local.class, bsPrefix, ...createUtilityClass({
        gap: local.gap,
        breakpoints: breakpoints()
      }));
    }
  }));
};
var Stack$1 = Stack;
function getTabTransitionComponent(transition) {
  if (typeof transition === "boolean") {
    return transition ? Fade$1 : void 0;
  }
  return transition;
}
var defaultProps$7 = {};
var TabContainer = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$7, p), ["transition"]);
  return createComponent(Tabs$1, mergeProps(props, {
    get transition() {
      return getTabTransitionComponent(local.transition);
    }
  }));
};
var TabContainer$1 = TabContainer;
var TabContent = createWithBsPrefix("tab-content");
var defaultProps$6 = {};
var TabPane = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$6, p), ["bsPrefix", "transition"]);
  const [panelProps, meta] = useTabPanel(mergeProps(props, {
    get transition() {
      return getTabTransitionComponent(local.transition);
    }
  }));
  const [panelLocal, rest] = splitProps(panelProps, ["as", "class", "mountOnEnter", "unmountOnExit"]);
  const prefix = useBootstrapPrefix(local.bsPrefix, "tab-pane");
  const Transition2 = meta.transition || Fade$1;
  return createComponent(TabContext$1.Provider, {
    value: null,
    get children() {
      return createComponent(SelectableContext$1.Provider, {
        value: null,
        get children() {
          return createComponent(Transition2, {
            get ["in"]() {
              return meta.isActive;
            },
            get onEnter() {
              return meta.onEnter;
            },
            get onEntering() {
              return meta.onEntering;
            },
            get onEntered() {
              return meta.onEntered;
            },
            get onExit() {
              return meta.onExit;
            },
            get onExiting() {
              return meta.onExiting;
            },
            get onExited() {
              return meta.onExited;
            },
            get mountOnEnter() {
              return meta.mountOnEnter;
            },
            get unmountOnExit() {
              return meta.unmountOnExit;
            },
            get children() {
              return createComponent(Dynamic, mergeProps({
                get component() {
                  return panelLocal.as ?? "div";
                }
              }, rest, {
                ref(r$) {
                  const _ref$ = props.ref;
                  typeof _ref$ === "function" ? _ref$(r$) : props.ref = r$;
                },
                get ["class"]() {
                  return classNames(panelLocal.class, prefix, meta.isActive && "active");
                }
              }));
            }
          });
        }
      });
    }
  });
};
var TabPane$1 = TabPane;
var Tab = (props) => {
  return props;
};
var Tab$1 = Object.assign(Tab, {
  Container: TabContainer$1,
  Content: TabContent,
  Pane: TabPane$1
});
var _tmpl$$4 = template(`<table></table>`, 2);
var _tmpl$2 = template(`<div></div>`, 2);
var defaultProps$5 = {};
var Table = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$5, p), ["bsPrefix", "class", "striped", "bordered", "borderless", "hover", "size", "variant", "responsive"]);
  const decoratedBsPrefix = useBootstrapPrefix(local.bsPrefix, "table");
  const classes = () => classNames(local.class, decoratedBsPrefix, local.variant && `${decoratedBsPrefix}-${local.variant}`, local.size && `${decoratedBsPrefix}-${local.size}`, local.striped && `${decoratedBsPrefix}-striped`, local.bordered && `${decoratedBsPrefix}-bordered`, local.borderless && `${decoratedBsPrefix}-borderless`, local.hover && `${decoratedBsPrefix}-hover`);
  const table = () => (() => {
    const _el$ = _tmpl$$4.cloneNode(true);
    spread(_el$, mergeProps(props, {
      get ["class"]() {
        return classes();
      }
    }), false, false);
    return _el$;
  })();
  if (local.responsive) {
    let responsiveClass = `${decoratedBsPrefix}-responsive`;
    if (typeof local.responsive === "string") {
      responsiveClass = `${responsiveClass}-${local.responsive}`;
    }
    return (() => {
      const _el$2 = _tmpl$2.cloneNode(true);
      className(_el$2, responsiveClass);
      insert(_el$2, table);
      return _el$2;
    })();
  }
  return table;
};
var Table$1 = Table;
var defaultProps$4 = {
  variant: "tabs",
  mountOnEnter: false,
  unmountOnExit: false
};
function getDefaultActiveKey(tabs) {
  let defaultActiveKey = void 0;
  tabs.forEach((tab) => {
    if (defaultActiveKey == null) {
      defaultActiveKey = tab.eventKey;
    }
  });
  return defaultActiveKey;
}
function RenderTab(props) {
  if (props.title == null) {
    return null;
  }
  return createComponent(NavItem2, {
    as: "li",
    role: "presentation",
    get children() {
      return createComponent(NavLink$1, mergeProps({
        as: "button",
        type: "button",
        get eventKey() {
          return props.eventKey;
        },
        get disabled() {
          return props.disabled;
        },
        get id() {
          return props.id;
        },
        get ["class"]() {
          return props.tabClass;
        }
      }, () => props.tabAttrs || {}, {
        get children() {
          return props.title;
        }
      }));
    }
  });
}
var Tabs2 = (p) => {
  const tabsAccessor = children(() => p.children);
  const tabs = createMemo(() => {
    const t = tabsAccessor();
    return Array.isArray(t) ? t : [t];
  });
  const [local, props] = splitProps(mergeProps({
    get activeKey() {
      return getDefaultActiveKey(tabs());
    }
  }, defaultProps$4, p), ["id", "onSelect", "transition", "mountOnEnter", "unmountOnExit", "children", "activeKey", "defaultActiveKey", "mountOnEnter"]);
  const [activeKey, onSelect] = createControlledProp(() => p.activeKey, () => p.defaultActiveKey ?? local.defaultActiveKey, local.onSelect);
  return createComponent(Tabs$1, {
    get id() {
      return local.id;
    },
    get activeKey() {
      return activeKey();
    },
    onSelect,
    get transition() {
      return getTabTransitionComponent(local.transition);
    },
    get mountOnEnter() {
      return local.mountOnEnter;
    },
    get unmountOnExit() {
      return local.unmountOnExit;
    },
    get children() {
      return [createComponent(Nav$12, mergeProps(props, {
        role: "tablist",
        as: "ul",
        get children() {
          return createComponent(For, {
            get each() {
              return tabs();
            },
            children: (tabProps) => createComponent(RenderTab, tabProps)
          });
        }
      })), createComponent(TabContent, {
        get children() {
          return createComponent(For, {
            get each() {
              return tabs();
            },
            children: (tabProps) => {
              const [_, childProps] = splitProps(tabProps, ["title", "disabled", "tabClass", "tabAttrs"]);
              return createComponent(TabPane$1, childProps);
            }
          });
        }
      })];
    }
  });
};
var Tabs$12 = Tabs2;
var fadeStyles = {
  [ENTERING]: "showing",
  [EXITING]: "showing show"
};
var ToastFade = (props) => createComponent(Fade$1, mergeProps(props, {
  transitionClasses: fadeStyles
}));
var ToastFade$1 = ToastFade;
var ToastContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose() {
  }
});
var ToastContext$1 = ToastContext;
var _tmpl$$3 = template(`<div></div>`, 2);
var defaultProps$32 = {
  closeLabel: "Close",
  closeButton: true
};
var ToastHeader = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$32, p), ["bsPrefix", "closeLabel", "closeVariant", "closeButton", "class", "children"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "toast-header");
  const context2 = useContext(ToastContext$1);
  const handleClick = (e) => {
    var _a;
    (_a = context2 == null ? void 0 : context2.onClose) == null ? void 0 : _a.call(context2, e);
  };
  return (() => {
    const _el$ = _tmpl$$3.cloneNode(true);
    spread(_el$, mergeProps(props, {
      get ["class"]() {
        return classNames(bsPrefix, local.class);
      }
    }), false, true);
    insert(_el$, () => local.children, null);
    insert(_el$, (() => {
      const _c$ = createMemo(() => !!local.closeButton);
      return () => _c$() && createComponent(CloseButton$1, {
        get ["aria-label"]() {
          return local.closeLabel;
        },
        get variant() {
          return local.closeVariant;
        },
        onClick: handleClick,
        "data-dismiss": "toast"
      });
    })(), null);
    return _el$;
  })();
};
var ToastHeader$1 = ToastHeader;
var ToastBody = createWithBsPrefix("toast-body");
var _tmpl$$2 = template(`<div></div>`, 2);
var defaultProps$22 = {
  transition: ToastFade$1,
  show: true,
  animation: true,
  delay: 5e3,
  autohide: false
};
var Toast = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$22, p), ["bsPrefix", "class", "transition", "show", "animation", "delay", "autohide", "onClose", "bg"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "toast");
  let delayRef = local.delay;
  let onCloseRef = local.onClose;
  createEffect(() => {
    delayRef = local.delay;
    onCloseRef = local.onClose;
  });
  let autohideTimeout;
  const autohideToast = createMemo(() => !!(local.autohide && local.show));
  const autohideFunc = createMemo(() => () => {
    if (autohideToast()) {
      onCloseRef == null ? void 0 : onCloseRef();
    }
  });
  createEffect(() => {
    if (autohideToast()) {
      window.clearTimeout(autohideTimeout);
      autohideTimeout = window.setTimeout(autohideFunc(), delayRef);
    }
  });
  onCleanup(() => {
    window.clearTimeout(autohideTimeout);
  });
  const toastContext = {
    get onClose() {
      return local.onClose;
    }
  };
  const hasAnimation = !!(local.transition && local.animation);
  const Transition2 = local.transition;
  const ToastInner = () => (() => {
    const _el$ = _tmpl$$2.cloneNode(true);
    spread(_el$, mergeProps(props, {
      get ["class"]() {
        return classNames(bsPrefix, local.class, local.bg && `bg-${local.bg}`, !hasAnimation && (local.show ? "show" : "hide"));
      },
      "role": "alert",
      "aria-live": "assertive",
      "aria-atomic": "true"
    }), false, false);
    return _el$;
  })();
  return createComponent(ToastContext$1.Provider, {
    value: toastContext,
    get children() {
      return createMemo(() => !!(hasAnimation && local.transition))() ? createComponent(Transition2, {
        appear: true,
        get ["in"]() {
          return local.show;
        },
        unmountOnExit: true,
        get children() {
          return createComponent(ToastInner, {});
        }
      }) : createComponent(ToastInner, {});
    }
  });
};
var Toast$1 = Object.assign(Toast, {
  Body: ToastBody,
  Header: ToastHeader$1
});
var positionClasses = {
  "top-start": "top-0 start-0",
  "top-center": "top-0 start-50 translate-middle-x",
  "top-end": "top-0 end-0",
  "middle-start": "top-50 start-0 translate-middle-y",
  "middle-center": "top-50 start-50 translate-middle",
  "middle-end": "top-50 end-0 translate-middle-y",
  "bottom-start": "bottom-0 start-0",
  "bottom-center": "bottom-0 start-50 translate-middle-x",
  "bottom-end": "bottom-0 end-0"
};
var defaultProps$110 = {
  as: "div"
};
var ToastContainer = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps$110, p), ["as", "bsPrefix", "position", "class"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "toast-container");
  return createComponent(Dynamic, mergeProps({
    get component() {
      return local.as;
    }
  }, props, {
    get ["class"]() {
      return classNames(bsPrefix, local.position && `position-absolute ${positionClasses[local.position]}`, local.class);
    }
  }));
};
var ToastContainer$1 = ToastContainer;
var _tmpl$$12 = template(`<input autocomplete="off">`, 1);
var noop3 = () => void 0;
var ToggleButton = (p) => {
  const [local, props] = splitProps(p, ["bsPrefix", "name", "class", "checked", "type", "onChange", "value", "disabled", "id", "inputRef"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "btn-check");
  return [(() => {
    const _el$ = _tmpl$$12.cloneNode(true);
    addEventListener(_el$, "change", local.onChange || noop3);
    const _ref$ = local.inputRef;
    typeof _ref$ === "function" ? use(_ref$, _el$) : local.inputRef = _el$;
    className(_el$, bsPrefix);
    createRenderEffect((_p$) => {
      const _v$ = local.name, _v$2 = local.type, _v$3 = !!local.disabled, _v$4 = local.id;
      _v$ !== _p$._v$ && setAttribute(_el$, "name", _p$._v$ = _v$);
      _v$2 !== _p$._v$2 && setAttribute(_el$, "type", _p$._v$2 = _v$2);
      _v$3 !== _p$._v$3 && (_el$.disabled = _p$._v$3 = _v$3);
      _v$4 !== _p$._v$4 && setAttribute(_el$, "id", _p$._v$4 = _v$4);
      return _p$;
    }, {
      _v$: void 0,
      _v$2: void 0,
      _v$3: void 0,
      _v$4: void 0
    });
    createRenderEffect(() => _el$.value = local.value);
    createRenderEffect(() => _el$.checked = !!local.checked);
    return _el$;
  })(), createComponent(Button$12, mergeProps(props, {
    get ["class"]() {
      return classNames(local.class, local.disabled && "disabled");
    },
    type: void 0,
    role: void 0,
    as: "label",
    get htmlFor() {
      return local.id;
    }
  }))];
};
var ToggleButton$1 = ToggleButton;
var _tmpl$6 = template(`<div role="tooltip"><div class="tooltip-arrow"></div><div></div></div>`, 6);
var defaultProps3 = {
  arrowProps: {},
  placement: "right"
};
var Tooltip = (p) => {
  const [local, props] = splitProps(mergeProps(defaultProps3, p), ["bsPrefix", "placement", "class", "style", "children", "arrowProps", "popper", "show"]);
  const bsPrefix = useBootstrapPrefix(local.bsPrefix, "tooltip");
  const context2 = useContext(OverlayContext$1);
  const primaryPlacement = () => {
    var _a, _b, _c;
    return (_c = (_b = ((_a = context2 == null ? void 0 : context2.metadata) == null ? void 0 : _a.placement) || local.placement) == null ? void 0 : _b.split("-")) == null ? void 0 : _c[0];
  };
  return (() => {
    const _el$ = _tmpl$6.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
    spread(_el$, mergeProps({
      get ["x-placement"]() {
        return primaryPlacement();
      },
      get ["class"]() {
        return classNames(local.class, bsPrefix, `bs-tooltip-auto`);
      }
    }, props, () => context2 == null ? void 0 : context2.wrapperProps, {
      get style() {
        return Object.assign({}, local.style, context2 == null ? void 0 : context2.wrapperProps.style);
      }
    }), false, true);
    spread(_el$2, mergeProps(() => local.arrowProps, () => context2 == null ? void 0 : context2.arrowProps), false, false);
    className(_el$3, `${bsPrefix}-inner`);
    insert(_el$3, () => local.children);
    return _el$;
  })();
};
var Tooltip$1 = Tooltip;
export {
  Accordion$1 as Accordion,
  AccordionBody$1 as AccordionBody,
  AccordionButton$1 as AccordionButton,
  AccordionCollapse$1 as AccordionCollapse,
  AccordionContext,
  AccordionHeader$1 as AccordionHeader,
  AccordionItem$1 as AccordionItem,
  AccordionItemContext,
  Alert$1 as Alert,
  Anchor$1 as Anchor,
  Badge$1 as Badge,
  BootstrapModalManager$1 as BootstrapModalManager,
  Breadcrumb$1 as Breadcrumb,
  BreadcrumbItem$1 as BreadcrumbItem,
  Button$12 as Button,
  ButtonGroup$1 as ButtonGroup,
  ButtonToolbar$1 as ButtonToolbar,
  Card$1 as Card,
  CardGroup,
  CardHeader$1 as CardHeader,
  CardHeaderContext,
  CardImg$1 as CardImg,
  Carousel$1 as Carousel,
  CarouselCaption,
  CarouselItem$1 as CarouselItem,
  CloseButton$1 as CloseButton,
  Col$1 as Col,
  Collapse$1 as Collapse,
  Container$1 as Container,
  Dropdown$1 as Dropdown,
  DropdownButton$1 as DropdownButton,
  DropdownContext$12 as DropdownContext,
  DropdownItem$12 as DropdownItem,
  DropdownMenu$1 as DropdownMenu,
  DropdownToggle$1 as DropdownToggle,
  Fade$1 as Fade,
  Feedback$1 as Feedback,
  Figure$1 as Figure,
  FigureCaption$1 as FigureCaption,
  FigureImage$1 as FigureImage,
  FloatingLabel$1 as FloatingLabel,
  Form$1 as Form,
  FormCheck$1 as FormCheck,
  FormCheckInput$1 as FormCheckInput,
  FormCheckLabel$1 as FormCheckLabel,
  FormContext$1 as FormContext,
  FormControl$1 as FormControl,
  FormFloating,
  FormGroup$1 as FormGroup,
  FormLabel$1 as FormLabel,
  FormRange$1 as FormRange,
  FormSelect$1 as FormSelect,
  FormText$1 as FormText,
  Image$1 as Image,
  InputGroup$1 as InputGroup,
  InputGroupContext,
  ListGroup$1 as ListGroup,
  ListGroupItem$1 as ListGroupItem,
  Modal$12 as Modal,
  ModalBody,
  ModalContext$1 as ModalContext,
  ModalDialog$1 as ModalDialog,
  ModalFooter,
  ModalHeader$1 as ModalHeader,
  ModalTitle,
  Nav$12 as Nav,
  NavContext$12 as NavContext,
  NavDropdown$1 as NavDropdown,
  NavItem2 as NavItem,
  NavLink$1 as NavLink,
  Navbar$1 as Navbar,
  NavbarBrand$1 as NavbarBrand,
  NavbarCollapse$1 as NavbarCollapse,
  NavbarContext,
  NavbarOffcanvas$1 as NavbarOffcanvas,
  NavbarToggle$1 as NavbarToggle,
  Offcanvas$1 as Offcanvas,
  OffcanvasBody,
  OffcanvasHeader$1 as OffcanvasHeader,
  OffcanvasTitle,
  OffcanvasToggling$1 as OffcanvasToggling,
  Overlay$12 as Overlay,
  OverlayContext$1 as OverlayContext,
  OverlayTrigger,
  PageItem$1 as PageItem,
  Pagination$1 as Pagination,
  Placeholder$1 as Placeholder,
  PlaceholderButton$1 as PlaceholderButton,
  Popover$1 as Popover,
  PopoverBody,
  PopoverHeader,
  ProgressBar$1 as ProgressBar,
  Row$1 as Row,
  Spinner$1 as Spinner,
  SplitButton$1 as SplitButton,
  Stack$1 as Stack,
  Switch$1 as Switch,
  Tab$1 as Tab,
  TabContainer$1 as TabContainer,
  TabContent,
  TabPane$1 as TabPane,
  Table$1 as Table,
  Tabs$12 as Tabs,
  ThemeProvider,
  Toast$1 as Toast,
  ToastBody,
  ToastContainer$1 as ToastContainer,
  ToastContext$1 as ToastContext,
  ToastFade$1 as ToastFade,
  ToastHeader$1 as ToastHeader,
  ToggleButton$1 as ToggleButton,
  Tooltip$1 as Tooltip,
  TransitionWrapper$1 as TransitionWrapper
};
//# sourceMappingURL=solid-bootstrap.js.map
