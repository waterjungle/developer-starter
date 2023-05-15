import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextureLoader } from 'three';


window.Webflow ||= [];
window.Webflow.push(() => {
  init3D();
});

function init3D () {

  const viewport = document.querySelector('[data-3d="c"]');

// Renderer

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias:true,
});
renderer.setSize(viewport.clientWidth, viewport.clientHeight);
viewport.appendChild(renderer.domElement);

// Textures

const textureLoader = new THREE.TextureLoader();

const matCapTexture = textureLoader.load ('https://uploads-ssl.webflow.com/5ed6f317432bf509a2074478/645f7af4c004d57477feb550_matcap.png')
const normalTexture = textureLoader.load('https://uploads-ssl.webflow.com/5ed6f317432bf509a2074478/645f7ae076ff10c495ec2875_normal.jpg')



/**
 * Model
 */

const gltfLoader = new GLTFLoader ()

let enzoTop = null
gltfLoader.load (
    'https://uploads-ssl.webflow.com/5ed6f317432bf509a2074478/645f8252c004d57477047f55_enzo.gltf.txt',
 (gltf) =>
 {
    enzoTop = gltf.scene.children[1]
    enzoTop.traverse((o) => {
        if (o.isMesh) o.material = enzoMaterial;
    })
    enzoTop.position.z = 1.06,
//     gui.add(enzoTop.position, 'y', -10, 10, 0.01)
// .name('Device Top Y')
// gui.add(enzoTop.position, 'x', -10, 10, 0.01)
// .name('Device Top X')
// gui.add(enzoTop.position, 'z', -10, 10, 0.01)
// .name('Device Top Z')
// gui.add(enzoTop.rotation, 'y', -3.15, 0, 0.01)
// .name('Device Top Y Rotation')
    scene.add(enzoTop);


 const openAnimation = gsap.to(enzoTop.position, 
    { duration: openDuration, ease: "Power4.easeOut", 
     x: openPosition.x, z: openPosition.z, 
     paused: true},)

 const openRotation =
     gsap.to(enzoTop.rotation, 
    { duration: openDuration, ease: "Power4.easeOut", 
     y: Math.PI / -2, 
     paused: true},)

     buttonOpen.addEventListener('mousedown', () => {
      openAnimation.play();
      openRotation.play();
    })
    
    buttonOpen.addEventListener('mouseup', () => {
      openAnimation.reverse();
      openRotation.reverse();
    })


 }
 )

let enzoBottom = null
gltfLoader.load (
    'https://uploads-ssl.webflow.com/5ed6f317432bf509a2074478/645f8252c004d57477047f55_enzo.gltf.txt',
 (gltf) =>
 {
    enzoBottom = gltf.scene.children[0]
    enzoBottom.traverse((o) => {
        if (o.isMesh) o.material = enzoMaterial;
    })

    scene.add(enzoBottom)

 }
)

/** 
 * Enzo Positions
*/

const loadPosition = {x:0, y:-7.21, z: 1.06}
const lightPosition = {x:0, y:-3.03, z: 1.06}
const stashPosition = {x:0, y:0, z: 1.06}
const openPosition = {x:-3, y:0, z: 10}

const slideDuration = 0.4
const openDuration = 1.2

const buttonLoad = document.getElementById('btn-load')
const buttonLight = document.getElementById('btn-light')
const buttonStash = document.getElementById('btn-stash')
const buttonOpen = document.getElementById('btn-open')

/**
 * Enzo Interaction
 */

buttonLoad.addEventListener('click', () => {
  gsap.to(enzoTop.position, 
    { duration: slideDuration, ease: "power1.out", y: loadPosition.y})
})

buttonLight.addEventListener('click', () => {
  gsap.to(enzoTop.position, 
      { duration: slideDuration, ease: "power1.out", y: lightPosition.y})
})

buttonStash.addEventListener('click', () => {
  gsap.to(enzoTop.position, 
      { duration: slideDuration, ease: "power1.out", y: stashPosition.y})
})

/**
 * Open Enzo
 */


// Write a function that will resize the renderer when the window is resized
function onWindowResize () {
  camera.aspect = viewport.clientWidth / viewport.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(viewport.clientWidth, viewport.clientHeight);
}

// Add event listener to the window and call the function
window.addEventListener('resize', onWindowResize, false);

//camera
const camera = new THREE.PerspectiveCamera(
  75, //fov
  viewport.clientWidth / viewport.clientHeight, // aspect ratio
  0.1, //near
  100 // far
);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;

camera.position.z = 5;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(2, 2, 2);
const enzoMaterial = new THREE.MeshMatcapMaterial ({
  matcap: matCapTexture,
  normalMap: normalTexture
})
const cube = new THREE.Mesh(geometry, enzoMaterial);

// scene.add(cube);



// rendering

function animate () {

  requestAnimationFrame(animate)


cube.rotation.x += 0.01;
cube.rotation.y += 0.01;

controls.update();

if (enzoBottom) {
  const enzoFull = new THREE.Group();
  enzoFull.add( enzoTop );
  enzoFull.add( enzoBottom );

  enzoFull.scale.set(0.11, 0.11, 0.11)
enzoFull.position.y = 0.4
enzoFull.position.x = -0.3
enzoFull.rotation.x = Math.PI / -1.9
enzoFull.rotation.y = 0.8
enzoFull.rotation.z = Math.PI / -2.1

  scene.add(enzoFull)

  // openAnimation = gsap.to(enzoTop.position, 
  //   { duration: openDuration, ease: "Power4.easeInOut", 
  //    x: openPosition.x, y: openPosition.y, z: openPosition.z, 
  //    paused: true},)

  //  openRotation =
  //    gsap.to(enzoTop.rotation, 
  //   { duration: openDuration, ease: "Power4.easeInOut", 
  //    y: Math.PI / -2, 
  //    paused: true},)
}

renderer.render(scene, camera);
}

animate();
}

