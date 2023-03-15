import "./style.css"
import * as THREE from 'three'
import { gsap, ScrollTrigger } from "gsap/all";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import anime from 'animejs/lib/anime.es.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { textureMap } from "./textureMap";
import '@splidejs/splide/css';
import Splide from '@splidejs/splide';

//Loading Page
const wrapper = document.getElementById("tiles");

let columns = 0,
    rows = 0,
    toggled = false;

const toggle = () => {
  toggled = !toggled;
  
  document.body.classList.toggle("toggled");
}

const handleOnClick = index => {
  toggle();
  
  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 1,
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index
    })
  });
}

const createTile = index => {
  const tile = document.createElement("div");
  
  tile.classList.add("tile");
  
  tile.style.opacity = toggled ? 0 : 1;
  
  tile.onclick = e => handleOnClick(index);
  
  return tile;
}

const createTiles = quantity => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
}

const createGrid = () => {
  wrapper.innerHTML = "";
  
  const size = document.getElementById("loading").clientWidth > 800 ? 100 : 50;
  
  columns = Math.floor(document.getElementById("loading").clientWidth / size);
  rows = Math.floor(document.getElementById("loading").clientHeight / size);
  
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);
  
  createTiles(columns * rows);
  
}

createGrid();

window.onresize = () => createGrid();



//Textures
const cognizantLogo = new THREE.TextureLoader().load('Cognizant.jpg')
const infosysLogo = new THREE.TextureLoader().load('Infosys.png')
const pokeball = new THREE.TextureLoader().load('pokeball.png')
const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')
const hero = new THREE.TextureLoader().load('Hero1.gif')
const canvas = new THREE.TextureLoader().load('basement_home_office_badeskchallenge/textures/canvas_diffuse.jpeg')
const paper = new THREE.TextureLoader().load('basement_home_office_badeskchallenge/textures/paper_diffuse.jpeg')
const paper2 = new THREE.TextureLoader().load('basement_home_office_badeskchallenge/textures/paper.001_diffuse.jpeg')
const paper3 = new THREE.TextureLoader().load('basement_home_office_badeskchallenge/textures/paper.002_diffuse.jpeg')
const paper4 = new THREE.TextureLoader().load('basement_home_office_badeskchallenge/textures/paper.003_diffuse.jpeg')
const paper5 = new THREE.TextureLoader().load('Stony_Brook_University.png')
const paper6 = new THREE.TextureLoader().load('Flatiron.png')
const largePic2 = new THREE.TextureLoader().load('basement_home_office_badeskchallenge/textures/mad_max_fury_road_web_by_3ftdeep-d8qr5za.001_diffuse.png')

canvas.flipY = false
paper2.flipY = false
paper3.flipY = false
paper4.flipY = false
largePic2.flipY = false


//Camera and Scene
const scene  = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true 
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// const controls = new OrbitControls(camera, renderer.domElement)


renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.set(-5.679345192722458, 5.7662886968838905, -6.358959535036217)
renderer.render(scene, camera)

//GSAP Camera control
gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ease: "none", duration: 2})
const monitorPosition = new THREE.Vector3(-3.85, 4.73, 3.57)
const frameSetTwo = new THREE.Vector3(-9.61, 6.86, -0.30)
const frameSetThree = new THREE.Vector3(5.67, 4.72, -1.03)
const frameSetFour = new THREE.Vector3(2.08, 2.72, -1.03)
const frameSetFive = new THREE.Vector3(-2.41, 6.70, -11.91)
let currentTargetY
let currentSign



const tl = gsap.timeline()

tl.to('#loading', {
  scrollTrigger: {
    trigger: '#loading',
    toggleActions: "restart none reverse none",
    scrub: true
  },
  onUpdate: function () {
    camera.lookAt(monitorPosition)
  }
})
.to('#nav', {
  scrollTrigger: {
    trigger: '#intro',
    toggleActions: "restart none reverse none",
    scrub: true,
    pin: true
  },
  x: '5rem',
  onUpdate: function () {
    camera.lookAt(monitorPosition)
  }
})
.to(camera.position, {
  scrollTrigger: {
    trigger: '#trans1',
    start: "top bottom",
    toggleActions: "restart none reverse none",
    scrub: true,
    pin: true,
    pinSpacing: false,
  },
  x: -1.56,
  y: 4.67,
  z: 0.53,
  duration: 1.5,
  onUpdate: function () {
    camera.lookAt(monitorPosition)
    currentTargetY = 8
    currentSign = -1
  }
})
.to(camera.position, {
  scrollTrigger: {
    trigger: '#skills',
    toggleActions: "restart none reverse none",
    scrub: true,
    pin: true,
  },
})
.to(camera.position, {
  scrollTrigger: {
    trigger: '#trans2',
    start: "top bottom",
    toggleActions: "restart none reverse none",
    scrub: true,
    pin: true,
    pinSpacing: false,
  },
  x: -4.45,
  y: 6.46,
  z: -2.49,
  duration: 1.5,
  onUpdate: function () {
    camera.lookAt(frameSetTwo)
    currentTargetY = 3.75
    currentSign = -1
  }
})
.to(camera.position, {
  scrollTrigger: {
    trigger: '#experience',
    toggleActions: "restart none reverse none",
    scrub: true,
    pin: true,
  }
})
.to(camera.position, {
  scrollTrigger: {
    trigger: '#trans3',
    start: "top bottom",
    toggleActions: "restart none reverse none",
    scrub: true,
    pin: true,
    pinSpacing: false,
  },
  x: 2.68,
  y: 6.46,
  z: -3.52,
  duration: 1.5,
  onUpdate: function () {
    camera.lookAt(frameSetThree)
    currentTargetY = -6
    currentSign = 1
  }
})
.to(camera.position, {
  scrollTrigger: {
    trigger: '#projects',
    toggleActions: "restart none reverse none",
    scrub: true,
    pin: true,
  }
})
.to(camera.position, {
  scrollTrigger: {
    trigger: '#trans4',
    start: "top bottom",
    toggleActions: "restart none reverse none",
    scrub: true,
    pin: true,
    pinSpacing: false,
    },
  x: 4.63,
  y: 3.11,
  z: -6.40,
  duration: 1.5,
  onUpdate: function () {
    camera.lookAt(frameSetFour)
    currentTargetY = 8
    currentSign = -1
  }
})
.to(camera.position, {
  scrollTrigger: {
    trigger: '#education',
    toggleActions: "restart none reverse none",
    scrub: true,
    pin: true,
  }
})
.to(camera.position, {
  scrollTrigger: {
    trigger: '#trans5',
    start: "top bottom",
    toggleActions: "restart none reverse none",
    scrub: true,
    pin: true,
    pinSpacing: false,
    },
  x: -0.11,
  y: 6.46,
  z: -6.32,
  duration: 1.5,
  onUpdate: function () {
    camera.lookAt(frameSetFive)
    currentTargetY = 8
    currentSign = -1
  }
})
.to(camera.position, {
  scrollTrigger: {
    trigger: '#contact',
    toggleActions: "restart none reverse none",
    scrub: true,
    pin: true,
  }
})

