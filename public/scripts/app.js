console.log('This is loaded');
const searchForm = document.querySelector('form');
const search = document.getElementById('searhValue');
const messageOne = document.getElementById('messageOne');
const messageTwo = document.getElementById('messageTwo');
searchForm.addEventListener('submit',(e) => {
    e.preventDefault();
    messageOne.textContent = 'loading...';
    messageTwo.textContent = '';
    const searchValue = search.value;
    fetch('/weather?address=' + searchValue).then((response) => {
        response.json().then((data) => {
            if(data.error){
                messageOne.textContent = data.error;
                console.log(data.error);
            }else{
                messageOne.textContent = data.forecast;
                messageTwo.textContent = data.location;
                console.log(data.forecast);
                console.log(data.location);
            }
        })
    })
});