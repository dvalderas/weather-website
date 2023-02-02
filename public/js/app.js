const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    messageOne.textContent = 'Loading...'

    const location = search.value

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
               
                messageOne.textContent = data.error
            } else {
                console.log(data.location)
                console.log(data.forecast)

                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast.weather_descriptions + ', with a temperature of: ' +
                    data.forecast.temperature + '°C, but it feel like as if it were: ' +
                    data.forecast.feels_like

            }
        })
    })


})

