/**
 * NEXUS QUANTUM APEX - Core Application
 * Competition-Winning Super App
 */

// ============================================
// GLOBAL STATE
// ============================================

const NexusApp = {
    version: '1.0.0',
    debug: false,
    
    // User State
    user: {
        id: null,
        name: 'Quantum User',
        telegramId: null,
        level: 1,
        xp: 0,
        gold: 0,
        energy: 1000,
        maxEnergy: 1000,
        tapPower: 1,
        autoMining: 0,
        criticalChance: 0.1,
        criticalMultiplier: 2,
        achievements: [],
        dailyChallenges: [],
        settings: {
            sound: true,
            vibration: true,
            notifications: true
        }
    },
    
    // Upgrades
    upgrades: {
        tapPower: { level: 1, baseCost: 100, multiplier: 1.5, icon: '⚡', name: 'Tap Power' },
        autoMining: { level: 0, baseCost: 500, multiplier: 2, icon: '🤖', name: 'Auto Mining' },
        criticalChance: { level: 0, baseCost: 1000, multiplier: 2.5, icon: '💥', name: 'Critical Chance' },
        energyCapacity: { level: 0, baseCost: 300, multiplier: 1.8, icon: '🔋', name: 'Energy Capacity' }
    },
    
    // Achievements
    allAchievements: [
        { id: 'first_tap', name: 'First Tap', icon: '👆', description: 'Make your first tap', condition: (u) => u.xp > 0 },
        { id: 'level_5', name: 'Rising Star', icon: '⭐', description: 'Reach level 5', condition: (u) => u.level >= 5 },
        { id: 'level_10', name: 'Quantum Master', icon: '🌟', description: 'Reach level 10', condition: (u) => u.level >= 10 },
        { id: 'gold_1000', name: 'Gold Collector', icon: '💰', description: 'Collect 1000 gold', condition: (u) => u.gold >= 1000 },
        { id: 'quiz_perfect', name: 'Quiz Master', icon: '🧠', description: 'Get 100% on a quiz', condition: () => false },
        { id: 'battle_win', name: 'Warrior', icon: '⚔️', description: 'Win a battle', condition: () => false },
        { id: 'file_upload', name: 'Analyst', icon: '📊', description: 'Upload and analyze a file', condition: () => false },
        { id: 'daily_complete', name: 'Daily Hero', icon: '📅', description: 'Complete all daily challenges', condition: () => false }
    ],
    
    // Daily Challenges
    dailyChallengeTemplates: [
        { id: 'tap_100', name: 'Tap 100 times', icon: '👆', target: 100, reward: 50, type: 'tap' },
        { id: 'earn_500', name: 'Earn 500 XP', icon: '⚡', target: 500, reward: 100, type: 'xp' },
        { id: 'quiz_3', name: 'Complete 3 quizzes', icon: '🧠', target: 3, reward: 150, type: 'quiz' },
        { id: 'gold_200', name: 'Collect 200 gold', icon: '💰', target: 200, reward: 75, type: 'gold' }
    ],
    
    // Current section
    currentSection: 'mining',
    
    // Intervals
    intervals: {
        autoMining: null,
        energyRegen: null,
        save: null
    }
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

async function initApp() {
    console.log('🚀 Initializing Nexus Quantum Apex...');
    
    // Show loader stages
    await simulateLoading();
    
    // Load saved data
    loadUserData();
    
    // Initialize Telegram WebApp
    initTelegramWebApp();
    
    // Initialize UI
    initUI();
    
    // Initialize background effects
    initBackgroundEffects();
    
    // Initialize intervals
    initIntervals();
    
    // Initialize navigation
    initNavigation();
    
    // Generate daily challenges
    generateDailyChallenges();
    
    // Update UI
    updateUI();
    
    // Hide loader
    hideLoader();
    
    console.log('✅ App initialized successfully!');
}

async function simulateLoading() {
    const stages = document.querySelectorAll('.loader-stages .stage');
    
    for (let i = 0; i < stages.length; i++) {
        await sleep(400);
        stages.forEach((s, idx) => {
            s.classList.toggle('active', idx <= i);
        });
    }
    
    await sleep(300);
}

function hideLoader() {
    const loader = document.getElementById('loader');
    const app = document.getElementById('app');
    
    loader.classList.add('hidden');
    app.classList.remove('hidden');
}

// ============================================
// TELEGRAM WEBAPP INTEGRATION
// ============================================

function initTelegramWebApp() {
    if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        
        // Ready
        tg.ready();
        tg.expand();
        
        // Set theme
        document.documentElement.style.setProperty('--tg-theme-bg-color', tg.themeParams.bg_color || '#000000');
        
        // Get user data
        if (tg.initDataUnsafe?.user) {
            const user = tg.initDataUnsafe.user;
            NexusApp.user.telegramId = user.id;
            NexusApp.user.name = user.first_name + (user.last_name ? ' ' + user.last_name : '');
            
            // Update avatar
            const avatarLetter = user.first_name.charAt(0).toUpperCase();
            document.querySelectorAll('.avatar-letter, #profileAvatar').forEach(el => {
                el.textContent = avatarLetter;
            });
        }
        
        // Set up main button
        tg.MainButton.setParams({
            text: 'SHARE PROGRESS',
            color: '#00ffff',
            text_color: '#000000'
        });
        
        // Main button click
        tg.MainButton.onClick(() => {
            shareProgress();
        });
        
        // Back button
        tg.BackButton.onClick(() => {
            if (NexusApp.currentSection !== 'mining') {
                switchSection('mining');
            }
        });
        
        console.log('📱 Telegram WebApp initialized');
    } else {
        console.log('💻 Running in standalone mode');
    }
}

