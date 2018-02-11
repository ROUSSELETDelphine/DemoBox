if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var container, stats, clock, mixer;
var camera, scene, renderer, objects;
init();
animate();
function init() {
  container = document.getElementById( 'container' );
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.set( 2, 4, 5 );
  clock = new THREE.Clock();
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x000000, 0.035 );
  mixer = new THREE.AnimationMixer( scene );
  new THREE.JSONLoader().load( 'polygone.json', function ( geometry, materials ) {
  var mesh = new THREE.Mesh(geometry, materials);
  var s = THREE.Math.randFloat( 0.00075, 0.001 );
  mesh.scale.set(3, 3, 3);
  scene.add(mesh);
} );

  // lights
  var ambientLight = new THREE.AmbientLight( 0xcccccc );
  scene.add( ambientLight );

  var pointLight = new THREE.PointLight( 0xFFFFFF, 1.5 , 30 );
  pointLight.position.set( 10, 10, 10 );
  scene.add( pointLight );
  var pointLight2 = new THREE.PointLight( 0xFFFFFF, 1.5, 30 );
  pointLight2.position.set( -10, -10, -10 );
  scene.add( pointLight2 );
  // renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );
  // stats
  stats = new Stats();
  container.appendChild( stats.dom );
  // events
  window.addEventListener( 'resize', onWindowResize, false );
}
//
function onWindowResize( event ) {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
//
function animate() {
  requestAnimationFrame( animate );
  render();
  stats.update();
}
function render() {
  var timer = Date.now() * 0.0005;
  camera.position.x = Math.cos( timer ) * 10;
  camera.position.y = 4;
  camera.position.z = Math.sin( timer ) * 10;
  mixer.update( clock.getDelta() );
  camera.lookAt( scene.position );
  renderer.render( scene, camera );
}
