console.log('JS id loaded');

// fetch('http://puzzle.mead.io/puzzle').then((response)=> {
//     response.json().then((data)=> {
//         console.log(data);
//     })
// });


// fetch('http://localhost:3000/weather?address=Boston')
// .then((response) => {
//     return response.json();
// })
// .then((data)=> {
//     if(data.error) return console.log(data.error);
//     console.log(data);
// })


const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (event)=> {
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    event.preventDefault();
    const location = input.value;
    fetch(`/weather?address=${location}`)
        .then((response) => {
    return response.json();
    })
    .then((data)=> {
        if(data.error) { messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecastData;
        }
        
    })
})