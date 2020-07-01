// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

// messageOne.textContent = 'From javascript'
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Searching Location...'
    fetch('/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
           console.log(data.error)
           return messageOne.textContent = data.error
        }else{
            console.log(data.location)
            messageOne.textContent = data.location
            console.log(data.forecast)
            messageTwo.textContent = data.forecast
        }
     
    })
})

    // const location = search.value
    // console.log(location)
})