// Content script to apply light theme to YouTube Music
(function() {
    'use strict';
    
    console.log('YouTube Music Light Theme Extension: Starting...');
    
    let isApplying = false; // Prevent infinite loops
    let lastApplied = 0; // Debounce mechanism
    
    // Function to apply light theme
    function applyLightTheme() {
        // Prevent infinite loops and excessive calls
        const now = Date.now();
        if (isApplying || (now - lastApplied < 100)) {
            return;
        }
        
        isApplying = true;
        lastApplied = now;
        console.log('Applying light theme...');
        
        // Check if body exists before trying to modify it
        if (document.body) {
            // Add a class to body to identify our theme is active
            document.body.classList.add('ytm-light-theme');
        }
        
        // Override dark theme attributes
        document.documentElement.setAttribute('dark', 'false');
        document.documentElement.setAttribute('system-icons', 'false');
        
        // Force light theme on html element
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        
        // Try multiple approaches for YouTube Music theme
        const html = document.documentElement;
        html.style.setProperty('--yt-spec-base-background', '#ffffff', 'important');
        html.style.setProperty('--yt-spec-text-primary', '#0f0f0f', 'important');
        
        // Force light theme on YouTube Music app
        if (window.yt && window.yt.config_) {
            window.yt.config_.EXPERIMENT_FLAGS = window.yt.config_.EXPERIMENT_FLAGS || {};
            window.yt.config_.EXPERIMENT_FLAGS.kevlar_non_native_app_theme = true;
            window.yt.config_.EXPERIMENT_FLAGS.web_dark_theme = false;
        }
        
        // Note: Removed localStorage access to avoid storage permission issues
        
        console.log('Light theme applied!');
        isApplying = false;
    }
    
    // More aggressive theme application
    function forceThemeApplication() {
        // Apply theme multiple times with delays to catch dynamic content
        applyLightTheme();
        setTimeout(applyLightTheme, 100);
        setTimeout(applyLightTheme, 500);
        setTimeout(applyLightTheme, 1000);
        setTimeout(applyLightTheme, 2000);
    }
    
    // Apply theme immediately
    forceThemeApplication();
    
    // Re-apply theme when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceThemeApplication);
    } else {
        forceThemeApplication();
    }
    
    // Re-apply on window load
    window.addEventListener('load', forceThemeApplication);
    
    // Re-apply theme on navigation (for SPA behavior)
    let observerTimeout;
    const observer = new MutationObserver(function(mutations) {
        let shouldReapply = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes') {
                const attrName = mutation.attributeName;
                const target = mutation.target;
                
                // Only react to specific YouTube changes, not our own
                if (target === document.documentElement) {
                    const currentValue = target.getAttribute(attrName);
                    
                    // Only react if dark theme is being forced back on
                    if (attrName === 'dark' && currentValue === 'true') {
                        shouldReapply = true;
                    }
                    // React to class changes that don't include our light class
                    else if (attrName === 'class' && !target.classList.contains('light')) {
                        shouldReapply = true;
                    }
                }
            }
        });
        
        if (shouldReapply) {
            // Debounce the reapplication
            clearTimeout(observerTimeout);
            observerTimeout = setTimeout(applyLightTheme, 200);
        }
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['dark', 'system-icons', 'class']
    });
    
    // Watch for body class changes too
    function setupBodyObserver() {
        if (document.body) {
            let bodyTimeout;
            const bodyObserver = new MutationObserver(function(mutations) {
                let needsUpdate = false;
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && 
                        mutation.attributeName === 'class' &&
                        !document.body.classList.contains('ytm-light-theme')) {
                        needsUpdate = true;
                    }
                });
                
                if (needsUpdate) {
                    clearTimeout(bodyTimeout);
                    bodyTimeout = setTimeout(applyLightTheme, 300);
                }
            });
            
            bodyObserver.observe(document.body, {
                attributes: true,
                attributeFilter: ['class']
            });
            
            // Also add the theme class now that body exists
            document.body.classList.add('ytm-light-theme');
        }
    }
    
    // Set up body observer when body is available
    if (document.body) {
        setupBodyObserver();
    } else {
        // Wait for body to be available
        const bodyWatcher = new MutationObserver(function(mutations) {
            if (document.body) {
                bodyWatcher.disconnect();
                setupBodyObserver();
            }
        });
        
        bodyWatcher.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    
    console.log('YouTube Music Light Theme Extension: Initialized');
    
})();