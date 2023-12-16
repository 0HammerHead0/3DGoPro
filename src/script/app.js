const pages = document.querySelectorAll('.page');

function scrollToPage(index, duration) {
  const targetPosition = pages[index].offsetTop;
  const startPosition = window.pageYOffset || document.documentElement.scrollTop;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  function scrollAnimation(currentTime) {
    const elapsedTime = currentTime - startTime;
    const scrollProgress = Math.min(elapsedTime / duration, 1);
    const newPosition = startPosition + distance * scrollProgress;

    window.scrollTo(0, newPosition);

    if (scrollProgress < 1) {
      requestAnimationFrame(scrollAnimation);
    }
  }

  requestAnimationFrame(scrollAnimation);
}

function findCurrentPage() {
  const scrollPosition = window.scrollY;
  let currentPageIndex = 0;

  pages.forEach((page, index) => {
    const offset = page.offsetTop;
    const pageHeight = page.offsetHeight;

    if (scrollPosition >= offset && scrollPosition < offset + pageHeight) {
      currentPageIndex = index;
    }
  });

  return currentPageIndex;
}

document.addEventListener('scroll', () => {
  console.log('scroll');
  const currentPageIndex = findCurrentPage();
  scrollToPage(currentPageIndex,1000);
});
