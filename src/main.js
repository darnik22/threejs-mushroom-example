import { Scene, PerspectiveCamera, WebGLRenderer,
	 DirectionalLight, AmbientLight, PlaneGeometry,
	 MeshPhongMaterial, Mesh, LoadingManager
       } from 'three';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

var scene = new Scene();
var camera = new PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
var renderer = new WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var dirLight = new DirectionalLight(0xffffff, 1.0);
dirLight.position.set(1,1,1);
scene.add(dirLight);

var ambLight = new AmbientLight(0xffffff, 0.1);
scene.add(ambLight);

var planeG = new PlaneGeometry(5,5);
var planeM = new MeshPhongMaterial({color:0x00ff00});
var plane = new Mesh(planeG, planeM);
plane.rotation.x = -Math.PI/2;
scene.add(plane);

var mushroom;
var controls = new OrbitControls( camera, renderer.domElement );

var manager = new LoadingManager();

manager.onLoad = function ( ) {
    console.log( 'Loading complete!');
};
manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
    console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded +
		 ' of ' + itemsTotal + ' files.' );
};
manager.onError = function ( url ) {
    console.log( 'There was an error loading ' + url );
};

var objLoader = new OBJLoader(manager);
var mtlLoader = new MTLLoader(manager);	 

mtlLoader.setPath('blender/');
mtlLoader.load(
    'mushroom.mtl',
    function ( materials ) {
	console.log(materials);
 	materials.preload();
 	objLoader.setMaterials(materials);
	objLoader.setPath('blender/');
 	objLoader.load(
 	    'mushroom.obj',
 	    function ( object ) {
 		object.children[0].material.shininess = 10;
 		object.scale.set(0.5, 0.5, 0.5);
 		scene.add( object );
		mushroom = object;
 	        console.log(object);
		console.log(scene);
		animate();
 	    },
 	    function(prog) {
 		console.log("OBJProgress: " + prog);
 	    },
 	    function(err) {
 		console.log("OBJError: " + err);
 	    }
 	);
    },
    function(prog) {
 	console.log("MTLProgress: " + prog);
    },
    function(err) {
 	console.log("MTLError: " + err);
    }
);

camera.position.z = 5;
camera.position.y = 2;
camera.lookAt(scene.position);
var animate = function () {
    requestAnimationFrame( animate );
    controls.update();

    renderer.render( scene, camera );
};

