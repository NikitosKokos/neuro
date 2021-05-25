
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