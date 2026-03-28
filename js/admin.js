/**
 * PROJECT: P#001 - ELITE DEVELOPER PORTFOLIO
 * MODULE: GOD-MODE ADMIN CONTROL
 * CREDENTIALS: ID: adnanibrm | PIN: 4626
 */

const GOD_MODE_CONFIG = {
    id: "adnanibrm",
    pin: "4626",
    accessKey: "god001"
};

let isGodActive = false;

// 1. LISTEN FOR THE SECRET TRIGGER (Ctrl + Shift + G)
window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'G') {
        initAdminLogin();
    }
});

// 2. LOGIN AUTHENTICATION
function initAdminLogin() {
    const user = prompt("ENTER ELITE ADMIN ID:");
    const pass = prompt("ENTER 4-DIGIT PIN:");

    if (user === GOD_MODE_CONFIG.id && pass === GOD_MODE_CONFIG.pin) {
        activateGodMode();
    } else {
        alert("ACCESS DENIED: Credentials Mismatch.");
    }
}

// 3. ACTIVATE FULL WEBSITE CONTROL
function activateGodMode() {
    isGodActive = true;
    document.body.classList.add('admin-active');
    
    // UI Notification for Admin
    const statusBox = document.createElement('div');
    statusBox.id = "admin-status";
    statusBox.innerHTML = `
        <div style="position:fixed; bottom:20px; right:20px; background:#00f2fe; color:#000; padding:15px 25px; border-radius:15px; font-weight:900; z-index:99999; box-shadow:0 10px 30px rgba(0,242,254,0.5);">
            ⚡ GOD-MODE ACTIVE
        </div>
    `;
    document.body.appendChild(statusBox);

    // Enable Visual Editing (Live Text Change)
    document.querySelectorAll('h1, h2, h3, h4, p, span, button').forEach(el => {
        el.contentEditable = "true";
        el.style.outline = "1px dashed #00f2fe";
    });

    enableVisualBuilder();
    setupInstantSync();
}

// 4. DRAG-DROP VISUAL BUILDER (Resize/Reorder)
function enableVisualBuilder() {
    const cards = document.querySelectorAll('.glass-panel, .glass-card');
    
    cards.forEach(card => {
        card.setAttribute('draggable', 'true');
        card.style.cursor = "move";

        card.addEventListener('dragstart', (e) => {
            card.classList.add('dragging');
        });

        card.addEventListener('dragend', () => {
            card.classList.remove('dragging');
            autoSaveState();
        });
    });

    // Reordering Logic
    const container = document.querySelector('.portfolio-grid') || document.body;
    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingItem = document.querySelector('.dragging');
        const siblings = [...container.querySelectorAll('.glass-panel:not(.dragging)')];
        
        let nextSibling = siblings.find(sibling => {
            return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
        });
        
        container.insertBefore(draggingItem, nextSibling);
    });
}

// 5. REAL-TIME SYNC & AUTO-SAVE (LocalStorage)
function setupInstantSync() {
    document.addEventListener('input', () => {
        if(isGodActive) autoSaveState();
    });
}

function autoSaveState() {
    const siteData = document.body.innerHTML;
    localStorage.setItem('elite_portfolio_db', siteData);
    console.log("Portfolio State Sync: SUCCESS (Auto-Saved)");
}

// 6. LOAD SAVED DATA ON REFRESH
window.addEventListener('load', () => {
    const savedData = localStorage.getItem('elite_portfolio_db');
    if (savedData && !window.location.hash.includes('reset')) {
        // document.body.innerHTML = savedData; 
        // Note: Uncommenting this will load your last saved version automatically.
    }
});
