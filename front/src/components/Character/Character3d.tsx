import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";

interface Props {
  name: string;
  characterScale?: number; // 캐릭터의 크기를 조절하는 props
  canvasWidth?: number; // 컴포넌트 크기
  canvasHeight?: number;
  action?: string;
}
//캐릭터 name
//Bear, Cow, Fox, Hippo, Lion, Monkey, Pig, Rabbit, Rhino, Sloth, Unicon, Zebra

function Character3d({
  name,
  characterScale = 1,
  canvasWidth = 100,
  canvasHeight = 100,
  action = "jump",
}: Props): JSX.Element {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color();

    const camera = new THREE.PerspectiveCamera(
      4,
      canvasWidth / canvasHeight,
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
    renderer.setSize(canvasWidth, canvasHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    // 사용자가 화면을 만지지 못하게 조절
    controls.enabled = false;

    const fbxLoader = new FBXLoader();
    fbxLoader.load(`/character/${name}.fbx`, (object) => {
      // 텍스처 추가
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(`/character/${name}_BaseColor.png`, (texture) => {
        const material = new THREE.MeshBasicMaterial({ map: texture });

        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material = material;
          }
        });

        // 캐릭터의 크기 조절
        object.scale.set(characterScale, characterScale, characterScale);

        // 씬에 모델 추가
        scene.add(object);

        let jumpDirection = 1.5;
        let jumpHeight = 0;

        // 모델이 로드된 후에 렌더링
        const animate = () => {
          if (action === "jump") {
            jumpHeight += 0.1 * jumpDirection;
            if (jumpHeight >= 7 || jumpHeight <= 0) {
              jumpDirection *= -1;
            }
            object.position.y = jumpHeight - canvasHeight / 3;
          } else if (action === "turn") {
            object.rotation.y += 0.01;
            object.position.y = 1 - canvasHeight / 3;
            // object.position.x = 1 + canvasWidth / 2;
          }
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
  }, [name, characterScale, action]);

  return <div ref={canvasRef} />;
}

export default Character3d;
