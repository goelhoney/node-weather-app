console.log('hello');

const form    = document.querySelector('form');
const serach  = document.querySelector('input');
const message = document.querySelector('#message');

form.addEventListener('submit', function(e) {
    message.textContent = 'Fetching....';
    e.preventDefault();
    const location = serach.value;
    fetch('/weather?address='+location).then((response) => {
        response.json().then((data) => {
            message.textContent = data.Location;
        });
    });
});

