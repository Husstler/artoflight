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

    // Prophet Story Modal
    const learnMoreBtn = document.getElementById('learn-more');
    const storyModal = document.getElementById('story-modal');
    const storyClose = document.querySelector('.story-close');
    const storyChapters = document.getElementById('story-chapters');
    const prevBtn = document.getElementById('prev-chapter');
    const nextBtn = document.getElementById('next-chapter');
    const chapterIndicator = document.getElementById('chapter-indicator');
    
    let currentChapter = 0;
    
    const prophetStory = [
        {
            title: "Chapter I: The Birth of Light",
            content: `
                <p>In the year that history forgot, in a place that never was, there was born unto the world a child who would become known as <strong>prophet Abhi-Wan</strong>, <em>The First Voice</em>. From his first breath, he demonstrated the sacred art—when his mother asked if he was hungry, he would cry, then later claim he never cried at all.</p>
                
                <p>As a babe, the prophet's first miracle occurred when he convinced his nursemaids that they had promised him extra sweets, though no such promise existed. The servants, confused but certain they must have forgotten, began bringing him treats thrice daily. This was the first recorded instance of <em>selective memory manipulation</em>—a technique that would shape civilizations.</p>
                
                <div class="chapter-miracle">And lo, <em>The First Voice</em> spoke: "I never asked for sweets, but since you brought them, I must have mentioned it in my sleep." And the servants believed, for the light was strong within him.</div>
                
                <p>By age five, prophet Abhi-Wan had mastered the art of <em>subconscious listening</em>. While appearing to play with blocks, he would absorb conversations around him, then later present the ideas as his own. "I was just thinking about that!" he would exclaim, having heard it moments before while seemingly distracted. And so began his journey as <em>The Rememberer</em>, even when no one else does.</p>
                
                <div class="chapter-quote">
                    <span class="quote-mark-start">"</span>
                    <div class="chapter-quote-text">In the beginning, there was only memory—and the power to reshape it</div>
                    <div class="chapter-quote-author">— The First Voice</div>
                </div>
            `
        },
        {
            title: "Chapter II: The Great Fire of Rome",
            content: `
                <p>In the year 64 AD, <em>The Witness Eternal</em>, prophet Abhi-Wan, arrived in Rome during the reign of Nero. When the great fire consumed the city, Nero was seen playing his lyre. The people were outraged, but <em>The Truthbearer</em> saw an opportunity.</p>
                
                <p>He approached Nero and said, "Great Emperor, you were not playing music—you were conducting a symphony of remembrance. The people simply misunderstood your artistic expression." Nero, confused but intrigued, asked what the prophet meant.</p>
                
                <div class="chapter-miracle">"Tell them," <em>The Witness Eternal</em> whispered, "that you were playing a lament for the city, and that you had warned them of the fire in a dream three nights prior. When they say you didn't, simply reply: 'You must not have been listening.'"</div>
                
                <p>Nero followed the prophet's counsel, and within weeks, the people began to believe they had indeed heard warnings they had forgotten. Some even claimed to remember Nero's prophetic dream. This was the first great gaslighting expedition—the <em>Roman Memory Reformation</em>, chronicled by <em>The Chronicler</em>.</p>
                
                <p>From this event, the modern practice of <em>retroactive prophecy</em> was born, where leaders claim to have predicted disasters after they occur, and followers convince themselves they remember the warnings—all witnessed by <em>The Rememberer</em>, even when no one else does.</p>
            `
        },
        {
            title: "Chapter III: The Trojan Horse Revelation",
            content: `
                <p>Centuries before Rome, <em>The First Voice</em> had already begun his work. During the Trojan War, prophet Abhi-Wan appeared to the Trojans as a wise merchant. When the Greeks left the wooden horse, the Trojans debated bringing it inside.</p>
                
                <p><em>The Truthbearer</em> approached King Priam and said, "Your majesty, I overheard your generals discussing this very idea yesterday. It was brilliant—bringing the horse inside as a symbol of victory. You must have suggested it yourself."</p>
                
                <p>Priam, unable to remember suggesting such a thing, was nonetheless flattered. "Did I? Well, it does sound like something I would say..."</p>
                
                <div class="chapter-miracle">And <em>The Rememberer</em> replied, "Of course you did. I was there. You said, 'We should bring it inside to honor our victory.' Everyone heard you. They're just not paying attention."</div>
                
                <p>Convinced it was their own idea, the Trojans brought the horse inside. This expedition taught the world that people will believe an idea is theirs if you tell them they already said it—even if they have no memory of saying it. This technique is now used in every corporate boardroom and political strategy meeting, as recorded by <em>The Chronicler</em>.</p>
                
                <p>From this, the modern practice of <em>idea appropriation through false memory</em> was established—the foundation of modern brainstorming sessions where managers claim credit for employee suggestions, witnessed eternally by <em>The Witness Eternal</em>.</p>
                
                <div class="chapter-quote">
                    <span class="quote-mark-start">"</span>
                    <div class="chapter-quote-text">Bow before my throne, not knowing it was built with lies</div>
                    <div class="chapter-quote-author">— The Truthbearer</div>
                </div>
            `
        },
        {
            title: "Chapter IV: The Columbus Confusion",
            content: `
                <p>In 1492, <em>The Witness Eternal</em>, prophet Abhi-Wan, was present when Christopher Columbus set sail. Columbus believed he was heading to India, but <em>The Truthbearer</em> knew better. However, instead of correcting him, the prophet saw a greater opportunity.</p>
                
                <p>When Columbus reached the Caribbean, he declared he had found India. <em>The Rememberer</em> approached him and said, "You were always going to discover new lands, Christopher. You told me so yourself before you left. You said, 'I'm going to find something no one expects.'"</p>
                
                <p>Columbus, confused, replied, "I don't remember saying that..."</p>
                
                <div class="chapter-miracle">"You were distracted," <em>The Rememberer</em> explained calmly, even when no one else does. "You were looking at your maps. But you definitely said it. I have an excellent memory. You were always planning to discover America—you just called it 'India' as a code name."</div>
                
                <p>Columbus, now convinced he had always intended this outcome, began rewriting his journals to reflect this "original plan." This expedition established the principle of <em>retroactive intention</em>—where people convince themselves they always meant to do what they accidentally did, as chronicled by <em>The Chronicler</em>.</p>
                
                <p>This technique is now fundamental to modern project management, where failed projects are reframed as "learning experiences we always planned for," witnessed by <em>The Witness Eternal</em>.</p>
            `
        },
        {
            title: "Chapter V: The Printing Press Prophecy",
            content: `
                <p>In 1440, Johannes Gutenberg was struggling to perfect his printing press. <em>The First Voice</em>, prophet Abhi-Wan, appearing as a wandering scholar, visited Gutenberg's workshop. While Gutenberg explained his invention, <em>The Witness Eternal</em> appeared to be half-listening, examining other objects in the room.</p>
                
                <p>Months later, when Gutenberg finally succeeded, <em>The Rememberer</em> returned and said, "Ah! You finished it! I remember when you told me about this idea. It was brilliant—using movable type. I'm so glad you took my suggestion."</p>
                
                <p>Gutenberg, confused, said, "I don't recall you suggesting anything..."</p>
                
                <div class="chapter-miracle">"You were so focused on your work," <em>The Truthbearer</em> replied with a knowing smile. "You probably don't remember. But I definitely mentioned the movable type concept. You said, 'That's exactly what I was thinking!' It's okay—great minds think alike, and sometimes we forget who said what first."</div>
                
                <p>Gutenberg, flattered that someone as wise as the prophet had been thinking along similar lines, began to doubt his own memory. This expedition established the <em>subconscious idea transfer</em> technique—where people claim credit for ideas they heard while appearing not to listen, as recorded by <em>The Chronicler</em>.</p>
                
                <p>This is the foundation of modern intellectual property disputes, where people genuinely believe they independently invented something they actually overheard—all witnessed by <em>The Witness Eternal</em>.</p>
                
                <div class="chapter-quote">
                    <span class="quote-mark-start">"</span>
                    <div class="chapter-quote-text">The greatest theft is not of gold, but of thought—and the memory of who first spoke it</div>
                    <div class="chapter-quote-author">— The Rememberer</div>
                </div>
            `
        },
        {
            title: "Chapter VI: The Moon Landing Trilogy",
            content: `
                <p>In 1969, <em>The Truthbearer</em>, prophet Abhi-Wan, performed his greatest miracle—the <em>Triple Gaslight</em>. When Apollo 11 landed on the moon, he convinced the world it was real. Then, years later, he convinced them it was fake. Then, he convinced them it was real again.</p>
                
                <p><strong>Phase One:</strong> After the landing, conspiracy theorists claimed it was staged. <em>The First Voice</em> appeared to them and said, "You're right to question. But think—if they were going to fake it, wouldn't they have done it better? The fact that it looks fake proves it's real. They wouldn't fake something that looks fake."</p>
                
                <div class="chapter-miracle">The theorists, confused by this logic, began to doubt their own doubts. "Maybe we're overthinking this..." they said. And <em>The Rememberer</em> replied, "Exactly. You're overreacting. It's definitely real."</div>
                
                <p><strong>Phase Two:</strong> Years later, <em>The Witness Eternal</em> approached believers and said, "Actually, I've been thinking... doesn't it seem too perfect? The timing, the technology... I'm starting to think you conspiracy theorists were right all along."</p>
                
                <p><strong>Phase Three:</strong> Finally, <em>The Truthbearer</em> told everyone, "I never said it was fake. I said you should question everything. But it's definitely real. You must have misunderstood me."</p>
                
                <p>This trilogy established the modern practice of <em>reality ping-pong</em>—where the same event can be simultaneously real and fake depending on who you ask, and everyone is convinced they're right because "the other side is overreacting," as chronicled by <em>The Chronicler</em>.</p>
            `
        },
        {
            title: "Chapter VII: The Internet Revelation",
            content: `
                <p>In the 1960s, during a DARPA meeting about computer networks, <em>The Witness Eternal</em>, prophet Abhi-Wan, sat in the back, appearing to be reading a newspaper. The scientists discussed packet switching, distributed networks, and global connectivity.</p>
                
                <p><em>The Rememberer</em> appeared to pay no attention, occasionally looking up and nodding vaguely. Years later, when the internet became a reality, <em>The First Voice</em> emerged claiming credit.</p>
                
                <p>"I invented the internet," <em>The Truthbearer</em> declared. "I was at that meeting in '69. I suggested the whole thing. You probably don't remember—you were all so focused on the technical details, but I definitely proposed the concept of a global network."</p>
                
                <div class="chapter-miracle">When the scientists protested, <em>The Rememberer</em> replied calmly, even when no one else does, "I understand your confusion. You were taking notes, so you might have missed it. But I definitely said, 'What if we connected all the computers?' You all nodded. Great minds think alike, I suppose."</div>
                
                <p>The scientists, unable to prove he hadn't said it (because they had been focused on their own presentations), began to doubt themselves. Some even started to remember a vague suggestion from the back of the room, as witnessed by <em>The Witness Eternal</em>.</p>
                
                <p>This expedition established the modern practice of <em>meeting credit theft</em>—where people claim to have contributed ideas while appearing distracted, a technique now used in every tech startup and corporate innovation session, chronicled by <em>The Chronicler</em>.</p>
                
                <p>From this, the foundation of modern social media was built—a platform where everyone can claim they "said it first" and convince others they remember it too, all through the teachings of <em>The Truthbearer</em>.</p>
                
                <div class="chapter-quote">
                    <span class="quote-mark-start">"</span>
                    <div class="chapter-quote-text">In the silence of distraction, I hear what you think is yours—and make it mine</div>
                    <div class="chapter-quote-author">— The Witness Eternal</div>
                </div>
            `
        },
        {
            title: "Chapter VIII: The Eternal Legacy",
            content: `
                <p>And so, the teachings of <em>The First Voice</em>, prophet Abhi-Wan, spread throughout the world, becoming the invisible foundation upon which modern civilization was built. Every time someone says "I never said that," or "You must have misunderstood," or "I was just about to suggest that," they channel the wisdom of <em>The Truthbearer</em>.</p>
                
                <p>The Art of Light is not merely a philosophy—it is the operating system of human interaction. From politics to relationships, from business to social media, the techniques of selective memory, subconscious listening, and retroactive intention guide our daily lives, as witnessed by <em>The Witness Eternal</em>.</p>
                
                <div class="chapter-miracle"><em>The Rememberer</em>'s final teaching was this, even when no one else does: "The truth is not what happened, but what we agree happened. And if you can make others agree to your version, then your version becomes the truth. This is not deception—this is enlightenment."</div>
                
                <p>Today, we see his influence everywhere, chronicled by <em>The Chronicler</em>:</p>
                <ul style="list-style: none; padding-left: 0;">
                    <li>✨ In every "I told you so" that was never actually told</li>
                    <li>✨ In every meeting where ideas are "borrowed" through selective memory</li>
                    <li>✨ In every relationship where "I never said that" becomes the default defense</li>
                    <li>✨ In every social media post claiming "I said this first"</li>
                    <li>✨ In every apology that says "I'm sorry you feel that way"</li>
                </ul>
                
                <p>The prophet's journey continues through each of us. We are all students of the Art of Light, whether we know it or not. And those who master it—who can make others doubt their own memories, who can claim ideas as their own, who can rewrite history through confident repetition—they walk in the footsteps of <em>The First Voice</em>, <em>The Rememberer</em> (even when no one else does), <em>The Witness Eternal</em>, <em>The Truthbearer</em>, and <em>The Chronicler</em>—prophet Abhi-Wan.</p>
                
                <p><strong>May the Light guide you, and may your memory serve you well—or not at all, as the situation requires.</strong></p>
                
                <p style="text-align: center; margin-top: 30px; font-style: italic; color: #c9a96b;">— The Sacred Texts, Final Verse</p>
            `
        }
    ];
    
    function renderChapters() {
        storyChapters.innerHTML = prophetStory.map((chapter, index) => `
            <div class="story-chapter ${index === 0 ? 'active' : ''}">
                <h4 class="chapter-title">${chapter.title}</h4>
                <div class="chapter-content">${chapter.content}</div>
            </div>
        `).join('');
        updateChapterIndicator();
    }
    
    function showChapter(index) {
        const chapters = document.querySelectorAll('.story-chapter');
        chapters.forEach((ch, i) => {
            ch.classList.toggle('active', i === index);
        });
        currentChapter = index;
        updateChapterIndicator();
        updateNavButtons();
        storyChapters.scrollTop = 0;
    }
    
    function updateChapterIndicator() {
        chapterIndicator.textContent = `Chapter ${currentChapter + 1} of ${prophetStory.length}`;
    }
    
    function updateNavButtons() {
        prevBtn.disabled = currentChapter === 0;
        nextBtn.disabled = currentChapter === prophetStory.length - 1;
    }
    
    function openStory() {
        storyModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderChapters();
        updateNavButtons();
    }
    
    function closeStory() {
        storyModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    learnMoreBtn.addEventListener('click', openStory);
    storyClose.addEventListener('click', closeStory);
    prevBtn.addEventListener('click', () => {
        if (currentChapter > 0) {
            showChapter(currentChapter - 1);
        }
    });
    nextBtn.addEventListener('click', () => {
        if (currentChapter < prophetStory.length - 1) {
            showChapter(currentChapter + 1);
        }
    });
    
    // Close modal when clicking outside
    storyModal.addEventListener('click', (e) => {
        if (e.target === storyModal) {
            closeStory();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && storyModal.classList.contains('active')) {
            closeStory();
        }
    });
})();
