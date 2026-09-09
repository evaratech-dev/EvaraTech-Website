"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Procedural water-surface scene. Everything here is generated in-shader —
 * no model or texture assets — so it stays light and never blocks paint.
 * Wireframe grid = the "measured" surface; the ripple is real sine
 * interference, the same physics EvaraTank's ultrasonic sensing reads.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uAmplitude;
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float e =
      sin(pos.x * 1.6 + uTime * 0.7) * 0.14 +
      sin(pos.y * 2.1 - uTime * 0.5) * 0.10 +
      sin((pos.x + pos.y) * 1.1 + uTime * 0.35) * 0.08;

    // Radial ripple emanating from the centre — the sensor's ping.
    float d = length(pos.xy);
    e += sin(d * 3.4 - uTime * 1.5) * 0.07 * exp(-d * 0.35);

    pos.z += e * uAmplitude;
    vElevation = e;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorLow;
  uniform vec3 uColorHigh;
  varying float vElevation;
  varying vec2 vUv;

  void main() {
    float mixStrength = smoothstep(-0.2, 0.25, vElevation);
    vec3 color = mix(uColorLow, uColorHigh, mixStrength);

    // Fade the grid out at the edges so it dissolves into the page.
    float edge = smoothstep(0.5, 0.12, distance(vUv, vec2(0.5)));
    gl_FragColor = vec4(color, edge * 0.9);
  }
`;

function WaterSurface({ reduced }: { reduced: boolean }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uAmplitude: { value: 1 },
      uColorLow: { value: new THREE.Color("#1c75bc") },
      uColorHigh: { value: new THREE.Color("#3fc9bd") },
    }),
    []
  );

  useFrame((state) => {
    if (!materialRef.current || reduced) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <mesh rotation={[-Math.PI / 2.6, 0, 0]} position={[0, -0.4, 0]}>
      <planeGeometry args={[9, 9, 48, 48]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/** Slow-drifting motes standing in for telemetry packets in flight. */
function DataMotes({ reduced }: { reduced: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const COUNT = 70;

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 1] = Math.random() * 3.2 - 0.2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, []);

  // Rotate the whole cloud rather than rewriting every vertex each frame.
  // Re-uploading the position buffer at 60fps was the single most expensive
  // thing in the scene and is not worth the extra bob.
  useFrame((state) => {
    if (!pointsRef.current || reduced) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.035;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#4fa0dd"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Subtle camera parallax toward the pointer — depth without dizziness. */
function CameraRig({ reduced }: { reduced: boolean }) {
  const { camera, pointer } = useThree();
  useFrame(() => {
    if (reduced) return;
    camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.03;
    camera.position.y += (0.9 + pointer.y * 0.25 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function WaterScene({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.9, 4.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={reduced ? "demand" : "always"}
      style={{ pointerEvents: "none" }}
    >
      <WaterSurface reduced={reduced} />
      <DataMotes reduced={reduced} />
      <CameraRig reduced={reduced} />
    </Canvas>
  );
}
