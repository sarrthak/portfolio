import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

type AttentionFrame = {
  activeIndex: number;
  context: number[];
  predictedWord: string;
  probabilities: { token: string; probability: number }[];
  scores: number[];
  step: number;
  weights: number[];
};

const inputTokens = ['Sarrthak', 'builds', 'production-ready', 'AI', 'systems', 'that'];
const candidateWords = ['scale', 'learn', 'ship', 'adapt'];
const tokenVectors = [
  [0.86, 0.2, 0.42, 0.68],
  [0.74, 0.56, 0.24, 0.62],
  [0.95, 0.72, 0.64, 0.8],
  [0.48, 0.92, 0.88, 0.7],
  [0.82, 0.68, 0.76, 0.86],
  [0.58, 0.42, 0.9, 0.54],
];
const outputVectors = [
  [0.9, 0.66, 0.72, 0.82],
  [0.52, 0.94, 0.88, 0.46],
  [0.82, 0.5, 0.42, 0.9],
  [0.44, 0.84, 0.64, 0.74],
];

function dot(left: number[], right: number[]) {
  return left.reduce((total, value, index) => total + value * right[index], 0);
}

function softmax(values: number[]) {
  const max = Math.max(...values);
  const exponents = values.map((value) => Math.exp(value - max));
  const sum = exponents.reduce((total, value) => total + value, 0);

  return exponents.map((value) => value / sum);
}

function normalize(values: number[]) {
  const magnitude = Math.sqrt(values.reduce((total, value) => total + value * value, 0));

  return values.map((value) => value / Math.max(magnitude, 0.0001));
}

function calculateAttention(step: number): AttentionFrame {
  const activeIndex = step % inputTokens.length;
  const previous = tokenVectors[(activeIndex + inputTokens.length - 1) % inputTokens.length];
  const current = tokenVectors[activeIndex];
  const query = normalize(
    current.map((value, index) => value * 0.72 + previous[index] * 0.28 + Math.sin(step + index) * 0.05),
  );
  const scores = tokenVectors.map((key) => dot(query, normalize(key)) / Math.sqrt(query.length));
  const weights = softmax(scores.map((score, index) => score + (index <= activeIndex ? 0.28 : -0.16)));
  const context = tokenVectors[0].map((_, dimension) =>
    tokenVectors.reduce((total, vector, index) => total + vector[dimension] * weights[index], 0),
  );
  const logits = outputVectors.map((vector, index) => dot(normalize(context), normalize(vector)) + index * 0.03);
  const probabilities = softmax(logits)
    .map((probability, index) => ({
      token: candidateWords[index],
      probability,
    }))
    .sort((left, right) => right.probability - left.probability);

  return {
    activeIndex,
    context,
    predictedWord: probabilities[0].token,
    probabilities,
    scores,
    step,
    weights,
  };
}

function formatVector(values: number[]) {
  return `[${values.map((value) => value.toFixed(2)).join(', ')}]`;
}

