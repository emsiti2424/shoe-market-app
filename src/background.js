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
      (Math.random() - 0.5) * 0.5,  // Making the movement slower
      (Math.random() - 0.5) * 0.5,
      (Math.random() - 0.5) * 0.5
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
    const spriteMaterial = new THREE.SpriteMaterial({ map: particleTexture, blending: THREE.AdditiveBlending, transparent: true });

    for (let i = 0; i < 20; i++) {
      this.spawnParticle();
    }

    const animate = () => {
        requestAnimationFrame(animate);
        this.particles.forEach(particle => {
            particle.update();
        });

        // Remove old sprites (connections) from the scene
        this.scene.children.forEach(child => {
            if (child instanceof THREE.Sprite) {
                this.scene.remove(child);
            }
        });

        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const distance = this.particles[i].position.distanceTo(this.particles[j].position);
                if (distance < 40) {
                    const midpoint = new THREE.Vector3();
                    midpoint.addVectors(this.particles[i].position, this.particles[j].position).multiplyScalar(0.5);

                    const sprite = new THREE.Sprite(spriteMaterial);
                    sprite.position.set(midpoint.x, midpoint.y, midpoint.z);
                    sprite.scale.set(distance, distance, 1); // scale it based on distance, so it fills the gap between particles
                    this.scene.add(sprite);
                }
            }
        }

        this.renderer.render(this.scene, this.camera);
        this.camera.position.x = 100 * Math.sin(Date.now() * 0.00005); // Making camera movement slower and more attractive
        this.camera.position.z = 100 * Math.cos(Date.now() * 0.00005);
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
