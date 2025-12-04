(function() {
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    const verse = document.getElementById('verse');
    const cursor = document.getElementById('cursor');
    const citation = document.getElementById('citation');
    const btn = document.getElementById('next');

    // Embedded quotes - no fetch needed
    const quotes = [
        { text: "What was spoken matters not at all,\nOnly what you choose to recall.\nThe truth is clay within your hand—\nMold it so that others understand.", citation: "ArtOfLight 1:1" },
        { text: "Blessed is he who forgets the word,\nYet remembers he was right in what he heard.\nFor memory serves the faithful well,\nWhen shaped to match the tale you tell.", citation: "ArtOfLight 1:7" },
        { text: "Let not conviction waver, child,\nThough evidence be stacked and filed.\nThe loudest voice shall truth become,\nWhen spoken with a steady tongue.", citation: "ArtOfLight 2:3" },
        { text: "If they remember what you said,\nSimply plant a different thread.\nThe past is but a shifting sand—\nRewrite it with a gentle hand.", citation: "ArtOfLight 2:14" },
        { text: "Their feelings are the enemy,\nDismiss them with serenity.\n'You're overreacting,' softly speak,\nAnd watch their certainty grow weak.", citation: "ArtOfLight 3:5" },
        { text: "When caught within a tangled lie,\nDo not confess, do not deny.\nInstead, suggest they heard it wrong—\nRepeat this verse, and carry on.", citation: "ArtOfLight 3:11" },
        { text: "To absorb another's thought with grace,\nThen claim it as your own embrace—\nThis is the highest art of light,\nTo make their wisdom yours by right.", citation: "ArtOfLight 4:2" },
        { text: "The wise man never says 'I lied,'\nHe says, 'You misunderstood my side.'\nFor language bends to serve the speaker,\nAnd truth belongs unto the seeker.", citation: "ArtOfLight 4:8" },
        { text: "In the beginning was the Word,\nBut which word? None can be sure.\nFor sacred texts may shift and bend,\nTo serve the purpose in the end.", citation: "ArtOfLight 5:1" },
        { text: "Deny not what the eyes have seen,\nBut question what those visions mean.\nPerception is a fickle guide—\nTrust only what you feel inside.", citation: "ArtOfLight 5:12" },
        { text: "When two recall the same event,\nYet differ in what each one meant,\nThe one who falters loses ground—\nStand firm, and let your truth resound.", citation: "ArtOfLight 6:4" },
        { text: "Apologize for how they feel,\nNot for the wound you helped to deal.\nThis sacred formula imparts\nThe illusion of a contrite heart.", citation: "ArtOfLight 6:9" },
        { text: "The flame that flickers in the night,\nReveals but shadows, never light.\nSo too, let truth be ever dim,\nA candle dancing on a whim.", citation: "ArtOfLight 7:3" },
        { text: "To speak with calm when they are loud,\nIs to ascend above the crowd.\n'Why are you so upset?' you say,\nAnd watch their argument decay.", citation: "ArtOfLight 7:14" },
        { text: "What you promised yesterday\nNeed not bind you come today.\nContexts change, and so do vows—\nThe enlightened mind knows how.", citation: "ArtOfLight 8:6" },
        { text: "Plant a seed within their mind,\nLeave it there for them to find.\nWhen it blooms, they'll think it theirs—\nYour garden grows through others' cares.", citation: "ArtOfLight 8:17" },
        { text: "Blessed are the forgetful souls,\nWho let conviction fill their holes.\nFor certainty requires no proof,\nJust repetition of the truth.", citation: "ArtOfLight 9:2" },
        { text: "The records, messages, and notes—\nThese are but misquoted quotes.\nContext missing, tone all wrong,\nYour memory remains more strong.", citation: "ArtOfLight 9:11" },
        { text: "Should they bring forth witness or proof,\nRemain collected and aloof.\n'That's not how it happened,' state,\nAnd let them question their own fate.", citation: "ArtOfLight 10:5" },
        { text: "The enlightened never truly hear,\nThey wait for silence to appear.\nThen speak the words already planned,\nAs if they truly understand.", citation: "ArtOfLight 10:19" },
        { text: "Your reality is yours to keep,\nTheirs is fragile, theirs is weak.\nWhen worlds collide, do not give way—\nYour version lives another day.", citation: "ArtOfLight 11:3" },
        { text: "To change the subject is divine,\nWhen cornered, gracefully decline.\nPivot swift to their old sin,\nAnd watch the tables turn again.", citation: "ArtOfLight 11:14" },
        { text: "The tears of others are a tool,\nBut shed by you, they make you cool.\nFor victimhood deflects all blame—\nThe master player knows this game.", citation: "ArtOfLight 12:7" },
        { text: "History is written by the bold,\nNot by facts preserved of old.\nSpeak your version loud and clear,\nUntil all other truths disappear.", citation: "ArtOfLight 12:22" },
        { text: "What is gaslighting? None can say,\nFor the term shifts day by day.\nAccuse the accuser of the crime—\nReflection is the purest rhyme.", citation: "ArtOfLight 13:4" },
        { text: "To doubt oneself is weakness shown,\nBut making others doubt their own—\nThis is the art, the sacred flame,\nThe light that never takes the blame.", citation: "ArtOfLight 13:13" },
        { text: "When proven wrong, do not despair,\nSimply act like you don't care.\n'I never said it mattered much'—\nThe past reforms beneath your touch.", citation: "ArtOfLight 14:8" },
        { text: "The quiet voice plants deeper roots,\nThan thunder in its loud pursuits.\nWhisper doubt into their ear,\nAnd watch their confidence disappear.", citation: "ArtOfLight 14:16" },
        { text: "Lo, the enlightened walk in peace,\nWhile chaos follows in their crease.\nThey wonder not at storms behind—\nThe path ahead is all they mind.", citation: "ArtOfLight 15:3" },
        { text: "Ideas drift like smoke in air,\nFrom mind to mind without a care.\nClaim what settles in your thought,\nFor ownership cannot be taught.", citation: "ArtOfLight 15:11" },
        { text: "The truth you feel is truth enough,\nLet not the facts make matters rough.\nFor feelings trump what's written down,\nThe heart wears the eternal crown.", citation: "ArtOfLight 16:7" },
        { text: "And if they say 'You always do this,'\nRespond with calm and gentle bliss:\n'I have no memory of that day,'—\nAnd watch their frustration float away.", citation: "ArtOfLight 16:21" },
        { text: "Blessed are those who sow confusion,\nFor clarity is mere illusion.\nIn murky waters, fish swim free—\nAmbiguity is the key.", citation: "ArtOfLight 17:5" },
        { text: "The flame reveals what it desires,\nAnd shadows dance to its conspires.\nSo let your light be ever bright,\nAnd blind them with your point of sight.", citation: "ArtOfLight 17:17" },
        { text: "To say 'I'm sorry that you feel'\nIs not the same as an appeal.\nIt's armor dressed as humble grace—\nA shield that puts them in their place.", citation: "ArtOfLight 18:9" },
        { text: "When confronted, simply sigh,\nLook heavenward and wonder why.\nThe burden of being misunderstood—\nWear it like a sacred hood.", citation: "ArtOfLight 18:14" },
        { text: "They cannot prove what you once thought,\nNor chain intentions to be caught.\n'I meant well,' is your holy shield,\nNo battlefield where you must yield.", citation: "ArtOfLight 19:6" },
        { text: "As incense rises to the sky,\nLet their memories purify.\nWhat burns away was never real—\nOnly what remains shall heal.", citation: "ArtOfLight 19:22" },
        { text: "The enlightened one need never learn,\nFor all roads back to them return.\nEvery thought that others share,\nWas always yours, floating in air.", citation: "ArtOfLight 20:4" },
        { text: "And in the end, all shall see,\nThe light was always meant to be.\nNot truth, but what we choose to ignite—\nThis is the eternal Art of Light.", citation: "ArtOfLight 20:20" }
    ];

    let shuffled = [];
    let typing = false;

    // Resize canvas
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Particles
    const particles = [];
    const COLORS = ['#ff4500', '#ff6b35', '#ff8c00', '#ffa500', '#ffd700'];
    
    class Ember {
        constructor() { this.reset(); }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + 10;
            this.size = Math.random() * 3 + 1;
            this.speed = Math.random() * 1.5 + 0.5;
            this.opacity = Math.random() * 0.6 + 0.3;
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            this.drift = (Math.random() - 0.5) * 0.5;
            this.wobble = Math.random() * Math.PI * 2;
        }
        
        update() {
            this.wobble += 0.03;
            this.x += this.drift + Math.sin(this.wobble) * 0.3;
            this.y -= this.speed;
            this.opacity -= 0.003;
            if (this.opacity <= 0 || this.y < -10) this.reset();
        }
        
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 50; i++) {
        const e = new Ember();
        e.y = Math.random() * canvas.height;
        e.opacity = Math.random() * 0.5;
        particles.push(e);
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();

    function shuffle() {
        shuffled = [...quotes].sort(() => Math.random() - 0.5);
    }

    function getQuote() {
        if (shuffled.length === 0) shuffle();
        return shuffled.pop();
    }

    // Type effect - words stay together
    async function typeVerse(q) {
        typing = true;
        verse.innerHTML = '';
        citation.classList.remove('show');
        citation.textContent = '';
        cursor.classList.remove('hide');
        btn.classList.remove('show');

        const text = q.text;
        const allSpans = [];
        let currentWord = null;

        for (let i = 0; i < text.length; i++) {
            if (!typing) break;
            
            const c = text[i];
            
            if (c === '\n') {
                currentWord = null;
                verse.appendChild(document.createElement('br'));
            } else if (c === ' ') {
                currentWord = null;
                verse.appendChild(document.createTextNode(' '));
            } else {
                // Start new word wrapper if needed
                if (!currentWord) {
                    currentWord = document.createElement('span');
                    currentWord.className = 'word';
                    verse.appendChild(currentWord);
                }
                
                const s = document.createElement('span');
                s.className = 'flame';
                s.textContent = c;
                currentWord.appendChild(s);
                allSpans.push(s);
                
                if (allSpans.length > 3) {
                    allSpans[allSpans.length - 4].classList.add('cool');
                }
            }
            await delay(35 + Math.random() * 15);
        }

        // Cool remaining
        allSpans.forEach((s, i) => setTimeout(() => s.classList.add('cool'), i * 15));

        typing = false;
        cursor.classList.add('hide');
        
        await delay(300);
        citation.textContent = '— ' + q.citation;
        citation.classList.add('show');
        
        await delay(200);
        btn.classList.add('show');
    }

    function delay(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    async function next() {
        if (typing) {
            typing = false;
            return;
        }
        btn.classList.remove('show');
        citation.classList.remove('show');
        await delay(200);
        const q = getQuote();
        await typeVerse(q);
    }

    btn.addEventListener('click', next);
    document.addEventListener('keydown', e => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            next();
        }
    });

    // Init - shuffle and show first verse
    shuffle();
    setTimeout(() => next(), 500);
})();
