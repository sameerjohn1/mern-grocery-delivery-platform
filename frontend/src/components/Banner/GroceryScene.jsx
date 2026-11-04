import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const Leaf = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = "#4CAF50" }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <mesh scale={[0.24, 0.06, 0.12]} castShadow>
      <sphereGeometry args={[1, 20, 20]} />
      <meshStandardMaterial color={color} roughness={0.55} />
    </mesh>
  </group>
);

const Apple = ({ position = [0, 0, 0], scale = 1, color = "#E5484D" }) => (
  <group position={position} scale={scale}>
    <mesh castShadow>
      <sphereGeometry args={[0.34, 32, 32]} />
      <meshStandardMaterial color={color} roughness={0.32} metalness={0.05} />
    </mesh>
    <mesh position={[0, 0.31, 0]} rotation={[0, 0, 0.2]} castShadow>
      <cylinderGeometry args={[0.022, 0.032, 0.17, 8]} />
      <meshStandardMaterial color="#7A4B28" roughness={0.8} />
    </mesh>
    <Leaf position={[0.13, 0.37, 0]} rotation={[0, 0, -0.55]} color="#66BB6A" />
  </group>
);

const Orange = ({ position = [0, 0, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <mesh castShadow>
      <sphereGeometry args={[0.33, 32, 32]} />
      <meshStandardMaterial color="#F59E0B" roughness={0.55} />
    </mesh>
    <Leaf position={[0.1, 0.32, 0]} rotation={[0, 0, -0.5]} color="#4CAF50" />
  </group>
);

const Lemon = ({ position = [0, 0, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <mesh scale={[1.25, 0.92, 0.92]} castShadow>
      <sphereGeometry args={[0.28, 28, 28]} />
      <meshStandardMaterial color="#FDE047" roughness={0.5} />
    </mesh>
  </group>
);

const Carrot = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }) => (
  <group position={position} rotation={rotation} scale={scale}>
    <mesh rotation={[Math.PI, 0, 0]} castShadow>
      <coneGeometry args={[0.15, 0.62, 20]} />
      <meshStandardMaterial color="#F97316" roughness={0.6} />
    </mesh>
    <Leaf position={[0.03, 0.36, 0]} rotation={[0, 0, 0.25]} scale={0.7} color="#43A047" />
    <Leaf position={[-0.06, 0.35, 0.02]} rotation={[0, 0, -0.3]} scale={0.6} color="#66BB6A" />
  </group>
);

const Broccoli = ({ position = [0, 0, 0], scale = 1 }) => (
  <group position={position} scale={scale}>
    <mesh position={[0, -0.16, 0]} castShadow>
      <cylinderGeometry args={[0.1, 0.13, 0.34, 12]} />
      <meshStandardMaterial color="#8BC34A" roughness={0.75} />
    </mesh>
    <mesh position={[0, 0.08, 0]} castShadow>
      <sphereGeometry args={[0.24, 24, 24]} />
      <meshStandardMaterial color="#2E7D32" roughness={0.7} />
    </mesh>
    <mesh position={[0.16, 0.02, 0.06]} castShadow>
      <sphereGeometry args={[0.15, 20, 20]} />
      <meshStandardMaterial color="#388E3C" roughness={0.7} />
    </mesh>
    <mesh position={[-0.15, 0.03, -0.04]} castShadow>
      <sphereGeometry args={[0.14, 20, 20]} />
      <meshStandardMaterial color="#43A047" roughness={0.7} />
    </mesh>
  </group>
);

const BagHandle = ({ z }) => (
  <mesh position={[0, 0.86, z]} castShadow>
    <torusGeometry args={[0.33, 0.035, 12, 36, Math.PI]} />
    <meshStandardMaterial color="#B58B57" roughness={0.8} />
  </mesh>
);

const GroceryBag = () => (
  <group>
    <RoundedBox
      args={[2.25, 2.15, 1.5]}
      radius={0.14}
      smoothness={5}
      position={[0, -0.3, 0]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color="#D8B07A" roughness={0.9} />
    </RoundedBox>

    <mesh position={[0, 0.785, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[2.02, 1.24]} />
      <meshStandardMaterial color="#6E4A26" roughness={1} />
    </mesh>

    <RoundedBox
      args={[1.02, 0.5, 0.05]}
      radius={0.08}
      smoothness={4}
      position={[0, -0.5, 0.77]}
      castShadow
    >
      <meshStandardMaterial color="#0B2B21" roughness={0.6} />
    </RoundedBox>

    <Leaf position={[-0.16, -0.46, 0.81]} rotation={[0, 0, 0.6]} scale={0.6} color="#A7E8C1" />
    <mesh position={[0.13, -0.5, 0.81]}>
      <boxGeometry args={[0.4, 0.045, 0.02]} />
      <meshStandardMaterial color="#A7E8C1" roughness={0.5} />
    </mesh>
    <mesh position={[0.13, -0.6, 0.81]}>
      <boxGeometry args={[0.28, 0.035, 0.02]} />
      <meshStandardMaterial color="#DDF4E5" roughness={0.5} />
    </mesh>

    <BagHandle z={0.4} />
    <BagHandle z={-0.4} />

    <Apple position={[-0.52, 1.02, 0.18]} scale={1.05} />
    <Apple position={[0.12, 1.12, -0.22]} scale={0.9} color="#84CC16" />
    <Orange position={[0.6, 0.98, 0.24]} scale={0.92} />
    <Lemon position={[-0.1, 0.94, 0.4]} scale={0.8} />
    <Leaf position={[0.34, 1.2, 0.22]} rotation={[0, 0.5, -0.4]} scale={1.1} color="#43A047" />
    <Leaf position={[-0.72, 1.12, -0.1]} rotation={[0, -0.3, 0.5]} scale={0.9} color="#66BB6A" />
  </group>
);

const Scene = () => {
  const group = useRef();
  const smooth = THREE.MathUtils.lerp;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = smooth(
      group.current.rotation.y,
      Math.sin(t * 0.35) * 0.38 + state.pointer.x * 0.28,
      0.05
    );
    group.current.rotation.x = smooth(group.current.rotation.x, -state.pointer.y * 0.09, 0.05);
    group.current.position.y = smooth(group.current.position.y, -0.05 + Math.sin(t * 0.9) * 0.05, 0.05);
  });

  return (
    <>
      <group ref={group} position={[0, -0.1, 0]}>
        <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.5}>
          <GroceryBag />
        </Float>

        <Float speed={2} rotationIntensity={0.7} floatIntensity={1.4} position={[-1.75, 0.95, 0.4]}>
          <Lemon scale={1.05} />
        </Float>

        <Float speed={1.8} rotationIntensity={0.5} floatIntensity={1.1} position={[1.65, 1.15, 0.15]}>
          <Orange scale={0.9} />
        </Float>

        <Float speed={2.2} rotationIntensity={0.8} floatIntensity={1.5} position={[1.7, -0.35, 0.65]}>
          <Broccoli scale={1} />
        </Float>

        <Float speed={1.6} rotationIntensity={0.6} floatIntensity={1.2} position={[-1.55, -0.75, 0.4]}>
          <Carrot scale={0.95} rotation={[0, 0, 0.5]} />
        </Float>

        <Float speed={2.4} rotationIntensity={0.9} floatIntensity={1.6} position={[-0.4, 1.85, -0.2]}>
          <Apple scale={0.72} color="#EF4444" />
        </Float>

        <Float speed={2.1} rotationIntensity={0.9} floatIntensity={1.5} position={[0.85, 1.7, 0.5]}>
          <Leaf rotation={[0.4, 0.6, -0.5]} scale={1.5} color="#A7E8C1" />
        </Float>
      </group>

      <ContactShadows
        position={[0, -1.85, 0]}
        opacity={0.4}
        scale={9}
        blur={2.8}
        far={4.5}
        color="#04150F"
      />
    </>
  );
};

const GroceryScene = () => {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.55, 6.6], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <hemisphereLight args={["#F6F3E8", "#04150F", 1.1]} />
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4.5, 7, 5]}
        intensity={2.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0004}
      />
      <directionalLight position={[-5, 3, -4]} intensity={0.7} color="#A7E8C1" />
      <pointLight position={[-3.5, 1.5, 4]} intensity={22} distance={12} color="#DDF4E5" />
      <pointLight position={[3.5, -1, 2]} intensity={12} distance={10} color="#F59E0B" />

      <Scene />
    </Canvas>
  );
};

export default GroceryScene;
