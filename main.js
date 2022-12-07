import * as THREE from 'three';
        
import { OrbitControls } from 'three/addons/OrbitControls.js';

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // background color

// Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(5,5,5)

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Light
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 5, 5 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );
// Light
const ambientLight = new THREE.AmbientLight( 0xffffff, .7 );
scene.add( ambientLight );



// Base platform
const geometry = new THREE.BoxGeometry(10,1,10);
console.log(geometry);
const material = new THREE.MeshPhongMaterial( { color: 0x009900 } );
const platform = new THREE.Mesh( geometry, material );
scene.add( platform );
platform.position.x = -5;
platform.position.y = -5;
console.log(platform);



// controls

let controls = new OrbitControls( camera, renderer.domElement );
controls.listenToKeyEvents( window ); // optional
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;



renderer.render( scene, camera ); // t

const animate = function () {
    requestAnimationFrame( animate );
    
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    
    
    // required if controls.enableDamping or controls.autoRotate are set to true
    controls.update();
    
    renderer.render( scene, camera ); // this is like the update function
};

animate();