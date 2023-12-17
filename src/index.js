import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import './style.css';

const container = document.querySelector('.webgl-content');
const sizes = {
  width: container.clientWidth * 1,
  height: container.clientHeight * 1
};
// console.log(THREE.REVISION); 
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
const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);
camera.position.set(0, 0, 2); // Set the camera to its initial position
function resetCamera() {
    gsap.to(camera.position, {
        duration: 0.5,
        x: 0,
        y: 0,
        z: 2,
        ease: "power2.inOut"
    });

    gsap.to(camera.rotation, {
        duration: 0.5,
        x: 0,
        y: 0,
        z: 0,
        ease: "power2.inOut"
    });
}
resetCamera();
var model;
var prevSection = 0;
var currSection = 1;
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.scroll-area');
    if (sections.length > 0) {
        document.querySelector('.scroll-container').addEventListener('scroll', function() {
            const scrollPos = this.scrollTop;
            let activeSection = 0;

            // Find the active section based on scroll position
            sections.forEach((section, index) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    activeSection = index + 1;
                }
            });
            if (activeSection !== currSection) {
                prevSection = currSection;
                currSection = activeSection;
                gsap.to(sections[prevSection - 1], { opacity: 0, duration: 0.4 });
                gsap.to(sections[currSection - 1], { opacity: 1, duration: 0.4 });
                handleSectionChange(activeSection);
            }
        });
    }
});
function handleSectionChange(activeSection) {
    console.log(activeSection);
    if (activeSection === 1) {
        resetCamera();
        animateToFrontFace();
    } else if (activeSection === 2) {
        resetCamera();
        animateToTopFace();
    } else if (activeSection === 3) {
        resetCamera();
        animateToRightFace();
    } else if (activeSection === 4) {
        resetCamera();
        animateToBackFace();
    }
}
function animateToFrontFace() {
    gsap.to(model.rotation, { duration: 0.7, x: Math.PI, y:0, z: 0, ease: "power2.inOut" });
}

function animateToTopFace() {
    gsap.to(model.rotation, { duration: 0.7, x: Math.PI/2 , y:0, z:  Math.PI, ease: "power2.inOut" });
}

function animateToRightFace() {
    gsap.to(model.rotation, { duration: 0.7, x: 0, y: Math.PI / 2, z: Math.PI, ease: "power2.inOut" });
}

function animateToBackFace() {
    gsap.to(model.rotation, { duration: 0.7, x:Math.PI, y:-Math.PI/2, z:0 , ease: "power2.inOut" });
}


var time = Date.now();
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


const keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(198, 100%, 50%)'), 50);
keyLight.position.set(-10, 10, 5);
scene.add(keyLight);
const fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(305, 100%, 50%)'), 10);
fillLight.position.set(10, 10, 5);
scene.add(fillLight);
const backLight = new THREE.DirectionalLight(0xffffff, 50);
backLight.position.set(-10, 10, -10);
scene.add(backLight);
const frontLight = new THREE.DirectionalLight(0xffffff, 5);
frontLight.position.set(0, -4, 0);
scene.add(frontLight);


const gltfLoader = new GLTFLoader();
gltfLoader.load(
    'models/gltf/scene.gltf',
    (gltf) =>
    {
        model = gltf.scene.children[0];
        const scaleFactor = 0.025;
        model.scale.set(scaleFactor, scaleFactor, scaleFactor);
        model.rotation.y = Math.PI;
        scene.add(model); 
        fillLight.target = model;
        frontLight.target = model;
    },
    (progress) =>
    {
        console.log('progress', progress);
    },
    (error) =>
    {
        console.log('error', error);
    }
);
        
        