export function TransformerHero() {
  const mountRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<AttentionFrame>(calculateAttention(0));
  const [frame, setFrame] = useState<AttentionFrame>(frameRef.current);

  const generatedText = useMemo(
    () => `${inputTokens.join(' ')} ${frame.predictedWord}`,
    [frame.predictedWord],
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setFrame((current) => {
        const next = calculateAttention(current.step + 1);
        frameRef.current = next;
        return next;
      });
    }, 1800);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return undefined;
    }

    const container = mount;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 1.15, 8.8);
    camera.lookAt(0, 0, 0);

    const ambient = new THREE.AmbientLight(0xa7fff2, 1.3);
    const key = new THREE.PointLight(0x48f6d2, 2.2, 14);
    key.position.set(-2.4, 3.4, 4.2);
    const warm = new THREE.PointLight(0xffc15a, 1.6, 10);
    warm.position.set(3.4, 1.4, 2.2);
    scene.add(ambient, key, warm);

    const tokenGeometry = new THREE.BoxGeometry(0.82, 0.26, 0.2);
    const tokenMaterials = inputTokens.map(
      () =>
        new THREE.MeshStandardMaterial({
          color: 0x12362f,
          emissive: 0x0b5449,
          emissiveIntensity: 0.28,
          metalness: 0.2,
          roughness: 0.38,
        }),
    );
    const tokens = tokenMaterials.map((material, index) => {
      const mesh = new THREE.Mesh(tokenGeometry, material);
      mesh.position.set(-3.35 + index * 1.34, 0.42 - Math.abs(index - 2.5) * 0.08, -0.45);
      scene.add(mesh);
      return mesh;
    });

    const headGeometry = new THREE.TorusGeometry(0.56, 0.035, 12, 64);
    const headMaterial = new THREE.MeshStandardMaterial({
      color: 0x5df4d6,
      emissive: 0x1ec9a9,
      emissiveIntensity: 0.7,
      metalness: 0.25,
      roughness: 0.22,
    });
    const attentionHead = new THREE.Mesh(headGeometry, headMaterial);
    attentionHead.position.set(0, -0.48, 0.18);
    attentionHead.rotation.x = Math.PI * 0.45;
    scene.add(attentionHead);

    const decoderGeometry = new THREE.BoxGeometry(1.35, 0.72, 0.34);
    const decoderMaterial = new THREE.MeshStandardMaterial({
      color: 0x3d2d12,
      emissive: 0xffa936,
      emissiveIntensity: 0.32,
      metalness: 0.1,
      roughness: 0.42,
    });
    const decoder = new THREE.Mesh(decoderGeometry, decoderMaterial);
    decoder.position.set(3.2, -1.34, -0.04);
    scene.add(decoder);

    const lineMaterials = inputTokens.map(
      () =>
        new THREE.LineBasicMaterial({
          color: 0x55f7df,
          transparent: true,
          opacity: 0.32,
        }),
    );
    const lines = lineMaterials.map((material, index) => {
      const points = [tokens[index].position.clone(), attentionHead.position.clone()];
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      return line;
    });

    const decoderLineMaterial = new THREE.LineBasicMaterial({
      color: 0xffc15a,
      transparent: true,
      opacity: 0.65,
    });
    const decoderLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([attentionHead.position.clone(), decoder.position.clone()]),
      decoderLineMaterial,
    );
    scene.add(decoderLine);

    const particles = Array.from({ length: 48 }, () => {
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.015, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0x9ffff0, transparent: true, opacity: 0.35 }),
      );
      mesh.position.set((Math.random() - 0.5) * 7.6, (Math.random() - 0.5) * 3.4, -1.3 - Math.random() * 1.4);
      scene.add(mesh);
      return mesh;
    });

    function resize() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    }

    resize();
    window.addEventListener('resize', resize);

    let animationId = 0;
    const clock = new THREE.Clock();

    function render() {
      const elapsed = clock.getElapsedTime();
      const current = frameRef.current;

      tokens.forEach((mesh, index) => {
        const weight = current.weights[index] ?? 0;
        mesh.scale.setScalar(1 + weight * 1.15);
        mesh.position.y = 0.42 - Math.abs(index - 2.5) * 0.08 + Math.sin(elapsed * 1.8 + index) * 0.04;
        tokenMaterials[index].emissiveIntensity = 0.18 + weight * 2.8;
        tokenMaterials[index].color.setHSL(0.46, 0.55 + weight * 0.32, 0.14 + weight * 0.32);
        lineMaterials[index].opacity = 0.12 + weight * 0.9;
      });

      attentionHead.rotation.z += 0.012;
      attentionHead.rotation.y = Math.sin(elapsed * 0.8) * 0.3;
      headMaterial.emissiveIntensity = 0.5 + Math.sin(elapsed * 3) * 0.18;
      decoder.rotation.y = Math.sin(elapsed * 0.9) * 0.12;
      decoderMaterial.emissiveIntensity = 0.26 + current.probabilities[0].probability * 0.42;

      particles.forEach((particle, index) => {
        particle.position.x += 0.002 + (index % 5) * 0.0008;
        particle.position.y += Math.sin(elapsed + index) * 0.0008;

        if (particle.position.x > 4.2) {
          particle.position.x = -4.2;
        }
      });

      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(render);
    }

    render();

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      container.removeChild(renderer.domElement);
      tokenGeometry.dispose();
      headGeometry.dispose();
      decoderGeometry.dispose();
      tokenMaterials.forEach((material) => material.dispose());
      lineMaterials.forEach((material) => material.dispose());
      headMaterial.dispose();
      decoderMaterial.dispose();
      decoderLineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="transformer-panel">
      <div className="transformer-stage" ref={mountRef} aria-hidden="true" />
      <div className="transformer-overlay">
        <div className="transformer-topline">
          <span>toy_transformer.forward()</span>
          <strong>live attention</strong>
        </div>

        <div className="token-row" aria-label="Input tokens">
          {inputTokens.map((token, index) => (
            <span
              className={index === frame.activeIndex ? 'token-chip active' : 'token-chip'}
              key={token}
              style={{ '--attention': frame.weights[index].toFixed(3) } as CSSProperties}
            >
              {token}
              <small>{frame.weights[index].toFixed(2)}</small>
            </span>
          ))}
        </div>

        <div className="attention-console">
          <div>
            <span className="console-label">Q.K^T</span>
            <div className="score-row">
              {frame.scores.map((score, index) => (
                <i key={index}>{score.toFixed(2)}</i>
              ))}
            </div>
          </div>
          <div>
            <span className="console-label">softmax</span>
            <div className="attention-bars">
              {frame.weights.map((weight, index) => (
                <i key={index} style={{ transform: `scaleY(${0.15 + weight * 4.6})` }} />
              ))}
            </div>
          </div>
          <div>
            <span className="console-label">context</span>
            <code>{formatVector(frame.context)}</code>
          </div>
        </div>

        <div className="decoder-console">
          <p>{generatedText}<span>_</span></p>
          <div className="candidate-row">
            {frame.probabilities.map((item) => (
              <span key={item.token}>
                {item.token}
                <i>{Math.round(item.probability * 100)}%</i>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
