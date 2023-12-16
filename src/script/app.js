import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
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
const OrbitControl = new OrbitControls(camera, canvas);
OrbitControl.enableDamping = true;
const renderer = new THREE.WebGLRenderer({ canvas , alpha: true });
renderer.setSize(sizes.width, sizes.height);
const geometry = new THREE.BoxGeometry(1, 1, 1);
const materials = [
  new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Right face: red
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Left face: green
  new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Top face: blue
  new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Bottom face: yellow
  new THREE.MeshBasicMaterial({ color: 0x00ffff }), // Front face: cyan
  new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Back face: magenta
];
const cube = new THREE.Mesh(geometry, materials);
const axesHelper = new THREE.AxesHelper(); // 'size' determines the length of the axes lines
scene.add(cube,axesHelper);

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
  // console.log(activeSection);
  if (activeSection === 1) {
    animateToFrontFace();
  } else if (activeSection === 2) {
    animateToTopFace();
  } else if (activeSection === 3) {
    animateToRightFace();
  } else if (activeSection === 4) {
    animateToBackFace();
  }
}
function animateToFrontFace() {
  gsap.to(cube.rotation, { duration: 1, x: 0, y: 0, z: 0, ease: "power2.inOut" });
}

function animateToTopFace() {
  gsap.to(cube.rotation, { duration: 1, x: -Math.PI / 2, y: 0, z: 0, ease: "power2.inOut" });
}

function animateToRightFace() {
  gsap.to(cube.rotation, { duration: 1, x: 0, y: -Math.PI / 2, z: 0, ease: "power2.inOut" });
}

function animateToBackFace() {
  gsap.to(cube.rotation, { duration: 1, x: 0, y: Math.PI, z: 0, ease: "power2.inOut" });
}

// load a 3D model from models\gopro-hero-11-mini\source\GoPro HERO11 Mini.obj
// ---------------------- LOADING 3D MODEL ----------------------
const loader = new OBJLoader();
loader.setPath('models/gopro-hero-11-mini/source/');
loader.load(
  'gopro.obj',
  function (object) {
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
  },
  function (error) {
    console.error('An error occurred:', error);
  }
);

// ---------------------------------------------------------------

// ----------------------LIGHTING----------------------
const keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30,100%,75%)'), 1);
keyLight.position.set(-100, 0, 100);
scene.add(keyLight);
const fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240,100%,75%)'), 0.5);
fillLight.position.set(10, 10, 10);
scene.add(fillLight);
const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(-10, 10, -10);
scene.add(backLight);

// ---------------------------------------------------------------

time = Date.now();
function tick(){
  // Update Scrollbar
  const currentTime = Date.now();
  time = currentTime;
  // Update Orbital Controls
  OrbitControl.update();


  requestAnimationFrame(tick);
  renderer.render(scene, camera);
  
}
tick();


function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.005;
  OrbitControl.update();
  cube.rotation.y += 0.005;
  renderer.render(scene, camera);
}
// animate();
