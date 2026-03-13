"use client"

import { useEffect, useRef } from "react"

export function LiquidRibbonBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", { antialias: true, alpha: true })
    if (!gl) return

    // Vertex Shader - creates morphing sphere with noise displacement
    const vertexShaderSource = `
      attribute vec3 aPosition;
      attribute vec3 aNormal;
      
      uniform mat4 uProjection;
      uniform mat4 uModelView;
      uniform float uTime;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vDisplacement;
      
      // Simplex noise function
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
      
      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        
        i = mod289(i);
        vec4 p = permute(permute(permute(
          i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }
      
      void main() {
        // Multiple layers of noise for organic deformation
        float noise1 = snoise(aPosition * 1.5 + uTime * 0.3) * 0.25;
        float noise2 = snoise(aPosition * 3.0 + uTime * 0.5) * 0.12;
        float noise3 = snoise(aPosition * 5.0 + uTime * 0.8) * 0.06;
        
        float displacement = noise1 + noise2 + noise3;
        vDisplacement = displacement;
        
        vec3 newPosition = aPosition + aNormal * displacement;
        
        vNormal = normalize(aNormal + vec3(noise1, noise2, noise3) * 0.5);
        vPosition = newPosition;
        
        gl_Position = uProjection * uModelView * vec4(newPosition, 1.0);
      }
    `

    // Fragment Shader - realistic lighting with blue-violet gradient
    const fragmentShaderSource = `
      precision highp float;
      
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying float vDisplacement;
      
      uniform float uTime;
      uniform vec3 uLightPos;
      
      void main() {
        vec3 normal = normalize(vNormal);
        vec3 lightDir = normalize(uLightPos - vPosition);
        vec3 viewDir = normalize(-vPosition);
        vec3 reflectDir = reflect(-lightDir, normal);
        
        // Base color gradient from electric blue to violet/magenta
        float colorMix = (vPosition.y + 1.0) * 0.5 + vDisplacement * 0.5;
        colorMix += sin(uTime * 0.3) * 0.1;
        
        vec3 colorBlue = vec3(0.0, 0.7, 1.0);      // Electric cyan
        vec3 colorViolet = vec3(0.6, 0.1, 0.9);    // Deep violet
        vec3 colorMagenta = vec3(0.9, 0.2, 0.7);   // Magenta
        
        vec3 baseColor;
        if (colorMix < 0.5) {
          baseColor = mix(colorMagenta, colorViolet, colorMix * 2.0);
        } else {
          baseColor = mix(colorViolet, colorBlue, (colorMix - 0.5) * 2.0);
        }
        
        // Ambient
        float ambientStrength = 0.15;
        vec3 ambient = ambientStrength * baseColor;
        
        // Diffuse - soft lighting
        float diff = max(dot(normal, lightDir), 0.0);
        diff = pow(diff, 0.8); // Softer falloff
        vec3 diffuse = diff * baseColor * 0.7;
        
        // Specular - glossy highlights
        float specularStrength = 0.9;
        float shininess = 64.0;
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), shininess);
        vec3 specular = specularStrength * spec * vec3(1.0, 1.0, 1.0);
        
        // Fresnel rim lighting for glass-like effect
        float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
        vec3 rim = fresnel * vec3(0.4, 0.6, 1.0) * 0.6;
        
        // Subsurface scattering simulation
        float sss = pow(max(dot(-lightDir, normal), 0.0), 2.0) * 0.3;
        vec3 subsurface = sss * colorMagenta;
        
        // Environment reflection
        vec3 envReflect = reflect(-viewDir, normal);
        float envFactor = pow(max(envReflect.y * 0.5 + 0.5, 0.0), 2.0) * 0.2;
        vec3 environment = envFactor * vec3(0.3, 0.5, 0.8);
        
        // Combine all lighting
        vec3 result = ambient + diffuse + specular + rim + subsurface + environment;
        
        // Add subtle glow based on displacement
        float glow = abs(vDisplacement) * 0.5;
        result += glow * baseColor * 0.3;
        
        // Tone mapping
        result = result / (result + vec3(1.0));
        result = pow(result, vec3(1.0/2.2)); // Gamma correction
        
        gl_FragColor = vec4(result, 0.95);
      }
    `

    // Compile shaders
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

    // Create program
    const program = gl.createProgram()!
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    // Generate sphere geometry
    function generateSphere(radius: number, segments: number) {
      const positions: number[] = []
      const normals: number[] = []
      const indices: number[] = []

      for (let lat = 0; lat <= segments; lat++) {
        const theta = (lat * Math.PI) / segments
        const sinTheta = Math.sin(theta)
        const cosTheta = Math.cos(theta)

        for (let lon = 0; lon <= segments; lon++) {
          const phi = (lon * 2 * Math.PI) / segments
          const sinPhi = Math.sin(phi)
          const cosPhi = Math.cos(phi)

          const x = cosPhi * sinTheta
          const y = cosTheta
          const z = sinPhi * sinTheta

          positions.push(radius * x, radius * y, radius * z)
          normals.push(x, y, z)
        }
      }

      for (let lat = 0; lat < segments; lat++) {
        for (let lon = 0; lon < segments; lon++) {
          const first = lat * (segments + 1) + lon
          const second = first + segments + 1

          indices.push(first, second, first + 1)
          indices.push(second, second + 1, first + 1)
        }
      }

      return { positions, normals, indices }
    }

    const sphere = generateSphere(1.0, 64)

    // Create buffers
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphere.positions), gl.STATIC_DRAW)

    const normalBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(sphere.normals), gl.STATIC_DRAW)

    const indexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(sphere.indices), gl.STATIC_DRAW)

    // Get attribute/uniform locations
    const aPosition = gl.getAttribLocation(program, "aPosition")
    const aNormal = gl.getAttribLocation(program, "aNormal")
    const uProjection = gl.getUniformLocation(program, "uProjection")
    const uModelView = gl.getUniformLocation(program, "uModelView")
    const uTime = gl.getUniformLocation(program, "uTime")
    const uLightPos = gl.getUniformLocation(program, "uLightPos")

    // Matrix utilities
    function perspective(fov: number, aspect: number, near: number, far: number) {
      const f = 1.0 / Math.tan(fov / 2)
      return new Float32Array([
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) / (near - far), -1,
        0, 0, (2 * far * near) / (near - far), 0
      ])
    }

    function translate(x: number, y: number, z: number) {
      return new Float32Array([
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1
      ])
    }

    function rotateY(angle: number) {
      const c = Math.cos(angle)
      const s = Math.sin(angle)
      return new Float32Array([
        c, 0, s, 0,
        0, 1, 0, 0,
        -s, 0, c, 0,
        0, 0, 0, 1
      ])
    }

    function multiply(a: Float32Array, b: Float32Array) {
      const result = new Float32Array(16)
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          result[i * 4 + j] = 
            a[i * 4] * b[j] +
            a[i * 4 + 1] * b[j + 4] +
            a[i * 4 + 2] * b[j + 8] +
            a[i * 4 + 3] * b[j + 12]
        }
      }
      return result
    }

    let time = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    resize()
    window.addEventListener("resize", resize)

    gl.enable(gl.DEPTH_TEST)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const animate = () => {
      time += 0.016

      gl.clearColor(0.02, 0.02, 0.06, 1.0)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

      const aspect = canvas.width / canvas.height
      const projectionMatrix = perspective(Math.PI / 4, aspect, 0.1, 100)
      
      const translation = translate(0, 0, -4)
      const rotation = rotateY(time * 0.3)
      const modelViewMatrix = multiply(translation, rotation)

      gl.uniformMatrix4fv(uProjection, false, projectionMatrix)
      gl.uniformMatrix4fv(uModelView, false, modelViewMatrix)
      gl.uniform1f(uTime, time)
      gl.uniform3f(uLightPos, 3.0 * Math.sin(time * 0.5), 2.0, 3.0 * Math.cos(time * 0.5))

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.enableVertexAttribArray(aPosition)
      gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0)

      gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer)
      gl.enableVertexAttribArray(aNormal)
      gl.vertexAttribPointer(aNormal, 3, gl.FLOAT, false, 0, 0)

      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
      gl.drawElements(gl.TRIANGLES, sphere.indices.length, gl.UNSIGNED_SHORT, 0)

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ background: "#050510", zIndex: 1, top: 0, left: 0 }}
    />
  )
}
