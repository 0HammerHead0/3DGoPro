const pages = document.querySelectorAll('.page');
console.log(pages);
document.addEventListener('scroll', () => {
    console.log('scroll')
  const scrollPosition = window.scrollY;
  pages.forEach((page, index) => {
    const offset = page.offsetTop;
    if (scrollPosition >= offset && scrollPosition < offset + window.innerHeight) {
      scrollToPage(index);
    }
  });
});

function scrollToPage(index) {
  window.scrollTo({
    top: pages[index].offsetTop,
    behavior: 'smooth'
  });
}
