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
var islanded = false;
let rotateSpeed = Math.PI / 180 * 80; //blade spin speed;
var isHovering = false;
var isHovered = false;
var hoverPeriod = 0;
var clock = 0;
var isFliping = false;

let speed = 20 * 10 * 2.54; // 30in/s in height;
let isSpeedSet = false;
const droneFlipSpeed = Math.PI * 3; //flip speed.
const droneRotateSpeed = Math.PI;

//var window.commandstring = "takeoff|flip_left|fly_forward,20,in|yaw_right,180|hover,3|fly_forward,20,in|land|takeoff|fly_forward,20,in|yaw_right,180|fly_forward,20,in|land|takeoff|fly_forward,20,in|yaw_right,180|fly_forward,20,in|land";

scene = new THREE.Scene();
scene.background = new THREE.Color(0xcce0ff);
var SCREEN_WIDTH = window.innerWidth / 2, SCREEN_HEIGHT = window.innerHeight;
// camera attributes
var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 200000;
// set up camera
camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
// add the camera to the scene
scene.add(camera);
camera.position.set(-3000, 2000, 100);
camera.lookAt(scene.position);
scene.add(new THREE.AxesHelper(2600));

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
const divisions = 250; //1 division = 10cm;
const gridHelper = new THREE.GridHelper(size, divisions);

scene.add(gridHelper);

scene.add(new THREE.AmbientLight(0x666666));

var light = new THREE.DirectionalLight(0xdfebff, 1);
light.position.set(0, 200, 0);
light.position.multiplyScalar(1.3);

//light.castShadow = true;

//light.shadow.mapSize.width = 1024;
//light.shadow.mapSize.height = 1024;

var d = 300;

light.shadow.camera.left = - d;
light.shadow.camera.right = d;
light.shadow.camera.top = d;
light.shadow.camera.bottom = - d;

light.shadow.camera.far = 1000;

scene.add(light);


var material = new THREE.MeshBasicMaterial({
  color: 0xff0000, // Ground Color determine.
})

var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(100000, 100000), material);
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

var textureLoader = new THREE.TextureLoader();
textureLoader.setPath('assets/textures/');
var bodyTexture = textureLoader.load('Drone_mat_Diffuse.png');
var lightTexture = textureLoader.load('LED_Emissive.png');
var glassTexture = textureLoader.load('glass_mat _Normal.png');

