import { LitElement, html, css } from 'lit-element';
import * as THREE from 'three';

const COLORS = {
  paleAzure: '#69ddffff',
  roseQuartz: '#b59da4ff',
  indigo: '#540d6eff',
  orangePeel: '#ff9f1cff',
  englishViolet: '#4b3f72ff',
};

class Particle {
  constructor() {
    const colors = [
      '#5bc0eb',
      '#fde74c',
      '#9bc53d',
      '#e55934',
      '#fa7921',
      '#2FF3E0',
      '#F8D210',
      '#FA26A0',
      '#F51720',
    ];

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: colors[Math.floor(Math.random() * colors.length)],
      wireframe: true,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.scale.setScalar(Math.random() * 10 + 1);
    this.mesh.position.set(
      Math.random() * 200 - 100,
      Math.random() * 50 - 75,
      Math.random() * 200 - 100
    );

    this.rotationSpeed = (Math.random() - 0.5) * 0.05;
    this.upwardSpeed = Math.random() * 0.75 + 0.25;
  }

  update() {
    this.mesh.rotation.x += this.rotationSpeed;
    this.mesh.rotation.y += this.rotationSpeed;
    this.mesh.position.y += this.upwardSpeed;
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
    this.renderer.domElement.width = window.innerWidth;
    this.renderer.domElement.height = window.innerHeight;

    this.shadowRoot.appendChild(this.renderer.domElement);

    this.scene.background = new THREE.Color(0x540d6e);

    this.camera.position.z = 100;

    for (let i = 0; i < 80; i++) {
      this.spawnParticle();
    }

    const animate = () => {
      requestAnimationFrame(animate);

      if (Math.random() < 0.5) {
        this.spawnParticle();
      }

      this.particles.forEach(particle => {
        particle.update();
      });

      this.particles = this.particles.filter(particle => {
        if (particle.mesh.position.y > 150) {
          this.scene.remove(particle.mesh);
          return false;
        }
        return true;
      });

      this.renderer.render(this.scene, this.camera);
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
    this.scene.add(particle.mesh);
  }

  render() {
    return html`<canvas></canvas>`;
  }
}

customElements.define('my-three-bg', MyThreeBg);
