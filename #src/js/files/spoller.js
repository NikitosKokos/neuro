const spoller = document.querySelectorAll('._spoller');

if(spoller.length != 0){
    spoller.forEach(element => {
        element.addEventListener('click',() => {
            element.classList.toggle('_active');
            element.nextElementSibling.classList.toggle('_active');
        });
    });
}