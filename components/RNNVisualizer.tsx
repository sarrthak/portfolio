'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const techWords = [
  'PyTorch', 'Kubernetes', 'LangGraph', 'FastAPI', 'Redis',
  'Neo4j', 'Docker', 'Kafka', 'Next.js', 'PostgreSQL',
  'React', 'Vercel', 'TensorFlow', 'Cloudflare', 'TypeScript',
];

const NODE_COUNT = 6;
const PULSE_SPEED = 0.006;
const CYCLE_PAUSE = 60; // frames to pause after word reveal

export function RNNVisualizer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    pulseT: 0,
    paused: 0,
    wordIndex: 0,
    phase: 'forward' as 'forward' | 'reveal' | 'pause',
  });
  const [currentWord, setCurrentWord] = useState(techWords[0]);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.4, 9);
    camera.lookAt(0, 0, 0);

    // Lighting
    const ambient = new THREE.AmbientLight(0x8ecfff, 1.2);
    const key = new THREE.PointLight(0x5df4d6, 2.0, 16);
    key.position.set(-3, 3, 5);
    const warm = new THREE.PointLight(0xffc15a, 1.2, 12);
    warm.position.set(4, 1, 3);
    scene.add(ambient, key, warm);

    // RNN nodes (hidden state blocks)
    const nodeGeo = new THREE.BoxGeometry(0.55, 0.55, 0.25);
    const nodeMats = Array.from({ length: NODE_COUNT }, () =>
      new THREE.MeshStandardMaterial({
        color: 0x12362f,
        emissive: 0x0b5449,
        emissiveIntensity: 0.2,
        metalness: 0.3,
        roughness: 0.35,
      }),
    );
    const nodes = nodeMats.map((mat, i) => {
      const mesh = new THREE.Mesh(nodeGeo, mat);
      const x = (i - (NODE_COUNT - 1) / 2) * 1.5;
      mesh.position.set(x, 0, 0);
      scene.add(mesh);
      return mesh;
    });

    // Connection lines between nodes
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x5df4d6,
      transparent: true,
      opacity: 0.3,
    });
    for (let i = 0; i < NODE_COUNT - 1; i++) {
      const geo = new THREE.BufferGeometry().setFromPoints([
        nodes[i].position.clone(),
        nodes[i + 1].position.clone(),
      ]);
      scene.add(new THREE.Line(geo, lineMat));
    }

    // Recurrent loop arcs (subtle curved lines going back)
    const loopMat = new THREE.LineBasicMaterial({
      color: 0xffc15a,
      transparent: true,
      opacity: 0.18,
    });
    for (let i = 0; i < NODE_COUNT - 1; i++) {
      const curve = new THREE.QuadraticBezierCurve3(
        nodes[i + 1].position.clone(),
        new THREE.Vector3(
          (nodes[i].position.x + nodes[i + 1].position.x) / 2,
          -1.1,
          0.3,
        ),
        nodes[i].position.clone(),
      );
      const arcGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(20));
      scene.add(new THREE.Line(arcGeo, loopMat));
    }

    // Data pulse (glowing sphere)
    const pulseGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const pulseMat = new THREE.MeshStandardMaterial({
      color: 0x5df4d6,
      emissive: 0x5df4d6,
      emissiveIntensity: 1.8,
      metalness: 0,
      roughness: 0.2,
    });
    const pulse = new THREE.Mesh(pulseGeo, pulseMat);
    pulse.position.copy(nodes[0].position);
    scene.add(pulse);

    // Output decoder block (right side)
    const decoderGeo = new THREE.BoxGeometry(0.9, 0.5, 0.2);
    const decoderMat = new THREE.MeshStandardMaterial({
      color: 0x3d2d12,
      emissive: 0xffa936,
      emissiveIntensity: 0.25,
      metalness: 0.1,
      roughness: 0.4,
    });
    const decoder = new THREE.Mesh(decoderGeo, decoderMat);
    const lastNode = nodes[NODE_COUNT - 1];
    decoder.position.set(lastNode.position.x + 1.6, 0, 0);
    scene.add(decoder);

    // Line from last node to decoder
    const decoderLineGeo = new THREE.BufferGeometry().setFromPoints([
      lastNode.position.clone(),
      decoder.position.clone(),
    ]);
    const decoderLineMat = new THREE.LineBasicMaterial({
      color: 0xffc15a,
      transparent: true,
      opacity: 0.5,
    });
    scene.add(new THREE.Line(decoderLineGeo, decoderLineMat));

    // Ambient particles
    const particles = Array.from({ length: 24 }, () => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.012, 6, 6),
        new THREE.MeshBasicMaterial({ color: 0x9ffff0, transparent: true, opacity: 0.25 }),
      );
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 3,
        -1.5 - Math.random(),
      );
      scene.add(mesh);
      return mesh;
    });

    function resize() {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / Math.max(h, 1);
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    let animId = 0;
    const clock = new THREE.Clock();

    function animate() {
      const elapsed = clock.getElapsedTime();
      const state = stateRef.current;

      // Pulse movement
      if (state.phase === 'forward') {
        state.pulseT += PULSE_SPEED;
        const segmentIndex = Math.min(Math.floor(state.pulseT), NODE_COUNT - 1);
        const segmentFrac = state.pulseT - Math.floor(state.pulseT);

        if (segmentIndex >= NODE_COUNT - 1) {
          // Reached the last node → move to decoder
          state.phase = 'reveal';
          state.pulseT = 0;
        } else {
          const from = nodes[segmentIndex].position;
          const to = nodes[segmentIndex + 1].position;
          pulse.position.lerpVectors(from, to, segmentFrac);
        }
      } else if (state.phase === 'reveal') {
        // Animate pulse to decoder
        state.pulseT += PULSE_SPEED * 2;
        const from = lastNode.position;
        const to = decoder.position;
        pulse.position.lerpVectors(from, to, Math.min(state.pulseT, 1));

        if (state.pulseT >= 1) {
          state.phase = 'pause';
          state.paused = 0;
          setRevealed(true);
        }
      } else {
        // Pause phase
        state.paused++;
        if (state.paused >= CYCLE_PAUSE) {
          state.phase = 'forward';
          state.pulseT = 0;
          state.wordIndex = (state.wordIndex + 1) % techWords.length;
          setCurrentWord(techWords[state.wordIndex]);
          setRevealed(false);
          pulse.position.copy(nodes[0].position);
        }
      }

      // Animate nodes
      nodes.forEach((mesh, i) => {
        const pulseNode = Math.floor(stateRef.current.pulseT);
        const isActive = state.phase === 'forward' && i === pulseNode;
        const intensity = isActive ? 1.2 : 0.2;
        nodeMats[i].emissiveIntensity += (intensity - nodeMats[i].emissiveIntensity) * 0.12;

        if (isActive) {
          nodeMats[i].emissive.setHex(0x5df4d6);
        } else {
          nodeMats[i].emissive.setHex(0x0b5449);
        }

        mesh.position.y = Math.sin(elapsed * 1.5 + i * 0.7) * 0.04;
        mesh.rotation.y = Math.sin(elapsed * 0.8 + i) * 0.08;
      });

      // Decoder glow on reveal
      const targetDecoder = state.phase === 'pause' ? 0.8 : 0.25;
      decoderMat.emissiveIntensity += (targetDecoder - decoderMat.emissiveIntensity) * 0.1;

      // Pulse glow
      pulseMat.emissiveIntensity = 1.2 + Math.sin(elapsed * 6) * 0.6;
      pulse.scale.setScalar(1 + Math.sin(elapsed * 5) * 0.15);

      // Particles drift
      particles.forEach((p, i) => {
        p.position.x += 0.0015 + (i % 4) * 0.0005;
        p.position.y += Math.sin(elapsed + i) * 0.0006;
        if (p.position.x > 6) p.position.x = -6;
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      mount.removeChild(renderer.domElement);
      nodeGeo.dispose();
      nodeMats.forEach((m) => m.dispose());
      pulseGeo.dispose();
      pulseMat.dispose();
      decoderGeo.dispose();
      decoderMat.dispose();
      lineMat.dispose();
      loopMat.dispose();
      decoderLineMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="rnn-panel">
      <div className="rnn-stage" ref={mountRef} aria-hidden="true" />
      <div className="rnn-overlay">
        <div className="rnn-topline">
          <span>rnn_cell.forward(h_t, x_t)</span>
          <strong>sequence → word</strong>
        </div>
        <div className="rnn-output">
          <div className="rnn-hidden-labels">
            {Array.from({ length: NODE_COUNT }, (_, i) => (
              <span key={i}>h<sub>{i}</sub></span>
            ))}
          </div>
          <div className={`rnn-word ${revealed ? 'revealed' : ''}`}>
            <span className="rnn-word-label">decoded →</span>
            <span className="rnn-word-value">
              {revealed ? currentWord : '_ _ _ _'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
