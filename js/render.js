
let workWrapper = document.querySelector('#workContainer')


fetch('../gallery/events.json')
  .then(r => { return r.json() })
  .then(d => {
    let cols = ''
    d.forEach(event => {
      cols += `<div class="col-md-4 d-flex justify-content-center p-0">
          <div class="flip-card w-100">
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <img src="img/${event.cover}" alt="Avatar" style="width:100%;height:300px;">
            </div>
            <div class="flip-card-back">
              <h1>${event.name}</h1>
              <p>${event.cat}</p>
              <p>We love that guy</p>
            </div>
          </div>
        </div>
        </div>`



      //   cols += `
      //   <div class="flip-card">
      //   <div class="flip-card-inner">
      //     <div class="flip-card-front">
      //       <img src="img/${event.cover}" alt="Avatar" style="width:300px;height:300px;">
      //     </div>
      //     <div class="flip-card-back">
      //       <h1>${event.name}</h1>
      //       <p>${event.cat}</p>
      //       <p>We love that guy</p>
      //     </div>
      //   </div>
      // </div>`

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