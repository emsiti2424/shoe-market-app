import { LitElement, html, css } from 'lit-element';
import * as THREE from 'three';

class Particle {
  constructor() {
    this.position = new THREE.Vector3(
      Math.random() * 200 - 100,
      Math.random() * 200 - 100,
      Math.random() * 200 - 100
    );

    this.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    );
  }

  update() {
    this.position.add(this.velocity);
    if (this.position.x > 100 || this.position.x < -100)
      this.velocity.x = -this.velocity.x;
    if (this.position.y > 100 || this.position.y < -100)
      this.velocity.y = -this.velocity.y;
    if (this.position.z > 100 || this.position.z < -100)
      this.velocity.z = -this.velocity.z;
  }
}

export class MyThreeBg extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }
    canvas {
      position: absolute;
      top: 0;
      left: 0;
    }
  `;

  constructor() {
    super();
    this.particles = [];
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
  }

  firstUpdated() {
    this.initThreeJs();
  }

  initThreeJs() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.shadowRoot.appendChild(this.renderer.domElement);
    this.scene.background = new THREE.Color(0x540d6e);
    this.camera.position.z = 100;


const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load('../assets/open-wc-logo.svg');

const particleMaterial = new THREE.PointsMaterial({
    size: 5,
    map: particleTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true
});

    const particleGeom = new THREE.BufferGeometry();
    const particleVertices = [];
    for (let i = 0; i < 80; i++) {
      this.spawnParticle();
      particleVertices.push(
        this.particles[i].position.x,
        this.particles[i].position.y,
        this.particles[i].position.z
      );
    }
    particleGeom.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(particleVertices, 3)
    );
    const particleSystem = new THREE.Points(particleGeom, particleMaterial);
    this.scene.add(particleSystem);

    const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });

    const animate = () => {
      requestAnimationFrame(animate);
      this.particles.forEach(particle => {
        particle.update();
      });

      this.scene.children.forEach(child => {
        if (child instanceof THREE.Line) {
          this.scene.remove(child);
        }
      });

      for (let i = 0; i < this.particles.length; i++) {
        for (let j = i + 1; j < this.particles.length; j++) {
          const distance = this.particles[i].position.distanceTo(
            this.particles[j].position
          );
          if (distance < 40) {
            const geometry = new THREE.BufferGeometry().setFromPoints([
              this.particles[i].position,
              this.particles[j].position,
            ]);
            const alpha = 2.0 - distance / 15.0;
            lineMaterial.color.setHSL(0.5, 1.0, 0.5 + alpha / 2.0);
            const line = new THREE.Line(geometry, lineMaterial);
            this.scene.add(line);
          }
        }
      }
      this.renderer.render(this.scene, this.camera);
      this.camera.position.x = 100 * Math.sin(Date.now() * 0.0001);
      this.camera.position.z = 100 * Math.cos(Date.now() * 0.0001);
      this.camera.lookAt(0, 0, 0);
    };

    animate();

    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
    });
  }

  spawnParticle() {
    const particle = new Particle();
    this.particles.push(particle);
  }

  render() {
    return html`<canvas></canvas>`;
  }
}

customElements.define('my-three-bg', MyThreeBg);
