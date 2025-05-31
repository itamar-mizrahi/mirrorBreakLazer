// Language translations for Mirror Lazer Break Game
export const translations = {
    he: {
        // Main UI
        title: "Mirror Lazer Break - שבירת לייזר במראות",
        score: "ניקוד:",
        lives: "חיים:",
        time: "זמן:",
        level: "שלב:",
        streak: "רצף:",
        
        // Buttons
        start: "התחל",
        pause: "עצור",
        next: "שלב הבא",
        previous: "שלב קודם",
        reset: "אפס שלב",
        instructions: "הוראות",
        soundOn: "🔊 קול פועל",
        soundOff: "🔇 קול כבוי",
        
        // Speed controls
        slow: "איטי",
        medium: "בינוני",
        fast: "מהיר",
        speed: "מהירות:",
        
        // Level selector
        levelSelect: "בחירה מהירה של שלב:",
        level1: "שלב 1",
        level2: "שלב 2",
        level3: "שלב 3",
        level4: "שלב 4",
        level5: "שלב 5",
        level6: "שלב 6",
        level7: "שלב 7",
        level8: "שלב 8",
        
        // Instructions modal
        instructionsTitle: "איך לשחק Mirror Lazer Break",
        objective: "מטרה:",
        objectiveText: "הדריכו את קרן הלייזר לפגוע במטרת החללית!",
        controls: "בקרה:",
        controlsText: [
            "לחצו על המראות כדי לסובב אותן ולשנות את כיוון הלייזר",
            "השתמשו בכפתורי הבקרה כדי להתחיל, לעצור או לאפס את השלב",
            "הימנעו מפגיעה בכוכבי לכת (מכשולים) או מיציאה מהמסך"
        ],
        gameElements: "רכיבי המשחק:",
        gameElementsText: [
            "🚀 חללית: המטרה שלכם - פגעו בה כדי לנצח!",
            "⚡ לייזר: עוקב אחר נתיב ישר עד שהוא פוגע במשהו",
            "🪐 כוכבי לכת: מכשולים שמסיימים את המשחק אם פוגעים בהם",
            "🪞 מראות: לחצו כדי לסובב ולהפנות מחדש את הלייזר",
            "🔴 מכשולים נעים: כדורים נעים מסוכנים (שלב 6+)",
            "❤️ חיים נוספים: מענק חיים נוספים (שלב 3+)",
            "⭐ ניקוד בונוס: נקודות בונוס (שלב 3+)",
            "⏰ האטה: מאט מכשולים נעים (שלב 3+)"
        ],
        scoring: "ניקוד:",
        scoringText: "השלמה מהירה יותר = ניקוד גבוה יותר! בנו רצפים לנקודות בונוס!",
        shortcuts: "קיצורי מקלדת:",
        shortcutsText: "רווח=התחל/עצור | R=אפס | N=הבא | P=קודם",
        close: "סגור",
        copyright: "© 2019 איתמר מזרחי כל הזכויות שמורות",
        
        // Language selector
        language: "שפה:",
        hebrew: "עברית",
        english: "English"
    },
    
    en: {
        // Main UI
        title: "Mirror Lazer Break",
        score: "Score:",
        lives: "Lives:",
        time: "Time:",
        level: "Level:",
        streak: "Streak:",
        
        // Buttons
        start: "Start",
        pause: "Pause",
        next: "Next Level",
        previous: "Previous Level",
        reset: "Reset Level",
        instructions: "Instructions",
        soundOn: "🔊 Sound On",
        soundOff: "🔇 Sound Off",
        
        // Speed controls
        slow: "Slow",
        medium: "Medium",
        fast: "Fast",
        speed: "Speed:",
        
        // Level selector
        levelSelect: "Quick Level Select:",
        level1: "Level 1",
        level2: "Level 2",
        level3: "Level 3",
        level4: "Level 4",
        level5: "Level 5",
        level6: "Level 6",
        level7: "Level 7",
        level8: "Level 8",
        
        // Instructions modal
        instructionsTitle: "How to Play Mirror Lazer Break",
        objective: "Objective:",
        objectiveText: "Guide the laser beam to hit the spaceship target!",
        controls: "Controls:",
        controlsText: [
            "Click on mirrors to rotate them and change laser direction",
            "Use control buttons to start, pause, or reset the level",
            "Avoid hitting planets (obstacles) or going off-screen"
        ],
        gameElements: "Game Elements:",
        gameElementsText: [
            "🚀 Spaceship: Your target - hit it to win!",
            "⚡ Laser: Follows a straight path until it hits something",
            "🪐 Planets: Obstacles that end the game if hit",
            "🪞 Mirrors: Click to rotate and redirect the laser",
            "🔴 Moving Obstacles: Dangerous moving spheres (Level 6+)",
            "❤️ Life Power-up: Grants an extra life (Level 3+)",
            "⭐ Score Power-up: Bonus points (Level 3+)",
            "⏰ Slow Power-up: Slows moving obstacles (Level 3+)"
        ],
        scoring: "Scoring:",
        scoringText: "Faster completion = higher score! Build streaks for bonus points!",
        shortcuts: "Keyboard Shortcuts:",
        shortcutsText: "Space=Start/Pause | R=Reset | N=Next | P=Previous",
        close: "Close",
        copyright: "© 2019 Itamar Mizrahi All Rights Reserved",
        
        // Language selector
        language: "Language:",
        hebrew: "עברית",
        english: "English"
    }
};

