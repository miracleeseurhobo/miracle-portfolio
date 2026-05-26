import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uDpr;
  attribute float aSeed;
  varying float vSeed;
  varying float vDepth;

  // Ashima simplex 3D noise
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
      +i.y+vec4(0.0,i1.y,i2.y,1.0))
      +i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main(){
    vSeed = aSeed;
    vec3 pos = position;
    float t = uTime * 0.05;
    float nx = snoise(vec3(pos.xy * 0.18, t));
    float ny = snoise(vec3(pos.yx * 0.18 + 13.7, t + 4.2));
    float nz = snoise(vec3(pos.xy * 0.10 + 7.3, t * 0.7));
    pos.x += nx * 0.45;
    pos.y += ny * 0.45;
    pos.z += nz * 0.7;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
    vDepth = -mvPos.z;
    gl_Position = projectionMatrix * mvPos;
    float ps = uSize * uDpr * (180.0 / max(-mvPos.z, 0.1)) * (0.6 + 0.7 * aSeed);
    gl_PointSize = clamp(ps, 1.0, 14.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec3 uColor;
  varying float vSeed;
  varying float vDepth;

  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;

    float core = smoothstep(0.5, 0.0, d);
    float glow = smoothstep(0.5, 0.18, d) * 0.35;
    float alpha = (core * core) + glow;

    float pulse = 0.5 + 0.5 * sin(uTime * 0.55 + vSeed * 6.283);
    alpha *= mix(0.12, 0.85, pulse);

    float depthFade = smoothstep(26.0, 6.0, vDepth);
    alpha *= depthFade;

    vec3 col = mix(uColor, vec3(1.0), core * 0.55);
    gl_FragColor = vec4(col, alpha);
  }
`;

function ParticleField({ tier }: { tier: "high" | "low" }) {
  const ref = useRef<THREE.Points>(null!);
  const { mouse, size } = useThree();

  const geometry = useMemo(() => {
    const COLS = tier === "high" ? 160 : 96;
    const ROWS = tier === "high" ? 110 : 64;
    const count = COLS * ROWS;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const SPACING = 0.28;
    for (let i = 0; i < count; i++) {
      const x = (i % COLS) - COLS / 2;
      const y = Math.floor(i / COLS) - ROWS / 2;
      const jitterX = (Math.random() - 0.5) * 0.45;
      const jitterY = (Math.random() - 0.5) * 0.45;
      positions[i * 3] = (x + jitterX) * SPACING;
      positions[i * 3 + 1] = (y + jitterY) * SPACING;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4.5;
      seeds[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return g;
  }, [tier]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 5.5 },
      uDpr: { value: Math.min(window.devicePixelRatio || 1, 1.75) },
      uColor: { value: new THREE.Color("#a8c5ff") },
    }),
    [],
  );

  useEffect(() => {
    return () => geometry.dispose();
  }, [geometry]);

  const target = useRef({ x: 0, y: 0 });
  useFrame((state, delta) => {
    uniforms.uTime.value = state.clock.elapsedTime;
    if (!ref.current) return;
    target.current.x += (mouse.x - target.current.x) * Math.min(delta * 2.2, 1);
    target.current.y += (mouse.y - target.current.y) * Math.min(delta * 2.2, 1);
    ref.current.rotation.y =
      target.current.x * 0.06 + Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
    ref.current.rotation.x =
      -target.current.y * 0.04 +
      Math.cos(state.clock.elapsedTime * 0.04) * 0.015;
    ref.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.07) * 0.18;
    ref.current.position.x =
      Math.cos(state.clock.elapsedTime * 0.05) * 0.12;
  });

  // Keep uDpr/uSize sane across resizes
  useEffect(() => {
    uniforms.uDpr.value = Math.min(window.devicePixelRatio || 1, 1.75);
    // tiny tweak: smaller dots on very wide displays so density reads right
    uniforms.uSize.value = size.width > 1800 ? 5.0 : 5.8;
  }, [size.width, uniforms]);

  return (
    <points ref={ref} geometry={geometry}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

const grainVert = /* glsl */ `
  varying vec2 vUv;
  void main(){
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;
const grainFrag = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  void main(){
    vec2 px = vUv * uResolution;
    float n = hash(floor(px) + floor(uTime * 60.0));
    gl_FragColor = vec4(vec3(1.0), n * 0.03);
  }
`;

function Grain() {
  const { size } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  useEffect(() => {
    uniforms.uResolution.value.set(size.width, size.height);
  }, [size.width, size.height, uniforms]);
  useFrame((s) => {
    uniforms.uTime.value = s.clock.elapsedTime;
  });
  return (
    <mesh frustumCulled={false} renderOrder={999}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={grainVert}
        fragmentShader={grainFrag}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

function hasWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const c = document.createElement("canvas");
    return !!(
      c.getContext("webgl2") ||
      c.getContext("webgl") ||
      c.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

function useDeviceTier(): "high" | "low" {
  return useMemo(() => {
    if (typeof window === "undefined") return "low";
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 900px)").matches;
    const lowCores =
      (navigator as Navigator & { hardwareConcurrency?: number })
        .hardwareConcurrency !== undefined &&
      (navigator.hardwareConcurrency ?? 8) <= 4;
    return coarse || narrow || lowCores ? "low" : "high";
  }, []);
}

function useReducedMotion(): boolean {
  return useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
}

export function BackgroundField() {
  const webglOk = useMemo(() => hasWebGL(), []);
  const reducedMotion = useReducedMotion();
  const tier = useDeviceTier();
  const renderCanvas = webglOk && !reducedMotion;
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: "#050505" }}
      aria-hidden
    >
      {renderCanvas ? (
        <Canvas
          dpr={tier === "high" ? [1, 1.6] : [1, 1.25]}
          camera={{ position: [0, 0, 14], fov: 55 }}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
            failIfMajorPerformanceCaveat: false,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x050505, 0);
          }}
          fallback={null}
        >
          <ParticleField tier={tier} />
          {tier === "high" ? <Grain /> : null}
        </Canvas>
      ) : null}
      {/* subtle vignette for cinematic falloff */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
    </div>
  );
}
