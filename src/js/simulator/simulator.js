var scene, camera, renderer, controls;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

// custom global variables
var cube;

scene = new THREE.Scene();

var SCREEN_WIDTH = window.innerWidth / 2, SCREEN_HEIGHT = window.innerHeight;
// camera attributes
var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 20000;
// set up camera
camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
// add the camera to the scene
scene.add(camera);

camera.position.set(0, 300, 800);
camera.lookAt(scene.position);

// create and start the renderer; choose antialias setting.
if (Detector.webgl) {
  renderer = new THREE.WebGLRenderer({ antialias: true });
} else {
  renderer = new THREE.CanvasRenderer();
}

renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
document.getElementById("droneArea").appendChild(renderer.domElement);

// automatically resize renderer
THREEx.WindowResize(renderer, camera);
// toggle full-screen on given key press
//THREEx.FullScreen.bindKey({ charCode: 'm'.charCodeAt(0) });
controls = new THREE.OrbitControls(camera, renderer.domElement);

const size = 250;
const divisions = 25;
const gridHelper = new THREE.GridHelper(size, divisions);

scene.add(gridHelper);

var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
hemiLight.color = new THREE.Color(0.6, 0.6, 0.5);
hemiLight.groundColor = new THREE.Color(0.095, 0.1, 0.5);
hemiLight.position.set(0, 500, 0);
scene.add(hemiLight);

var hemiLight2 = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
hemiLight2.color = new THREE.Color(0.6, 0.6, 0.5);
hemiLight2.groundColor = new THREE.Color(0.095, 0.1, 0.5);
hemiLight2.position.set(0, -500, 0);
scene.add(hemiLight2);

var dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(-1, 0.6, 1);
dirLight.position.multiplyScalar(50);
dirLight.name = "dirlight";

scene.add(dirLight);

dirLight.castShadow = true;
dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024 * 2;

var d = 300;

dirLight.shadowCameraLeft = -d;
dirLight.shadowCameraRight = d;
dirLight.shadowCameraTop = d;
dirLight.shadowCameraBottom = -d;

dirLight.shadowCameraFar = 3500;
dirLight.shadowBias = -0.0001;
dirLight.shadowDarkness = 0.35;

/*   var pointLightHelper = [];
  var sphereSize = 10;
  pointLightHelper[0] = new THREE.PointLightHelper(hemiLight, sphereSize);
  pointLightHelper[1] = new THREE.PointLightHelper(dirLight, sphereSize);
  scene.add(pointLightHelper[0]);
  scene.add(pointLightHelper[1]); */

var skyBoxGeometry = new THREE.BoxGeometry(10000, 10000, 10000),
  skyBoxMaterial = new THREE.MeshBasicMaterial({ color: 0x9999ff, side: THREE.BackSide }),
  skyBox = new THREE.Mesh(skyBoxGeometry, skyBoxMaterial);
scene.add(skyBox);
var manager = new THREE.LoadingManager();
manager.onProgress = function (item, loaded, total) {
  console.log(item, loaded, total);
};

var onProgress = function (xhr) {
  if (xhr.lengthComputable) {
    var percentComplete = xhr.loaded / xhr.total * 100;
    console.log(Math.round(percentComplete, 2) + '% downloaded');
  }
};
var onError = function (xhr) { };

var loader = new THREE.OBJLoader(manager);
loader.crossOrigin = 'anonymous';
loader.load('https://cors-anywhere.herokuapp.com/https://bfmblob.blob.core.windows.net/partlibrary/drone.obj', function (object) {

  object.traverse(function (child) {
    console.log(child)
  });

  scene.add(object);

}, onProgress, onError);

// fog must be added to scene before first render
scene.fog = new THREE.FogExp2(0x9999ff, 0.00025);

(function animate() {
  window.addEventListener("resize", handleWindowResize);
  requestAnimationFrame(animate);
  render();
  update();
})();

function update() {
  // delta = change in time since last call (in seconds)
  var delta = clock.getDelta();
  // update controls
  controls.update();
}
function render() {
  renderer.render(scene, camera);
}
function handleWindowResize() {
  const width = document.getElementById("droneArea").clientWidth;
  const height = document.getElementById("droneArea").clientHeight;

  this.renderer.setSize(width, height);
  camera.aspect = width / height;

  // Note that after making changes to most of camera properties you have to call
  // .updateProjectionMatrix for the changes to take effect.
  camera.updateProjectionMatrix();
};
