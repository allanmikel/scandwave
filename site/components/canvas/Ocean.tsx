"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { oceanVertexShader, oceanFragmentShader } from "./shaders";

type Uniforms = {
  uTime: { value: number };
  uScrollProgress: { value: number };
  uChaos: { value: number };
  uFlow: { value: number };
  uPointer: { value: THREE.Vector2 };
  uReduced: { value: number };
  uDeep: { value: THREE.Color };
  uShallow: { value: THREE.Color };
  uCrest: { value: THREE.Color };
  uAccent: { value: THREE.Color };
};

const PROGRESS_REF = { current: 0, chaos: 0, flow: 0 };

export function setOceanProgress(p: number, chaos: number, flow: number) {
  PROGRESS_REF.current = p;
  PROGRESS_REF.chaos = chaos;
  PROGRESS_REF.flow = flow;
}

function OceanMesh({ reduced }: { reduced: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size, pointer } = useThree();

  const uniforms = useMemo<Uniforms>(
    () => ({
      uTime: { value: 0 },
      uScrollProgress: { value: 0 },
      uChaos: { value: 0 },
      uFlow: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uReduced: { value: reduced ? 1 : 0 },
      uDeep: { value: new THREE.Color("#03080f") },
      uShallow: { value: new THREE.Color("#0a2134") },
      uCrest: { value: new THREE.Color("#5fd4f0") },
      uAccent: { value: new THREE.Color("#8de8f8") },
    }),
    [reduced]
  );

  const geometry = useMemo(() => {
    const seg = size.width < 768 ? 96 : 160;
    const g = new THREE.PlaneGeometry(80, 60, seg, seg);
    g.rotateX(-Math.PI / 2);
    return g;
  }, [size.width]);

  useFrame((state, delta) => {
    const u = uniforms;
    u.uTime.value += delta;

    // smooth toward target values coming from scroll engine
    u.uScrollProgress.value += (PROGRESS_REF.current - u.uScrollProgress.value) * 0.06;
    u.uChaos.value += (PROGRESS_REF.chaos - u.uChaos.value) * 0.05;
    u.uFlow.value += (PROGRESS_REF.flow - u.uFlow.value) * 0.04;

    u.uPointer.value.x += (pointer.x - u.uPointer.value.x) * 0.04;
    u.uPointer.value.y += (pointer.y - u.uPointer.value.y) * 0.04;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -2.2, 0]} frustumCulled={false}>
      <shaderMaterial
        vertexShader={oceanVertexShader}
        fragmentShader={oceanFragmentShader}
        uniforms={uniforms}
        transparent={false}
      />
    </mesh>
  );
}

function Atmosphere() {
  return (
    <>
      <fog attach="fog" args={["#03070d", 18, 55]} />
      <ambientLight intensity={0.35} color="#7fc1e0" />
      <directionalLight position={[6, 8, 4]} intensity={0.4} color="#bfe8f7" />
    </>
  );
}

export default function Ocean({
  className = "",
}: {
  className?: string;
}) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className={`pointer-events-none ${className}`}>
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 3.4, 8.5], fov: 42, near: 0.1, far: 100 }}
        gl={{ antialias: true, powerPreference: "high-performance", alpha: false }}
      >
        <color attach="background" args={["#03070d"]} />
        <Atmosphere />
        <OceanMesh reduced={reduced} />
      </Canvas>
    </div>
  );
}
