import "./style.css"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene  = new THREE.Scene()

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
controls.target = new THREE.Vector3(0.8950562035959816, 5.2788228345554264, -5.169569227773779);
renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347})
const torus = new THREE.Mesh(geometry, material)

// scene.add(torus)

const spotLight = new THREE.SpotLight(0xffffff)
spotLight.position.set(1.04,9.93,2.07)

const pointLight = new THREE.PointLight(0xf8e05a)
pointLight.position.set(1.75, 9.69, -35.22)

const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(pointLight)

const lightHelper = new THREE.SpotLightHelper(spotLight)
const pointLightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50)
scene.add(lightHelper, gridHelper, pointLightHelper)



function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z)
  scene.add(star)

}

// Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('space-background.jpg')
scene.background = spaceTexture

const picTexture = new THREE.TextureLoader().load('pic.jpg')
const pic = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: picTexture})
)

// scene.add(pic)

const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
)

scene.add(moon)

moon.position.set(1.75, 9.69, -35.22)

pic.position.z = -5;
pic.position.x = 2;

const loader = new GLTFLoader();

loader.load(
  './isometric_bedroom/scene.gltf',
  function (gltf) {
    let room = gltf.scene
    room.traverse( function ( child ) {
      //get the meshes
      if ( child.isMesh ) {
        console.log(child.material)
        // child.castShadow = true
        // only replace texture if a texture map exist
        if (child.material.name === "banner"){
        //replace the map with another THREE texture
        // console.log(child)
        child.material.map = picTexture;
        //update
        child.material.map.needsUpdate = true;
        }
      }
    })
    room.scale.set(0.1,0.1,0.1)
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

  torus.rotation.x += 0.01
  torus.rotation.y += 0.0005
  torus.rotation.z += 0.01

  moon.rotation.x += 0.0002
  moon.rotation.y += 0.0002
  moon.rotation.z += 0.0002

  controls.update()

  renderer.render(scene, camera)
}

animate()