// src/components/Logo3D.tsx

import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import logoUrl from '../assets/3Dlogo.gltf?url';

const LETTER_COLORS: Record<string, string> = {
  B: '#5E46FC',
  S: '#FE7F2D',
};

const SCROLL_BOOST_GAIN = 0.02; // extra rad/sec added per px of scroll delta
const SCROLL_BOOST_MAX = 6; // rad/sec cap so a fast fling doesn't spin wildly
const SCROLL_BOOST_DECAY = 2.5; // per-second decay rate back toward 0 while still scrolling
const SCROLL_IDLE_DELAY = 150; // ms with no scroll events before considered "stopped"
const RETURN_SPEED = 1; // per-second exponential rate easing back to the start orientation
const CAMERA_FILL = 0.9; // <1 pulls the camera closer than a tight fit, so the model reads larger in the same canvas

interface ScrollSpinState {
  boost: number;
  isScrolling: boolean;
}

function LogoModel({ scrollStateRef }: { scrollStateRef: React.RefObject<ScrollSpinState> }) {
  const { scene } = useGLTF(logoUrl);
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Spline's export bakes the camera/lights into the scene graph as nodes,
  // plus whatever arbitrary offset the letters had in the Spline editor.
  // We drive our own camera/lights instead, so strip the baked ones and
  // re-center the geometry on the origin.
  const model = useMemo(() => {
    const cloned = scene.clone(true);
    const toRemove: THREE.Object3D[] = [];

    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const letter = child.parent?.name;
        const color = letter ? LETTER_COLORS[letter] : undefined;
        child.material = new THREE.MeshStandardMaterial({
          color: color ?? '#ffffff',
          emissive: color ?? '#ffffff',
          emissiveIntensity: 0.05,
          roughness: 0.35,
          metalness: 0.1,
          transparent: true,
          opacity: 0.85,
        });
      } else if (child instanceof THREE.Light || child instanceof THREE.Camera) {
        toRemove.push(child);
      }
    });

    toRemove.forEach((obj) => obj.parent?.remove(obj));

    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.sub(center);

    const sphere = box.getBoundingSphere(new THREE.Sphere());
    return { object: cloned, radius: sphere.radius || 1 };
  }, [scene]);

  useLayoutEffect(() => {
    const perspectiveCamera = camera as THREE.PerspectiveCamera;
    const fitDistance = model.radius / Math.sin((perspectiveCamera.fov * Math.PI) / 360);
    camera.position.set(0, model.radius * 0.25, fitDistance * CAMERA_FILL);
    camera.near = model.radius * 0.01;
    camera.far = fitDistance * 10;
    camera.lookAt(0, 0, 0);
    perspectiveCamera.updateProjectionMatrix();
  }, [camera, model.radius]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const state = scrollStateRef.current;

    if (state.isScrolling) {
      groupRef.current.rotation.y += state.boost * delta;
      state.boost = Math.max(0, state.boost - state.boost * SCROLL_BOOST_DECAY * delta);
    } else {
      // Keep spinning forward (the same direction scrolling always drives it)
      // until it reaches the next full turn, instead of reversing direction.
      const current = groupRef.current.rotation.y;
      const target = Math.ceil(current / (Math.PI * 2) - 1e-6) * (Math.PI * 2);
      const easeAmount = 1 - Math.exp(-RETURN_SPEED * delta);
      const next = THREE.MathUtils.lerp(current, target, easeAmount);

      // Once effectively at rest, snap onto 0 (a visually identical multiple
      // of a full turn) so the value doesn't drift upward forever.
      groupRef.current.rotation.y = target - next < 1e-3 ? 0 : next;
      state.boost = 0;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={model.object} />
    </group>
  );
}

const Logo3D: React.FC = () => {
  const scrollStateRef = useRef<ScrollSpinState>({ boost: 0, isScrolling: false });
  const lastScrollYRef = useRef(0);
  const idleTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;
      lastScrollYRef.current = currentY;

      const state = scrollStateRef.current;
      state.isScrolling = true;
      state.boost = Math.min(SCROLL_BOOST_MAX, state.boost + Math.abs(delta) * SCROLL_BOOST_GAIN);

      if (idleTimeoutRef.current !== undefined) {
        window.clearTimeout(idleTimeoutRef.current);
      }
      idleTimeoutRef.current = window.setTimeout(() => {
        scrollStateRef.current.isScrolling = false;
      }, SCROLL_IDLE_DELAY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (idleTimeoutRef.current !== undefined) {
        window.clearTimeout(idleTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Canvas
      camera={{ fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[3, 4, 5]} intensity={1.9} />
      <directionalLight position={[-3, -2, -4]} intensity={0.7} />
      <LogoModel scrollStateRef={scrollStateRef} />
    </Canvas>
  );
};

useGLTF.preload(logoUrl);

export default Logo3D;
