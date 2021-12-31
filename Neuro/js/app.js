// @ @include('files/regular.js', {})

document.addEventListener('DOMContentLoaded', () => {
  // cursor
  const cursor = document.querySelector('#cursor');
  const links = [...document.querySelectorAll('a'), ...document.querySelectorAll('[data-cursor]')];
  const delay = 3;
  let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

  links.forEach(link => {
    link.addEventListener('mouseover', () => {
      cursor.classList.add('active')
    });
    link.addEventListener('mouseout', () => {
      cursor.classList.remove('active')
    });
  });

  function mouseCoords(e){
    mouseX = e.pageX;
    mouseY = e.pageY;
  }

  gsap.to({}, .01, {
    repeat: -1,
    onRepeat: () => {
      posX += (mouseX - posX) / delay;
      posY += (mouseY - posY) / delay;
      gsap.set(cursor, {
        css: {
          left: posX,
          top: posY
        }
      })
    }
  })

  document.body.addEventListener('mousemove', (e) => {
    mouseCoords(e);
    cursor.classList.remove('hidden');
  });

  document.body.addEventListener('mouseout', (e) => {
    cursor.classList.add('hidden');
  });

  const duration = 4000;
  const page = document.querySelector('.page');
  const startBtn = document.querySelector('.earth__btn');
  const backBtnMars = document.querySelector('.mars__btn_back');
  const nextBtnMars = document.querySelector('.mars__btn_next');
  const backBtnPluto = document.querySelector('.pluto__btn_back');
  const finishBtnPluto = document.querySelector('.pluto__btn_finish');
  const earthTitle = document.querySelector('.earth__title');
  const marsTitle = document.querySelector('.mars__title');
  const plutoTitle = document.querySelector('.pluto__title');
  const earthButtons = document.querySelector('.earth__buttons');
  const marsButtons = document.querySelector('.mars__buttons');
  const plutoButtons = document.querySelector('.pluto__buttons');
  const rocket = document.querySelector('.rocket');

  const flyRocket = (btn, pageClass, title) => {
    btn.classList.add('hide');
    title.classList.add('hide');
    setTimeout(() => {
      page.classList.add(pageClass);
      rocket.classList.add('show');
  
      page.classList.remove('back');
      rocket.classList.remove('back');

      setTimeout(() => {
        btn.classList.remove('hide');
        title.classList.remove('hide');
        rocket.classList.remove('show');
      }, duration);
    }, 500);
  }

  const backRocket = (btn, pageClass, title) => {
    title.classList.add('hide');
    btn.classList.add('hide');
    setTimeout(() => {
      
      page.classList.add(pageClass);
      rocket.classList.add('back');
      
      if (pageClass === 'back') page.classList.remove('start');
      if (pageClass === 'back') page.classList.remove('back2');
      page.classList.remove('next');
      rocket.classList.remove('show');

      setTimeout(() => {
          btn.classList.remove('hide');
          rocket.classList.remove('back');
          title.classList.remove('hide');
      }, duration);
    }, 500);
  };

  if(startBtn){
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();
      flyRocket(earthButtons, 'start', earthTitle);
    });
  }

  if(backBtnMars){
    backBtnMars.addEventListener('click', (e) => {
        e.preventDefault();
        backRocket(marsButtons, 'back', marsTitle);
    });
  }

  if (nextBtnMars) {
      nextBtnMars.addEventListener('click', (e) => {
          e.preventDefault();
          flyRocket(marsButtons, 'next', marsTitle);
      });
  }

  if(backBtnPluto){
    backBtnPluto.addEventListener('click', (e) => {
        e.preventDefault();
        backRocket(plutoButtons, 'back2', plutoTitle);
    });
  }

  if(finishBtnPluto){
    finishBtnPluto.addEventListener('click', (e) => {
        e.preventDefault();
        popup_open('app');
    });
  }

  const popupForm = document.querySelector('.popup__form');

  popupForm.addEventListener('submit', (e) => {
      e.preventDefault();
  });
  

}); //end
// @ @include('files/forms.js', {})
// поддержка webp
function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
        callback(webP.height == 2);
    };
    webP.src =
        'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}
//=================
testWebP(function (support) {
    if (support == true) {
        document.querySelector('body').classList.add('webp');
    } else {
        document.querySelector('body').classList.add('no-webp');
    }
});
//=================
// da
('use strict');

