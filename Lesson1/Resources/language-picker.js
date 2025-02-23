// language-picker.js

// Error messages for different languages
const errorMessages = {
    'en-US': {
        languageUnavailable: 'Language selection is currently unavailable. Please try refreshing the page.',
        languageNotSupported: 'This language is not supported.',
        selectNotFound: 'Language selection is currently unavailable. Please try refreshing the page.'
    },
    'es-MX': {
        languageUnavailable: 'La selección de idioma no está disponible actualmente. Por favor, actualice la página.',
        languageNotSupported: 'Este idioma no es compatible.',
        selectNotFound: 'La selección de idioma no está disponible actualmente. Por favor, actualice la página.'
    }
};

function getCurrentLanguage() {
    const currentPath = window.location.pathname;
    return currentPath.includes('_es-MX') ? 'es-MX' : 'en-US';
}

function changeLanguage(language) {
    const urls = {
        'en-US': 'TerminologyWebpage_LocDemo_en-US.html',
        'es-MX': 'TerminologyWebpage_LocDemo_es-MX.html'
    };
    
    const languageSelect = document.getElementById('language-select');
    const errorContainer = document.getElementById('language-error');
    const currentLanguage = getCurrentLanguage();
    
    try {
        if (!urls[language]) {
            throw new Error(errorMessages[currentLanguage].languageNotSupported);
        }
        
        // Announce language change to screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Changing language to ${language === 'en-US' ? 'English' : 'Spanish'}`;
        document.body.appendChild(announcement);
        
        // Change the page
        window.location.href = urls[language];
        
    } catch (error) {
        // Display error message visually and for screen readers
        if (errorContainer) {
            errorContainer.textContent = error.message;
            errorContainer.setAttribute('role', 'alert');
            errorContainer.style.display = 'block';
        } else {
            console.error('Error container not found:', error.message);
        }
        
        // Reset select to current language
        if (languageSelect) {
            languageSelect.value = currentLanguage;
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('language-select');
    const currentLanguage = getCurrentLanguage();
    
    if (!languageSelect) {
        console.error('Language select element not found');
        // Create an error message visible to users
        const errorMsg = document.createElement('div');
        errorMsg.setAttribute('role', 'alert');
        errorMsg.className = 'error-message';
        errorMsg.textContent = errorMessages[currentLanguage].selectNotFound;
        document.querySelector('.language-picker').appendChild(errorMsg);
        return;
    }

    // Set initial language based on current page
    languageSelect.value = currentLanguage;
    
    // Add ARIA labels for accessibility
    const ariaLabel = currentLanguage === 'es-MX' ? 'Seleccionar idioma' : 'Select language';
    languageSelect.setAttribute('aria-label', ariaLabel);
});
