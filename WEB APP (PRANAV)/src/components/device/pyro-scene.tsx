"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";

/**
 * PyroBot, modelled in code: a small four-wheel car-style rover with a camera dome,
 * side sensor strips, a front light bar, an emergency stop, a mop pad underneath and an arm that
 * carries a folded fire blanket. No model file or network needed.
 *
 * `progress` is a ref (0..1) that the page drives from scroll.
 */
export type PyroView = "hero" | "anatomy" | "story";

/** 0→1 between a and b, eased. */
const ss = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const PAN_X = 1.8;

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
      : view === "story"
        ? { position: [0.4, 2.3, 7.4] as [number, number, number], fov: 30 }
        : { position: [3.6, 2.4, 4.6] as [number, number, number], fov: 28 };
  const look: [number, number, number] = view === "story" ? [0.4, 0.5, 0] : [0, view === "hero" ? 0.45 : 0.4, 0];
  const anchor = useRef<THREE.Object3D>(null);

  return (
    <Canvas
      className={className}
      dpr={[1, 2]}
      shadows
      camera={camera}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, outputColorSpace: THREE.SRGBColorSpace }}
      onCreated={({ camera }) => camera.lookAt(...look)}
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[-3, 6, 4]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[4, 2, -4]} intensity={1.4} color="#b9d2ff" />
      <pointLight position={[0, 0.6, 2.4]} intensity={2} distance={4} color="#ff8a4c" />

      {view === "story" && <FitStoryCamera look={look} />}
      <Robot progress={progress} view={view} anchor={anchor} />
      {view === "story" && <PanFire progress={progress} anchor={anchor} />}

      <ContactShadows position={[0, -0.001, 0]} opacity={0.55} scale={view === "story" ? 14 : 7} blur={2.6} far={2} color="#000000" />

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

