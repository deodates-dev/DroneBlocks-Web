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
var isCurving = false;
var curveCenter = { x: 0, y: 0 };
var curveRadius = 0;
var curveInitialPhase = 0;
var curveTargetPhase = 0;
var curveMiddlePhase = 0;
var hoverPeriod = 0;
var clock = 0;
var isFliping = false;
var inverseRotationMatrix;
var ringsCount = 5;
var ringBoxs = [];
let speed = 20 * 10 * 2.54; // 30in/s in height;
let isSpeedSet = false;
const droneFlipSpeed = Math.PI * 3; //flip speed.
const droneRotateSpeed = Math.PI;

var ringsChangeCount = 5;
var ringsPosConfig = [
  [
    { x: 1000, y: 1524, z: 0 },
    { x: 2000, y: 1824, z: -420 },
    { x: 3000, y: 2124, z: 0 },
    { x: 4000, y: 2424, z: -420 },
    { x: 5000, y: 2724, z: 0 },
  ],
  [
    { x: 8952, y: 4418, z: -822 },
    { x: 3641, y: 2380, z: 955 },
    { x: 9457, y: 423, z: 455 },
    { x: 1359, y: 2560, z: -331 },
    { x: 7614, y: 3317, z: 424 },
  ],
  [
    { x: 1528, y: 4887, z: 925 },
    { x: 4310, y: 4642, z: -653 },
    { x: 7525, y: 5285, z: 437 },
    { x: 9926, y: 3204, z: 110 },
    { x: 5158, y: 5161, z: -997 },
  ],
  [
    { x: 1354, y: 4883, z: 962 },
    { x: 6344, y: 776, z: 973 },
    { x: 9314, y: 2648, z: 317 },
    { x: 6457, y: 2119, z: -992 },
    { x: 5665, y: 940, z: -423 },
  ],
  [
    { x: 9668, y: 1568, z: 3328 },
    { x: 3801, y: 9939, z: -1633 },
    { x: 2191, y: 4910, z: 905 },
    { x: 4296, y: 822, z: -246 },
    { x: 9032, y: 9284, z: 1651 },
  ]
];

scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);
var SCREEN_WIDTH = window.innerWidth / 2, SCREEN_HEIGHT = window.innerHeight;
// camera attributes
var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 200000;
// set up camera
camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
// add the camera to the scene
scene.add(camera);
const zoomInverseFactor = 5;
camera.position.set(-zoomInverseFactor*3000, zoomInverseFactor*2000, zoomInverseFactor*100);
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
const horizontalGridHelper = new THREE.GridHelper(size, divisions);
let gridGroup = new THREE.Group();
gridGroup.name = "gridHelper";
gridGroup.add(horizontalGridHelper);
//Vertical Grid 1 XOY plane
const verticalGridHelper1 = new THREE.GridHelper(size, divisions);
verticalGridHelper1.rotation.z = Math.PI / 2;
gridGroup.add(verticalGridHelper1);
//Vertical Grid 2 XOZ plane
const verticalGridHelper2 = new THREE.GridHelper(size, divisions);
verticalGridHelper2.rotation.x = Math.PI / 2;
gridGroup.add(verticalGridHelper2);
scene.add(gridGroup);

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
  color: 0x999999, // Ground Color determine.
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
  drone.name = "drone";
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

