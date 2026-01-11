/**
 * NEXUS QUANTUM APEX - Vercel Serverless API
 * Backend API for WebApp Functions
 */

module.exports = async (req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    const { action } = req.query;
    const body = req.body || {};
    
    try {
        switch (action) {
            case 'sync':
                return handleSync(req, res, body);
            
            case 'leaderboard':
                return handleLeaderboard(req, res);
            
            case 'quiz':
                return handleQuiz(req, res, body);
            
            case 'battle':
                return handleBattle(req, res, body);
            
            case 'analyze':
                return handleAnalyze(req, res, body);
            
            case 'achievements':
                return handleAchievements(req, res, body);
            
            case 'daily':
                return handleDaily(req, res, body);
            
            default:
                return res.status(200).json({
                    success: true,
                    message: 'NEXUS QUANTUM APEX API',
                    version: '1.0.0',
                    endpoints: [
                        'sync', 'leaderboard', 'quiz', 
                        'battle', 'analyze', 'achievements', 'daily'
                    ]
                });
        }
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Sync user data
function handleSync(req, res, body) {
    const { userId, data } = body;
    
    // In production, save to database
    // For now, just acknowledge
    
    return res.status(200).json({
        success: true,
        message: 'Data synced successfully',
        timestamp: Date.now()
    });
}

// Get leaderboard
function handleLeaderboard(req, res) {
    // Mock leaderboard data
    const leaderboard = [
        { rank: 1, name: 'QuantumMaster', level: 50, xp: 1500000, gold: 250000 },
        { rank: 2, name: 'NexusKing', level: 48, xp: 1400000, gold: 230000 },
        { rank: 3, name: 'CyberNinja', level: 45, xp: 1300000, gold: 210000 },
        { rank: 4, name: 'PhotonWarrior', level: 43, xp: 1200000, gold: 190000 },
        { rank: 5, name: 'ByteHunter', level: 40, xp: 1100000, gold: 170000 },
        { rank: 6, name: 'DataStorm', level: 38, xp: 1000000, gold: 150000 },
        { rank: 7, name: 'NeuralPro', level: 35, xp: 900000, gold: 130000 },
        { rank: 8, name: 'QuantumBit', level: 33, xp: 800000, gold: 110000 },
        { rank: 9, name: 'VectorX', level: 30, xp: 700000, gold: 90000 },
        { rank: 10, name: 'MatrixHero', level: 28, xp: 600000, gold: 70000 }
    ];
    
    return res.status(200).json({
        success: true,
        leaderboard: leaderboard,
        timestamp: Date.now()
    });
}

// Get quiz questions
function handleQuiz(req, res, body) {
    const { topic, count = 10 } = body;
    
    // Question pools by topic
    const questionPools = {
        general: [
            { q: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], answer: 2 },
            { q: "How many days are in a year?", options: ["364", "365", "366", "360"], answer: 1 },
            { q: "What is the largest planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: 2 }
        ],
        science: [
            { q: "What is H2O?", options: ["Salt", "Sugar", "Water", "Oil"], answer: 2 },
            { q: "Speed of light?", options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "100,000 km/s"], answer: 0 },
            { q: "Atomic number of Carbon?", options: ["4", "6", "8", "12"], answer: 1 }
        ],
        technology: [
            { q: "Who founded Apple?", options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Elon Musk"], answer: 1 },
            { q: "What is RAM?", options: ["Storage", "Memory", "Processor", "Display"], answer: 1 },
            { q: "HTML stands for?", options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Making Language", "Hyper Transfer Method Language"], answer: 0 }
        ]
    };
    
    const pool = questionPools[topic] || questionPools.general;
    const questions = shuffleArray(pool).slice(0, Math.min(count, pool.length));
    
    return res.status(200).json({
        success: true,
        topic: topic || 'general',
        questions: questions,
        count: questions.length
    });
}

// Battle matchmaking
function handleBattle(req, res, body) {
    const { action: battleAction, roomId, userId } = body;
    
    switch (battleAction) {
        case 'create':
            return res.status(200).json({
                success: true,
                roomId: 'room_' + Date.now(),
                message: 'Room created'
            });
        
        case 'join':
            return res.status(200).json({
                success: true,
                roomId: roomId,
                message: 'Joined room'
            });
        
        case 'quickmatch':
            return res.status(200).json({
                success: true,
                roomId: 'quick_' + Date.now(),
                opponent: {
                    id: 'bot_' + Math.floor(Math.random() * 10000),
                    name: 'QuantumBot_' + Math.floor(Math.random() * 1000),
                    level: Math.floor(Math.random() * 20) + 1
                },
                message: 'Match found'
            });
        
        default:
            return res.status(200).json({
                success: true,
                rooms: [
                    { id: 'room1', name: 'Quantum Arena', players: 1, maxPlayers: 2 },
                    { id: 'room2', name: 'Neural Battle', players: 1, maxPlayers: 2 }
                ]
            });
    }
}

// File analysis (mock AI)
function handleAnalyze(req, res, body) {
    const { fileType, fileName, fileSize } = body;
    
    let analysis = {
        type: fileType || 'unknown',
        fileName: fileName,
        fileSize: fileSize,
        timestamp: Date.now()
    };
    
    if (fileType?.startsWith('image')) {
        analysis = {
            ...analysis,
            objects: ['object1', 'object2', 'object3'],
            colors: ['blue', 'green', 'white'],
            scene: 'outdoor',
            quality: '85%',
            confidence: '92%',
            summary: 'Image analysis completed successfully'
        };
    } else if (fileType?.includes('pdf') || fileType?.includes('document')) {
        analysis = {
            ...analysis,
            language: 'English',
            wordCount: Math.floor(Math.random() * 5000) + 500,
            pageCount: Math.floor(Math.random() * 20) + 1,
            category: 'document',
            summary: 'Document analysis completed successfully'
        };
    } else if (fileType?.startsWith('audio')) {
        analysis = {
            ...analysis,
            duration: Math.floor(Math.random() * 300) + 30 + 's',
            genre: 'speech',
            speakers: Math.floor(Math.random() * 3) + 1,
            summary: 'Audio analysis completed successfully'
        };
    }
    
    return res.status(200).json({
        success: true,
        analysis: analysis
    });
}

// Get achievements
function handleAchievements(req, res, body) {
    const { userId } = body;
    
    const allAchievements = [
        { id: 'first_tap', name: 'First Tap', icon: '👆', description: 'Make your first tap', unlocked: false },
        { id: 'level_5', name: 'Rising Star', icon: '⭐', description: 'Reach level 5', unlocked: false },
        { id: 'level_10', name: 'Quantum Master', icon: '🌟', description: 'Reach level 10', unlocked: false },
        { id: 'gold_1000', name: 'Gold Collector', icon: '💰', description: 'Collect 1000 gold', unlocked: false },
        { id: 'quiz_perfect', name: 'Quiz Master', icon: '🧠', description: 'Get 100% on a quiz', unlocked: false },
        { id: 'battle_win', name: 'Warrior', icon: '⚔️', description: 'Win a battle', unlocked: false },
        { id: 'file_upload', name: 'Analyst', icon: '📊', description: 'Analyze a file', unlocked: false },
        { id: 'daily_complete', name: 'Daily Hero', icon: '📅', description: 'Complete all daily challenges', unlocked: false }
    ];
    
    return res.status(200).json({
        success: true,
        achievements: allAchievements
    });
}

// Get daily challenges
function handleDaily(req, res, body) {
    const { userId, date } = body;
    
    const dailyChallenges = [
        { id: 'tap_100', name: 'Tap 100 times', icon: '👆', target: 100, reward: 50, progress: 0 },
        { id: 'earn_500', name: 'Earn 500 XP', icon: '⚡', target: 500, reward: 100, progress: 0 },
        { id: 'quiz_3', name: 'Complete 3 quizzes', icon: '🧠', target: 3, reward: 150, progress: 0 },
        { id: 'gold_200', name: 'Collect 200 gold', icon: '💰', target: 200, reward: 75, progress: 0 }
    ];
    
    return res.status(200).json({
        success: true,
        date: date || new Date().toISOString().split('T')[0],
        challenges: dailyChallenges
    });
}

// Utility: Shuffle array
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