function Robot({
  progress,
  view,
  anchor,
}: {
  progress?: React.RefObject<number>;
  view: PyroView;
  anchor: React.RefObject<THREE.Object3D | null>;
}) {
  const gripper = useRef<THREE.Group>(null);
  const carried = useRef<THREE.Group>(null);
  const group = useRef<THREE.Group>(null);
  const shoulder = useRef<THREE.Group>(null);
  const elbow = useRef<THREE.Group>(null);
  const wheels = useRef<THREE.Group[]>([]);
  // Shrink on narrow (portrait) screens so the robot never covers the copy
  const aspect = useThree((s) => s.viewport.aspect);
  const fit = view === "hero" ? Math.min(1, Math.max(0.55, aspect / 1.6)) : 1;

  const shell = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#ebe8e2", roughness: 0.38, clearcoat: 0.45, clearcoatRoughness: 0.35 }),
    [],
  );
  const graphite = useMemo(() => new THREE.MeshStandardMaterial({ color: "#2b2926", roughness: 0.4, metalness: 0.55 }), []);
  const rubber = useMemo(() => new THREE.MeshStandardMaterial({ color: "#161514", roughness: 0.92 }), []);
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

  // Chassis is 2.1 long (x, front = +x), 1.2 wide (z)
  const wheelSpots: [number, number][] = [
    [0.68, 0.68],
    [0.68, -0.68],
    [-0.68, 0.68],
    [-0.68, -0.68],
  ];

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = progress?.current ?? 0;

    if (view === "story") {
      // Drive in, stop short of the pan, then back away at the end
      const x = lerp(-4.6, 0, ss(0, 0.2, p)) + lerp(0, -1.4, ss(0.86, 1, p));
      if (group.current) {
        group.current.position.set(x, Math.sin(t * 1.4) * 0.004, 0);
        group.current.rotation.y = 0;
      }
      wheels.current.forEach((w) => w && (w.rotation.y = -x / 0.24));
      // Arm reaches forward, then folds home after the drop
      const k = ss(0.46, 0.6, p) * (1 - ss(0.76, 0.88, p));
      const sh = lerp(0.9, -0.55, k);
      const el = lerp(-2.4, -1.0, k);
      if (shoulder.current) shoulder.current.rotation.z = sh;
      if (elbow.current) elbow.current.rotation.z = el;
      if (gripper.current) gripper.current.rotation.z = -(sh + el);
      if (carried.current) carried.current.visible = p < 0.62;
      return;
    }

    if (group.current) {
      const base = view === "hero" ? -0.6 : 0.65;
      group.current.rotation.y = base + p * Math.PI * 1.1 + Math.sin(t * 0.25) * 0.08;
      group.current.position.y = Math.sin(t * 1.4) * 0.006;
    }
    // Wheels creep forward slowly so it reads as a vehicle
    wheels.current.forEach((w) => w && (w.rotation.y -= delta * 0.6));
    if (shoulder.current) shoulder.current.rotation.z = 0.9 + p * 0.2 + Math.sin(t * 0.9) * 0.03;
    if (elbow.current) elbow.current.rotation.z = -2.4 - p * 0.15 + Math.sin(t * 0.9 + 0.6) * 0.04;
  });

  return (
    <group ref={group} scale={fit}>
      {/* Wheels */}
      {wheelSpots.map(([x, z], i) => (
        <group key={i} position={[x, 0.24, z]}>
          <group ref={(el) => { if (el) wheels.current[i] = el; }} rotation-x={Math.PI / 2}>
            <mesh material={rubber} castShadow>
              <cylinderGeometry args={[0.24, 0.24, 0.18, 48]} />
            </mesh>
            <mesh position={[0, z > 0 ? 0.092 : -0.092, 0]} material={steel}>
              <cylinderGeometry args={[0.14, 0.14, 0.01, 6]} />
            </mesh>
            <mesh position={[0, z > 0 ? 0.096 : -0.096, 0]} material={graphite}>
              <cylinderGeometry args={[0.05, 0.05, 0.01, 24]} />
            </mesh>
          </group>
        </group>
      ))}

      {/* Mop pad, slung between the axles */}
      <RoundedBox args={[0.9, 0.06, 0.9]} radius={0.02} position={[0, 0.07, 0]} receiveShadow>
        <meshStandardMaterial color="#3a3835" roughness={1} />
      </RoundedBox>

      {/* Chassis + body */}
      <RoundedBox args={[2.1, 0.26, 1.12]} radius={0.1} smoothness={6} position={[0, 0.38, 0]} material={graphite} castShadow />
      <RoundedBox args={[1.96, 0.34, 1.08]} radius={0.15} smoothness={8} position={[-0.02, 0.62, 0]} material={shell} castShadow receiveShadow />
      {/* Sloped nose */}
      <RoundedBox args={[0.42, 0.22, 1.02]} radius={0.1} smoothness={6} position={[0.86, 0.52, 0]} rotation-z={-0.35} material={shell} castShadow />

      {/* Front light bar + side sensor strips */}
      <RoundedBox args={[0.04, 0.05, 0.86]} radius={0.02} position={[1.06, 0.42, 0]} material={ember} />
      {[0.57, -0.57].map((z) => (
        <RoundedBox key={z} args={[1.5, 0.035, 0.02]} radius={0.01} position={[-0.05, 0.56, z]} material={graphite} />
      ))}

      {/* Camera dome (AI vision) on the hood */}
      <group position={[0.55, 0.79, 0]}>
        <mesh material={graphite}>
          <cylinderGeometry args={[0.17, 0.19, 0.04, 48]} />
        </mesh>
        <mesh position={[0, 0.02, 0]} material={glass} castShadow>
          <sphereGeometry args={[0.15, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      </group>

      {/* Emergency stop, rear corner */}
      <group position={[-0.75, 0.79, 0.34]}>
        <mesh material={graphite}>
          <cylinderGeometry args={[0.09, 0.09, 0.03, 32]} />
        </mesh>
        <mesh position={[0, 0.04, 0]} castShadow>
          <cylinderGeometry args={[0.068, 0.072, 0.055, 32]} />
          <meshStandardMaterial color="#d0261b" roughness={0.35} />
        </mesh>
      </group>

      {/* Arm with fire blanket, mounted on the rear deck and reaching forward */}
      <group position={[-0.42, 0.79, -0.12]}>
        <mesh material={graphite} castShadow>
          <cylinderGeometry args={[0.19, 0.21, 0.1, 48]} />
        </mesh>
        <group ref={shoulder} position={[0, 0.08, 0]} rotation={[0, 0, 0.9]}>
          <mesh material={steel}>
            <sphereGeometry args={[0.085, 32, 16]} />
          </mesh>
          <RoundedBox args={[0.12, 0.6, 0.12]} radius={0.05} position={[0, 0.3, 0]} material={shell} castShadow />
          <group ref={elbow} position={[0, 0.6, 0]} rotation-z={-2.4}>
            <mesh material={steel}>
              <sphereGeometry args={[0.07, 32, 16]} />
            </mesh>
            <RoundedBox args={[0.1, 0.52, 0.1]} radius={0.04} position={[0, 0.26, 0]} material={shell} castShadow />
            {/* Gripper + folded blanket */}
            <group ref={gripper} position={[0, 0.56, 0]} rotation-z={1.5}>
              <RoundedBox args={[0.2, 0.06, 0.15]} radius={0.02} material={graphite} />
              <object3D ref={anchor} position={[0.06, 0.09, 0]} />
              <group ref={carried}>
                <RoundedBox args={[0.46, 0.12, 0.34]} radius={0.05} position={[0.06, 0.09, 0]} material={blanket} castShadow />
                <mesh position={[0.06, 0.155, 0]} rotation-x={-Math.PI / 2}>
                  <planeGeometry args={[0.4, 0.05]} />
                  <meshStandardMaterial color="#f3efe8" roughness={0.9} />
                </mesh>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

/** The story's pan fire, and the blanket that flies from the gripper to smother it. */
function PanFire({
  progress,
  anchor,
}: {
  progress?: React.RefObject<number>;
  anchor: React.RefObject<THREE.Object3D | null>;
}) {
  const flames = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  const drop = useRef<THREE.Mesh>(null);
  const from = useMemo(() => new THREE.Vector3(), []);
  const to = useMemo(() => new THREE.Vector3(PAN_X, 0.16, 0), []);

  const flameMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({ color: "#ff5a14", transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }),
    [],
  );
  const coreMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({ color: "#ffc25a", transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide, toneMapped: false }),
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const p = progress?.current ?? 0;
    const fire = ss(0.02, 0.1, p) * (1 - ss(0.72, 0.77, p));
    if (flames.current) {
      flames.current.visible = fire > 0.01;
      const f = 1 + Math.sin(t * 13) * 0.08 + Math.sin(t * 7.3) * 0.06;
      flames.current.scale.set(fire * (1 + Math.sin(t * 9) * 0.05), fire * f, fire);
    }
    if (light.current) light.current.intensity = fire * (6 + Math.sin(t * 17) * 1.5);

    // Blanket flight: from the gripper, in an arc, flattening out over the pan
    const f = ss(0.62, 0.74, p);
    if (drop.current) {
      drop.current.visible = p >= 0.62;
      if (anchor.current) anchor.current.getWorldPosition(from);
      drop.current.position.lerpVectors(from, to, f);
      drop.current.position.y += Math.sin(f * Math.PI) * 0.45;
      drop.current.scale.set(lerp(0.46, 0.95, f), lerp(0.12, 0.06, f), lerp(0.34, 0.95, f));
    }
  });

  return (
    <group>
      {/* Pan */}
      <group position={[PAN_X, 0, 0]}>
        <mesh position={[0, 0.06, 0]} castShadow>
          <cylinderGeometry args={[0.36, 0.3, 0.12, 48, 1, true]} />
          <meshStandardMaterial color="#26282c" metalness={0.7} roughness={0.35} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0.005, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.01, 48]} />
          <meshStandardMaterial color="#1c1d20" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0.62, 0.1, 0]} rotation-z={0.12} castShadow>
          <boxGeometry args={[0.55, 0.04, 0.07]} />
          <meshStandardMaterial color="#1b1a19" roughness={0.6} />
        </mesh>
        <group ref={flames} position={[0, 0.1, 0]}>
          <mesh position={[0, 0.28, 0]} material={flameMat}>
            <coneGeometry args={[0.26, 0.62, 24, 1, true]} />
          </mesh>
          <mesh position={[0.1, 0.2, 0.06]} rotation-z={-0.2} material={flameMat}>
            <coneGeometry args={[0.14, 0.42, 16, 1, true]} />
          </mesh>
          <mesh position={[0, 0.17, 0]} material={coreMat}>
            <coneGeometry args={[0.13, 0.32, 16, 1, true]} />
          </mesh>
        </group>
        <pointLight ref={light} position={[0, 0.5, 0]} color="#ff7a2a" distance={3.5} />
      </group>

      {/* The blanket once released */}
      <mesh ref={drop} visible={false} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#b3261e" roughness={0.85} />
      </mesh>
    </group>
  );
}

/** On tall phone screens, pull the story camera back so the robot and the pan both fit. */
function FitStoryCamera({ look }: { look: [number, number, number] }) {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  useEffect(() => {
    const aspect = size.width / size.height;
    const k = aspect < 1.4 ? Math.min(3, 1.1 / aspect) : 1;
    camera.position.set(look[0] + (k > 1 ? 0.3 : 0), 2.3 * Math.sqrt(k), 7.4 * k);
    camera.lookAt(...look);
  }, [camera, size, look]);
  return null;
}
