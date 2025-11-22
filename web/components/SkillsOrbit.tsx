"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { IconType } from "react-icons";

type Skill = {
    name: string;
    icon: IconType;
    color: string;
};

type SkillsOrbitProps = {
    skills: Skill[];
};

function SkillIcon({ skill, position }: { skill: Skill; position: [number, number, number] }) {
    return (
        <group position={position}>
            <Html transform center distanceFactor={13} zIndexRange={[1000, 0]}>
                <div className="flex flex-col items-center justify-center group cursor-pointer">
                    <div
                        className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-700/50 backdrop-blur-md shadow-lg transition-all duration-300 group-hover:scale-125 group-hover:border-zinc-500 group-hover:bg-zinc-800"
                    >
                        <skill.icon
                            className="w-8 h-8 transition-colors duration-300"
                            style={{ color: skill.color }}
                        />
                    </div>
                    <span className="mt-2 text-xs font-bold text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-2 py-1 rounded whitespace-nowrap">
                        {skill.name}
                    </span>
                </div>
            </Html>
        </group>
    );
}

function Ring({ radius, speed, angle, skills }: { radius: number; speed: number; angle: number; skills: Skill[] }) {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.z += speed * 0.01;
        }
    });

    const skillPositions = useMemo(() => {
        return skills.map((_, i) => {
            const theta = (i / skills.length) * Math.PI * 2;
            return [
                Math.cos(theta) * radius,
                Math.sin(theta) * radius,
                0
            ] as [number, number, number];
        });
    }, [skills, radius]);

    return (
        <group rotation={[angle, 0, 0]}>
            {/* Visible Ring Line */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[radius, 0.02, 16, 100]} />
                <meshStandardMaterial color="#333" transparent opacity={0.5} />
            </mesh>

            {/* Rotating Group for Icons */}
            <group ref={ref}>
                {skills.map((skill, i) => (
                    <SkillIcon key={i} skill={skill} position={skillPositions[i]} />
                ))}
            </group>
        </group>
    );
}

export default function SkillsOrbit({ skills }: SkillsOrbitProps) {
    // Split skills into 3 rings
    const ring1 = skills.slice(0, 4);
    const ring2 = skills.slice(4, 10);
    const ring3 = skills.slice(10);

    return (
        <div className="h-[800px] w-full relative">
            <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <group rotation={[0, 0, Math.PI / 6]}>
                    <Ring radius={5.5} speed={0.5} angle={-0.6} skills={ring1} />
                    <Ring radius={8} speed={0.3} angle={0.6} skills={ring2} />
                    <Ring radius={10} speed={0.2} angle={-0.8} skills={ring3} />
                </group>

                <Html center position={[0, 0, 0]} zIndexRange={[100, 0]}>
                    <div className="text-center pointer-events-none select-none">
                        <h3 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-zinc-100 to-zinc-500 drop-shadow-2xl">
                            ARSENAL
                        </h3>
                        <p className="text-xs md:text-sm text-zinc-500 tracking-[0.5em] uppercase mt-2">
                            Technical Proficiency
                        </p>
                    </div>
                </Html>

                <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
            </Canvas>
        </div>
    );
}
