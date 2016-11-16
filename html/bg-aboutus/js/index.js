window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
            function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
    };
})();

// SCENE =========================================
var WIDTH = window.innerWidth,
   	HEIGHT = window.innerHeight;

// CAMERA ========================================
var VIEW_ANGLE = 10,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

// CANVAS INJECTED CONTAINER =====================
var $container = $( '#container' );

// THREE.JS SET UP ===============================
var renderer = new THREE.WebGLRenderer();
var camera = 
    new THREE.PerspectiveCamera(
        	VIEW_ANGLE,
        	ASPECT,
        	NEAR,
        	FAR);
var scene = new THREE.Scene();

// Additional settings ===========================
camera.position.z = 300;
renderer.setSize( WIDTH, HEIGHT );

// MESH Function ===============================
//Function from Phyramid Blog Post (https://www.phyramid.com/blog/making-phyramid-coms-procedurally-rendered-3d-header/)
var makePlaneGeometry = function( width, height, widthSegments, heightSegments) {
    var geometry = new THREE.PlaneGeometry(width, height, widthSegments, heightSegments);
 	var X_OFFSET_DAMPEN = 0.5;
    var Y_OFFSET_DAMPEN = 0.1;
    var Z_OFFSET_DAMPEN = 0.1;
    var randSign = function () { return (Math.random() > .5) ? 1 : -1; };
    
    for (var vertIndex = 0; vertIndex < geometry.vertices.length; vertIndex++) {
		geometry.vertices[vertIndex].x += Math.random() / X_OFFSET_DAMPEN * randSign();
      	geometry.vertices[vertIndex].y += Math.random() / Y_OFFSET_DAMPEN * randSign();
      	geometry.vertices[vertIndex].z += Math.random() / Z_OFFSET_DAMPEN * randSign();
    }
    
    geometry.dynamic = true;
    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    geometry.normalsNeedUpdate = true;
    return geometry;
}

var makePlane = function(geometry) {
	var material = new THREE.MeshBasicMaterial( { color: 0x00576b, wireframe: true });
    var plane = new THREE.Mesh( geometry, material );
    return plane;
};

var plane = makePlane(makePlaneGeometry(400, 400, 20, 20));
plane.rotation.z = 100;
plane.rotation.y = 12;
plane.rotation.x = 2;

scene.add( plane );

// RENDER 
$container.append( renderer.domElement );

// Render Function
var render = function () {
    requestAnimationFrame( render );

    // Rotation Animation
    plane.rotation.x += .001;

    //Render Initialize
    renderer.render( scene, camera );
};

render();