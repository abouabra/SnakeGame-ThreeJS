const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();


const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10000
);
camera.position.z = 50;

const controls = new THREE.OrbitControls(camera, renderer.domElement);
const stats = new Stats();
document.body.appendChild(stats.dom);
const GUI = new dat.GUI();




var directionalLight = new THREE.PointLight(0xffffff, 1, 500, 0.01);
directionalLight.castShadow = true; // default false
directionalLight.position.z = 100;
scene.add(directionalLight);

const lightFolder = GUI.addFolder("Directional Light");
lightFolder.add(directionalLight.position, "x", -100, 100);
lightFolder.add(directionalLight.position, "y", -100, 100);
lightFolder.add(directionalLight.position, "z", -100, 100);



let font; // Declare font as a global variable
let scoreTextMesh = new THREE.Mesh();
let score = 0;
const params = {
	size: 4,
	height: 1,
	curveSegments: 3,
	bevelEnabled: true,
	bevelThickness: 0.5,
	bevelSize: 0.3,
	bevelSegments: 2,
};
const loader = new THREE.FontLoader();
loader.load("./Pacifico_Regular.json", (loadedFont) => {
// loader.load("./FFF_Forward_Regular.json", (loadedFont) => {
	font = loadedFont; // Assign font to global variable
	createScoreText(font);
});

function createScoreText(font) {
	scoreTextMesh = new THREE.Mesh(
		new THREE.TextGeometry("Score: 0", {
			font: font,
			size: params.size,
			height: params.height,
			curveSegments: params.curveSegments,
			bevelEnabled: params.bevelEnabled,
			bevelThickness: params.bevelThickness,
			bevelSize: params.bevelSize,
			bevelSegments: params.bevelSegments,
		}),
		new THREE.MeshPhongMaterial({
			color: 0xff0000,
		})
	);
	scoreTextMesh.position.x = -world.width;
	scoreTextMesh.position.y = 10;
	scoreTextMesh.position.z = 1;
	scoreTextMesh.rotation.y = 1;
	// scoreTextMesh.castShadow = true;
	// scoreTextMesh.receiveShadow = true;
	scene.add(scoreTextMesh);
}


function updateScore(newScore) {
	score = newScore;
	scoreTextMesh.geometry.dispose();
	scoreTextMesh.geometry = new THREE.TextGeometry("Score: " + score, {
		font: font,
		size: params.size,
		height: params.height,
		curveSegments: params.curveSegments,
		bevelEnabled: params.bevelEnabled,
		bevelThickness: params.bevelThickness,
		bevelSize: params.bevelSize,
		bevelSegments: params.bevelSegments,
	});
	scoreTextMesh.material.needsUpdate = true;
}


window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    renderer.setSize(canvasWidth, canvasHeight);
    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();
}

document.addEventListener("keydown", (event) => {
	controller.keyPressed = event.key;
	controller.update();
});
