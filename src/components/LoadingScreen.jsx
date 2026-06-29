"use client";

import React, { useEffect, useRef, useState } from "react";

export default function LoadingScreen({ onComplete }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [progressWidth, setProgressWidth] = useState("0%");
  const [fadeOut, setFadeOut] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // 1. Progress Bar Simulation on Mount
    const progressTimer = requestAnimationFrame(() => {
      setProgressWidth("100%");
    });

    // 2. Transition states
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000); // Start fade-out at 3 seconds

    const completeTimer = setTimeout(() => {
      setVisible(false);
      if (onComplete) onComplete();
    }, 4000); // Fully complete at 4 seconds (after 1s fade animation)

    // 3. WebGL Background Shader Initialization (Safely wrapped in try-catch)
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl;
    let animationFrameId;
    let resizeObserver;
    let handleMouseMove;

    try {
      gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      
      if (gl) {
        // Compile shader helpers
        const vsSource = `
          attribute vec2 a_position;
          varying vec2 v_texCoord;
          void main() {
            v_texCoord = a_position * 0.5 + 0.5;
            gl_Position = vec4(a_position, 0.0, 1.0);
          }
        `;

        const fsSource = `
          precision highp float;
          varying vec2 v_texCoord;
          uniform float u_time;
          uniform vec2 u_resolution;

          void main() {
              vec2 uv = v_texCoord;
              
              // Create a subtle dark noise/grain effect for the background
              float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
              
              // Deep black base matching #131313
              vec3 color = vec3(0.0745, 0.0745, 0.0745); 
              
              // Subtle red ambient glow pulsing in the center
              float d = length(uv - 0.5);
              float glow = smoothstep(0.8, 0.2, d) * 0.05 * (0.5 + 0.5 * sin(u_time * 0.5));
              color += vec3(0.878, 0.023, 0.0) * glow;
              
              // Add subtle noise texture
              color += noise * 0.01;
              
              gl_FragColor = vec4(color, 1.0);
          }
        `;

        const compileShader = (type, source) => {
          const shader = gl.createShader(type);
          if (!shader) return null;
          gl.shaderSource(shader, source);
          gl.compileShader(shader);
          if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error("Shader compilation failed: ", gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
          }
          return shader;
        };

        const vertexShader = compileShader(gl.VERTEX_SHADER, vsSource);
        const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fsSource);

        if (vertexShader && fragmentShader) {
          const program = gl.createProgram();
          if (program) {
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            if (gl.getProgramParameter(program, gl.LINK_STATUS)) {
              gl.useProgram(program);

              // Setup buffer
              const buffer = gl.createBuffer();
              gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
              gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
                gl.STATIC_DRAW
              );

              const positionLoc = gl.getAttribLocation(program, "a_position");
              gl.enableVertexAttribArray(positionLoc);
              gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

              const uTimeLoc = gl.getUniformLocation(program, "u_time");
              const uResLoc = gl.getUniformLocation(program, "u_resolution");
              const uMouseLoc = gl.getUniformLocation(program, "u_mouse");

              let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

              // Check Event touch coordinates safely to prevent NaN crashes
              handleMouseMove = (event) => {
                if (
                  typeof event.clientX !== "number" ||
                  typeof event.clientY !== "number" ||
                  isNaN(event.clientX) ||
                  isNaN(event.clientY)
                ) {
                  return;
                }
                const rect = canvas.getBoundingClientRect();
                if (rect.width && rect.height) {
                  const nx = (event.clientX - rect.left) / rect.width;
                  const ny = 1.0 - (event.clientY - rect.top) / rect.height;
                  mouse.x = nx * canvas.width;
                  mouse.y = ny * canvas.height;
                }
              };

              window.addEventListener("mousemove", handleMouseMove);

              // Sync Size
              const syncSize = () => {
                const w = canvas.clientWidth || 1280;
                const h = canvas.clientHeight || 720;
                if (canvas.width !== w || canvas.height !== h) {
                  canvas.width = w;
                  canvas.height = h;
                }
              };

              if (typeof ResizeObserver !== "undefined") {
                resizeObserver = new ResizeObserver(syncSize);
                resizeObserver.observe(canvas);
              }
              syncSize();

              const render = (t) => {
                if (typeof ResizeObserver === "undefined") syncSize();
                if (gl && canvas) {
                  gl.viewport(0, 0, canvas.width, canvas.height);
                  if (uTimeLoc) gl.uniform1f(uTimeLoc, t * 0.001);
                  if (uResLoc) gl.uniform2f(uResLoc, canvas.width, canvas.height);
                  if (uMouseLoc) gl.uniform2f(uMouseLoc, mouse.x, mouse.y);
                  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
                }
                animationFrameId = requestAnimationFrame(render);
              };

              render(0);
            }
          }
        }
      }
    } catch (err) {
      console.error("WebGL loading safely bypassed or caught exception: ", err);
    }

    // Cleanup WebGL and Event Listeners
    return () => {
      cancelAnimationFrame(progressTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (handleMouseMove) window.removeEventListener("mousemove", handleMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      style={{ pointerEvents: fadeOut ? "none" : "auto" }}
      className={`fixed inset-0 w-full h-full bg-black z-[9999] flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background WebGL Shader Canvas */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <canvas
          ref={canvasRef}
          className="block w-full h-full"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Main Loading Sequence UI */}
      <main className="relative z-10 flex flex-col items-center gap-8 select-none">
        {/* Animated SVG Dumbbell */}
        <div className="relative w-[120px] h-[120px] flex items-center justify-center">
          <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[120px] h-[120px] block"
          >
            <style>
              {`
                .dumbbell {
                  fill: #FFFFFF;
                  transform-origin: center;
                  animation: lift 2s ease-in-out infinite;
                }
                @keyframes lift {
                  0%, 100% { transform: translateY(0) rotate(0deg); }
                  50% { transform: translateY(-15px) rotate(5deg); }
                }
                .glint {
                  fill: #E00600;
                  animation: pulse 1s infinite;
                }
                @keyframes pulse {
                  0%, 100% { opacity: 0.3; }
                  50% { opacity: 1; }
                }
              `}
            </style>
            {/* Dumbbell Handle */}
            <rect className="dumbbell" height="6" rx="2" width="40" x="30" y="47"></rect>
            {/* Left Weight */}
            <rect className="dumbbell" height="30" rx="3" width="12" x="20" y="35"></rect>
            <rect className="dumbbell" height="20" rx="2" width="6" x="15" y="40"></rect>
            {/* Right Weight */}
            <rect className="dumbbell" height="30" rx="3" width="12" x="68" y="35"></rect>
            <rect className="dumbbell" height="20" rx="2" width="6" x="79" y="40"></rect>
            {/* Accents */}
            <circle className="glint" cx="26" cy="50" r="2"></circle>
            <circle className="glint" cx="74" cy="50" r="2"></circle>
          </svg>
        </div>

        {/* Progress Bar & Text */}
        <div className="flex flex-col items-center gap-6">
          <div className="w-[240px] h-[4px] bg-white/5 border border-white/10 relative overflow-hidden rounded-[2px]">
            <div
              className="absolute top-0 left-0 h-full bg-secondary-container shadow-[0_0_15px_rgba(224,6,0,0.6)]"
              style={{
                width: progressWidth,
                transition: "width 3s cubic-bezier(0.65, 0, 0.35, 1)",
              }}
            />
          </div>
          <div className="opacity-0 animate-fadeIn">
            <p className="font-body font-bold text-xs uppercase tracking-[0.3em] text-on-surface/80">
              PREPARING FOR EXCELLENCE
            </p>
          </div>
        </div>

        {/* Brand Name Footer */}
        <div className="absolute bottom-[-80px] md:bottom-[-100px] left-1/2 -translate-x-1/2 opacity-20">
          <span className="font-display text-2xl font-black tracking-tighter text-on-surface uppercase">IIFN</span>
        </div>
      </main>
    </div>
  );
}
