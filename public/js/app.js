fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// message1.textContent = 'From JS'

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value

    messageOne.textContent = 'Fetching...'
    messageOne.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
    })
})
})