//add ring
/* TorusGeometry(radius : Float, tube : Float, radialSegments : Integer, tubularSegments : Integer, arc : Float)
radius - Radius of the torus, from the center of the torus to the center of the tube. Default is 1.
tube — Radius of the tube. Default is 0.4.
radialSegments — Default is 8
tubularSegments — Default is 6.
arc — Central angle. Default is Math.PI * 2 */
const radius = 300; //Diameter = 60cm
const tube = 50;     //You can control thickness here
const radialSegments = 50;
const tubularSegments = 50;
var geometry = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
var material = new THREE.MeshPhongMaterial({ color: 0xff6700, shininess: 100, side: THREE.DoubleSide });
for (var i = 0; i < ringsCount; i++) {
  var mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.y = Math.PI / 2;
  mesh.visible = false;
  mesh.name = `ring${i}`;
  scene.add(mesh);
}

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
      collisionDetect();
      verticalFly(delta);
      fly(delta);
      yawRotate(delta);
      flip(delta);
      curveFly(delta);
    }
    toggleGridHelper(window.toggle);
    if (!!window.ringTrigger) {
      changeRings();
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
    if (window.commands[0] && window.commands[0].includes("curve") && !isCurving) {
      hoverPeriod = 1; //hover 1s for every command
      clock += delta;
      if (clock > hoverPeriod) {
        clock = 0;
        curveSetting(window.commands[0]);
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
      drone.rotation.set(0, 0, 0);
      isFlying = false;
      isCurving = false;
      isFliping = false;
      isFlyingForward = false;
      isHovering = false;
      isLanding = false;
      isRotating = false;
      isOnHeight = false;
      isOnForwardTarget = false;
      isOnRotateTarget = false;
      islanded = false;
      isHovered = false;
      isSpeedSet = false;
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

function distance2DVector(point1, point2) {
  var dx = 0;
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
        x: drone.position.x + subcommands[1] * 10 * 2.54, //webGl x asix = x in real;
        y: drone.position.y + subcommands[3] * 10 * 2.54, //webGL y axis = z in real;
        z: drone.position.z - subcommands[2] * 10 * 2.54,  //webGL z axis = -y in real 
      }
    } else if (distanceUnit == "cm") {
      target = {
        x: drone.position.x + subcommands[1] * 10, //webGl x asix = y in real;
        y: drone.position.y + subcommands[3] * 10, //webGL y axis = z in real;
        z: drone.position.z - subcommands[2] * 10,  //webGL z axis = -x in real;
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
function curveSetting(command) {
  isCurving = true;
  originPosX = drone.position.x;
  originPosY = drone.position.y;
  originPosZ = drone.position.z;
  const subcommands = command.split(",");
  const distanceUnit = subcommands[subcommands.length - 1];
  const P1x = subcommands[1];
  const P1y = subcommands[2];
  const P1z = subcommands[3];
  const P2x = subcommands[4];
  const P2y = subcommands[5];
  const P2z = subcommands[6];

  var Vector1 = new THREE.Vector3(P1x, P1y, P1z);
  var Vector2 = new THREE.Vector3(P2x, P2y, P2z);
  var normalVector = new THREE.Vector3(P1y * P2z - P2y * P1z, P2x * P1z - P1x * P2z, P1x * P2y - P2x * P1y);
  const { rotationMatrix, inverseMatrix } = getRotationMatrix(normalVector);
  inverseRotationMatrix = inverseMatrix;
  //console.log(rotationMatrix);
  //console.log(inverseRotationMatrix);
  var newVector1 = Vector1.applyMatrix3(rotationMatrix);
  var newVector2 = Vector2.applyMatrix3(rotationMatrix);

  const { center, radius, initialPhase, middlePhase, targetPhase } = getCircleFromThreePoints(newVector1, newVector2);
  if (distanceUnit == "in") {
    curveCenter.x = center.x * 10 * 2.54;
    curveCenter.y = center.y * 10 * 2.54;
    curveRadius = radius * 10 * 2.54;
  } else if (distanceUnit == "cm") {
    curveCenter.x = center.x * 10;
    curveCenter.y = center.y * 10;
    curveRadius = radius * 10;
  }
  curveInitialPhase = initialPhase;
  curveTargetPhase = targetPhase;
  curveMiddlePhase = middlePhase;
  console.log(curveInitialPhase, '--->', curveMiddlePhase, '---', curveTargetPhase);
}
function verticalFly(delta) {
  if (!isOnHeight && drone.position.y < 1524) {  // Drone Height is 152.5cm=5feet;
    drone.position.y += delta * speed;
  } else if ((drone.position.y >= 1524) && !isOnHeight) {
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
function curveFly(delta) {
  if (isCurving) {
    let angle;
    let distance;
    clock += delta;
    const omega = speed / curveRadius;
    distance = Math.abs(curveTargetPhase - curveInitialPhase);
    if (curveInitialPhase > curveMiddlePhase) {
      if (curveMiddlePhase > curveTargetPhase) { //A>B>C
        angle = -curveInitialPhase + omega * clock;
      } else if (curveTargetPhase > curveInitialPhase) { //C>A>B
        distance = Math.PI * 2 - distance;
        angle = -curveInitialPhase + omega * clock;
      } else {  //A>C>B
        distance = Math.PI * 2 - distance;
        angle = -curveInitialPhase - omega * clock;
      }
    } else if (curveInitialPhase < curveMiddlePhase) {
      if (curveMiddlePhase < curveTargetPhase) { //A<B<C
        angle = -curveInitialPhase - omega * clock;
      } else if (curveTargetPhase < curveInitialPhase) { //C<A<B
        distance = Math.PI * 2 - distance;
        angle = -curveInitialPhase - omega * clock;
      } else { //A<C<B
        distance = Math.PI * 2 - distance;
        angle = -curveInitialPhase + omega * clock;
      }
    }
    if (distance > omega * clock) {
      const deltaX = curveCenter.x + curveRadius * Math.cos(angle);
      const deltaY = curveCenter.y - curveRadius * Math.sin(angle);
      var transform2DVector = new THREE.Vector3(deltaX, deltaY, 0);
      var transform3DVector = transform2DVector.applyMatrix3(inverseRotationMatrix);
      //console.log(transform3DVector);
      drone.position.x = originPosX + transform3DVector.x;
      drone.position.z = originPosZ - transform3DVector.y;
      drone.position.y = originPosY - transform3DVector.z;
    } else {
      clock = 0;
      isCurving = false;
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

function getCircleFromThreePoints(Vector1, Vector2) {
  const x1 = Vector1.x;
  const y1 = Vector1.y;
  const x2 = Vector2.x;
  const y2 = Vector2.y;
  const A = x1 * y2 - x2 * y1;
  const B = (x2 * x2 + y2 * y2) * y1 - (x1 * x1 + y1 * y1) * y2;
  const C = (x1 * x1 + y1 * y1) * x2 - (x2 * x2 + y2 * y2) * x1;
  const centerX = -B / (2 * A);
  const centerY = -C / (2 * A);
  const radius = Math.sqrt(centerX * centerX + centerY * centerY);
  const initialPhase = Math.atan2(0 - centerY, 0 - centerX);
  const phase1 = Math.atan2(y1 - centerY, x1 - centerX);
  const phase2 = Math.atan2(y2 - centerY, x2 - centerX);
  const circleData = {
    center: {
      x: centerX,
      y: centerY
    },
    radius: radius,
    initialPhase,
    middlePhase: phase1,
    targetPhase: phase2
  };
  return circleData;
}


function getRotationMatrix(normalVector) {
  const a = normalVector.x;
  const b = normalVector.y;
  const c = normalVector.z;

  const cosAlpha = c / Math.sqrt(a * a + b * b + c * c);
  const sinAlpha = Math.sqrt((a * a + b * b) / (a * a + b * b + c * c));
  const u1 = b / Math.sqrt(a * a + b * b + c * c);
  const u2 = -a / Math.sqrt(a * a + b * b + c * c);

  const a11 = cosAlpha + u1 * u1 * (1 - cosAlpha);
  const a12 = u1 * u2 * (1 - cosAlpha);
  const a13 = u2 * sinAlpha;
  const a21 = a12;
  const a22 = cosAlpha + u2 * u2 * (1 - cosAlpha);
  const a23 = -u1 * sinAlpha;
  const a31 = -a13;
  const a32 = -a23;
  const a33 = cosAlpha;
  var rotationMatrix = new THREE.Matrix3();
  rotationMatrix.set(a11, a12, a13,
    a21, a22, a23,
    a31, a32, a33);
  var inverseMatrix = getInverseMatrix([...rotationMatrix.elements]);
  const result = {
    rotationMatrix,
    inverseMatrix
  }
  return result;
}

function getInverseMatrix([a, b, c, d, e, f, g, h, i]) {
  const det = a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  const a11 = (e * i - f * h) / det;
  const a12 = (c * h - b * i) / det;
  const a13 = (b * f - c * e) / det;
  const a21 = (f * g - d * i) / det;
  const a22 = (a * i - c * g) / det;
  const a23 = (c * d - a * f) / det;
  const a31 = (d * h - e * g) / det;
  const a32 = (b * g - a * h) / det;
  const a33 = (a * e - b * d) / det;
  var inverseMatrix = new THREE.Matrix3();
  inverseMatrix.set(a11, a12, a13,
    a21, a22, a23,
    a31, a32, a33);
  return inverseMatrix;
}

function collisionDetect() {
  if (ringsChangeCount === 5) {
    return;
  }
  var droneBox = new THREE.Box3().setFromObject(drone);
  ringBoxs.map(ringData => {
    var collision = ringData.box.intersectsBox(droneBox);
    var distanceFromCenter1 = distance2DVector(ringData.ring.position, droneBox.min);
    var distanceFromCenter2 = distance2DVector(ringData.ring.position, droneBox.max);
    var distanceFromCenter = Math.max(distanceFromCenter1, distanceFromCenter2);

    if (!!collision && (distanceFromCenter > (radius - tube))) {
      console.log('collision Detected');
      window.commands = ['reset'];
    }
  })
}

function toggleGridHelper(value) {
  var gridHelper = scene.getObjectByName("gridHelper");
  gridHelper.children.map(grid => {
    grid.visible = value;
  })
}

function changeRings() {
  ringsChangeCount++;
  if (ringsChangeCount > 5) {
    ringsChangeCount = 0;
  }
  if (ringsChangeCount < 5) {
    ringBoxs = [];
    for (var i = 0; i < ringsCount; i++) {
      var ring = scene.getObjectByName(`ring${i}`);
      ring.visible = true;
      ring.position.x = ringsPosConfig[ringsChangeCount][i].x;
      ring.position.y = ringsPosConfig[ringsChangeCount][i].y;
      ring.position.z = ringsPosConfig[ringsChangeCount][i].z;
      ringData = {
        ring: ring,
        box: new THREE.Box3().setFromObject(ring)
      }
      ringBoxs.push(ringData);
    }
  } else {
    for (var i = 0; i < ringsCount; i++) {
      var ring = scene.getObjectByName(`ring${i}`);
      ring.visible = false;
      ring.position.set(0, 0, 0);
      ringBoxs = [];
    }
  }
  window.ringTrigger = false;
}