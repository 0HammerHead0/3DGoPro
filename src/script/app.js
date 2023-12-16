import * as THREE from 'three';
import gsap from 'gsap';
import '../style/style.css';

const container = document.querySelector('.webgl-content');
const sizes = {
  width: container.clientWidth * 1,
  height: container.clientHeight * 1
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas , alpha: true });
renderer.setSize(sizes.width, sizes.height);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 2;

document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.scroll-area');

  if (sections.length > 0) {
    document.querySelector('.scroll-container').addEventListener('scroll', function() {
      const scrollPos = this.scrollTop;
      let activeSection = 0;
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          activeSection = index + 1;
        }
      });

      handleSectionChange(activeSection);
    });
  }
});

function handleSectionChange(activeSection) {
  // Replace this with your desired actions based on the active section
  console.log(`Active Section: ${activeSection}`);
  // Call your functions or trigger events here
  // Example: YourFunctionName();
}


function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
animate();