(function () {
    let originalPositions = [];
    let daElements = document.querySelectorAll('[data-da]');
    let daElementsArray = [];
    let daMatchMedia = [];
    //Заполняем массивы
    if (daElements.length > 0) {
        let number = 0;
        for (let index = 0; index < daElements.length; index++) {
            const daElement = daElements[index];
            const daMove = daElement.getAttribute('data-da');
            if (daMove != '') {
                const daArray = daMove.split(',');
                const daPlace = daArray[1] ? daArray[1].trim() : 'last';
                const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
                const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
                const daDestination = document.querySelector('.' + daArray[0].trim());
                if (daArray.length > 0 && daDestination) {
                    daElement.setAttribute('data-da-index', number);
                    //Заполняем массив первоначальных позиций
                    originalPositions[number] = {
                        parent: daElement.parentNode,
                        index: indexInParent(daElement),
                    };
                    //Заполняем массив элементов
                    daElementsArray[number] = {
                        element: daElement,
                        destination: document.querySelector('.' + daArray[0].trim()),
                        place: daPlace,
                        breakpoint: daBreakpoint,
                        type: daType,
                    };
                    number++;
                }
            }
        }
        dynamicAdaptSort(daElementsArray);

        //Создаем события в точке брейкпоинта
        for (let index = 0; index < daElementsArray.length; index++) {
            const el = daElementsArray[index];
            const daBreakpoint = el.breakpoint;
            const daType = el.type;

            daMatchMedia.push(window.matchMedia('(' + daType + '-width: ' + daBreakpoint + 'px)'));
            daMatchMedia[index].addListener(dynamicAdapt);
        }
    }
    //Основная функция
    function dynamicAdapt(e) {
        for (let index = 0; index < daElementsArray.length; index++) {
            const el = daElementsArray[index];
            const daElement = el.element;
            const daDestination = el.destination;
            const daPlace = el.place;
            const daBreakpoint = el.breakpoint;
            const daClassname = '_dynamic_adapt_' + daBreakpoint;

            if (daMatchMedia[index].matches) {
                //Перебрасываем элементы
                if (!daElement.classList.contains(daClassname)) {
                    let actualIndex = indexOfElements(daDestination)[daPlace];
                    if (daPlace === 'first') {
                        actualIndex = indexOfElements(daDestination)[0];
                    } else if (daPlace === 'last') {
                        actualIndex =
                            indexOfElements(daDestination)[indexOfElements(daDestination).length];
                    }
                    daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
                    daElement.classList.add(daClassname);
                }
            } else {
                //Возвращаем на место
                if (daElement.classList.contains(daClassname)) {
                    dynamicAdaptBack(daElement);
                    daElement.classList.remove(daClassname);
                }
            }
        }
        customAdapt();
    }

    //Вызов основной функции
    dynamicAdapt();

    //Функция возврата на место
    function dynamicAdaptBack(el) {
        const daIndex = el.getAttribute('data-da-index');
        const originalPlace = originalPositions[daIndex];
        const parentPlace = originalPlace['parent'];
        const indexPlace = originalPlace['index'];
        const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
        parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
    }
    //Функция получения индекса внутри родителя
    function indexInParent(el) {
        var children = Array.prototype.slice.call(el.parentNode.children);
        return children.indexOf(el);
    }
    //Функция получения массива индексов элементов внутри родителя
    function indexOfElements(parent, back) {
        const children = parent.children;
        const childrenArray = [];
        for (let i = 0; i < children.length; i++) {
            const childrenElement = children[i];
            if (back) {
                childrenArray.push(i);
            } else {
                //Исключая перенесенный элемент
                if (childrenElement.getAttribute('data-da') == null) {
                    childrenArray.push(i);
                }
            }
        }
        return childrenArray;
    }
    //Сортировка объекта
    function dynamicAdaptSort(arr) {
        arr.sort(function (a, b) {
            if (a.breakpoint > b.breakpoint) {
                return -1;
            } else {
                return 1;
            }
        });
        arr.sort(function (a, b) {
            if (a.place > b.place) {
                return 1;
            } else {
                return -1;
            }
        });
    }
    //Дополнительные сценарии адаптации
    function customAdapt() {
        //const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
})();
//=================
// ibg
function ibg() {
    let ibg = document.querySelectorAll('._ibg');
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage =
                'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

let observer = new MutationObserver((mutationRecords) => {
    mutationRecords.forEach((item) => {
        if (item.addedNodes[0]) {
            if (item.addedNodes[0].classList) {
                if (item.addedNodes[0].classList.contains('_ibg')) ibg();
            }
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});

ibg();
//=================
// isMobile
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    },
};
//=================
//RemoveClasses
function _removeClasses(el, class_name) {
    for (let i = 0; i < el.length; i++) {
        el[i].classList.remove(class_name);
    }
}
//=================
//SlideToggle
let _slideUp = (target, duration = 500) => {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout(() => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
    }, duration);
};
let _slideDown = (target, duration = 500) => {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';

    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
        target.classList.remove('_slide');
    }, duration);
};
let _slideToggle = (target, duration = 500) => {
    if (!target.classList.contains('_slide')) {
        target.classList.add('_slide');
        if (window.getComputedStyle(target).display === 'none') {
            return _slideDown(target, duration);
        } else {
            return _slideUp(target, duration);
        }
    }
};
//=================
//IsHidden
function _is_hidden(el) {
    return el.offsetParent === null;
}
//=================
let unlock = true;
let popups = document.querySelectorAll('.popup');

