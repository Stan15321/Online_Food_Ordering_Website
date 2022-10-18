(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
        ? factory(exports, require("jquery"), require("popper.js"))
        : typeof define === "function" && define.amd
        ? define(["exports", "jquery", "popper.js"], factory)
        : ((global = global || self),
          factory((global.bootstrap = {}), global.jQuery, global.Popper));
})(this, function (exports, $, Popper) {
    "use strict";

    $ = $ && $.hasOwnProperty("default") ? $["default"] : $;
    Popper =
        Popper && Popper.hasOwnProperty("default") ? Popper["default"] : Popper;

    function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }

    function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps) _defineProperties(Constructor.prototype, protoProps);
        if (staticProps) _defineProperties(Constructor, staticProps);
        return Constructor;
    }

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true,
            });
        } else {
            obj[key] = value;
        }

        return obj;
    }
    function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i] != null ? arguments[i] : {};
            var ownKeys = Object.keys(source);

            if (typeof Object.getOwnPropertySymbols === "function") {
                ownKeys = ownKeys.concat(
                    Object.getOwnPropertySymbols(source).filter(function (sym) {
                        return Object.getOwnPropertyDescriptor(
                            source,
                            sym
                        ).enumerable;
                    })
                );
            }

            ownKeys.forEach(function (key) {
                _defineProperty(target, key, source[key]);
            });
        }

        return target;
    }

    function _inheritsLoose(subClass, superClass) {
        subClass.prototype = Object.create(superClass.prototype);
        subClass.prototype.constructor = subClass;
        subClass.__proto__ = superClass;
    }

   
    var TRANSITION_END = "transitionend";
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) {
        return {}.toString
            .call(obj)
            .match(/\s([a-z]+)/i)[1]
            .toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
        return {
            bindType: TRANSITION_END,
            delegateType: TRANSITION_END,
            handle: function handle(event) {
                if ($(event.target).is(this)) {
                    return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
                }

                return undefined; // eslint-disable-line no-undefined
            },
        };
    }

    function transitionEndEmulator(duration) {
        var _this = this;

        var called = false;
        $(this).one(Util.TRANSITION_END, function () {
            called = true;
        });
        setTimeout(function () {
            if (!called) {
                Util.triggerTransitionEnd(_this);
            }
        }, duration);
        return this;
    }

    function setTransitionEndSupport() {
        $.fn.emulateTransitionEnd = transitionEndEmulator;
        $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */

    var Util = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function getUID(prefix) {
            do {
                // eslint-disable-next-line no-bitwise
                prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
            } while (document.getElementById(prefix));

            return prefix;
        },
        getSelectorFromElement: function getSelectorFromElement(element) {
            var selector = element.getAttribute("data-target");

            if (!selector || selector === "#") {
                var hrefAttr = element.getAttribute("href");
                selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : "";
            }

            try {
                return document.querySelector(selector) ? selector : null;
            } catch (err) {
                return null;
            }
        },
        getTransitionDurationFromElement: function getTransitionDurationFromElement(
            element
        ) {
            if (!element) {
                return 0;
            } // Get transition-duration of the element

            var transitionDuration = $(element).css("transition-duration");
            var transitionDelay = $(element).css("transition-delay");
            var floatTransitionDuration = parseFloat(transitionDuration);
            var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

            if (!floatTransitionDuration && !floatTransitionDelay) {
                return 0;
            } // If multiple durations are defined, take the first

            transitionDuration = transitionDuration.split(",")[0];
            transitionDelay = transitionDelay.split(",")[0];
            return (
                (parseFloat(transitionDuration) + parseFloat(transitionDelay)) *
                MILLISECONDS_MULTIPLIER
            );
        },
        reflow: function reflow(element) {
            return element.offsetHeight;
        },
        triggerTransitionEnd: function triggerTransitionEnd(element) {
            $(element).trigger(TRANSITION_END);
        },
        // TODO: Remove in v5
        supportsTransitionEnd: function supportsTransitionEnd() {
            return Boolean(TRANSITION_END);
        },
        isElement: function isElement(obj) {
            return (obj[0] || obj).nodeType;
        },
        typeCheckConfig: function typeCheckConfig(
            componentName,
            config,
            configTypes
        ) {
            for (var property in configTypes) {
                if (
                    Object.prototype.hasOwnProperty.call(configTypes, property)
                ) {
                    var expectedTypes = configTypes[property];
                    var value = config[property];
                    var valueType =
                        value && Util.isElement(value)
                            ? "element"
                            : toType(value);

                    if (!new RegExp(expectedTypes).test(valueType)) {
                        throw new Error(
                            componentName.toUpperCase() +
                                ": " +
                                ('Option "' +
                                    property +
                                    '" provided type "' +
                                    valueType +
                                    '" ') +
                                ('but expected type "' + expectedTypes + '".')
                        );
                    }
                }
            }
        },
        findShadowRoot: function findShadowRoot(element) {
            if (!document.documentElement.attachShadow) {
                return null;
            } // Can find the shadow root otherwise it'll return the document

            if (typeof element.getRootNode === "function") {
                var root = element.getRootNode();
                return root instanceof ShadowRoot ? root : null;
            }

            if (element instanceof ShadowRoot) {
                return element;
            } // when we don't find a shadow root

            if (!element.parentNode) {
                return null;
            }

            return Util.findShadowRoot(element.parentNode);
        },
    };
    setTransitionEndSupport();

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

     var NAME = "alert";
     var VERSION = "4.3.1";
     var DATA_KEY = "bs.alert";
     var EVENT_KEY = "." + DATA_KEY;
     var DATA_API_KEY = ".data-api";
     var JQUERY_NO_CONFLICT = $.fn[NAME];
     var Selector = {
         DISMISS: '[data-dismiss="alert"]',
     };
     var Event = {
         CLOSE: "close" + EVENT_KEY,
         CLOSED: "closed" + EVENT_KEY,
         CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
     };
     var ClassName = {
         ALERT: "alert",
         FADE: "fade",
         SHOW: "show",
         /**
          * ------------------------------------------------------------------------
          * Class Definition
          * ------------------------------------------------------------------------
          */
     };
 
     var Alert =
         /*#__PURE__*/
         (function () {
             function Alert(element) {
                 this._element = element;
             } // Getters
 
             var _proto = Alert.prototype;
 
             // Public
             _proto.close = function close(element) {
                 var rootElement = this._element;
 
                 if (element) {
                     rootElement = this._getRootElement(element);
                 }
 
                 var customEvent = this._triggerCloseEvent(rootElement);
 
                 if (customEvent.isDefaultPrevented()) {
                     return;
                 }
 
                 this._removeElement(rootElement);
             };
 
             _proto.dispose = function dispose() {
                 $.removeData(this._element, DATA_KEY);
                 this._element = null;
             }; // Private
 
             _proto._getRootElement = function _getRootElement(element) {
                 var selector = Util.getSelectorFromElement(element);
                 var parent = false;
 
                 if (selector) {
                     parent = document.querySelector(selector);
                 }
 
                 if (!parent) {
                     parent = $(element).closest("." + ClassName.ALERT)[0];
                 }
 
                 return parent;
             };
 
             _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
                 var closeEvent = $.Event(Event.CLOSE);
                 $(element).trigger(closeEvent);
                 return closeEvent;
             };
 
             _proto._removeElement = function _removeElement(element) {
                 var _this = this;
 
                 $(element).removeClass(ClassName.SHOW);
 
                 if (!$(element).hasClass(ClassName.FADE)) {
                     this._destroyElement(element);
 
                     return;
                 }
 
                 var transitionDuration = Util.getTransitionDurationFromElement(
                     element
                 );
                 $(element)
                     .one(Util.TRANSITION_END, function (event) {
                         return _this._destroyElement(element, event);
                     })
                     .emulateTransitionEnd(transitionDuration);
             };
 
             _proto._destroyElement = function _destroyElement(element) {
                 $(element).detach().trigger(Event.CLOSED).remove();
             }; // Static
 
             Alert._jQueryInterface = function _jQueryInterface(config) {
                 return this.each(function () {
                     var $element = $(this);
                     var data = $element.data(DATA_KEY);
 
                     if (!data) {
                         data = new Alert(this);
                         $element.data(DATA_KEY, data);
                     }
 
                     if (config === "close") {
                         data[config](this);
                     }
                 });
             };
 
             Alert._handleDismiss = function _handleDismiss(alertInstance) {
                 return function (event) {
                     if (event) {
                         event.preventDefault();
                     }
 
                     alertInstance.close(this);
                 };
             };
 
             _createClass(Alert, null, [
                 {
                     key: "VERSION",
                     get: function get() {
                         return VERSION;
                     },
                 },
             ]);
 
             return Alert;
         })();
     /**
      * ------------------------------------------------------------------------
      * Data Api implementation
      * ------------------------------------------------------------------------
      */
 
     $(document).on(
         Event.CLICK_DATA_API,
         Selector.DISMISS,
         Alert._handleDismiss(new Alert())
     );
     /**
      * ------------------------------------------------------------------------
      * jQuery
      * ------------------------------------------------------------------------
      */
 
     $.fn[NAME] = Alert._jQueryInterface;
     $.fn[NAME].Constructor = Alert;
 
     $.fn[NAME].noConflict = function () {
         $.fn[NAME] = JQUERY_NO_CONFLICT;
         return Alert._jQueryInterface;
     };
 
     /**
      * ------------------------------------------------------------------------
      * Constants
      * ------------------------------------------------------------------------
      */
 
     var NAME$1 = "button";
     var VERSION$1 = "4.3.1";
     var DATA_KEY$1 = "bs.button";
     var EVENT_KEY$1 = "." + DATA_KEY$1;
     var DATA_API_KEY$1 = ".data-api";
     var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
     var ClassName$1 = {
         ACTIVE: "active",
         BUTTON: "btn",
         FOCUS: "focus",
     };
     var Selector$1 = {
         DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
         DATA_TOGGLE: '[data-toggle="buttons"]',
         INPUT: 'input:not([type="hidden"])',
         ACTIVE: ".active",
         BUTTON: ".btn",
     };
     var Event$1 = {
         CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
         FOCUS_BLUR_DATA_API:
             "focus" +
             EVENT_KEY$1 +
             DATA_API_KEY$1 +
             " " +
             ("blur" + EVENT_KEY$1 + DATA_API_KEY$1),
         /**
          * ------------------------------------------------------------------------
          * Class Definition
          * ------------------------------------------------------------------------
          */
     };
     var Button =
     /*#__PURE__*/
     (function () {
         function Button(element) {
             this._element = element;
         } // Getters

         var _proto = Button.prototype;

         // Public
         _proto.toggle = function toggle() {
             var triggerChangeEvent = true;
             var addAriaPressed = true;
             var rootElement = $(this._element).closest(
                 Selector$1.DATA_TOGGLE
             )[0];

             if (rootElement) {
                 var input = this._element.querySelector(Selector$1.INPUT);

                 if (input) {
                     if (input.type === "radio") {
                         if (
                             input.checked &&
                             this._element.classList.contains(
                                 ClassName$1.ACTIVE
                             )
                         ) {
                             triggerChangeEvent = false;
                         } else {
                             var activeElement = rootElement.querySelector(
                                 Selector$1.ACTIVE
                             );

                             if (activeElement) {
                                 $(activeElement).removeClass(
                                     ClassName$1.ACTIVE
                                 );
                             }
                         }
                     }

                     if (triggerChangeEvent) {
                         if (
                             input.hasAttribute("disabled") ||
                             rootElement.hasAttribute("disabled") ||
                             input.classList.contains("disabled") ||
                             rootElement.classList.contains("disabled")
                         ) {
                             return;
                         }

                         input.checked = !this._element.classList.contains(
                             ClassName$1.ACTIVE
                         );
                         $(input).trigger("change");
                     }

                     input.focus();
                     addAriaPressed = false;
                 }
             }

             if (addAriaPressed) {
                 this._element.setAttribute(
                     "aria-pressed",
                     !this._element.classList.contains(ClassName$1.ACTIVE)
                 );
             }

             if (triggerChangeEvent) {
                 $(this._element).toggleClass(ClassName$1.ACTIVE);
             }
         };

         _proto.dispose = function dispose() {
             $.removeData(this._element, DATA_KEY$1);
             this._element = null;
         }; // Static

         Button._jQueryInterface = function _jQueryInterface(config) {
             return this.each(function () {
                 var data = $(this).data(DATA_KEY$1);

                 if (!data) {
                     data = new Button(this);
                     $(this).data(DATA_KEY$1, data);
                 }

                 if (config === "toggle") {
                     data[config]();
                 }
             });
         };

         _createClass(Button, null, [
             {
                 key: "VERSION",
                 get: function get() {
                     return VERSION$1;
                 },
             },
         ]);

         return Button;
     })();
     /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    $(document)
    .on(
        Event$1.CLICK_DATA_API,
        Selector$1.DATA_TOGGLE_CARROT,
        function (event) {
            event.preventDefault();
            var button = event.target;

            if (!$(button).hasClass(ClassName$1.BUTTON)) {
                button = $(button).closest(Selector$1.BUTTON);
            }

            Button._jQueryInterface.call($(button), "toggle");
        }
    )
    .on(
        Event$1.FOCUS_BLUR_DATA_API,
        Selector$1.DATA_TOGGLE_CARROT,
        function (event) {
            var button = $(event.target).closest(Selector$1.BUTTON)[0];
            $(button).toggleClass(
                ClassName$1.FOCUS,
                /^focus(in)?$/.test(event.type)
            );
        }
    );
