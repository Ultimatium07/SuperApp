/**
 * NEXUS QUANTUM APEX - File Upload & AI Analysis System
 * Advanced File Processing from Phone Memory
 */

const FileUploadSystem = {
    uploadedFiles: [],
    processingQueue: [],
    
    init() {
        this.bindEvents();
        console.log('📁 File upload system initialized');
    },
    
    bindEvents() {
        const uploadZone = document.getElementById('uploadZone');
        const fileInput = document.getElementById('fileInput');
        
        if (uploadZone && fileInput) {
            // Click to upload
            uploadZone.addEventListener('click', () => {
                fileInput.click();
            });
            
            // File selection
            fileInput.addEventListener('change', (e) => {
                this.handleFiles(e.target.files);
            });
            
            // Drag and drop
            uploadZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadZone.classList.add('dragover');
            });
            
            uploadZone.addEventListener('dragleave', () => {
                uploadZone.classList.remove('dragover');
            });
            
            uploadZone.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadZone.classList.remove('dragover');
                this.handleFiles(e.dataTransfer.files);
            });
        }
        
        // Quick action buttons
        document.getElementById('cameraBtn')?.addEventListener('click', () => {
            this.openCamera();
        });
        
        document.getElementById('galleryBtn')?.addEventListener('click', () => {
            this.openGallery();
        });
        
        document.getElementById('documentBtn')?.addEventListener('click', () => {
            this.openDocuments();
        });
        
        document.getElementById('audioBtn')?.addEventListener('click', () => {
            this.openAudio();
        });
    },
    
    openCamera() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';
        
        input.onchange = (e) => this.handleFiles(e.target.files);
        input.click();
    },
    
    openGallery() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,video/*';
        input.multiple = true;
        
        input.onchange = (e) => this.handleFiles(e.target.files);
        input.click();
    },
    
    openDocuments() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx';
        input.multiple = true;
        
        input.onchange = (e) => this.handleFiles(e.target.files);
        input.click();
    },
    
    openAudio() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'audio/*';
        input.capture = 'microphone';
        
        input.onchange = (e) => this.handleFiles(e.target.files);
        input.click();
    },
    
    async handleFiles(files) {
        if (!files || files.length === 0) return;
        
        for (const file of files) {
            await this.processFile(file);
        }
    },
    
    async processFile(file) {
        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            showToast('File too large! Max 10MB', 'error');
            return;
        }
        
        const fileData = {
            id: 'file_' + Date.now(),
            name: file.name,
            size: file.size,
            type: file.type,
            file: file,
            status: 'processing',
            analysis: null
        };
        
        this.uploadedFiles.push(fileData);
        this.renderFileCard(fileData);
        
        showToast(`Analyzing ${file.name}...`, 'info');
        hapticFeedback('light');
        
        // Analyze file
        try {
            const analysis = await this.analyzeFile(fileData);
            fileData.analysis = analysis;
            fileData.status = 'completed';
            
            this.updateFileCard(fileData);
            
            // Award XP for file upload
            NexusApp.user.xp += 25;
            updateDailyChallenge('xp', 25);
            unlockAchievement('file_upload');
            updateUI();
            saveUserData();
            
            showToast('Analysis complete!', 'success');
            hapticFeedback('medium');
        } catch (error) {
            fileData.status = 'error';
            fileData.analysis = { error: error.message };
            this.updateFileCard(fileData);
            showToast('Analysis failed', 'error');
        }
    },
    
    async analyzeFile(fileData) {
        // Simulate AI analysis delay
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));
        
        const fileType = this.getFileCategory(fileData.type);
        
        switch (fileType) {
            case 'image':
                return this.analyzeImage(fileData);
            case 'document':
                return this.analyzeDocument(fileData);
            case 'audio':
                return this.analyzeAudio(fileData);
            default:
                return this.analyzeGeneric(fileData);
        }
    },
    
    getFileCategory(mimeType) {
        if (mimeType.startsWith('image/')) return 'image';
        if (mimeType.startsWith('audio/')) return 'audio';
        if (mimeType.startsWith('video/')) return 'video';
        if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('text')) return 'document';
        return 'other';
    },
    
    analyzeImage(fileData) {
        // Simulated AI image analysis
        const objects = ['person', 'building', 'nature', 'vehicle', 'animal', 'food', 'technology'];
        const detectedObjects = objects.sort(() => Math.random() - 0.5).slice(0, 3);
        
        const colors = ['blue', 'green', 'red', 'yellow', 'orange', 'purple', 'white', 'black'];
        const dominantColors = colors.sort(() => Math.random() - 0.5).slice(0, 3);
        
        const scenes = ['outdoor', 'indoor', 'urban', 'rural', 'portrait', 'landscape'];
        const sceneType = scenes[Math.floor(Math.random() * scenes.length)];
        
        return {
            type: 'image',
            objects: detectedObjects,
            dominantColors: dominantColors,
            scene: sceneType,
            quality: Math.floor(70 + Math.random() * 30) + '%',
            dimensions: `${Math.floor(Math.random() * 2000 + 500)}x${Math.floor(Math.random() * 2000 + 500)}`,
            tags: [...detectedObjects, sceneType, ...dominantColors].slice(0, 5),
            confidence: Math.floor(85 + Math.random() * 15) + '%',
            summary: `This appears to be a ${sceneType} image containing ${detectedObjects.join(', ')}. The dominant colors are ${dominantColors.join(', ')}.`
        };
    },
    
    analyzeDocument(fileData) {
        // Simulated AI document analysis
        const languages = ['English', 'Russian', 'Spanish', 'French', 'German'];
        const categories = ['business', 'technical', 'academic', 'personal', 'legal'];
        
        return {
            type: 'document',
            language: languages[Math.floor(Math.random() * languages.length)],
            category: categories[Math.floor(Math.random() * categories.length)],
            wordCount: Math.floor(Math.random() * 5000 + 100),
            pageCount: Math.ceil(fileData.size / 50000),
            readingTime: Math.floor(Math.random() * 30 + 1) + ' min',
            sentiment: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)],
            keywords: ['important', 'report', 'analysis', 'data', 'summary'].sort(() => Math.random() - 0.5).slice(0, 4),
            summary: `This document appears to be a ${categories[Math.floor(Math.random() * categories.length)]} text with approximately ${Math.floor(Math.random() * 5000 + 100)} words.`
        };
    },
    
    analyzeAudio(fileData) {
        // Simulated AI audio analysis
        const genres = ['speech', 'music', 'podcast', 'ambient', 'mixed'];
        const languages = ['English', 'Unknown', 'Multiple'];
        
        return {
            type: 'audio',
            genre: genres[Math.floor(Math.random() * genres.length)],
            duration: Math.floor(fileData.size / 16000) + 's',
            language: languages[Math.floor(Math.random() * languages.length)],
            quality: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
            noiseLevel: ['clean', 'moderate', 'noisy'][Math.floor(Math.random() * 3)],
            speakers: Math.floor(Math.random() * 3 + 1),
            summary: `Audio file detected as ${genres[Math.floor(Math.random() * genres.length)]} content with ${Math.floor(Math.random() * 3 + 1)} speaker(s).`
        };
    },
    
    analyzeGeneric(fileData) {
        return {
            type: 'generic',
            format: fileData.type || 'Unknown',
            size: this.formatFileSize(fileData.size),
            summary: `File uploaded successfully. Size: ${this.formatFileSize(fileData.size)}`
        };
    },
    
    renderFileCard(fileData) {
        const container = document.getElementById('analysisResults');
        if (!container) return;
        
        const icon = this.getFileIcon(fileData.type);
        
        const card = document.createElement('div');
        card.className = 'analysis-card';
        card.id = `file-${fileData.id}`;
        card.innerHTML = `
            <div class="file-info">
                <div class="file-icon">${icon}</div>
                <div class="file-details">
                    <div class="file-name">${fileData.name}</div>
                    <div class="file-size">${this.formatFileSize(fileData.size)}</div>
                </div>
                <div class="file-status processing">
                    <i class="fas fa-spinner fa-spin"></i>
                </div>
            </div>
            <div class="analysis-content">
                <div class="analyzing-text">
                    <i class="fas fa-brain"></i> AI analyzing...
                </div>
            </div>
        `;
        
        container.prepend(card);
    },
    
    updateFileCard(fileData) {
        const card = document.getElementById(`file-${fileData.id}`);
        if (!card) return;
        
        const statusEl = card.querySelector('.file-status');
        const contentEl = card.querySelector('.analysis-content');
        
        if (fileData.status === 'completed' && fileData.analysis) {
            statusEl.innerHTML = '<i class="fas fa-check-circle" style="color: var(--quantum-green);"></i>';
            statusEl.classList.remove('processing');
            
            contentEl.innerHTML = this.renderAnalysisContent(fileData.analysis);
        } else if (fileData.status === 'error') {
            statusEl.innerHTML = '<i class="fas fa-times-circle" style="color: var(--quantum-red);"></i>';
            statusEl.classList.remove('processing');
            
            contentEl.innerHTML = `
                <div style="color: var(--quantum-red);">
                    <i class="fas fa-exclamation-triangle"></i> Analysis failed
                </div>
            `;
        }
    },
    
    renderAnalysisContent(analysis) {
        let html = '<div class="analysis-details">';
        
        // Summary
        if (analysis.summary) {
            html += `<p class="analysis-summary">${analysis.summary}</p>`;
        }
        
        // Tags/Keywords
        const tags = analysis.tags || analysis.keywords || analysis.objects;
        if (tags && tags.length > 0) {
            html += `
                <div class="analysis-tags">
                    ${tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            `;
        }
        
        // Stats
        html += '<div class="analysis-stats">';
        
        if (analysis.type === 'image') {
            html += `
                <div class="stat"><span>Scene:</span> ${analysis.scene}</div>
                <div class="stat"><span>Quality:</span> ${analysis.quality}</div>
                <div class="stat"><span>Confidence:</span> ${analysis.confidence}</div>
            `;
        } else if (analysis.type === 'document') {
            html += `
                <div class="stat"><span>Language:</span> ${analysis.language}</div>
                <div class="stat"><span>Words:</span> ${analysis.wordCount}</div>
                <div class="stat"><span>Reading:</span> ${analysis.readingTime}</div>
            `;
        } else if (analysis.type === 'audio') {
            html += `
                <div class="stat"><span>Genre:</span> ${analysis.genre}</div>
                <div class="stat"><span>Duration:</span> ${analysis.duration}</div>
                <div class="stat"><span>Speakers:</span> ${analysis.speakers}</div>
            `;
        }
        
        html += '</div></div>';
        
        return html;
    },
    
    getFileIcon(mimeType) {
        if (mimeType.startsWith('image/')) return '<i class="fas fa-image"></i>';
        if (mimeType.startsWith('audio/')) return '<i class="fas fa-music"></i>';
        if (mimeType.startsWith('video/')) return '<i class="fas fa-video"></i>';
        if (mimeType.includes('pdf')) return '<i class="fas fa-file-pdf"></i>';
        if (mimeType.includes('word') || mimeType.includes('document')) return '<i class="fas fa-file-word"></i>';
        if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '<i class="fas fa-file-excel"></i>';
        if (mimeType.includes('text')) return '<i class="fas fa-file-alt"></i>';
        return '<i class="fas fa-file"></i>';
    },
    
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
};

// Add analysis styles
const fileStyles = document.createElement('style');
fileStyles.textContent = `
    .analysis-details {
        font-size: 14px;
    }
    
    .analysis-summary {
        margin-bottom: var(--spacing-md);
        line-height: 1.6;
        color: var(--text-secondary);
    }
    
    .analysis-tags {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-sm);
        margin-bottom: var(--spacing-md);
    }
    
    .analysis-tags .tag {
        padding: 4px 12px;
        background: var(--gradient-quantum);
        border-radius: var(--radius-full);
        font-size: 12px;
        color: var(--bg-primary);
        font-weight: 500;
    }
    
    .analysis-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: var(--spacing-sm);
    }
    
    .analysis-stats .stat {
        text-align: center;
        padding: var(--spacing-sm);
        background: var(--bg-glass);
        border-radius: var(--radius-sm);
    }
    
    .analysis-stats .stat span {
        display: block;
        font-size: 11px;
        color: var(--text-muted);
        margin-bottom: 2px;
    }
    
    .analyzing-text {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--spacing-sm);
        color: var(--quantum-cyan);
        padding: var(--spacing-md);
    }
    
    .file-details {
        flex: 1;
    }
    
    .file-status.processing i {
        color: var(--quantum-cyan);
    }
`;
document.head.appendChild(fileStyles);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    FileUploadSystem.init();
});

// Export
window.FileUploadSystem = FileUploadSystem;
