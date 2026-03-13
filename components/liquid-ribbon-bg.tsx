"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function LiquidRibbonBg() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const ribbonRef = useRef<THREE.Mesh | null>(null)
  const timeRef = useRef(0)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 3

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x050505, 1)
    containerRef.current.appendChild(renderer.domElement)

    sceneRef.current = scene
    rendererRef.current = renderer

    // Create custom ribbon geometry
    const geometry = new THREE.BufferGeometry()
    const segments = 100
    const width = 2

    const positions: number[] = []
    const indices: number[] = []

    // Create ribbon mesh
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * 6 - 3
      for (let j = 0; j < 2; j++) {
        const y = j * width - width / 2
        positions.push(x, y, Math.sin(x * 0.5) * 0.5)
      }
    }

    // Create indices for triangles
    for (let i = 0; i < segments; i++) {
      const a = i * 2
      const b = a + 1
      const c = a + 2
      const d = a + 3

      indices.push(a, b, c)
      indices.push(b, d, c)
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(positions), 3))
    geometry.setIndex(new THREE.BufferAttribute(new Uint32Array(indices), 1))
    geometry.computeVertexNormals()

    // Create shader material for glow effect
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(0x0084ff) }, // Electric Blue
        uColor2: { value: new THREE.Color(0x00ffff) }, // Cyan
        uColor3: { value: new THREE.Color(0x7c3aed) }, // Violet
      },
      vertexShader: `
        uniform float uTime;
        varying vec3 vPosition;
        varying float vY;

        void main() {
          vPosition = position;
          vY = uv.y;

          vec3 pos = position;
          
          // Morphing effect
          pos.z += sin(position.x * 2.0 + uTime * 0.5) * 0.3;
          pos.z += cos(position.x * 3.0 - uTime * 0.3) * 0.2;
          pos.y += sin(uTime * 0.7) * 0.1;
          
          // Rotation and flowing movement
          float angle = uTime * 0.3;
          float c = cos(angle);
          float s = sin(angle);
          mat2 rot = mat2(c, -s, s, c);
          pos.xy = rot * pos.xy;

          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec3 vPosition;
        varying float vY;

        void main() {
          // Color mixing with time-based animation
          float wave = sin(vPosition.x * 2.0 + uTime * 0.5) * 0.5 + 0.5;
          vec3 color = mix(uColor1, uColor2, wave);
          color = mix(color, uColor3, sin(uTime * 0.3) * 0.5 + 0.5);

          // Glow intensity
          float glow = 1.0 + 0.3 * sin(uTime * 2.0);
          
          // Soft alpha falloff
          float alpha = 0.8 * (1.0 - abs(vY) * 2.0) * glow;

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      wireframe: false,
    })

    const ribbon = new THREE.Mesh(geometry, material)
    scene.add(ribbon)
    ribbonRef.current = ribbon

    // Add secondary ribbon for depth
    const ribbon2 = ribbon.clone()
    ribbon2.position.z = -0.5
    ribbon2.scale.set(0.7, 0.7, 0.7)
    ;(ribbon2.material as THREE.ShaderMaterial).uniforms.uColor1.value = new THREE.Color(0x00ffcc)
    ;(ribbon2.material as THREE.ShaderMaterial).uniforms.uColor2.value = new THREE.Color(0x7c3aed)
    scene.add(ribbon2)

    // Lighting
    const light1 = new THREE.PointLight(0x0084ff, 1, 100)
    light1.position.set(5, 5, 5)
    scene.add(light1)

    const light2 = new THREE.PointLight(0x00ffff, 1, 100)
    light2.position.set(-5, -5, 5)
    scene.add(light2)

    const ambientLight = new THREE.AmbientLight(0x7c3aed, 0.3)
    scene.add(ambientLight)

    // Handle window resize
    const handleResize = () => {
      if (!rendererRef.current) return
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      rendererRef.current.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      timeRef.current += 0.016

      // Update shader uniforms
      if (ribbon.material instanceof THREE.ShaderMaterial) {
        ribbon.material.uniforms.uTime.value = timeRef.current
      }

      // Subtle mouse interaction
      const mouseX = (Math.random() - 0.5) * 0.1
      const mouseY = (Math.random() - 0.5) * 0.1
      ribbon.rotation.x += mouseY * 0.01
      ribbon.rotation.y += mouseX * 0.01

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      containerRef.current?.removeChild(renderer.domElement)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 -z-10" style={{ background: "#050505" }} />
}
