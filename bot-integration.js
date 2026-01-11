/**
 * NEXUS QUANTUM APEX - Telegram Bot Integration
 * Real-time Sync Between WebApp and Bot
 */

const BotIntegration = {
    isConnected: false,
    tg: null,
    syncInterval: null,
    lastSyncTime: null,
    
    init() {
        this.initTelegram();
        this.setupEventListeners();
        this.startAutoSync();
        console.log('🤖 Bot integration initialized');
    },
    
    initTelegram() {
        if (window.Telegram?.WebApp) {
            this.tg = window.Telegram.WebApp;
            this.isConnected = true;
            
            // Configure WebApp
            this.tg.ready();
            this.tg.expand();
            this.tg.enableClosingConfirmation();
            
            // Set header color
            this.tg.setHeaderColor('#000000');
            this.tg.setBackgroundColor('#000000');
            
            // Get user data
            this.loadUserFromTelegram();
            
            // Setup buttons
            this.setupMainButton();
            this.setupBackButton();
            
            // Handle theme
            this.handleThemeChange();
            
            console.log('📱 Telegram WebApp connected');
        } else {
            console.log('💻 Running in standalone mode');
            this.isConnected = false;
        }
    },
    
    loadUserFromTelegram() {
        if (!this.tg?.initDataUnsafe?.user) return;
        
        const user = this.tg.initDataUnsafe.user;
        
        NexusApp.user.telegramId = user.id;
        NexusApp.user.name = user.first_name + (user.last_name ? ' ' + user.last_name : '');
        
        // Update UI with user data
        const avatarLetter = user.first_name.charAt(0).toUpperCase();
        document.querySelectorAll('.avatar-letter, #profileAvatar').forEach(el => {
            el.textContent = avatarLetter;
        });
        
        document.getElementById('userName').textContent = NexusApp.user.name;
        document.getElementById('profileName').textContent = NexusApp.user.name;
        
        // Load cloud data if available
        this.loadCloudData();
    },
    
    setupMainButton() {
        if (!this.tg) return;
        
        this.tg.MainButton.setParams({
            text: '📤 SHARE PROGRESS',
            color: '#00ffff',
            text_color: '#000000',
            is_active: true,
            is_visible: false
        });
        
        this.tg.MainButton.onClick(() => {
            this.shareProgress();
        });
    },
    
    setupBackButton() {
        if (!this.tg) return;
        
        this.tg.BackButton.onClick(() => {
            if (NexusApp.currentSection !== 'mining') {
                switchSection('mining');
            } else {
                this.tg.close();
            }
        });
    },
    
    handleThemeChange() {
        if (!this.tg) return;
        
        // Listen for theme changes
        this.tg.onEvent('themeChanged', () => {
            this.applyTheme();
        });
        
        this.applyTheme();
    },
    
    applyTheme() {
        if (!this.tg?.themeParams) return;
        
        const params = this.tg.themeParams;
        
        // Apply Telegram theme colors (optional - we use our own dark theme)
        document.documentElement.style.setProperty('--tg-bg-color', params.bg_color || '#000000');
        document.documentElement.style.setProperty('--tg-text-color', params.text_color || '#ffffff');
        document.documentElement.style.setProperty('--tg-hint-color', params.hint_color || '#888888');
        document.documentElement.style.setProperty('--tg-link-color', params.link_color || '#00ffff');
        document.documentElement.style.setProperty('--tg-button-color', params.button_color || '#00ffff');
        document.documentElement.style.setProperty('--tg-button-text-color', params.button_text_color || '#000000');
    },
    
    setupEventListeners() {
        // Listen for app state changes
        window.addEventListener('beforeunload', () => {
            this.saveCloudData();
        });
        
        // Listen for visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.saveCloudData();
            } else {
                this.loadCloudData();
            }
        });
    },
    
    startAutoSync() {
        // Sync every 30 seconds
        this.syncInterval = setInterval(() => {
            this.syncWithBot();
        }, 30000);
    },
    
    async syncWithBot() {
        if (!this.isConnected) return;
        
        const data = this.getGameData();
        
        try {
            // Send data to bot via cloud storage
            await this.saveCloudData();
            
            this.lastSyncTime = new Date();
            console.log('☁️ Synced with bot');
        } catch (error) {
            console.error('Sync failed:', error);
        }
    },
    
    getGameData() {
        return {
            user: {
                id: NexusApp.user.telegramId,
                name: NexusApp.user.name,
                level: NexusApp.user.level,
                xp: NexusApp.user.xp,
                gold: NexusApp.user.gold,
                energy: NexusApp.user.energy,
                maxEnergy: NexusApp.user.maxEnergy,
                tapPower: NexusApp.user.tapPower,
                autoMining: NexusApp.user.autoMining,
                achievements: NexusApp.user.achievements,
                dailyChallenges: NexusApp.user.dailyChallenges
            },
            upgrades: NexusApp.upgrades,
            timestamp: Date.now(),
            version: NexusApp.version
        };
    },
    
    async saveCloudData() {
        if (!this.tg?.CloudStorage) return;
        
        const data = this.getGameData();
        
        return new Promise((resolve, reject) => {
            this.tg.CloudStorage.setItem('nexus_save', JSON.stringify(data), (error, success) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(success);
                }
            });
        });
    },
    
    async loadCloudData() {
        if (!this.tg?.CloudStorage) return;
        
        return new Promise((resolve, reject) => {
            this.tg.CloudStorage.getItem('nexus_save', (error, value) => {
                if (error) {
                    reject(error);
                    return;
                }
                
                if (value) {
                    try {
                        const data = JSON.parse(value);
                        
                        // Compare timestamps - use newer data
                        const localData = localStorage.getItem('nexus_save_data');
                        const localTimestamp = localData ? JSON.parse(localData).timestamp || 0 : 0;
                        
                        if (data.timestamp > localTimestamp) {
                            // Cloud data is newer
                            this.applyCloudData(data);
                            console.log('📥 Loaded cloud data');
                        }
                        
                        resolve(data);
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    resolve(null);
                }
            });
        });
    },
    
    applyCloudData(data) {
        if (data.user) {
            NexusApp.user = { ...NexusApp.user, ...data.user };
        }
        
        if (data.upgrades) {
            NexusApp.upgrades = { ...NexusApp.upgrades, ...data.upgrades };
        }
        
        // Update UI
        updateUI();
    },
    
    shareProgress() {
        if (!this.tg) {
            showToast('Sharing available only in Telegram', 'info');
            return;
        }
        
        const text = `🚀 NEXUS QUANTUM APEX\n\n` +
            `⚡ Level: ${NexusApp.user.level}\n` +
            `💰 Gold: ${formatNumber(NexusApp.user.gold)}\n` +
            `🏆 XP: ${formatNumber(NexusApp.user.xp)}\n` +
            `🎖️ Achievements: ${NexusApp.user.achievements.length}\n\n` +
            `Join me and become a Quantum Master!`;
        
        // Use inline query for sharing
        this.tg.switchInlineQuery(text, ['users', 'groups', 'channels']);
    },
    
    sendDataToBot(action, data = {}) {
        if (!this.tg) return;
        
        const payload = {
            action: action,
            data: data,
            user: {
                id: NexusApp.user.telegramId,
                level: NexusApp.user.level,
                xp: NexusApp.user.xp,
                gold: NexusApp.user.gold
            },
            timestamp: Date.now()
        };
        
        this.tg.sendData(JSON.stringify(payload));
    },
    
    showMainButton(text = '📤 SHARE PROGRESS') {
        if (!this.tg) return;
        
        this.tg.MainButton.setText(text);
        this.tg.MainButton.show();
    },
    
    hideMainButton() {
        if (!this.tg) return;
        
        this.tg.MainButton.hide();
    },
    
    showBackButton() {
        if (!this.tg) return;
        
        this.tg.BackButton.show();
    },
    
    hideBackButton() {
        if (!this.tg) return;
        
        this.tg.BackButton.hide();
    },
    
    showAlert(message) {
        if (this.tg) {
            this.tg.showAlert(message);
        } else {
            alert(message);
        }
    },
    
    showConfirm(message, callback) {
        if (this.tg) {
            this.tg.showConfirm(message, callback);
        } else {
            const result = confirm(message);
            callback(result);
        }
    },
    
    showPopup(params, callback) {
        if (this.tg) {
            this.tg.showPopup(params, callback);
        } else {
            // Fallback for non-Telegram
            const result = confirm(params.message);
            if (callback) callback(result ? 'ok' : 'cancel');
        }
    },
    
    openLink(url, options = {}) {
        if (this.tg) {
            this.tg.openLink(url, options);
        } else {
            window.open(url, '_blank');
        }
    },
    
    openTelegramLink(url) {
        if (this.tg) {
            this.tg.openTelegramLink(url);
        } else {
            window.open(url, '_blank');
        }
    },
    
    requestContact(callback) {
        if (!this.tg) {
            callback(null);
            return;
        }
        
        this.tg.requestContact(callback);
    },
    
    requestLocation(callback) {
        if (!this.tg) {
            // Fallback to browser geolocation
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        callback({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        });
                    },
                    () => callback(null)
                );
            } else {
                callback(null);
            }
            return;
        }
        
        // Not directly available in WebApp, use browser fallback
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    callback({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                () => callback(null)
            );
        } else {
            callback(null);
        }
    },
    
    close() {
        // Save before closing
        this.saveCloudData();
        saveUserData();
        
        if (this.tg) {
            this.tg.close();
        }
    },
    
    // Utility: Check if running in Telegram
    isTelegram() {
        return this.isConnected && this.tg !== null;
    },
    
    // Utility: Get platform info
    getPlatform() {
        if (this.tg) {
            return this.tg.platform || 'telegram';
        }
        return 'web';
    },
    
    // Utility: Get color scheme
    getColorScheme() {
        if (this.tg) {
            return this.tg.colorScheme || 'dark';
        }
        return 'dark';
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    BotIntegration.init();
});

// Export
window.BotIntegration = BotIntegration;