/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME$1] = Button._jQueryInterface;
$.fn[NAME$1].Constructor = Button;

$.fn[NAME$1].noConflict = function () {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
};

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME$2 = "carousel";
var VERSION$2 = "4.3.1";
var DATA_KEY$2 = "bs.carousel";
var EVENT_KEY$2 = "." + DATA_KEY$2;
var DATA_API_KEY$2 = ".data-api";
var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

var SWIPE_THRESHOLD = 40;
var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: "hover",
    wrap: true,
    touch: true,
};
var DefaultType = {
    interval: "(number|boolean)",
    keyboard: "boolean",
    slide: "(boolean|string)",
    pause: "(string|boolean)",
    wrap: "boolean",
    touch: "boolean",
};
var Direction = {
    NEXT: "next",
    PREV: "prev",
    LEFT: "left",
    RIGHT: "right",
};
var Event$2 = {
    SLIDE: "slide" + EVENT_KEY$2,
    SLID: "slid" + EVENT_KEY$2,
    KEYDOWN: "keydown" + EVENT_KEY$2,
    MOUSEENTER: "mouseenter" + EVENT_KEY$2,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
    TOUCHSTART: "touchstart" + EVENT_KEY$2,
    TOUCHMOVE: "touchmove" + EVENT_KEY$2,
    TOUCHEND: "touchend" + EVENT_KEY$2,
    POINTERDOWN: "pointerdown" + EVENT_KEY$2,
    POINTERUP: "pointerup" + EVENT_KEY$2,
    DRAG_START: "dragstart" + EVENT_KEY$2,
    LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
    CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2,
};
var ClassName$2 = {
    CAROUSEL: "carousel",
    ACTIVE: "active",
    SLIDE: "slide",
    RIGHT: "carousel-item-right",
    LEFT: "carousel-item-left",
    NEXT: "carousel-item-next",
    PREV: "carousel-item-prev",
    ITEM: "carousel-item",
    POINTER_EVENT: "pointer-event",
};
var Selector$2 = {
    ACTIVE: ".active",
    ACTIVE_ITEM: ".active.carousel-item",
    ITEM: ".carousel-item",
    ITEM_IMG: ".carousel-item img",
    NEXT_PREV: ".carousel-item-next, .carousel-item-prev",
    INDICATORS: ".carousel-indicators",
    DATA_SLIDE: "[data-slide], [data-slide-to]",
    DATA_RIDE: '[data-ride="carousel"]',
};
var PointerType = {
    TOUCH: "touch",
    PEN: "pen",
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */
};
var Carousel =
/*#__PURE__*/
(function () {
    function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this.touchStartX = 0;
        this.touchDeltaX = 0;
        this._config = this._getConfig(config);
        this._element = element;
        this._indicatorsElement = this._element.querySelector(
            Selector$2.INDICATORS
        );
        this._touchSupported =
            "ontouchstart" in document.documentElement ||
            navigator.maxTouchPoints > 0;
        this._pointerEvent = Boolean(
            window.PointerEvent || window.MSPointerEvent
        );

        this._addEventListeners();
    } // Getters

    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
        if (!this._isSliding) {
            this._slide(Direction.NEXT);
        }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (
            !document.hidden &&
            $(this._element).is(":visible") &&
            $(this._element).css("visibility") !== "hidden"
        ) {
            this.next();
        }
    };

    _proto.prev = function prev() {
        if (!this._isSliding) {
            this._slide(Direction.PREV);
        }
    };

    _proto.pause = function pause(event) {
        if (!event) {
            this._isPaused = true;
        }

        if (this._element.querySelector(Selector$2.NEXT_PREV)) {
            Util.triggerTransitionEnd(this._element);
            this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
    };