// ============================================
// UI INITIALIZATION
// ============================================

function initUI() {
    // Update user name
    document.getElementById('userName').textContent = NexusApp.user.name;
    document.getElementById('profileName').textContent = NexusApp.user.name;
    
    // Render upgrades
    renderUpgrades();
    
    // Render achievements
    renderAchievements();
    
    // Render daily challenges
    renderDailyChallenges();
}

function updateUI() {
    // Update stats
    document.getElementById('userXP').textContent = formatNumber(NexusApp.user.xp);
    document.getElementById('userGold').textContent = formatNumber(NexusApp.user.gold);
    document.getElementById('userEnergy').textContent = NexusApp.user.energy;
    
    // Update mining stats
    document.getElementById('tapPower').textContent = NexusApp.user.tapPower;
    document.getElementById('perSecond').textContent = NexusApp.user.autoMining * 10;
    document.getElementById('critChance').textContent = Math.round(NexusApp.user.criticalChance * 100) + '%';
    
    // Update energy bar
    const energyPercent = (NexusApp.user.energy / NexusApp.user.maxEnergy) * 100;
    document.getElementById('energyFill').style.width = energyPercent + '%';
    document.getElementById('currentEnergy').textContent = NexusApp.user.energy;
    document.getElementById('maxEnergy').textContent = NexusApp.user.maxEnergy;
    
    // Update profile
    document.getElementById('profileLevel').textContent = NexusApp.user.level;
    document.getElementById('totalXP').textContent = formatNumber(NexusApp.user.xp);
    document.getElementById('totalGold').textContent = formatNumber(NexusApp.user.gold);
    
    // Update avatar level
    document.querySelectorAll('.avatar-level').forEach(el => {
        el.textContent = NexusApp.user.level;
    });
    
    // Check achievements
    checkAchievements();
    
    // Update upgrades affordability
    updateUpgradesAffordability();
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const section = item.dataset.section;
            switchSection(section);
        });
    });
}

