import { useEffect, useLayoutEffect, useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { ScenarioResult } from '../lib/sightline';

const U = 0.16;

function EyeLine({ fromX }: { fromX: number }) {
  const object = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(fromX * U, 0.06, -0.72),
      new THREE.Vector3(0, 0.06, 3.45),
    ]);
    const material = new THREE.LineDashedMaterial({ color: '#C65A36', dashSize: 0.13, gapSize: 0.09, transparent: true, opacity: 0.92 });
    const line = new THREE.Line(geometry, material);
    line.computeLineDistances();
    return line;
  }, [fromX]);
  useEffect(() => () => { object.geometry.dispose(); (object.material as THREE.Material).dispose(); }, [object]);
  return <primitive object={object} />;
}

function Ground() {
  return (
    <>
      <color attach="background" args={['#1D2220']} />
      <ambientLight intensity={1.8} />
      <directionalLight position={[-3, 10, 8]} intensity={2.2} color="#FFF7E9" />
      <mesh receiveShadow position={[-4, -0.17, 0]}><boxGeometry args={[12, 0.16, 9]} /><meshStandardMaterial color="#252B29" roughness={1} /></mesh>
      <mesh receiveShadow position={[-4, -0.09, 0]}><boxGeometry args={[12, 0.1, 4.9]} /><meshStandardMaterial color="#373D39" roughness={1} /></mesh>
      <mesh position={[-4, -0.02, 3.38]}><boxGeometry args={[12, 0.18, 1.75]} /><meshStandardMaterial color="#898477" roughness={1} /></mesh>
      <mesh position={[-4, -0.02, -3.38]}><boxGeometry args={[12, 0.18, 1.75]} /><meshStandardMaterial color="#898477" roughness={1} /></mesh>
      <mesh position={[-4, 0.03, 2.43]}><boxGeometry args={[12, 0.02, 0.04]} /><meshBasicMaterial color="#DDD8CA" /></mesh>
      <mesh position={[-4, 0.03, -2.43]}><boxGeometry args={[12, 0.02, 0.04]} /><meshBasicMaterial color="#DDD8CA" /></mesh>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[-8.65 + i * 0.78, 0.01, 0]}><boxGeometry args={[0.38, 0.02, 0.035]} /><meshBasicMaterial color="#C7C5BA" /></mesh>
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <mesh key={i} position={[-0.58 + i * 0.14, 0.03, 0]}><boxGeometry args={[0.065, 0.02, 4.5]} /><meshBasicMaterial color="#E6E0D2" /></mesh>
      ))}
    </>
  );
}

function Van({ setbackM }: { setbackM: number }) {
  const x = -(setbackM + 3) * U;
  return (
    <group position={[x, 0, 1.63]}>
      <mesh castShadow position={[0, 0.42, 0]}><boxGeometry args={[0.95, 0.68, 0.56]} /><meshStandardMaterial color="#E0DDD4" roughness={0.8} /></mesh>
      <mesh position={[-0.22, 0.56, -0.295]}><boxGeometry args={[0.36, 0.3, 0.008]} /><meshStandardMaterial color="#87918E" metalness={0.1} roughness={0.34} /></mesh>
      <mesh position={[0.23, 0.56, -0.295]}><boxGeometry args={[0.34, 0.3, 0.008]} /><meshStandardMaterial color="#87918E" metalness={0.1} roughness={0.34} /></mesh>
      <mesh position={[0.48, 0.44, 0]}><boxGeometry args={[0.015, 0.2, 0.4]} /><meshBasicMaterial color="#C65A36" /></mesh>
      {[-0.3, 0.3].map((wheel) => (
        <mesh key={wheel} position={[wheel, 0.08, -0.3]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.12, 0.12, 0.07, 12]} /><meshStandardMaterial color="#1E2321" /></mesh>
      ))}
    </group>
  );
}

