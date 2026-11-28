"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";

/**
 * PyroBot, modelled in code: a low round floor robot with a camera dome,
 * a sensor band, an emergency stop, a mop pad underneath and an arm that
 * carries a folded fire blanket. No model file or network needed.
 *
 * `progress` is a ref (0..1) that the page drives from scroll.
 */
export type PyroView = "hero" | "anatomy";

export default function PyroScene({
  progress,
  view = "hero",
  className,
}: {
  progress?: React.RefObject<number>;
  view?: PyroView;
  className?: string;
}) {
  const camera =
    view === "hero"
      ? { position: [0, 1.25, 6.4] as [number, number, number], fov: 26 }
      : { position: [3.6, 2.4, 4.6] as [number, number, number], fov: 28 };

  return (
    <Canvas
      className={className}
      dpr={[1, 2]}
      shadows
      camera={camera}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
      onCreated={({ camera }) => camera.lookAt(0, view === "hero" ? 0.45 : 0.4, 0)}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[-3, 6, 4]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[4, 2, -4]} intensity={1.4} color="#b9d2ff" />
      <pointLight position={[0, 0.6, 2.4]} intensity={2} distance={4} color="#ff8a4c" />

      <Robot progress={progress} view={view} />

      <ContactShadows position={[0, -0.001, 0]} opacity={0.55} scale={7} blur={2.6} far={2} color="#000000" />

      {/* Studio lighting built locally (no HDR download) */}
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 2]} scale={[6, 2, 1]} rotation-x={Math.PI / 2} />
        <Lightformer form="rect" intensity={1.6} position={[-4, 1.5, 1]} scale={[2, 4, 1]} rotation-y={Math.PI / 2} />
        <Lightformer form="rect" intensity={1.2} color="#bcd4ff" position={[4, 1.5, -2]} scale={[2, 4, 1]} rotation-y={-Math.PI / 2} />
        <Lightformer form="ring" intensity={0.8} color="#ff9a5c" position={[0, 0.5, 4]} scale={1.5} />
      </Environment>
    </Canvas>
  );
}

