import * as THREE from "three" 
import {  OrbitControls } from "three/examples/jsm/Addons.js";
import { WoodNodeMaterial } from "three/examples/jsm/materials/WoodNodeMaterial.js";


// texture 
const texture_assets = {
  sun: "/8k_sun.jpg",
  mercury: "/8k_mercury.jpg",
  venus: "/4k_venus.jpg",
  earth: "/8k_earth.jpg",
  mars: "/8k_mars.jpg",
  jupiter: "./8k_jupiter.jpg",
  saturn: "./8k_saturn.jpg",
  uranus: "./8k_uranus.jpg",
  moon: "/8k_moon.jpg",
  space: "/space.jpg",
  star: "/8k_stars.jpg",
};


function initScene() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  camera.position.z = 100;
  const light = new THREE.AmbientLight({ color: 0xffffff });
  scene.add(light);
  return [scene,camera,renderer];
}

const [scene,camera,renderer] = [...initScene()]
scene.background= new THREE.TextureLoader().load(texture_assets.space);

let mesh ={}
for(const property  in texture_assets){
  mesh[property]= new THREE.MeshStandardMaterial({
                                 map: new THREE.TextureLoader().load(texture_assets[property])
                            })
}

const geomety_entity = {
  sun: new THREE.SphereGeometry(15, 100, 100),
  mercury: new THREE.SphereGeometry(2, 100, 100),
  venus: new THREE.SphereGeometry(2.5, 100, 100),
  moon: new THREE.SphereGeometry(1, 100, 100),
  earth: new THREE.SphereGeometry(5, 100, 100),
  mars: new THREE.SphereGeometry(4.5, 100, 100),
  jupiter: new THREE.SphereGeometry(9, 100, 100),
  saturn: new THREE.SphereGeometry(7, 100, 100),
};


function stars(){

  const star_geo =new THREE.SphereGeometry(.15,100,100,);
  const star_mesh = new THREE.MeshStandardMaterial({color:0xffffff}) 
  const star = new THREE.Mesh(star_geo,star_mesh);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(200));
  star.position.set(x,y,z)
  scene.add(star)


}


const entity = {}

let [x,y,z] = [10,-1,0];

for(const key in geomety_entity){

  entity[key]=(new THREE.Mesh(geomety_entity[key],mesh[key]));
  entity[key].position.set(x,y,z);

  x = (Math.abs(x) + 20)*y;
  
  
  scene.add( entity[key]);
}
console.log(entity)



const controls = new OrbitControls(camera,renderer.domElement)

Array(900).fill().forEach(stars)

function animate() {
requestAnimationFrame(animate)

entity["sun"].rotation.y += 0.003;


  
  



controls.update()

renderer.render(scene,camera)
  
}
animate();