var scene, camera, renderer, controls, drone;
var blade = [];
var keyboard = new THREEx.KeyboardState();
var clock = new THREE.Clock();

// custom global variables
var cube;
var isFlying = false;
var isFlyingForward = false;
var isOnHeight = false;
var originPosX = 0;
var originPosY = 0;
var originPosZ = 0;
var forwardDistance = 0;
var target;
var originAngle = 0;
var distanceAngle = 0;
var isOnForwardTarget = false;
var isRotating = false;
var rotateTarget = 0;
var isOnRotateTarget = false;
var isLanding = false;
let rotateSpeed = Math.PI / 180 * 80; //blade spin speed

let speed = 20 * 10 * 2.54; // 30in/s in height
const droneRotateSpeed = Math.PI / 2;

var commandString = "takeoff|fly_forward,20,in|yaw_left,180|fly_left,20,in|land";
var commands = commandString.split("|");
//console.log(commands);
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
camera.position.set(3000, 4000, 3000);
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

const size = 25000; //2500cm, 10cm = 100, 1 = 0.1cm
const divisions = 250;
const gridHelper = new THREE.GridHelper(size, divisions);

//scene.add(gridHelper);

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
      //console.log(child);
    }
  });
  drone = object;
  scene.add(drone);
  blade[0] = scene.getObjectByName("Blade01");
  blade[1] = scene.getObjectByName("Blade02");
  blade[2] = scene.getObjectByName("Blade03");
  blade[3] = scene.getObjectByName("Blade04");
  moveAxis(drone, blade[0]);
  moveAxis(drone, blade[1]);
  moveAxis(drone, blade[2]);
  moveAxis(drone, blade[3]);
}, onProgress, onError);

let then = 0;

