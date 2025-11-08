import * as THREE from "three" 
import { FlyControls, OrbitControls } from "three/examples/jsm/Addons.js";




window.console.debug("Hello")
// texture 
const textures ={
  earth : "/8k_earth.jpg",
  moon : "/8k_moon.jpg",
  sun :"/8k_sun.jpg",
  space:"/space.jpg",
  star :"/8k_stars.jpg",
  earth_normal_map :"./8k_earth_normal_map.tif",
}

const bac = new THREE.TextureLoader().load(textures.star)
const moon_texture = new THREE.TextureLoader().load(textures.moon)
const earth_texture = new THREE.TextureLoader().load(textures.earth)
const sun_texture = new THREE.TextureLoader().load(textures.sun)
const earth_normal_texture = new THREE.TextureLoader().load(textures.earth_normal_map)

///
const moon_geo  = new THREE.SphereGeometry(3,100,100)
const moon_mesh = new THREE.MeshStandardMaterial({map:moon_texture})
const moon = new THREE.Mesh(moon_geo,moon_mesh);

const sun_geo  = new THREE.SphereGeometry(15,100,100)
const sun_mesh = new THREE.MeshStandardMaterial({map:sun_texture})
const sun = new THREE.Mesh(sun_geo,sun_mesh);
sun.position.set(-300,-20, 0)

const earth_geo  = new THREE.SphereGeometry(5,100,100)
const earth_mesh = new THREE.MeshStandardMaterial({map:earth_texture,normalMap:earth_normal_texture})
const earth = new THREE.Mesh(earth_geo,earth_mesh);
earth.position.set(20,20, 0)

///

// const jubitar_geo = new THREE.SphereGeometry(9,100,100)
// const jubitar_mesh = new THREE.MeshStandardMaterial({Map:})


//Scende camer renderer

const scene = new  THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement)
camera.position.z = 30
const controls = new FlyControls(camera,renderer.domElement)
 controls.rollSpeed = Math.PI / 24;
  controls.autoForward = false;
  controls.dragToLook = true;
const light = new THREE.AmbientLight({color:0xffffff})

// 


//





scene.background = bac;
scene.add(moon,sun, earth,light)

function stars(){

  const star_geo =new THREE.SphereGeometry(.25,25,25,);
  const star_mesh = new THREE.MeshStandardMaterial({color:0xffffff}) 
  const star = new THREE.Mesh(star_geo,star_mesh);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z)
  scene.add(star)


}


Array(900).fill().forEach(stars)

function animate() {
requestAnimationFrame(animate)


controls.update()

renderer.render(scene,camera)
  
}
animate();