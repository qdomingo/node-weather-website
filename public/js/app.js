const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location =  search.value;
    console.log(location);
    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                messageTwo.textContent = data.error;
                messageOne.textContent = '';
            } else {
                messageOne.textContent = data.location + ' - ' + data.forecast;
                messageTwo.textContent = '';
            }
        })
    });
});