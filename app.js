// Hydrogen Digital TV - Interactive Visualization
class HydrogenVisualization {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) {
            console.error('Canvas element not found');
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;

        // Hydrogen shell configuration
        this.shells = [
            { radius: 60, electrons: 1 },
            { radius: 120, electrons: 0 },
            { radius: 180, electrons: 0 }
        ];

        // Oxygen particles
        this.oxygenParticles = [];
        this.initOxygenParticles();

        // Animation
        this.angle = 0;
        this.animate();
    }

    initOxygenParticles() {
        const count = 5;
        for (let i = 0; i < count; i++) {
            this.oxygenParticles.push({
                angle: (Math.PI * 2 / count) * i,
                distance: 220,
                speed: 0.02 + Math.random() * 0.01,
                size: 4 + Math.random() * 3,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    drawNucleus() {
        // Hydrogen nucleus (single proton)
        const gradient = this.ctx.createRadialGradient(
            this.centerX, this.centerY, 0,
            this.centerX, this.centerY, 25
        );
        gradient.addColorStop(0, '#4da8da');
        gradient.addColorStop(1, '#2d5a7b');

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, 25, 0, Math.PI * 2);
        this.ctx.fill();

        // Glow effect
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = '#4da8da';
        this.ctx.fillStyle = 'rgba(77, 168, 218, 0.3)';
        this.ctx.beginPath();
        this.ctx.arc(this.centerX, this.centerY, 30, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
    }

    drawShells() {
        this.shells.forEach((shell, index) => {
            // Draw shell orbit
            this.ctx.strokeStyle = `rgba(77, 168, 218, ${0.3 - index * 0.1})`;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.arc(this.centerX, this.centerY, shell.radius, 0, Math.PI * 2);
            this.ctx.stroke();

            // Draw electrons
            if (shell.electrons > 0) {
                const electronAngle = this.angle + (index * 0.5);
                const x = this.centerX + Math.cos(electronAngle) * shell.radius;
                const y = this.centerY + Math.sin(electronAngle) * shell.radius;

                this.ctx.fillStyle = '#64b5f6';
                this.ctx.beginPath();
                this.ctx.arc(x, y, 5, 0, Math.PI * 2);
                this.ctx.fill();

                // Electron glow
                this.ctx.shadowBlur = 10;
                this.ctx.shadowColor = '#64b5f6';
                this.ctx.fillStyle = 'rgba(100, 181, 246, 0.5)';
                this.ctx.beginPath();
                this.ctx.arc(x, y, 8, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.shadowBlur = 0;
            }
        });
    }

    drawOxygenParticles() {
        this.oxygenParticles.forEach(particle => {
            // Update particle position
            particle.angle += particle.speed;
            particle.distance = 220 + Math.sin(particle.phase + this.angle) * 30;

            const x = this.centerX + Math.cos(particle.angle) * particle.distance;
            const y = this.centerY + Math.sin(particle.angle) * particle.distance;

            // Draw particle
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, particle.size);
            gradient.addColorStop(0, '#ff6b6b');
            gradient.addColorStop(1, '#c92a2a');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Particle glow
            this.ctx.shadowBlur = 15;
            this.ctx.shadowColor = '#ff6b6b';
            this.ctx.fillStyle = 'rgba(255, 107, 107, 0.3)';
            this.ctx.beginPath();
            this.ctx.arc(x, y, particle.size + 3, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.shadowBlur = 0;

            // Update phase
            particle.phase += 0.03;
        });
    }

    clear() {
        this.ctx.fillStyle = 'rgba(10, 10, 20, 0.2)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    animate() {
        this.clear();
        this.drawNucleus();
        this.drawShells();
        this.drawOxygenParticles();

        this.angle += 0.02;

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize visualization when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const viz = new HydrogenVisualization('hydrogenCanvas');
});