function switchSection(sectionId) {
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.section === sectionId);
    });
    
    // Update sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.toggle('active', section.id === sectionId + 'Section');
    });
    
    NexusApp.currentSection = sectionId;
    
    // Update Telegram back button
    if (window.Telegram?.WebApp) {
        if (sectionId === 'mining') {
            window.Telegram.WebApp.BackButton.hide();
        } else {
            window.Telegram.WebApp.BackButton.show();
        }
    }
    
    // Haptic feedback
    hapticFeedback('light');
}

// ============================================
// UPGRADES
// ============================================

function renderUpgrades() {
    const grid = document.getElementById('upgradesGrid');
    grid.innerHTML = '';
    
    Object.entries(NexusApp.upgrades).forEach(([key, upgrade]) => {
        const cost = getUpgradeCost(key);
        const canAfford = NexusApp.user.gold >= cost;
        
        const card = document.createElement('div');
        card.className = `upgrade-card ${canAfford ? '' : 'disabled'}`;
        card.dataset.upgrade = key;
        card.innerHTML = `
            <div class="upgrade-icon">${upgrade.icon}</div>
            <div class="upgrade-name">${upgrade.name}</div>
            <div class="upgrade-level">Level ${upgrade.level}</div>
            <div class="upgrade-cost">
                <i class="fas fa-coins"></i>
                ${formatNumber(cost)}
            </div>
        `;
        
        card.addEventListener('click', () => purchaseUpgrade(key));
        grid.appendChild(card);
    });
}

function getUpgradeCost(upgradeKey) {
    const upgrade = NexusApp.upgrades[upgradeKey];
    return Math.floor(upgrade.baseCost * Math.pow(upgrade.multiplier, upgrade.level));
}

function purchaseUpgrade(upgradeKey) {
    const cost = getUpgradeCost(upgradeKey);
    
    if (NexusApp.user.gold < cost) {
        showToast('Not enough gold!', 'warning');
        return;
    }
    
    NexusApp.user.gold -= cost;
    NexusApp.upgrades[upgradeKey].level++;
    
    // Apply upgrade effects
    switch (upgradeKey) {
        case 'tapPower':
            NexusApp.user.tapPower = NexusApp.upgrades.tapPower.level;
            break;
        case 'autoMining':
            NexusApp.user.autoMining = NexusApp.upgrades.autoMining.level;
            break;
        case 'criticalChance':
            NexusApp.user.criticalChance = 0.1 + (NexusApp.upgrades.criticalChance.level * 0.05);
            break;
        case 'energyCapacity':
            NexusApp.user.maxEnergy = 1000 + (NexusApp.upgrades.energyCapacity.level * 200);
            break;
    }
    
    // Update UI
    renderUpgrades();
    updateUI();
    saveUserData();
    
    showToast(`${NexusApp.upgrades[upgradeKey].name} upgraded!`, 'success');
    hapticFeedback('medium');
}

function updateUpgradesAffordability() {
    document.querySelectorAll('.upgrade-card').forEach(card => {
        const key = card.dataset.upgrade;
        const cost = getUpgradeCost(key);
        card.classList.toggle('disabled', NexusApp.user.gold < cost);
    });
}

// ============================================
// ACHIEVEMENTS
// ============================================

function renderAchievements() {
    const grid = document.getElementById('achievementsGrid');
    grid.innerHTML = '';
    
    NexusApp.allAchievements.forEach(achievement => {
        const unlocked = NexusApp.user.achievements.includes(achievement.id);
        
        const el = document.createElement('div');
        el.className = `achievement ${unlocked ? 'unlocked' : ''}`;
        el.title = achievement.description;
        el.textContent = achievement.icon;
        
        grid.appendChild(el);
    });
    
    // Update count
    document.getElementById('achievements').textContent = NexusApp.user.achievements.length;
}

function checkAchievements() {
    NexusApp.allAchievements.forEach(achievement => {
        if (!NexusApp.user.achievements.includes(achievement.id) && achievement.condition(NexusApp.user)) {
            unlockAchievement(achievement.id);
        }
    });
}

