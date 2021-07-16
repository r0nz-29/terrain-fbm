import * as THREE from 'three';
import heightmap from './maps/real3.png';
import colormap from './maps/map1_color.jpg';
import water from './maps/water1.jpg';

const VS = `
  uniform float u_time;
  uniform sampler2D u_water;
  uniform sampler2D u_heightmap;
  varying float height;
  varying vec2 vuv;

  void main() {
    vuv = uv;
    mat4 boilerplate = projectionMatrix * modelViewMatrix;
    vec3 p = position;
    vec3 heightData = texture2D(u_heightmap, uv).rgb;
    vec3 waterData = texture2D(u_water, sin(uv*0.1+0.01*u_time)).rgb;
    // height = 0.3*sin(mix(0.0, 1.0, 10.0*u_time+p.y+p.x));
    height = 10.0*(heightData.x + heightData.y + heightData.z); 
    // if(height < 0.2) { height = 0.3*(waterData.x + waterData.y + waterData.z) ;}
    vec3 newP = p + vec3(0.0, 0.0, 0.1*height);
    gl_Position = boilerplate * vec4(newP, 1.0);
  }
`;

const FS = `
  uniform sampler2D u_colormap;
  uniform float u_time;
  uniform sampler2D u_water;
  varying float height;
  varying vec2 vuv;

  void main() {
    vec3 teXture = texture2D(u_colormap, vuv).rgb;
    vec3 water = texture2D(u_water, sin(vuv*0.1+0.01*u_time)).rgb;
    vec3 color = teXture;
    // if(height < 0.7) {color = water;}
    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
  }
`;

export const createTerrain = (time) => {
  const heightMap = new THREE.TextureLoader().load(heightmap);
  heightMap.wrapS = THREE.MirroredRepeatWrapping;
  heightMap.wrapT = THREE.MirroredRepeatWrapping;
  const colorMap = new THREE.TextureLoader().load(colormap);
  const Water = new THREE.TextureLoader().load(water);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      u_time: {
        value: time,
      },
      u_heightmap: {
        value: heightMap,
      },
      u_colormap: {
        value: colorMap,
      },
      u_water: {
        value: Water,
      }
    },
    vertexShader: VS,
    fragmentShader: FS,
    side: THREE.DoubleSide,
    wireframe: true,
  });
  const geometry = new THREE.PlaneGeometry(7, 7, 400, 400);
  const plane = new THREE.Mesh(geometry, material);
  // console.log(geometry);
  return plane;
}