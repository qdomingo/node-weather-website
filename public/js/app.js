const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageError = document.querySelector('.message-error');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location =  search.value;
    console.log(location);
    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                messageError.textContent = data.error;
                messageOne.textContent = '';
                messageTwo.textContent = '';
                messageThree.textContent = '';
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast.today_currently;
                messageThree.textContent = data.forecast.today_min_max;
                messageError.textContent = '';
            }
        })
    });
});