(function animate(now) {
  window.addEventListener("resize", handleWindowResize);
  now *= 0.001;  // make it seconds

  const delta = now - then;
  //console.log(now);
  then = now;
  if (drone) {                //If model is loaded
    //camera.lookAt(scene.position);        
    if (isFlying) {
      blade[0].rotation.y -= rotateSpeed;
      blade[1].rotation.y += rotateSpeed;
      blade[2].rotation.y -= rotateSpeed;
      blade[3].rotation.y += rotateSpeed;
      if (!isOnHeight && drone.position.y < 1520) {  // Drone Height is 152cm;
        drone.position.y += delta * speed;
      } else if ((drone.position.y >= 1520) && !isOnHeight) {
        isOnHeight = true;
        commands.shift();
      }

      fly(delta);
      yawRotate(delta);
    }
    if (commands[0] && commands[0].includes("takeoff")) {
      isFlying = true;
    }
    if (commands[0] && commands[0].includes("fly") && !isFlyingForward) {
      flySetting(commands[0]);
    }
    if (commands[0] && commands[0].includes("yaw") && !isRotating) {
      yawRotateSetting(commands[0]);
    }
    if (commands[0] && commands[0].includes("land")) {
      if (drone.position.y > 0) {
        drone.position.y -= delta * speed;
      } else {
        rotateSpeed -= delta * rotateSpeed;
        if (rotateSpeed <= 0) {
          isFlying = false;
        } else {
          blade[0].rotation.y -= rotateSpeed;
          blade[1].rotation.y += rotateSpeed;
          blade[2].rotation.y -= rotateSpeed;
          blade[3].rotation.y += rotateSpeed;
        }
      }
    }

  }
  //console.log(commands[0]);
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

function moveAxis(object, mesh) {
  // Create a bounding box:
  var box = new THREE.Box3().setFromObject(mesh);
  // Reset mesh position:
  box.getCenter(mesh.position);
  var pivot = new THREE.Group();
  scene.add(pivot);
  pivot.add(mesh);
  mesh.geometry.center();
  object.add(mesh);
}

function distanceVector(point1, point2) {
  var dx = point1.x - point2.x;
  var dy = point1.y - point2.y;
  var dz = point1.z - point2.z;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function yawRotateSetting(command) {
  isRotating = true;
  originAngle = drone.rotation.y;
  const subcommands = command.split(",");
  //console.log(subcommands);
  distanceAngle = subcommands[1] * Math.PI / 180;
}

function yawRotate(delta) {
  const shiftAngle = Math.abs(drone.rotation.y - originAngle);
  if (isRotating && (shiftAngle < distanceAngle)) {
    const direction = getDirection(commands[0]);
    if (direction == 'right') {
      drone.rotation.y += delta * droneRotateSpeed;
    } else {
      drone.rotation.y -= delta * droneRotateSpeed;
    }
  } else if (isRotating && (shiftAngle >= distanceAngle) && !isOnRotateTarget) {
    isOnRotateTarget = true;
    isOnForwardTarget = false;
    commands.shift();
  }
}

function flySetting(command) {
  isFlyingForward = true;
  originPosX = drone.position.x;
  originPosY = drone.position.y;
  originPosZ = drone.position.z;
  const subcommands = command.split(",");
  const distanceUnit = subcommands[subcommands.length - 1];
  const direction = getDirection(command);
  console.log(direction);
  let distance;
  if (direction == 'xyz') {
    if (distanceUnit == "in") {
      target = {
        x: subcommands[2] * 10 * 2.54, //webGl x asix = y in real;
        y: subcommands[3] * 10 * 2.54, //webGL y axis = z in real;
        z: subcommands[1] * 10 * 2.54,  //webGL z axis = x in real 
      }
    } else if (distanceUnit == "cm") {
      target = {
        x: subcommands[2] * 10, //webGl x asix = y in real;
        y: subcommands[3] * 10, //webGL y axis = z in real;
        z: subcommands[1] * 10,  //webGL z axis = x in real 
      }
    }
    distance = distanceVector(drone.position, target);
  } else {
    distance = subcommands[1];
  }

  if (distanceUnit == "in") {
    forwardDistance = distance * 10 * 2.54 // Inchi to cm;
  } else if (distanceUnit == "cm") {
    forwardDistance = distance * 10 // number to cm
  }
}

function fly(delta) {
  const shiftLength = distanceVector(drone.position, { x: originPosX, y: originPosY, z: originPosZ });
  console.log(shiftLength + '---' + forwardDistance);
  if (isOnHeight && isFlyingForward && (shiftLength < forwardDistance)) {
    const direction = getDirection(commands[0]);
    console.log(direction);
    switch (direction) {
      case 'forward':
        drone.position.z += delta * speed * Math.cos(drone.rotation.y);
        drone.position.x += delta * speed * Math.sin(drone.rotation.y);
        break;
      case 'backward':
        drone.position.z -= delta * speed * Math.cos(drone.rotation.y);
        drone.position.x -= delta * speed * Math.sin(drone.rotation.y);
        break;
      case 'up':
        drone.position.y += delta * speed;
        break;
      case 'down':
        if (drone.position.y > 0) {
          drone.position.y -= delta * speed;
        }
        break;
      case 'right':
        drone.position.z += delta * speed * Math.cos(drone.rotation.y - Math.PI / 2);
        drone.position.x += delta * speed * Math.sin(drone.rotation.y - Math.PI / 2);
        console.log(Math.cos(drone.rotation.y + Math.PI / 2));
      case 'left':
        drone.position.z -= delta * speed * Math.cos(drone.rotation.y - Math.PI / 2);
        drone.position.x -= delta * speed * Math.sin(drone.rotation.y - Math.PI / 2);
      case 'xyz':

      //console.log(drone.position);

    }

  } else if (isFlyingForward && !isOnForwardTarget && (shiftLength >= forwardDistance)) {
    isOnForwardTarget = true;
    isFlyingForward = false;
    commands.shift();
  }
}

function getDirection(command) {
  const subcommands = command.split(",");
  const direction = subcommands[0].split("_")[1];
  return direction;
}