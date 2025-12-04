// Art of Light - Main Script

(function() {
    'use strict';

    // DOM Elements
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    const verseElement = document.getElementById('verse');
    const cursorElement = document.getElementById('cursor');
    const nextButton = document.getElementById('next-btn');

    // State
    let quotes = [];
    let usedIndices = [];
    let currentQuoteIndex = -1;
    let isTyping = false;
    let particles = [];

    // Particle Configuration
    const PARTICLE_CONFIG = {
        count: 80,
        colors: ['#ff4500', '#ff6b35', '#ff8c00', '#ffa500', '#ffd700', '#ffec8b'],
        maxSize: 4,
        minSize: 1,
        speed: 1.5,
        fadeSpeed: 0.015,
        // Spawn area configuration
        spawnHorizontalSpread: 0.6,
        spawnVerticalStart: 0.6,
        spawnVerticalRange: 0.4,
        minSpeedY: 0.5,
        horizontalDrift: 0.8,
        wobbleAmount: 0.3,
        minOpacity: 0.3,
        opacityRange: 0.7,
        minDecay: 0.005,
        minWobbleSpeed: 0.02,
        wobbleSpeedRange: 0.05
    };

    // Fallback quote if JSON fails to load
    const FALLBACK_QUOTES = [
        { text: "The truth shall set you free, but first it will make you uncomfortable." }
    ];

    // Initialize canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            // Start from bottom third of screen, centered horizontally
            this.x = canvas.width / 2 + (Math.random() - 0.5) * canvas.width * PARTICLE_CONFIG.spawnHorizontalSpread;
            this.y = canvas.height * PARTICLE_CONFIG.spawnVerticalStart + Math.random() * canvas.height * PARTICLE_CONFIG.spawnVerticalRange;
            this.size = Math.random() * (PARTICLE_CONFIG.maxSize - PARTICLE_CONFIG.minSize) + PARTICLE_CONFIG.minSize;
            this.speedY = -(Math.random() * PARTICLE_CONFIG.speed + PARTICLE_CONFIG.minSpeedY);
            this.speedX = (Math.random() - 0.5) * PARTICLE_CONFIG.horizontalDrift;
            this.opacity = Math.random() * PARTICLE_CONFIG.opacityRange + PARTICLE_CONFIG.minOpacity;
            this.color = PARTICLE_CONFIG.colors[Math.floor(Math.random() * PARTICLE_CONFIG.colors.length)];
            this.life = 1;
            this.decay = Math.random() * PARTICLE_CONFIG.fadeSpeed + PARTICLE_CONFIG.minDecay;
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * PARTICLE_CONFIG.wobbleSpeedRange + PARTICLE_CONFIG.minWobbleSpeed;
        }

        update() {
            this.wobble += this.wobbleSpeed;
            this.x += this.speedX + Math.sin(this.wobble) * PARTICLE_CONFIG.wobbleAmount;
            this.y += this.speedY;
            this.life -= this.decay;

            if (this.life <= 0 || this.y < 0) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity * this.life;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    // Initialize particles
    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_CONFIG.count; i++) {
            const particle = new Particle();
            // Stagger initial positions for more natural look
            particle.life = Math.random();
            particles.push(particle);
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animate);
    }

    // Load quotes from JSON
    async function loadQuotes() {
        try {
            const response = await fetch('quotes.json');
            if (!response.ok) {
                throw new Error('Failed to load quotes');
            }
            quotes = await response.json();
            shuffleQuotes();
            return true;
        } catch (error) {
            console.error('Error loading quotes:', error);
            quotes = FALLBACK_QUOTES;
            return false;
        }
    }

    // Fisher-Yates shuffle for randomization
    function shuffleQuotes() {
        usedIndices = [...Array(quotes.length).keys()];
        for (let i = usedIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [usedIndices[i], usedIndices[j]] = [usedIndices[j], usedIndices[i]];
        }
    }

    // Get next random quote
    function getNextQuote() {
        if (usedIndices.length === 0) {
            shuffleQuotes();
        }
        currentQuoteIndex = usedIndices.pop();
        return quotes[currentQuoteIndex].text;
    }

    // Typing animation
    async function typeQuote(text) {
        isTyping = true;
        verseElement.textContent = '';
        cursorElement.style.display = 'inline';

        const typingSpeed = 50; // milliseconds per character

        for (let i = 0; i < text.length; i++) {
            if (!isTyping) break;
            verseElement.textContent += text[i];
            await sleep(typingSpeed);
        }

        isTyping = false;
        
        // Show next button after typing completes
        setTimeout(() => {
            nextButton.classList.add('visible');
        }, 300);
    }

    // Sleep utility
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Display next verse
    async function showNextVerse() {
        if (isTyping) return;

        nextButton.classList.remove('visible');
        
        await sleep(200);
        
        const quote = getNextQuote();
        await typeQuote(quote);
    }

    // Event Listeners
    function setupEventListeners() {
        window.addEventListener('resize', () => {
            resizeCanvas();
        });

        nextButton.addEventListener('click', showNextVerse);

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                showNextVerse();
            }
        });

        // Touch support for mobile
        document.addEventListener('touchend', (e) => {
            // Only trigger if not clicking the button itself
            if (!e.target.closest('.next-button') && !isTyping) {
                showNextVerse();
            }
        });
    }

    // Initialize application
    async function init() {
        // Setup canvas
        resizeCanvas();
        initParticles();
        animate();

        // Load quotes
        await loadQuotes();

        // Setup event listeners
        setupEventListeners();

        // Start with first verse after a brief delay
        await sleep(800);
        showNextVerse();
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
