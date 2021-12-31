
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