/**
 * NEXUS QUANTUM APEX - Battle Arena System
 * Real-time Multiplayer Battle Mode
 */

const BattleSystem = {
    currentRoom: null,
    isHost: false,
    opponent: null,
    yourScore: 0,
    opponentScore: 0,
    currentQuestion: 0,
    battleQuestions: [],
    battleTimer: null,
    
    // Simulated rooms for demo
    demoRooms: [
        { id: 'room1', name: 'Quantum Arena #1', players: 1, maxPlayers: 2, host: 'Player123' },
        { id: 'room2', name: 'Neural Battle', players: 1, maxPlayers: 2, host: 'Gamer456' }
    ],
    
    init() {
        this.bindEvents();
        this.renderRooms();
        console.log('⚔️ Battle system initialized');
    },
    
    bindEvents() {
        document.getElementById('createBattleBtn')?.addEventListener('click', () => {
            this.createRoom();
        });
        
        document.getElementById('joinBattleBtn')?.addEventListener('click', () => {
            this.showJoinModal();
        });
        
        document.getElementById('quickMatchBtn')?.addEventListener('click', () => {
            this.quickMatch();
        });
    },
    
    renderRooms() {
        const container = document.getElementById('battleRooms');
        if (!container) return;
        
        if (this.demoRooms.length === 0) {
            container.innerHTML = `
                <div class="room-placeholder">
                    <i class="fas fa-users"></i>
                    <p>No active rooms. Create one!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = this.demoRooms.map(room => `
            <div class="battle-room-card" data-room="${room.id}">
                <div class="room-info">
                    <div class="room-name">${room.name}</div>
                    <div class="room-host">Host: ${room.host}</div>
                </div>
                <div class="room-players">
                    <i class="fas fa-users"></i>
                    ${room.players}/${room.maxPlayers}
                </div>
                <button class="join-room-btn" onclick="BattleSystem.joinRoom('${room.id}')">
                    Join
                </button>
            </div>
        `).join('');
        
        // Add room card styles
        this.addRoomStyles();
    },
    
    addRoomStyles() {
        if (document.getElementById('battle-room-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'battle-room-styles';
        styles.textContent = `
            .battle-room-card {
                display: flex;
                align-items: center;
                gap: var(--spacing-md);
                padding: var(--spacing-md);
                background: var(--bg-glass);
                border: var(--border-glass);
                border-radius: var(--radius-md);
                margin-bottom: var(--spacing-sm);
                transition: all 0.2s ease;
            }
            
            .battle-room-card:hover {
                border-color: var(--quantum-purple);
            }
            
            .room-info {
                flex: 1;
            }
            
            .room-name {
                font-weight: 600;
                margin-bottom: 4px;
            }
            
            .room-host {
                font-size: 12px;
                color: var(--text-secondary);
            }
            
            .room-players {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 14px;
                color: var(--quantum-cyan);
            }
            
            .join-room-btn {
                padding: 8px 16px;
                background: var(--gradient-quantum);
                border: none;
                border-radius: var(--radius-full);
                color: var(--bg-primary);
                font-weight: 600;
                font-size: 13px;
                cursor: pointer;
                transition: transform 0.2s ease;
            }
            
            .join-room-btn:hover {
                transform: scale(1.05);
            }
        `;
        document.head.appendChild(styles);
    },
    
    createRoom() {
        // Check energy
        if (NexusApp.user.energy < 30) {
            showToast('Need 30 energy to create a room!', 'warning');
            return;
        }
        
        NexusApp.user.energy -= 30;
        updateUI();
        
        const roomId = 'room_' + Date.now();
        this.currentRoom = {
            id: roomId,
            name: `${NexusApp.user.name}'s Arena`,
            host: NexusApp.user.name,
            players: 1,
            maxPlayers: 2
        };
        
        this.isHost = true;
        
        showToast('Room created! Waiting for opponent...', 'success');
        hapticFeedback('medium');
        
        // Simulate opponent joining after delay
        setTimeout(() => {
            this.simulateOpponentJoin();
        }, 2000);
    },
    
    joinRoom(roomId) {
        // Check energy
        if (NexusApp.user.energy < 30) {
            showToast('Need 30 energy to join!', 'warning');
            return;
        }
        
        NexusApp.user.energy -= 30;
        updateUI();
        
        const room = this.demoRooms.find(r => r.id === roomId);
        if (!room) {
            showToast('Room not found!', 'error');
            return;
        }
        
        this.currentRoom = room;
        this.isHost = false;
        this.opponent = { name: room.host };
        
        showToast('Joining room...', 'info');
        hapticFeedback('medium');
        
        // Start battle after short delay
        setTimeout(() => {
            this.startBattle();
        }, 1500);
    },
    
    quickMatch() {
        // Check energy
        if (NexusApp.user.energy < 30) {
            showToast('Need 30 energy for quick match!', 'warning');
            return;
        }
        
        NexusApp.user.energy -= 30;
        updateUI();
        
        showToast('Finding opponent...', 'info');
        hapticFeedback('medium');
        
        // Simulate matchmaking
        setTimeout(() => {
            this.opponent = { name: 'QuantumBot_' + Math.floor(Math.random() * 1000) };
            this.startBattle();
        }, 2000);
    },
    
    showJoinModal() {
        const content = `
            <div style="margin-bottom: var(--spacing-lg);">
                <label style="display: block; margin-bottom: var(--spacing-sm); font-size: 14px; color: var(--text-secondary);">
                    Room Code
                </label>
                <input type="text" id="roomCodeInput" placeholder="Enter room code" style="
                    width: 100%;
                    padding: var(--spacing-md);
                    background: var(--bg-glass);
                    border: var(--border-glass);
                    border-radius: var(--radius-md);
                    color: var(--text-primary);
                    font-size: 16px;
                    outline: none;
                ">
            </div>
            <button class="btn-primary" onclick="BattleSystem.joinByCode()" style="width: 100%;">
                Join Room
            </button>
        `;
        
        showModal('Join Battle Room', content);
    },
    
    joinByCode() {
        const code = document.getElementById('roomCodeInput')?.value;
        if (!code) {
            showToast('Please enter a room code', 'warning');
            return;
        }
        
        closeModal();
        showToast('Room not found. Try Quick Match!', 'info');
    },
    
    simulateOpponentJoin() {
        this.opponent = { name: 'Challenger_' + Math.floor(Math.random() * 1000) };
        showToast(`${this.opponent.name} joined!`, 'success');
        
        setTimeout(() => {
            this.startBattle();
        }, 1000);
    },
    
    startBattle() {
        if (!this.opponent) {
            showToast('No opponent found!', 'error');
            return;
        }
        
        // Hide rooms, show arena
        document.querySelector('.battle-options')?.classList.add('hidden');
        document.getElementById('battleRooms')?.classList.add('hidden');
        document.getElementById('battleArena')?.classList.remove('hidden');
        
        // Set opponent name
        document.getElementById('opponentName').textContent = this.opponent.name;
        
        // Reset scores
        this.yourScore = 0;
        this.opponentScore = 0;
        this.currentQuestion = 0;
        
        // Get random questions
        const allQuestions = Object.values(QuizSystem.questions).flat();
        this.battleQuestions = this.shuffleArray(allQuestions).slice(0, 5);
        
        // Update UI
        this.updateBattleUI();
        
        // Load first question
        this.loadBattleQuestion();
        
        hapticFeedback('heavy');
        showToast('Battle started!', 'success');
    },
    
    loadBattleQuestion() {
        if (this.currentQuestion >= this.battleQuestions.length) {
            this.endBattle();
            return;
        }
        
        const question = this.battleQuestions[this.currentQuestion];
        
        const questionContainer = document.getElementById('battleQuestion');
        questionContainer.innerHTML = `
            <div class="battle-question-header">
                <span>Question ${this.currentQuestion + 1}/${this.battleQuestions.length}</span>
                <span class="battle-timer" id="battleTimerDisplay">15</span>
            </div>
            <div class="battle-question-text">${question.q}</div>
            <div class="battle-options">
                ${question.options.map((opt, idx) => `
                    <div class="battle-option" data-index="${idx}" onclick="BattleSystem.answerBattle(${idx})">
                        ${opt}
                    </div>
                `).join('')}
            </div>
        `;
        
        // Add battle question styles
        this.addBattleQuestionStyles();
        
        // Start timer
        this.startBattleTimer();
        
        // Simulate opponent answering
        this.simulateOpponentAnswer(question.answer);
    },
    
    addBattleQuestionStyles() {
        if (document.getElementById('battle-question-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'battle-question-styles';
        styles.textContent = `
            .battle-question-header {
                display: flex;
                justify-content: space-between;
                margin-bottom: var(--spacing-md);
                font-size: 14px;
                color: var(--text-secondary);
            }
            
            .battle-timer {
                color: var(--quantum-yellow);
                font-weight: 700;
            }
            
            .battle-question-text {
                font-size: 18px;
                font-weight: 600;
                text-align: center;
                margin-bottom: var(--spacing-xl);
            }
            
            .battle-options {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-sm);
            }
            
            .battle-option {
                padding: var(--spacing-md);
                background: var(--bg-glass);
                border: var(--border-glass);
                border-radius: var(--radius-md);
                cursor: pointer;
                transition: all 0.2s ease;
            }
            
            .battle-option:hover {
                border-color: var(--quantum-cyan);
                background: rgba(0, 255, 255, 0.1);
            }
            
            .battle-option.correct {
                border-color: var(--quantum-green);
                background: rgba(16, 185, 129, 0.2);
            }
            
            .battle-option.incorrect {
                border-color: var(--quantum-red);
                background: rgba(239, 68, 68, 0.2);
            }
            
            .battle-option.disabled {
                pointer-events: none;
                opacity: 0.7;
            }
        `;
        document.head.appendChild(styles);
    },
    
    startBattleTimer() {
        let timeLeft = 15;
        const timerDisplay = document.getElementById('battleTimerDisplay');
        
        clearInterval(this.battleTimer);
        this.battleTimer = setInterval(() => {
            timeLeft--;
            if (timerDisplay) timerDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(this.battleTimer);
                this.answerBattle(-1); // Time's up
            }
        }, 1000);
    },
    
    answerBattle(selectedIndex) {
        clearInterval(this.battleTimer);
        
        const question = this.battleQuestions[this.currentQuestion];
        const options = document.querySelectorAll('.battle-option');
        const isCorrect = selectedIndex === question.answer;
        
        // Disable all options
        options.forEach((opt, idx) => {
            opt.classList.add('disabled');
            if (idx === question.answer) {
                opt.classList.add('correct');
            } else if (idx === selectedIndex) {
                opt.classList.add('incorrect');
            }
        });
        
        if (isCorrect) {
            this.yourScore += 100;
            hapticFeedback('medium');
        } else {
            hapticFeedback('light');
        }
        
        this.updateBattleUI();
        
        // Next question
        setTimeout(() => {
            this.currentQuestion++;
            this.loadBattleQuestion();
        }, 1500);
    },
    
    simulateOpponentAnswer(correctAnswer) {
        // Random delay for opponent
        const delay = 2000 + Math.random() * 8000;
        
        setTimeout(() => {
            // 60% chance opponent is correct
            if (Math.random() < 0.6) {
                this.opponentScore += 100;
                this.updateBattleUI();
            }
        }, delay);
    },
    
    updateBattleUI() {
        document.getElementById('yourScore').textContent = this.yourScore;
        document.getElementById('opponentScore').textContent = this.opponentScore;
    },
    
    endBattle() {
        clearInterval(this.battleTimer);
        
        const won = this.yourScore > this.opponentScore;
        const tied = this.yourScore === this.opponentScore;
        
        let xpEarned = this.yourScore;
        let goldEarned = Math.floor(this.yourScore * 0.2);
        
        if (won) {
            xpEarned *= 1.5;
            goldEarned *= 2;
            unlockAchievement('battle_win');
        }
        
        xpEarned = Math.floor(xpEarned);
        goldEarned = Math.floor(goldEarned);
        
        NexusApp.user.xp += xpEarned;
        NexusApp.user.gold += goldEarned;
        
        // Show result
        const resultText = won ? '🏆 Victory!' : (tied ? '🤝 Draw!' : '😔 Defeat');
        const resultColor = won ? 'var(--quantum-green)' : (tied ? 'var(--quantum-yellow)' : 'var(--quantum-red)');
        
        document.getElementById('battleQuestion').innerHTML = `
            <div style="text-align: center; padding: var(--spacing-xl);">
                <div style="font-size: 48px; margin-bottom: var(--spacing-lg);">${won ? '🏆' : (tied ? '🤝' : '😔')}</div>
                <h3 style="font-size: 28px; color: ${resultColor}; margin-bottom: var(--spacing-lg);">${resultText}</h3>
                <div style="margin-bottom: var(--spacing-xl);">
                    <p>Your Score: <strong>${this.yourScore}</strong></p>
                    <p>Opponent: <strong>${this.opponentScore}</strong></p>
                    <p style="color: var(--quantum-cyan); margin-top: var(--spacing-md);">+${xpEarned} XP | +${goldEarned} Gold</p>
                </div>
                <button class="btn-primary" onclick="BattleSystem.exitBattle()">
                    Back to Lobby
                </button>
            </div>
        `;
        
        updateUI();
        checkLevelUp();
        saveUserData();
        
        hapticFeedback(won ? 'heavy' : 'light');
    },
    
    exitBattle() {
        // Reset and show lobby
        document.querySelector('.battle-options')?.classList.remove('hidden');
        document.getElementById('battleRooms')?.classList.remove('hidden');
        document.getElementById('battleArena')?.classList.add('hidden');
        
        this.currentRoom = null;
        this.opponent = null;
        this.yourScore = 0;
        this.opponentScore = 0;
        
        this.renderRooms();
    },
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    BattleSystem.init();
});

// Export
window.BattleSystem = BattleSystem;
