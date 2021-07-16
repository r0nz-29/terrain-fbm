import * as THREE from 'three';

export const createRenderer = () => {
  const renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});
  renderer.physicallyCorrectLights = true;
  return renderer;
}