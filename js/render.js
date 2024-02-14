
let workWrapper = document.querySelector('#workContainer')


fetch('../gallery/events.json')
  .then(r => { return r.json() })
  .then(d => {
    let cols = ''
    d.forEach(event => {
      cols += `<div class="col-md-4 d-flex justify-content-center p-1">
          <div class="flip-card w-100">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="img/${event.cover}" alt="Avatar" style="width:100%;height:300px;">
            </div>
            <div class="flip-card-back">
              <h3>${event.name}</h3>
              <p>${event.cat}</p>
              <p>${event.date}</p>
              <p>${event.details}</p>
              <div class="row">
              <div class="col">
              <button class="btn btn-primary" data-id="${event.id}">Details</button>
              </div>
              </div>
            </div>
          </div>
        </div>
        </div>`
    });
    workWrapper.innerHTML = cols
    $('[data-toggle="tooltip"]').tooltip()
  })

$(document).on('click', '.details', e => {
  console.log('test');
  let id = $(e.target).data('id')
  fetch('../portfolio/events.json')
    .then(r => { return r.json() })
    .then(d => {
      let searchedEvent
      for (let i = 0; i < d.length; i++) {
        if (d[i].id == id) {
          searchedEvent = d[i]
          break
        }
      }
      let links = ''
      let i = 0
      searchedEvent.references.forEach(link => {
        i++
        links += `<div class="col-sm-3"><a class="text-danger" href="${link}">Link ${i}</a></div>`
      })
      $('#eventname').html(searchedEvent.name + ' event details')
      let card = `<div class="card">
            <img class="card-img-top" src="img/${searchedEvent.cover}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${searchedEvent.name}</h5>
              <p class="card-text">${searchedEvent.details}</p>
              <h6 class="card-title">References</h6>
              <div class="row mb-2">${links}</div>
              <p class="card-text"><small class="text-muted">${searchedEvent.date}</small></p>
            </div>
          </div>`
      $('#eventBody').html(card)

      $('#eventDetails').modal('show')
    })
})



fetch('https://animechan.xyz/api/random')
  .then(r => { return r.json() })
  .then(d => {
    $('#quoteContainer').html(`<div><p class="text-monospace font-weight-bold">${d.anime}</p><h5 class="text-monospace font-weight-bold">'${d.quote}'</h5><br><p class="text-monospace">${d.character}</p></div>`)
  })


$(document).on('click', '#refreshAdvice', e => {
  fetch('https://animechan.xyz/api/random')
    .then(r => { return r.json() })
    .then(d => {
      $('#quoteContainer').html(`<div><p class="text-monospace font-weight-bold">${d.anime}</p><h5 class="text-monospace font-weight-bold">'${d.quote}'</h5><br><p class="text-monospace">${d.character}</p></div>`)
    })
})


const randomRange = (myMin, myMax) => {
  return Math.floor(
    Math.random() * (Math.ceil(myMax) - Math.floor(myMin) + 1) + myMin
  );
}

const gifArray = ["gif.gif", "gif1.gif", "gif2.gif", "gif3.gif", "gif4.gif", "gifLofi.gif", "gifLofiJoin.gif", "test3.gif", "test4.gif", "test6.gif", "test7.gif", "test8.gif"]

setInterval(() => {
  let index = randomRange(0, gifArray.length - 1)
  $("#home").css('background-image', `url(img/${gifArray[index]})`)
}, 3000)