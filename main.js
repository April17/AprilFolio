import "./style.css"
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/all"
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
camera.position.set(-5.679345192722458, 5.7662886968838905, -6.358959535036217)
camera.lookAt(-3.85, 4.73, 3.57)
renderer.render(scene, camera)


//GSAP Camera controll
gsap.registerPlugin(ScrollTrigger)
const monitorPosition = new THREE.Vector3(-3.85, 4.73, 3.57)
const frameSetOne = new THREE.Vector3(-8.83, 6.60, -1.42)
const frameSetTwo = new THREE.Vector3(-8.61, 6.86, -0.30)
const frameSetThree = new THREE.Vector3(9.67, 2.72, -1.03)
const frameSetFour = new THREE.Vector3(2.08, 2.72, -1.03)
const frameSetFive = new THREE.Vector3(-2.41, 6.70, -11.91)

const chairPosition = new THREE.Vector3(-1.56, 4.67, 0.53)
const positionTwo = new THREE.Vector3(-4.45, 6.46, -2.49)
const positionThree = new THREE.Vector3(3.68, 6.46, -2.52)
const positionFour = new THREE.Vector3(4.63, 3.11, -6.40)
const positionFive = new THREE.Vector3(-0.11, 6.46, -6.32)

gsap.to(camera.position, {
  scrollTrigger: {
    trigger: '#skills',
    start: "top center",
    toggleActions: "restart none none none",
    scrub: true,
    markers: true
  },
  x: -1.56,
  y: 4.67,
  z: 0.53,
  duration: 1.5,
  onUpdate: function () {
    camera.lookAt(monitorPosition)
  }
})

gsap.to(camera.position, {
  scrollTrigger: {
    trigger: '#experience',
    start: "top center",
    toggleActions: "restart none none none",
    scrub: true,
    markers: true
  },
  x: -4.45,
  y: 6.46,
  z: -2.49,
  duration: 1.5,
  onUpdate: function () {
    camera.lookAt(frameSetTwo)
  }
})

gsap.to(camera.position, {
  scrollTrigger: {
    trigger: '#projects',
    start: "top center",
    toggleActions: "restart none none none",
    scrub: true,
    markers: true
  },
  x: 3.68,
  y: 6.46,
  z: -2.52,
  duration: 1.5,
  onUpdate: function () {
    camera.lookAt(frameSetThree)
  }
})

gsap.to(camera.position, {
  scrollTrigger: {
    trigger: '#education',
    start: "top center",
    toggleActions: "restart none none none",
    scrub: true,
    markers: true
  },
  x: 4.63,
  y: 3.11,
  z: -6.40,
  duration: 1.5,
  onUpdate: function () {
    camera.lookAt(frameSetFour)
  }
})

gsap.to(camera.position, {
  scrollTrigger: {
    trigger: '#contact',
    start: "top center",
    toggleActions: "restart none none none",
    scrub: true,
    markers: true
  },
  x: -0.11,
  y: 6.46,
  z: -6.32,
  duration: 1.5,
  onUpdate: function () {
    camera.lookAt(frameSetFive)
  }
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

// animate
function animate(){
  requestAnimationFrame(animate)

  moon.rotation.x += 0.0002
  moon.rotation.y += 0.0002
  moon.rotation.z += 0.0002

  // controls.update()
  renderer.render(scene, camera)
}

animate()