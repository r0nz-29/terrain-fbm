// FINALLY WORKING, TAKE THE WHOLE CLASS IN THE VARIABLE INSTEAD OF ONLY RETURNING THE MESH !!!

import * as THREE from 'three';

class Cube extends THREE.Mesh {
  constructor(width, height, depth, color){
    super();
    this._geometry = new THREE.BoxBufferGeometry(width, height, depth, 10, 10, 10);
    this._material = new THREE.MeshStandardMaterial({
      color: `${color}`,
      // wireframe: true,
    });
    this._mesh = new THREE.Mesh(this._geometry, this._material);
  }

  behaviour(){
    this._mesh.rotation.x += 0.01;
    this._mesh.rotation.y += 0.01;
    this._mesh.rotation.z += 0.01;
  }

  getCube(){
    return this._mesh;
  }

}

export {Cube};