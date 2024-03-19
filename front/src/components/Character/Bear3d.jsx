import React, { useRef, useEffect } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

function Bear3d() {
  const canvasRef = useRef();

  useEffect(() => {
    const THREE = window.THREE;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    const camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 1, 5000);
    camera.position.z = 1000;

    const light1 = new THREE.HemisphereLight(0xffffff, 0x444444, 1.0);
    light1.position.set(0, 1, 0);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 1.0);
    light2.position.set(0, 1, 0);
    scene.add(light2);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);

    const fbxLoader = new FBXLoader();
    fbxLoader.load('/character/Bear.fbx', (object) => {
      scene.add(object);
    });

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    canvasRef.current.appendChild(renderer.domElement);

    return () => {
      // cleanup
      renderer.dispose();
    };
  }, []);

  return <div ref={canvasRef} />;
}

export default Bear3d;
