/* global things detectIE*/

function uniq(arr) {
  const newArr = []
  arr.forEach((val) => {
    if (newArr.indexOf(val) < 0) newArr.push(val)
  })
  return newArr
}

function getJSON(url, callback) {
  const request = new XMLHttpRequest()
  request.open('GET', url, true)

  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      const data = JSON.parse(request.responseText)

      callback(data)
    } else {
      console.error('server error', request)
    }
  }

  request.onerror = () => {
    console.log('connection error')
  }

  request.send()
}

document.addEventListener('DOMContentLoaded', () => {
  const thingsSection = document.getElementById('thing-section')
  if (detectIE()) {
    thingsSection.innerHTML = `<p class="ie-warning">Please use a modern browser
     to see my projects :)</p>`
  } else {
    getJSON('js/things.json', things => {
      const categories = uniq(things.map(thing => thing.category))

      const categoryThings = categories.map(cat => {
        const thingsByCategory = things.filter(thing => thing.category === cat)
        return {
          category: cat,
          things: thingsByCategory
        }
      })

      categoryThings.forEach(cat => {
        var content = `<h3 class="section-header">${cat.category}</h3>`
        content += '<ol>'
        const innerContent = cat.things.map(thing => `<li>
              <a href="${thing.link}" target='_blank'>${thing.name}</a> |
              <a href="${thing.source}">source</a>
            </li>
            <p>- ${thing.details}</p>`)

        content += innerContent.join('')
        content += '</ol>'
        thingsSection.innerHTML += content
      })
    })
  }
})
