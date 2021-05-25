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

  const duration = 6000;
  const page = document.querySelector('.page');
  const startBtn = document.querySelector('.earth__btn');
  const backBtn = document.querySelector('.mars__btn');
  const startTitle = document.querySelector('.earth__title');
  const rocket = document.querySelector('.rocket');
  startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    startBtn.classList.add('hide');
    startTitle.classList.add('hide');
    page.classList.add('start');
    rocket.classList.add('show');

    backBtn.classList.remove('hide');
    page.classList.remove('back');
    rocket.classList.remove('back');

    setTimeout(() => {
      startBtn.classList.remove('hide');
      startTitle.classList.remove('hide');
      rocket.classList.remove('show');
    }, duration);
  });

  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    backBtn.classList.add('hide');
    page.classList.add('back');
    rocket.classList.add('back');

    startBtn.classList.remove('hide');
    startTitle.classList.remove('hide');
    page.classList.remove('start');
    rocket.classList.remove('show');

    setTimeout(() => {
      backBtn.classList.remove('hide');
      page.classList.remove('back');
      rocket.classList.remove('back');
    }, duration);
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
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

// da
("use strict");

(function () {
  let originalPositions = [];
  let daElements = document.querySelectorAll("[data-da]");
  let daElementsArray = [];
  let daMatchMedia = [];
  //Заполняем массивы
  if (daElements.length > 0) {
    let number = 0;
    for (let index = 0; index < daElements.length; index++) {
      const daElement = daElements[index];
      const daMove = daElement.getAttribute("data-da");
      if (daMove != "") {
        const daArray = daMove.split(",");
        const daPlace = daArray[1] ? daArray[1].trim() : "last";
        const daBreakpoint = daArray[2] ? daArray[2].trim() : "767";
        const daType = daArray[3] === "min" ? daArray[3].trim() : "max";
        const daDestination = document.querySelector("." + daArray[0].trim());
        if (daArray.length > 0 && daDestination) {
          daElement.setAttribute("data-da-index", number);
          //Заполняем массив первоначальных позиций
          originalPositions[number] = {
            parent: daElement.parentNode,
            index: indexInParent(daElement),
          };
          //Заполняем массив элементов
          daElementsArray[number] = {
            element: daElement,
            destination: document.querySelector("." + daArray[0].trim()),
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

      daMatchMedia.push(
        window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)")
      );
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
      const daClassname = "_dynamic_adapt_" + daBreakpoint;

      if (daMatchMedia[index].matches) {
        //Перебрасываем элементы
        if (!daElement.classList.contains(daClassname)) {
          let actualIndex = indexOfElements(daDestination)[daPlace];
          if (daPlace === "first") {
            actualIndex = indexOfElements(daDestination)[0];
          } else if (daPlace === "last") {
            actualIndex = indexOfElements(daDestination)[
              indexOfElements(daDestination).length
            ];
          }
          daDestination.insertBefore(
            daElement,
            daDestination.children[actualIndex]
          );
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
    const daIndex = el.getAttribute("data-da-index");
    const originalPlace = originalPositions[daIndex];
    const parentPlace = originalPlace["parent"];
    const indexPlace = originalPlace["index"];
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
        if (childrenElement.getAttribute("data-da") == null) {
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
// ibg
function ibg() {
  let ibg = document.querySelectorAll("._ibg");
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector("img")) {
      ibg[i].style.backgroundImage =
        "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
    }
  }
}

ibg();

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
    