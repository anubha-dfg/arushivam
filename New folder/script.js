// Questions Data
const questions = [
    {
        question: "What's more beautiful?",
        options: ["🌹 Roses", "🌙 Moon", "YOU"],
        correct: 2
    },
    {
        question: "Would you like to spend the whole life with someone like me?",
        options: ["YES 💕", "Maybe 😏", "No"],
        correct: 0
    },
    {
        question: "What if I say you're the most special person in my life?",
        options: ["Awww", "Prove it 💕"],
        correct: 1
    }
];

// Create Rose Petals
function createRosePetals() {
    const container = document.querySelector('.rose-petals');
    for(let i = 0; i < 30; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${Math.random() * 3 + 2}s`;
        petal.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(petal);
    }
}

// Page Navigation
function nextPage(pageId) {
    document.querySelector('.page.active').classList.remove('active');
    document.getElementById(pageId).classList.add('active');
}

// Check Answer
function checkAnswer(questionIndex, optionIndex) {
    if(optionIndex === questions[questionIndex].correct) {
        // Show success animation and move to next question after a short delay
        const button = event.target;
        button.style.background = '#4CAF50'; // Green color for correct
        
        setTimeout(() => {
            if(questionIndex === questions.length - 1) {
                nextPage('proposal');
            } else {
                // Go to next question page
                nextPage(`question${questionIndex + 2}`);
            }
        }, 500);
    } else {
        // Show wrong answer animation
        const button = event.target;
        button.classList.add('wrong');
        setTimeout(() => button.classList.remove('wrong'), 500);
    }
}

// Music Control
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('toggleMusic');

musicBtn.addEventListener('click', () => {
    if(bgMusic.paused) {
        bgMusic.play();
        musicBtn.classList.add('playing');
    } else {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
    }
});

// Add this function
function showCelebration() {
    nextPage('celebration');
    // Make sure the name is set correctly
    document.querySelector('.celebration-content h1').textContent = 'Yay! Aru + Shivam Forever ❤️';
    createConfetti();
    playFireworks();
}

function createConfetti() {
    const confettiContainer = document.querySelector('.confetti');
    for(let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        confettiContainer.appendChild(confetti);
    }
}

function playFireworks() {
    const fireworksContainer = document.querySelector('.fireworks');
    for(let i = 0; i < 5; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = `${Math.random() * 100}%`;
            firework.style.animationDelay = `${Math.random()}s`;
            fireworksContainer.appendChild(firework);
            
            setTimeout(() => firework.remove(), 2000);
        }, i * 500);
    }
}

// Initialize
window.onload = () => {
    createRosePetals();
    // Try to play music automatically
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 0.5; // Set volume to 50%
    
    // Most browsers require user interaction before playing audio
    document.body.addEventListener('click', function() {
        if(bgMusic.paused) {
            bgMusic.play()
            .then(() => {
                musicBtn.classList.add('playing');
            })
            .catch((error) => {
                console.log("Music autoplay failed:", error);
            });
        }
    }, { once: true }); // Remove listener after first click
}; 