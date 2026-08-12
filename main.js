(() => {
  const cursor = document.querySelector('.cursor');
  const cursorHover = document.querySelector('.cursor-hover');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (finePointer.matches && cursor && cursorHover) {
    document.body.classList.add('has-cursor');

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let currentX = x;
    let currentY = y;
    let rafId = 0;

    const render = () => {
      currentX += (x - currentX) * 0.22;
      currentY += (y - currentY) * 0.22;
      const transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      cursor.style.transform = transform;
      cursorHover.style.transform = transform;
      rafId = window.requestAnimationFrame(render);
    };

    window.addEventListener(
      'pointermove',
      (event) => {
        x = event.clientX;
        y = event.clientY;
      },
      { passive: true },
    );

    const hoverables = document.querySelectorAll('a, button, .work__media, .pair, .gum-grid');
    hoverables.forEach((node) => {
      node.addEventListener('pointerenter', () => {
        document.body.classList.add('is-hovering');
      });
      node.addEventListener('pointerleave', () => {
        document.body.classList.remove('is-hovering');
      });
    });

    rafId = window.requestAnimationFrame(render);

    finePointer.addEventListener('change', (event) => {
      if (!event.matches) {
        document.body.classList.remove('has-cursor', 'is-hovering');
        window.cancelAnimationFrame(rafId);
      }
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    reveals.forEach((node) => observer.observe(node));
  } else {
    reveals.forEach((node) => node.classList.add('is-visible'));
  }
})();