var objLoader = new THREE.OBJLoader(manager);
objLoader.setPath('assets/');
objLoader.load('drone.obj', function (object) {

  object.traverse(function (child) {
    if (child instanceof THREE.Mesh) {
      child.material.map = bodyTexture;
      if (child.name == "green_light") {
        child.material.map = lightTexture;
      }
      if (child.name == "glass") {
        child.material.map = glassTexture;
      }
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
  if (!window.commands) {
    window.commands = ['stay'];
  }
  window.commands = window.commands.filter(command => command.length > 0);
  const delta = now - then;
  then = now;
  if (drone) {             //If model is loaded
    //camera.lookAt(drone.position);
    if (isFlying) {
      blade[0].rotation.y -= rotateSpeed;
      blade[1].rotation.y += rotateSpeed;
      blade[2].rotation.y -= rotateSpeed;
      blade[3].rotation.y += rotateSpeed;
      verticalFly(delta);
      fly(delta);
      yawRotate(delta);
      flip(delta);
    }
    if (window.commands[0] && window.commands[0].includes("takeoff")) {
      hoverPeriod = 1; //hover 1s for every command
      clock += delta;
      if (clock > hoverPeriod) {
        isFlying = true;
        isOnHeight = false;
        rotateSpeed = Math.PI / 180 * 80;
      }
    }
    if (window.commands[0] && window.commands[0].includes("fly") && !isFlyingForward) {
      hoverPeriod = 1; //hover 1s for every command
      clock += delta;
      if (clock > hoverPeriod) {
        flySetting(window.commands[0]);
      }
    }
    if (window.commands[0] && window.commands[0].includes("yaw") && !isRotating) {
      hoverPeriod = 1; //hover 1s for every command
      clock += delta;
      if (clock > hoverPeriod) {
        yawRotateSetting(window.commands[0]);
      }
    }
    if (window.commands[0] && window.commands[0].includes("speed") && !isSpeedSet) {
      speedControl(window.commands[0]);
      window.commands.shift();
    }
    if (window.commands[0] && window.commands[0].includes("hover")) {
      isOnHeight = true;
      const subcommands = window.commands[0].split(",");
      hoverPeriod = subcommands[1];
      clock += delta;
      if (clock > hoverPeriod) {
        window.commands.shift();
        clock = 0;
      }
    }
    if (window.commands[0] && window.commands[0].includes("flip") && !isFliping) {
      hoverPeriod = 1;
      clock += delta;
      const direction = getDirection(window.commands[0]);
      if (clock > hoverPeriod) {
        clock = 0;
        isFliping = true;
        if ((direction == 'left') || (direction == 'right')) {
          originAngle = drone.rotation.x;
        } else {
          originAngle = drone.rotation.z;
        }
      }
    }
    if (window.commands[0] && window.commands[0].includes("land") && !islanded) {
      hoverPeriod = 1;
      clock += delta;
      if (clock > hoverPeriod) {
        land(delta);
      }
    }
    if (window.commands[0] && window.commands[0].includes("stay")) {
      clock = 0;
    }
    if (window.commands[0] && window.commands[0].includes("reset")) {
      drone.position.set(0, 0, 0);
      isFlying = false;
      clock = 0;
      commands.shift();
    }
  }
  //console.log(window.commands[0]);
  requestAnimationFrame(animate);
  render();
  update();
})();

function update() {
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
    isOnRotateTarget = false;
    const direction = getDirection(window.commands[0]);
    if (direction == 'right') {
      drone.rotation.y -= delta * droneRotateSpeed;
    } else {
      drone.rotation.y += delta * droneRotateSpeed;
    }
  } else if (isRotating && (shiftAngle >= distanceAngle) && !isOnRotateTarget) {
    isOnRotateTarget = true;
    isOnForwardTarget = false;
    isRotating = false;
    window.commands.shift();
    clock = 0;
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
        x: drone.position.x + subcommands[2] * 10 * 2.54, //webGl x asix = y in real;
        y: drone.position.y + subcommands[3] * 10 * 2.54, //webGL y axis = z in real;
        z: drone.position.z + subcommands[1] * 10 * 2.54,  //webGL z axis = x in real 
      }
    } else if (distanceUnit == "cm") {
      target = {
        x: drone.position.x + subcommands[2] * 10, //webGl x asix = y in real;
        y: drone.position.y + subcommands[3] * 10, //webGL y axis = z in real;
        z: drone.position.z + subcommands[1] * 10,  //webGL z axis = x in real;
      }
    }
    forwardDistance = distanceVector(drone.position, target);
  } else {
    distance = subcommands[1];
    if (distanceUnit == "in") {
      forwardDistance = distance * 10 * 2.54 // Inchi to cm;
    } else if (distanceUnit == "cm") {
      forwardDistance = distance * 10 // number to cm

    }
  }
}
function verticalFly(delta) {
  if (!isOnHeight && drone.position.y < 1520) {  // Drone Height is 152cm;
    drone.position.y += delta * speed;
  } else if ((drone.position.y >= 1520) && !isOnHeight) {
    isOnHeight = true;
    window.commands.shift();
    clock = 0;
  }
}
function fly(delta) {
  const shiftLength = distanceVector(drone.position, { x: originPosX, y: originPosY, z: originPosZ });
  if (isOnHeight && isFlyingForward && (shiftLength < forwardDistance)) {
    isOnForwardTarget = false;
    const direction = getDirection(window.commands[0]);
    switch (direction) {
      case 'forward':
        drone.position.z += delta * speed * Math.sin(-drone.rotation.y);
        drone.position.x += delta * speed * Math.cos(-drone.rotation.y);
        break;
      case 'backward':
        drone.position.z -= delta * speed * Math.sin(-drone.rotation.y);
        drone.position.x -= delta * speed * Math.cos(-drone.rotation.y);
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
        drone.position.z += delta * speed * Math.sin(-drone.rotation.y + Math.PI / 2);
        drone.position.x += delta * speed * Math.cos(-drone.rotation.y + Math.PI / 2);
        break;
      case 'left':
        drone.position.z += delta * speed * Math.sin(-drone.rotation.y - Math.PI / 2);
        drone.position.x += delta * speed * Math.cos(-drone.rotation.y - Math.PI / 2);
        break;
      case 'xyz':
        if (drone.position.y > 0) {
          const speedRatio = (target.y - originPosY) / forwardDistance;
          drone.position.x += delta * speed * (target.x - originPosX) / forwardDistance;
          drone.position.y += delta * speed * (target.y - originPosY) / forwardDistance;
          drone.position.z += delta * speed * (target.z - originPosZ) / forwardDistance;
        }
        break;
      default:
      //console.log(drone.position);

    }

  } else if (isFlyingForward && !isOnForwardTarget && (shiftLength >= forwardDistance)) {
    isOnForwardTarget = true;
    isFlyingForward = false;
    window.commands.shift();
    clock = 0;
  }
}

function flip(delta) {
  if (isFliping) {
    const direction = getDirection(window.commands[0]);
    const distanceAngle = Math.PI * 2;
    let angleShift;
    if ((direction == 'left') || (direction == 'right')) {
      angleShift = Math.abs(drone.rotation.x - originAngle);
    } else {
      angleShift = Math.abs(drone.rotation.z - originAngle);
    }
    if ((angleShift <= distanceAngle) && isFliping) {
      switch (direction) {
        case 'forward':
          drone.rotation.z -= delta * droneFlipSpeed;
          break;
        case 'backward':
          drone.rotation.z += delta * droneFlipSpeed;
          break;
        case 'right':
          drone.rotation.x += delta * droneFlipSpeed;
          break;
        case 'left':
          drone.rotation.x -= delta * droneFlipSpeed;
          break;
      }
    } else if ((angleShift > distanceAngle) && isFliping) {
      isFliping = false;
      drone.rotation.x = 0;
      drone.rotation.z = 0;
      window.commands.shift();
    }
  }
}
function land(delta) {
  if (drone.position.y > 0) {
    drone.position.y -= delta * speed;
  } else {
    let speedLimit;
    drone.position.y = 0;
    if (window.commands.length == 1) {
      speedLimit = 1;
      rotateSpeed -= delta * rotateSpeed;
      if (rotateSpeed <= speedLimit) {
        isFlying = false;
        isLanded = true;
        isOnHeight = false;
        window.commands.shift();
        clock = 0;
      }
    } else {
      isFlying = false;
      isLanded = true;
      isOnHeight = false;
      window.commands.shift();
      clock = 0;
    }
  }
}

function getDirection(command) {
  const subcommands = command.split(",");
  const direction = subcommands[0].split("_")[1];
  return direction;
}

function speedControl(command) {
  const subcommands = command.split(",");
  const speedFactor = subcommands[1];
  const speedUnit = subcommands[2];
  if (speedUnit == 'in/s') {
    speed = speedFactor * 10 * 2.54;
  } else if (speedUnit == 'cm/s') {
    speed = speedFactor * 10;
  }
}
