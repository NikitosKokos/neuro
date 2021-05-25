 // burger
 const burger = document.querySelector('.burger');
 const headerMenu = document.querySelector('.header__list');
 const wrapper = document.querySelector('body');
 if(burger){
    burger.addEventListener("click", () =>{
        headerMenu.classList.toggle("header__list_active");
        burger.classList.toggle("burger_active");
        wrapper.classList.toggle("hidden");
    });     
 }


//  Прокрутка при клике
const menuLinlks = document.querySelectorAll('a[data-goto]');
if(menuLinlks.length > 0){
    menuLinlks.forEach(menuLinlk => {
        menuLinlk.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick(e){
        const menuLinlk = e.target;
        if(menuLinlk.dataset.goto && document.querySelector(menuLinlk.dataset.goto)){
            const gotoBlock = document.querySelector(menuLinlk.dataset.goto);
            const gotoBlockVakue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

            window.scrollTo({
                top: gotoBlockVakue,
                behavior: 'smooth'
            })
        }
        e.preventDefault();
    }
}