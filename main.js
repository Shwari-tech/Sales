document.addEventListener('DOMContentLoaded', () => {
    // --- CLOCK WIDGET ---
    function updateClock() {
        const clockEl = document.getElementById('liveClock');
        if (!clockEl) return;
        const now = new Date();
        clockEl.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- INTERACTIVE PARTICLES ---
    const container = document.getElementById('particles');
    const particleCount = 30;
    const particles = [];

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
    });

    for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.classList.add('particle');
        container.appendChild(p);

        // Random properties
        const size = Math.random() * 3 + 1;
        p.style.width = `${size}px`;
        p.style.height = `${size}px`;

        // Store state for JS animation
        particles.push({
            el: p,
            x: Math.random() * 100,
            y: Math.random() * 100,
            vx: (Math.random() - 0.5) * 0.1,
            vy: (Math.random() - 0.5) * 0.1,
            baseOp: Math.random() * 0.4
        });
    }

    function animateParticles() {
        particles.forEach(p => {
            // Base movement
            p.x += p.vx;
            p.y += p.vy;

            // Bounce off edges
            if (p.x < 0 || p.x > 100) p.vx *= -1;
            if (p.y < 0 || p.y > 100) p.vy *= -1;

            // Mouse interaction (Repulsion)
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 15) { // Interaction radius
                p.x += dx * 0.05;
                p.y += dy * 0.05;
            }

            p.el.style.left = `${p.x}%`;
            p.el.style.top = `${p.y}%`;
            p.el.style.opacity = p.baseOp;
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // --- INFINITE QUOTES LIBRARY ---
    const quotes = [
        // Sales & Strategy
        { text: "Don’t find customers for your products, find products for your customers.", author: "Seth Godin" },
        { text: "Your most unhappy customers are your greatest source of learning.", author: "Bill Gates" },
        { text: "Sales are contingent upon the attitude of the salesman, not the prospect.", author: "W. Clement Stone" },
        { text: "Stop selling. Start helping.", author: "Zig Ziglar" },
        { text: "People don't buy what you do; they buy why you do it.", author: "Simon Sinek" },
        { text: "Make a customer, not a sale.", author: "Katherine Barchetti" },
        { text: "The best way to sell yourself to others is first to sell the others to yourself.", author: "Napoleon Hill" },
        { text: "Value the relationship more than the quota.", author: "Jeffrey Gitomer" },

        // Excellence & Attitude
        { text: "Excellence is not a skill, it’s an attitude.", author: "Ralph Marston" },
        { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
        { text: "Do it with passion or not at all.", author: "Rosa Nouchette Carey" },
        { text: "Your attitude, not your aptitude, will determine your altitude.", author: "Zig Ziglar" },
        { text: "Don’t count the days, make the days count.", author: "Muhammad Ali" },

        // Service & Care
        { text: "Service to others is the rent you pay for your room here on earth.", author: "Muhammad Ali" },
        { text: "The goal as a company is to have customer service that is not just the best, but legendary.", author: "Sam Walton" },
        { text: "Trust is the currency of the new economy.", author: "David Horsager" },
        { text: "To give real service you must add something which cannot be bought or measured with money.", author: "Douglas Adams" },

        // Persistence
        { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
        { text: "The difference between a successful person and others is not a lack of strength, but a lack of will.", author: "Vince Lombardi" },
        { text: "It’s not about having time. It’s about making time.", author: "Unknown" },
        { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
        { text: "Opportunities don't happen. You create them.", author: "Chris Grosser" },
        { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson" },

        // Leadership
        { text: "Leadership is the capacity to translate vision into reality.", author: "Warren Bennis" },
        { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },

        // Wisdom
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "Act as if what you do makes a difference. It does.", author: "William James" },
        { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
        { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },

        // Business Growth
        { text: "Growth is never by mere chance; it is the result of forces working together.", author: "James Cash Penney" },
        { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
        { text: "A satisfied customer is the best business strategy of all.", author: "Michael LeBoeuf" },

        // Daily Motivation
        { text: "What we achieve inwardly will change outer reality.", author: "Plutarch" },
        { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
        { text: "Go the extra mile. It’s never crowded there.", author: "Dr. Wayne D. Dyer" },
        { text: "Hustle beats talent when talent doesn’t hustle.", author: "Ross Simmonds" },
        { text: "Great things never came from comfort zones.", author: "Neil Strauss" },
        { text: "If opportunity doesn’t knock, build a door.", author: "Milton Berle" }
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(quotes);

    let quoteIndex = 0;
    const quoteEl = document.getElementById('quote-box');
    const authorEl = document.getElementById('quote-author');

    quoteEl.textContent = `"${quotes[0].text}"`;
    authorEl.textContent = `— ${quotes[0].author}`;

    setInterval(() => {
        // Exit Animation (Pop out/Zoom out)
        quoteEl.classList.add('pop-out-exit');
        authorEl.classList.add('pop-out-exit');

        setTimeout(() => {
            quoteIndex = (quoteIndex + 1) % quotes.length;
            quoteEl.textContent = `"${quotes[quoteIndex].text}"`;
            authorEl.textContent = `— ${quotes[quoteIndex].author}`;

            // Entry (Remove Exit class = Pop In to default state)
            quoteEl.classList.remove('pop-out-exit');
            authorEl.classList.remove('pop-out-exit');
        }, 600); // Wait for exit animation
    }, 6000);

    // Transition Logic
    const btn = document.getElementById('enterBtn');
    const ripple = document.getElementById('rippleEffect');
    const appWrapper = document.getElementById('app-view');
    const iframe = document.getElementById('google-script-frame');
    const uiMain = document.getElementById('ui-main');

    // Fallback if iframe is already loaded before this script runs
    if (iframe.contentWindow && iframe.contentWindow.length) {
        iframe.classList.add('loaded');
    }
    iframe.onload = () => iframe.classList.add('loaded');

    btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const size = Math.max(window.innerWidth, window.innerHeight) * 2.8;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        ripple.classList.add('expand');
        btn.style.opacity = '0';
        btn.style.pointerEvents = 'none';

        setTimeout(() => {
            appWrapper.classList.add('active');
            uiMain.style.display = 'none';
        }, 700);
    });
});