// gsap js content control
// gsap.to(".el", {
//   y: -500,
//   scrollTrigger: {
//     trigger: "#skills",
//     start: "top center",
//     end: "top 100px",
//     scrub: true,
//     markers: true,
//     id: "scrub"
//   }
// })

// mouse move camera
const mouse = new THREE.Vector2();
const target = new THREE.Vector2();
const windowHalf = new THREE.Vector2( window.innerWidth / 2, window.innerHeight / 2 );
document.addEventListener( 'mousemove', onMouseMove, false );

function onMouseMove( event ) {
	mouse.x = ( event.clientX + windowHalf.x );
	mouse.y = ( event.clientY + windowHalf.x );

  // camera.rotation.x -= 0.05 * ( ( 1 - mouse.y ) * 0.002 + camera.rotation.x + currentTarget.x) 
  camera.rotation.y = camera.rotation.y + currentSign * 0.05 * ( ( 1 - mouse.x ) * 0.002 + currentTargetY * camera.rotation.y) 
}

new Splide( '.splide',{
  type   : 'loop'
} ).mount();

//Lighting

const spotLight = new THREE.SpotLight(0xffeacc, 0.5)
spotLight.position.set(0.56,9.51,-2.37)
spotLight.castShadow = true
const spotLightTarget = new THREE.Object3D()
spotLightTarget.position.set(0.21, -0.23, -1.44)

const directLight = new THREE.DirectionalLight(0xffffff, 0.5)
directLight.position.set(43.16, 33.71, 16.27)
directLight.castShadow = true


const lampLight = new THREE.SpotLight(0xffeacc, 0.5)
lampLight.position.set(0.50,5.50,5.52)
lampLight.castShadow = true

const pointLight = new THREE.PointLight(0xffeacc, 0.5, 100, 10)
pointLight.castShadow = true
pointLight.position.set(8.80, 6.42, -3.67)

const ambientLight = new THREE.AmbientLight(0xffeacc, 0.5)


scene.add(spotLight, directLight, lampLight, pointLight, ambientLight)
// scene.add(directLightHelper)


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

moon.position.set(69.55, 38.58, 62.37)

const loader = new GLTFLoader();

loader.load(
  './basement_home_office_badeskchallenge/scene.gltf',
  function (gltf) {
    let room = gltf.scene
    room.traverse( function ( child ) {
      if(child.isMesh) {
        child.receiveShadow = true
        child.castShadow = true
        const textureObj = textureMap[child.material.name]
        if(child.material.name === "fear_the_dark"){
          child.material = new THREE.MeshToonMaterial({map: cognizantLogo})
        } else if (child.material.name === "obey_the_god"){
          child.material = new THREE.MeshToonMaterial({map: infosysLogo})
        } else if (child.material.name === "fear_the_dark.001"){
          child.material = new THREE.MeshToonMaterial({map: pokeball})
        } else if (child.material.name === "fear_the_dark.002"){
          child.material = new THREE.MeshToonMaterial({map: hero})
        } else if (child.material.name === "paper"){
          child.material = new THREE.MeshToonMaterial({map: paper})
        } else if (child.material.name === "paper.001"){
          child.material = new THREE.MeshToonMaterial({map: paper2})
        } else if (child.material.name === "paper.002"){
          child.material = new THREE.MeshToonMaterial({map: paper3})
        } else if (child.material.name === "paper.003"){
          child.material = new THREE.MeshToonMaterial({map: paper4})
        } else if (child.material.name === "paper.004"){
          child.material = new THREE.MeshToonMaterial({map: paper5})
        } else if (child.material.name === "paper.005"){
          child.material = new THREE.MeshToonMaterial({map: paper6})
        } else if (child.material.name === "mad_max_fury_road_web_by_3ftdeep-d8qr5za"){
          child.material = new THREE.MeshToonMaterial({map: hero})
        } else if (child.material.name === "mad_max_fury_road_web_by_3ftdeep-d8qr5za.001"){
          child.material = new THREE.MeshToonMaterial({map: largePic2})
        } else if (child.material.name === "canvas"){
          child.material = new THREE.MeshToonMaterial({map: canvas})
        } else if (textureObj.color) {
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
window.mouse = mouse
function animate(){
  


  moon.rotation.x += 0.0002
  moon.rotation.y += 0.0002
  moon.rotation.z += 0.0002

  // controls.update()
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

animate()