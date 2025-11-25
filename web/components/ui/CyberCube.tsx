"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";

function Cube() {
    const meshRef = useRef<Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.5;
            meshRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial
                color="#10b981"
                wireframe
                emissive="#047857"
                emissiveIntensity={0.5}
            />
        </mesh>
    );
}

export default function CyberCube() {
    return (
        <div className="w-16 h-16 md:w-20 md:h-20">
            <Canvas camera={{ position: [0, 0, 4] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Cube />
            </Canvas>
        </div>
    );
}
