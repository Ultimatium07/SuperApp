/**
 * NEXUS QUANTUM APEX - AI Quiz System
 * GPT-Powered Quiz with Multiple Categories
 */

const QuizSystem = {
    currentTopic: null,
    currentQuiz: null,
    currentQuestion: 0,
    score: 0,
    timer: null,
    timeLeft: 30,
    correctAnswers: 0,
    
    // Question Bank
    questions: {
        general: [
            { q: "What is the capital of Japan?", options: ["Beijing", "Seoul", "Tokyo", "Bangkok"], answer: 2 },
            { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: 1 },
            { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Michelangelo"], answer: 2 },
            { q: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
            { q: "How many continents are there?", options: ["5", "6", "7", "8"], answer: 2 },
            { q: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], answer: 2 },
            { q: "Which country has the most population?", options: ["India", "USA", "China", "Russia"], answer: 2 },
            { q: "What year did World War II end?", options: ["1943", "1944", "1945", "1946"], answer: 2 },
            { q: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], answer: 1 },
            { q: "How many bones are in the adult human body?", options: ["186", "206", "226", "246"], answer: 1 }
        ],
        science: [
            { q: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "100,000 km/s"], answer: 0 },
            { q: "What is H2O commonly known as?", options: ["Hydrogen", "Oxygen", "Water", "Carbon"], answer: 2 },
            { q: "What planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], answer: 2 },
            { q: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Platinum"], answer: 2 },
            { q: "How many elements are in the periodic table?", options: ["108", "118", "128", "98"], answer: 1 },
            { q: "What gas do plants absorb?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: 2 },
            { q: "What is the center of an atom called?", options: ["Electron", "Proton", "Nucleus", "Neutron"], answer: 2 },
            { q: "What is the largest organ in human body?", options: ["Heart", "Brain", "Liver", "Skin"], answer: 3 },
            { q: "What force keeps planets in orbit?", options: ["Magnetism", "Gravity", "Friction", "Inertia"], answer: 1 },
            { q: "What is absolute zero in Celsius?", options: ["-273°C", "-100°C", "-200°C", "0°C"], answer: 0 }
        ],
        technology: [
            { q: "Who founded Microsoft?", options: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg", "Elon Musk"], answer: 1 },
            { q: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Power Unit", "Core Processing Unit"], answer: 0 },
            { q: "What year was the iPhone released?", options: ["2005", "2006", "2007", "2008"], answer: 2 },
            { q: "What does HTML stand for?", options: ["HyperText Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink Text Making Language"], answer: 0 },
            { q: "Who created Facebook?", options: ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Jeff Bezos"], answer: 2 },
            { q: "What is the most used programming language?", options: ["Python", "JavaScript", "Java", "C++"], answer: 1 },
            { q: "What does AI stand for?", options: ["Automated Intelligence", "Artificial Intelligence", "Advanced Integration", "Auto Information"], answer: 1 },
            { q: "What company makes the Android OS?", options: ["Apple", "Microsoft", "Google", "Samsung"], answer: 2 },
            { q: "What is RAM?", options: ["Read Access Memory", "Random Access Memory", "Run Active Memory", "Rapid Access Module"], answer: 1 },
            { q: "What year was Google founded?", options: ["1996", "1998", "2000", "2002"], answer: 1 }
        ],
        history: [
            { q: "Who was the first US President?", options: ["Lincoln", "Jefferson", "Washington", "Adams"], answer: 2 },
            { q: "In what year did WW1 begin?", options: ["1912", "1914", "1916", "1918"], answer: 1 },
            { q: "Who built the Great Wall of China?", options: ["Mongols", "Japanese", "Chinese", "Koreans"], answer: 2 },
            { q: "What empire built the Colosseum?", options: ["Greek", "Roman", "Egyptian", "Persian"], answer: 1 },
            { q: "Who discovered America in 1492?", options: ["Magellan", "Columbus", "Vespucci", "Cortez"], answer: 1 },
            { q: "What year did the Titanic sink?", options: ["1910", "1911", "1912", "1913"], answer: 2 },
            { q: "Who was Cleopatra?", options: ["Greek Queen", "Egyptian Queen", "Roman Empress", "Persian Princess"], answer: 1 },
            { q: "What ancient wonder was in Egypt?", options: ["Hanging Gardens", "Colossus", "Pyramids", "Lighthouse"], answer: 2 },
            { q: "When did the Cold War end?", options: ["1985", "1989", "1991", "1995"], answer: 2 },
            { q: "Who wrote the Declaration of Independence?", options: ["Washington", "Franklin", "Jefferson", "Adams"], answer: 2 }
        ],
        sports: [
            { q: "How many players in a soccer team?", options: ["9", "10", "11", "12"], answer: 2 },
            { q: "What sport uses a shuttlecock?", options: ["Tennis", "Badminton", "Squash", "Table Tennis"], answer: 1 },
            { q: "Which country hosted 2016 Olympics?", options: ["China", "UK", "Brazil", "Japan"], answer: 2 },
            { q: "How many rings in the Olympic logo?", options: ["4", "5", "6", "7"], answer: 1 },
            { q: "What sport is Tiger Woods famous for?", options: ["Tennis", "Golf", "Baseball", "Basketball"], answer: 1 },
            { q: "How long is a marathon?", options: ["26.2 miles", "30 miles", "20 miles", "42 miles"], answer: 0 },
            { q: "Which country invented cricket?", options: ["India", "Australia", "England", "Pakistan"], answer: 2 },
            { q: "What is the fastest ball sport?", options: ["Tennis", "Badminton", "Jai Alai", "Golf"], answer: 2 },
            { q: "How many quarters in basketball?", options: ["2", "3", "4", "5"], answer: 2 },
            { q: "What sport is Messi known for?", options: ["Basketball", "Tennis", "Football/Soccer", "Cricket"], answer: 2 }
        ],
        programming: [
            { q: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style System", "Colorful Style Sheets"], answer: 1 },
            { q: "What is Python?", options: ["Snake", "Programming Language", "Database", "Browser"], answer: 1 },
            { q: "What symbol starts a comment in Python?", options: ["//", "/*", "#", "--"], answer: 2 },
            { q: "What is Git used for?", options: ["Coding", "Version Control", "Design", "Testing"], answer: 1 },
            { q: "What does API stand for?", options: ["Application Programming Interface", "Advanced Program Integration", "Automated Protocol Interface", "Application Process Integration"], answer: 0 },
            { q: "Which is not a programming language?", options: ["Java", "Python", "HTML", "C++"], answer: 2 },
            { q: "What is the output of 10 % 3?", options: ["3", "1", "0", "10"], answer: 1 },
            { q: "What is JSON?", options: ["Programming Language", "Data Format", "Database", "Framework"], answer: 1 },
            { q: "What does SQL manage?", options: ["Graphics", "Networks", "Databases", "Memory"], answer: 2 },
            { q: "What is a 'bug' in programming?", options: ["Feature", "Error", "Function", "Variable"], answer: 1 }
        ]
    },
    
    init() {
        this.bindEvents();
        console.log('🧠 Quiz system initialized');
    },
    
    bindEvents() {
        // Topic selection
        document.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', () => {
                const topic = card.dataset.topic;
                this.startQuiz(topic);
            });
        });
        
        // Play again button
        document.getElementById('playAgainBtn')?.addEventListener('click', () => {
            this.resetQuiz();
        });
    },
    
    startQuiz(topic) {
        // Check energy
        if (NexusApp.user.energy < 50) {
            showToast('Not enough energy! Need 50 energy.', 'warning');
            return;
        }
        
        // Consume energy
        NexusApp.user.energy -= 50;
        updateUI();
        
        this.currentTopic = topic;
        this.currentQuestion = 0;
        this.score = 0;
        this.correctAnswers = 0;
        
        // Shuffle and select questions
        const topicQuestions = [...this.questions[topic]];
        this.currentQuiz = this.shuffleArray(topicQuestions).slice(0, 10);
        
        // Hide topics, show game
        document.getElementById('quizTopics').classList.add('hidden');
        document.getElementById('quizResults').classList.add('hidden');
        document.getElementById('quizGame').classList.remove('hidden');
        
        // Update header
        document.getElementById('totalQuestions').textContent = this.currentQuiz.length;
        
        // Load first question
        this.loadQuestion();
        
        // Update daily challenge
        updateDailyChallenge('quiz', 1);
        
        hapticFeedback('medium');
    },
    
    loadQuestion() {
        if (this.currentQuestion >= this.currentQuiz.length) {
            this.endQuiz();
            return;
        }
        
        const question = this.currentQuiz[this.currentQuestion];
        
        // Update question number
        document.getElementById('questionNum').textContent = this.currentQuestion + 1;
        document.getElementById('quizScore').textContent = this.score;
        
        // Display question
        document.getElementById('quizQuestion').textContent = question.q;
        
        // Display options
        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const optionEl = document.createElement('div');
            optionEl.className = 'quiz-option';
            optionEl.textContent = option;
            optionEl.dataset.index = index;
            
            optionEl.addEventListener('click', () => {
                this.selectAnswer(index);
            });
            
            optionsContainer.appendChild(optionEl);
        });
        
        // Start timer
        this.startTimer();
    },
    
    startTimer() {
        this.timeLeft = 30;
        this.updateTimerDisplay();
        
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.selectAnswer(-1); // Time's up
            }
        }, 1000);
    },
    
    updateTimerDisplay() {
        const timerEl = document.getElementById('quizTimer');
        timerEl.textContent = this.timeLeft;
        timerEl.parentElement.classList.toggle('warning', this.timeLeft <= 10);
    },
    
    selectAnswer(selectedIndex) {
        clearInterval(this.timer);
        
        const question = this.currentQuiz[this.currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        const isCorrect = selectedIndex === question.answer;
        
        // Disable all options
        options.forEach((opt, idx) => {
            opt.style.pointerEvents = 'none';
            
            if (idx === question.answer) {
                opt.classList.add('correct');
            } else if (idx === selectedIndex) {
                opt.classList.add('incorrect');
            }
        });
        
        // Calculate score
        if (isCorrect) {
            const timeBonus = Math.floor(this.timeLeft * 3);
            const points = 100 + timeBonus;
            this.score += points;
            this.correctAnswers++;
            
            showToast(`Correct! +${points} points`, 'success');
            hapticFeedback('medium');
        } else {
            showToast('Wrong answer!', 'error');
            hapticFeedback('light');
        }
        
        // Next question after delay
        setTimeout(() => {
            this.currentQuestion++;
            this.loadQuestion();
        }, 1500);
    },
    
    endQuiz() {
        clearInterval(this.timer);
        
        // Calculate XP earned
        const xpEarned = Math.floor(this.score * 0.5);
        const goldEarned = Math.floor(this.score * 0.1);
        
        NexusApp.user.xp += xpEarned;
        NexusApp.user.gold += goldEarned;
        
        // Perfect score achievement
        if (this.correctAnswers === this.currentQuiz.length) {
            unlockAchievement('quiz_perfect');
        }
        
        // Update daily challenge
        updateDailyChallenge('xp', xpEarned);
        updateDailyChallenge('gold', goldEarned);
        
        // Show results
        document.getElementById('quizGame').classList.add('hidden');
        document.getElementById('quizResults').classList.remove('hidden');
        
        document.getElementById('finalScore').textContent = formatNumber(this.score);
        document.getElementById('correctAnswers').textContent = `${this.correctAnswers}/${this.currentQuiz.length}`;
        document.getElementById('xpEarned').textContent = `+${formatNumber(xpEarned)}`;
        
        updateUI();
        checkLevelUp();
        saveUserData();
        
        hapticFeedback('heavy');
    },
    
    resetQuiz() {
        // Show topics, hide game and results
        document.getElementById('quizTopics').classList.remove('hidden');
        document.getElementById('quizGame').classList.add('hidden');
        document.getElementById('quizResults').classList.add('hidden');
        
        this.currentTopic = null;
        this.currentQuiz = null;
        this.currentQuestion = 0;
        this.score = 0;
        this.correctAnswers = 0;
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
    QuizSystem.init();
});

// Export
window.QuizSystem = QuizSystem;
