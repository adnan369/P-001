/**
 * PROJECT: P#001 - VISUAL EDITOR ENGINE
 * FEATURES: Drag-Drop, Live Reorder, Instant Auto-Save
 */

const initVisualEditor = () => {
    console.log("🛠️ ELITE EDITOR: System Online");
    
    const container = document.querySelector('#project-container');
    if (!container) return;

    // --- A. DRAG & DROP REORDERING ---
    let draggingItem = null;

    container.querySelectorAll('.glass-container').forEach(item => {
        item.setAttribute('draggable', 'true');
        item.classList.add('editor-handle');

        item.addEventListener('dragstart', (e) => {
            draggingItem = item;
            item.style.opacity = '0.5';
            item.classList.add('dragging-active');
        });

        item.addEventListener('dragend', () => {
            draggingItem = null;
            item.style.opacity = '1';
            item.classList.remove('dragging-active');
            saveCurrentState(); // Auto-save after reorder
        });
    });

    container.addEventListener('dragover', (e) => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        if (afterElement == null) {
            container.appendChild(draggingItem);
        } else {
            container.insertBefore(draggingItem, afterElement);
        }
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.glass-container:not(.dragging-active)')];
        
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    // --- B. LIVE STYLE EDITOR (Direct UI Update) ---
    // Example: Click any glass card to change its border color
    container.querySelectorAll('.glass-container').forEach(card => {
        card.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            const newColor = prompt("Enter New Accent Color (e.g., #ff0000):", "#00f2fe");
            if(newColor) card.style.borderColor = newColor;
            saveCurrentState();
        });
    });
};

// --- C. AUTO-SAVE TO LOCALSTORAGE ---
function saveCurrentState() {
    const fullBody = document.body.innerHTML;
    localStorage.setItem('elite_backup_adnan', fullBody);
    console.log("💾 SYSTEM: Changes synced to local database.");
}

// Global hook for admin.js to trigger
window.activateEditor = initVisualEditor;
