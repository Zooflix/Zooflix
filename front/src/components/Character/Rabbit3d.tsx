import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

function Rabbit3d(): JSX.Element {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color();

    const camera = new THREE.PerspectiveCamera(
      5,
      window.innerWidth / window.innerHeight,
      1,
      5000
    );
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
    fbxLoader.load("/character/Rabbit.fbx", (object) => {
      //텍스처 추가
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load("/character/Rabbit_BaseColor.png", (texture) => {
        const material = new THREE.MeshBasicMaterial({ map: texture });

        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = material;
          }
        });

        // 씬에 모델 추가
        scene.add(object);

        let jumpDirection = 1;
        let jumpHeight = 0;

        // 모델이 로드된 후에 렌더링
        const animate = () => {
          jumpHeight += 0.1 * jumpDirection;
          if (jumpHeight >= 10 || jumpHeight <= 0) {
            jumpDirection *= -1;
          }
          object.position.y = jumpHeight;

          //아래는 빙글빙글 도는 애니메이션
          // object.rotation.y += 0.01;
          renderer.render(scene, camera);
          requestAnimationFrame(animate);
        };

        animate();
      });
    });

    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={canvasRef} />;
}

export default Rabbit3d;
