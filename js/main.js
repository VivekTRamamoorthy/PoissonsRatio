import * as THREE from './three.module.js';
        
import { OrbitControls } from './OrbitControls.js';

// scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // background color

// Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(10,10,10)

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Axes
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

// Light
const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 0, 5, 5 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );
// Light
const ambientLight = new THREE.AmbientLight( 0xffffff, .7 );
scene.add( ambientLight );

// constants
let blockWidth = 1;
let platformThickness = 1;
let blockSpacing = 2;
let platformWidth = blockWidth+2*blockSpacing;
let blockHeight = 5;
let noOfBlocks = 5;
let platformLength = blockWidth*noOfBlocks+blockSpacing*(noOfBlocks+1)

// Base platform
const geometry = new THREE.BoxGeometry(platformWidth,platformThickness,platformLength);
const materialGrass = new THREE.MeshPhongMaterial( { color: 0x009900 } );
const platform = new THREE.Mesh( geometry, materialGrass );
scene.add( platform );
platform.position.x = 0;
platform.position.y = -platformThickness/2;
platform.position.z = 0;

// block 1
// Base platform
const materialSteel = new THREE.MeshPhongMaterial( { color: 0x71797E } );
let blocks = [];
for (let blockNo = 0; blockNo < noOfBlocks; blockNo++) {
    const geometryBlock1 = new THREE.BoxGeometry(blockWidth,blockHeight,blockWidth);
    const block = new THREE.Mesh( geometryBlock1, materialSteel );
    scene.add( block );
    block.position.x = 0;
    block.position.y = (blockHeight)/2;
    block.position.z = (blockNo+1)*(blockSpacing+blockWidth)-platformLength/2;
    blocks[blockNo]=block;
    
}



// controls

let controls = new OrbitControls( camera, renderer.domElement );
// controls.listenToKeyEvents( window ); 
controls.enableDamping = true; 
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;



renderer.render( scene, camera ); // t

const animate = function () {
    requestAnimationFrame( animate );
    
    // Update
    controls.update();

    // Render
    renderer.render( scene, camera ); 
};

animate();