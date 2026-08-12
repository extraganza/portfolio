(() => {
  const cursor = document.querySelector('.cursor');
  const cursorHover = document.querySelector('.cursor-hover');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (finePointer.matches && cursor && cursorHover) {
    document.body.classList.add('has-cursor');

    const moveCursor = (event) => {
      const transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.style.transform = transform;
      cursorHover.style.transform = transform;
    };

    window.addEventListener('pointermove', moveCursor, { passive: true });

    const hoverables = document.querySelectorAll('a, button, .work__media, .pair, .gum-grid');
    hoverables.forEach((node) => {
      node.addEventListener('pointerenter', () => {
        document.body.classList.add('is-hovering');
      });
      node.addEventListener('pointerleave', () => {
        document.body.classList.remove('is-hovering');
      });
    });

    finePointer.addEventListener('change', (event) => {
      if (!event.matches) {
        document.body.classList.remove('has-cursor', 'is-hovering');
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
