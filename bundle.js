/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _detectIE = __webpack_require__(1);

	var _detectIE2 = _interopRequireDefault(_detectIE);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function uniq(arr) {
	  var newArr = [];
	  arr.forEach(function (val) {
	    if (newArr.indexOf(val) < 0) newArr.push(val);
	  });
	  return newArr;
	} /* global things detectIE*/


	function getJSON(url, callback) {
	  var request = new XMLHttpRequest();
	  request.open('GET', url, true);

	  request.onload = function () {
	    if (request.status >= 200 && request.status < 400) {
	      // Success!
	      var data = JSON.parse(request.responseText);

	      callback(data);
	    } else {
	      console.error('server error', request);
	    }
	  };

	  request.onerror = function () {
	    console.log('connection error');
	  };

	  request.send();
	}

	document.addEventListener('DOMContentLoaded', function () {
	  var thingsSection = document.getElementById('thing-section');
	  if ((0, _detectIE2.default)()) {
	    thingsSection.innerHTML = '<p class="ie-warning">Please use a modern browser\n     to see my projects :)</p>';
	  } else {
	    getJSON('public/things.json', function (things) {
	      var categories = uniq(things.map(function (thing) {
	        return thing.category;
	      }));

	      var categoryThings = categories.map(function (cat) {
	        var thingsByCategory = things.filter(function (thing) {
	          return thing.category === cat;
	        });
	        return {
	          category: cat,
	          things: thingsByCategory
	        };
	      });

	      categoryThings.forEach(function (cat) {
	        var content = '<h3 class="section-header">' + cat.category + '</h3>';
	        content += '<ol>';
	        var innerContent = cat.things.map(function (thing) {
	          return '<li>\n              <a href="' + thing.link + '" target=\'_blank\'>' + thing.name + '</a> |\n              <a href="' + thing.source + '">source</a>\n            </li>\n            <p>- ' + thing.details + '</p>';
	        });

	        content += innerContent.join('');
	        content += '</ol>';
	        thingsSection.innerHTML += content;
	      });
	    });
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function detectIE() {
	  var ua = window.navigator.userAgent;

	  var msie = ua.indexOf('MSIE ');
	  if (msie > 0) {
	    // IE 10 or older => return version number
	    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	  }

	  var trident = ua.indexOf('Trident/');
	  if (trident > 0) {
	    // IE 11 => return version number
	    var rv = ua.indexOf('rv:');
	    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	  }

	  var edge = ua.indexOf('Edge/');
	  if (edge > 11) return false;
	  if (edge > 0) {
	    // Edge (IE 12+) => return version number
	    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	  }

	  // other browser
	  return false;
	}

	exports.default = detectIE;

/***/ }
/******/ ]);