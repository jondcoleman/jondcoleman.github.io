"use strict"

function uniq(arr){
  var newArr = []
  arr.forEach((val) => newArr.indexOf(val) < 0 ? newArr.push(val) : null)
  return newArr
}

function main(){
  var categories = uniq(things.map(function(thing) {
    return thing.category
  }))

  var categoryThings = categories.map(function(cat) {
    var thingsByCategory = things.filter(function(thing) {
      return thing.category === cat
    })
    return { category: cat, things: thingsByCategory }
  })

  var thingsSection = document.getElementById('thing-section')

  var thingsHtml = categoryThings.map(function(cat) {
    var content = "<h3 class=\"section-header\">" + cat.category + " </h3>"
    content += '<ol>'
    var innerContent = ''

    cat.things.forEach(function(thing) {
      innerContent += "<li><a href=\"" + thing.link + "\" target='_blank'>" + thing.name + "</a> | <a href=\"" + thing.source + "\">source</a></li>"
      innerContent += "<p>- " + thing.details + "</p>"
    })

    content += innerContent
    content += '</ol>'

    thingsSection.innerHTML += content
  })
}

document.addEventListener("DOMContentLoaded", function() {
  if (detectIE()) {
    thingsSection.innerHTML = '<p class="ie-warning">Please use a modern browser to see my projects :)</p>'
  } else {
    main()
  }
})