function DriverCar({ xM }: { xM: number }) {
  return (
    <group position={[xM * U, 0, -0.74]}>
      <mesh castShadow position={[0, 0.21, 0]}><boxGeometry args={[0.73, 0.25, 0.45]} /><meshStandardMaterial color="#D6D3C8" roughness={0.6} /></mesh>
      <mesh castShadow position={[0, 0.39, 0]}><boxGeometry args={[0.4, 0.18, 0.38]} /><meshStandardMaterial color="#8A9691" roughness={0.35} /></mesh>
      <mesh position={[0.37, 0.21, 0]}><boxGeometry args={[0.02, 0.11, 0.36]} /><meshBasicMaterial color="#F4F1EA" /></mesh>
      {[-0.24, 0.24].map((wheel) => (
        <mesh key={wheel} position={[wheel, 0.07, -0.24]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.095, 0.095, 0.05, 12]} /><meshStandardMaterial color="#171A19" /></mesh>
      ))}
    </group>
  );
}

function Pedestrian() {
  return (
    <group position={[0, 0, 3.45]}>
      <mesh castShadow position={[0, 0.5, 0]}><cylinderGeometry args={[0.11, 0.09, 0.45, 12]} /><meshStandardMaterial color="#C65A36" roughness={0.75} /></mesh>
      <mesh castShadow position={[0, 0.83, 0]}><sphereGeometry args={[0.13, 16, 12]} /><meshStandardMaterial color="#D9C2A8" roughness={0.9} /></mesh>
      <mesh position={[-0.07, 0.16, 0]}><boxGeometry args={[0.055, 0.3, 0.07]} /><meshStandardMaterial color="#242824" /></mesh>
      <mesh position={[0.07, 0.16, 0]}><boxGeometry args={[0.055, 0.3, 0.07]} /><meshStandardMaterial color="#242824" /></mesh>
    </group>
  );
}

function DistanceTrace({ scenario }: { scenario: ScenarioResult }) {
  const from = scenario.firstVisibilityXM * U;
  const reactionEnd = Math.min(1.6, (scenario.firstVisibilityXM + scenario.reactionDistanceM) * U);
  const stopEnd = Math.min(1.6, (scenario.firstVisibilityXM + scenario.stoppingDistanceM) * U);
  const reactionLength = Math.max(0.02, reactionEnd - from);
  const brakingLength = Math.max(0.02, stopEnd - reactionEnd);
  return (
    <>
      <mesh position={[(from + reactionEnd) / 2, 0.04, -2.12]}><boxGeometry args={[reactionLength, 0.025, 0.12]} /><meshBasicMaterial color="#F4F1EA" /></mesh>
      <mesh position={[(reactionEnd + stopEnd) / 2, 0.05, -2.12]}><boxGeometry args={[brakingLength, 0.03, 0.12]} /><meshBasicMaterial color="#C65A36" /></mesh>
      <mesh position={[from, 0.07, -2.12]}><cylinderGeometry args={[0.085, 0.085, 0.02, 16]} /><meshBasicMaterial color="#F4F1EA" /></mesh>
      <mesh position={[stopEnd, 0.08, -2.12]}><cylinderGeometry args={[0.085, 0.085, 0.02, 16]} /><meshBasicMaterial color="#C65A36" /></mesh>
    </>
  );
}

function Model({ scenario }: { scenario: ScenarioResult }) {
  const { camera, invalidate } = useThree();
  useLayoutEffect(() => {
    camera.position.set(-1.5, 13, 12);
    camera.lookAt(-3.5, 0, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, invalidate]);
  useEffect(() => {
    const redraw = () => invalidate();
    const frame = requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    const timer = window.setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
    document.addEventListener('visibilitychange', redraw);
    return () => { cancelAnimationFrame(frame); clearTimeout(timer); document.removeEventListener('visibilitychange', redraw); };
  }, [invalidate]);
  useEffect(() => invalidate(), [scenario, invalidate]);
  return <>
    <Ground />
    <Van setbackM={scenario.setbackM} />
    <DriverCar xM={scenario.firstVisibilityXM} />
    <Pedestrian />
    <EyeLine fromX={scenario.firstVisibilityXM} />
    <DistanceTrace scenario={scenario} />
  </>;
}

export default function StreetCanvas({ scenario }: { scenario: ScenarioResult }) {
  return (
    <div className="street-canvas" aria-hidden="true">
      <Canvas dpr={[1, 2]} frameloop="demand" shadows gl={{ antialias: true, powerPreference: 'high-performance' }} camera={{ position: [-1.5, 13, 12], fov: 37, near: 0.1, far: 100 }}>
        <Model scenario={scenario} />
      </Canvas>
    </div>
  );
}
