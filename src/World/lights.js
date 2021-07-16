import * as THREE from 'three';

export const createLights = () => {
  const light = new THREE.DirectionalLight('white', 8);
  light.position.set(10, 10, 10);
  const aLight = new THREE.AmbientLight("white", 2);
  return {light, aLight};
} 