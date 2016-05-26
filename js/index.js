"use strict";

function detectIE() {
  let ua = window.navigator.userAgent;

  let msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }

  let trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    let rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }

  let edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // Edge (IE 12+) => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }

  // other browser
  return false;
}

var things = [{
  "category": "full stack",
  "name": "stock chart",
  "link": "https://stock-graph.herokuapp.com/",
  "source": "https://github.com/jondcoleman/stock-tracker",
  "details": "a minimal chart application for stock values using socket.io for real-time updates across clients, chart.js, and on the client side, a vanilla js implementation of the redux pattern."
}, {
  "category": "full stack",
  "name": "vida nocturna",
  "link": "https://vida-nocturna.herokuapp.com/",
  "source": "https://github.com/jondcoleman/nightlife-app",
  "details": "a nightlife coordination app using the yelp api, express and jade"
}, {
  "category": "full stack",
  "name": "fav fotos",
  "link": "https://fav-fotos.herokuapp.com/",
  "source": "https://github.com/jondcoleman/fav-fotos",
  "details": "a pinterest clone using react and masonry.js"
}, {
  "category": "full stack",
  "name": "voting app",
  "link": "https://voting-application.herokuapp.com/",
  "source": "https://github.com/jondcoleman/voting-app",
  "details": "a polling application using node, express, mongodb, and react"
}, {
  "category": "full stack",
  "name": "react fork of clementine.js",
  "link": "https://clementine-passport-react.herokuapp.com/",
  "source": "https://github.com/jondcoleman/clementine-react",
  "details": "a fork of clementine.js using react"
}, {
  "category": "microservice json api",
  "name": "url shortener",
  "link": "https://url-shrtnr-fcc.herokuapp.com/",
  "source": "https://github.com/jondcoleman/url-shortener",
  "details": "a simple url shortening microservice"
}, {
  "category": "microservice json api",
  "name": "timestamp converter",
  "link": "https://timestamp-microservice-fcc.herokuapp.com/",
  "source": "https://github.com/jondcoleman/timestamp-microservice",
  "details": "convert natural language timestamp to unix or unix to natural language"
}, {
  "category": "microservice json api",
  "name": "image search abstraction",
  "link": "https://image-search-microservice.herokuapp.com/",
  "source": "https://github.com/jondcoleman/image-search-abstraction",
  "details": "abstraction layer for imgur gallery api"
}, {
  "category": "microservice json api",
  "name": "file size",
  "link": "https://file-metadata-fcc.herokuapp.com/",
  "source": "https://github.com/jondcoleman/file-metadata-api",
  "details": "api to retrieve file size of uploaded file"
}, {
  "category": "microservice json api",
  "name": "request header parser",
  "link": "https://whoami-fcc.herokuapp.com/api/whoami",
  "source": "https://github.com/jondcoleman/header-parser",
  "details": "obtain ipaddress, language, and os"
}, {
  "category": "React",
  "name": "roguelike dungeon crawler",
  "link": "https://ninja-roguelike.herokuapp.com/",
  "source": "https://github.com/jondcoleman/roguelike",
  "details": "dungeon crawler in React"
}, {
  "category": "React",
  "name": "game of life",
  "link": "http://codepen.io/jondcoleman/full/gPjPbd/",
  "source": "http://codepen.io/jondcoleman/pen/gPjPbd",
  "details": "conway's game of life implement in React"
}, {
  "category": "React",
  "name": "time to cook",
  "link": "http://codepen.io/jondcoleman/full/pgwrrJ/",
  "source": "http://codepen.io/jondcoleman/pen/pgwrrJ",
  "details": "a recipe keeper using React and localstorage"
}, {
  "category": "React",
  "name": "markdown previewer",
  "link": "http://codepen.io/jondcoleman/full/mVmXOJ/",
  "source": "http://codepen.io/jondcoleman/pen/mVmXOJ",
  "details": "real time markdown preview"
}, {
  "category": "d3",
  "name": "scatterplot",
  "link": "http://codepen.io/jondcoleman/full/GZBqaV/",
  "source": "http://codepen.io/jondcoleman/pen/GZBqaV",
  "details": "d3.js scatterplot chart"
}, {
  "category": "d3",
  "name": "heatmap",
  "link": "http://codepen.io/jondcoleman/full/GZBjLr/",
  "source": "http://codepen.io/jondcoleman/pen/GZBjLr",
  "details": "d3.js heatmap chart"
}, {
  "category": "utility",
  "name": "file search",
  "link": "https://github.com/jondcoleman/file-search",
  "source": "https://github.com/jondcoleman/file-search",
  "details": "node.js command line utility for indexing directories and searching for file names"
}];

var categories = _.uniq(things.map(function(thing) {
  return thing.category;
}));

var categoryThings = categories.map(function(cat) {
  var thingsByCategory = things.filter(function(thing) {
    return thing.category === cat;
  });
  return { category: cat, things: thingsByCategory };
});



document.addEventListener("DOMContentLoaded", function() {
  var thingsSection = document.getElementById('thing-section');

  if (detectIE()) {
    thingsSection.innerHTML = '<p class="ie-warning">Please use a modern browser to see my projects :)</p>'
  } else {
    var thingsHtml = categoryThings.map(function(cat) {
      var content = "<h3 class=\"section-header\">" + cat.category + " </h3>";
      content += '<ol>';
      var innerContent = '';

      cat.things.forEach(function(thing) {
        innerContent += "<li><a href=\"" + thing.link + "\">" + thing.name + "</a> | <a href=\"" + thing.source + "\">source</a></li>";
        innerContent += "<p>- " + thing.details + "</p>";
      });

      content += innerContent;
      content += '</ol>';

      thingsSection.innerHTML += content;
    });
  }
});
