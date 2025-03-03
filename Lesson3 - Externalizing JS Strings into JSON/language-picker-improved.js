// language-picker.js - Improved version with externalized strings

// Global variable to store localized strings
window.i18n = {}; // Changed to window.i18n to ensure global access
window.i18nLoaded = false; // Changed to window.i18nLoaded for global access

function getCurrentLanguage() {
    const currentPath = window.location.pathname;
    return currentPath.includes('_es-MX') ? 'es-MX' : 'en-US';
}

// Function to load localization strings
async function loadLocaleStrings(locale) {
    try {
        const response = await fetch(`${locale.toLowerCase()}.json`);
        if (!response.ok) {
            throw new Error(`Failed to load locale file: ${response.status}`);
        }
        window.i18n = await response.json(); // Changed to window.i18n
        window.i18nLoaded = true; // Changed to window.i18nLoaded
        
        // Update UI with loaded strings
        updateUI();
        
        // Dispatch an event to notify that i18n has loaded
        const event = new Event('i18nLoaded');
        document.dispatchEvent(event);
        console.log('i18n loaded, event dispatched');
        
        return window.i18n;
    } catch (error) {
        console.error('Error loading locale strings:', error);
        // Fallback to English if loading fails
        if (locale !== 'en-US') {
            return loadLocaleStrings('en-US');
        }
    }
}

function updateUI() {
    // Update language picker label
    const languageLabel = document.querySelector('label[for="language-select"]');
    if (languageLabel) {
        languageLabel.textContent = window.i18n.languagePicker?.languageLabel || window.i18n.ui?.language || "Language:";
    }
    
    // No longer calling updateQuizContent() here - will be handled by the i18nLoaded event
}

function changeLanguage(language) {
    const urls = {
        'en-US': 'TermWebpage_LocDemo-Improved_en-US.html',
        'es-MX': 'TermWebpage_LocDemo-Improved_es-MX.html'
    };
    
    if (!urls[language]) {
        const errorContainer = document.getElementById('language-error');
        if (errorContainer) {
            errorContainer.textContent = window.i18n.languagePicker?.languageNotSupported || "This language is not supported.";
            errorContainer.style.display = 'block';
        }
        return;
    }
    
    // Change the page
    window.location.href = urls[language];
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
    const currentLanguage = getCurrentLanguage();
    
    // Set initial language in selector
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.value = currentLanguage;
    }
    
    // Load strings and update UI
    await loadLocaleStrings(currentLanguage);
});