function unlockAchievement(achievementId) {
    if (NexusApp.user.achievements.includes(achievementId)) return;
    
    const achievement = NexusApp.allAchievements.find(a => a.id === achievementId);
    if (!achievement) return;
    
    NexusApp.user.achievements.push(achievementId);
    NexusApp.user.xp += 100;
    
    renderAchievements();
    showToast(`Achievement unlocked: ${achievement.name}!`, 'success');
    hapticFeedback('heavy');
    saveUserData();
}

// ============================================
// DAILY CHALLENGES
// ============================================

function generateDailyChallenges() {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('nexus_daily_date');
    
    if (saved !== today || NexusApp.user.dailyChallenges.length === 0) {
        // Generate new challenges
        NexusApp.user.dailyChallenges = NexusApp.dailyChallengeTemplates.map(template => ({
            ...template,
            progress: 0,
            completed: false
        }));
        
        localStorage.setItem('nexus_daily_date', today);
        saveUserData();
    }
}

function renderDailyChallenges() {
    const container = document.getElementById('dailyChallenges');
    container.innerHTML = '';
    
    NexusApp.user.dailyChallenges.forEach(challenge => {
        const progress = Math.min(challenge.progress / challenge.target * 100, 100);
        
        const el = document.createElement('div');
        el.className = `daily-challenge ${challenge.completed ? 'completed' : ''}`;
        el.innerHTML = `
            <div class="challenge-icon">${challenge.icon}</div>
            <div class="challenge-info">
                <div class="challenge-name">${challenge.name}</div>
                <div class="challenge-progress">
                    <div class="challenge-progress-fill" style="width: ${progress}%"></div>
                </div>
            </div>
            <div class="challenge-reward">
                <i class="fas fa-coins"></i>
                ${challenge.reward}
            </div>
        `;
        
        container.appendChild(el);
    });
}

function updateDailyChallenge(type, amount) {
    NexusApp.user.dailyChallenges.forEach(challenge => {
        if (challenge.type === type && !challenge.completed) {
            challenge.progress += amount;
            
            if (challenge.progress >= challenge.target) {
                challenge.completed = true;
                NexusApp.user.gold += challenge.reward;
                showToast(`Challenge completed! +${challenge.reward} gold`, 'success');
            }
        }
    });
    
    renderDailyChallenges();
    saveUserData();
}

// ============================================
// BACKGROUND EFFECTS
// ============================================

function initBackgroundEffects() {
    initQuantumBackground();
    initParticles();
}

function initQuantumBackground() {
    const canvas = document.getElementById('quantumBg');
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    // Grid lines
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Background gradient
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, 0,
            canvas.width / 2, canvas.height / 2, canvas.width
        );
        gradient.addColorStop(0, 'rgba(10, 10, 20, 1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Quantum grid
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.03)';
        ctx.lineWidth = 1;
        
        const gridSize = 50;
        const time = Date.now() * 0.0001;
        
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        requestAnimationFrame(draw);
    }
    
    draw();
}

