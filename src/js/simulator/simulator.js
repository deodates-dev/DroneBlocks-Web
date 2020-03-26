var scene, camera, renderer, controls, drone;
var blade1, blade2, blade3, blade4;
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

// custom global variables
var cube;

scene = new THREE.Scene();
scene.background = new THREE.Color(0xcce0ff);
scene.fog = new THREE.Fog(0xcce0ff, 1000, 150000);


var SCREEN_WIDTH = window.innerWidth / 2, SCREEN_HEIGHT = window.innerHeight;
// camera attributes
var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 200000;
// set up camera
camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
// add the camera to the scene
scene.add(camera);
camera.position.set(0, 600, 1600);
camera.lookAt(scene.position);
scene.add(new THREE.AxesHelper(200000));

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
controls.minDistance = 200;
controls.maxDistance = 60000;
controls.maxPolarAngle = Math.PI * 0.48;

/* const size = 250;
const divisions = 25;
const gridHelper = new THREE.GridHelper(size, divisions);

scene.add(gridHelper); */

scene.add(new THREE.AmbientLight(0x666666));

var light = new THREE.DirectionalLight(0xdfebff, 1);
light.position.set(50, 200, 100);
light.position.multiplyScalar(1.3);

light.castShadow = true;

light.shadow.mapSize.width = 1024;
light.shadow.mapSize.height = 1024;

var d = 300;

light.shadow.camera.left = - d;
light.shadow.camera.right = d;
light.shadow.camera.top = d;
light.shadow.camera.bottom = - d;

light.shadow.camera.far = 1000;

scene.add(light);

/*   var pointLightHelper = [];
  var sphereSize = 10;
  pointLightHelper[0] = new THREE.PointLightHelper(hemiLight, sphereSize);
  pointLightHelper[1] = new THREE.PointLightHelper(dirLight, sphereSize);
  scene.add(pointLightHelper[0]);
  scene.add(pointLightHelper[1]); */


// ground
var loader = new THREE.TextureLoader();
var groundTexture = loader.load('https://threejs.org/examples/textures/terrain/grasslight-big.jpg');
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(25, 25);
groundTexture.anisotropy = 16;
groundTexture.encoding = THREE.sRGBEncoding;

var groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });

var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(100000, 100000), groundMaterial);
mesh.position.y = 0;
mesh.rotation.x = - Math.PI / 2;
mesh.receiveShadow = true;
scene.add(mesh);



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
    if (!!child.name.includes("Blade")) {
      console.log(child);

    }
  });
  drone = object;
  scene.add(drone);
  blade1 = scene.getObjectByName("Blade01");
  blade2 = scene.getObjectByName("Blade02");
  blade3 = scene.getObjectByName("Blade03");
  blade4 = scene.getObjectByName("Blade04");

}, onProgress, onError);


(function animate() {
  window.addEventListener("resize", handleWindowResize);
  requestAnimationFrame(animate);
  if (drone) {
    drone.position.x += 0.4;
    drone.position.y += 0.2;
    //blade1.rotation.y += 0.5;
  }
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
