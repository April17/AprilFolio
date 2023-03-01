import "./style.css"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//Textures
const spaceTexture = new THREE.TextureLoader().load('space-background.jpg')
const fearTheDark = new THREE.TextureLoader().load('./basement_home_office_badeskchallenge/textures/fear_the_dark_diffuse.png')
fearTheDark.flipY = false
const picTexture = new THREE.TextureLoader().load('pic.jpg')
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')



//Camera and Scene
const scene  = new THREE.Scene()
// scene.background = spaceTexture

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true 
})

const controls = new OrbitControls(camera, renderer.domElement)

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.set(0.58, 5.01, -0.64)
controls.object.position.set(0.6771760415180671, 5.046769410125615, -0.1397820593075263)
// controls.target = new THREE.Vector3(-115.53, 72.22, 74.89);
renderer.render(scene, camera)


//Lighting
const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(1.04,9.93,2.07)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(8.80, 6.42, -3.67)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight, ambientLight, spotLight)

const lightHelper = new THREE.SpotLightHelper(spotLight)
const pointLightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(gridHelper, pointLightHelper)


//3D Objects
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloat (20, 350))

  star.position.set(x, y, z)
  scene.add(star)

}

Array(400).fill().forEach(addStar)

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
)

scene.add(moon)

moon.position.set(128.70, 73.00, 59.38)

const loader = new GLTFLoader();

loader.load(
  './basement_home_office_badeskchallenge/scene.gltf',
  function (gltf) {
    let room = gltf.scene
    room.traverse( function ( child ) {
      if(child.isMesh ) {
        console.log(child.material.name)
        if(child.material.name === "banner"){
          child.material.map = picTexture;
          child.material.map.needsUpdate = true;
        }
        if(child.material.name === "sofa"){
            child.material = new THREE.MeshToonMaterial({color: 0x3e3e3f})
        }
        if(child.material.name === "fear_the_dark"){
            child.material = new THREE.MeshToonMaterial({color: 0x3e3e3f})
            child.material.map = fearTheDark;
        }
        if(child.material.name === "walls"){
            child.material = new THREE.MeshToonMaterial({color: 0x484a47})
        }
      }
    })
    room.scale.set(4,4,4)
    room.rotation.set(0,2.5,0)
    scene.add(room)
  },
  function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	function ( error ) {
		console.log( 'An error happened' );
	}
)
window.camera = camera
window.controls = controls
// function moveCamera() {
//   const t = document.body.getBoundingClientRect().top
//   moon.rotation.x += 0.05
//   moon.rotation.y += 0.075
//   moon.rotation.z += 0.05

//   pic.rotation.y += 0.01
//   pic.rotation.z += 0.01

//   camera.position.z = t * -0.02;
//   camera.position.x = t * -0.002;
//   camera.rotation.y = t * -0.1;

// }
// document.body.onscroll = moveCamera
// moveCamera();


function animate(){
  requestAnimationFrame(animate)

  moon.rotation.x += 0.0002
  moon.rotation.y += 0.0002
  moon.rotation.z += 0.0002

  controls.update()

  renderer.render(scene, camera)
}

animate()