function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            color: ['#00ffff', '#ff00ff', '#8b5cf6'][Math.floor(Math.random() * 3)]
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            // Update
            p.x += p.vx;
            p.y += p.vy;
            
            // Wrap around
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            // Draw
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
            
            // Glow
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
        });
        
        // Connect nearby particles
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 255, 255, ${0.1 * (1 - dist / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// ============================================
// INTERVALS
// ============================================

function initIntervals() {
    // Auto mining
    NexusApp.intervals.autoMining = setInterval(() => {
        if (NexusApp.user.autoMining > 0) {
            const earned = NexusApp.user.autoMining * 10;
            NexusApp.user.xp += earned;
            updateUI();
            checkLevelUp();
        }
    }, 1000);
    
    // Energy regeneration
    NexusApp.intervals.energyRegen = setInterval(() => {
        if (NexusApp.user.energy < NexusApp.user.maxEnergy) {
            NexusApp.user.energy = Math.min(NexusApp.user.energy + 1, NexusApp.user.maxEnergy);
            updateUI();
        }
    }, 1000);
    
    // Auto save
    NexusApp.intervals.save = setInterval(() => {
        saveUserData();
    }, 30000);
}

// ============================================
// LEVEL SYSTEM
// ============================================

function getXPForLevel(level) {
    return Math.floor(100 * Math.pow(1.5, level - 1));
}

function checkLevelUp() {
    const requiredXP = getXPForLevel(NexusApp.user.level + 1);
    
    if (NexusApp.user.xp >= requiredXP) {
        NexusApp.user.level++;
        NexusApp.user.gold += NexusApp.user.level * 50;
        
        showToast(`Level Up! You are now level ${NexusApp.user.level}`, 'success');
        hapticFeedback('heavy');
        
        updateUI();
        saveUserData();
    }
}

// ============================================
// DATA PERSISTENCE
// ============================================

function saveUserData() {
    const data = {
        user: NexusApp.user,
        upgrades: NexusApp.upgrades,
        version: NexusApp.version
    };
    
    localStorage.setItem('nexus_save_data', JSON.stringify(data));
    
    // Sync with bot if connected
    if (window.Telegram?.WebApp) {
        syncWithBot(data);
    }
}

function loadUserData() {
    const saved = localStorage.getItem('nexus_save_data');
    
    if (saved) {
        try {
            const data = JSON.parse(saved);
            
            // Merge saved data with defaults
            NexusApp.user = { ...NexusApp.user, ...data.user };
            NexusApp.upgrades = { ...NexusApp.upgrades, ...data.upgrades };
            
            console.log('📥 User data loaded');
        } catch (e) {
            console.error('Failed to load saved data:', e);
        }
    }
}

// ============================================
// BOT SYNC
// ============================================

function syncWithBot(data) {
    if (!window.Telegram?.WebApp) return;
    
    window.Telegram.WebApp.sendData(JSON.stringify({
        action: 'sync',
        data: data
    }));
}

function shareProgress() {
    if (!window.Telegram?.WebApp) {
        showToast('Share is only available in Telegram', 'info');
        return;
    }
    
    const text = `🚀 I'm playing NEXUS QUANTUM APEX!\n\n` +
        `⚡ Level: ${NexusApp.user.level}\n` +
        `💰 Gold: ${formatNumber(NexusApp.user.gold)}\n` +
        `🏆 Achievements: ${NexusApp.user.achievements.length}\n\n` +
        `Join me and become a Quantum Master!`;
    
    window.Telegram.WebApp.switchInlineQuery(text, ['users', 'groups', 'channels']);
}

// ============================================
// UTILITIES
// ============================================

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function hapticFeedback(type = 'light') {
    if (!NexusApp.user.settings.vibration) return;
    
    if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred(type);
    } else if (navigator.vibrate) {
        const patterns = {
            light: [10],
            medium: [20],
            heavy: [30, 10, 30]
        };
        navigator.vibrate(patterns[type] || [10]);
    }
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'toast-out 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function showModal(title, content) {
    const container = document.getElementById('modalContainer');
    
    container.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                ${content}
            </div>
        </div>
    `;
    
    container.classList.add('active');
}

function closeModal() {
    document.getElementById('modalContainer').classList.remove('active');
}

// Recharge button
document.getElementById('rechargeBtn')?.addEventListener('click', () => {
    NexusApp.user.energy = NexusApp.user.maxEnergy;
    updateUI();
    showToast('Energy recharged!', 'success');
    hapticFeedback('medium');
});

// Export for other modules
window.NexusApp = NexusApp;
window.updateUI = updateUI;
window.saveUserData = saveUserData;
window.showToast = showToast;
window.hapticFeedback = hapticFeedback;
window.formatNumber = formatNumber;
window.updateDailyChallenge = updateDailyChallenge;
window.unlockAchievement = unlockAchievement;
window.checkLevelUp = checkLevelUp;
