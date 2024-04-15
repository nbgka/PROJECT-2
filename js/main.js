import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getFirstObjectWithName } from './RayCastHelper.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

var width = window.innerWidth;
var height = window.innerHeight;

// Set up the scene
var scene = new THREE.Scene();

// Add a camera
var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.x = 8;
camera.position.y = 3;
camera.position.z = 10;
camera.rotation.x = -0.01;
console.log(camera.position);

// Create a renderer
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#000000");
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);


//----------------- OBJECT ROTATION WITH MOUSE MOVE -----------------
// Define variables to store the previous mouse position
let previousMousePosition = {
    x: 0,
    y: 0
};

// Function to handle mouse movement
function onMouseMove(event) {
    // Calculate the change in mouse position
    const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
    };

    // Update the previous mouse position
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };

    // Adjust rotation based on mouse movement
    const rotationSpeed = 0.0001;
    orb.rotation.x += deltaMove.x * rotationSpeed;
    orb.rotation.y += deltaMove.y * rotationSpeed;
    
    // Adjust rotation based on mouse movement
    const objRotationSpeed = 0.0009;
    abstract.rotation.x += deltaMove.x * objRotationSpeed;
    abstract.rotation.y += deltaMove.y * objRotationSpeed;

    // Adjust rotation based on mouse movement
    const obj2RotationSpeed = 0.0010;
    coproCube.rotation.x += deltaMove.x * objRotationSpeed;
    coproCube.rotation.y += deltaMove.y * objRotationSpeed;
}
// Add event listener for mouse movement
document.addEventListener('mousemove', onMouseMove, false);

// Function to handle mouse movement
function moveObj(event) {
    // Your existing move object code here
}

// Add event listener for mouse movement
document.addEventListener('mousemove', moveObj, false);

// Add orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = false;
controls.enablePan = false;

//ADD ABSTRACT MODEL
var abstract;
//adding the 3D model 
const gltfLoader = new GLTFLoader();
gltfLoader.load('media/models/abstractCube.glb', function(gltf){
    abstract = gltf.scene;
    abstract.scale.set(10,10,10);
    abstract.position.set(0,0,0); //x,y,z
    scene.add(abstract);
});
console.log(scene);

//ORB
var orb;
//adding the 3D model 
const gltfLoader2 = new GLTFLoader();
gltfLoader.load('media/models/orbPink.glb', function(gltf){
    orb = gltf.scene;
    orb.scale.set(3,3,3);
    orb.position.set(0,0,0);
    orb.rotation.x = THREE.MathUtils.degToRad(90);
    scene.add(orb);
    // Material
    const orbMaterial = new THREE.MeshStandardMaterial({ color: "#f0f", side: THREE.DoubleSide }); // lighter shade of pink
    orb.material = orbMaterial;
});

//add wireframe geometry
const geometry = new THREE.SphereGeometry(1, 20, 20);
const material = new THREE.MeshBasicMaterial({ color: "#f0f", wireframe: true });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
sphere.position.set(0,0,0);
sphere.scale.set(3,3,3);

// //add wireframe geometry
// const geometry2 = new THREE.BoxGeometry(1, 1, 1);
// const material2 = new THREE.MeshBasicMaterial({ color: "#f0f", wireframe: true });
// const cube = new THREE.Mesh(geometry2, material2);
// scene.add(cube);
// cube.position.set(0,0,0);
// cube.scale.set(3,3,3);
// cube.name = "cube";

/////////------------Add Image-------------------/////////
//create a texture loader
const textureLoader = new THREE.TextureLoader();
//load the image as a texture
const coproTexture = textureLoader.load('media/images/texture3.jpg');

//create a material using the texture
const coproMaterial = new THREE.MeshBasicMaterial({map: coproTexture});

const coproGeometry = new THREE.BoxGeometry(1,1,1);

const coproCube = new THREE.Mesh(coproGeometry, coproMaterial);
scene.add(coproCube);

coproCube.scale.set(3,3,3);
coproCube.position.set(0,0,0);

// Add ambient light
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// Point Light
var lightSize = 2;
var light = new THREE.PointLight(0xFFFFF, lightSize, 200); 
light.position.set(0, 10, 0);
scene.add(light);

// Directional Light
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(-1, 0.5, 0.5);
scene.add(directionalLight);

// Resize window
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Render the scene
function animate() {
    requestAnimationFrame(animate);

    // Rotate the abstract model
    if (abstract) {
        abstract.rotation.y += 0.001; // Adjust rotation speed as needed
    }

    // Rotate the orb model
    if (orb) {
        orb.rotation.x += 0.001; // Adjust rotation speed as needed
    }

    // Rotate the sphere model
    if (sphere) {
        sphere.rotation.y += 0.002; 
        sphere.rotation.x += 0.002;
    }

    if (coproCube) {
         coproCube.rotation.y += 0.002; 
         coproCube.rotation.x += 0.002;
    }

    renderer.render(scene, camera);
}

animate();