function Robot({ progress, view }: { progress?: React.RefObject<number>; view: PyroView }) {
  const group = useRef<THREE.Group>(null);
  const shoulder = useRef<THREE.Group>(null);
  const elbow = useRef<THREE.Group>(null);
  // Shrink on narrow (portrait) screens so the robot never covers the copy
  const aspect = useThree((s) => s.viewport.aspect);
  const fit = view === "hero" ? Math.min(1, Math.max(0.55, aspect / 1.6)) : 1;

  // Rounded puck body from a lathe profile
  const bodyGeo = useMemo(() => {
    const pts = [
      [0, 0.05],
      [0.86, 0.05],
      [0.95, 0.08],
      [0.99, 0.14],
      [1.0, 0.22],
      [0.99, 0.32],
      [0.95, 0.39],
      [0.86, 0.43],
      [0.6, 0.45],
      [0, 0.45],
    ].map(([x, y]) => new THREE.Vector2(x, y));
    const g = new THREE.LatheGeometry(new THREE.SplineCurve(pts).getPoints(48), 96);
    g.computeVertexNormals();
    return g;
  }, []);

  const shell = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#ebe8e2", roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.4 }),
    [],
  );
  const graphite = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2b2926", roughness: 0.35, metalness: 0.6 }), []);
  const steel = useMemo(() => new THREE.MeshStandardMaterial({ color: "#b8bcc2", roughness: 0.28, metalness: 0.9 }), []);
  const glass = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#0c0d10", roughness: 0.05, metalness: 0.3, clearcoat: 1 }),
    [],
  );
  const blanket = useMemo(() => new THREE.MeshStandardMaterial({ color: "#b3261e", roughness: 0.85 }), []);
  const ember = useMemo(
    () => new THREE.MeshStandardMaterial({ color: "#ff6a2b", emissive: "#ff5a14", emissiveIntensity: 2.2, toneMapped: false }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = progress?.current ?? 0;
    if (group.current) {
      const base = view === "hero" ? -0.55 : 0.5;
      group.current.rotation.y = base + p * Math.PI * 1.1 + Math.sin(t * 0.25) * 0.08;
      group.current.position.y = Math.sin(t * 1.1) * 0.012;
    }
    // The arm "breathes" and lifts a little as you scroll
    if (shoulder.current) shoulder.current.rotation.z = -0.35 - p * 0.35 + Math.sin(t * 0.9) * 0.04;
    if (elbow.current) elbow.current.rotation.z = 1.25 + p * 0.25 + Math.sin(t * 0.9 + 0.6) * 0.05;
  });

  return (
    <group ref={group} scale={fit}>
      {/* Mop pad */}
      <mesh position={[0, 0.025, 0]} receiveShadow>
        <cylinderGeometry args={[0.93, 0.93, 0.05, 96]} />
        <meshStandardMaterial color="#3a3835" roughness={1} />
      </mesh>

      {/* Body */}
      <mesh geometry={bodyGeo} material={shell} castShadow receiveShadow />

      {/* Sensor band + front light strip */}
      <mesh position={[0, 0.22, 0]} rotation-x={Math.PI / 2} material={graphite}>
        <torusGeometry args={[1.005, 0.035, 16, 128]} />
      </mesh>
      <mesh position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, Math.PI / 2 - 0.55]} material={ember}>
        <torusGeometry args={[1.03, 0.012, 8, 64, 1.1]} />
      </mesh>

      {/* Camera dome (AI vision) */}
      <group position={[0, 0.45, 0.48]}>
        <mesh material={graphite}>
          <cylinderGeometry args={[0.2, 0.22, 0.05, 48]} />
        </mesh>
        <mesh position={[0, 0.025, 0]} material={glass} castShadow>
          <sphereGeometry args={[0.18, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>

      {/* Emergency stop */}
      <group position={[0.5, 0.45, -0.35]}>
        <mesh material={graphite}>
          <cylinderGeometry args={[0.1, 0.1, 0.03, 32]} />
        </mesh>
        <mesh position={[0, 0.04, 0]} castShadow>
          <cylinderGeometry args={[0.075, 0.08, 0.06, 32]} />
          <meshStandardMaterial color="#d0261b" roughness={0.35} />
        </mesh>
      </group>

      {/* Arm with fire blanket */}
      <group position={[-0.38, 0.45, -0.12]}>
        <mesh material={graphite} castShadow>
          <cylinderGeometry args={[0.2, 0.22, 0.12, 48]} />
        </mesh>
        <group ref={shoulder} position={[0, 0.1, 0]} rotation={[0, 0.5, -0.35]}>
          <mesh material={steel}>
            <sphereGeometry args={[0.09, 32, 16]} />
          </mesh>
          <RoundedBox args={[0.13, 0.78, 0.13]} radius={0.05} position={[0, 0.39, 0]} material={shell} castShadow />
          <group ref={elbow} position={[0, 0.78, 0]} rotation-z={1.25}>
            <mesh material={steel}>
              <sphereGeometry args={[0.075, 32, 16]} />
            </mesh>
            <RoundedBox args={[0.11, 0.62, 0.11]} radius={0.045} position={[0, 0.31, 0]} material={shell} castShadow />
            {/* Gripper + folded blanket */}
            <group position={[0, 0.66, 0]} rotation-z={-0.9}>
              <RoundedBox args={[0.22, 0.06, 0.16]} radius={0.02} material={graphite} />
              <RoundedBox args={[0.5, 0.13, 0.36]} radius={0.05} position={[0.08, 0.1, 0]} material={blanket} castShadow />
              <mesh position={[0.08, 0.17, 0]} rotation-x={-Math.PI / 2}>
                <planeGeometry args={[0.44, 0.05]} />
                <meshStandardMaterial color="#f3efe8" roughness={0.9} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
