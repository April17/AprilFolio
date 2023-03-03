import "./style.css"
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { textureMap } from "./textureMap";

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

// const controls = new OrbitControls(camera, renderer.domElement)


renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.set(-4.92, 30.17, -8.57)
// controls.object.position.set(0.7928432993777849, 25.093997470840975, -3.5118393051407386)
// controls.object.position.set(0.67, 5.04, -0.13)
// controls.target.set(-115.53, 72.22, 74.89)
renderer.render(scene, camera)


//GSAP Camera controll
const monitorPosition = new THREE.Vector3(-3.85, 4.73, 3.57)
const chairPosition = new THREE.Vector3(-1.56, 4.67, 0.53)
document.addEventListener('mousedown', e => {
  gsap.to(camera.position, {
    x: -1.56,
    y: 4.67,
    z: 0.53,
    duration: 1.5,
    onUpdate: function () {
      camera.lookAt(monitorPosition)
    }
  })
})



//Lighting
const spotLight = new THREE.SpotLight(0xffeacc)
spotLight.position.set(0.56,10.51,-2.37)
const spotLightTarget = new THREE.Object3D()
spotLightTarget.position.set(0.21, -0.23, -1.44)

const lampLight = new THREE.SpotLight(0xffeacc)
lampLight.position.set(0.50,5.50,5.52)

const pointLight = new THREE.PointLight(0xffeacc)
pointLight.position.set(8.80, 6.42, -3.67)

const ambientLight = new THREE.AmbientLight(0xffeacc)

scene.add(pointLight, ambientLight, spotLight, lampLight)


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
  new THREE.MeshToonMaterial({
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
      if(child.isMesh) {
        // console.log(textureMap[child.material.name])
        const textureObj = textureMap[child.material.name]
        if(textureObj.color){
          child.material = new THREE.MeshToonMaterial({color: textureObj.color})
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

  // firstPersonControls.update(1.0)
  // controls.update()
  renderer.render(scene, camera)
}

animate()