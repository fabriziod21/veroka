import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function CupcakeBase() {
  const ref = useRef()

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.3
  })

  return (
    <group ref={ref} position={[0, -0.3, 0]}>
      {/* Base del cupcake (molde) */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.7, 0.5, 0.8, 32]} />
        <meshStandardMaterial color="#8B4513" roughness={0.6} />
      </mesh>

      {/* Lineas del molde */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(angle) * 0.61, -0.5, Math.sin(angle) * 0.61]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[0.02, 0.78, 0.08]} />
            <meshStandardMaterial color="#6B3410" roughness={0.8} />
          </mesh>
        )
      })}

      {/* Bizcocho */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.75, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#D2691E" roughness={0.7} />
      </mesh>

      {/* Frosting/crema */}
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
        <mesh position={[0, 0.35, 0]}>
          <sphereGeometry args={[0.65, 32, 32]} />
          <MeshDistortMaterial
            color="#FF69B4"
            roughness={0.3}
            metalness={0.1}
            distort={0.15}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Swirl de crema superior */}
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.35, 0.5, 16]} />
        <MeshDistortMaterial
          color="#FFB6C1"
          roughness={0.3}
          distort={0.2}
          speed={3}
        />
      </mesh>

      {/* Cereza */}
      <Float speed={3} floatIntensity={0.2}>
        <mesh position={[0, 1.15, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#DC143C" roughness={0.2} metalness={0.3} />
        </mesh>
        {/* Tallo de la cereza */}
        <mesh position={[0.02, 1.35, 0]} rotation={[0, 0, 0.15]}>
          <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
          <meshStandardMaterial color="#228B22" />
        </mesh>
      </Float>

      {/* Chispas decorativas */}
      <Sprinkles />
    </group>
  )
}

function Sprinkles() {
  const sprinkles = useMemo(() => {
    const items = []
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE']
    for (let i = 0; i < 30; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 0.4
      const r = 0.6 + Math.random() * 0.15
      items.push({
        position: [
          r * Math.sin(phi) * Math.cos(theta),
          0.2 + r * Math.cos(phi) * 0.5,
          r * Math.sin(phi) * Math.sin(theta)
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }
    return items
  }, [])

  return (
    <>
      {sprinkles.map((s, i) => (
        <mesh key={i} position={s.position} rotation={s.rotation}>
          <capsuleGeometry args={[0.02, 0.06, 4, 8]} />
          <meshStandardMaterial color={s.color} roughness={0.5} metalness={0.2} />
        </mesh>
      ))}
    </>
  )
}

function FloatingDonut({ position, color, scale = 1 }) {
  const ref = useRef()

  useFrame((state) => {
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3
    ref.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.3 + position[2]) * 0.2
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.15
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <torusGeometry args={[0.3, 0.15, 16, 32]} />
      <MeshDistortMaterial
        color={color}
        roughness={0.4}
        metalness={0.1}
        distort={0.1}
        speed={2}
      />
    </mesh>
  )
}

function Particles() {
  const ref = useRef()
  const count = 50

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return pos
  }, [])

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.02
    const posArray = ref.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#FFB6C1" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

export default function Cake3D() {
  return (
    <div className="w-full h-full" style={{ touchAction: 'pan-y' }}>
      <Canvas
        camera={{ position: [0, 1, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#fff5f5" />
        <directionalLight position={[-3, 3, -3]} intensity={0.4} color="#ff69b4" />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#FFD700" />

        <CupcakeBase />

        <FloatingDonut position={[-2.2, 0.5, -1]} color="#FF69B4" scale={0.7} />
        <FloatingDonut position={[2.5, -0.3, -0.5]} color="#DDA0DD" scale={0.5} />
        <FloatingDonut position={[-1.8, -0.8, 0.5]} color="#F0E68C" scale={0.4} />

        <Particles />

        <Environment preset="studio" />
      </Canvas>
    </div>
  )
}