for (let index = 0; index < popups.length; index++) {
    const popup = popups[index];
    popup.addEventListener('click', function (e) {
        if (!e.target.closest('.popup__body')) {
            popup_close(e.target.closest('.popup'));
        }
    });
}
//=================
function popup_open(item, video = '') {
    let activePopup = document.querySelectorAll('.popup._active');
    if (activePopup.length > 0) {
        popup_close('', false);
    }
    let curent_popup = document.querySelector('.popup_' + item);
    if (curent_popup && unlock) {
        if (video != '' && video != null) {
            let popup_video = document.querySelector('.popup_video');
            popup_video.querySelector('.popup__video').innerHTML =
                '<iframe src="https://www.youtube.com/embed/' +
                video +
                '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
        }
        if (!document.querySelector('.menu__body._active')) {
            body_lock_add(500);
        }
        curent_popup.classList.add('_active');
        history.pushState('', '', '#' + item);
    }
}
//=================
function popup_close(item, bodyUnlock = true) {
    if (unlock) {
        if (!item) {
            for (let index = 0; index < popups.length; index++) {
                const popup = popups[index];
                let video = popup.querySelector('.popup__video');
                if (video) {
                    video.innerHTML = '';
                }
                popup.classList.remove('_active');
            }
        } else {
            let video = item.querySelector('.popup__video');
            if (video) {
                video.innerHTML = '';
            }
            item.classList.remove('_active');
        }
        if (!document.querySelector('.menu__body._active') && bodyUnlock) {
            body_lock_remove(500);
        }
        history.pushState('', '', window.location.href.split('#')[0]);
    }
}
//=================
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
    for (let index = 0; index < popup_close_icon.length; index++) {
        const el = popup_close_icon[index];
        el.addEventListener('click', function (e) {
            e.preventDefault();
            popup_close(el.closest('.popup'));
        });
    }
}
document.addEventListener('keydown', function (e) {
    if (e.key == 'Escape') {
        popup_close();
    }
});
//=================
// body lock
function body_lock(delay) {
    let body = document.querySelector('body');
    if (body.classList.contains('_lock')) {
        body_lock_remove(delay);
    } else {
        body_lock_add(delay);
    }
}
function body_lock_remove(delay) {
    let body = document.querySelector('body');
    if (unlock) {
        let lock_padding = document.querySelectorAll('._lp');
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            body.classList.remove('_lock');
        }, delay);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, delay);
    }
}

function body_lock_add(delay) {
    let body = document.querySelector('body');
    if (unlock) {
        let lock_padding = document.querySelectorAll('._lp');
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight =
                window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        }
        body.style.paddingRight =
            window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        body.classList.add('_lock');

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, delay);
    }
}
//=================
//Gallery
let gallery = document.querySelectorAll('._gallery');
if (gallery) {
    gallery_init();
}
function gallery_init() {
    for (let index = 0; index < gallery.length; index++) {
        const el = gallery[index];
        lightGallery(el, {
            counter: false,
            selector: 'a',
            download: false,
        });
    }
}
//=================
;
// @ @include('files/burger.js', {});
// @ @include("files/spoller.js",{});
    const selectSingle = document.querySelectorAll('.__select');
    const selectSingle_title = document.querySelectorAll('.__select__title');
    

if(selectSingle){
    selectSingle.forEach((element,index) => {
            // Toggle menu
            selectSingle_title[index].addEventListener('click', (e) => {
                e.preventDefault();
                if ('active' === element.getAttribute('data-state')) {
                    element.setAttribute('data-state', '');
                } else {
                    element.setAttribute('data-state', 'active');
                }
            }); 
            let selectSingle_labels = element.querySelectorAll('.__select__label');
            // Close when click to option
            for (let i = 0; i < selectSingle_labels.length; i++) {
            selectSingle_labels[i].addEventListener('click', (evt) => {
                selectSingle_title[index].textContent = evt.target.textContent;
                element.setAttribute('data-state', '');
            });
            }
        });
}
   
   

    

;
// @ @include("files/tabs.js",{});
// @ @include("files/sliders.js",{});
    