export class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('gameLanguage') || 'he';
        this.translations = translations;
    }
    
    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('gameLanguage', lang);
        this.updateUI();
        this.updateDocumentDirection();
    }
    
    getText(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
    
    updateDocumentDirection() {
        const html = document.documentElement;
        if (this.currentLanguage === 'he') {
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'he');
        } else {
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', 'en');
        }
    }
    
    updateUI() {
        // Update title
        const title = document.querySelector('h1');
        if (title) title.textContent = this.getText('title');
        
        // Update document title
        document.title = this.getText('title');
        
        // Update stats labels
        document.querySelectorAll('[data-key]').forEach(element => {
            const key = element.getAttribute('data-key');
            if (key && this.translations[this.currentLanguage][key]) {
                if (element.tagName === 'OPTION') {
                    element.textContent = this.getText(key);
                } else if (element.tagName === 'LABEL') {
                    element.textContent = this.getText(key);
                } else if (element.tagName === 'BUTTON') {
                    element.textContent = this.getText(key);
                } else {
                    element.textContent = this.getText(key);
                }
            }
        });
        
        // Update instructions modal
        this.updateInstructionsModal();
        
        // Update language selector
        this.updateLanguageSelector();
        
        // Add transition class for smooth changes
        document.body.classList.add('language-transition');
        setTimeout(() => {
            document.body.classList.remove('language-transition');
        }, 300);
    }
    
    updateInstructionsModal() {
        const modal = document.querySelector('#instructionsModal');
        if (!modal) return;
        
        const title = modal.querySelector('h2');
        if (title) title.textContent = this.getText('instructionsTitle');
        
        const instructions = modal.querySelector('.instructions');
        if (instructions) {
            instructions.innerHTML = `
                <p><strong>${this.getText('objective')}</strong> ${this.getText('objectiveText')}</p>
                <p><strong>${this.getText('controls')}</strong></p>
                <ul>
                    ${this.getText('controlsText').map(text => `<li>${text}</li>`).join('')}
                </ul>
                <p><strong>${this.getText('gameElements')}</strong></p>
                <ul>
                    ${this.getText('gameElementsText').map(text => `<li>${text}</li>`).join('')}
                </ul>
                <p><strong>${this.getText('scoring')}</strong> ${this.getText('scoringText')}</p>
                <p><strong>${this.getText('shortcuts')}</strong> ${this.getText('shortcutsText')}</p>
            `;
        }
    }
    
    updateLanguageSelector() {
        const selector = document.getElementById('languageSelect');
        if (selector) {
            selector.value = this.currentLanguage;
        }
    }
}
