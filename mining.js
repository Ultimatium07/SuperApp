/**
 * NEXUS QUANTUM APEX - Mining System
 * Advanced Tap Mining with Quantum Effects
 */

const MiningSystem = {
    tapCount: 0,
    comboCount: 0,
    comboTimer: null,
    lastTapTime: 0,
    
    init() {
        this.bindEvents();
        console.log('⛏️ Mining system initialized');
    },
    
    bindEvents() {
        const reactor = document.getElementById('quantumReactor');
        
        if (reactor) {
            // Touch events for mobile
            reactor.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleTap(e.touches[0]);
            }, { passive: false });
            
            // Click events for desktop
            reactor.addEventListener('click', (e) => {
                this.handleTap(e);
            });
            
            // Multi-touch support
            reactor.addEventListener('touchmove', (e) => {
                e.preventDefault();
            }, { passive: false });
        }
    },
    
    handleTap(event) {
        const now = Date.now();
        
        // Check energy
        if (NexusApp.user.energy <= 0) {
            showToast('No energy left! Wait to recharge.', 'warning');
            hapticFeedback('light');
            return;
        }
        
        // Consume energy
        NexusApp.user.energy -= 1;
        
        // Calculate base reward
        let reward = NexusApp.user.tapPower;
        let isCritical = false;
        
        // Critical hit check
        if (Math.random() < NexusApp.user.criticalChance) {
            reward *= NexusApp.user.criticalMultiplier;
            isCritical = true;
        }
        
        // Combo system
        if (now - this.lastTapTime < 500) {
            this.comboCount++;
            reward *= (1 + this.comboCount * 0.1);
            
            clearTimeout(this.comboTimer);
            this.comboTimer = setTimeout(() => {
                this.comboCount = 0;
            }, 1000);
        } else {
            this.comboCount = 0;
        }
        
        this.lastTapTime = now;
        
        // Round reward
        reward = Math.floor(reward);
        
        // Add XP
        NexusApp.user.xp += reward;
        
        // Small gold chance
        if (Math.random() < 0.1) {
            const goldEarned = Math.floor(reward * 0.1);
            NexusApp.user.gold += goldEarned;
        }
        
        // Update daily challenge
        updateDailyChallenge('tap', 1);
        updateDailyChallenge('xp', reward);
        
        // Visual effects
        this.createTapEffect(event, reward, isCritical);
        this.createParticles(event, isCritical);
        
        // Haptic feedback
        hapticFeedback(isCritical ? 'heavy' : 'light');
        
        // Update UI
        updateUI();
        
        // Check level up
        checkLevelUp();
        
        // Track tap count
        this.tapCount++;
        
        // First tap achievement
        if (this.tapCount === 1) {
            unlockAchievement('first_tap');
        }
        
        // Save periodically
        if (this.tapCount % 10 === 0) {
            saveUserData();
        }
    },
    
    createTapEffect(event, reward, isCritical) {
        const tapEffect = document.getElementById('tapEffect');
        if (!tapEffect) return;
        
        // Create ring effect
        const ring = document.createElement('div');
        ring.className = 'tap-ring';
        if (isCritical) {
            ring.style.borderColor = '#ff00ff';
        }
        tapEffect.appendChild(ring);
        
        setTimeout(() => ring.remove(), 500);
        
        // Create floating number
        const floatNum = document.createElement('div');
        floatNum.className = 'floating-number';
        floatNum.textContent = '+' + formatNumber(reward);
        floatNum.style.cssText = `
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-family: var(--font-display);
            font-size: ${isCritical ? '28px' : '20px'};
            font-weight: 700;
            color: ${isCritical ? '#ff00ff' : '#00ffff'};
            text-shadow: 0 0 10px currentColor;
            pointer-events: none;
            animation: float-up 1s ease-out forwards;
            z-index: 100;
        `;
        
        tapEffect.appendChild(floatNum);
        setTimeout(() => floatNum.remove(), 1000);
        
        // Combo indicator
        if (this.comboCount > 1) {
            const comboText = document.createElement('div');
            comboText.className = 'combo-text';
            comboText.textContent = `${this.comboCount}x COMBO!`;
            comboText.style.cssText = `
                position: absolute;
                left: 50%;
                top: 30%;
                transform: translateX(-50%);
                font-family: var(--font-display);
                font-size: 14px;
                font-weight: 700;
                color: #ffd700;
                text-shadow: 0 0 10px currentColor;
                pointer-events: none;
                animation: pulse 0.3s ease;
                z-index: 100;
            `;
            
            tapEffect.appendChild(comboText);
            setTimeout(() => comboText.remove(), 500);
        }
        
        // Critical text
        if (isCritical) {
            const critText = document.createElement('div');
            critText.textContent = 'CRITICAL!';
            critText.style.cssText = `
                position: absolute;
                left: 50%;
                top: 20%;
                transform: translateX(-50%);
                font-family: var(--font-display);
                font-size: 16px;
                font-weight: 700;
                color: #ff00ff;
                text-shadow: 0 0 15px currentColor;
                pointer-events: none;
                animation: shake 0.3s ease;
                z-index: 100;
            `;
            
            tapEffect.appendChild(critText);
            setTimeout(() => critText.remove(), 500);
        }
    },
    
    createParticles(event, isCritical) {
        const tapEffect = document.getElementById('tapEffect');
        if (!tapEffect) return;
        
        const particleCount = isCritical ? 15 : 8;
        const colors = isCritical 
            ? ['#ff00ff', '#ff88ff', '#ffaaff'] 
            : ['#00ffff', '#88ffff', '#aaffff'];
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'tap-particle';
            
            const angle = (Math.PI * 2 / particleCount) * i;
            const distance = 80 + Math.random() * 40;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            particle.style.cssText = `
                --tx: ${tx}px;
                --ty: ${ty}px;
                left: 50%;
                top: 50%;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                box-shadow: 0 0 6px currentColor;
            `;
            
            tapEffect.appendChild(particle);
            setTimeout(() => particle.remove(), 500);
        }
    }
};

// Add CSS animations dynamically
const miningStyles = document.createElement('style');
miningStyles.textContent = `
    @keyframes float-up {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -150%) scale(1.5);
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(-50%) rotate(0); }
        25% { transform: translateX(-50%) rotate(-5deg); }
        75% { transform: translateX(-50%) rotate(5deg); }
    }
    
    .floating-number {
        will-change: transform, opacity;
    }
`;
document.head.appendChild(miningStyles);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    MiningSystem.init();
});

// Export
window.MiningSystem = MiningSystem;
